import openapiGlue from "fastify-openapi-glue";
import fastify from "fastify";
import { Service } from './service';
import { Security } from './security';
const localFile = (fileName: string) => new URL(fileName).pathname;
const app = fastify();

const options = {
  specification: localFile('./petstore-openapi.v3.yaml'),
  serviceHandlers: new Service(),
  securityHandlers: new Security(),
  prefix: "v1",
};

app.register(openapiGlue, options);

app.listen({ port: 3500 }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server is running on ${address}`);
});
