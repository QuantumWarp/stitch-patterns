import type { Dimensions } from "./dimensions";

export interface PatternDetails {
  name: string;
}

export interface CompressedPattern {
  dim: Dimensions;
  col: Record<string, string>;
  pat: string;
}
