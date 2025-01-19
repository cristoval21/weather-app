const locationInput = document.querySelector('#location-input');
const dataContainer = document.querySelector('.widget__data-container');
const temperature = document.querySelector('.data__temperature');
const conditions = document.querySelector('.data__conditions');
const humidity = document.querySelector('.details__humidity');
const wind = document.querySelector('.details__wind');
const cloud = document.querySelector('.details__cloud');
const loader = document.querySelector('.loading');

async function getWeatherData(location) {
  displayLoading();
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=current&key=CZ2S2ZHKWFZ5H35K7LGK3VXQC`
  );
  const data = await response.json();
  return data;
}

function updateUI(data) {
  hideLoading();
  const currentConditions = data.currentConditions;

  locationInput.value = data.resolvedAddress;
  temperature.textContent = currentConditions.temp;
  conditions.textContent = currentConditions.conditions;
  humidity.textContent = currentConditions.humidity;
  wind.textContent = currentConditions.windspeed;
  cloud.textContent = currentConditions.cloudcover;
}

function displayLoading() {
  loader.classList.add('display');
  dataContainer.style.display = 'none';
}

function hideLoading() {
  loader.classList.remove('display');
  dataContainer.style.display = 'block';
}

locationInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    getWeatherData(locationInput.value).then((data) => {
      updateUI(data);
    });
  }
});

getWeatherData('Los Angeles').then((data) => {
  updateUI(data);
});
