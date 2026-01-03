import simpul from "simpul";

function dottpathExtract(input: unknown, extract: unknown): any {
  if (simpul.isString(extract)) {
    let result: any = input;
    for (const path of extract.split(".")) result = result?.[path];
    return result;
  } else if (simpul.isArray(extract)) {
    const results: any[] = [];
    for (const path of extract) results.push(dottpathExtract(input, path));
    return results;
  } else if (simpul.isObject(extract)) {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(extract))
      result[key] = dottpathExtract(input, value);
    return result;
  }
}

export default dottpathExtract;
