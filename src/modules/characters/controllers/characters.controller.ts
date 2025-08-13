import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
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
  findOne(@Param("id", ParseIntPipe) id: number) {
    try {
      return this.charactersService.findOne(id);
    } catch (error) {
      return {
        message: "Character not found",
        data: error.message,
      };
    }
  }

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    try {
      this.charactersService.create(createCharacterDto);
    } catch (error) {
      return {
        message: "Character creation failed",
        data: error.message,
      };
    }
    return {
      message: "Character created successfully",
      data: createCharacterDto,
    };
  }

  @Patch(":id")
  update(
    @Param("id") id: number,
    @Body() updateCharacterDto: CreateCharacterDto
  ) {
    this.charactersService.update(id, updateCharacterDto);
    return {
      message: "Character updated successfully",
      data: updateCharacterDto,
    };
  }
}
