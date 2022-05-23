const url = 'https://restcountries.com/v2/name/';
const filtrsOptions = '?fields=name,capital,population,languages,flags';
const fetchCountry = searchQuery =>
  fetch(`${url}${searchQuery}${filtrsOptions}`).then(response =>
    response.json(),
  );
export default fetchCountry;
