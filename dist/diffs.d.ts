export interface Diff {
    path: string;
    valueA: unknown;
    valueB: unknown;
    state: "value changed" | "property added" | "property removed";
    change?: number;
    timestamp: number;
}
declare function dottpathDiffs(inputA: unknown, inputB: unknown, excludes?: string[]): Diff[];
export default dottpathDiffs;
