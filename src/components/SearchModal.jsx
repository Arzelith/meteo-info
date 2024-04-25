import { Modal, Form, ListGroup, ListGroupItem } from 'react-bootstrap';

const SearchModal = ({
  show,
  handleClose,
  cityList,
  setCityName,
  cityName,
  setCurrentCoords,
}) => {
  return (
    <Modal data-bs-theme='dark' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className='text-white'>Busca una ciudad</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type='text'
          placeholder='buscar...'
          onChange={(e) => setCityName(e.target.value)}
        />
        {cityName && cityList.length > 0 && (
          <ListGroup className={`mt-3 ps-2 pe-2`}>
            {cityList.map((item) => (
              <ListGroupItem
                className={`cursor_pointer`}
                key={`${item.lat}${item.lon}`}
                onClick={() => {
                  setCurrentCoords(item.lat, item.lon);
                  handleClose();
                }}
              >
                {`${item.local_names?.es || item.local_names?.en || item.name} - ${
                  item.country
                } `}
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default SearchModal;
