import { Spinner } from 'react-bootstrap';

const Loader = ({ height }) => {
  return (
    <div
      className={`position-relative d-flex justify-content-center align-items-center`}
      style={{ minHeight: `${height}` }}
    >
      <Spinner variant='light' />
    </div>
  );
};

export default Loader;
