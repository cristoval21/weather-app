class Weather {
  constructor(cityName) {
    this._cityName = cityName;
    this._cityData = this.getData();
  }

  async getData() {
    const response = await fetch(
      'https://api.weatherapi.com/v1/current.json?key=eff8835c269b4d5b910101327241205&q=' +
        encodeURIComponent(this._cityName)
    );
    const data = await response.json();
    return data;
  }

  async getLocationData() {
    const data = await this._cityData;
    return data.location;
  }

  async getCurrentData() {
    const data = await this._cityData;
    return data.current;
  }

  async getConditionData() {
    const data = await this.getCurrentData();
    return data.condition;
  }
}

const $searchForm = document.getElementById('search-form');
const $searchInput = document.getElementById('search-input');
const $searchButton = document.getElementById('search-button');

$searchButton.addEventListener('click', (e) => {
  if ($searchForm.checkValidity()) {
    e.preventDefault();
    const weather = new Weather($searchInput.value);
    weather.getLocationData().then((res) => console.log(res));
  }
});
