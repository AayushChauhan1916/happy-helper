import z from 'zod';

export const onboardingPropertySchema = z.object({
  propertyName: z.string().trim().min(2, 'Property name is required').max(100),
  propertyType: z.string().min(1, 'Select property type'),
  houseNumber: z
    .string()
    .trim()
    .min(1, 'House/Building number is required')
    .max(50),
  address: z.string().trim().min(5, 'Street address is required').max(500),
  landmark: z.string().trim().max(200).optional(),
  pincode: z.string().trim().min(6, 'Enter a valid pincode').max(6),
  city: z.string().trim().min(2, 'City is required').max(100),
  description: z.string().max(500).optional(),
});

export type OnboardingPropertyFormData = z.infer<
  typeof onboardingPropertySchema
>;
