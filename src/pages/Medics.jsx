import { useEffect, useState } from 'react';

import { medicsColumns } from '@/config/medicsColumns';
import { DataTable } from '@/components/DataTable';

async function getData() {
  // Fetch data from your API here.
  return [
    {
      fullName: 'Luis Fernandez',
      email: 'lfernandez@gmail.com',
      specialty: 'Cardiología',
      status: true,
    },
    {
      fullName: 'David Ramirez',
      email: 'dramirez@gmail.com',
      specialty: 'Neurología',
      status: false,
    },
    {
      fullName: 'Ricardo Vega',
      email: 'rvega@gmail.com',
      specialty: 'Pediatría',
      status: false,
    },
    {
      fullName: 'Daniel Castro',
      email: 'dcastro@gmail.com',
      specialty: 'Gastroenterología',
      status: false,
    },
    {
      fullName: 'Valeria Suarez',
      email: 'vsuarez@gmail.com',
      specialty: 'Endocrinología',
      status: true,
    },
    {
      fullName: 'Paula Blanco',
      email: 'pblanco@gmail.com',
      specialty: 'Neumología',
      status: true,
    },
    {
      fullName: 'Alberto Ruiz',
      email: 'aruiz@gmail.com',
      specialty: 'Ortopedia',
      status: true,
    },
    {
      fullName: 'Gabriela Mendoza',
      email: 'gmendoza@gmail.com',
      specialty: 'Oftalmología',
      status: true,
    },
    {
      fullName: 'Adriana Rios',
      email: 'arios@gmail.com',
      specialty: 'Dermatología',
      status: false,
    },
    {
      fullName: 'Roberto Reyes',
      email: 'rreyes@gmail.com',
      specialty: 'Urología',
      status: false,
    },
    {
      fullName: 'Diego Alonso',
      email: 'dalonso@gmail.com',
      specialty: 'Radiología',
      status: true,
    },
  ];
}

const Medics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className='p-10 md:p-20 space-y-14'>
        <DataTable columns={medicsColumns} data={data} />
      </div>
    </>
  );
};

export default Medics;
