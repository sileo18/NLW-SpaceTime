import fastify, { FastifyInstance } from "fastify";
import cors from '@fastify/cors'
import { memoriesRoutes } from "./routes/memories";

const app = fastify();

app.register(cors, {
  origin: true,//Todas URLs de frontend poderão acessar nosso backend
})
app.register(memoriesRoutes);

app.listen({
  port: 3333,
}).then((address) => { 
  console.log(`Conectado em ${address}`); 
  console.log('🚀 HTTP server running on http://localhost:3333');
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
