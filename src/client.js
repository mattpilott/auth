import * as sapper from '../__sapper__/client.js';
import { Store } from 'svelte/store.js';

function post(endpoint, data) {

	return fetch(endpoint, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(r => r.json());
}

class AuthStore extends Store {

	login(credentials) {
		return post(`auth/login`, credentials).then(user => {
			this.set({ user: user });
			return user;
		});
	}

	logout() {
		return post(`auth/logout`).then(response => {
			this.set({ user: null });
			return response;
		});
	}

	register(user) {
		return post(`auth/register`, user).then(user => {
			this.set({ user: user });
			return user;
		});
	}

	save(user) {
		return post(`auth/save`, user).then(user => {
			this.set({ user: user });
			return user;
		});
	}
}

sapper.start({
	target: document.querySelector('#sapper'),
	store: data => {
		return new AuthStore(data);
	}
});