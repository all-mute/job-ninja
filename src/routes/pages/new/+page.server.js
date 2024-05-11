/* eslint-disable no-unused-vars */
import { error, fail, redirect } from '@sveltejs/kit';
import { serialize } from 'object-to-formdata';
import { createPageSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions = {
	create: async ({ request, locals }) => {
		const body = await request.formData();

		const privacyValue = parseInt(body.get('privacy')); // Преобразуем в число

		body.append('user', locals.user.id);

		const { formData, errors } = await validateData(body, createPageSchema);

		// Устанавливаем private на основе privacyValue
		formData.private = privacyValue > 0;

		// Вычисляем public_at
		const publicAt = new Date();
		publicAt.setDate(publicAt.getDate() + privacyValue);
		formData.public_at = publicAt.toISOString();

		const { ...rest } = formData;

		if (errors) {
			return fail(400, {
				data: rest,
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection('pages').create(serialize(formData));
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, '/');
	}
};
