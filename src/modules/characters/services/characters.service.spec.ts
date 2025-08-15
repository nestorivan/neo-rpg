import { Test, TestingModule } from "@nestjs/testing";
import { CharactersService } from "./characters.service";
import { JobsService } from "@src/modules/jobs/services/jobs.service";
import { CharacterDto } from "../dto/createCharacter.dto";
import { JobType } from "@src/common/types/jobs";
import { JobsTable } from "@src/modules/jobs/constants/jobsStats";

const mockedCharacter = {
  id: 1,
  name: "fakeman",
  job: JobType.Thief,
  alive: true,
  hp: 15,
  currentHp: 15,
  strength: 4,
  dexterity: 10,
  intelligence: 4,
} as CharacterDto;

describe("CharactersService", () => {
  let service: CharactersService;

  const mockJobsService = {
    getJobAttributes: jest.fn((job: JobType) => JobsTable[job]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharactersService, JobsService],
    })
      .overrideProvider(JobsService)
      .useValue(mockJobsService)
      .compile();

    service = module.get<CharactersService>(CharactersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return an array of characters", () => {
      const characters = service.findAll();
      expect(characters).toBeInstanceOf(Array);
    });

    it("should return an empty array if no characters found", () => {
      const characters = service.findAll();
      expect(characters).toBeInstanceOf(Array);
      expect(characters).toEqual([]);
    });
  });

  describe("findOne", () => {
    beforeEach(() => {
      service.create({
        name: "fakeman",
        job: JobType.Thief,
      });
    });
    it("should return a character", () => {
      const expectedJob = JobsTable[JobType.Thief];
      const character = service.findOne(1);
      expect(character).toEqual({
        ...mockedCharacter,
        attackModifier: Object.fromEntries(expectedJob.attackModifier),
        speedModifier: Object.fromEntries(expectedJob.speedModifier),
      });
    });

    it("should throw an error if character not found", () => {
      const id = 99;
      expect(() => service.findOne(id)).toThrow(
        `Character with id ${id} not found`
      );
    });
  });

  describe("create", () => {
    beforeEach(() => {
      service.create({
        name: "fakeman",
        job: JobType.Thief,
      });
    });
    it("should create a character", () => {
      const createCharacterDto = {
        name: "johndoe",
        job: JobType.Thief,
      };
      const character = service.create(createCharacterDto);
      expect(character).toEqual({
        ...mockedCharacter,
        name: "johndoe",
        id: 2,
        level: 1,
      });
    });

    it("should throw an error if character name already exists", () => {
      const createCharacterDto = {
        name: "fakeman",
        job: JobType.Thief,
      };
      expect(() => service.create(createCharacterDto)).toThrow(
        "Character name already exists"
      );
    });

    it("should throw an error if character name is invalid", () => {
      const createCharacterDto = {
        name: "1234",
        job: JobType.Thief,
      };
      expect(() => service.create(createCharacterDto)).toThrow(
        "Character name can only contain letters and underscores"
      );
    });

    it("should throw an error if job is invalid", () => {
      const createCharacterDto = {
        name: "newman",
        job: "invalid_job" as JobType,
      };
      expect(() => service.create(createCharacterDto)).toThrow(
        "Invalid character job type, available options are: Warrior, Thief, Mage"
      );
    });
  });

  describe("update", () => {
    beforeEach(() => {
      service.create({
        name: "fakeman",
        job: JobType.Thief,
      });
    });

    it("should update a character", () => {
      const updateCharacterDto = {
        ...mockedCharacter,
        name: "johndoe",
        job: JobType.Thief,
      };
      const character = service.update(1, updateCharacterDto);
      expect(character).toEqual({
        ...mockedCharacter,
        name: "johndoe",
        id: 1,
        level: 1,
      });
    });

    it("should throw an error if character not found", () => {
      const updateCharacterDto = {
        ...mockedCharacter,
        name: "johndoe",
        job: JobType.Thief,
      };
      expect(() => service.update(99, updateCharacterDto)).toThrow(
        "Character with id 99 not found"
      );
    });
  });
});
