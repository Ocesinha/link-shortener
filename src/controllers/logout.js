function logoutController(req, res) {
  res.clearCookie('token');
  res.cookie('success', 'Logout realizado com sucesso', { maxAge: 60000, httpOnly: true });
  return res.redirect('/');
}

export default logoutController;
