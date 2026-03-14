import z from 'zod';
import {
  INDIA_COUNTRY,
  INDIAN_STATES_AND_UTS,
} from '@/constants/india-address';
import { PHONE_COUNTRIES } from '@/constants/phone-countries';

const INDIAN_STATE_SET = new Set<string>(INDIAN_STATES_AND_UTS as readonly string[]);
const INDIA_DIAL_CODE =
  PHONE_COUNTRIES.find((country) => country.code === 'IN')?.dialCode ?? '+91';

const propertyAddressSchema = z.object({
  houseNumber: z
    .string()
    .trim()
    .min(1, 'House number is required')
    .max(100, 'House number is too long'),
  street: z
    .string()
    .trim()
    .min(1, 'Street is required')
    .max(200, 'Street is too long'),
  landmark: z.string().trim().max(200, 'Landmark is too long').optional(),
  city: z.string().trim().min(1, 'City is required').max(100),
  state: z
    .string()
    .trim()
    .min(1, 'State is required')
    .refine(
      (value) => INDIAN_STATE_SET.has(value),
      'State must be a valid Indian state or union territory',
    ),
  pincode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, 'Pincode must be a valid 6-digit number'),
  country: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => !value || value === INDIA_COUNTRY,
      'Country must be India',
    ),
});

export const onboardingPropertySchema = z.object({
  name: z.string().trim().min(1, 'Property name is required').max(120),
  contactNumber: z
    .string()
    .trim()
    .regex(
      new RegExp(`^\\${INDIA_DIAL_CODE}\\d{10}$`),
      'Contact number must be a valid 10-digit Indian mobile number',
    ),
  description: z.string().trim().max(500).optional(),
  address: propertyAddressSchema,
});

export const ownerOnboardingSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be at most 100 characters'),
  phoneNumber: z
    .string()
    .trim()
    .regex(
      new RegExp(`^\\${INDIA_DIAL_CODE}\\d{10}$`),
      'Phone number must be a valid 10-digit Indian mobile number',
    ),
  property: onboardingPropertySchema,
});

export type OwnerOnboardingFormData = z.infer<typeof ownerOnboardingSchema>;
