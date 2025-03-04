const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const matter = require('gray-matter');

const inputDir = 'content';
const outputDir = '_site';

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
}

function getOutputPath(mdFile) {
    const relativePath = path.relative(inputDir, mdFile);
    const parsed = path.parse(relativePath);

    if (parsed.dir === '') {

        if (parsed.name.startsWith('_')) {
            return path.join(outputDir, `${parsed.name.substring(1)}.html`);
        }
        return path.join(outputDir, parsed.name, 'index.html');
    }

    if (parsed.name.startsWith('_')) {
        return path.join(outputDir, parsed.dir, `${parsed.name.substring(1)}.html`);
    }
    return path.join(outputDir, parsed.dir, parsed.name, 'index.html');
}

function buildHTML({
    title,
    date,
    description,
    content
}) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - W3Teal</title>
    <meta name="description" content="${description}">
    <link rel="shortcut icon" href="/assets/favicon.ico">
    <link rel="stylesheet" href="/assets/style.css">
</head>
<body>
    <header>
        <nav>
            <a class="logo" href="/"><img src="/assets/logo.svg" alt="W3 Logo" width="48" height="48"></a>
            <nav>
                <a href="/archives/">Post Archives</a>
                <a href="/about/">About</a>
                <a href="/slashes/">Slashes</a>
            </nav>
        </nav>
        <h1>${title}</h1>
        <p class="date">${date}</p>
        ${description ? `<p class="description">${description}</p>` : ''}
    </header>
    <main class="markdown-body">
        ${content}
    </main>
</body>
</html>`;
}

function generateListing(limit = null) {
    const files = [];

    function traverse(dir) {
        fs.readdirSync(dir).forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                traverse(fullPath);
            } else if (file.endsWith('.md')) {
                const {
                    data
                } = matter(fs.readFileSync(fullPath, 'utf-8'));
                files.push({
                    title: data.title || file.replace('.md', ''),
                    date: data.date ? formatDate(data.date) : '',
                    url: `/${path.relative(inputDir, fullPath).replace(/\\/g, '/').replace(/\.md$/, '/')}`
                });
            }
        });
    }
    traverse(path.join(inputDir, 'posts'));
    files.sort((a, b) => new Date(b.date) - new Date(a.date));
    const limitedFiles = limit ? files.slice(0, limit) : files;
    return `<ul>${limitedFiles.map(f => `<li>${f.date} - <a href="${f.url}">${f.title}</a></li>`).join('')}</ul>`;
}

function convertMarkdown(mdFile) {
    const raw = fs.readFileSync(mdFile, 'utf-8');
    const {
        data,
        content
    } = matter(raw);

    let listing = generateListing();
    const listingMatch = raw.match(/\$\{_listing(?: latest (\d+))?}/);
    if (listingMatch) {
        listing = generateListing(listingMatch[1] ? parseInt(listingMatch[1]) : null);
    }

    const htmlContent = marked(content.replace(/\$\{_listing(?: latest \d+)?}/g, listing));
    const outputPath = getOutputPath(mdFile);

    const html = buildHTML({
        title: data.title || 'Untitled',
        date: data.date ? formatDate(data.date) : '',
        description: data.description || '',
        content: htmlContent
    });

    fs.mkdirSync(path.dirname(outputPath), {
        recursive: true
    });
    fs.writeFileSync(outputPath, html, 'utf-8');
    console.log(`Converted: ${mdFile} → ${outputPath}`);
}

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

processDirectory(inputDir);