const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const matter = require('gray-matter');
const config = require('./weblog.config.json');

const inputDir = config.inputDir;
const outputDir = config.outputDir;
const postsDir = path.join(inputDir, 'posts');

// Format date to YYYY-MM-DD
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
}

// Determine output path for the converted HTML file
function getOutputPath(mdFile) {
    const relativePath = path.relative(inputDir, mdFile);
    const parsed = path.parse(relativePath);

    if (parsed.dir === '') {
        return parsed.name.startsWith('_') ?
            path.join(outputDir, `${parsed.name.substring(1)}.html`) :
            path.join(outputDir, parsed.name, 'index.html');
    }
    return parsed.name.startsWith('_') ?
        path.join(outputDir, parsed.dir, `${parsed.name.substring(1)}.html`) :
        path.join(outputDir, parsed.dir, parsed.name, 'index.html');
}

// Build the HTML structure
function buildHTML({ title, date, description, content }) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - ${config.siteTitle}</title>
    <meta name="description" content="${description.replace(/"/g, '&quot;')}">
    <link rel="icon" href="/assets/logo.svg" sizes="any" type="image/svg+xml">
    <link rel="stylesheet" href="/assets/style.css">
</head>
<body>
    <header>
        <nav>
            <a class="logo" href="/"><img src="/assets/logo.svg" alt="${config.siteTitle} Logo" width="48" height="48"></a>
            <nav>
                <a href="/archives/">Post Archives</a>
                <a href="/about/">About</a>
                <a href="/slashes/">Slashes</a>
            </nav>
        </nav>
        <h1>${title}</h1>
        <p class="date">${date}</p>
        <p class="description">${description}</p>
    </header>
    <article class="markdown-body">
        ${content}
    </article>
    <footer>
        <p>© ${new Date().getFullYear()} ${config.siteTitle}<br>
        <small>Content of this website is licensed under <a href="${config.licenseUrl}">${config.licenseName}</a> unless otherwise stated. <br>
        Contact me via <a href="mailto:${config.contactEmail}">Email</a>, <a rel="me" href="${config.githubUrl}">GitHub</a>, and <a rel="me" href="${config.mastodonUrl}">Mastodon</a>. Or else on the <a href="/contact/">/contact page</a>, but I may take a long time to respond. <br>
        Check out the <a href="/colophon/">/colophon page</a> to see how this website is built. Subscribe with your RSS reader from <a href="/rss.xml">rss.xml</a>.</small>
        </p>
    </footer>
</body>
</html>`;
}

// Get posts and sort them by date
function getPosts(limit = null) {
    const files = [];

    function traverse(dir) {
        fs.readdirSync(dir).forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                traverse(fullPath);
            } else if (file.endsWith('.md')) {
                const { data } = matter(fs.readFileSync(fullPath, 'utf-8'));
                files.push({
                    title: data.title || file.replace('.md', ''),
                    date: data.date ? formatDate(data.date) : '',
                    description: data.description || config.siteDescription,
                    url: `/${path.relative(config.inputDir, fullPath).replace(/\\/g, '/').replace(/\.md$/, '/')}`
                });
            }
        });
    }

    traverse(config.postsDir);
    files.sort((a, b) => new Date(b.date) - new Date(a.date));
    return limit ? files.slice(0, limit) : files;
}

// Generate the post listing
function generateListing(limit = null) {
    const posts = getPosts(limit);
    return `<ul>
        ${posts.map(f => `<li>${f.date} - <a href="${f.url}">${f.title}</a></li>`).join('\n')}
    </ul>`;
}

// Generate RSS feed
function generateRSS() {
    const posts = getPosts();
    const rssItems = posts.map(post => `
        <item>
            <title><![CDATA[${post.title}]]></title>
            <link>${config.siteUrl}${post.url}</link>
            <description><![CDATA[${post.description}]]></description>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        </item>
    `).join('\n');

    const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
        <channel>
            <title><![CDATA[${config.siteTitle}]]></title>
            <link>${config.siteUrl}</link>
            <description><![CDATA[${config.siteDescription}]]></description>
            ${rssItems}
        </channel>
    </rss>`;

    fs.writeFileSync(path.join(outputDir, 'rss.xml'), rssFeed, 'utf-8');
    console.log('RSS feed generated: rss.xml');
}

// Convert Markdown to HTML
function convertMarkdown(mdFile) {
    const raw = fs.readFileSync(mdFile, 'utf-8');
    const { data, content } = matter(raw);

    const listingFull = generateListing();
    const listingLatest = (match, x) => generateListing(parseInt(x, 10));

    // Replace ${_listing} and ${_listing latest X}
    const replacedContent = content
        .replace(/\$\{_listing\}/g, listingFull)
        .replace(/\$\{_listing latest (\d+)\}/g, listingLatest);

    const htmlContent = marked(replacedContent);
    const outputPath = getOutputPath(mdFile);

    const html = buildHTML({
        title: data.title || 'Untitled',
        date: data.date ? formatDate(data.date) : '',
        description: data.description || '',
        content: htmlContent
    });

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, html, 'utf-8');
    console.log(`Converted: ${mdFile} → ${outputPath}`);
}

// Process all Markdown files in the directory
function processDirectory(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.md')) {
            convertMarkdown(fullPath);
        }
    });
}

// Run the conversion process
processDirectory(inputDir);
generateRSS();