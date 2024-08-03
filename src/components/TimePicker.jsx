'use client';
import * as React from 'react';
import { Label } from '@/components/ui/label';
import { TimePickerInput } from '@/components/TimePickerInput';
import { TimePeriodSelect } from '@/components/TimePeriodSelect';

export function TimePicker({ date, setDate }) {
  const [period, setPeriod] = React.useState('PM');

  const minuteRef = React.useRef(null);
  const hourRef = React.useRef(null);
  const secondRef = React.useRef(null);
  const periodRef = React.useRef(null);

  return (
    <div className='flex items-center gap-2'>
      <div className='grid gap-1 text-center'>
        <Label htmlFor='hours' className='text-xs'>
          Hora
        </Label>
        <TimePickerInput
          picker='12hours'
          period={period}
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className='grid gap-1 text-center'>
        <Label htmlFor='minutes' className='text-xs'>
          Minuto
        </Label>
        <TimePickerInput
          picker='minutes'
          id='minutes12'
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
        />
      </div>
      {/* <div className='grid gap-1 text-center'>
        <Label htmlFor='seconds' className='text-xs'>
          Seconds
        </Label>
        <TimePickerInput
          picker='seconds'
          id='seconds12'
          date={date}
          setDate={setDate}
          ref={secondRef}
          onLeftFocus={() => minuteRef.current?.focus()}
          onRightFocus={() => periodRef.current?.focus()}
        />
      </div> */}
      <div className='grid gap-1 text-center'>
        <Label htmlFor='period' className='text-xs'>
          Periodo
        </Label>
        <TimePeriodSelect
          period={period}
          setPeriod={setPeriod}
          date={date}
          setDate={setDate}
          ref={periodRef}
          onLeftFocus={() => secondRef.current?.focus()}
        />
      </div>
    </div>
  );
}