const URL_POPULAR = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top';
const API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/search-by-keyword?keyword=';

const form = document.querySelector('.header__search-form');
const input = document.querySelector('#input');
const btn = document.querySelector('.header__search-form button');

const modalBg = document.querySelector('.modal__bg');
const modal = document.querySelector('.modal');

window.addEventListener('load', outputMovies(URL_POPULAR));

function outputMovies(url) {
  fetch(url, {
    method: 'GET',
    headers: {
        'X-API-KEY': '2df54163-87cd-4f05-85ee-3f92b13e669c',
        'Content-Type': 'application/json',
    },
  })
  .then(res => res.json())
    .then(json => {
      console.log(json);
      outputMovieCards(json);
    })
  .catch(err => console.log(err))
}

function outputMovieCards(data) {
  document.querySelector('.movies').textContent = '';
  data.films.forEach((film) => {
    let movie = document.createElement('a');
    movie.classList.add('movie')
    movie.setAttribute('href', '#');

    let poster = document.createElement('div');
    poster.classList.add('movie__poster');

    let img = document.createElement('img');
    img.setAttribute('src', `${film.posterUrl}`);
    img.setAttribute('alt', `${film.nameEn}`);

    poster.appendChild(img);

    let title = document.createElement('p');
    title.classList.add('movie__title');
    const filmName = film.nameEn || film.nameRu;
    title.textContent = filmName;

    let category = document.createElement('p');
    category.classList.add('movie__category');
    let genres = film.genres.reduce((acc, el, index) => {
      return index === 0 ? acc += el.genre : acc + ', ' + el.genre;
    }, '');
    category.textContent = genres;

    let rating = document.createElement('p');
    rating.classList.add('movie__rating');
    rating.textContent = `${film.rating || 0.0}`;
    if (+film.rating >= 9) rating.classList.add('rating--green');
    if (+film.rating >= 6) rating.classList.add('rating--orange');
    if (+film.rating < 6) rating.classList.add('rating--red');

    movie.appendChild(poster);
    movie.appendChild(title);
    movie.appendChild(category);
    movie.appendChild(rating);

    const countrisForModal = film.countries.reduce((acc, el, index) => {
      return index === 0 ? acc += el.country : acc + ', ' + el.country;
    }, '')

    movie.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(film.posterUrl, filmName, film.year, genres, film.filmLength, countrisForModal);
      document.body.classList.add('stop-scloll');
    });

    document.querySelector('.movies').appendChild(movie);
  })
}


// form
form.addEventListener('submit', (e) => {
  e.preventDefault();
})

// modal
async function openModal(poster, filmName, year, genres, filmLength, countris) {
  modal.classList.add('opened');
  modalBg.classList.add('opened');

  modal.innerHTML = `
    <div class="modal__poster">
      <img src="${poster}" alt="">
    </div>
    <h2>
      <span class="modal__title">${filmName}</span>
      <span class="modal__year">${year}</span>
    </h2>
    <ul class="modal__list-info">
      <li class="modal__category">${genres}</li>
      <li class="modal__time">${filmLength}</li>
      <li class="modal__countries">${countris}</li>
      <li class="modal__description"></li>
    </ul>
    <button class="modal__close">Close</button>
  `;

  document.querySelector('.modal__close').addEventListener('click', closeModal);
}

function closeModal() {
  modal.classList.remove('opened');
  modalBg.classList.remove('opened');
  document.body.classList.remove('stop-scloll');
}

window.addEventListener('click', (e) => {
  if (e.target.closest('.modal__bg.opened') && !e.target.closest('.modal.opened')) {
    modalBg.classList.remove('opened');
    modal.classList.remove('opened');
    document.body.classList.remove('stop-scloll');
  }
})