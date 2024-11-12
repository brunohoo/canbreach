const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

function getOrdinal(n) {
  let suffix = "th";
  if (n % 100 < 11 || n % 100 > 13) {
    switch (n % 10) {
      case 1: suffix = "st"; break;
      case 2: suffix = "nd"; break;
      case 3: suffix = "rd"; break;
    }
  }
  return n + suffix;
}

function getPublications() {
  const publicationsPath = path.join(hexo.source_dir, '_data/publications.yml');
  const fileContents = fs.readFileSync(publicationsPath, 'utf8');
  return yaml.load(fileContents);
}

hexo.extend.helper.register('getPublications', getPublications);

hexo.extend.helper.register('getPublicationsByAuthor', function(authorName) {
  const publications = getPublications();
  return publications.filter(pub => pub.authors.includes(authorName));
});

hexo.extend.helper.register('renderPublication', function(pub) {
  // const authorsWithLinks = ["Negar Ghahramani", "Daniel Adria", "Nahyan Rana"];
  const authorsWithLinks = [];

  const authorLinks = pub.authors.map(author => {
    const urlFriendlyName = author.trim().toLowerCase().replace(/\s+/g, '-');
    if (authorsWithLinks.includes(author.trim())) {
      return `<a href="/team/${urlFriendlyName}.html">${author.trim()}</a>`;
    } else {
      return author.trim();
    }
  }).join(', ');

  let titleHtml = pub.title;
  if (pub.doi) {
    titleHtml = `<a href="${pub.doi}" target="_blank">${pub.title}</a> <span class="external-link-icon" aria-hidden="true">&#8599;</span>`;
  }
  let infoArray = [];

  // Function to get date string
  function getDateString() {
    if (pub.month && pub.year) {
      return `${pub.month} ${pub.year}`;
    } else if (pub.month) {
      return pub.month;
    } else if (pub.year) {
      return pub.year;
    }
    return '';
  }

  if (pub.type === 'Theses') {
    if (pub.subtype) infoArray.push(pub.subtype);
    if (pub.university) infoArray.push(pub.university);
  } 
  
  else if (pub.type === 'Journal articles') {
    if (pub.journal) infoArray.push(pub.journal);
    if (pub.volume) infoArray.push(`volume ${pub.volume}`);
    if (pub.issue) infoArray.push(`issue ${pub.issue}`);
  } 
  
  else if (pub.type === 'Conference papers') {
    let conferenceInfo = '';
    if (pub.number) {
      const ordinalNumber = getOrdinal(parseInt(pub.number));
      conferenceInfo += `${ordinalNumber} `;
    }
    if (pub.conference) {
      conferenceInfo += pub.conference;
    }
    if (conferenceInfo) {
      infoArray.push(conferenceInfo.trim());
    }
    if (pub['event-place']) infoArray.push(pub['event-place']);
  } 
  
  else if (pub.type === 'Databases') {
    if (pub.repository) infoArray.push(pub.repository);
  } 
  
  else if (pub.type === 'Reports') {
    if (pub.institution) infoArray.push(pub.institution);
  } 
  
  else if (pub.type === 'Talks') {
    if (pub.occasion) infoArray.push(pub.occasion);
    let conferenceInfo = '';
    if (pub.number) {
      const ordinalNumber = getOrdinal(parseInt(pub.number));
      conferenceInfo += `${ordinalNumber} `;
    }
    if (pub.conference) {
      conferenceInfo += pub.conference;
    }
    if (conferenceInfo) {
      infoArray.push(conferenceInfo.trim());
    }
    if (pub['event-place']) infoArray.push(pub['event-place']);
  }

  // Add date as the penultimate item
  const dateString = getDateString();
  if (dateString) {
    infoArray.push(dateString);
  }

  // Add pages as the last item, if available
  if (pub.pages) {
    infoArray.push(`pages ${pub.pages}`);
  }

  const infoHtml = infoArray.join(', ');

  return `
    <div class="publication">
      <div class="pub-author">${authorLinks}</div>
      <div class="pub-title">${titleHtml}</div>
      <div class="pub-info">${infoHtml}</div>
    </div>
  `;
});