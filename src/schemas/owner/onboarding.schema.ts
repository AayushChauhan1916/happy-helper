import z from 'zod';
import {
  INDIA_COUNTRY,
  INDIAN_STATES_AND_UTS,
} from '@/constants/india-address';

const INDIAN_STATE_SET = new Set<string>(INDIAN_STATES_AND_UTS as readonly string[]);

const propertyAddressSchema = z.object({
  houseNumber: z
    .string()
    .trim()
    .min(1, 'House number is required')
    .max(100, 'House number is too long'),
  street: z.string().trim().max(200, 'Street is too long'),
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
  description: z.string().trim().max(500).optional(),
  address: propertyAddressSchema,
});

export type OnboardingPropertyFormData = z.infer<
  typeof onboardingPropertySchema
>;
