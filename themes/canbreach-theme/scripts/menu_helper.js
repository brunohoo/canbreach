hexo.extend.helper.register('get_menu_items', function() {
  return this.site.pages.data.filter(page => {
    // Check if the page has menu_item not set to false, has a menu_order, and is an index page
    return page.menu_item !== false && page.menu_order !== undefined && page.path.endsWith('index.html');
  }).sort((a, b) => {
    // Sort by menu_order
    return a.menu_order - b.menu_order;
  }).map(page => {
    // Remove 'index.html' from the end of the URL
    const url = this.url_for(page.path).replace(/index\.html$/, '');
    return {
      title: page.title || page.slug,
      url: url
    };
  });
});