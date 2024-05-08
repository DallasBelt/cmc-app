// import { useState } from 'react'
import './index.css'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import login from '@/assets/login.jpg'
import logo from '@/assets/logo.svg'

function App() {

  return (
    <>
      <img src={logo} className='w-80 my-0 mx-auto py-4'/>
    
      <div className='flex flex-col items-center md:flex-row md:justify-center'>
        <img src={login} alt='' className='w-80 lg:w-2/4 xl:w-2/6 order-2 md:-order-1 mt-5'/>
        <div className='w-full lg:w-2/4 xl:w-2/6 px-10 space-y-5'>
          <Input type="email" placeholder='Correo electrónico' className='h-14 text-lg'/>
          <Input type="password" placeholder='Contraseña' className='h-14 text-lg' />
          <Button className='w-full h-14 text-xl'>INICIAR SESIÓN</Button>
        </div>
      </div>
    </>
  )
}

export default App
