---
title: 'Uploading files direct to S3 using Vue, Dropzone & NodeJS'
date: 2020-05-4T16:30:14+10:00
description: "To upload files in a web application, a user's browser typically uploads directly to an application server. This approach comes with a variety of problems such as server timeouts, memory limitations and bandwidth costs associated with double-handling the file."
heroSmallUrl: '/post-header-upload3-small.png'
heroLargeUrl: '/post-header-uploads3-large@2x.png'
draft: false
---

Encountering this issue in a project recently, in which we use [vue-dropzone](https://rowanwins.github.io/vue-dropzone/docs/dist/#/installation), a Vue.js component for [DropzoneJS](https://www.dropzonejs.com/) which appears to provide [upload directly to AWS S3](https://rowanwins.github.io/vue-dropzone/docs/dist/#/aws-s3-upload) functionality out of the box.

Looking at the documentation, it appears that we need a URL signer to return an S3 Policy in the following format:

{{< highlight go >}}
{
   "signature":{
      "Content-Type":"",
      "acl":"public-read-write",
      "success_action_status":"201",
      "policy":"abc123",
      "X-amz-credential":"AKIAIM3WELV3PLALOYDQ\/20171012\/us-west-2\/s3\/aws4_request",
      "X-amz-algorithm":"AWS4-HMAC-SHA256",
      "X-amz-date":"20171012T054729Z",
      "X-amz-signature":"5227d84360d92ef8al45549805b3746f2f1d6641df8986aamcr939c35513cd7c",
      "key":""
   },
   "postEndpoint":"\/\/s3-us-west-2.amazonaws.com\/my-bucket"
}
{{< / highlight >}}

The PHP library linked to from the documentation is no help in determining how we go about generating this policy from the AWS SDK in NodeJS, which is what our server is written in.

Stumbling across the blog post [Upload files to AWS S3 using pre-signed POST data and a Lambda function](https://blog.webiny.com/upload-files-to-aws-s3-using-pre-signed-post-data-and-a-lambda-function-7a9fb06d56c1) spells out the solution:

> By using pre-signed POST data, rather than our own servers, S3 enables us to perform uploads directly to [S3], in a controlled, performant, and very safe manner.

Looking in the [AWS SDK docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#createPresignedPost-property), it appears the method we need is called actually `createPresignedPost`.

We could potentially go down the serverless (Lambda) route as suggested in the above post, however since we already have a Node server running for this sort of thing, it's a simple matter of adding a new convinience method for `createPresignedPost` and a new URL route `/s3-policy` to generate this policy.

{{< highlight go >}}
import * as AWS from 'aws-sdk'
import { AWS_CONFIG, S3_BUCKET } from './constants'
AWS.config.update(AWS_CONFIG)

export const s3 = new AWS.S3()

export const createPresignedPost: any = (key) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: S3_BUCKET,
      Fields: {
        key,
      },
      Expires: 60,
    }
    s3.createPresignedPost(params, (err, data) => {
      if (err) {
        console.log(err)
        return reject(err)
      } else {
        return resolve(data)
      }
    })
  })
}

app.post('/s3-policy', (req, res) => {
  const {Key} = req.query
  createPresignedPost(Key).then(d => {
    // transform into format required by vue-dropzone implementation
    res.send({
      signature: d.fields,
      postEndpoint: d.url,
    })
  }).catch(err => {
    res.status(500).send({ message: err })
  })
})
{{< / highlight >}}

Now with our S3 policy endpoint in place, it's just a matter of updating our VueJS Component configuration. In our component's Javascript, we have:

{{< highlight go >}}
videoDropzoneOptions = {
  url: BASE_URL + '/video-upload-success',
  thumbnailWidth: 150,
  maxFiles: 1,
  maxFilesize: 512, // mb
  uploadprogress: this.videoUploadProgress
}

awss3 = {
  signingURL: this.signingUrl,
  headers: {},
  params : {},
  sendFileToServer : true,
  withCredentials: false
}

signingUrl(f) {
  return '/s3-policy?key=' + this.videoKey
}

s3UploadError(errorMessage) {
  console.log('s3UploadError', {errorMessage})
  console.log('s3UploadError', this.$refs.VideoDropzone.getAcceptedFiles()[0].name)
}

s3UploadSuccess(s3ObjectLocation) {
  console.log('s3UploadSuccess', {s3ObjectLocation})
}
{{< / highlight >}}

And in the component's template we have:


{{< highlight go >}}
<vue-dropzone
   id="VideoDropzone"
   ref="VideoDropzone"
   class="Dropzone Dropzone--video"
   v-show="!currentCard.video"
   :options="videoDropzoneOptions"
   :includeStyling="false"
   :awss3="awss3"
   @vdropzone-sending="sendingEvent"
   @vdropzone-success="videoSuccess"
   @vdropzone-s3-upload-error="s3UploadError"
   @vdropzone-s3-upload-success="s3UploadSuccess"
></vue-dropzone>
{{< / highlight >}}

## Let's try it out

!['screenshot'](/upload-s3.png)

Trying this all out in the browser, we experience partial success:

Note the initial successful request for our S3 policy, followed by a direct upload to S3 with a response code of `204 No Content`.

We can confirm the file has uploaded by checking our [S3 Management Console](https://s3.console.aws.amazon.com/s3/buckets/).

To prevent the error handler firing on `204` response, there seems to be a [pull request](https://github.com/rowanwins/vue-dropzone/pull/461). It doesn't look like it will be getting merged any time soon, so to use that version in our app we can run:

`yarn add https://github.com/inventionlabsSydney/vue-dropzone`



