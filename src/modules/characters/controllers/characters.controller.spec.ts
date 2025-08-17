import { Test, TestingModule } from "@nestjs/testing";
import { CharactersController } from "./characters.controller";
import { CharactersService } from "../services/characters.service";
import { CharacterDetails, CharacterDto } from "../dto/createCharacter.dto";
import { JobType } from "@src/common/types/jobs";
import { HttpException, HttpStatus } from "@nestjs/common";

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
        throw new HttpException(
          `Character with id 1 not found`,
          HttpStatus.NOT_FOUND
        );
      });

      try {
        controller.findOne(1);
      } catch (error) {
        expect(error as HttpException).toBeInstanceOf(HttpException);
        expect((error as HttpException).message).toBe(
          "Character with id 1 not found"
        );
        expect((error as HttpException).getStatus()).toBe(HttpStatus.NOT_FOUND);
        expect(mockCharactersService.findOne).toHaveBeenCalledWith(1);
      }
    });
  });

  describe("create", () => {
    it("should create a character", () => {
      const createCharacterDto = {
        name: "Test Character",
        job: JobType.Warrior,
      };
      const result = controller.create(createCharacterDto);
      expect(result).toStrictEqual({
        ...createCharacterDto,
        id: 1,
      });
      expect(mockCharactersService.create).toHaveBeenCalledWith(
        createCharacterDto
      );
    });

    it("should throw an error if character name already exists", () => {
      mockCharactersService.create.mockImplementationOnce(() => {
        throw new HttpException(
          "Character name already exists",
          HttpStatus.CONFLICT
        );
      });
      const createCharacterDto = {
        name: "Test Character",
        job: JobType.Warrior,
      };
      try {
        controller.create(createCharacterDto);
      } catch (error) {
        expect(error as HttpException).toBeInstanceOf(HttpException);
        expect((error as HttpException).message).toBe(
          "Character name already exists"
        );
        expect((error as HttpException).getStatus()).toBe(HttpStatus.CONFLICT);
      }
    });

    it("should throw an error if character name is invalid", () => {
      mockCharactersService.create.mockImplementationOnce(() => {
        throw new HttpException(
          "Invalid character creation request",
          HttpStatus.BAD_REQUEST
        );
      });
      const createCharacterDto = {
        name: "",
        job: JobType.Warrior,
      };
      try {
        controller.create(createCharacterDto);
      } catch (error) {
        expect(error as HttpException).toBeInstanceOf(HttpException);
        expect((error as HttpException).message).toBe(
          "Invalid character creation request"
        );
        expect((error as HttpException).getStatus()).toBe(
          HttpStatus.BAD_REQUEST
        );
      }
    });

    it("should throw an error if job is invalid", () => {
      mockCharactersService.create.mockImplementationOnce(() => {
        throw new HttpException(
          "Invalid character creation request",
          HttpStatus.BAD_REQUEST
        );
      });
      const createCharacterDto = {
        name: "Test Character",
        job: "invalid_job" as JobType,
      };
      try {
        controller.create(createCharacterDto);
      } catch (error) {
        expect(error as HttpException).toBeInstanceOf(HttpException);
        expect((error as HttpException).message).toBe(
          "Invalid character creation request"
        );
        expect((error as HttpException).getStatus()).toBe(
          HttpStatus.BAD_REQUEST
        );
      }
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
        level: 1,
      };
      const result = controller.update(1, updateCharacterDto);
      expect(result).toEqual({ ...updateCharacterDto });
      expect(mockCharactersService.update).toHaveBeenCalledWith(
        1,
        updateCharacterDto
      );
    });

    it("should throw an error if character not found", () => {
      mockCharactersService.update.mockImplementationOnce(() => {
        throw new HttpException(
          `Character with id 1 not found`,
          HttpStatus.NOT_FOUND
        );
      });

      const updateCharacterDto = {
        ...mockedCharacter,
        name: "Updated Character",
        job: JobType.Thief,
        level: 1,
      };
      try {
        controller.update(1, updateCharacterDto);
      } catch (error) {
        expect(error as HttpException).toBeInstanceOf(HttpException);
        expect((error as HttpException).message).toBe(
          "Character with id 1 not found"
        );
        expect((error as HttpException).getStatus()).toBe(HttpStatus.NOT_FOUND);
        expect(mockCharactersService.update).toHaveBeenCalledWith(
          1,
          updateCharacterDto
        );
      }
    });
  });
});
