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
            const geoResponse = await fetch(`${this.baseURL}/geo/1.0/direct?q=${city}&limit=5&appid=${this.apiKey}`);
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
        const url = `${this.baseURL}/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${this.apiKey}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP Error.  Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            return data;
        }
        catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }
    // TODO: method to build and return your array of weather objects
    async getWeatherObjects(weather) {
        const weatherArray = weather.map((weather) => {
            const weatherObject = {
                city: weather.city,
                date: weather.date,
                tempF: weather.tempF,
                windSpeed: weather.windSpeed,
                humidity: weather.humidity,
                icon: weather.icon,
                iconDescription: weather.iconDescription,
            };
            // return await this.getCurrentWeather.
            return weatherObject;
        });
        /*
        //use filter method to possibly find current weather
          async getCurrentWeather (weather: Weather[]) {
            const currentWeather: Weather[] = weather.filter((weatherObject) => {
              const currentWeatherObject: Weather = {
        
              }
            })
          }
          */
        return weatherArray;
    }
}
export default new WeatherService();
/* Code below is downloaded and starter code
import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object

// TODO: Define a class for the Weather object

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();
 
*/ 
