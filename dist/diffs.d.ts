interface Diff {
    path: string;
    valueA: any;
    valueB: any;
    state: string;
    change?: number;
    timestamp: number;
}
declare function dottpathDiffs(jsonA: any, jsonB: any, excludes?: string[]): Diff[];
export default dottpathDiffs;
