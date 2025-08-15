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
    try {
      return this.charactersService.findOne(characterId);
    } catch (error) {
      return {
        message: (error as Error).message,
        data: null,
      };
    }
  }

  @Post()
  @LogMethod()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    try {
      const createdCharacter =
        this.charactersService.create(createCharacterDto);

      return {
        message: "Character created successfully",
        data: createdCharacter,
      };
    } catch (error) {
      return {
        message: "Character creation failed",
        data: null,
      };
    }
  }

  @Patch(":id")
  @LogMethod()
  update(
    @Param("id") id: number,
    @Body() updateCharacterDto: CreateCharacterDto
  ) {
    try {
      const updatedCharacter = this.charactersService.update(
        id,
        updateCharacterDto
      );
      return {
        message: "Character updated successfully",
        data: updatedCharacter,
      };
    } catch (error) {
      return {
        message: "Character update failed",
        data: null,
      };
    }
  }
}
