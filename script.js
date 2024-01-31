const btn = document.querySelector('.header__search-form button');


btn.addEventListener('click', (e) => {
  e.preventDefault();

  fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/top', {
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
})

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
    title.textContent = `${film.nameEn || film.nameRu}`;

    let category = document.createElement('p');
    category.classList.add('movie__category');
    let genres = film.genres.reduce((acc, el, index) => {
      return index === 0 ? acc += el.genre : acc + ', ' + el.genre;
    }, '');
    category.textContent = genres;
    console.log(genres)

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

    document.querySelector('.movies').appendChild(movie);
  })
}