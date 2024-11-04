import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export const useAppointments = (role, token) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Format the response to match FullCalendar structure
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

  const handleDateClick = (arg) => {
    if (role === 'medic') {
      setDate(arg.date);
      setStartTime(format(arg.date, 'HH:mm'));
      setDialogState(true);
    } else {
      return;
    }
  };

  const handleEventClick = async (info) => {
    // if (isAssistant) {

    // }
    setDropdownState(true);
    setDropdownPosition({
      top: info.jsEvent.clientY,
      left: info.jsEvent.clientX,
    });
    // const appointment = {
    //   patient: info.event.title,
    //   date: info.event.start,
    //   startTime: info.event.start,
    //   endTime: info.event.end,
    // };
    setAppointmentId(info.event.id);
    setAppointmentStatus(info.event.extendedProps.status);
  };

  const handleChangeAppointmentStatus = async (
    appointmentId,
    appointmentStatus,
    setAppointmentStatus,
    setDropdownState
  ) => {
    console.log(appointmentId);
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
      setDropdownState(false);

      toast.success('¡Enhorabuena!', {
        description: `La cita ha sido ${
          newAppointmentStatus === 'canceled' ? 'cancelada' : 'reagendada'
        }.`,
      });
    } catch (error) {
      setDropdownState(false);
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

      setDropdownState(false);

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
    handleDateClick,
    handleEventClick,
    handleChangeAppointmentStatus,
    handleDeleteAppointment,
  };
};
