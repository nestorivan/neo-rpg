import { Test, TestingModule } from "@nestjs/testing";
import { BattleController } from "./battle.controller";
import { BattleService } from "../services/battle.service";

describe("BattleController", () => {
  let controller: BattleController;

  const mockBattleService = {
    create: jest.fn(() => ({
      id: "123",
      logs: ["log1", "log2"],
    })),
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
      const battle = controller.create(createBattleDto);
      expect(battle).toEqual({
        message: "Battle created successfully",
        data: {
          id: "123",
          logs: ["log1", "log2"],
        },
      });
      expect(mockBattleService.create).toHaveBeenCalledWith(createBattleDto);
    });
  });
});
