import passport from 'passport';

import { createUserInputSchema } from '../schemas/userSchema.js';
import { createUser } from '../services/userService.js';

export function loginFormController(req, res) {
  res.render('forms/loginForm');
}

export const loginController = passport.authenticate('local', {
  failureRedirect: '/login-failure',
  successRedirect: '/login-success',
});

export function logoutController(req, res) {
  req.logout(error => {
    if (error) return res.status(500).send('Logout failed');

    res.redirect('/login');
  });
}

export function registerFormController(req, res) {
  res.render('forms/registerForm');
}

export async function registerController(req, res) {
  try {
    const newUser = {
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password_hash: req.body.password,
    };

    const validatedUser = createUserInputSchema.parse(newUser);
    await createUser(validatedUser);

    res.redirect('/login');
  } catch (error) {
    console.error(error);
  }
}

export function loginFailure(req, res) {
  res.send('You entered the wrong password.');
}

export function loginSuccess(req, res) {
  res.send(
    `<p>You successfully logged in. --> <a href="/users/protected-route">Go to protected route</a></p>
     <p>You successfully logged in. --> <a href="/admin-route">Go to admin route</a></p>
     <p>You successfully logged in. --> <a href="/messages">Create a message</a></p>
     <p> <a href="/logout">Logout</a> </p>
    `
  );
}
