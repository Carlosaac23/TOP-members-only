import { getUsers } from '../db/userQueries.js';
import { userRowSchema, userListSchema } from '../schemas/userSchema.js';
import { getUser } from '../services/userService.js';

export async function getHome(req, res) {
  const users = await getUsers();
  const validatedUsers = userListSchema.safeParse(users);

  if (!validatedUsers.success) {
    return res.status(400).json({ errors: validatedUsers.error });
  }

  res.json(validatedUsers.data);
}

export function loginFailure(req, res) {
  res.send('You entered the wrong password.');
}

export function loginSuccess(req, res) {
  res.send(
    `<p>You successfully logged in. --> <a href="/users/protected-route">Go to protected route</a></p>
     <p>You successfully logged in. --> <a href="/admin-route">Go to admin route</a></p>
     <p> <a href="/logout">Logout</a> </p>
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
