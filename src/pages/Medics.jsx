import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { UserPlus, FloppyDisk } from '@phosphor-icons/react';

import NavBar from '@/components/NavBar';

const Medics = () => {
  return (
    <>
      <NavBar />
      <div className='p-5'>
        <h1 className='text-center text-2xl font-bold'>ADMINISTRAR MÉDICOS</h1>
        <div className='flex justify-start mt-5'>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus size={24} className='me-1' />
                Agregar Médico
              </Button>
            </DialogTrigger>
            <DialogContent className='max-w-2xl'>
              <DialogHeader>
                <DialogTitle>Crear nuevo médico</DialogTitle>
                <DialogDescription>
                  Por favor, llene los datos solicitados.
                </DialogDescription>
              </DialogHeader>

              <div className='flex flex-col space-y-3 md:grid md:grid-cols-2'>
                <Input type='text' placeholder='Nombres' required />
                <Input type='text' placeholder='Identificación' />
                <Input type='email' placeholder='Email' />
                <Input type='tel' placeholder='Celular' />
                <Input type='text' placeholder='Dirección' />
                <Input type='text' placeholder='Especialidad' />
                <Button type='submit' className='mt-3 self-center'>
                  <FloppyDisk size={24} className='me-1' />
                  Guardar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Table className='mt-5'>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Nº</TableHead>
              <TableHead>NOMBRES</TableHead>
              <TableHead>IDENTIFICACIÓN</TableHead>
              <TableHead>ESPECIALIDAD</TableHead>
              <TableHead>OPCIONES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className='font-medium'>INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell>$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Medics;
