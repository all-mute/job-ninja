import { error, fail, redirect } from '@sveltejs/kit';
import { registerUserSchema } from '$lib/schemas';
import { generateUsername, validateData } from '$lib/utils';

export const actions = {
	register_new: async ({ request, cookies }) => {
        const form = await request.formData();
        const token = form.get('token');
        if (!token || typeof token !== 'string') {
            throw redirect(303, '/register');
        }

		// IMPORTANT
        cookies.set('pb_auth', JSON.stringify({ token: '' }), { path: '/' });
        throw redirect(303, '/login');
    },
	oauth_yandex: async ({ request, cookies }) => {
        const form = await request.formData();
        const token = form.get('token');
        if (!token || typeof token !== 'string') {
            throw redirect(303, '/login');
        }
        cookies.set('pb_auth', JSON.stringify({ token: token }), { path: '/' });
        throw redirect(303, '/');
    },
	// LEGACY reg
	register: async ({ locals, request }) => {
		const { formData, errors } = await validateData(await request.formData(), registerUserSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		let username = generateUsername(formData.name.split(' ').join('')).toLowerCase();

		try {
			await locals.pb.collection('users').create({ username, ...formData });
			await locals.pb.collection('users').requestVerification(formData.email);
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Something went wrong');
		}

		throw redirect(303, '/login');
	},
};
