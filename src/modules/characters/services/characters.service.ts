import { Injectable } from "@nestjs/common";
import { CreateCharacterDto } from "../dto/createCharacter.dto";

@Injectable()
export class CharactersService {
  private characters: CreateCharacterDto[] = [
    {
      id: 1,
      name: "John Doe",
      job: "Warrior",
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
}
