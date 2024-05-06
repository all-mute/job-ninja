import { z } from 'zod';

export const loginUserSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email.' }),
	password: z.string({ required_error: 'Password is required' })
});

export const registerUserSchema = z
	.object({
		name: z
			.string({ required_error: 'Name is required' })
			.regex(/^[a-zA-z\s]*$/, { message: 'Name can only contain letters and spaces.' })
			.min(2, { message: 'Name must be at least 2 characters' })
			.max(64, { message: 'Name must be less than 64 characters' })
			.trim(),

		description: z
			.string()
			.regex(/^[a-zA-Z0-9 ,.'-]*$/, { message: 'Description can only contain letters, numbers, spaces, and normal symbols like commas, periods, dashes, and apostrophes.' })
			.min(2, { message: 'Description must be at least 2 characters' })
			.max(128, { message: 'Description must be less than 128 characters' })
			.trim().optional(),

		email: z
			.string({ required_error: 'Email is required' })
			.email({ message: 'Email must be a valid email' }),
		password: z
			.string({ required_error: 'Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			}),
		passwordConfirm: z
			.string({ required_error: 'Confirm Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			})
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['passwordConfirm']
			});
		}
	});

const imageTypes = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
	'image/svg+xml',
	'image/gif'
];

export const createPageSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(2, { message: 'Name must be longer than 2 characters' })
		.max(64, { message: 'Name must be 64 characters or less' })
		.trim(),


	company: z
		.string({ required_error: 'Company is required' })
		.min(2, { message: 'Company must be longer than 2 characters' })
		.max(32, { message: 'Company must be 32 characters or less' })
		.trim(),


	domain: z
		.string({ required_error: 'Domain is required' })
		.min(2, { message: 'Domain must be longer than 2 characters' })
		.max(32, { message: 'Domain must be 32 characters or less' })
		.trim(),

	tagline: z
		.string()
		.min(2, { message: 'Tagline must be longer than 2 characters' })
		.max(64, { message: 'Tagline must be 64 characters or less' })
		.trim().optional(),

	url: z.string().url({ message: 'URL must be a valid URL' }).optional(),

	grade: z
		.string({ required_error: 'Grade is required' })
		.min(1, { message: 'Grade is required' })
		.max(64, { message: 'Grade must be 64 characters or less' })
		.trim()
		.refine((val) => {
			const choices = ['intern', 'junior', 'middle', 'senior', 'senior+'];
			return choices.includes(val) ? val : undefined;
		}, { message: 'Grade must be one of the following: intern, junior, middle, senior, senior+' }),


	content: z
		.string({ required_error: 'Content is required' })
		.min(1, { message: 'Content is required' })
		// .max(262, 144, { message: 'Content must be less than 262,144 characters' })
		.trim(),
	
	user: z.string({ required_error: 'User is required.' })
});

export const updatePageSchema = createPageSchema.omit({ user: true });

export const updateEmailSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email' })
});

export const updateUsernameSchema = z.object({
	username: z
		.string({ required_error: 'Username is required' })
		.min(3, { message: 'Username must be at least 3 characters' })
		.max(24, { message: 'Username must be 24 characters or less' })
		.regex(/^[a-zA-Z0-9]*$/, { message: 'Username can only contain letters or numbers.' })
});

export const updatePasswordSchema = z
	.object({
		oldPassword: z.string({ required_error: 'Old password is required' }),
		password: z
			.string({ required_error: 'Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			}),
		passwordConfirm: z
			.string({ required_error: 'Confirm Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			})
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['passwordConfirm']
			});
		}
	});

export const updateProfileSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(1, { message: 'Name is required' })
		.max(64, { message: 'Name must be 64 characters or less' })
		.trim(),

	description: z
		.string()
		.regex(/^[a-zA-Z0-9 ,.'-]*$/, { message: 'Description can only contain letters, numbers, spaces, and normal symbols like commas, periods, dashes, and apostrophes.' })
		.min(2, { message: 'Description must be at least 2 characters' })
		.max(128, { message: 'Description must be less than 128 characters' })
		.trim().optional(),

	avatar: z
		.instanceof(Blob)
		.optional()
		.superRefine((val, ctx) => {
			if (val) {
				if (val.size > 5242880) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Avatar must be less than 5MB'
					});
				}

				if (!imageTypes.includes(val.type)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Unsupported file type. Supported formats: jpeg, jpg, png, webp, svg, gif'
					});
				}
			}
		})
});
