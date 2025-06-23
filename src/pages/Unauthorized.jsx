import { Link } from 'react-router-dom';
import { ShieldX } from 'lucide-react';

export const Unauthorized = () => {
  return (
    <div className='flex flex-col items-center justify-center h-[80vh] text-center px-4'>
      <ShieldX size={200} className='text-red-500 mb-4' />
      <h1 className='text-3xl font-bold mb-2'>Acceso denegado</h1>
      <p className='text-lg text-muted-foreground mb-6'>
        No tiene permiso para acceder a esta sección de la aplicación.
      </p>
      <Link
        to='/'
        className='text-blue-600 hover:underline text-sm transition-all'
      >
        ← Volver al inicio
      </Link>
    </div>
  );
};
