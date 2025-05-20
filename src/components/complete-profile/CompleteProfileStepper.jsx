import { useState } from 'react';
import { defineStepper } from '@/components/ui/stepper';
import { useMedicInfo, useSchedules, useUserInfo } from '@/hooks';
import { useToastStore } from '@/store';
import { useMutation } from '@tanstack/react-query';

import { Button } from '@/components/ui';

import { UserInfoForm } from '@/components/user-info/UserInfoForm';
import { MedicInfoForm } from '@/components/medic-info/MedicInfoForm';
import { SchedulesForm } from '@/components/schedules/SchedulesForm';

import { userInfoSchema } from '@/schemas/userInfoSchema';

const { Stepper } = defineStepper(
  {
    id: 'step-1',
    title: 'Información Personal',
    schema: userInfoSchema,
  },
  {
    id: 'step-2',
    title: 'Información Médica',
  },
  {
    id: 'step-3',
    title: 'Horarios',
  }
);

export const CompleteProfileStepper = () => {
  const [isValid, setIsValid] = useState(true);

  return (
    <Stepper.Provider className='space-y-4'>
      {({ methods }) => (
        <>
          <Stepper.Navigation>
            {methods.all.map((step) => (
              <Stepper.Step
                key={step.id}
                of={step.id}
                onClick={() => methods.goTo(step.id)}
              >
                <Stepper.Title>{step.title}</Stepper.Title>
              </Stepper.Step>
            ))}
          </Stepper.Navigation>

          {methods.switch({
            'step-1': () => <UserInfoForm />,
            'step-2': () => <MedicInfoForm />,
            'step-3': () => <SchedulesForm />,
          })}

          <Stepper.Controls>
            {!methods.isFirst && (
              <Button onClick={methods.prev} disabled={methods.isFirst}>
                Anterior
              </Button>
            )}

            <Button
              onClick={async () => {
                const isValidForm = await methods.trigger(); // Llamamos a trigger directamente
                if (isValidForm) {
                  methods.next(); // Si el formulario es válido, avanzamos al siguiente paso
                } else {
                  setIsValid(false); // Si no es válido, mostramos un error
                }
              }}
              disabled={!isValid} // Deshabilitar el botón "Siguiente" si no es válido
            >
              {methods.isLast ? 'Reiniciar' : 'Siguiente'}
            </Button>
          </Stepper.Controls>
        </>
      )}
    </Stepper.Provider>
  );
};
