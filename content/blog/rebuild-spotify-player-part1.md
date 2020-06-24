---
title: 'Rebuild: Spotify Audio Player (Part 1)'
subtitle: 'qweqweqweq'
'description': Welcome to the Rebuild series where I will be rebuilding famous pieces of UI we use everyday. In this edition we will build the Audio Player seen in the Spotify desktop app.
date: 2020-06-23T21:21:47+10:00
heroSmallUrl: '/post-header-spotify-small.jpg'
heroLargeUrl: '/post-header-spotify-large@2x.jpg'
draft: true
---

## Why the Spotify Audio Player?

The Spotify Audio Player is the controls found at the bottom of the Spotify desktop app used to to play, pause, shuffle, repeat and skip through your music. These controls will allow us to explore different CSS techniques such as transitions, transform, flex box, use psuedo elements as well as interesting Javascript features like the Audio API. See a screenshot of what we will be building below:

{{< figure src="/blog/player.jpg" caption="The Spotify Audio Player we will be building" >}}

<div class="double"></div>

## Creating the HTML markup

{{< highlight go >}}
<div class="spotify">
  <div class="spotify__controls">
    <div class="spotify__control">
      <i class="fas fa-random"></i>
    </div>
    <div class="spotify__control">
      <i class="fas fa-step-backward"></i>
    </div>
    <div class="spotify__control spotify__control--play">
      <i class="fas fa-play"></i>
    </div>
    <div class="spotify__control">
      <i class="fas fa-step-forward"></i>
    </div>
    <div class="spotify__control">
      <i class="fas fa-repeat"></i>
    </div>
  </div>
  <div class="spotify__timebar">
    <span class="spotify__timer">0:00</span>
    <div class="spotify__track-wrap">
      <div class="spotify__track-bar"></div>
    </div>
    <span class="spotify__timer">4:20</span>
  </div>
</div>
{{< / highlight >}}


<iframe width="560" height="315" src="https://www.youtube.com/embed/-CpXOkC4_ro?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
