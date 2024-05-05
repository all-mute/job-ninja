import { writable } from 'svelte/store';

export const githubOrigURL = writable('https://github.com/engageintellect/project-nexum');

export const githubOurURL = writable('https://github.com/all-mute/project-flexin');

export const msgStore = writable('hello world');
export const feedSelect = writable(false);

export const userPageCount = writable(0);
