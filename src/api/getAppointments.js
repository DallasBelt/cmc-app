import { toast } from 'sonner';

const token = sessionStorage.getItem('token');

export const getAppointments = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/v1/appointment', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
