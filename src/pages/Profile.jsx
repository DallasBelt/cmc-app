import { useEffect, useState } from 'react';

import { Card, CardContent, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';

import { AssistantInfoForm } from '@/components/assistants';
import { MedicInfoForm } from '@/components/medic-info/MedicInfoForm';
import { UserInfoForm } from '@/components/user-info/UserInfoForm';
import { ScheduleForm } from '@/components/schedule/ScheduleForm';

import { useUserInfo, useMedicInfo, useSchedule } from '@/hooks';

export const Profile = () => {
  const role = sessionStorage.getItem('role');

  const { userInfoQuery } = useUserInfo();
  const { medicInfoQuery } = useMedicInfo();
  const { scheduleQuery } = useSchedule();

  const [activeTab, setActiveTab] = useState('userInfo');
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  // Decide which tab should be active based on available data
  useEffect(() => {
    if (!userInfoQuery.isSuccess) return;

    const hasUserInfo = !!userInfoQuery.data;
    const hasMedicInfo = !!medicInfoQuery.data;
    const hasSchedule = Array.isArray(scheduleQuery.data) && scheduleQuery.data.length > 0;

    if (!hasUserInfo) {
      setActiveTab('userInfo');
    } else if (role === 'medic' && !hasMedicInfo) {
      setActiveTab('medicInfo');
    } else if (role === 'assistant' && !hasMedicInfo) {
      setActiveTab('assistantInfo');
    } else if (role === 'medic' && !hasSchedule) {
      setActiveTab('schedule');
    } else {
      // All data is complete — stay in userInfo tab
      if (!initialCheckDone) {
        setActiveTab('userInfo');
        setInitialCheckDone(true);
      }
    }
  }, [userInfoQuery.data, medicInfoQuery.data, scheduleQuery.data, role, initialCheckDone]);

  return (
    <div className='flex justify-center'>
      <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full md:w-fit'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='userInfo'>Datos Personales</TabsTrigger>

          <TabsTrigger
            value={role === 'medic' ? 'medicInfo' : 'assistantInfo'}
            disabled={!userInfoQuery.data}
          >
            Datos Profesionales
          </TabsTrigger>

          <TabsTrigger value='schedule' disabled={!medicInfoQuery.data}>
            Horario
          </TabsTrigger>
        </TabsList>

        <TabsContent value='userInfo'>
          <Card>
            <CardContent className='p-5'>
              <UserInfoForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value={role === 'medic' ? 'medicInfo' : 'assistantInfo'}>
          <Card>
            <CardContent className='p-5'>
              {role === 'medic' ? <MedicInfoForm /> : <AssistantInfoForm />}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='schedule'>
          <Card>
            <CardContent className='p-5'>
              <ScheduleForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
