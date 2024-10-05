import simpul from "simpul";

function dottpathSet(json: any, set: Record<string, any>): void {
  if (simpul.isJSON(json) && simpul.isObject(set)) {
    simpul.recursively(json, ({ path, value }) => {
      return Object.keys(set).includes(path) ? set[path] : value;
    });
  }
}

export default dottpathSet;
