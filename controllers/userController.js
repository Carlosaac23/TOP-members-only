import { getUsers } from '../db/userQueries.js';
import { createUser, getUser } from '../services/userService.js';
import { userRowSchema, createUserInputSchema, userListSchema } from '../schemas/userSchema.js';
import passport from 'passport';

export async function getHome(req, res) {
  const users = await getUsers();
  const validatedUsers = userListSchema.safeParse(users);

  if (!validatedUsers.success) {
    return res.status(400).json({ errors: validatedUsers.error });
  }

  res.json(validatedUsers.data);
}

export function getRegister(req, res) {
  const registerForm = `
    <h1>Register</h1>
    <form method="POST" action="add">
      <label>First name</label>
      <input type="text" name="name" />

      <label>Last name</label>
      <input type="text" name="lastName" />

      <label>Email</label>
      <input type="email" name="email" />

      <label>Username</label>
      <input type="text" name="username" />

      <label>Password</label>
      <input type="password" name="password" />

      <button type="submit">Register</button>
    </form>
  `;

  res.send(registerForm);
}

export async function postRegister(req, res) {
  console.log('Data from controller/body:', req.body);
  const user = {
    first_name: req.body.name,
    last_name: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password_hash: req.body.password,
  };
  console.log('new user:', user);
  const validatedUser = createUserInputSchema.parse(user);
  await createUser(validatedUser);
  res.redirect('/users/login');
}

export function loginPage(req, res) {
  const loginForm = `
    <h1>Login</h1>
    <form method="POST" action="/users/login">
      <label>Username</label>
      <input type="text" name="username" />
      <label>Password</label>
      <input type="password" name="password" />
      <button type="submit">Login</button>
    </form>
  `;

  res.send(loginForm);
}

export const login = passport.authenticate('local', {
  failureRedirect: '/users/login-failure',
  successRedirect: '/users/login-success',
});

export function loginFailure(req, res) {
  res.send('You entered the wrong password.');
}

export function loginSuccess(req, res) {
  res.send(
    `<p>You successfully logged in. --> <a href="/users/protected-route">Go to protected route</a></p>
     <p>You successfully logged in. --> <a href="/admin-route">Go to admin route</a></p>
    `
  );
}

export async function getUserController(req, res) {
  const { userId } = req.params;
  const user = await getUser(userId);
  const validatedUser = userRowSchema.parse(user);
  res.status(201).json(validatedUser);
}

export function protectedRoute(req, res) {
  res.send('You made it to the route.');
}

export function logout(req, res) {
  req.logout(error => {
    if (error) return res.status(500).send('Logout failed');
    res.redirect('/users/login');
  });
}
