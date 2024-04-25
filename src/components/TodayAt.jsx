import { CardWrapper, InnerCardWrapper } from './';
import { Card, Row, Col } from 'react-bootstrap';
import styles from '../styles/TodayAt.module.css';
import { TbWindmill } from 'react-icons/tb';

const TodayAt = ({ isLoading, forecast }) => {
  const getHour = (millis) => {
    const d = new Date(millis * 1000);
    const hour = d.getHours();
    const minutes = d.getMinutes();
    return `${hour}:${minutes}0`;
  };
  return (
    <CardWrapper isLoading={isLoading} height={'18rem'}>
      <Card.Title>En las próximas horas</Card.Title>
      <Row className='fs_sm'>
        {forecast.map((item) => (
          <Col xs={4} sm={4} md={2} lg={2} key={item.dt} className='g-3'>
            <InnerCardWrapper classes={`${styles.wrapper_height}`}>
              <Card.Body className='d-flex flex-column justify-content-center align-items-center p-0'>
                <Card.Text className='mb-0'>{`${getHour(item.dt)}`}</Card.Text>
                <img
                  alt='hourly'
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  className={`${styles.icon}`}
                />
                <Card.Text className='mt-0 '>{`${Math.floor(
                  item.main.temp
                )}Cº`}</Card.Text>
              </Card.Body>
            </InnerCardWrapper>
          </Col>
        ))}
      </Row>
      <Row className='fs_sm'>
        {forecast.map((item) => (
          <Col xs={4} sm={4} md={2} lg={2} key={item.dt} className='g-3'>
            <InnerCardWrapper classes={styles.wrapper_height}>
              <Card.Body className='d-flex flex-column justify-content-center align-items-center p-0'>
                <Card.Text className='mb-0 '>{`${getHour(item.dt)}`}</Card.Text>
                <TbWindmill size={'3rem'} className={styles.rotating} />
                <Card.Text className='mt-0 '>{`${item.wind.speed}km/h`}</Card.Text>
              </Card.Body>
            </InnerCardWrapper>
          </Col>
        ))}
      </Row>
    </CardWrapper>
  );
};

export default TodayAt;
