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
  CharacterDto,
} from "../dto/createCharacter.dto";
import { ZodValidationPipe } from "nestjs-zod";
import { CharactersService } from "../services/characters.service";
import { LogMethod } from "@src/common/decorators/logMethod.decorator";
import { ApiBody, ApiOperation, ApiQuery } from "@nestjs/swagger";

@Controller("characters")
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  @ApiOperation({
    summary: "Retrieve all characters",
    description:
      "Fetches and returns a list of all available characters in the system.",
  })
  @LogMethod()
  findAll() {
    return this.charactersService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a character by ID",
    description:
      "Retrieves a single character by its unique ID. Returns character details if found.",
  })
  @ApiQuery({ name: "id", required: true, type: Number })
  @LogMethod()
  findOne(
    @Param("id", ParseIntPipe, new ZodValidationPipe(CharacterByIdSchema))
    characterId: number
  ) {
    return this.charactersService.findOne(characterId);
  }

  @Post()
  @ApiOperation({
    summary: "Create a new character",
    description:
      "Creates a new character with the provided details. Requires a name and job type in the request body.",
  })
  @ApiBody({ type: CreateCharacterDto })
  @LogMethod()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(createCharacterDto);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update an existing character",
    description:
      "Updates the details of an existing character based on the provided ID. Allows updating fields such as name and job type.",
  })
  @ApiBody({ type: CharacterDto })
  @LogMethod()
  update(@Param("id") id: number, @Body() updateCharacterDto: CharacterDto) {
    return this.charactersService.update(id, updateCharacterDto);
  }
}
