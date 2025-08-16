import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import {
  CreateCharacterDto,
  CharacterByIdSchema,
} from "../dto/createCharacter.dto";
import { ZodValidationPipe } from "nestjs-zod";
import { CharactersService } from "../services/characters.service";
import { LogMethod } from "@src/common/decorators/logMethod.decorator";

@Controller("characters")
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  @LogMethod()
  findAll() {
    return this.charactersService.findAll();
  }

  @Get(":id")
  @LogMethod()
  findOne(
    @Param("id", ParseIntPipe, new ZodValidationPipe(CharacterByIdSchema))
    characterId: number
  ) {
    return this.charactersService.findOne(characterId);
  }

  @Post()
  @LogMethod()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(createCharacterDto);
  }

  @Patch(":id")
  @LogMethod()
  update(
    @Param("id") id: number,
    @Body() updateCharacterDto: CreateCharacterDto
  ) {
    return this.charactersService.update(id, updateCharacterDto);
  }
}
