import { CardWrapper, InnerCardWrapper } from './';
import { Card, Row, Col } from 'react-bootstrap';
import { IoMdSunny } from 'react-icons/io';
import { FaMoon, FaTemperatureHigh, FaTemperatureLow } from 'react-icons/fa';
import { FaWind } from 'react-icons/fa6';
import { WiHumidity } from 'react-icons/wi';
import { LiaTemperatureHighSolid } from 'react-icons/lia';

const Highlights = ({ airPollution, dayHighLights, isLoading, userLang }) => {
  const airQSummary = () => {
    const aqi = airPollution[0]?.main?.aqi;
    const qualitativeNamesEs = ['Buena', 'Justa', 'Modearada', 'Pobre', 'Muy pobre'];
    const qualitativeNamesEng = ['Good', 'Fair', 'Moderate', 'Poor', 'Very poor'];
    return userLang === 'es'
      ? `Calidad del aire: ${qualitativeNamesEs[aqi - 1]}`
      : `Air quality: ${qualitativeNamesEng[aqi - 1]}`;
  };

  const getHour = (millis) => {
    const d = new Date(millis * 1000);
    const hour = d.getHours();
    let minutes = d.getMinutes();
    if (minutes.toString().length === 1) {
      return `${hour}:0${minutes}`;
    }
    return `${hour}:${minutes}`;
  };

  return (
    <CardWrapper isLoading={isLoading} height={'21.3rem'}>
      <Card.Title>
        {userLang === 'es' ? 'Aspectos destacados' : "Today's highlights"}
      </Card.Title>
      <Row>
        <Col sm={12} md={6} className='g-4'>
          <InnerCardWrapper
            classes={
              'd-flex flex-row p-4 justify-content-between fs_sm h-100 position-relative'
            }
          >
            <div className='position-absolute top-0 mt-3'>
              {userLang === 'es' ? 'Amanecer y anochecer' : 'Sunrise and sunset'}
            </div>
            <div className='d-flex w-50 justify-content-around align-items-center pt-4'>
              <IoMdSunny size={'3.5rem'} className='w-50' />
              <div className='text-start w-50'>
                <p className='mb-1'>{userLang === 'es' ? 'Amanecer:' : 'Sunrise:'}</p>
                <p className='mb-0'>{getHour(dayHighLights.sunrise)}</p>
              </div>
            </div>
            <div className='d-flex w-50 justify-content-around align-items-center pt-4'>
              <FaMoon size={'2.4rem'} className='w-50'/>
              <div className='text-start w-50'>
                <p className='mb-1'>{userLang === 'es' ? 'Anochecer:' : 'Sunset:'}</p>
                <p className='mb-0'>{getHour(dayHighLights.sunset)}</p>
              </div>
            </div>
          </InnerCardWrapper>
        </Col>
        <Col sm={12} md={6} className='g-4'>
          <InnerCardWrapper
            classes={
              'd-flex flex-row p-4 justify-content-between align-items-center fs_sm h-100 position-relative'
            }
          >
            <div className='position-absolute top-0 mt-3'>{airQSummary()}</div>

            <div className='d-flex flex-row justify-content-around align-items-center w-100 pt-4'>
              <FaWind size={'2.5rem'} />
              <div>
                <p className='mb-1'>PM25</p>
                <p className='mb-0'>{airPollution[0]?.components.pm2_5}</p>
              </div>
              <div>
                <p className='mb-1'>SO2</p>
                <p className='mb-0'>{airPollution[0]?.components.so2}</p>
              </div>
              <div>
                <p className='mb-1'>NO2</p>
                <p className='mb-0'>{airPollution[0]?.components.no2}</p>
              </div>
              <div>
                <p className='mb-1'>O3</p>
                <p className='mb-0'>{airPollution[0]?.components.o3}</p>
              </div>
            </div>
          </InnerCardWrapper>
        </Col>

        <Col sm={12} md={6} className='g-4'>
          <InnerCardWrapper
            classes={
              'd-flex flex-row p-4 justify-content-between fs_sm h-100 position-relative '
            }
          >
            <div className='position-absolute top-0 mt-3'>
              {userLang === 'es' ? 'Máxima y mínima' : 'Maximum and minimum'}
            </div>
            <div className='d-flex w-50 justify-content-around align-items-center pt-4'>
              <FaTemperatureHigh size={'2.6rem'} className='w-50' />
              <div className='text-start w-50'>
                <p className='mb-1'>{userLang === 'es' ? 'Máxima:' : 'Max:'}</p>
                <p className='mb-0'>{`${Math.floor(dayHighLights?.tempMax)}Cº`}</p>
              </div>
            </div>
            <div className='d-flex w-50 justify-content-around align-items-center pt-4'>
              <FaTemperatureLow size={'2.6rem'} className='w-50'/>
              <div className='text-start w-50'>
                <p className='mb-1'>{userLang === 'es' ? 'Mínima:' : 'Min:'}</p>
                <p className='mb-0'>{`${Math.floor(dayHighLights?.tempMin)}Cº`}</p>
              </div>
            </div>
          </InnerCardWrapper>
        </Col>
        <Col sm={12} md={6} className='g-4'>
          <InnerCardWrapper
            classes={
              'd-flex flex-row p-4 justify-content-between fs_sm h-100 position-relative'
            }
          >
            <div className='position-absolute top-0 mt-3'>
              {userLang === 'es'
                ? 'Humedad y sensación térmica'
                : 'Humidity and thermal sensation'}
            </div>
            <div className='d-flex w-50 justify-content-around align-items-center pt-4'>
              <WiHumidity size={'3.8rem'} className='w-50 pe-4' />
              <div className='text-start w-50'>
                <p className='mb-1'>{userLang === 'es' ? 'Humedad:' : 'Humidity:'}</p>
                <p className='mb-0'>{`${dayHighLights?.humidity}%`}</p>
              </div>
            </div>
            <div className='d-flex w-50 justify-content-around align-items-center pt-4'>
              <LiaTemperatureHighSolid size={'3.1rem'} className='w-50'/>
              <div className='text-start w-50'>
                <p className='mb-1'>
                  {userLang === 'es' ? 'S.Térmica:' : 'Feels like:'}
                </p>
                <p className='mb-0'>{`${Math.floor(dayHighLights?.feelsLike)}Cº`}</p>
              </div>
            </div>
          </InnerCardWrapper>
        </Col>
      </Row>
    </CardWrapper>
  );
};

export default Highlights;
