# CanBreach Website

A research team website built with [Hexo](https://hexo.io/) for the CanBreach project, a NSERC-funded university-industry research collaboration focused on tailings dam breach analysis. The site showcases research directions, team members, and academic publications.

## Features

### 🎨 Custom theme
- Responsive design with a clean, academic aesthetic
- Scrollable header with dynamic resizing
- Color scheme based on dark greens (#163d2f) and neutral tones
- Mobile-friendly layout adaptations

### 📱 Key components
- **Team member profiles**
  - Random ordering of team members on index page
  - Individual profile pages with publications
  - Circular profile photos with hover animations
  
- **Publications management**
  - Multiple publication types (Theses, Journal articles, Conference papers, etc.)
  - Automatic citation formatting
  - DOI linking with external link indicators
  - Sticky sidebar navigation
  - Author linking to team member profiles
  - YAML-based data management
  
- **Research directions**
  - Tabbed content for different project generations
  - Visual representation of university partnerships
  - Structured presentation of research focus areas

- **Search functionality**
  - Full-text search across all content
  - Highlighted search terms in results
  - Relevance-based result ranking
  - Search result previews with context

### 🔧 Technical features
- YAML-based publication data management
- Automated search index generation
- Dynamic partner logo display with captions
- Responsive image handling
- Clean URL structure

## Directory structure

```
canbreach/
├── themes/canbreach-theme/
│   ├── layout/
│   │   ├── _partial/
│   │   │   └── tabbed-content.ejs
│   │   ├── author.ejs
│   │   ├── index.ejs
│   │   ├── layout.ejs
│   │   ├── page.ejs
│   │   ├── publications.ejs
│   │   ├── search.ejs
│   │   └── team-index.ejs
│   ├── scripts/
│   │   ├── menu_helper.js
│   │   ├── partner-names.js
│   │   ├── publications.js
│   │   └── search_index.js
│   └── source/
│       └── css/
│           └── style.css
└── source/
    ├── _data/
    │   └── publications.yml
    ├── team/
    │   ├── index.md
    │   ├── a-bunch-of-members-here.md
    ├── directions/
    │   └── index.md
    ├── publications/
    │   └── index.md
    ├── search/
    │   └── index.md
    └── index.md
```

## Content management

### Managing tabbed content
To disable tabbed content and show only first generation content:

1. Open `/themes/canbreach-theme/layout/_partial/tabbed-content.ejs`
2. Set the configuration variable at the top:
```javascript
<%
// Set this to true to show only first generation content
const showOnlyFirstGen = true;
%>
```

### Adding team members
1. Create a new page in `source/team/[name].md`
2. Include required front matter:
```
---
title: [Full Name]
date: [Date]
menu_item: true
menu_order: [number]
layout: author
photo: [path-to-photo]
---
```
3. Add the team member name to the author linking system in `/themes/canbreach-theme/scripts/publications.js`:
```
const authorsWithLinks = [
  "Negar Ghahramani",
  "Daniel Adria",
  "Nahyan Rana",
  "New Team Member Name"  // Add the name here
];
```
This step is necessary for creating automatic links from publications to author profiles.

### Managing publications
1. Edit `source/_data/publications.yml`
2. Publications are organized by type with required fields:
```yaml
- type: [Publication Type]
  title: [Title]
  authors: [Author Array]
  year: [Year]
  doi: [DOI link] # optional
  # Additional fields based on type:
  journal: [Journal Name] # for articles
  conference: [Conference Name] # for conference papers
  subtype: [Thesis Type] # for theses
  repository: [Repository Name] # for databases
```

### Publication dates
The `month` field in `publications.yml` refers to the issue date, not the publication date. For example:
- For a journal article published online in January but issued in the March edition, use `month: March`
- For conference papers, use the month when the conference was held
- For theses, use the month of graduation/defense

[This image](https://i.imgur.com/Za4J62t.png) provides some explanation.

### Creating pages
1. Add new pages in `source/`
2. Include menu metadata for navigation:
```yaml
---
title: [Page title]
menu_item: true
menu_order: [number]
---
```

### Supporting generational content
Pages can include both first and second generation content using the front matter:
```
---
first_generation: |
  [First generation content]
second_generation: |
  [Second generation content]
---
```

## Development

### CSS customization
- Main styles in `themes/canbreach-theme/source/css/style.css`
- Key color variables:
  - Primary: #163d2f
  - Secondary: #2d7f62
  - Text: #333333

### Key components
- Scrollable header functionality
- Publication rendering system
- Search indexing and display
- Team member randomization
- Partner logo management

## Deployment

1. Generate static files:
```bash
hexo generate
```

2. Deploy to your hosting service:
```bash
hexo deploy
```

## Browser support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Project structure overview

### Research focus
First generation:
- Field and remote observation (University of Waterloo)
- Laboratory-based physical modelling (Queen's University)
- Numerical modelling (University of British Columbia)

### Partners
First generation:
- Universities: UBC, Waterloo, Queen's
- Industrial Partners: BGC Engineering, Klohn Crippen Berger, Golder/WSP, Imperial Oil, Suncor Energy
- Funding: NSERC

## Contributing
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License
This project is licensed under the MIT License:

```
MIT License

Copyright (c) 2024 CanBreach research team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### What the MIT license means

- ✅ You can use the code commercially
- ✅ You can modify the code
- ✅ You can distribute the code
- ✅ You can use the code privately
- ✅ You can sublicense the code
- ✅ The original copyright/license notice must be included
- ❌ No liability or warranty from the authors

### Using this project

1. When using this project, maintain the copyright notice in all copies
2. You can modify and adapt the code for your needs
3. You don't need to share your modifications, but it's encouraged
4. You must include the MIT License text in any substantial portions of the code that you use

To properly credit this project in your own work, include:
```
Based on CanBreach website (https://github.com/brunohoo/canbreach)
Copyright (c) 2024 CanBreach research team
Licensed under the MIT License
```

## Contact
Bruno Oliveira Rodrigues,
brodrigues@eoas.ubc.ca