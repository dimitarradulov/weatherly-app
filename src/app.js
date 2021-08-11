'use script';
import { html, render } from 'https://unpkg.com/lit-html?module';

const API_KEY = 'a8d61c16d66050cedd3700780014c989';
const baseUrl = 'https://api.openweathermap.org/';

const cityInputEl = document.getElementById('city');
const buttonEl = document.querySelector('.btn');
const mainEl = document.querySelector('.main');

const weatherInfoTemplate = (city, metric) => html`
  <div class="card border-primary mb-3" style="max-width: 20rem;">
    <div class="card-header">Weather Info - ${city.name}</div>
    <div class="card-body">
      <h4 class="card-title">${city.weather[0].main}</h4>
      <p class="card-text d-flex flex-column">
        <span>Current Temp: ${city.main.temp} ${metric}</span>
        <span>Min. Temp: ${city.main.temp_min} ${metric}</span>
        <span>Max. Temp: ${city.main.temp_max} ${metric}</span>
      </p>
    </div>
  </div>
`;

const getCity = (ev) => {
  ev.preventDefault();

  const radioButtons = document.querySelectorAll('input[name="metric-choice"]');

  let selectedValue;

  for (const btn of radioButtons) {
    if (btn.checked) {
      selectedValue = btn.value;
      break;
    }
  }

  let metric;

  switch (selectedValue) {
    case 'standard':
      metric = '°K';
      break;
    case 'imperial':
      metric = '°F';
      break;
    case 'celsius':
      metric = '°C';
      break;
  }

  fetch(
    `${baseUrl}/data/2.5/weather?q=${cityInputEl.value}&appid=${API_KEY}&units=${selectedValue}`
  )
    .then((res) => res.json())
    .then((data) => {
      render(weatherInfoTemplate(data, metric), mainEl);
    });
};

buttonEl.addEventListener('click', getCity);
