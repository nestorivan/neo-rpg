import { PlayerAttribute } from "@src/common/types/playerAttributes";
import { createZodDto } from "nestjs-zod";
import { JobType } from "@src/common/types/jobs";
import { z } from "zod";

export const CharacterByIdSchema = z
  .number()
  .positive()
  .describe("Character id");

const CreateCharacterSchema = z
  .object({
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
  })
  .strict();

const CharacterSchema = z.object({
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
  hp: z.number().positive(),
  currentHp: z.number(),
  strength: z.number().positive(),
  dexterity: z.number().positive(),
  intelligence: z.number().positive(),
});

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
  attackModifier: z.array(
    z.object({ key: z.nativeEnum(PlayerAttribute), value: z.number() })
  ),
  speedModifier: z.array(
    z.object({ key: z.nativeEnum(PlayerAttribute), value: z.number() })
  ),
});

export const CharacterListItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  job: z.nativeEnum(JobType),
  alive: z.boolean(),
});

//DTO
export class CharacterDto extends createZodDto(CharacterSchema) {}
export class CreateCharacterDto extends createZodDto(CreateCharacterSchema) {}
export class CharacterDetailsDto extends createZodDto(CharacterDetailsSchema) {}
export class CharacterListItemDto extends createZodDto(
  CharacterListItemSchema
) {}

//MODELS
export type CharacterDetails = z.infer<typeof CharacterDetailsSchema>;
export type CharacterListItem = z.infer<typeof CharacterListItemSchema>;
export type CreateCharacter = z.infer<typeof CreateCharacterSchema>;
export type Character = z.infer<typeof CharacterSchema>;
