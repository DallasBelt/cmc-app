// import {
//   Card,
//   CardContent,
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from '@/components/ui';

// import { AssistantInfoForm } from '@/components/assistants';
// import { MedicInfoForm } from '@/components/medic-info/MedicInfoForm';
// import { UserInfoForm } from '@/components/user-info/UserInfoForm';
// import { ScheduleForm } from '@/components/schedule/ScheduleForm';

// export const Profile = () => {
//   const role = sessionStorage.getItem('role');

//   return (
//     <div className='flex justify-center'>
//       <Tabs defaultValue='userInfo' className='w-full md:w-fit'>
//         <TabsList className='grid w-full grid-cols-3'>
//           <TabsTrigger value='userInfo'>Datos Personales</TabsTrigger>
//           <TabsTrigger value={role === 'medic' ? 'medicInfo' : 'assistantInfo'}>
//             Datos Profesionales
//           </TabsTrigger>
//           <TabsTrigger value='schedule'>
//             Horario
//           </TabsTrigger>
//         </TabsList>
//         <TabsContent value='userInfo'>
//           <Card>
//             <CardContent className='p-5'>
//               <UserInfoForm />
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value={role === 'medic' ? 'medicInfo' : 'assistantInfo'}>
//           <Card>
//             <CardContent className='p-5'>
//               {role === 'medic' ? <MedicInfoForm /> : <AssistantInfoForm />}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value='schedule'>
//           <Card>
//             <CardContent className='p-5'>
//               <ScheduleForm />
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

import { useEffect, useState } from 'react';

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
import { ScheduleForm } from '@/components/schedule/ScheduleForm';

import { useUserInfo, useMedicInfo } from '@/hooks';

export const Profile = () => {
  const role = sessionStorage.getItem('role');

  const [activeTab, setActiveTab] = useState('userInfo');

  const { userInfoQuery } = useUserInfo();
  const { medicInfoQuery } = useMedicInfo();
  // const { assistantInfoQuery } = useAssistantInfo();

  // Avanzar a Datos Profesionales si se completó UserInfo
  useEffect(() => {
    if (userInfoQuery.data) {
      setActiveTab(role === 'medic' ? 'medicInfo' : 'assistantInfo');
    }
  }, [userInfoQuery.data, role]);

  // Avanzar a Horario si se completó la info profesional
  useEffect(() => {
    const professionalInfoReady = medicInfoQuery.data;

    if (professionalInfoReady) {
      setActiveTab('schedule');
    }
  }, [medicInfoQuery.data, role]);

  return (
    <div className='flex justify-center'>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className='w-full md:w-fit'
      >
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
