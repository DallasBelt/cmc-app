import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MagnifyingGlass, X } from '@phosphor-icons/react';

const fetchPatients = async () => {
  try {
    // Check auth
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error('Oops!', {
        description: 'Error de autenticación.',
      });
      return [];
    }

    const res = await axios.get('http://localhost:3000/api/v1/patient', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const SearchPatients = ({ onSelectPatient }) => {
  const { effectiveTheme } = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['patients'],
    queryFn: fetchPatients,
  });

  const filteredPatients = data.filter((patient) => {
    const searchValue = inputValue.toLowerCase();
    return (
      patient.firstName.toLowerCase().includes(searchValue) ||
      patient.lastName.toLowerCase().includes(searchValue) ||
      patient.dni.toLowerCase().includes(searchValue) ||
      patient.email.toLowerCase().includes(searchValue)
    );
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsPopoverOpen(value.length > 0 && filteredPatients.length > 0); // Open Popover only if input is not empty and there are results
  };

  const clearInput = () => {
    setInputValue('');
    setIsPopoverOpen(false); // Close Popover when input is cleared
    onSelectPatient('');
  };

  const handleSelectPatient = (patient) => {
    setInputValue(`${patient.firstName} ${patient.lastName}`);
    setIsPopoverOpen(false); // Close Popover on selection
    onSelectPatient(patient.id); // Pass the patient ID to the parent
  };

  return (
    <div className='relative flex items-center'>
      <MagnifyingGlass size={18} className='absolute left-3' />
      <Input
        type='text'
        placeholder='Buscar paciente...'
        className='pl-9'
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() =>
          setIsPopoverOpen(inputValue.length > 0 && filteredPatients.length > 0)
        }
      />
      {inputValue && (
        <div className='absolute -right-1'>
          <Button variant='ghost p-0' onClick={clearInput}>
            <X size={16} />
          </Button>
        </div>
      )}

      {isPopoverOpen && (
        <div
          className={`absolute top-full mt-1 border rounded-md w-full z-50 shadow-lg ${
            effectiveTheme === 'dark'
              ? 'bg-[#020817] text-white'
              : 'bg-white text-black'
          }`}
        >
          {isLoading && <p className='p-2'>Cargando...</p>}
          {error && <p className='p-2'>Error al cargar pacientes</p>}
          {filteredPatients.length ? (
            <ul className='list-none p-1'>
              {filteredPatients.map((patient) => (
                <li
                  key={patient.id}
                  onClick={() => handleSelectPatient(patient)}
                  className={`text-sm px-2 py-1 cursor-pointer hover:rounded-md ${
                    effectiveTheme === 'dark'
                      ? 'hover:bg-[#1e293b]'
                      : 'hover:bg-[#f1f5f9]'
                  }`}
                >
                  {patient.firstName} {patient.lastName}
                </li>
              ))}
            </ul>
          ) : (
            <p className='p-2'>No se encontraron resultados</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPatients;
