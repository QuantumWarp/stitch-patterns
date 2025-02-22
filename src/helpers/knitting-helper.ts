import type { KnitPattern, KnitSettings } from "../models/knit";
import type { Pattern } from "../models/pattern";
import PatternHelper from "./pattern-helper";

export function createKnitPattern(pattern: Pattern, settings: KnitSettings): KnitPattern {
  const defaultKnitPattern = PatternHelper.reducePattern(pattern.squares)
  return PatternHelper.applyReducePatternSettings(
    defaultKnitPattern,
    settings,
  );
}
