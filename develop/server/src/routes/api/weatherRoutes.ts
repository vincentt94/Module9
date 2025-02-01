import { Router, type Request, type Response } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
import HistoryService from '../../service/historyService.js';

// import WeatherService from '../../service/weatherService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  const city = req.body.cityName;
  if (!city) {
    return res.status(400).json({ error: 'City name is required' })
  }
  // TODO: GET weather data from city name
  try {
    const response = await WeatherService.getWeatherByCity(city)

    //this saves the city to search history
    await HistoryService.addCity(city)

    return res.json(response);

  } catch (err) {
    return res.status(500).json(err);
  }
}
);
// TODO: save city to search history



// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const savedHistory = await HistoryService.getCities();
    res.json(savedHistory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ msg: 'City ID is required' });
    }
    await HistoryService.removeCity(req.params.id);
    res.json({ success: 'City successfully removed from search history' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


export default router;
