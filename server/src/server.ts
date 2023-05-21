import 'dotenv/config'
import fastify, { FastifyInstance } from "fastify";
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { memoriesRoutes } from "./routes/memories";
import { authRoutes } from './routes/auth';

const app = fastify();

app.register(cors, {
  origin: true,//Todas URLs de frontend poderão acessar nosso backend
})

app.register(jwt, {
  secret:'spacetime',
})
app.register(authRoutes)
app.register(memoriesRoutes);

app.listen({
  port: 3333,
  host: '0.0.0.0',
}).then((address) => { 
  console.log(`Conectado em ${address}`); 
  console.log('🚀 HTTP server running on http://localhost:3333');
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
