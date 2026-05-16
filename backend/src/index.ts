import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import prisma from './lib/prisma';

dotenv.config();

const app = Fastify({ logger: true });

async function start() {
  await app.register(cors, {
    origin: true,
    credentials: true,
  });

  app.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  app.get('/db-test', async () => {
    const userCount = await prisma.user.count();
    return { userCount };
  });

  const port = Number(process.env.PORT) || 3001;
  try {
    await app.listen({ port, host: '0.0.0.0' });
    console.log(`Server running on port ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
