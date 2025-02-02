export type KnitPattern = KnitRow[];

export type KnitRow = Stitch[];

export interface Stitch {
  color: string;
  count: number;
}

export interface KnitSettings {
  fromTop: boolean;
  fromRight: boolean;
  reverseEven: boolean;
  doubleStitch: boolean;
}
