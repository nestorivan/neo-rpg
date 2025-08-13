import { createZodDto } from "nestjs-zod";
import { JobType } from "src/common/types/jobs";
import { z } from "zod";

const CreateCharacterSchema = z
  .object({
    id: z.number().optional(),
    level: z.number().positive().default(1),
    alive: z.boolean().default(true),
    name: z
      .string()
      .min(4)
      .max(15)
      .regex(
        /^[a-zA-Z_]+$/,
        "Character name can only contain letters and underscores"
      )
      .describe("Character name, must be between 4 and 15 characters"),
    job: z
      .nativeEnum(JobType, {
        errorMap: (issue, ctx) => {
          if (issue.code === "invalid_enum_value") {
            return {
              message: `Invalid character job type, available options are: Warrior, Thief, Mage`,
            };
          }
          return { message: ctx.defaultError };
        },
      })
      .describe(
        "Character job type, available options are: Warrior, Thief, Mage"
      ),
    hp: z.number().positive().optional(),
    currentHp: z.number().optional(),
    strength: z.number().positive().optional(),
    dexterity: z.number().positive().optional(),
    intelligence: z.number().positive().optional(),
  })
  .transform((data) => ({
    ...data,
    currentHp: data.hp,
  }));

export const CharacterDetailsSchema = z.object({
  id: z.number(),
  name: z.string(),
  job: z.nativeEnum(JobType),
  alive: z.boolean(),
  hp: z.number(),
  currentHp: z.number(),
  strength: z.number(),
  dexterity: z.number(),
  intelligence: z.number(),
  attackModifier: z.any(),
  speedModifier: z.any(),
});

export const CharacterListItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  job: z.nativeEnum(JobType),
  alive: z.boolean(),
});

export class CreateCharacterDto extends createZodDto(CreateCharacterSchema) {}
export class CharacterDetailsDto extends createZodDto(CharacterDetailsSchema) {}
export class CharacterListItemDto extends createZodDto(
  CharacterListItemSchema
) {}
