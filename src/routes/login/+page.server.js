import { error, fail, redirect } from '@sveltejs/kit';
import { validateData } from '$lib/utils';
import { loginUserSchema } from '$lib/schemas';

export const actions = {
	oauth_yandex: async ({ request, cookies }) => {
        const form = await request.formData();
        const token = form.get('token');
        if (!token || typeof token !== 'string') {
            throw redirect(303, '/login');
        }
        cookies.set('pb_auth', JSON.stringify({ token: token }), { path: '/' });
        throw redirect(303, '/');
    },

	login_pass: async ({ request, cookies }) => {
        const form = await request.formData();
        const token = form.get('token');
        if (!token || typeof token !== 'string') {
            throw redirect(303, '/login');
        }
        cookies.set('pb_auth', JSON.stringify({ token: token }), { path: '/' });
        throw redirect(303, '/');
    },

	// LEGACY login
	login: async ({ request, locals }) => {
		const { formData, errors } = await validateData(await request.formData(), loginUserSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection('users').authWithPassword(formData.email, formData.password);
			// if (!locals.pb?.authStore?.model?.verified) {
			if (!locals.pb?.authStore?.model) {
				locals.pb.authStore.clear();
				return {
					notVerified: true
				};
			}
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, '/');
	}
};
