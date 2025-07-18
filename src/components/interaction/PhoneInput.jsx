import * as React from 'react';
import * as RPNInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

import { Check, ChevronsUpDown } from 'lucide-react';

const PhoneInput = React.forwardRef(({ className, onChange, ...props }, ref) => {
  return (
    <RPNInput.default
      ref={ref}
      className={cn('flex w-full', className)}
      flagComponent={FlagComponent}
      countrySelectComponent={CountrySelect}
      defaultCountry='EC'
      international={false}
      inputComponent={InputComponent}
      onChange={(value) => onChange?.(value || '')}
      {...props}
    />
  );
});
PhoneInput.displayName = 'PhoneInput';

const InputComponent = React.forwardRef(({ className, ...props }, ref) => (
  <Input className={cn('rounded-e-md rounded-s-none', className)} {...props} ref={ref} />
));
InputComponent.displayName = 'InputComponent';

const CountrySelect = ({ disabled, value, onChange, options }) => {
  const handleSelect = React.useCallback(
    (country) => {
      onChange(country);
    },
    [onChange]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type='button'
          variant={'outline'}
          className={cn('flex gap-1 rounded-e-none rounded-s-md px-3')}
          disabled={disabled}
        >
          <FlagComponent country={value} countryName={value} />
          <ChevronsUpDown
            className={cn('-mr-2 h-4 w-4 opacity-50', disabled ? 'hidden' : 'opacity-100')}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[300px] p-0'>
        <Command>
          <CommandList>
            <ScrollArea className='h-72'>
              <CommandInput placeholder='Buscar país...' />
              <CommandEmpty>País no encontrado.</CommandEmpty>
              <CommandGroup>
                {options
                  .filter((x) => x.value)
                  .map((option) => (
                    <CommandItem
                      className='gap-2'
                      key={option.value}
                      onSelect={() => handleSelect(option.value)}
                    >
                      <FlagComponent country={option.value} countryName={option.label} />
                      <span className='flex-1 text-sm'>{option.label}</span>
                      {option.value && (
                        <span className='text-foreground/50 text-sm'>
                          {`+${RPNInput.getCountryCallingCode(option.value)}`}
                        </span>
                      )}
                      <Check
                        className={cn(
                          'ml-auto h-4 w-4',
                          option.value === value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const FlagComponent = ({ country, countryName }) => {
  const Flag = flags[country];

  return (
    <span className='flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20'>
      {Flag && (
        <Flag
          title={countryName}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 'inherit',
            display: 'block',
          }}
        />
      )}
    </span>
  );
};

FlagComponent.displayName = 'FlagComponent';

export { PhoneInput };
