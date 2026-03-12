import { getMessages, getMessagesFromUser } from '../db/messageQueries.js';
import { activateMembership, getMemberUsers } from '../db/userQueries.js';

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

export async function userMembersController(req, res) {
  try {
    const members = await getMemberUsers();

    if (!members) {
      return res.status(401).json({ msg: 'Error getting admin users' });
    }

    res.render('user/members', { user: req.user, members });
  } catch (error) {
    console.error(error);
  }
}

export function protectedRoute(req, res) {
  res.send('You made it to the route.');
}
