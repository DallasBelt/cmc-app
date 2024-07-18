import { Oval } from 'react-loader-spinner';

const LoadingOverlay = ({ loading }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
        loading ? '' : 'hidden'
      }`}
    >
      <Oval
        visible={true}
        height='80'
        width='80'
        color='#2563eb'
        secondaryColor='#FFF'
        strokeWidth={4}
        ariaLabel='oval-loading'
      />
    </div>
  );
};

export default LoadingOverlay;
