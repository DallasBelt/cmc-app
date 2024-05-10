import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
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
    </div>
  );
};

export default ErrorPage;
