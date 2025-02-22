import type { Dimensions } from "./dimensions";

export interface PatternDetails {
  name: string;
}

export interface CompressedPattern {
  dim: Dimensions;
  col: Record<string, string>;
  pat: string;
}

export interface Pattern {
  name: string;
  colors: string[],
  dimensions: Dimensions;
  squares: PatternSquare[];
}

export interface PatternSquare {
  x: number;
  y: number;
  colorIndex: number;
}
