// import { getUsers } from '../db/userQueries.js';
// import { userRowSchema, userListSchema } from '../schemas/userSchema.js';
// import { getUser } from '../services/userService.js';
import { getMessages, getMessagesFromUser } from '../db/messageQueries.js';
import { activateMembership } from '../db/userQueries.js';

export async function userHomeFeedController(req, res) {
  const messages = await getMessages();

  res.render('user/home', { user: req.user, messages });
}

export async function userProfileController(req, res) {
  const { user } = req;
  const messages = await getMessagesFromUser(user.id);

  res.render('user/profile', { user: req.user, messagesList: messages });
}

export async function userMembershipController(req, res) {
  res.render('user/membership', { user: req.user, error: '' });
}

export async function userActivateMembershipController(req, res) {
  const { user } = req;

  if (req.body.passcode === process.env.MEMBERSHIP_PASSCODE) {
    await activateMembership(user.id);
    res.redirect('/users/profile');
  } else {
    res.render('user/membership', { user: req.user, error: 'You entered a wrong passcode!' });
  }
}

export function protectedRoute(req, res) {
  res.send('You made it to the route.');
}
