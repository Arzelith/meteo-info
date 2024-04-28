import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Card, CardFooter, Button } from 'react-bootstrap';

const DisplayError = ({ status, statusText, message, userLang }) => {
  const reloadMessage = userLang === 'es' ? 'Reintentar' : 'Reload';
  const backToIndexMessage = userLang === 'es' ? 'Volver al Index' : 'Back to Index';

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
      <Card data-bs-theme='dark' style={{ width: '30rem' }}>
        <Card.Header>{`Error `}</Card.Header>
        <Card.Body>
          <Card.Title>{`${status} ${statusText}`}</Card.Title>
          <Card.Text>{message}</Card.Text>
        </Card.Body>
        <CardFooter className='text-center'>
          <Button size='sm' onClick={() => action(location)}>
            {location.pathname === '/' ? reloadMessage : backToIndexMessage}
          </Button>
        </CardFooter>
      </Card>
    </Container>
  );
};

export default DisplayError;
