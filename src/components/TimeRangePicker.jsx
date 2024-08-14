import React, { useState, useEffect } from 'react';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Generate minute ranges in a custom range, excluding locked hour ranges
const generateTimeOptions = (
  startHour,
  endHour,
  minuteStep,
  blockedRanges = []
) => {
  const times = [];
  for (let i = startHour; i <= endHour; i++) {
    for (let j = 0; j < 60; j += minuteStep) {
      // Skip any time past the endHour
      if (i === endHour && j > 0) break;

      // Check if the full hour (without minutes) is blocked and if it is not the first fraction
      const isBlocked = blockedRanges.some(
        ([start, end]) =>
          (i > start && i < end) ||
          (i === start && j > 0) ||
          (i === end && j > 0)
      );
      if (isBlocked) continue; // Skip hours blocked fractions

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
  blockedRanges = [],
  startHourValue = '',
  endHourValue = '',
  onChange,
}) => {
  const [startTime, setStartTime] = useState(startHourValue);
  const [endTime, setEndTime] = useState(endHourValue);

  // Generate time options within the range provided, excluding ranges of blocked hours
  const times = generateTimeOptions(
    startHour,
    endHour,
    minuteStep,
    blockedRanges
  );

  // Remove the last hour option from the start time picker if it's equal to endHour
  const startTimes = times.filter((time) => {
    const [hour] = time.split(':').map(Number);
    return hour < endHour;
  });

  useEffect(() => {
    // Update startTime and endTime when props change
    setStartTime(startHourValue);
    setEndTime(endHourValue);
  }, [startHourValue, endHourValue]);

  const handleStartTimeChange = (value) => {
    setStartTime(value);
    setEndTime(''); // Clear endTime if new start time is selected
    if (onChange) onChange([value, '']);
  };

  const handleEndTimeChange = (value) => {
    setEndTime(value);
    if (onChange) onChange([startTime, value]);
  };

  // Filter time options for end time picker
  const availableEndTimes = times.filter((time) => time > startTime);

  return (
    <div className='flex flex-col gap-2.5 md:flex-row'>
      <div className='w-full md:w-1/2'>
        <Label htmlFor='start-time'>Hora inicial</Label>
        <Select value={startTime} onValueChange={handleStartTimeChange}>
          <SelectTrigger id='start-time'>
            <SelectValue placeholder='Seleccionar...' />
          </SelectTrigger>
          <SelectContent>
            {startTimes.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='w-full md:w-1/2'>
        <Label htmlFor='end-time'>Hora final</Label>
        <Select
          value={endTime}
          onValueChange={handleEndTimeChange}
          disabled={!startTime} // Disable until start time is selected
        >
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
