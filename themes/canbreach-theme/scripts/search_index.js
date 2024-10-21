const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

hexo.extend.generator.register('search_index', function(locals) {
  const searchIndex = locals.pages.data.concat(locals.posts.data).map(page => {
    let content = '';
    
    if (typeof page._content === 'string' && page._content.trim() !== '') {
      content = page._content;
    } else if (page.raw && typeof page.raw === 'string') {
      content = page.raw;
    }
    
    // Include content from first_generation and second_generation
    ['first_generation', 'second_generation'].forEach(field => {
      if (page[field] && typeof page[field] === 'string') {
        content += ' ' + page[field];
      }
    });

    // Remove YAML front matter
    content = content.replace(/^---[\s\S]*?---/, '');

    // Remove HTML tags
    content = content.replace(/<[^>]*>/g, '');

    // Remove Markdown formatting
    content = content.replace(/#{1,6}\s+/g, '');
    content = content.replace(/\*\*(.*?)\*\*/g, '$1');
    content = content.replace(/\*(.*?)\*/g, '$1');
    content = content.replace(/\[(.*?)\]\(.*?\)/g, '$1');

    // Remove extra whitespace
    content = content.replace(/\s+/g, ' ').trim();

    return {
      title: page.title || '',
      url: hexo.config.root + page.path,
      content: content,
      type: 'page'
    };
  });

  const publicationsPath = path.join(hexo.source_dir, '_data', 'publications.yml');
  if (fs.existsSync(publicationsPath)) {
    const publicationsData = yaml.load(fs.readFileSync(publicationsPath, 'utf8'));
    publicationsData.forEach(pub => {
      const flatContent = Object.entries(pub).map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key}: ${value.join(', ')}`;
        }
        return `${key}: ${value}`;
      }).join(' ');

      searchIndex.push({
        title: 'Publications',
        url: hexo.config.root + 'publications/#' + pub.type.toLowerCase().replace(/\s+/g, '-'),
        content: flatContent,
        type: 'publication',
        pubType: pub.type,
        pubTitle: pub.title,
        authors: pub.authors
      });
    });
  }

  return {
    path: 'search-index.json',
    data: JSON.stringify(searchIndex)
  };
});