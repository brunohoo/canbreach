/**
 * partner-names.js
 * 
 * This script dynamically adds partner names below their logos on the CanBreach website.
 * It works by:
 * 1. Targeting <a> elements with the class "partner-logo"
 * 2. Extracting the alt text from the image within each <a> element
 * 3. Creating a new structure that wraps the original <a> in a container div
 * 4. Adding a span with the partner name (from alt text) below the logo
 * 
 * This allows for maintaining clickable logos while adding non-clickable, aligned partner names.
 */

hexo.extend.filter.register('after_render:html', function(str) {
    return str.replace(/<a href="([^"]*)" target="_blank" class="partner-logo">([\s\S]*?)<\/a>/g, function(match, href, content) {
      const altMatch = content.match(/alt="([^"]+)"/);
      if (altMatch) {
        const altText = altMatch[1];
        return `
          <div class="partner-logo-container">
            <a href="${href}" target="_blank" class="partner-logo">
              ${content}
            </a>
            <span class="partner-name">${altText}</span>
          </div>
        `;
      }
      return match;
    });
  });