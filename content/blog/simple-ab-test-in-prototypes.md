---
title: "Simple way to A/B test your Vue prototypes"
date: 2020-05-04T16:30:14+10:00
description: "If you are running remote user testing and you want your partipants to randomly be bucketed into a test, this little trick does wonders."
draft: false
heroLargeUrl: /post-1.jpeg
heroSmallUrl: /post-1.jpeg
---

Remote testing is an easy way to scale up your user testing. There are many great tools out there to help facilitate these kind of sessions.

Sometimes though you may be in two minds about which design you want to test and you only have the ability to provide a single URL for the user to access. Luckily we can use a little javascript to allow our browsers to randomly decide which design we want to show our user.

## Using Javascript to bucket our users

To do this we need to make use of `Math.random()`. This function will allow us to return a number. This number can be used to represent one of variants. We can then pass this variant number to our components to conditionally render the relevant HTML.

### Example Vue multivariate component

Let's say we want to test variants of a menu. Using Vue's `v-else-if` we can check the value of a prop to determine which menu variant we are going to display to the user.

{{< highlight html >}}
  <!-- menu-tester.html -->

  <div v-if="variant === 1">
    A
    <MenuOne />
  </div>
  <div v-else-if="variant === 2">
    B
    <MenuTwo />
  </div>
  <div v-else-if="variant === 3">
    C
    <MenuThree />
  </div>
  <div v-else>
    <!-- Default incase variant not passed -->
    <MenuOne />
  </div>
{{< / highlight >}}

Since we know we have three variants we want to test in this example, we want to randomly assign `variant` a number between `1` and `3`. To do this we will use `Math.random() * 3` to get our number and wrap that in `Math.floor()` to round ff the number to it's nearest integer in a downward direction.

{{< highlight js >}}
Vue.component('menu-tester', {
  data: function () {
    return {
      variant: Math.floor((Math.random() * 3))
    }
  },
  template: require('menu-tester.html')
})
{{< / highlight >}}

Now every time the browser renders our `menu-tester` it will randomly choose one of the variants to show. You could also choose to do this at a higher level in your component structure, such as at a page level. This way you could have multiple modules responding to the same variant number.
