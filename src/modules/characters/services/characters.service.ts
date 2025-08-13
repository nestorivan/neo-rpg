import { Injectable } from "@nestjs/common";
import { CreateCharacterDto } from "../dto/createCharacter.dto";
import { JobType } from "src/common/types/jobs";

@Injectable()
export class CharactersService {
  private characters: CreateCharacterDto[] = [
    {
      id: 1,
      level: 1,
      name: "John Doe",
      job: JobType.Warrior,
    },
  ];
  findAll() {
    return this.characters;
  }

  findOne(id: number) {
    return this.characters.find((character) => character.id === id);
  }

  create(createCharacterDto: CreateCharacterDto) {
    return this.characters.push({
      ...createCharacterDto,
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
