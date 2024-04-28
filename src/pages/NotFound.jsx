import { DisplayError } from '../components';

const lang = localStorage.getItem('APP_LANG');
const selectedLang = lang ? lang : 'es';

const NotFound = () => {
  return (
    <DisplayError
      status={404}
      statusText={'NOT FOUND'}
      userLang={selectedLang}
      message={
        selectedLang === 'es'
          ? 'La página que busca no existe'
          : 'The page you are looking for does not exist'
      }
    />
  );
};

export default NotFound;
