import jwt from 'jsonwebtoken';

async function auth(req, res, next) {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.clearCookie('token');
      return res.cookie('error', 'Você precisa estar logado para acessar esta página', { maxAge: 60000, httpOnly: true }).redirect('/login');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    res.locals.user = decoded.id;
    next();
  } catch (err) {
    res.clearCookie('token');
    console.log(err);
    return res.cookie('error', 'Erro ao acessar essa página', { maxAge: 60000, httpOnly: true }).redirect('/');
  }
}

export default auth;
