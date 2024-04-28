import { useEffect, useState } from 'react';
import { SearchModal } from './';
import useScreenSize from '../hooks/useScreenSize';
import { errorHandler } from '../utils/error-handler';
import { getDirectGeoCoding } from '../api/axios';
import {
  Container,
  Navbar,
  Button,
  Form,
  ListGroup,
  ListGroupItem,
  Card,
  NavDropdown,
} from 'react-bootstrap';
import { FaCloudSun, FaSearch } from 'react-icons/fa';
import { MdMyLocation } from 'react-icons/md';
import styles from '../styles/AppBar.module.css';

const AppBar = ({
  setCurrentCoords,
  getCurrentPosition,
  setError,
  selectLang,
  userLang,
}) => {
  const screenSize = useScreenSize();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [cityName, setCityName] = useState('');
  const [cityList, setCityList] = useState([]);

  const geoCoding = async () => {
    if (cityName) {
      try {
        const response = await getDirectGeoCoding(cityName);
        setCityList(response.data);
      } catch (error) {
        setError(errorHandler(error));
      }
    }
  };

  useEffect(() => {
    const delayDebounceFb = setTimeout(() => {
      geoCoding();
    }, 500);
    return () => clearTimeout(delayDebounceFb);
    //eslint-disable-next-line
  }, [cityName]);

  return (
    <>
      {screenSize.width <= 992 && (
        <SearchModal
          show={showSearchModal}
          handleClose={() => {
            setShowSearchModal(false);
            setCityName('');
            setCityList([]);
          }}
          cityList={cityList}
          setCityList={setCityList}
          setCityName={setCityName}
          cityName={cityName}
          setCurrentCoords={setCurrentCoords}
          userLang={userLang}
        />
      )}

      <Navbar bg='' data-bs-theme='dark' className={`${styles.nav_bg} shadow sticky-top`}>
        <Container>
          <Navbar.Brand href={window.location.origin} className={`${styles.brand}`}>
            <FaCloudSun size={'4rem'} className={`${styles.brand_logo}`} />
            meteo-info
          </Navbar.Brand>
          <Navbar.Toggle />
          {screenSize.width <= 992 ? (
            <Navbar.Collapse className={`justify-content-end`}>
              <Button
                variant='light'
                className={styles.action_button_rounded}
                onClick={() => {
                  setShowSearchModal(true);
                  setCityList([]);
                }}
              >
                <FaSearch />
              </Button>
              <Button
                variant='light'
                className={styles.action_button_rounded}
                onClick={() => getCurrentPosition()}
              >
                <MdMyLocation />
              </Button>
            </Navbar.Collapse>
          ) : (
            <Navbar.Collapse className={`justify-content-between`}>
              <div className='w-100 ms-2 me-2 position-relative'>
                <Form.Control
                  type='text'
                  placeholder={userLang === 'es' ? 'Buscar ciudad...' : 'Search city...'}
                  className={`ms-auto me-auto ${styles.search_control}`}
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                />
                {screenSize.width > 992 && cityName && cityList.length > 0 && (
                  <div className={`w-100 position-absolute mt-2`} data-bs-theme='dark'>
                    <Card className={`${styles.search_control} ms-auto me-auto`}>
                      <ListGroup className={`p-3 bg_dark`}>
                        {cityList.map((item) => (
                          <ListGroupItem
                            className={`cursor_pointer`}
                            key={`${item.lat}${item.lon}`}
                            onClick={() => {
                              setCurrentCoords(item.lat, item.lon);
                              setCityName('');
                              setCityList([]);
                            }}
                          >
                            {`${
                              item.local_names?.es || item.local_names?.en || item.name
                            } - ${item.country} `}
                          </ListGroupItem>
                        ))}
                      </ListGroup>
                    </Card>
                  </div>
                )}
              </div>

              <Button
                variant='primary'
                className={`${styles.action_button_semi_rounded} me-4`}
                onClick={() => getCurrentPosition()}
              >
                {userLang === 'es' ? 'Ubicación actual' : 'Current Location'}
                <MdMyLocation className='ms-1' />
              </Button>
            </Navbar.Collapse>
          )}
          <NavDropdown
            title='ES/ENG'
            id='basic-nav-dropdown'
            align={'end'}
            className={`${styles.lang_selector}`}
          >
            <NavDropdown.Item active={userLang === 'es'} onClick={() => selectLang('es')}>
              Español
            </NavDropdown.Item>
            <NavDropdown.Item
              active={userLang === 'eng'}
              onClick={() => selectLang('eng')}
            >
              English
            </NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>
    </>
  );
};

export default AppBar;
