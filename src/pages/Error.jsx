import { useRouteError, Link } from 'react-router-dom';
import { Frown, MoveLeft } from 'lucide-react';

export const Error = () => {
  const error = useRouteError();

  console.error('Error:', error);

  return (
    <div className='h-screen w-full flex flex-col justify-center items-center text-center px-4 space-y-6 bg-background text-foreground'>
      <div className='flex flex-col items-center space-y-2'>
        <Frown className='text-red-500' size={200} />
        <h1 className='text-4xl font-bold'>Hmm... Algo no está bien.</h1>
        <p className='text-lg max-w-md'>
          Lo sentimos, ha ocurrido un error inesperado. Puede deberse a un problema de conexión o a
          una página no válida.
        </p>
      </div>

      {/* Show in dev only */}
      <pre className='text-xs text-muted-foreground max-w-md break-words'>
        {JSON.stringify(error, null, 2)}
      </pre>

      <div className='flex flex-col md:flex-row items-center gap-3'>
        <Link
          to='/'
          className='flex items-center gap-2 px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition'
        >
          <MoveLeft size={18} />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};
