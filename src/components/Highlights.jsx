import { CardWrapper, InnerCardWrapper } from './';
import { Card, Row, Col } from 'react-bootstrap';
import { IoMdSunny } from 'react-icons/io';
import { FaMoon, FaTemperatureHigh, FaTemperatureLow } from 'react-icons/fa';
import { FaWind } from 'react-icons/fa6';
import { WiHumidity } from 'react-icons/wi';
import { LiaTemperatureHighSolid } from 'react-icons/lia';

const Highlights = ({ airPollution, dayHighLights, isLoading }) => {
  const airQSummary = () => {
    const aqi = airPollution[0]?.main?.aqi;
    const qualitativeNames = ['Buena', 'Justa', 'Modearada', 'Pobre', 'Muy pobre'];
    return qualitativeNames[aqi - 1];
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
    <CardWrapper isLoading={isLoading} height={'19.5rem'}>
        <Card.Title>Aspectos destacados</Card.Title>
        <Row>
          <Col sm={12} md={6} className='g-2'>
            <InnerCardWrapper
              classes={
                'd-flex flex-row p-4 justify-content-between fs_sm h-100 position-relative'
              }
            >
              <div className='position-absolute top-0 mt-3'>Amanecer y anochecer</div>
              <div className='d-flex w-50 justify-content-around align-items-center pt-4'>
                <IoMdSunny size={'4rem'} className='me-2' />
                <div className='text-start'>
                  <p className='mb-1'>amanecer:</p>
                  <p className='mb-0'>{getHour(dayHighLights.sunrise)}</p>
                </div>
              </div>
              <div className='d-flex w-50 justify-content-around align-items-center fs-sm pt-4'>
                <FaMoon size={'2.6rem'} />
                <div className='text-start'>
                  <p className='mb-1'>anochecer:</p>
                  <p className='mb-0'>{getHour(dayHighLights.sunset)}</p>
                </div>
              </div>
            </InnerCardWrapper>
          </Col>
          <Col sm={12} md={6} className='g-2'>
            <InnerCardWrapper
              classes={
                'd-flex flex-row p-4 justify-content-between align-items-center fs_sm h-100 position-relative'
              }
            >
              <div className='position-absolute top-0 mt-3'>{`Calidad del aire: ${airQSummary()}`}</div>
              <FaWind size={'3rem'} className='mt-4' />
              <div className='d-flex flex-row justify-content-around align-items-center w-100 pt-4'>
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

          <Col sm={12} md={6} className='g-2'>
            <InnerCardWrapper
              classes={
                'd-flex flex-row p-4 justify-content-between fs_sm h-100 position-relative'
              }
            >
              <div className='position-absolute top-0 mt-3'>
                Temperatura máxima y mínima
              </div>
              <div className='d-flex w-50 justify-content-around align-items-center pt-4'>
                <FaTemperatureHigh size={'2.6rem'} className='me-2' />
                <div className='text-start'>
                  <p className='mb-1'>máxima:</p>
                  <p className='mb-0'>{`${Math.floor(dayHighLights?.tempMax)}Cº`}</p>
                </div>
              </div>
              <div className='d-flex w-50 justify-content-around align-items-center fs-sm pt-4'>
                <FaTemperatureLow size={'2.6rem'} />
                <div className='text-start'>
                  <p className='mb-1'>mínima:</p>
                  <p className='mb-0'>{`${Math.floor(dayHighLights?.tempMin)}Cº`}</p>
                </div>
              </div>
            </InnerCardWrapper>
          </Col>
          <Col sm={12} md={6} className='g-2'>
            <InnerCardWrapper
              classes={
                'd-flex flex-row p-4 justify-content-between fs_sm h-100 position-relative'
              }
            >
              <div className='position-absolute top-0 mt-3'>
                Humedad y sensación térmica
              </div>
              <div className='d-flex w-50 justify-content-around align-items-center pt-4'>
                <WiHumidity size={'3.5rem'} className='me-2' />
                <div className='text-start'>
                  <p className='mb-1'>humedad:</p>
                  <p className='mb-0'>{`${dayHighLights?.humidity}%`}</p>
                </div>
              </div>
              <div className='d-flex w-50 justify-content-around align-items-center fs-sm pt-4'>
                <LiaTemperatureHighSolid size={'3.1rem'} />
                <div className='text-start'>
                  <p className='mb-1'>s. térmica:</p>
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
