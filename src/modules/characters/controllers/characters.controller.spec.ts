import { Test, TestingModule } from "@nestjs/testing";
import { CharactersController } from "./characters.controller";
import { CharactersService } from "../services/characters.service";
import { CharacterDetails, CharacterDto } from "../dto/createCharacter.dto";
import { JobType } from "@src/common/types/jobs";

const mockedCharacter: CharacterDetails = {
  id: 1,
  name: "Test Character",
  job: JobType.Warrior,
} as CharacterDetails;

describe("CharactersController", () => {
  let controller: CharactersController;

  const mockCharactersService = {
    findAll: jest.fn(() => [mockedCharacter]),
    findOne: jest.fn(() => mockedCharacter),
    create: jest.fn((dto) => ({ ...dto, id: 1 }) as CharacterDto),
    update: jest.fn((id: number, dto) => ({ ...dto, id }) as CharacterDto),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharactersController],
      providers: [CharactersService],
    })
      .overrideProvider(CharactersService)
      .useValue(mockCharactersService)
      .compile();

    controller = module.get<CharactersController>(CharactersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should return an array of characters", () => {
      const characters = controller.findAll();
      expect(characters).toBeInstanceOf(Array);
      expect(characters).toEqual([mockedCharacter]);
    });

    it("should return an empty array if no characters found", () => {
      mockCharactersService.findAll.mockImplementationOnce(() => []);
      const characters = controller.findAll();
      expect(characters).toBeInstanceOf(Array);
      expect(characters).toEqual([]);
    });
  });

  describe("findOne", () => {
    it("should return a character", () => {
      const character = controller.findOne(1);
      expect(character).toEqual(mockedCharacter);
      expect(mockCharactersService.findOne).toHaveBeenCalledWith(1);
    });

    it("should throw an error if character not found", () => {
      mockCharactersService.findOne.mockImplementationOnce(() => {
        throw new Error("Character not found");
      });

      const { message, data } = controller.findOne(1);

      expect(mockCharactersService.findOne).toHaveBeenCalledWith(1);
      expect(message).toBe("Character not found");
      expect(data).toBeNull();
    });
  });

  describe("create", () => {
    it("should create a character", () => {
      const createCharacterDto = {
        name: "Test Character",
        job: JobType.Warrior,
      };
      const { message, data } = controller.create(createCharacterDto);
      expect(message).toBe("Character created successfully");
      expect(data).toEqual({ ...createCharacterDto, id: 1 });
      expect(mockCharactersService.create).toHaveBeenCalledWith(
        createCharacterDto
      );
    });

    it("should throw an error if character name already exists", () => {
      mockCharactersService.create.mockImplementationOnce(() => {
        throw new Error("Character name already exists");
      });
      const createCharacterDto = {
        name: "Test Character",
        job: JobType.Warrior,
      };
      const { message, data } = controller.create(createCharacterDto);
      expect(message).toBe("Character creation failed");
      expect(data).toBeNull();
    });

    it("should throw an error if character name is invalid", () => {
      mockCharactersService.create.mockImplementationOnce(() => {
        throw new Error("Character name already exists");
      });

      const createCharacterDto = {
        name: "1234",
        job: JobType.Warrior,
      };

      const { message, data } = controller.create(createCharacterDto);
      expect(message).toBe("Character creation failed");
      expect(data).toBeNull();
    });

    it("should throw an error if job is invalid", () => {
      mockCharactersService.create.mockImplementationOnce(() => {
        throw new Error();
      });
      const createCharacterDto = {
        name: "Test Character",
        job: "invalid_job" as JobType,
      };

      const { message, data } = controller.create(createCharacterDto);
      expect(message).toBe("Character creation failed");
      expect(data).toBeNull();
    });
  });

  describe("update", () => {
    it("should update a character", () => {
      const character = controller.findOne(1);
      expect(character).toEqual(mockedCharacter);

      const updateCharacterDto = {
        ...character,
        name: "Updated Character",
        job: JobType.Thief,
      };
      const { message, data } = controller.update(1, updateCharacterDto);
      expect(message).toBe("Character updated successfully");
      expect(data).toEqual({ ...updateCharacterDto });
      expect(mockCharactersService.update).toHaveBeenCalledWith(
        1,
        updateCharacterDto
      );
    });

    it("should throw an error if character not found", () => {
      mockCharactersService.update.mockImplementationOnce(() => {
        throw new Error("Character not found");
      });

      const updateCharacterDto = {
        ...mockedCharacter,
        name: "Updated Character",
        job: JobType.Thief,
      };
      const { message, data } = controller.update(1, updateCharacterDto);
      expect(message).toBe("Character update failed");
      expect(data).toBeNull();
    });
  });
});
