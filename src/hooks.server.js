import PocketBase from 'pocketbase';
import { serializeNonPOJOs } from '$lib/utils';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { building } from '$app/environment';

export const handle = async ({ event, resolve }) => {
  // Initialize PocketBase and user data
  event.locals.pb = new PocketBase(PUBLIC_POCKETBASE_URL);
  event.locals.user = undefined;
  event.locals.id = '';
  event.locals.email = '';

  // Handle auth route or during build
  const isAuth = event.url.pathname === '/login';
  if (isAuth || building) {
    event.cookies.set('pb_auth', '', { path: '/' });
    return await resolve(event);
  }

  // Load auth store from cookie
  const pb_auth = event.request.headers.get('cookie') || '';
  event.locals.pb.authStore.loadFromCookie(pb_auth);

  try {
    // Check and refresh authentication
    if (event.locals.pb.authStore.isValid) {
      const auth = await event.locals.pb.collection('users').authRefresh();

      event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
      event.locals.id = auth.record.id;
      event.locals.email = auth.record.email;
    } else {
      throw new Error('Session expired');
    }
  } catch (error) {
    // Clear auth store and redirect on error
    console.error('Auth error:', error);
    event.locals.pb.authStore.clear();
    //throw redirect(303, '/auth');
  }

  // Ensure user ID exists
  if (!event.locals.id) {
    //throw redirect(303, '/auth');
  }

  const response = await resolve(event);

  // Set cookie with appropriate domain and security
  const requestUrl = new URL(event.request.url);
  const domain = requestUrl.hostname;
  response.headers.set(
    'set-cookie',
    event.locals.pb.authStore.exportToCookie({
      secure: true,
      domain: domain,
      sameSite: 'none'
    })
  );

  return response;
};
