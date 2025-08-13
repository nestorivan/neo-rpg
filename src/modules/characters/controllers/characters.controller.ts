import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CharactersService } from "../services/characters.service";
import { CreateCharacterDto } from "../dto/createCharacter.dto";

@Controller("characters")
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  findAll() {
    return this.charactersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.charactersService.findOne(id);
  }

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    this.charactersService.create(createCharacterDto);
    return {
      message: "Character created successfully",
      data: createCharacterDto,
    };
  }
}
