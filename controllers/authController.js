import passport from 'passport';

import { createUserInputSchema } from '../schemas/userSchema.js';
import { createUser } from '../services/userService.js';

export function loginFormController(req, res) {
  res.render('forms/loginForm', { user: req.user });
}

export const loginController = passport.authenticate('local', {
  failureRedirect: '/login-failure',
  successRedirect: '/users',
});

export function logoutController(req, res) {
  req.logout(error => {
    if (error) return res.status(500).send('Logout failed');

    res.redirect('/login');
  });
}

export function registerFormController(req, res) {
  res.render('forms/registerForm', { user: req.user, errors: [], formData: {} });
}

export async function registerController(req, res) {
  try {
    const newUser = {
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password_hash: req.body.password,
      confirm_password: req.body.confirmPassword,
    };

    const validatedUser = createUserInputSchema.safeParse(newUser);

    if (!validatedUser.success) {
      return res.status(400).render('forms/registerForm', {
        user: req.user,
        errors: validatedUser.error.issues,
        formData: req.body,
      });
    }

    await createUser(validatedUser.data);

    res.redirect('/login');
  } catch (error) {
    console.error(error);
  }
}

export function loginFailure(req, res) {
  res.send('You entered the wrong password.');
}
