export type KnitPattern = KnitRow[];

export type KnitRow = Stitch[];

export interface Stitch {
  color: string;
  count: number;
}

export interface KnitSettings {
  highlightRow: boolean;
  fromTop: boolean;
  fromRight: boolean;
  reverseEven: boolean;
  doubleStitch: boolean;
}

export interface StitchInfo {
  row: KnitRow;
  stitchIndex: number;
  isStartStitch: boolean;
  isEndStitch: boolean;
  rowIndex: number;
  isStartRow: boolean;
  isEndRow: boolean;
}

export interface KnitData {
  selectedStitch: {
    rowIndex?: number;
    stitchIndex?: number;
  },
  startStitch: {
    rowIndex?: number;
    stitchIndex?: number;
  } | null;
  time: number;
  settings: KnitSettings;
}