---
title: I have rewritten this website.
date: 2025-03-04T05:45:54.142Z
description: Finding a SSG was a very difficult decision, so I created a new SSG (?!)
---

Yep, this website has been rewritten using my own SSG! (with ChatGPT, it can be done in ~1 day!). So why did I recreate this website again? Isn't the old Astro website already very good in terms of SEO and accessibility?

I can say yes, and also the reason I chose the [Astro Paper](https://github.com/satnaing/astro-paper) theme is also because of its simplicity. But even though it's simple, there are a lot of bloat js codes scattered everywhere. And even a single file is [already ~1 MB](https://radar.cloudflare.com/scan/fdc5465a-6b1e-43fa-93bf-9bb8b82b2491) 😭.

And also I was amazed by the collection of fast websites "[512KB Club](https://512kb.club/)". I felt sad that my website which is even less useful, could be this big 🥲. So for 2 days I didn't post, I searched for various SSGs and tried them.

1. [Zola](https://www.getzola.org/)  
This SSG was recommended by [Nikita Karamov](https://www.kytta.dev/blog/one-week-with-zola/). At first, I was very happy because it was very fast in processing my markdown files. And that was the first time I styled my own website (This is what the new website looks like). But my problem with using this is, the frontmatter must be fully equipped, and if not it will throw an error. And often when the error is not related to the article, it does not fully explain where it is.

2. [Metalsmith](https://metalsmith.io/)  
To me, it's a name that sounds like "Wow, this is classic". I tried it and the experience was similar to 11ty. The difference here is that the data cannot be loaded automatically, while 11ty data is in its directory - Oh yeah, both are about data. And when there was an error, I was confused when the localhost could not move, apparently Metalsmith automatically closed and only left the error log. What kind of guest is this?

3. [makesite.py](https://github.com/sunainapai/makesite)  
At this point, I've gone deeper into searching for SSG. All I want is It's simple and 1 file. It seems makesite.py is a good fit for me, if this garbage can at least run.

Since almost all the random SSGs I tried didn't work, I ended up being lazy to create a blog again, bruh. But after seeing many people making their own SSGs to create their lightweight websites, like [Karl Bartel](https://www.karl.berlin/) with his [blog.sh](https://github.com/karlb/karl.berlin), [Nihar Samantaray](https://nih.ar/) with his [Pidgeotto](https://pypi.org/project/pidgeotto/), I became impressed and interested in making my own SSG too, and "blog.js" was born. A generic name, right? Or just say "@w3teal/blog.js". So I spent almost ~1 day to create this SSG. The main feature is, it's very portable. Only one "blog.js" file to use it, almost similar to makesite.py.

Other features that people really need are, like Markdown (with Marked.js), Frontmatter (with Graymatter), post listing and custom layout. Very generic, right? To get all this done, it only takes ~136 lines! And the workflow is:

1. npm start
2. http-server (Optional, to see the results directly)
3. _(repeat npm start)_
4. Deploy the _site directory!

Workflow in blog.js be like:
![CMD with blog.js](/assets/cmd-blogjs.jpg)

The features I would like to implement in the future are xml feeds and og images (impossible...)

So that's it, if you're interested in this project, you can head over to the [w3teal/blog.js](https://github.com/w3teal/blog.js) repo! Have fun!