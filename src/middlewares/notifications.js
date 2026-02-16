export default function genNotifications(req, res, next) {
  res.locals.success = req.cookies.success || null;
  res.locals.error = req.cookies.error || null;

  if (req.cookies.success) {
    res.clearCookie('success');
  }

  if (req.cookies.error) {
    res.clearCookie('error');
  }

  next();
}
