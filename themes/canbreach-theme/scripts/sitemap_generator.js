const urlset = require('xmlbuilder').create('urlset', { encoding: 'UTF-8' })
  .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

hexo.extend.generator.register('sitemap', function(locals) {
  const config = hexo.config;
  const baseUrl = config.url;
  
  // Track URLs to prevent duplicates
  const addedUrls = new Set();

  function addUrl(loc, date, freq = 'monthly', priority = 0.5) {
    // Normalize URL by removing trailing slashes and index.html
    const normalizedLoc = loc.replace(/\/index\.html$/, '/')
                            .replace(/\/$/, '');
    
    if (addedUrls.has(normalizedLoc)) {
      return; // Skip if URL already added
    }
    addedUrls.add(normalizedLoc);

    const url = urlset.ele('url');
    url.ele('loc', normalizedLoc);
    if (date) {
      url.ele('lastmod', date.toISOString().substring(0, 10));
    }
    url.ele('changefreq', freq);
    url.ele('priority', priority);
  }

  // Add home page
  addUrl(baseUrl, new Date(), 'daily', 1.0);

  // Add regular pages
  locals.pages.forEach(page => {
    if (page.path.includes('search/')) return; // Skip search pages
    const url = `${baseUrl}/${page.path}`;
    addUrl(url, page.updated || page.date);
  });

  // Add posts if any
  locals.posts.forEach(post => {
    const url = `${baseUrl}/${post.path}`;
    addUrl(url, post.updated || post.date);
  });

  return {
    path: 'sitemap.xml',
    data: urlset.end({ pretty: true })
  };
});