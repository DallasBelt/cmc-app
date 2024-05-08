// import { useState } from 'react'
import './index.css'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import login from '@/assets/login.jpg'
import logo from '@/assets/logo.svg'

function App() {

  return (
    <>
      <img src={logo} className='w-48 my-5 mx-auto'/>
    
      <div className='flex flex-col items-center md:flex-row md:justify-center'>
        <img src={login} alt='' className='hidden lg:block lg:w-2/4 xl:w-2/6'/>
        <div className='w-full sm:w-3/4 lg:w-2/4 xl:w-2/6 px-10 space-y-5'>
          <Input type="email" placeholder='Correo electrónico' className='h-14 text-lg' required/>
          <Input type="password" placeholder='Contraseña' className='h-14 text-lg' required />
          <Button type='submit' className='w-full h-14 text-xl'>INICIAR SESIÓN</Button>
        </div>
      </div>
    </>
  )
}

export default App
