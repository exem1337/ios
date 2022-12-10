import {
  ETermNames,
  EPercentageFuzzyStatuses,
  ETimeFuzzyStatuses,
} from 'src/enums/fuzzyNames.enum';
import { IFuzzyBound } from 'src/models/fuzzy.model';

export const FUZZY_BOUNDS: Array<IFuzzyBound> = [
  {
    name: ETermNames.AnswerTime,
    fuzzyName: ETimeFuzzyStatuses.Slow,
    bounds: {
      inner: [70, 540],
      outerLeft: [55, 70],
    },
  },
  {
    name: ETermNames.AnswerTime,
    fuzzyName: ETimeFuzzyStatuses.Medium,
    bounds: {
      inner: [30, 50],
      outerLeft: [25, 30],
      outerRight: [50, 60],
    },
  },
  {
    name: ETermNames.AnswerTime,
    fuzzyName: ETimeFuzzyStatuses.Fast,
    bounds: {
      inner: [0, 25],
      outerRight: [25, 35],
    },
  },
  {
    name: ETermNames.CorrectPercentage,
    fuzzyName: EPercentageFuzzyStatuses.Incorrect,
    bounds: {
      inner: [0, 10],
      outerRight: [10, 15],
    },
  },
  {
    name: ETermNames.CorrectPercentage,
    fuzzyName: EPercentageFuzzyStatuses.AlmostIncorrect,
    bounds: {
      inner: [20, 35],
      outerLeft: [13, 20],
      outerRight: [35, 40],
    },
  },
  {
    name: ETermNames.CorrectPercentage,
    fuzzyName: EPercentageFuzzyStatuses.Medium,
    bounds: {
      inner: [45, 55],
      outerLeft: [37, 45],
      outerRight: [55, 60],
    },
  },
  {
    name: ETermNames.CorrectPercentage,
    fuzzyName: EPercentageFuzzyStatuses.AlmostCorrect,
    bounds: {
      inner: [65, 75],
      outerLeft: [57, 65],
      outerRight: [75, 85],
    },
  },
  {
    name: ETermNames.CorrectPercentage,
    fuzzyName: EPercentageFuzzyStatuses.Correct,
    bounds: {
      inner: [85, 100],
      outerLeft: [75, 85],
    },
  },
];
