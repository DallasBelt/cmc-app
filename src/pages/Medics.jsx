import RegisterDialog from '@/components/RegisterDialog';
import MedicsTable from '@/components/MedicsTable';

const Medics = () => {
  return (
    <>
      <div className='px-36'>
        <h1 className='text-center text-2xl font-bold mb-5'>
          ADMINISTRAR MÉDICOS
        </h1>
        <RegisterDialog />
        <MedicsTable />
      </div>
    </>
  );
};

export default Medics;
