import fastify from "fastify";
import swagger from "@fastify/swagger";
import cors from "@fastify/cors";
import fastifySession from "@fastify/secure-session";
import helmet from "@fastify/helmet";
import swaggerUI from "@fastify/swagger-ui";
import {FRONT_END_URL, HOST, PORT} from 'const';
import { readFileSync } from "fs";
import path from "path";


const app = fastify({ logger: true });

app.register(cors, {
  origin: [FRONT_END_URL],
  credentials: true,
});
app.get("/health-check", async (req, res) => {
  res.send("ok");
});

app.register(helmet);

app.register(swagger, {
  openapi: {
    info: {
      title: "APP API",
      description: "API documentation for APP Back end",
      version: "0.0.1",
    },
  },
});

app.register(swaggerUI, {
  routePrefix: "/docs",
  staticCSP: true,
  transformSpecificationClone: true,
});

app.register(fastifySession, {
  cookieName: "app-sessions",
  key: readFileSync(path.join(process.cwd(), "secret-key")),
  cookie: {
    path: "/",
    secure: true ,
    domain: FRONT_END_URL.includes("www") ? FRONT_END_URL.split("www")[1] : undefined,
    sameSite: "none",
    partitioned: true,
    httpOnly: true,
   
  },
});


const start = async () => {
  try {
    await app.listen({ port: Number(PORT || 3030), host: HOST }, (err, address) => {
      if (err) throw err;
      console.log(`🚀  Server listening on ${address}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
