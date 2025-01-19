async function getWeatherData(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=current&key=CZ2S2ZHKWFZ5H35K7LGK3VXQC`
  );
  const data = await response.json();
}

function updateUI() {}
