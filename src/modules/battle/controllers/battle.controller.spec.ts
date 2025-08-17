import { Test, TestingModule } from "@nestjs/testing";
import { BattleController } from "./battle.controller";
import { BattleService } from "../services/battle.service";
import { BattleResults } from "../models/battle";

const mockBattleResult: BattleResults = {
  battleId: "43bc377c-8d39-49a3-9cfb-ad7cdd003f0d",
  winner: {
    id: 1,
    name: "warriorman",
  },
  loser: {
    id: 2,
    name: "thiefman",
  },
  logs: [
    "Battle between warriorman (Warrior) - 20 HP and thiefman (Thief) - 15 HP begins!",
    "thiefman 4 speed was faster than warriorman 0 speed and will begin this round.",
    "thiefman attacks warriorman for 4, warriorman has 16 HP remaining.",
    "warriorman attacks thiefman for 6, thiefman has 9 HP remaining.",
    "thiefman 6 speed was faster than warriorman 2 speed and will begin this round.",
    "thiefman attacks warriorman for 3, warriorman has 13 HP remaining.",
    "warriorman attacks thiefman for 8, thiefman has 1 HP remaining.",
    "thiefman 4 speed was faster than warriorman 1 speed and will begin this round.",
    "thiefman attacks warriorman for 5, warriorman has 8 HP remaining.",
    "warriorman wins the battle! warriorman still has 8 HP remaining!",
  ],
};

describe("BattleController", () => {
  let controller: BattleController;

  const mockBattleService = {
    create: jest.fn(() => mockBattleResult),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BattleController],
      providers: [BattleService],
    })
      .overrideProvider(BattleService)
      .useValue(mockBattleService)
      .compile();

    controller = module.get<BattleController>(BattleController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create a battle", () => {
      const createBattleDto = {
        characterId: 1,
        opponentId: 2,
      };
      const result = controller.create(createBattleDto);
      expect(result).toEqual(mockBattleResult);
      expect(mockBattleService.create).toHaveBeenCalledWith(createBattleDto);
    });
  });
});
