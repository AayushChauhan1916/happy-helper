import { useEffect, useMemo, useState } from 'react';
import { Check, ChevronsUpDown, Search } from 'lucide-react';

import { PHONE_COUNTRIES, type PhoneCountry } from '@/constants/phone-countries';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type PhoneInputClassNames = {
  countryButton?: string;
  countryItem?: string;
  input?: string;
  popover?: string;
  root?: string;
};

type PhoneInputProps = {
  className?: string;
  classNames?: PhoneInputClassNames;
  countries?: PhoneCountry[];
  disabled?: boolean;
  name?: string;
  onBlur?: () => void;
  onChange?: (value: string) => void;
  placeholder?: string;
  value?: string;
};

const DEFAULT_COUNTRY = PHONE_COUNTRIES[0];

const getCountryFromValue = (value: string, countries: PhoneCountry[]) =>
  countries.find((country) => value.startsWith(country.dialCode));

const getNationalNumber = (value: string, country: PhoneCountry) => {
  if (!value.startsWith(country.dialCode)) {
    return value.replace(/\D/g, '');
  }

  return value.slice(country.dialCode.length).replace(/\D/g, '');
};

export function PhoneInput({
  className,
  classNames,
  countries = PHONE_COUNTRIES,
  disabled,
  name,
  onBlur,
  onChange,
  placeholder,
  value = '',
}: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const inferredCountry = useMemo(
    () => getCountryFromValue(value, countries) ?? countries[0] ?? DEFAULT_COUNTRY,
    [countries, value],
  );
  const [selectedCountry, setSelectedCountry] = useState<PhoneCountry>(inferredCountry);

  useEffect(() => {
    setSelectedCountry(inferredCountry);
  }, [inferredCountry]);

  const nationalNumber = useMemo(
    () => getNationalNumber(value, selectedCountry),
    [selectedCountry, value],
  );

  const filteredCountries = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return countries;
    }

    return countries.filter((country) => {
      const haystack = [
        country.name,
        country.dialCode,
        country.code,
        ...(country.searchTerms ?? []),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [countries, search]);

  const handleCountrySelect = (country: PhoneCountry) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearch('');

    const nextNationalNumber = nationalNumber.slice(
      0,
      country.maxNationalNumberLength,
    );
    onChange?.(`${country.dialCode}${nextNationalNumber}`);
  };

  const handleInputChange = (rawValue: string) => {
    const digits = rawValue
      .replace(/\D/g, '')
      .slice(0, selectedCountry.maxNationalNumberLength);

    onChange?.(`${selectedCountry.dialCode}${digits}`);
  };

  return (
    <div
      className={cn(
        'flex h-12 overflow-hidden rounded-xl border border-input bg-background shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50',
        disabled && 'pointer-events-none opacity-50',
        classNames?.root,
        className,
      )}
    >
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              'flex min-w-[128px] items-center justify-between gap-2 border-r border-input bg-muted/35 px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/55',
              classNames?.countryButton,
            )}
          >
            <span className="flex items-center gap-2">
              <span className="flex h-5 w-7 items-center justify-center rounded-sm bg-background text-[10px] font-semibold shadow-sm">
                {selectedCountry.flag}
              </span>
              <span>{selectedCountry.dialCode}</span>
            </span>
            <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          sideOffset={8}
          className={cn('w-[290px] rounded-2xl p-2', classNames?.popover)}
        >
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search country or code"
              className="h-10 rounded-xl pl-9"
            />
          </div>

          <div className="max-h-56 space-y-1 overflow-y-auto">
            {filteredCountries.length === 0 ? (
              <p className="px-3 py-2 text-xs text-muted-foreground">
                No country found
              </p>
            ) : (
              filteredCountries.map((country) => {
                const active = country.code === selectedCountry.code;

                return (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-muted',
                      active && 'bg-primary/5 text-primary',
                      classNames?.countryItem,
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-6 w-8 items-center justify-center rounded-md bg-muted/60 text-[10px] font-semibold">
                        {country.flag}
                      </span>
                      <span>
                        <span className="block font-medium text-foreground">
                          {country.name}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {country.dialCode}
                        </span>
                      </span>
                    </span>
                    {active && <Check className="h-4 w-4" />}
                  </button>
                );
              })
            )}
          </div>
        </PopoverContent>
      </Popover>

      <Input
        type="tel"
        name={name}
        value={nationalNumber}
        onBlur={onBlur}
        onChange={(event) => handleInputChange(event.target.value)}
        disabled={disabled}
        inputMode="numeric"
        placeholder={placeholder ?? '9876543210'}
        className={cn(
          'h-full rounded-none border-0 bg-transparent pl-4 pr-4 shadow-none focus-visible:border-0 focus-visible:ring-0',
          classNames?.input,
        )}
      />
    </div>
  );
}
