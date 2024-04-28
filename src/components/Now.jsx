import { CardWrapper } from './';
import { Card, CardBody } from 'react-bootstrap';
import styles from '../styles/Now.module.css';
import { FaRegCalendar } from 'react-icons/fa';
import { MdOutlineLocationOn } from 'react-icons/md';

const Now = ({ currentWeather, isLoading, userLang }) => {
  const { city, country, temperature, description, icon } = currentWeather;
  const firstToUpper = (str) => {
    const first = str[0];
    return `${first?.toUpperCase()}${str.slice(1)}`;
  };

  return (
    <CardWrapper isLoading={isLoading} height={'15.461rem'}>
      <Card.Title className='ps-0 pe-0 mb-0'>{userLang==='es'?'En este momento':'Now'}</Card.Title>
      <CardBody className='d-flex flex-column  ps-0 pt-0 pb-0'>
        <div className='d-flex flex-row justify-content-between align-items-center'>
          <Card.Text className={`${styles.current_temp} mb-0`}>
            {`${Math.floor(temperature)}º`}
            <span>C</span>
          </Card.Text>
          <img
            className={`${styles.current_weather}`}
            alt='weather-icon'
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          />
        </div>
        <Card.Text className='muted-text-clr'>{firstToUpper(description)}</Card.Text>
      </CardBody>
      <hr className='mt-2 mb-3' />
      <Card.Text className={`${styles.bottom_info} mb-2 muted-text-clr`}>
        <FaRegCalendar size={'1.1rem'} /> {new Date().toLocaleDateString()}
      </Card.Text>
      <Card.Text className={`${styles.bottom_info} muted-text-clr`}>
        <MdOutlineLocationOn size={'1.2rem'} />
        {`${city}, ${country}`}
      </Card.Text>
    </CardWrapper>
  );
};

export default Now;
