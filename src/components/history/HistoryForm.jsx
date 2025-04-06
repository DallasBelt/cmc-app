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

import { useAppointments, useHistory } from '@/hooks';
import { historySchema } from '@/schemas';
import { useAppointmentStore } from '@/store';

export const HistoryForm = () => {
  const { createHistoryMutation } = useHistory();
  const { updateAppointmentMutation } = useAppointments();

  const { appointmentData } = useAppointmentStore();

  const form = useForm({
    resolver: zodResolver(historySchema),
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
      patientId: appointmentData.patientData.id,
    },
  });

  const onSubmit = (values) => {
    const newHistoryEntry = {
      ...values,
      bloodPressure:
        values.bloodPressure &&
        `${values.bloodPressure.systolic}/${values.bloodPressure.diastolic} mmHg`,
      oxygenSaturation:
        values.oxygenSaturation && `${values.oxygenSaturation}%`,
      bodyTemperature: values.bodyTemperature && `${values.bodyTemperature}ºC`,
      heartRate: values.heartRate && `${values.heartRate} bpm`,
      respiratoryRate:
        values.respiratoryRate && `${values.respiratoryRate} lmp`,
      weight: values.weight && `${values.weight} kg`,
      height: values.height && `${values.height} cm`,
    };

    createHistoryMutation.mutate(newHistoryEntry);
    updateAppointmentMutation.mutate({
      id: appointmentData.id,
      appointment: {
        status: 'completed',
        patientId: appointmentData.patientData.id,
      },
    });
  };

  return (
    <>
      <Label>
        Paciente:{' '}
        {`${appointmentData.patientData.firstName} ${appointmentData.patientData.lastName}`}
      </Label>
      <Label>Identificación: {appointmentData.patientData.dni}</Label>
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
                      <div className='flex items-center gap-2 w-full'>
                        <Input
                          type='number'
                          placeholder='Sist.'
                          className='flex-1'
                          value={field.value?.systolic || ''}
                          onChange={(e) =>
                            field.onChange({
                              ...field.value,
                              systolic: e.target.value,
                            })
                          }
                        />
                        <span>/</span>
                        <Input
                          type='number'
                          placeholder='Diast.'
                          className='flex-1'
                          value={field.value?.diastolic || ''}
                          onChange={(e) =>
                            field.onChange({
                              ...field.value,
                              diastolic: e.target.value,
                            })
                          }
                        />
                        <span>mmHg</span>
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
                      <div className='flex items-center gap-2 w-full'>
                        <Input type='number' className='flex-1' {...field} />
                        <span>%SpO₂</span>
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
                      <div className='flex items-center gap-2 w-full'>
                        <Input type='number' className='flex-1' {...field} />
                        <span>ºC</span>
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
                      <div className='flex items-center gap-2 w-full'>
                        <Input type='number' className='flex-1' {...field} />
                        <span>bpm</span>
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
                      <div className='flex items-center gap-2 w-full'>
                        <Input type='number' className='flex-1' {...field} />
                        <span>rpm</span>
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
                      <div className='flex items-center gap-2 w-full'>
                        <Input type='number' className='flex-1' {...field} />
                        <span>kg</span>
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
                      <div className='flex items-center gap-2 w-full'>
                        <Input type='number' className='flex-1' {...field} />
                        <span>cm</span>
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
              // disabled={createAppointmentMutation.isPending}
              className='w-full md:w-fit'
            >
              {/* {editAppointment ? 'Guardar cambios' : 'Crear cita'} */}
              {/* {createAppointmentMutation.isPending && (
                <Loader2 className='me-2 animate-spin' />
              )} */}
              Crear entrada
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
