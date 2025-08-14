import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { VersioningType } from "@nestjs/common";
import { patchNestJsSwagger } from "nestjs-zod";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  });

  const config = new DocumentBuilder()
    .setTitle("Neo RPG API")
    .setDescription("API for Neo RPG")
    .setVersion("1.0")
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  patchNestJsSwagger();
  SwaggerModule.setup("api", app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
