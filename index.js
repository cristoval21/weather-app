class Weather {
  constructor(cityName) {
    this._cityName = cityName;
    this._cityData = this.getData();
  }

  async getData() {
    const response = await fetch(
      'https://api.weatherapi.com/v1/forecast.json?key=eff8835c269b4d5b910101327241205&q=' +
        encodeURIComponent(this._cityName) +
        '&days=3'
    );
    const data = await response.json();
    return data;
  }

  async getLocation() {
    const data = await this._cityData;
    const location = data.location;
    return {
      name: location.name,
      region: location.region,
      country: location.country,
    };
  }

  async getCurrentWeather() {
    const data = await this._cityData;
    const currentData = data.current;
    return {
      temperature: currentData.temp_c,
      icon: currentData.condition.icon,
      condition: currentData.condition.text,
      date: currentData.last_updated,
    };
  }
}

const $searchForm = document.getElementById('search-form');
$searchForm.addEventListener('submit', handleSearch);

function handleSearch(e) {
  const $searchForm = document.getElementById('search-form');
  const $searchInput = document.getElementById('search-input');

  const $currentDate = document.getElementById('current-date');
  const $currentIcon = document.getElementById('current-icon');
  const $currentTemperature = document.getElementById('current-temperature');
  const $currentCondition = document.getElementById('current-condition');

  if ($searchForm.checkValidity()) {
    e.preventDefault();

    const weather = new Weather($searchInput.value);
    weather.getLocation().then((city) => {
      $searchInput.value = `${city.name}, ${city.country}`;
    });
    weather.getCurrentWeather().then((current) => {
      $currentDate.textContent = current.date;
      $currentIcon.src = current.icon;
      $currentTemperature.textContent = current.temperature;
      $currentCondition.textContent = current.condition;
    });
  }
}
