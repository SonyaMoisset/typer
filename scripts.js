const ENDPOINT = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const CITIES = [];

fetch(ENDPOINT)
  .then(blob => blob.json())
  .then(data => CITIES.push(...data));

function findMatches(wordToMatch, cities) {
  return CITIES.filter(place => {
    const REGEX = new RegExp(wordToMatch, 'gi');
    return place.city.match(REGEX) || place.state.match(REGEX)
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
  const MATCHARRAY = findMatches(this.value, CITIES);
  const HTML = MATCHARRAY.map(place => {
    const REGEX = new RegExp(this.value, 'gi');
    const CITYNAME = place.city.replace(REGEX, `<span class="hl">${this.value}</span>`);
    const STATENAME = place.state.replace(REGEX, `<span class="hl">${this.value}</span>`);

    return `
      <li>
        <span class="name">${CITYNAME}, ${STATENAME}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).join('');

  SUGGESTIONS.innerHTML = html;
}

const SEARCHINPUT = document.querySelector('.search');
const SUGGESTIONS = document.querySelector('.suggestions');

SEARCHINPUT.addEventListener('change', displayMatches);
SEARCHINPUT.addEventListener('keyup', displayMatches);
