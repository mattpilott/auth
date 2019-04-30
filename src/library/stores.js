import { writable } from 'svelte/store';

function post(endpoint, data = {}) {

	return fetch(endpoint, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' }
	}).then(r => r.json());
}

function createAuth() {

	const { subscribe, set, update } = writable();

    async function login(credentials) {

        const user = await post('auth/login', credentials);

        set({user});

        return user;
    };

    async function logout() {

        const response = await post('auth/logout');

        set({user: null});

        return response;
    };

    async function register(credentials) {

        const user = await post('auth/register', credentials);

        return user;
    };

    async function save(credentials) {

        const user = await post('auth/save', credentials);

        set({user});

        return user;
    };

	return { subscribe, login, logout, register, save };
}

export const auth = createAuth();