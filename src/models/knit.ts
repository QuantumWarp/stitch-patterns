export type KnitPattern = KnitRow[];

export type KnitRow = Stitch[];

export interface Stitch {
  colorIndex: number;
  count: number;
}

export interface KnitSession {
  patternId: string;
  settings: KnitSettings;
  time: number;
  rowIndex: number;
  stitchIndex: number;
}

export interface KnitSettings {
  fromTop: boolean;
  fromRight: boolean;
  reverseEven: boolean;
  doubleStitch: boolean;
}
