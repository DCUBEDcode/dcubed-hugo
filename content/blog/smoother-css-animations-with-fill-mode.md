---
title: 'Create smoother animations with animation-fill-mode'
date: 2020-05-4T16:30:14+10:00
description: "Supercharge your animations by taking control of your animated elements, before and after they run their animations."
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
  <ul class="animated-list">
    <li>Sergio Aguero</li>
    <li>Virgil Van Dyke</li>
    <li>Eden Hazard</li>
    <li>John Terry</li>
    <li>Fernando Torres</li>
  </ul>
{{< / highlight >}}

{{< highlight go >}}
  .animated-list li {
    animation: fadeIn 375ms ease;
  }

  .animated-list li:nth-child(2) { animation-delay: 250ms }
  .animated-list li:nth-child(3) { animation-delay: 500ms }
  .animated-list li:nth-child(4) { animation-delay: 750ms }
  .animated-list li:nth-child(5) { animation-delay: 1000ms }
{{< / highlight >}}

To prevent this we want to make sure that each element appears hidden to begin
with.  We can do this by setting `opacity: 0` for the boxes. This will solve
our problems at the start, but once the animation runs the boxes would return to
hidden.

{{% well title="Why use Opacity?" body="Opacity and transform are the two properties that let you get away with cheap animations that most likely will hit that sweet 60 frames per second." %}}

### CSS with fill-mode applied
Now if we use `animation-fill-mode: forwards` and set all the list items to have `opacity: 0`, we will now see they all appear hidden and reveal once the animation is complete.
{{< highlight go >}}
  .animated-list li {
    animation: fadeIn 375ms ease;
    animation-fill-mode: forwards;
    opacity: 0;
  }

  .animated-list li:nth-child(2) { animation-delay: 250ms }
  .animated-list li:nth-child(3) { animation-delay: 500ms }
  .animated-list li:nth-child(4) { animation-delay: 750ms }
  .animated-list li:nth-child(5) { animation-delay: 1000ms }
{{< / highlight >}}

