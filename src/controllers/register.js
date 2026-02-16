import validator from 'validator';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

function renderRegister(req, res) {
  if (req.user) {
    return res.redirect('/');
  }
  return res.render('register');
}
async function register(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.cookie('error', 'Preencha todos os campos', { maxAge: 60000, httpOnly: true }).redirect('/register');
  }
  if (password.length < 6 || password.length > 50) {
    return res.cookie('error', 'Senha deve ter entre 6 e 50 caracteres', { maxAge: 60000, httpOnly: true }).redirect('/register');
  }
  if (name.length < 3 || name.length > 50) {
    return res.cookie('error', 'Nome deve ter entre 3 e 50 caracteres', { maxAge: 60000, httpOnly: true }).redirect('/register');
  }
  try {
    const emailExist = await prisma.user.findunique({ where: { email } });
    if (emailExist) {
      return res.cookie('error', 'E-mail já cadastrado', { maxAge: 60000, httpOnly: true }).redirect('/register');
    }
    const emailIsValid = validator.isEmail(email);
    if (!emailIsValid) {
      return res.cookie('error', 'E-mail inválido', { maxAge: 60000, httpOnly: true }).redirect('/register');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.cookie('success', 'Usuário registrado com sucesso', { maxAge: 60000, httpOnly: true }).redirect('/login');
  } catch (err) {
    console.log(err);
    return res.cookie('error', 'Erro ao registrar usuário', { maxAge: 60000, httpOnly: true }).redirect('/register');
  }
}

export { renderRegister, register };
