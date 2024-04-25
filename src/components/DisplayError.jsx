import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Card, CardFooter, Button } from 'react-bootstrap';

const DisplayError = ({ status, statusText, messagge }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const action = (location) => {
    if (location.pathname === '/') {
      window.location.reload();
    } else {
      navigate('/');
    }
  };
  return (
    <Container className='d-flex justify-content-center align-items-center vh-100'>
      <Card data-bs-theme='dark' style={{width:'30rem'}}>
        <Card.Header>{`Ha ocurrido un error `}</Card.Header>
        <Card.Body>
          <Card.Title>{`${status} ${statusText}`}</Card.Title>
          <Card.Text>{messagge}</Card.Text>
        </Card.Body>
        <CardFooter className='text-center'>
          <Button size='sm' onClick={() => action(location)}>
            {location.pathname === '/' ? 'Reintentar' : 'Volver al Index'}
          </Button>
        </CardFooter>
      </Card>
    </Container>
  );
};

export default DisplayError;
