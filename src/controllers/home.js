import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function homeController(req, res) {
  let links = [];

  if (req.user) {
    links = await prisma.link.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  return res.render('index', { links });
}

export default homeController;
