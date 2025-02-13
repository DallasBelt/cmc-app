import { useRouteError, Link } from 'react-router-dom';

export const Error = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id='error-page'
      className='h-screen flex flex-col justify-center items-center space-y-5'
    >
      <h1 className='text-6xl'>😵‍💫 Oops!</h1>
      <p className='text-3xl'>Lo sentimos, ha ocurrido un error inesperado.</p>
      <p className='text-2xl'>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link
        to='/'
        className='text-center text-blue-500 cursor:pointer hover:underline'
      >
        Regresar a la página principal
      </Link>
    </div>
  );
};
