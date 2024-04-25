import { Card } from 'react-bootstrap';
import styles from '../styles/InnerCardWrapper.module.css';

const InnerCardWrapper = ({ children, classes }) => {
  return (
    <Card
      className={`${styles.wrapper} ${classes} background_bg shadow border-0 muted-text-clr`}
    >
      {children}
    </Card>
  );
};

export default InnerCardWrapper;
