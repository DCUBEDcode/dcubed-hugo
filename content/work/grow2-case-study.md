---
title: 'Grow2 - Case Study'
date: 2020-05-04T16:30:14+10:00
description: 'Grow2 is an education startup based in Brisbane, Australia who have created an information platform for sporting clubs. Their priority is to make sure everyone can receive training in all formats - text, imagery, audio or video.'
heroTall: '/post-header-grow2-small@2x.png'
heroSmallUrl: '/post-header-grow2-small.png'
heroLargeUrl: '/post-header-grow2-large@2x.png'
heroClass: grow2
siteUrl: https://www.grow2.com.au
draft: false
deliverables:
  - text: Brand
    icon: fingerprint
  - text: UI Design
    icon: tape
  - text: Desktop web app
    icon: desktop
  - text: Mobile web app
    icon: mobile
---

## Requirements

Grow2 required a suite of applications to run on desktop and mobile for both adminstrators (content creators) and the people receiving the material.

The point was made early on by the team at Grow2 that everybody had to have the ability to learn in their preferred way. Some people preferred reading content, some prefer a video, others enjoy listening to audio. This meant we would need to take advantage of cloud hosting using Amazon AWS S3.

## Trainer Application

Trainers register for an administrator account on the Grow2 landing page. This page is also used to login for students who are invited by the trainer.

{{% browser-mockup src="/casestudy/grow2/landing-page.png" %}}

### Trainer dashboard

When the trainer is logged in they can now create courses, see their list of students and their assigned courses, as well as any pending invitations to students.

{{% browser-mockup src="/casestudy/grow2/admin-students.png" %}}

### Student profiles

Student profiles allows the trainer to see any activity the student is displaying, the progress of their assigned courses. The trainer may also edit their associated businesses.

{{% browser-mockup src="/casestudy/grow2/admin-student.png" %}}

### Create courses

Trainers can create courses which are composed of Units which are further broken down into Learning Cards. These courses can be instantly distributed to students.

{{% browser-mockup src="/casestudy/grow2/admin-course.png" %}}

### Publish content

Trainers can produce content for the Learning Cards using the Wizard. This Wizard allows the trainer to add text, images, audio, video and a quiz.

{{% browser-mockup src="/casestudy/grow2/admin-card.png" %}}

### Create a quiz

The quiz feature allows the trainer to test the knowledge of the student on each card. If no quiz is added then the student can progress immediately. A preview of the quiz is available on the right hand side as the questions and answers are being edited.

{{% browser-mockup src="/casestudy/grow2/admin-quiz.png" %}}

## Student application

The trainer will then invite students to the Grow2 platform. These students will be asked to complete a registration form and set their password.

Once their account is created they will be presented with any assigned courses. From here they can continue into a course and progress through the units.

All progress is reported back to the Trainer in real time and added to their Student Profile.

<div class="phones">
<div class="phones__wrap">
<div class="phones__list">
  <div>
    {{% phone-mockup src="/casestudy/grow2/student-courses.png" %}}
  </div>
  <div>
    {{% phone-mockup src="/casestudy/grow2/student-course.png" %}}
  </div>
  <div>
    {{% phone-mockup src="/casestudy/grow2/student-card.png" %}}
  </div>
</div>
</div>
</div>

{{% well title="Like what you se?" body="Get in touch to see how DCUBED can help bring innovation to your business." linkText="Get in touch" linkUrl="#contact" %}}
