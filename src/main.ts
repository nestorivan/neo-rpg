import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { VersioningType } from "@nestjs/common";
import { patchNestJsSwagger } from "nestjs-zod";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ResponseInterceptor } from "./common/interceptors/responseInterceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // we enable versioning via URI
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  });

  // we create a swagger document
  const config = new DocumentBuilder()
    .setTitle("Neo RPG API")
    .setDescription("API for Neo RPG")
    .setVersion("1.0")
    .build();

  // we create a swagger document factory
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  patchNestJsSwagger();
  // we setup the swagger module, app is the default url segment
  SwaggerModule.setup("api", app, documentFactory);

  // Global interceptor to wrap success responses in a normalized format
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
