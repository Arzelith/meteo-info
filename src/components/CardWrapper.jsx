import { Card } from 'react-bootstrap';
import { Loader } from './';

const CardWrapper = ({ children, isLoading, height }) => {
  return (
    <Card className={`p-4 text-white dark_bg h-100`}>
      {!isLoading ? <div className='fade-in-content'>{children}</div> : <Loader height={height} />}
    </Card>
  );
};

export default CardWrapper;
