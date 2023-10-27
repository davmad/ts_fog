import fastify, { FastifyPluginCallback } from "fastify";
import { Service } from './service';
import path from 'path';
import { Security } from './security';
import { dynamicImport } from 'tsimportlib';

const app = fastify();
const port = parseInt(process.env.PORT ?? '3500');
const fastifyPluginOpenapiGlueName = 'fastify-openapi-glue';
const yamlFileName = 'petstore-openapi.v3.yaml';

const main = async () => {
  const openapiGlue: FastifyPluginCallback = await dynamicImport(fastifyPluginOpenapiGlueName, module);
  const options = {
    specification: path.join(__dirname, yamlFileName),
    serviceHandlers: new Service(),
    // operationResolver: operationResolver,
    securityHandlers: new Security(),
    prefix: "v1",
  };
  
  app.register(openapiGlue, options);

  app.setErrorHandler(function (error: any, _request: any, reply: any) {
    if (error.code == 'FST_ERR_VALIDATION') {
      // @TODO: Log error
      reply.status(error.statusCode).send({ message: 'Bad Request', error: error.message });
    } else {
      // @TODO: Log error
      reply.send(error)
    }
  })
  
  app.listen({ port }, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server is running on ${address}`);
  });  
};

main().catch(console.error);

