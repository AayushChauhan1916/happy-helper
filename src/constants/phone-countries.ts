export type PhoneCountry = {
  code: string;
  dialCode: string;
  flag: string;
  name: string;
  searchTerms?: string[];
  maxNationalNumberLength: number;
  minNationalNumberLength: number;
};

export const PHONE_COUNTRIES: PhoneCountry[] = [
  {
    code: 'IN',
    dialCode: '+91',
    flag: 'IN',
    name: 'India',
    searchTerms: ['bharat', 'india', '+91'],
    minNationalNumberLength: 10,
    maxNationalNumberLength: 10,
  },
];
