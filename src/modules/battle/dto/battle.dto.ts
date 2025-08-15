import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const CreateBattleSchema = z.object({
  characterId: z.number().positive().describe("Opponent 1 character id"),
  opponentId: z.number().positive().describe("Opponent 2 character id"),
});

export class CreateBattleDto extends createZodDto(CreateBattleSchema) {}
