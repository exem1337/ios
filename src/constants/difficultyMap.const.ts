import { ERuleResultLevels } from 'src/enums/rule.enum';

export const difficultyMap = new Map<ERuleResultLevels, number>([
  [ERuleResultLevels.Newbie, 5],
  [ERuleResultLevels.Intern, 50],
  [ERuleResultLevels.Master, 65],
  [ERuleResultLevels.Professional, 85],
  [ERuleResultLevels.Expert, 100],
])