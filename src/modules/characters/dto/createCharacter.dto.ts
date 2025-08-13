import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export enum JobType {
  Warrior = "Warrior",
  Thief = "Thief",
  Mage = "Mage",
}

const CharacterSchema = z.object({
  id: z.number().optional(),
  level: z.number().positive().default(1).optional(),
  name: z
    .string()
    .min(4)
    .max(15)
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
  health: z.number().positive().optional(),
  strength: z.number().positive().optional(),
  dexterity: z.number().positive().optional(),
  intelligence: z.number().positive().optional(),
});

export class CreateCharacterDto extends createZodDto(CharacterSchema) {}
