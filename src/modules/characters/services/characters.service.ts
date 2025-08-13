import { Injectable } from "@nestjs/common";

@Injectable()
export class CharactersService {
  private characters = [
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
}
