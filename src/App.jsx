import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/home' element={<HomePage />} />
        {/* <LoginPage /> */}
      </Routes>
    </>
  );
};

export default App;
