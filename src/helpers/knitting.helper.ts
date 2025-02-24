import type { KnitPattern, KnitSession, KnitSettings } from '@/models/knit';
import type { Pattern } from '@/models/pattern';
import { PatternHelper } from '@/helpers/pattern.helper';

export function createKnitPattern(pattern: Pattern, settings: KnitSettings): KnitPattern {
  const defaultKnitPattern = PatternHelper.reducePattern(pattern.squares)
  return PatternHelper.applyReducePatternSettings(
    defaultKnitPattern,
    settings,
  );
}

export function defaultKnitSession(): Omit<KnitSession, 'patternId'> {
  return {
    time: 0,
    rowIndex: 0,
    stitchIndex: 0,
    settings: {
      fromTop: false,
      fromRight: false,
      reverseEven: true,
      doubleStitch: true,
    }
  };
}
