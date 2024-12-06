import { FastifyInstance } from "fastify";
import { $ref } from "./[FTName].schema";

const tags = ["[FTName]"];

export async function [FTName]Routes(fastify: FastifyInstance) {
  fastify.get(
    "/",
    {
      schema: {
        // querystring: $ref("streetsInputSchema"),
        tags,
        response: {
          //  200: $ref("streetsResponseSchema"),
        },
      },
    }
    //getStreetsInCityHandler
  );
}
