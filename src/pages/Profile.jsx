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

export const Profile = () => {
  const role = sessionStorage.getItem('roles');

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
      </Tabs>
    </div>
  );
};
