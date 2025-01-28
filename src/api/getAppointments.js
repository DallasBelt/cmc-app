import { toast } from 'sonner';

export const getAppointments = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/v1/appointment', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Request error: ${res.statusText}`);
    }

    const data = await res.json();

    const formattedData =
      data?.data.map((e) => ({
        id: e.id,
        title: `${e.patient.firstName} ${e.patient.lastName}`,
        start: e.startTime,
        end: e.endTime,
        extendedProps: {
          status: e.status,
        },
      })) || [];

    return formattedData;
  } catch (error) {
    toast.error('Oops...', {
      description: 'Error en la solicitud.',
    });
  }
};

// export const updateAppointments = async (appointmentId, appointmentStatus) => {
//   const setAppointmentStatus = appointmentStore(
//     (state) => state.setAppointmentStatus
//   );

//   const setDropdownOpen = appointmentStore((state) => state.setDropdownOpen);

//   try {
//     const newAppointmentStatus =
//       appointmentStatus === 'pending' ? 'canceled' : 'pending';

//     const res = await fetch(
//       `http://localhost:3000/api/v1/appointment/${appointmentId}`,
//       {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ status: newAppointmentStatus }),
//       }
//     );

//     if (!res.ok) {
//       throw new Error(`Request error: ${res.statusText}`);
//     }
//     console.log(status);
//     setAppointmentStatus(newAppointmentStatus);
//     setDropdownOpen(false);

//     toast.success('¡Enhorabuena!', {
//       description: `La cita ha sido ${
//         newAppointmentStatus === 'canceled' ? 'cancelada' : 'reagendada'
//       }.`,
//     });
//   } catch (error) {
//     setDropdownOpen(false);
//     toast.error('Oops...', {
//       description: 'Error en la solicitud.',
//     });
//   }
// };
