import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';

import { poolRoutes } from './routes/pool.routes';
import { userRoutes } from './routes/user.routes';
import { guessRoutes } from './routes/guess.routes';
import { authRoutes } from './routes/auth.routes';
import { gameRoutes } from './routes/game.routes';

async function bootstrap() {
  const fastify = Fastify({
    logger: true
  });

  await fastify.register(cors, {
    origin: true
  });
  
  await fastify.register(jwt, {
    secret: 'secret_nlw_copa'
  });

  await fastify.register(poolRoutes);
  await fastify.register(userRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(authRoutes);
  await fastify.register(gameRoutes);
  

  await fastify.listen({
    port: 3333,
    host: '0.0.0.0'
  });
}

bootstrap();