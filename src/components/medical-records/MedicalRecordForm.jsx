import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Textarea,
} from '@/components';

import { useAppointments, useMedicalRecords } from '@/hooks';
import { medicalRecordSchema } from '@/schemas';
import { useAppointmentStore } from '@/store';

export const MedicalRecordForm = () => {
  const { createMedicalRecordMutation } = useMedicalRecords();
  const { updateAppointmentMutation } = useAppointments();

  const { appointmentData } = useAppointmentStore();

  const form = useForm({
    resolver: zodResolver(medicalRecordSchema),
    defaultValues: {
      bloodPressure: '',
      oxygenSaturation: '',
      bodyTemperature: '',
      heartRate: '',
      respiratoryRate: '',
      weight: '',
      height: '',
      allergies: '',
      symptoms: '',
      diagnostic: '',
      treatment: '',
      prescription: '',
      observations: '',
      patientId: appointmentData.patient.id,
    },
  });

  const onSubmit = (values) => {
    const newMedicalRecordEntry = {
      ...values,
      bloodPressure: values.bloodPressure && `${values.bloodPressure} mmHg`,
      oxygenSaturation:
        values.oxygenSaturation && `${values.oxygenSaturation}%`,
      bodyTemperature: values.bodyTemperature && `${values.bodyTemperature}ºC`,
      heartRate: values.heartRate && `${values.heartRate} lpm`,
      respiratoryRate:
        values.respiratoryRate && `${values.respiratoryRate} rpm`,
      weight: values.weight && `${values.weight} kg`,
      height: values.height && `${values.height} cm`,
    };

    createMedicalRecordMutation.mutate(newMedicalRecordEntry);
    updateAppointmentMutation.mutate({
      id: appointmentData.id,
      appointment: {
        status: 'completed',
        patientId: appointmentData.patient.id,
      },
    });
  };

  return (
    <>
      <Label>
        Paciente:{' '}
        {`${appointmentData.patient.firstName} ${appointmentData.patient.lastName}`}
      </Label>
      <Label>Identificación: {appointmentData.patient.dni}</Label>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-10'>
          <fieldset className='border-2 p-4 rounded-md space-y-2.5'>
            <legend className='font-bold'>Signos Vitales</legend>
            <div className='justify-center space-y-2.5 md:space-y-0 md:flex md:gap-10 w-full'>
              <FormField
                control={form.control}
                name='bloodPressure'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Presión arterial</FormLabel>
                    <FormControl>
                      <div className='relative flex items-center gap-2 w-full'>
                        <Input
                          placeholder='120/80'
                          {...field}
                          className='pr-16' // Deja espacio para el span
                        />
                        <span className='absolute right-2 text-gray-500'>
                          mmHg
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='oxygenSaturation'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Saturación de Oxígeno</FormLabel>
                    <FormControl>
                      <div className='relative flex items-center gap-2 w-full'>
                        <Input
                          type='number'
                          {...field}
                          className='pr-16' // Deja espacio para el span
                        />
                        <span className='absolute right-2 text-gray-500'>
                          SpO₂
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='justify-center space-y-2.5 md:space-y-0 md:flex md:gap-10 w-full'>
              <FormField
                control={form.control}
                name='bodyTemperature'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Temperatura</FormLabel>
                    <FormControl>
                      <div className='relative flex items-center gap-2 w-full'>
                        <Input
                          type='number'
                          {...field}
                          className='pr-16' // Deja espacio para el span
                        />
                        <span className='absolute right-2 text-gray-500'>
                          ºC
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='heartRate'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Frecuencia cardiaca</FormLabel>
                    <FormControl>
                      <div className='relative flex items-center gap-2 w-full'>
                        <Input
                          type='number'
                          {...field}
                          className='pr-16' // Deja espacio para el span
                        />
                        <span className='absolute right-2 text-gray-500'>
                          lpm
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='respiratoryRate'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Frecuencia respiratoria</FormLabel>
                    <FormControl>
                      <div className='relative flex items-center gap-2 w-full'>
                        <Input
                          type='number'
                          {...field}
                          className='pr-16' // Deja espacio para el span
                        />
                        <span className='absolute right-2 text-gray-500'>
                          rpm
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>

          <fieldset className='border-2 p-4 rounded-md space-y-2.5'>
            <legend className='font-bold'>Medidas</legend>
            <div className='md:flex md:gap-10 w-full'>
              <FormField
                control={form.control}
                name='weight'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Peso</FormLabel>
                    <FormControl>
                      <div className='relative flex items-center gap-2 w-full'>
                        <Input
                          type='number'
                          {...field}
                          className='pr-16' // Deja espacio para el span
                        />
                        <span className='absolute right-2 text-gray-500'>
                          kg
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='height'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Estatura</FormLabel>
                    <FormControl>
                      <div className='relative flex items-center gap-2 w-full'>
                        <Input
                          type='number'
                          {...field}
                          className='pr-16' // Deja espacio para el span
                        />
                        <span className='absolute right-2 text-gray-500'>
                          cm
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>

          <fieldset className='border-2 p-4 rounded-md space-y-2.5'>
            <legend className='font-bold'>Antecedentes</legend>
            <div className='md:flex md:gap-10 w-full'>
              <FormField
                control={form.control}
                name='allergies'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Alergias</FormLabel>
                    <FormControl>
                      <Textarea className='w-full resize-none' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='pe-diseases'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Enfermedades preexistentes</FormLabel>
                    <FormControl>
                      <Textarea className='w-full resize-none' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>

          <fieldset className='border-2 p-4 rounded-md space-y-2.5'>
            <legend className='font-bold'>Evaluación</legend>
            <div className='justify-center space-y-2.5 md:space-y-0 md:flex md:gap-10 w-full'>
              <FormField
                control={form.control}
                name='symptoms'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Síntomas</FormLabel>
                    <FormControl>
                      <Textarea className='w-full resize-none' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='diagnostic'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Diagnóstico</FormLabel>
                    <FormControl>
                      <Textarea className='w-full resize-none' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='md:flex md:gap-10 w-full'>
              <FormField
                control={form.control}
                name='treatment'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Tratamiento</FormLabel>
                    <FormControl>
                      <Textarea className='w-full resize-none' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='prescription'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Prescripción</FormLabel>
                    <FormControl>
                      <Textarea className='w-full resize-none' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>

          <div className='pt-5 md:flex md:justify-center'>
            <Button
              type='submit'
              disabled={createMedicalRecordMutation.isPending}
              className='w-full md:w-fit'
            >
              {createMedicalRecordMutation.isPending && (
                <Loader2 className='me-2 animate-spin' />
              )}
              Crear entrada
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
