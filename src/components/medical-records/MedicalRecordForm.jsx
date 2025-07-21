import PropTypes from 'prop-types';

import { useForm } from 'react-hook-form';
import { Binoculars, HeartPulse, Loader2, RulerDimensionLine, Stethoscope } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@/components/ui';

import { useAppointments, useMedicalRecord } from '@/hooks';
import { medicalRecordSchema } from '@/schemas';
import { useAppointmentStore, usePatientStore } from '@/store';

export const MedicalRecordForm = () => {
  const { patientData } = usePatientStore();
  const { updateAppointmentMutation } = useAppointments();
  const { createMedicalRecordMutation } = useMedicalRecord();
  const { appointmentData, updateAppointment } = useAppointmentStore();

  const patientId = appointmentData?.patient?.id || patientData?.id || null;

  const form = useForm({
    resolver: zodResolver(medicalRecordSchema),
    defaultValues: {
      symptoms: '',
      diagnostic: '',
      treatment: '',
      prescription: '',
      bloodPressure: {
        systolic: '',
        diastolic: '',
      },
      oxygenSaturation: '',
      bodyTemperature: '',
      heartRate: '',
      respiratoryRate: '',
      weight: '',
      height: '',
      observations: '',
      patientId: patientId,
    },
  });

  if (!patientId) return null;

  const onSubmit = (values) => {
    createMedicalRecordMutation.mutate(values);

    if (updateAppointment && appointmentData?.id) {
      updateAppointmentMutation.mutate({
        id: appointmentData.id,
        appointment: {
          status: 'completed',
          patientId: patientId,
        },
      });
    }
  };

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

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-10'>
          <Accordion type='single' collapsible className='w-full' defaultValue='item-1'>
            <AccordionItem value='item-1'>
              <AccordionTrigger>
                {' '}
                <TriggerWithIcon icon={Stethoscope}>Evaluación</TriggerWithIcon>
              </AccordionTrigger>
              <AccordionContent className='flex flex-col ps-7 gap-4 text-balance'>
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
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='item-2'>
              <AccordionTrigger>
                <TriggerWithIcon icon={HeartPulse}>Signos vitales</TriggerWithIcon>
              </AccordionTrigger>
              <AccordionContent className='flex flex-col ps-7 gap-4 text-balance'>
                <div className='justify-center space-y-2.5 md:space-y-0 md:flex md:gap-10 w-full'>
                  <FormField
                    control={form.control}
                    name='bloodPressure'
                    render={() => (
                      <FormItem className='flex-1'>
                        <FormLabel>Presión arterial</FormLabel>
                        <div className='flex gap-2 items-center'>
                          <FormField
                            control={form.control}
                            name='bloodPressure.systolic'
                            render={({ field }) => (
                              <FormItem className='flex-1'>
                                <FormControl>
                                  <Input
                                    type='number'
                                    placeholder='Sistólica'
                                    {...field}
                                    className='w-full'
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <span className='text-gray-500'>/</span>

                          <FormField
                            control={form.control}
                            name='bloodPressure.diastolic'
                            render={({ field }) => (
                              <FormItem className='flex-1'>
                                <FormControl>
                                  <Input
                                    type='number'
                                    placeholder='Diastólica'
                                    {...field}
                                    className='w-full'
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <span className='text-gray-500'>mmHg</span>
                        </div>

                        {typeof form.formState.errors?.bloodPressure?.message === 'string' && (
                          <p className='text-sm font-medium text-destructive'>
                            {form.formState.errors.bloodPressure.message}
                          </p>
                        )}
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
                            <Input type='number' {...field} className='pr-16' />
                            <span className='absolute right-2 text-gray-500'>SpO₂</span>
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
                            <Input type='number' {...field} className='pr-16' />
                            <span className='absolute right-2 text-gray-500'>ºC</span>
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
                            <Input type='number' {...field} className='pr-16' />
                            <span className='absolute right-2 text-gray-500'>lpm</span>
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
                            <Input type='number' {...field} className='pr-16' />
                            <span className='absolute right-2 text-gray-500'>rpm</span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='item-3'>
              <AccordionTrigger>
                <TriggerWithIcon icon={RulerDimensionLine}>Medidas</TriggerWithIcon>
              </AccordionTrigger>
              <AccordionContent className='flex flex-col ps-7 gap-4 text-balance'>
                <div className='md:flex md:gap-10 w-full'>
                  <FormField
                    control={form.control}
                    name='weight'
                    render={({ field }) => (
                      <FormItem className='flex-1'>
                        <FormLabel>Peso</FormLabel>
                        <FormControl>
                          <div className='relative flex items-center gap-2 w-full'>
                            <Input type='number' {...field} className='pr-16' />
                            <span className='absolute right-2 text-gray-500'>kg</span>
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
                            <Input type='number' {...field} className='pr-16' />
                            <span className='absolute right-2 text-gray-500'>cm</span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='item-4'>
              <AccordionTrigger>
                <TriggerWithIcon icon={Binoculars}>Observaciones</TriggerWithIcon>
              </AccordionTrigger>
              <AccordionContent className='text-balance ps-7'>
                <FormField
                  control={form.control}
                  name='observations'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormControl>
                        <Textarea className='w-full resize-none' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className='pt-5 md:flex md:justify-center'>
            <Button
              type='submit'
              disabled={createMedicalRecordMutation.isPending}
              className='w-full md:w-fit'
            >
              {createMedicalRecordMutation.isPending && <Loader2 className='me-2 animate-spin' />}
              Crear entrada
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
