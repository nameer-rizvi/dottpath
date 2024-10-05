import simpul from "simpul";

function dottpathExtract(json: any, extract: any): any {
  if (simpul.isString(extract)) {
    return extract.split(".").reduce((o: any, i: any) => o?.[i], json);
  } else if (simpul.isArray(extract)) {
    return extract.map((item: any) => dottpathExtract(json, item));
  } else if (simpul.isObject(extract)) {
    return Object.entries(extract).reduce((result, [key, value]) => {
      return { ...result, [key]: dottpathExtract(json, value) };
    }, {});
  }
}

export default dottpathExtract;
