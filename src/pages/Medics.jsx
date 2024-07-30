import { useEffect, useState } from 'react';

import { toast } from 'sonner';

import { medicsColumns } from '@/config/medicsColumns';
import { DataTable } from '@/components/DataTable';

async function getData() {
  try {
    // Check auth
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error('Oops!', {
        description: `Error de autenticación.`,
      });
    }

    // Send the request to the server
    const res = await axios.get(
      'https://cmc-api-42qy.onrender.com/api/v1/user-info',
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return res.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
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
