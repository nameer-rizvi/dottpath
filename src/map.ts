import simpul from "simpul";

const DELIMITER = ".";

function dottpathMap(input: unknown, prefix = ""): string[] {
  const paths: any = [];

  if (simpul.isArray(input)) {
    for (let i = 0; i < input.length; i++) {
      const item = input[i];
      const path = prefix ? [prefix, i].join(DELIMITER) : i.toString();
      const pushPath = isComposite(item) ? dottpathMap(item, path) : path;
      if (pushPath) paths.push(pushPath);
    }
  } else if (simpul.isObject(input)) {
    for (const [key, value] of Object.entries(input)) {
      const path = prefix ? [prefix, key].join(DELIMITER) : key;
      const pushPath = isComposite(value) ? dottpathMap(value, path) : path;
      if (pushPath) paths.push(pushPath);
    }
  }

  return paths.flat();
}

function isComposite(item: any): boolean {
  return simpul.isArray(item) || simpul.isObject(item);
}

export default dottpathMap;
