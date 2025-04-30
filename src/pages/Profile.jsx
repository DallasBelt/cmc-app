import { useState } from 'react';

import {
  Card,
  CardContent,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';

import { AssistantInfoForm } from '@/components/assistants';
import { MedicInfoForm } from '@/components/medic-info/MedicInfoForm';
import { UserInfoForm } from '@/components/user-info/UserInfoForm';

import { useAuth } from '@/hooks';

export const Profile = () => {
  const role = sessionStorage.getItem('roles');

  const { completeProfileMutation } = useAuth();

  const [isProfileComplete, setIsProfileComplete] = useState({
    userInfo: false,
    professionalInfo: false,
  });

  const handleSectionComplete = (section) => {
    setIsProfileComplete((prev) => {
      const updated = { ...prev, [section]: true };

      if (updated.userInfo && updated.professionalInfo) {
        completeProfileMutation.mutate();
      }

      return updated;
    });
  };

  return (
    <div className='flex justify-center'>
      <Tabs defaultValue='userInfo' className='w-full md:w-fit'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='userInfo'>Datos Personales</TabsTrigger>
          <TabsTrigger value={role === 'medic' ? 'medicInfo' : 'assistantInfo'}>
            Datos Profesionales
          </TabsTrigger>
        </TabsList>
        <TabsContent value='userInfo'>
          <Card>
            <CardContent className='p-5'>
              <UserInfoForm
                onComplete={() => handleSectionComplete('userInfo')}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value={role === 'medic' ? 'medicInfo' : 'assistantInfo'}>
          <Card>
            <CardContent className='p-5'>
              {role === 'medic' ? (
                <MedicInfoForm
                  onComplete={() => handleSectionComplete('professionalInfo')}
                />
              ) : (
                <AssistantInfoForm
                  onComplete={() => handleSectionComplete('professionalInfo')}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
