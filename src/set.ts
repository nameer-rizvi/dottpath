import simpul from "simpul";

function dottpathSet(input: unknown, set: Record<string, any>): any {
  if (simpul.isJSON(input) && simpul.isObjectNonEmpty(set)) {
    const keys = Object.keys(set);
    return simpul.recursively(input, ({ path, value }) => {
      return keys.includes(path) ? set[path] : value;
    });
  } else return input;
}

export default dottpathSet;
