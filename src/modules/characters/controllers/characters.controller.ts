import { Body, Controller, Get, Post, Query } from "@nestjs/common";

@Controller("characters")
export class CharactersController {
  @Get()
  getAll() {
    return "Hello World!";
  }

  @Get(":id")
  getOne(@Query("id") id: string) {
    return `Hello World! ${id}`;
  }

  @Post()
  create(@Body("name") name: string) {
    return `Hello World! ${name}`;
  }
}
