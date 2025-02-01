import dotenv from 'dotenv';
dotenv.config();
// TODO: Define a class for the Weather object
class Weather {
    constructor(city, date, tempF, windSpeed, humidity, icon, iconDescription) {
        this.city = city;
        this.date = date;
        this.tempF = tempF;
        this.windSpeed = windSpeed;
        this.humidity = humidity;
        this.icon = icon;
        this.iconDescription = iconDescription;
    }
}
// TODO: Complete the WeatherService class
class WeatherService {
    constructor() {
        this.city = '';
        this.baseURL = process.env.API_BASE_URL || '';
        this.apiKey = process.env.API_KEY || '';
    }
    // TODO: method to fetch weather based on city 
    async getWeatherByCity(city) {
        this.city = city;
        try {
            const geoResponse = await fetch(`${this.baseURL}/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`);
            const geoLocationData = await geoResponse.json();
            // console.log(geoLocationData);
            let parsedCoordinates = geoLocationData[0];
            let coordinates = {
                name: parsedCoordinates.name,
                lat: parsedCoordinates.lat,
                lon: parsedCoordinates.lon,
                country: parsedCoordinates.country,
                state: parsedCoordinates.state
            };
            return await this.getWeatherForcast(coordinates);
        }
        catch (error) {
            console.error("Failed to fetch weather data:", error);
            throw error;
        }
    }
    // TODO: method to fetch 5 day forecast based on lon and lat 
    async getWeatherForcast(coord) {
        const url = `${this.baseURL}/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&units=imperial&appid=${this.apiKey}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP Error.  Status: ${response.status}`);
            }
            //empty array to store weather data 
            const dataVar = [];
            const data = await response.json();
            // shows 5 days of forcast 
            // iterrates over the 40 objects and grabs every 7th entry which DOES grab a 5 day forcast but at various times
            for (let i = 0; i < data.list.length; i += 7) { // console.log(data.list[i])
                const newForcast = new Weather(this.city, data.list[i].dt_txt, data.list[i].main.temp, data.list[i].wind.speed, data.list[i].main.humidity, data.list[i].weather[0].icon, data.list[i].weather[0].description);
                dataVar.push(newForcast);
            }
            return dataVar;
        }
        catch (error) {
            console.error('Error fetching weather data:', error);
            throw error;
        }
    }
}
export default new WeatherService();
