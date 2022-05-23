import debounce from 'lodash.debounce';
import handlebars from 'handlebars';
import countryItem from '../templates/country-item.hbs?raw';
import countryList from '../templates/country-list.hbs?raw';
import fetchCountry from './fetch-country';
import { fetchNoResults, fetchMoreResults } from './notification';

const cardContainer = document.querySelector('.js-card-container');
const SearchForm = document.querySelector('.input-search');

const search = () => {
  cardContainer.innerHTML = '';
  const serchedCountry = SearchForm.value;
  if (serchedCountry === '') return;
  fetchCountry(serchedCountry).then(fetchSucsess);
};
SearchForm.addEventListener('input', debounce(search, 500));

const createCardCountry = (templates, value) => {
  const markup = handlebars.compile(templates)(value);
  cardContainer.insertAdjacentHTML('beforeend', markup);
};

const fetchSucsess = value => {
  console.log(value);
  if (value.length === 1) {
    createCardCountry(countryItem, value[0]);
  } else if (value.length > 1 && value.length <= 10) {
    createCardCountry(countryList, value);
  } else if (value.length > 10) {
    fetchMoreResults();
  } else {
    fetchNoResults();
  }
};
