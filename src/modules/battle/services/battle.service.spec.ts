import { Test, TestingModule } from "@nestjs/testing";
import { BattleService } from "./battle.service";
import { CharactersService } from "@src/modules/characters/services/characters.service";

describe("BattleService", () => {
  let service: BattleService;

  const mockCharacterService = {
    findOne: jest.fn((id: number) => ({
      id,
      name: "Test Character",
      job: "warrior",
    })),
    update: jest.fn((id, character) => ({ ...character, id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BattleService, CharactersService],
    })
      .overrideProvider(CharactersService)
      .useValue(mockCharacterService)
      .compile();

    service = module.get<BattleService>(BattleService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
