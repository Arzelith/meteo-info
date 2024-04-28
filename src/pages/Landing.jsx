import { Container, Row, Col } from 'react-bootstrap';
import { AppBar, Now, Forecast, Highlights, TodayAt, DisplayError } from '../components';
import { useEffect, useState } from 'react';
import { getCurrentWeather, getFiveDayForecast, getAirPollution } from '../api/axios';
import { errorHandler } from '../utils/error-handler';

const lang = localStorage.getItem('APP_LANG');
const selectedLang = lang ? lang : 'es';

const currentWeatherInitialState = {
  city: '',
  country: '',
  temperature: '',
  description: '',
  icon: '',
};

const dayHighLightsInitialState = {
  sunrise: '',
  sunset: '',
  tempMax: '',
  tempMin: '',
  humidity: '',
  feelsLike: '',
};

const Landing = () => {
  const [userLang, setUserLang] = useState(selectedLang);
  const [currentWeather, setCurrentWeather] = useState(currentWeatherInitialState);
  const [fiveDayForecast, setfiveDayForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [airPollution, setAirPollution] = useState([]);
  const [dayHighLights, setDayHighLights] = useState(dayHighLightsInitialState);
  const [currentLoading, setCurrentLoading] = useState(true);
  const [fiveDaysForecastLoading, setFiveDaysForecastLoading] = useState(true);
  const [pollutionLoading, setPollutionLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [coords, setCoords] = useState({ lat: -36.8335, lon: -73.0487 });

  const selectLang = (lang) => {
    setUserLang(lang);
    localStorage.setItem('APP_LANG', lang);
  };

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords({ lat: position.coords.latitude, lon: position.coords.longitude });
    });
  };

  const setCurrentCoords = (lat, lon) => {
    setCoords({ lat, lon });
  };

  const now = async () => {
    try {
      setCurrentLoading(true);
      const response = await getCurrentWeather(
        coords.lat,
        coords.lon,
        'metric',
        userLang
      );
      setCurrentWeather({
        city: response.data.name,
        country: response.data.sys.country,
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
      });

      setDayHighLights({
        sunrise: response.data.sys.sunrise,
        sunset: response.data.sys.sunset,
        tempMax: response.data.main.temp_max,
        tempMin: response.data.main.temp_min,
        humidity: response.data.main.humidity,
        feelsLike: response.data.main.feels_like,
      });

      setCurrentLoading(false);
    } catch (error) {
      setCurrentLoading(false);
      setError(errorHandler(error));
    }
  };

  const fiveDays = async () => {
    try {
      setFiveDaysForecastLoading(true);
      const response = await getFiveDayForecast(
        coords.lat,
        coords.lon,
        'metric',
        userLang
      );
      const fiveDayForArr = response.data.list.filter((item) => {
        const d = new Date(item.dt * 1000);
        const hour = d.getHours();
        if (hour === 11) {
          return item;
        }
      });
      const hourlyForArr = response.data.list.slice(0, 6);
      setHourlyForecast(hourlyForArr);
      setfiveDayForecast(fiveDayForArr);
      setFiveDaysForecastLoading(false);
    } catch (error) {
      setFiveDaysForecastLoading(false);
      setError(errorHandler(error));
    }
  };

  const pollution = async () => {
    try {
      setPollutionLoading(true);
      const response = await getAirPollution(coords.lat, coords.lon);
      const pollutionArr = response.data.list;
      setAirPollution(pollutionArr);
      setPollutionLoading(false);
    } catch (error) {
      setPollutionLoading(false);
      setError(errorHandler(error));
    }
  };

  useEffect(() => {
    now();
    fiveDays();
    pollution();
    //eslint-disable-next-line
  }, [coords, userLang]);

  if (error) {
    return (
      <DisplayError
        status={error.status}
        statusText={error.statusText}
        message={error.message}
        userLang={userLang}
      />
    );
  }

  return (
    <>
      <AppBar
        setCurrentCoords={setCurrentCoords}
        getCurrentPosition={getCurrentPosition}
        setError={setError}
        selectLang={selectLang}
        userLang={userLang}
      />
      <Container className='pt-2 mt-2 mb-4 pb-4 content-wrap'>
        <Row className='pt-4 pb-4'>
          <Col sm={12} lg={4}>
            <div className='mb-4'>
              <Now
                currentWeather={{ ...currentWeather }}
                isLoading={currentLoading}
                userLang={userLang}
              />
            </div>
            <div className='mb-4'>
              <Forecast
                forecast={fiveDayForecast}
                isLoading={fiveDaysForecastLoading}
                userLang={userLang}
              />
            </div>
          </Col>
          <Col>
            <div className='mb-4'>
              <Highlights
                airPollution={airPollution}
                dayHighLights={dayHighLights}
                isLoading={pollutionLoading && currentLoading}
                userLang={userLang}
              />
            </div>
            <div className='mb-4'>
              <TodayAt
                forecast={hourlyForecast}
                isLoading={fiveDaysForecastLoading}
                userLang={userLang}
              />
            </div>
          </Col>
        </Row>
      </Container>
      <footer className='text-white footer text-center dark_bg'>
        <p className='m-0'>Powered by OpenWeather</p>
      </footer>
    </>
  );
};

export default Landing;
