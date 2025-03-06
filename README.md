# weblog.js

`weblog.js` is a minimal blogging using Node.js. Using [Marked.js](https://www.npmjs.com/package/marked) and [gray-matter](https://www.npmjs.com/package/gray-matter).  
See the [blog post](https://w3teal.is-a.dev/posts/rewrite-website/) for more details.

## Quickstart

1. Clone this repository and install dependencies
   ```
   https://github.com/w3teal/weblog.js.git
   cd weblog.js
   npm install
   ```
2. Build the website
   ```
   npm start
   ```

## Configuration

### Import and output folder

Instead of using the default `content` and `_site` directory, you can configure it in `const inputDir`/`outputDir` in [weblog.config.json](https://github.com/w3teal/weblog.js/blob/main/weblog.config.json). (In the output folder, you can also use that directory as asset storage)

### Edit layout

You can create your own custom layout by changing on the [`function buildHTML` part](https://github.com/w3teal/weblog.js/blob/17655d78594fcf4002c4d0d3c0466abbd32ff3e6/weblog.js#L33) in weblog.js.

### Frontmatter

You can use the default `title`, `date`, and `description` data as frontmatter and reusable in layout. You can also add another data as you want, for example:
```diff
  ---
  title: More data
+ ifykyk: Apple
  ---
```
You can use the `ifykyk` data as `${ifykyk}` in layout.

### Add post lists

You can add `${_listing}` to post you want. e.g. `_content/_index.md`, the listing will be shown at that page (`index.html`).  
If you just want to add listing to adjusted latest posts, you can use e.g. `${_listing latest 2}`. [File example](https://github.com/w3teal/blog.js/blob/main/content/_index.md)

## Deploy

1. Go to the output directory and init
   ```
   cd _site
   git init
   ```
2. Publish the repository with your desired client, like i use GitHub Desktop.
3. Deploy
   - You can deploy it in GitHub Pages, but it will broke in url like `USERNAME.github.io/BLOG`. If you want to deploy it in GitHub Pages, you should name the repository as `USERNAME.github.io`, or use your own [custom domain for that repo](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
   - For easier deploy, i recommend you to use Vercel. Just go to your [Vercel dashboard](https://vercel.com/), Click "Add New" > "Project" and click "Import" to the repo.

---

You can see the result in my [_site repo](https://github.com/w3teal/_site).

## Note

This project is not actively developed, and most updates are here for my blog at [w3teal.is-a.dev](https://w3teal.is-a.dev/). Use this project at your own risk, updates are not guaranteed! (But if you don't expect that, and just want to use a light and stable SSG, this might be for you).
