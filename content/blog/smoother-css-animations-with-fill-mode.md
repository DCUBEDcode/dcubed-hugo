---
title: 'Create smoother animations with animation-fill-mode'
intro: "`animation-fill-mode` can supercharge your animations, by allowing you to take control of your page's choreography."
heroSmallUrl: '/post-header-fill-small.png'
heroLargeUrl: '/post-header-fill-large@2x.png'
draft: false
---

## What is animation-fill-mode?

`animation-fill-mode` is a CSS property which tells an animation how to apply styles to the target element before or after it is run.

In this post we will be focussing on the use of the value `animation-fill-mode: forwards`, This value allows the target element to maintain the styles applied in the final keyframes of it's animation.

### Why is this so good?

When you use `animation-fill-mode: forward` you can set the initial styles of
elements to be hidden or offscreen and then use the styles in your keysframes
to determine the final state of your UI. This allows you to stagger elements
into view to show heirarchy or to add emphasis to particular ones.

## Example

Let's say we want to create a list of elements which will fade in each item one after the other. If you apply the following animation to these list items and try to add the desired delay to each one, you will see the things don't quite look right as they go from visible to hidden to visible.

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

To prevent this we want to make sure that each element appears hidden to begin
with.  We can do this by setting `opacity: 0` for the boxes. This will solve
our problems at the start, but once the animation runs the boxes would return to
hidden.

{{% well title="Why use Opacity?" body="Opacity and transform are the two properties that let you get away with cheap animations that most likely will hit that sweet 60 frames per second." %}}

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

