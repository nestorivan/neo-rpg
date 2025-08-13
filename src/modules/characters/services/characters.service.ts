import { Injectable } from "@nestjs/common";
import {
  CharacterDetailsDto,
  CharacterListItemDto,
  CreateCharacterDto,
} from "../dto/createCharacter.dto";
import { JobType } from "src/common/types/jobs";
import { JobsService } from "src/modules/jobs/services/jobs.service";

@Injectable()
export class CharactersService {
  constructor(private jobService: JobsService) {}

  private characters: CreateCharacterDto[] = [];

  private verifyCharacterNameIsUnique(name: string) {
    return this.characters.some((character) => character.name === name);
  }

  private calculatePlayerInitialStats(job: JobType) {
    const jobAttributes = this.jobService.getJobAttributes(job);
    return {
      hp: jobAttributes.hp,
      strength: jobAttributes.strength,
      dexterity: jobAttributes.dexterity,
      intelligence: jobAttributes.intelligence,
    };
  }

  findAll() {
    return this.characters.map((character) =>
      CharacterListItemDto.schema.parse(character)
    );
  }

  findOne(id: number) {
    const character = this.characters.find((character) => character.id === id);

    if (!character) {
      throw new Error("Character not found");
    }

    const jobAttributes = this.jobService.getJobAttributes(character.job);
    const parsedCharacter = CharacterDetailsDto.schema.parse({
      ...character,
      attackModifier: Object.fromEntries(jobAttributes.attackModifier),
      speedModifier: Object.fromEntries(jobAttributes.speedModifier),
    });

    return parsedCharacter;
  }

  create(createCharacterDto: CreateCharacterDto) {
    if (this.verifyCharacterNameIsUnique(createCharacterDto.name)) {
      throw new Error("Character name already exists");
    }

    const newCharacter = CreateCharacterDto.schema.parse({
      ...createCharacterDto,
      ...this.calculatePlayerInitialStats(createCharacterDto.job),
      id: this.characters.length + 1,
    });

    return this.characters.push(newCharacter);
  }

  update(id: number, updateCharacterDto: CreateCharacterDto) {
    const index = this.characters.findIndex((character) => character.id === id);
    this.characters[index] = {
      ...this.characters[index],
      ...updateCharacterDto,
    };
  }
}
