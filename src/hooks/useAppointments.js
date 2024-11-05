import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { useAppointmentStore } from '@/store/useAppointmentStore';

export const useAppointments = (role, token) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const setAppointmentStatus = useAppointmentStore(
    (state) => state.setAppointmentStatus
  );

  const setDropdownOpen = useAppointmentStore((state) => state.setDropdownOpen);

  // Fetch appointments from the database
  const fetchData = async () => {
    if (!token) {
      toast.error('Oops!', {
        description: 'Error de autenticación.',
      });
      setLoading(false);
      return;
    }

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
      return data.data;
    } catch (error) {
      toast.error('Oops...', {
        description: 'Error en la solicitud.',
      });
    }
  };

  // Format the data to match FullCalendar's structure
  const formatData = async () => {
    const data = await fetchData();
    const formattedData =
      data?.map((e) => ({
        id: e.id,
        title: `${e.patient.firstName} ${e.patient.lastName}`,
        start: e.startTime,
        end: e.endTime,
        extendedProps: {
          status: e.status,
        },
      })) || [];

    return formattedData;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const events = await formatData();
      if (events) {
        setAppointments(events);
        setLoading(false);
        setError(null);
      } else {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleChangeAppointmentStatus = async (
    appointmentId,
    appointmentStatus
  ) => {
    try {
      // Check auth
      if (!token) {
        console.error('Authentication error');
        toast.error('Oops!', {
          description: 'Error de autenticación.',
        });
        return;
      }

      const newAppointmentStatus =
        appointmentStatus === 'pending' ? 'canceled' : 'pending';

      // API call
      const res = await fetch(
        `http://localhost:3000/api/v1/appointment/${appointmentId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newAppointmentStatus }),
        }
      );

      if (!res.ok) {
        throw new Error(`Request error: ${res.statusText}`);
      }

      setAppointmentStatus(newAppointmentStatus);
      setDropdownOpen(false);

      toast.success('¡Enhorabuena!', {
        description: `La cita ha sido ${
          newAppointmentStatus === 'canceled' ? 'cancelada' : 'reagendada'
        }.`,
      });
    } catch (error) {
      setDropdownOpen(false);
      toast.error('Oops...', {
        description: 'Error en la solicitud.',
      });
    }
  };

  const handleDeleteAppointment = async (appointmentId, setDropdownState) => {
    try {
      // Check auth
      if (!token) {
        console.error('Authentication error');
        toast.error('Oops!', {
          description: 'Error de autenticación.',
        });
        return;
      }

      // API call
      const res = await fetch(
        `http://localhost:3000/api/v1/appointment/${appointmentId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Request error: ${res.statusText}`);
      }

      setDropdownOpen(false);

      toast.success('¡Enhorabuena!', {
        description: 'La cita ha sido eliminada.',
      });
    } catch (error) {
      console.error(error);
      toast.error('Oops...', {
        description: 'Error en la solicitud.',
      });
    }
  };

  return {
    appointments,
    loading,
    error,
    handleChangeAppointmentStatus,
    handleDeleteAppointment,
  };
};
