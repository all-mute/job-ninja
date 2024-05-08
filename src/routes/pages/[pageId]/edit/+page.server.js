/* eslint-disable no-unused-vars */
import { error, fail, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs, validateData } from '$lib/utils';
import { updatePageSchema } from '$lib/schemas';
import { serialize } from 'object-to-formdata';

export const load = async ({ locals, params }) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'Unauthorized');
	}

	try {
		const page = serializeNonPOJOs(await locals.pb.collection('pages').getOne(params.pageId));

		if (locals.user.id === page.user) {
			return {
				page
			};
		} else {
			throw error(403, 'FORBID');
		}
	} catch (err) {
		console.log('Error: ', err);
		throw error(err.status, err.message);
	}
};

export const actions = {
	updatePage: async ({ request, locals, params }) => {
		const body = await request.formData();
		
		// TODO fix this shit
		const privateValue = body.get('private');

		const { formData, errors } = await validateData(body, updatePageSchema);

		if (privateValue === 'on') {
			formData.private = true;
		} else {
			formData.private = false;
		}

		const { ...rest } = formData;

		if (errors) {
			return fail(400, {
				data: rest,
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection('pages').update(params.pageId, serialize(formData));
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, `/pages/${params.pageId}`);
	},
	deleteThumbnail: async ({ locals, params }) => {
		try {
			await locals.pb.collection('').update(params.pageId, { thumbnail: null });
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		return {
			success: true
		};
	}
};
