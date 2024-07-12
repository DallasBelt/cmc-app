import { useEffect, useState } from 'react';

import { columns } from '@/data-table/medics/columns';
import { DataTable } from '@/data-table/medics/dataTable';

async function getData() {
  // Fetch data from your API here.
  return [
    {
      email: 'mcarrasco@cmc.com',
      id: '0200549905',
      fullName: 'Mauro Carrasco',
      lastSeen: '2024-07-11 11:37',
    },
    {
      email: 'jastudillo@gmail.com',
      id: '1866453370',
      fullName: 'José Astudillo',
      lastSeen: '2024-07-10 13:37',
    },
    {
      email: 'ecedeno@hotmail.com',
      id: '0102345556',
      fullName: 'Evelyn Cedeño',
      lastSeen: '2024-07-11 11:37',
    },
    {
      email: 'ccalle@yahoo.com',
      id: '0203040506',
      fullName: 'Claudia Calle',
      lastSeen: '2024-07-11 11:37',
    },
    // ...
  ];
}

export default function MedicsTable() {
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
    return <div>Loading...</div>;
  }

  return (
    <div className='container mx-auto py-10'>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
