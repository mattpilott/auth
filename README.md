# Auth
#### Sapper Authentication Implementation for Wordpress

The structure of Auth is based on the svelte/sapper [realworld project](https://github.com/sveltejs/realworld)

Written using Svelte V3 and using the wp oauth server plugin.

### Use with your own WordPress install

You'll need an `.env` file in your root with the following variables:
```
SECRET=your_super_secret
LOGIN_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXXX
LOGIN_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXX
REGISTER_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXXX
REGISTER_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

You'll also need the [WP oauth plugin](http://wp-oauth.com) and 2 clients, one for registration and another for login:

##### Register Grant Types
* [x] Authorization Code
* [ ] Authorization
* [ ] User Credentials
* [x] Client Credentials
* [ ] Refresh Token
* Set a user with admin priveliges to help create the accounts `Client Credential Assigned User`

##### Login Grant Types
* [ ] Authorization Code
* [ ] Authorization
* [x] User Credentials
* [ ] Client Credentials
* [ ] Refresh Token

### Bugs and feedback

If you use Auth and come across any bugs or if you have any ideas about how to improve it please do open an issue or PM me in the Svelte Discord group.

### What's missing

Currently there is no implementation for "Forgotten Password" or "Reset Password" open to ideas!
