import { useState } from 'react';
import { Search, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { usePatients } from '@/hooks';
import { useTheme } from '@/components/theme/ThemeProvider';

export const SearchPatients = ({ onSelectPatient }) => {
  const { effectiveTheme } = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const medicId = sessionStorage.getItem('id');
  const { patientsQuery } = usePatients();

  // Fallback if there's no data or it's not an array
  const allPatients = Array.isArray(patientsQuery.data?.data) ? patientsQuery.data.data : [];

  // Filter only patients that belong to the logged-in doctor
  const patientList = allPatients.filter((patient) => patient.medic.id === medicId);

  // Filter patients based on search input
  const filteredPatients = patientList.filter((patient) => {
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
    // Show the popover only if input is not empty and there are matching results
    setIsPopoverOpen(value.length > 0 && filteredPatients.length > 0);
  };

  const clearInput = () => {
    setInputValue('');
    setIsPopoverOpen(false);
    onSelectPatient('');
  };

  const handleSelectPatient = (patient) => {
    setInputValue(`${patient.firstName} ${patient.lastName}`);
    setIsPopoverOpen(false);
    onSelectPatient(patient.id);
  };

  return (
    <div className='relative flex items-center'>
      <Search size={18} className='absolute left-3' />
      <Input
        type='text'
        placeholder='Buscar paciente...'
        className='pl-9'
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsPopoverOpen(inputValue.length > 0 && filteredPatients.length > 0)}
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
            effectiveTheme === 'dark' ? 'bg-[#020817] text-white' : 'bg-white text-black'
          }`}
        >
          {patientsQuery.isPending && <p className='p-2'>Cargando...</p>}
          {patientsQuery.error && <p className='p-2'>Error al cargar pacientes</p>}
          {filteredPatients.length ? (
            <ul className='list-none p-1'>
              {filteredPatients.map((patient) => (
                <li
                  key={patient.id}
                  onClick={() => handleSelectPatient(patient)}
                  className={`text-sm px-2 py-1 cursor-pointer hover:rounded-md ${
                    effectiveTheme === 'dark' ? 'hover:bg-[#1e293b]' : 'hover:bg-[#f1f5f9]'
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
