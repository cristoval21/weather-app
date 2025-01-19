const locationInput = document.querySelector('#location-input');
const temperature = document.querySelector('.data__temperature');
const conditions = document.querySelector('.data__conditions');
const humidity = document.querySelector('.details__humidity');
const wind = document.querySelector('.details__wind');
const cloud = document.querySelector('.details__cloud');

async function getWeatherData(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=current&key=CZ2S2ZHKWFZ5H35K7LGK3VXQC`
  );
  const data = await response.json();
  return data;
}

function updateUI(data) {
  const currentConditions = data.currentConditions;

  locationInput.value = data.resolvedAddress;
  temperature.textContent = currentConditions.temp;
  conditions.textContent = currentConditions.conditions;
  humidity.textContent = currentConditions.humidity;
  wind.textContent = currentConditions.windspeed;
  cloud.textContent = currentConditions.cloudcover;
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
