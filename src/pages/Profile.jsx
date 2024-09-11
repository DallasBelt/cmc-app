import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import UserInfoForm from '@/components/UserInfoForm';
import MedicInfoForm from '@/components/MedicInfoForm';
import AssistantInfoForm from '@/components/AssistantInfoForm';

import { useTabStore } from '@/store/store';

const Profile = () => {
  const location = useLocation();
  const isCompleteInfo = location.pathname === '/complete-info';
  const role = sessionStorage.getItem('roles');

  const tabValue = useTabStore((state) => state.tabValue);
  const tabDisabled = useTabStore((state) => state.tabDisabled);

  const handleDisabledTabClick = () => {
    if (isCompleteInfo && tabValue === 'userInfo') {
      toast.info('Primero complete sus datos personales.');
    }
  };

  return (
    <div className='flex justify-center'>
      <Tabs
        defaultValue='userInfo'
        className='w-full md:w-fit'
        value={isCompleteInfo ? tabValue : undefined}
      >
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger
            value='userInfo'
            disabled={isCompleteInfo ? tabDisabled : false}
          >
            Datos Personales
          </TabsTrigger>
          <TabsTrigger
            onClick={isCompleteInfo ? handleDisabledTabClick : undefined}
            value={role === 'medic' ? 'medicInfo' : 'assistantInfo'}
          >
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

export default Profile;
