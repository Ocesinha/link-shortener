import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function linkController(req, res) {
  const { shortenurl } = req.params;
  if (!shortenurl) {
    return res.cookie('error', 'URL não encontrada', { maxAge: 60000, httpOnly: true }).redirect('/');
  }
  try {
    const link = await prisma.link.findUnique({
      where: {
        shortUrl: shortenurl,
      },
    });
    if (!link) {
      return res.cookie('error', 'URL não encontrada', { maxAge: 60000, httpOnly: true }).redirect('/');
    }
    const clicks = link.clicks + 1;
    await prisma.link.update({
      where: {
        id: link.id,
      },
      data: {
        clicks,
      },
    });
    return res.redirect(link.url);
  } catch (err) {
    console.log(err);
    return res.cookie('error', 'Erro ao redirecionar', { maxAge: 60000, httpOnly: true }).redirect('/');
  }
}
