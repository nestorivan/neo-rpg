import { Injectable } from "@nestjs/common";
import { CreateCharacterDto } from "../dto/createCharacter.dto";
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
      health: jobAttributes.hp,
      strength: jobAttributes.strength,
      dexterity: jobAttributes.dexterity,
      intelligence: jobAttributes.intelligence,
    };
  }

  findAll() {
    return this.characters;
  }

  findOne(id: number) {
    return this.characters.find((character) => character.id === id);
  }

  create(createCharacterDto: CreateCharacterDto) {
    if (this.verifyCharacterNameIsUnique(createCharacterDto.name)) {
      throw new Error("Character name already exists");
    }

    return this.characters.push({
      ...createCharacterDto,
      ...this.calculatePlayerInitialStats(createCharacterDto.job),
      id: this.characters.length + 1,
    });
  }

  update(id: number, updateCharacterDto: CreateCharacterDto) {
    const index = this.characters.findIndex((character) => character.id === id);
    this.characters[index] = {
      ...this.characters[index],
      ...updateCharacterDto,
    };
  }
}
