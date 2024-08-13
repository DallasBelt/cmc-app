import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

// Función para generar intervalos de minutos en un rango personalizado, excluyendo fracciones de horas bloqueadas
const generateTimeOptions = (
  startHour,
  endHour,
  minuteStep,
  blockedHours = []
) => {
  const times = [];
  for (let i = startHour; i <= endHour; i++) {
    for (let j = 0; j < 60; j += minuteStep) {
      if (i === endHour && j > 0) break; // No incluir intervalos más allá de la hora final
      if (blockedHours.includes(i) && j > 0) continue; // Omitir fracciones de horas bloqueadas
      const hour = i.toString().padStart(2, '0');
      const minute = j.toString().padStart(2, '0');
      times.push(`${hour}:${minute}`);
    }
  }
  return times;
};

const TimeRangePicker = ({
  startHour = 0,
  endHour = 23,
  minuteStep = 15,
  blockedHours = [],
  onChange,
}) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // Generamos opciones de tiempo dentro del rango proporcionado, excluyendo fracciones de horas bloqueadas
  const times = generateTimeOptions(
    startHour,
    endHour,
    minuteStep,
    blockedHours
  );

  const handleStartTimeChange = (value) => {
    setStartTime(value);
    setEndTime(''); // Limpiar endTime si se selecciona una nueva hora de inicio
    if (onChange) onChange([value, '']);
  };

  const handleEndTimeChange = (value) => {
    setEndTime(value);
    if (onChange) onChange([startTime, value]);
  };

  // Filtrar opciones de tiempo para el selector de hora de fin
  const availableEndTimes = times.filter((time) => time > startTime);

  return (
    <div className='flex gap-2.5'>
      <div className='w-1/2'>
        <Label htmlFor='start-time'>Hora inicial</Label>
        <Select value={startTime} onValueChange={handleStartTimeChange}>
          <SelectTrigger id='start-time'>
            <SelectValue placeholder='Seleccionar...' />
          </SelectTrigger>
          <SelectContent>
            {times.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='w-1/2'>
        <Label htmlFor='end-time'>Hora final</Label>
        <Select value={endTime} onValueChange={handleEndTimeChange}>
          <SelectTrigger id='end-time'>
            <SelectValue placeholder='Seleccionar...' />
          </SelectTrigger>
          <SelectContent>
            {availableEndTimes.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TimeRangePicker;
