import { FUZZY_BOUNDS } from 'src/constants/fuzzyBounds.const';
import {
  EAccuracynames,
  EFuzzyStatuses,
  ETermNames,
} from 'src/enums/fuzzyNames.enum';
import { IFuzzyBound, IFuzzyCheckResult } from 'src/models/fuzzy.model';
import { FUZZY_RULES } from 'src/constants/fuzzyRules.const';

export class FuzzyService {
  public startMamdani(
    avgTestTime: number,
    testDifficuilty: EFuzzyStatuses,
    correctPercentage: number
  ): EFuzzyStatuses {
    const testTimeBoundsArray = FUZZY_BOUNDS.filter(
      (bound) => bound.name === ETermNames.AnswerTime
    );
    const correctPercentageBounds = FUZZY_BOUNDS.filter(
      (bound) => bound.name === ETermNames.CorrectPercentage
    );

    return this.getResultFromRules(
      this.getBoundsResult(testTimeBoundsArray, avgTestTime),
      this.getBoundsResult(correctPercentageBounds, correctPercentage),
      testDifficuilty
    );
  }

  private getResultFromRules(
    avgTimeResult: IFuzzyCheckResult,
    correctPercentageResult: IFuzzyCheckResult,
    testDifficuilty: EFuzzyStatuses
  ): EFuzzyStatuses {
    return (
      FUZZY_RULES.find((rule) => {
        if (
          rule.statements.find(
            (statement) =>
              statement.name === avgTimeResult.name &&
              statement.fuzzyName === avgTimeResult.fuzzyName &&
              statement.accuracy! === avgTimeResult.accuracy
          ) &&
          rule.statements.find(
            (statement) =>
              statement.name === correctPercentageResult.name &&
              statement.fuzzyName === correctPercentageResult.fuzzyName &&
              statement.accuracy! === correctPercentageResult.accuracy
          ) &&
          rule.statements.find(
            (statement) =>
              statement.name === ETermNames.TestDifficuilty &&
              statement.fuzzyName === testDifficuilty
          )
        ) {
          return true;
        }

        return false;
      })?.result || EFuzzyStatuses.UnCalculated
    );
  }

  private getBoundsResult(
    bounds: Array<IFuzzyBound>,
    value: number
  ): IFuzzyCheckResult {
    const innerBound: IFuzzyBound | undefined = bounds.find(
      (bound: IFuzzyBound) =>
        bound.bounds.inner[0] <= value && bound.bounds.inner[1] >= value
    );
    console.log(innerBound);
    if (innerBound) {
      return {
        fuzzyName: innerBound.fuzzyName,
        accuracy: EAccuracynames.Accurate,
        name: innerBound.name,
      };
    }

    const closeBounds = bounds.filter((bound) => {
      if (bound.bounds.outerLeft && bound.bounds.outerRight) {
        if (
          bound.bounds.outerLeft[0] <= value &&
          bound.bounds.outerLeft[1] >= value
        ) {
          return true;
        }

        if (
          bound.bounds.outerRight[0] <= value &&
          bound.bounds.outerRight[1] >= value
        ) {
          return true;
        }

        return false;
      }

      if (bound.bounds.outerLeft) {
        if (
          bound.bounds.outerLeft[0] <= value &&
          bound.bounds.outerLeft[1] >= value
        ) {
          return true;
        }
      }

      if (bound.bounds.outerRight) {
        if (
          bound.bounds.outerRight[0] <= value &&
          bound.bounds.outerRight[1] >= value
        ) {
          return true;
        }
      }

      return false;
    });

    if (closeBounds.length === 1) {
      return {
        fuzzyName: closeBounds[0].fuzzyName,
        accuracy: EAccuracynames.Accurate,
        name: closeBounds[0].name,
      };
    }

    return this.getClosestBound(closeBounds[0], closeBounds[1], value);
  }

  private getClosestBound(
    bound1: IFuzzyBound,
    bound2: IFuzzyBound,
    value: number
  ): IFuzzyCheckResult {
    const leftBound =
      bound1.bounds.inner[0] < bound2.bounds.inner[0] ? bound1 : bound2;
    const rightBound =
      bound1.bounds.inner[0] > bound2.bounds.inner[0] ? bound1 : bound2;

    const avgOuterBounds =
      (leftBound.bounds.outerRight![0] + rightBound.bounds.outerLeft![1]) / 2;

    if (value === avgOuterBounds) {
      return {
        fuzzyName: rightBound.fuzzyName,
        accuracy: EAccuracynames.NonAccurate,
        name: rightBound.name,
      };
    }

    return value > avgOuterBounds
      ? {
          fuzzyName: rightBound.fuzzyName,
          accuracy: EAccuracynames.NonAccurate,
          name: rightBound.name,
        }
      : {
          fuzzyName: leftBound.fuzzyName,
          accuracy: EAccuracynames.NonAccurate,
          name: leftBound.name,
        };
  }
}
