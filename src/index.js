import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const select = document.querySelector('select.breed-select');
const catInfo = document.querySelector('div.cat-info');
const loader = document.querySelector('p.loader');
const error = document.querySelector('p.error');
const body = document.querySelector('body');

error.setAttribute('hidden', 'true');
loader.setAttribute('hidden', 'true');

fetchBreeds()
  .then(breeds => {
    const markup = breeds
      .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
      .join('');
    select.insertAdjacentHTML('beforeend', markup);
  })
  .catch(error => {
    Notiflix.Notify.failure(`Error ${error}`);
  });

select.addEventListener('change', event => {
  body.insertAdjacentHTML(
    'beforeend',
    `<div class = "myLoaderBackground"><span class="myLoader"></span></div>`
  );
  const myLoader = document.querySelector('div.myLoaderBackground');
  const value = select.value;
  fetchCatByBreed(value)
    .then(data => {
      const pic = data[0].url;
      const descr = data[0].breeds[0].description;
      const temper = data[0].breeds[0].temperament;
      const name = data[0].breeds[0].name;
      catInfo.innerHTML = '';
      const markup = `<div style = 'display: flex; gap:40px; margin-top: 40px;'>
    <img src = ${pic} alt = ${value} width='400px' />
    <div>
    <h1>${name}</h1><p>${descr}</p><p><b>Temperament: </b>${temper}</p>
    </div>
    </div>`;
      catInfo.insertAdjacentHTML('afterbegin', markup);
      myLoader.remove();
    })
    .catch(error => {
      Notiflix.Notify.failure(`Error ${error}`);
    });
});
