import PropTypes from 'prop-types';

import React from 'react';
import { differenceInYears, format } from 'date-fns';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Label,
} from '@/components/ui';

import { Binoculars, HeartPulse, RulerDimensionLine, Stethoscope } from 'lucide-react';

export const MedicalRecordDetails = ({ row }) => {
  const data = row.original;

  const TriggerWithIcon = ({ icon: Icon, children }) => (
    <div className='flex items-center gap-2'>
      <Icon size={18} className='text-primary' />
      <span className='text-lg'>{children}</span>
    </div>
  );

  TriggerWithIcon.propTypes = {
    icon: PropTypes.elementType.isRequired,
    children: PropTypes.node.isRequired,
  };

  const calculateAge = (dob) => {
    return differenceInYears(new Date(), new Date(dob));
  };

  return (
    <>
      <div className='grid grid-cols-2'>
        <div className='flex flex-col gap-2'>
          <Label>
            Fecha:{' '}
            <span className='font-normal'>
              {format(new Date(data?.createdAt), 'dd/MM/yyyy, HH:mm')}
            </span>
          </Label>
          <Label>
            Paciente:{' '}
            <span className='font-normal'>{`${data?.patient?.firstName} ${data?.patient?.lastName} (${calculateAge(data?.patient?.dob)})`}</span>
          </Label>
          <Label>
            Identificación: <span className='font-normal'>{data?.patient?.dni}</span>
          </Label>
        </div>
        <div className='flex flex-col gap-2'>
          <Label>
            Alergias:{' '}
            <span className='font-normal'>{data?.patient?.allergies ?? '(Sin datos)'}</span>
          </Label>
          <Label>
            Antecedentes personales:{' '}
            <span className='font-normal'>{data?.patient?.personalHistory ?? '(Sin datos)'}</span>
          </Label>
          <Label>
            Antecedentes familiares:{' '}
            <span className='font-normal'>{data?.patient?.familyHistory ?? '(Sin datos)'}</span>
          </Label>
        </div>
      </div>

      <Accordion type='single' collapsible className='w-full' defaultValue='item-1'>
        <AccordionItem value='item-1'>
          <AccordionTrigger>
            <TriggerWithIcon icon={Stethoscope}>Evaluación</TriggerWithIcon>
          </AccordionTrigger>
          <AccordionContent className='flex flex-col gap-2 ps-7'>
            <Label>Síntomas:</Label>
            <p>{data.symptoms || '(Sin datos)'}</p>
            <Label>Diagnóstico:</Label>
            <p>{data.diagnostic || '(Sin datos)'}</p>
            <Label>Tratamiento:</Label>
            <p>{data.treatment || '(Sin datos)'}</p>
            <Label>Prescripción:</Label>
            <p>{data.prescription || '(Sin datos)'}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='item-2'>
          <AccordionTrigger>
            <TriggerWithIcon icon={HeartPulse}>Signos vitales</TriggerWithIcon>
          </AccordionTrigger>
          <AccordionContent className='flex flex-col ps-7 gap-2'>
            <p>
              <span className='font-medium'>Presión arterial:</span>{' '}
              {data.bloodPressure?.systolic !== null
                ? `${data.bloodPressure?.diastolic} mmHg`
                : '(Sin datos)'}
            </p>
            <p>
              <span className='font-medium'>Saturación de oxígeno:</span>{' '}
              {data.oxygenSaturation !== null ? `${data.oxygenSaturation} SpO₂` : '(Sin datos)'}
            </p>
            <p>
              <span className='font-medium'>Temperatura:</span>{' '}
              {data.bodyTemperature !== null ? `${data.bodyTemperature} ºC` : '(Sin datos)'}
            </p>
            <p>
              <span className='font-medium'>Frecuencia cardiaca:</span>{' '}
              {data.heartRate !== null ? `${data.heartRate} lpm` : '(Sin datos)'}
            </p>
            <p>
              <span className='font-medium'>Frecuencia respiratoria:</span>{' '}
              {data.respiratoryRate !== null ? `${data.respiratoryRate} rpm` : '(Sin datos)'}
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='item-3'>
          <AccordionTrigger>
            <TriggerWithIcon icon={RulerDimensionLine}>Medidas</TriggerWithIcon>
          </AccordionTrigger>
          <AccordionContent className='flex flex-col ps-7 gap-2'>
            <p>
              <span className='font-medium'>Peso:</span> {data.weight ?? '-'} kg
            </p>
            <p>
              <span className='font-medium'>Estatura:</span> {data.height ?? '-'} cm
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='item-4'>
          <AccordionTrigger>
            <TriggerWithIcon icon={Binoculars}>Observaciones</TriggerWithIcon>
          </AccordionTrigger>
          <AccordionContent className='ps-7 whitespace-pre-line'>
            {data.observations || '(Sin datos)'}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

MedicalRecordDetails.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.object.isRequired,
  }).isRequired,
};
