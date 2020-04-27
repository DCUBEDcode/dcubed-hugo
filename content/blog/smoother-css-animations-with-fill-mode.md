---
title: 'Create smoother animations with animation-fill-mode'
intro: "`animation-fill-mode` can supercharge your animations, by allowing you to take control of your page's choreography."
heroSmallUrl: '/post-header-fill-small.png'
heroLargeUrl: '/post-header-fill-large@2x.png'
draft: false
---

## What is animation-fill-mode?

`animation-fill-mode` is a CSS property tells an animation how to apply styles to the target element before and after it is run.

When the value is set to `animation-fill-mode: forwards`, this means that the target element will maintain the styles applied at the end of the animation.

For example, if you apply the following animation to two elements on a page and one of them has a delay on the animation, you will see the second looks wrong because it goes from visible to hidden to visible.

{{< highlight go >}}
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
{{< / highlight >}}

### HTML
{{< highlight go >}}
  <div class="box box">Box 1</div>
  <div class="box box--2">Box 2</div>
{{< / highlight >}}

### CSS
{{< highlight go >}}
  .box {
    width: 100px;
    height: 100px;
    background: DarkGoldenRod;
    animation: fadeIn 375ms ease;
  }

  .box--2 {
    animation-delay: 375ms;
  }
{{< / highlight >}}

To prevent this we want to make sure the second element appears hidden to begin
with.  We can do this by setting `opacity: 0` for the boxes. This will solve
our problems at the start, but once the animation runs the boxes would return to
hidden.

To keep things how we want them, we can add `animation-fill-mode: forwards` or shorthand `animation: fadeIn 375ms ease forwards`. 

### CSS with fill-mode set
{{< highlight go >}}
  .box {
    width: 100px;
    height: 100px;
    background: DarkGoldenRod;
    animation: fadeIn 375ms ease;
    animation-fill-mode: forwards;
  }

  .box--2 {
    animation-delay: 375ms;
  }
{{< / highlight >}}

Now the boxes will be hidden to start off with and stay visible once the animation is complete.

