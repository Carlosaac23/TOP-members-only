export async function getHomepage(req, res) {
  res.render('index', { user: req.user });
}
