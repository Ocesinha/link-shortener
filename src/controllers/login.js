import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

function loginController(req, res) {
  if (req.user) {
    return res.redirect('/');
  }
  return res.render('login');
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.cookie('error', 'Preencha todos os campos', { maxAge: 60000, httpOnly: true }).redirect('/login');
  }
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.cookie('error', 'E-mail ou senha inválidos', { maxAge: 60000, httpOnly: true }).redirect('/login');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.cookie('error', 'E-mail ou senha inválidos', { maxAge: 60000, httpOnly: true }).redirect('/login');
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { maxAge: 604800000, httpOnly: true });
    return res.redirect('/');
  } catch (err) {
    console.log(err);
    return res.cookie('error', 'Erro ao fazer login', { maxAge: 60000, httpOnly: true }).redirect('/login');
  }
}

export { loginController, login };
