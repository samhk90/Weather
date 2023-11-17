import React ,{ useState, useEffect } from 'react';
import { WiDaySunny, WiCloudy, WiRain, WiSnow } from 'react-icons/wi';

const Card = () => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                const API_KEY = '801271f3886cf2fcf260ec83adea8d1f';

                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
                    .then(response => response.json())
                    .then(data => setWeatherData(data));
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

      const convertKelvinToFahrenheit = (kelvin) => {
        return Math.round((kelvin - 273.15) * 9/5 + 32);
      };
      const weatherIcons = {
        Clear: <WiDaySunny size={30} />,
        Clouds: <WiCloudy size={30} />,
        Rain: <WiRain size={30} />,
        Snow: <WiSnow size={30} />,
        // Add more weather conditions and icons as needed
    };
    
    return (
        <div className="card1 d-flex flex flex-row flex-nowrap justify-content-between">
            {weatherData && weatherData.list.filter((_, index) => index % 8 === 0).slice(0, 5).map((forecast, index)=> (
                <div key={index}>
                    <div className="date">    {new Date(forecast.dt * 1000).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
    })}</div>
                    <div className="infocard">
                        <div className="tinfo">
                        
                            <p>{forecast.weather[0].main}{forecast && weatherIcons[forecast.weather[0].main]}</p>
                        </div>
                        <div className="maininfo">
             {Math.round(forecast.main.temp_max - 273.15)}°C/{convertKelvinToFahrenheit(forecast.main.temp_max)}°F<br />
         {Math.round(forecast.main.temp_min - 273.15)}°C/{convertKelvinToFahrenheit(forecast.main.temp_min)}°F<br />
                             {forecast.main.humidity}%<br />
                     {new Date(weatherData.city.sunrise * 1000).toLocaleTimeString()}<br />
                     {new Date(weatherData.city.sunset * 1000).toLocaleTimeString()}<br />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;