---
title: 'Create smoother animations with animation-fill-mode'
heroSmallUrl: '/post-header-fill-mode.png'
heroLargeUrl: '/post-header-fill-mode@2x.png'
draft: false
---

CSS Animations breath life into any design. Working alongside their good friend
transitions, they are the bread and butter of a modern user experience, helping
guide users through a design.

One property often overlooked that supercharges your animations, allowing you to
take control of default states and overall timings is `animation-fill-mode`.
This property gets really interesting when used with the value `forwards`.

{{< highlight go >}}
  .card {
    animation: fadeIn 375ms ease;
    animation-fill-mode: forwards;
  }
{{< / highlight >}}
