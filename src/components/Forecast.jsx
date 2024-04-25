import { CardWrapper} from './';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import styles from '../styles/Forecast.module.css';

const Forecast = ({ forecast, isLoading }) => {
  const getDayName = (millis) => {
    const dayName = [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado',
    ];
    const d = new Date(millis * 1000);
    return dayName[d.getDay()];
  };

  const getDayAndMonth = (millis) => {
    const monthName = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ];
    const d = new Date(millis * 1000);
    const day = d.getDate();
    const month = d.getMonth();
    return `${monthName[month].slice(0, 3)} ${day}`;
  };

  return (
    <CardWrapper isLoading={isLoading} height={'18.996rem'}>
      <Card.Title>Predicción 5 días</Card.Title>
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
