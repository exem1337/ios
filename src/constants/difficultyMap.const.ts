import { ERuleResultLevels } from "src/enums/rule.enum";

export const difficultyMap = new Map<ERuleResultLevels, number>([
  [ERuleResultLevels.Newbie, 5],
  [ERuleResultLevels.Intern, 40],
  [ERuleResultLevels.Master, 60],
  [ERuleResultLevels.Professional, 80],
  [ERuleResultLevels.Expert, 100],
])