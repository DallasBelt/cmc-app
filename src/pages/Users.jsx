import { useEffect, useState } from 'react';
import axios from 'axios';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/DataTable';

import { toast } from 'sonner';

import { RotatingLines } from 'react-loader-spinner';

import { usersColumns } from '@/config/usersColumns';

import getTableData from '@/hooks/getTableData';

// async function getData(isAdmin, token) {
//   try {
//     // Check auth
//     if (!token) {
//       toast.error('Oops!', {
//         description: `Error de autenticación.`,
//       });
//       return [];
//     }

//     if (isAdmin) {
//       // Send the request to the server
//       // https://cmc-api-42qy.onrender.com/api/v1/auth/all
//       const res = await axios.get('http://localhost:3000/api/v1/auth/all', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return res.data.data;
//     } else {
//       // Return dummy data if not admin
//       return [
//         {
//           lastName: 'Gonzalez',
//           firstName: 'Juan',
//           dni: '1234567890', // 10 números
//         },
//         {
//           lastName: 'Martinez',
//           firstName: 'Ana',
//           dni: '0987654321001', // 13 números que terminan en 001
//         },
//         {
//           lastName: 'Perez',
//           firstName: 'Maria',
//           dni: 'A1234567', // Número de pasaporte
//         },
//         {
//           lastName: 'Rodriguez',
//           firstName: 'Carlos',
//           dni: '1122334455', // 10 números
//         },
//         {
//           lastName: 'Lopez',
//           firstName: 'Sofia',
//           dni: '987654321001', // 13 números que terminan en 001
//         },
//         {
//           lastName: 'Fernandez',
//           firstName: 'Luis',
//           dni: 'B7654321', // Número de pasaporte
//         },
//         {
//           lastName: 'Gomez',
//           firstName: 'Laura',
//           dni: '2233445566', // 10 números
//         },
//         {
//           lastName: 'Diaz',
//           firstName: 'Jose',
//           dni: '123456789001', // 13 números que terminan en 001
//         },
//         {
//           lastName: 'Torres',
//           firstName: 'Marta',
//           dni: 'C9876543', // Número de pasaporte
//         },
//         {
//           lastName: 'Ruiz',
//           firstName: 'Miguel',
//           dni: '3344556677', // 10 números
//         },
//       ];
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return [];
//   }
// }

// const Users = () => {
//   const isAdmin = sessionStorage.getItem('roles').includes('admin');
//   const token = sessionStorage.getItem('token');

//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalUsersActive, setTotalUsersActive] = useState(0);
//   const [totalUsersInactive, setTotalUsersInactive] = useState(0);
//   const [totalMedics, setTotalMedics] = useState(0);
//   const [totalAssistants, setTotalAssistants] = useState(0);

//   useEffect(() => {
//     async function fetchData() {
//       const result = await getData(isAdmin, token);
//       setData(result);
//       setLoading(false);
//       setTotalUsers(result.length);
//       setTotalUsersActive(
//         result.filter((user) => user.isActive === true).length
//       );
//       setTotalUsersInactive(
//         result.filter((user) => user.isActive === false).length
//       );
//       setTotalMedics(
//         result.filter((user) => user.roles.includes('medic')).length
//       );
//       setTotalAssistants(
//         result.filter((user) => user.roles.includes('assistant')).length
//       );
//     }

//     fetchData();
//   }, [data]);

//   if (loading) {
//     return (
//       <div className='h-96 flex justify-center items-center'>
//         <RotatingLines
//           visible={true}
//           height='100'
//           width='100'
//           strokeColor='#2563eb'
//           strokeWidth={5}
//           animationDuration='0.75'
//           ariaLabel='rotating-lines-loading'
//         />
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className='p-10 md:p-20 space-y-14'>
//         <div className='flex flex-col gap-5 md:flex-row'>
//           <Card className='md:w-1/3 md:h-fit'>
//             <CardHeader>
//               <CardTitle className='text-3xl'>Estadísticas</CardTitle>
//             </CardHeader>
//             <CardContent className='text-2xl flex gap-10'>
//               <div>
//                 <p>{totalUsers} Usuarios</p>
//                 <p>{totalUsersActive} Activos</p>
//                 <p>{totalUsersInactive} Inactivos</p>
//               </div>
//               <div>
//                 <p>{totalMedics} Médicos</p>
//                 <p>{totalAssistants} Asistentes</p>
//                 <p>0 Pacientes</p>
//               </div>
//             </CardContent>
//           </Card>

//           <div className='md:w-2/3'>
//             <DataTable
//               columns={isAdmin ? usersColumns : patientsColumns}
//               data={data}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Users;

const Users = () => {
  const token = sessionStorage.getItem('token');

  const { data, loading } = getTableData(
    'http://localhost:3000/api/v1/auth/all',
    token
  );

  if (loading) {
    return (
      <div className='h-96 flex justify-center items-center'>
        <RotatingLines
          visible={true}
          height='100'
          width='100'
          strokeColor='#2563eb'
          strokeWidth={5}
          animationDuration='0.75'
          ariaLabel='rotating-lines-loading'
        />
      </div>
    );
  }

  return (
    <div className='p-10 space-y-14 md:p-20'>
      <Card>
        <CardHeader>
          <CardTitle>Estadísticas</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Total: {data.length}</p>
          <p>Activos: {data.filter((user) => user.isActive).length}</p>
          <p>Inactivos: {data.filter((user) => !user.isActive).length}</p>
        </CardContent>
      </Card>

      <DataTable columns={usersColumns} data={data} />
    </div>
  );
};

export default Users;
