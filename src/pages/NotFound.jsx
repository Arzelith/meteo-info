import { DisplayError } from "../components";

const NotFound = () => {
  return <DisplayError status={400} statusText={'NOT FOUND'} messagge={'La página que busca no existe'}/>;
};

export default NotFound;
