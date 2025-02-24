export interface LegacyCompressedPattern {
  details: {
    name: string;
  };
  pattern: {
    dim: Dimensions;
    col: Record<string, string>;
    pat: string;
  };
}

export interface Pattern {
  id: string;
  name: string;
  colors: string[],
  dimensions: Dimensions;
  squares: PatternSquare[];
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface PatternSquare {
  x: number;
  y: number;
  colorIndex: number;
}

export interface CompressedPattern extends Omit<Pattern, 'squares'> {
  patternString: string;
}
