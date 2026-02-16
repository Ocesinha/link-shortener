import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

export default async function shortenController(req, res) {
  const { url, alias } = req.body;
  const userId = req.user;

  if (!url) {
    return res.cookie('error', 'URL é obrigatória', { maxAge: 60000, httpOnly: true }).redirect('/');
  }
  try {
    if (alias) {
      const existingAlias = await prisma.link.findUnique({
        where: {
          shortUrl: alias,
        },
      });
      if (existingAlias) {
        return res.cookie('error', 'Essa URL já existe.', { maxAge: 60000, httpOnly: true }).redirect('/');
      }
    }
    const newUrl = alias || nanoid(6);
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        links: {
          create: {
            url,
            shortUrl: newUrl,
          },
        },
      },
    });
    return res.cookie('success', 'URL encurtada com sucesso!', { maxAge: 60000, httpOnly: true }).redirect('/');
  } catch (error) {
    console.log(error);
    return res.cookie('error', 'Erro ao encurtar URL', { maxAge: 60000, httpOnly: true }).redirect('/');
  }
}
