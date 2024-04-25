//MANEJAR ERRORES DE AXIOS

export const errorHandler = (error) => {
  let requestError = {
    status: 500,
    statusText: 'INTERNAL SERVER ERROR',
    message: 'Ha ocurrido un error inesperado, intente más tarde...',
  };
  if (error.response) {
    requestError.status = error.response.status;
    requestError.statusText = error.response.statusText;
    requestError.message = error.message;
  }
  console.log(requestError)
  return requestError;
};
