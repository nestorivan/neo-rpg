import { PlayerAttribute } from "@src/common/types/playerAttributes";

export interface JobDescription {
  hp: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  attackModifier: Map<PlayerAttribute, number>;
  speedModifier: Map<PlayerAttribute, number>;
}
