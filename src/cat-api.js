import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_80CxwJxDSI0d46nwjHkbQ5ApEhAv8jqtACSq2sCwO3T0AFNXf4Q3uBu4eNrM4cqG';

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds').then(response => {
    return response.data;
  });
}
export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      console.log(response);
      return response.data;
    });
}
