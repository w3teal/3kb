---
date: 2025-01-11T12:00:00.000Z
title: How to embed your Mastodon profile
tags:
  - tutorial
description:
  In X (aka Twitter), you can easily embed your profile page 
  via their official page. But, how you can do it in Mastodon?
---

In X (aka Twitter), you can easily embed your profile page via [their official page](https://publish.twitter.com/). But, how you can do it in Mastodon? Here the step-by-step tutorial how to make it.

## 1. Import the module

You can import the file via JSDelivr CDN. [(Source)](https://gitlab.com/idotj/mastodon-embed-timeline#cdn)
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@idotj/mastodon-embed-timeline@4.4.2/dist/mastodon-timeline.min.css" integrity="sha256-1UGgxsonaMCfOEnVOL89aMKSo3GEAmaRP0ISbsWa6lU=" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/@idotj/mastodon-embed-timeline@4.4.2/dist/mastodon-timeline.umd.js" integrity="sha256-E6WPG6iq+qQIzvu3HPJJxoAeRdum5siq13x4ITjyxu8=" crossorigin="anonymous"></script>
```

## 2. Add the embed wrapper

You can embed that in whenever place you want. [(Source)](https://gitlab.com/idotj/mastodon-embed-timeline#initialize)
```html
<div id="mt-container" class="mt-container">
  <div class="mt-body" role="feed">
    <div class="mt-loading-spinner"></div>
  </div>
</div>
```

## 3. Add JS configuration

After import and add the wrapper, now you need to add the `MastodonTimeline` config. [(Source)](https://gitlab.com/idotj/mastodon-embed-timeline#profile-timeline)
```html
<script>
   const myTimeline = new MastodonTimeline.Init({
      instanceUrl: "https://mastodon.social/",
      timelineType: "profile",
      userId: "950856",
      profileName: "@LIGMATV",
   });
</script>
```

1. Change the `instanceUrl` to where you signed up your Mastodon account. For example, if your profile link is `https://mastodon.social/@example`, then the instance is `https://mastodon.social/`.

2. `timelineType`, the type of timeline you want. In this case, you just need to make it `profile`.

3. `userId`, you can find your user ID via your instance API. For example, if your profile link is `https://mastodon.social/@example`, then the API link is in `https://mastodon.social/api/v1/accounts/lookup?acct=example`. You can find it in first section (For example: `{"id":"950856",...`)

4. `profileName`, it's your username in the instance.

You can see the working example in how my Mastodon account looks in this embed approach:

<iframe height="500" style="width: 100%;" scrolling="no" title="Mastodon embed timeline example" src="https://codepen.io/w3teal/embed/OPLvjwd?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/w3teal/pen/OPLvjwd">
  Mastodon embed timeline example</a> by W3Teal (<a href="https://codepen.io/w3teal">@w3teal</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

---

Just it! Considering to give star and contributing to `mastodon-embed-timeline` repository! ⭐ https://gitlab.com/idotj/mastodon-embed-timeline