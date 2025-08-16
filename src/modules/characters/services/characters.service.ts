import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {
  CharacterDetailsDto,
  CharacterListItemDto,
  CreateCharacterDto,
  CharacterDto,
  CharacterDetails,
  Character,
  CreateCharacter,
} from "../dto/createCharacter.dto";
import { JobType } from "@src/common/types/jobs";
import { JobsService } from "@src/modules/jobs/services/jobs.service";
import { z } from "zod";
import { JobDescription } from "@src/modules/jobs/models/jobDescription";

@Injectable()
export class CharactersService {
  constructor(private readonly jobService: JobsService) {}

  private characters: CharacterDto[] = [];

  private verifyCharacterNameIsUnique(name: string) {
    const isNotUnique = this.characters.some(
      (character) => character.name === name
    );

    if (isNotUnique) {
      throw new HttpException(
        "Character name already exists",
        HttpStatus.CONFLICT
      );
    }
    return isNotUnique;
  }

  private verifyCharacterJobIsValid(job: JobType) {
    const isValid = z.nativeEnum(JobType).safeParse(job).success;

    if (!isValid) {
      throw new HttpException(
        "Invalid character job type, available options are: Warrior, Thief, Mage",
        HttpStatus.BAD_REQUEST
      );
    }
    return isValid;
  }

  private calculatePlayerInitialStats(
    job: JobType
  ): Omit<JobDescription, "attackModifier" | "speedModifier"> {
    const jobAttributes = this.jobService.getJobAttributes(job);
    return {
      hp: jobAttributes.hp,
      strength: jobAttributes.strength,
      dexterity: jobAttributes.dexterity,
      intelligence: jobAttributes.intelligence,
    };
  }

  private getCharacterById(id: number): Character {
    const character = this.characters.find((character) => character.id === id);
    if (!character) {
      throw new HttpException(
        `Character with id ${id} not found`,
        HttpStatus.NOT_FOUND
      );
    }
    return character;
  }

  findAll(): CharacterListItemDto[] {
    try {
      return this.characters.map((character) =>
        CharacterListItemDto.schema.parse(character)
      );
    } catch (error) {
      throw new HttpException((error as Error).message, HttpStatus.BAD_REQUEST);
    }
  }

  findOne(id: number): CharacterDetails {
    const character = this.getCharacterById(id);

    const jobAttributes = this.jobService.getJobAttributes(character.job);
    try {
      const parsedCharacter = CharacterDetailsDto.schema.parse({
        ...character,
        attackModifier: Array.from(
          jobAttributes.attackModifier,
          ([key, value]) => ({ key, value })
        ),
        speedModifier: Array.from(
          jobAttributes.speedModifier,
          ([key, value]) => ({ key, value })
        ),
      });

      return parsedCharacter;
    } catch (error) {
      throw new HttpException((error as Error).message, HttpStatus.BAD_REQUEST);
    }
  }

  create(createCharacterDto: CreateCharacter): CharacterDto {
    try {
      this.verifyCharacterNameIsUnique(createCharacterDto.name);

      this.verifyCharacterJobIsValid(createCharacterDto.job);

      const jobStats = this.calculatePlayerInitialStats(createCharacterDto.job);

      const newCharacter = CharacterDto.schema.parse({
        ...createCharacterDto,
        ...jobStats,
        currentHp: jobStats.hp,
        id: this.characters.length + 1,
      });

      this.characters.push(newCharacter);

      return newCharacter;
    } catch (error) {
      throw new HttpException((error as Error).message, HttpStatus.BAD_REQUEST);
    }
  }

  update(id: number, updateCharacterDto: CreateCharacterDto): CharacterDto {
    try {
      const character = this.getCharacterById(id);

      const index = this.characters.findIndex(
        (character) => character.id === id
      );

      this.characters[index] = {
        ...character,
        ...updateCharacterDto,
      };

      return CharacterDto.schema.parse({
        ...this.characters[index],
      });
    } catch (error) {
      throw new HttpException((error as Error).message, HttpStatus.BAD_REQUEST);
    }
  }
}
