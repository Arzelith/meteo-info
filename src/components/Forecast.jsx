import { CardWrapper } from './';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import styles from '../styles/Forecast.module.css';

const Forecast = ({ forecast, isLoading, userLang }) => {

  const getDayName = (millis) => {
    const locale = userLang === 'es' ? 'es-cl' : 'eng-us';
    const weekDay = new Date(millis * 1000).toLocaleString(locale, { weekday: 'long' });
    return weekDay;
  };

  const getDayAndMonth = (millis) => {
    const d = new Date(millis * 1000);
    const day = d.getDate();
    const locale = userLang === 'es' ? 'es-cl' : 'eng-us';
    const month = d.toLocaleString(locale, { month: 'long' });
    return `${month.slice(0, 3)} ${day}`;
  };

  return (
    <CardWrapper isLoading={isLoading} height={'18.996rem'}>
      <Card.Title>
        {userLang === 'es' ? 'Pronóstico próximos cinco días' : 'Five day forecast'}
      </Card.Title>
      <ListGroup className='mt-4'>
        {forecast.map((item) => (
          <ListGroupItem
            key={item.dt}
            className={`d-flex justify-content-between align-items-center muted-text-clr fs_sm  ${styles.list_group_item} ${styles.list_group_bg} `}
          >
            <div className={`d-flex align-items-center`}>
              <img
                alt='forecast'
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              />
              <Card.Text className={styles.temp}>{`${Math.floor(
                item.main.temp
              )}Cº`}</Card.Text>
            </div>
            <Card.Text className={styles.month}>{getDayAndMonth(item.dt)}</Card.Text>
            <Card.Text className={styles.day}>{getDayName(item.dt)}</Card.Text>
          </ListGroupItem>
        ))}
      </ListGroup>
    </CardWrapper>
  );
};

export default Forecast;
