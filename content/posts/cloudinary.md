---
title: Managing images through Cloudinary (and why I love it)
description: You don't always have to rely on Git to upload images!
date: 2025-03-01T02:43:43.921Z
tags:
  - tutorial
---
Since I use Reprose as my posting CMS, managing images has become the hardest part. I am too lazy to upload and commit each image via Git.

![Reprose imaging](https://res.cloudinary.com/w3teal/image/upload/v1740795542/2025-03-01_09_18_36-Editing_the_file___Reprose_ctcdd0.jpg)

So what was my solution? I searched for an image management website, and I found Cloudinary, a widely known image provider, including the Astro Paper demo which also uses Cloudinary as its default OG image provider. The dashboard is very easy to understand.

![Upload dashboard in Cloudinary](https://res.cloudinary.com/w3teal/image/upload/v1740795972/cloudinary-upload_aki9i2.png)
![Cloudinary dashboard](https://res.cloudinary.com/w3teal/image/upload/v1740795782/cloudinary_jnlqlx.png)

And to copy the URL to that image, just press this "**<>**" button.

![Copy URL to image in Cloudinary](https://res.cloudinary.com/w3teal/image/upload/v1740795886/cloudinary-copy_mg6vjw.jpg)

And other great reasons to use Cloudinary are:
* [Very extensive API](https://cloudinary.com/documentation/cloudinary_sdks)
* [Lots of customization possible](https://cloudinary.com/documentation/transformation_reference)
* Very fast, even faster than loading fonts!

## [rescname](https://github.com/w3teal/rescname)

I created a new project called "rescname" to use custom domain for Cloudinary. This project is very simple, just deploy and add environment name variable. And you can shorten url like:
https://res.cloudinary.com/ksjjaoko/image/upload/v1740793104/Example_wdy6ow.png
to
https://img.ksjjaoko.com/image/upload/v1740793104/Example_wdy6ow.png (Change custom domain via Vercel, you can also use free domain vercel.app.)

To get the environment name, go to [Settings > Product Environments](https://console.cloudinary.com/settings/product-environments). Here is an example of the environment name (here it is called "w3teal")

![Example of Environment name](https://res.cloudinary.com/w3teal/image/upload/v1740796563/cloudinary-env_opifgh.jpg)

If you want to change the name, just tap on the Environment name, and change the content of the "Cloud name" input.

![Changing the Environment (Cloud) name](https://res.cloudinary.com/w3teal/image/upload/v1740796841/cloudinary-name_kxga03.png)

Interested in using it? Just go to https://cloudinary.com/ and you will find the "Sign Up" button. Have fun here!

---

*Note: This post is not affiliated with Cloudinary.*
