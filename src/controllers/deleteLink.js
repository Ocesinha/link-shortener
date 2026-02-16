import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteLink(req, res) {
  const { id } = req.params;

  if (!req.user) {
    return res.cookie('error', 'Usuário não autenticado', { maxAge: 60000, httpOnly: true }).redirect('/login');
  }

  const userId = req.user;

  if (!id) {
    return res.cookie('error', 'ID do link não fornecido', { maxAge: 60000, httpOnly: true }).redirect('/');
  }

  try {
    const link = await prisma.link.findUnique({
      where: { id },
    });

    if (!link) {
      return res.cookie('error', 'Link não encontrado', { maxAge: 60000, httpOnly: true }).redirect('/');
    }

    if (link.userId !== userId) {
      return res.cookie('error', 'Você não tem permissão para deletar este link', { maxAge: 60000, httpOnly: true }).redirect('/');
    }

    await prisma.link.delete({
      where: { id },
    });

    return res.cookie('success', 'Link deletado com sucesso', { maxAge: 60000, httpOnly: true }).redirect('/');
  } catch (err) {
    console.log(err);
    return res.cookie('error', 'Erro ao deletar link', { maxAge: 60000, httpOnly: true }).redirect('/');
  }
}

export default deleteLink;
