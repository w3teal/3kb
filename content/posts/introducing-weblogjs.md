---
title: Introducing Weblog.js, my custom Node.js based SSG
date: 2025-03-07
description: The entire page, including this one, is built with the world's lightest SSG JS, and why did I build it?
---

As I said in my previous blog, [I rewrote my blog](/posts/rewrite-website/) with my own engine. And look how this SSG has grown quite a bit.

Historically, I have been quite experienced in several SSGs that I have tried, such as [Jekyll](https://ligmatv2.vercel.app/), [VitePress](https://ligmatv3.vercel.app/) (I didn't learn much about it), [Docsify](https://ligmatv4.vercel.app/) (I made quite [a few plugins!](https://github.com/docsifyjs/awesome-docsify)) and then [11ty](https://ligmatv-11ty.vercel.app/) (I made the 11ty Beer template). Every time I use the following SSGs, I always feel that my blog is "lacking" and moving around, and I always look for the most functionality without realizing how heavy my website is, and that the blog should only be made for reading. Yes, of course readers only come in, read, and leave. Will they use all the excessive functionality that exists?

I also started to realize how difficult it is to create a blog, like in 11ty I couldn't easily preview the blog I just created (it didn't use the layout in the data directory!) so I had to hard reset. And I started using DEV.to, it was easy and had a strong Dev ecosystem, it even felt very easy to create posts, and it was very heavy on the scales of DEV.to, and I once [said that DEV.to was "very perfect"](https://dev.to/w3teal/my-history-in-blogging-coding-until-i-falling-to-devto-24ac).

And finally what I really wanted was convenience for both: Easy for the writer and the reader. Although I once said "Blogging from the terminal? Bad idea for me.". I started getting interested in blogging again after seeing [Kev Quirk's related projects](https://kevquirk.com/projects) like [100 Days to Offload](https://100daystooffload.com/) and [The 512KB Club](https://512kb.club/). Both of these projects made me **want to blog** with a **lightweight website**. Although I ultimately wanted this to get my name on the big board, it gave me a new hobby that I am happy to share with everyone.

_After writing this long personal text, it's time to talk about Weblog.js! (Although this should be in a different post)_

## Why not another SSG?

I have discussed it in 2 previous blogs: [My history in blogging (& coding) (Until i fell to Dev.to)](https://dev.to/w3teal/my-history-in-blogging-coding-until-i-falling-to-devto-24ac) and [I have rewritten this website](https://w3teal.is-a.dev/posts/rewrite-website/). This question is different from "Why create a custom SSG?".

## Why create a custom SSG?

Previously (December 2024 to be exact), I once created a template for [11ty Beer](https://github.com/LIGMATV/11ty-beer). It is rich in features such as Material Design, Themes, and dialogs. And here I use the slogan "Only 1 config". Why? Because many 11ty Beer templates have a lot of configs, for example Eleventy Excellent (as if I had just created a professional website). I want to use it, but I also realize that it consumes excessive resources, it is entirely made with [BeerCSS](https://www.beercss.com/), which is minified in size 14.3 KB. That is more than my 1 uncompressed homepage 4.55KB (including logo image resources and CSS). But I still update it because it has a good Lighthouse score, and because it takes a lot of effort. It would be a waste if I threw it away!

Previously (November 2024 to be exact), I made a sort of portable SSG "[Boredown](https://github.com/w3teal/boredown)", it was completely made with only 1 file, I built it myself using Marked.js, and KaTeX Math features that I would never use. It had a good Lighthouse score (I was overthinking it at the time). It was very similar to this Weblog.js idea, it only had 1 file and 1 layout. I really liked this project, until I realized that the score was manipulated. Yes, it was all processed with JS, which would not be SEO-friendly. I wanted to make it as SSG, but I didn't know about Node.js yet. And that's Weblog.js! Boredown but static.

## Results

Very satisfying! I can say this is the easiest and lightest SSG. Only 1 config and 1 layout, and you can create a whole website! I used to only think about appearance and features, now I think about speed and output. This is almost similar to [Karl Bartel's thinking](https://www.karl.berlin/blog.html). Let me tell you what the advantages are:

- **[Easy workflow](/posts/rewrite-website/)**: _`npm install` (1x), `npm start`, deploy_.
- **Markdown and Frontmatter**: There's nothing very different about the existing md files: It's just a Markdown file and a bit of Frontmatter data. Almost all SSGs have this syntax and frontmatter, so I can easily try other SSGs (except Hugo and Zola).
- **Output = layout but changed**: This one may be a bit strange, but it makes the most sense: all pages are processed using the same layout, no components or layout chaining. (Still strange)
- **RSS Feed**: This one uses absolute urls. Almost every blog has them, and no one hates them. It's just 1 file that's easy to create and you can use it in any RSS feed. (The layout is similar to [RSS in nih.ar](https://nih.ar/rss.xml))

## Last update ever

As I said in [this commit](https://github.com/w3teal/weblog.js/commit/c8b07f029f9824c07d7e5336926742c80265177d), I have no intention of updating it anymore, it's pretty much perfect. Now after spending a lot of time coding and procrastinating on my blogging, I can now focus on it fully.

Feel free to use it, or even create an Issue if you have any issues, and make a Pull request for something. I'll keep this [weblog.js](https://github.com/w3teal/weblog.js) custom code alive!