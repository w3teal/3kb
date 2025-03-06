const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const matter = require('gray-matter');
const config = require('./weblog.config.json');

const inputDir = config.inputDir;
const outputDir = config.outputDir;
const postsDir = config.postsDir;
const layoutPath = config.layoutPath;
const rssPath = path.join(outputDir, 'rss.xml');

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

// Create HTML file content based on layout and replace variables
function buildHTML(replacements) {
    let layout = fs.readFileSync(layoutPath, 'utf-8');

    Object.keys(replacements).forEach(key => {
        layout = layout.replace(new RegExp(`\\$\\{${key}\\}`, 'g'), replacements[key]);
    });

    return layout;
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

    traverse(postsDir);
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

    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(rssPath, rssFeed, 'utf-8'); 
    console.log('RSS feed generated:', rssPath);
}

// Convert Markdown to HTML
function convertMarkdown(mdFile) {
    const raw = fs.readFileSync(mdFile, 'utf-8');
    const { data, content } = matter(raw);

    const listingFull = generateListing();
    const listingLatest = (match, x) => generateListing(parseInt(x, 10));

    const replacedContent = content
        .replace(/\$\{_listing\}/g, listingFull)
        .replace(/\$\{_listing latest (\d+)\}/g, listingLatest);

    const htmlContent = marked(replacedContent);
    const outputPath = getOutputPath(mdFile);

    const layoutData = {
        title: data.title || 'Untitled',
        date: data.date ? formatDate(data.date) : '',
        description: data.description || '',
        content: htmlContent,
        siteTitle: config.siteTitle,
        lang: data.lang || 'en',
        rss: fs.readFileSync(path.join(outputDir, 'rss.xml'), 'utf-8')
    };

    const html = buildHTML(layoutData);

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

// Running weblog compiler, and vibing
function weblogCompiler() {
    generateRSS();
    processDirectory(inputDir);
}

weblogCompiler();