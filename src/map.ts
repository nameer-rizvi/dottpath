import simpul from "simpul";

function dottpathMap(json: any, prepend = ""): string[] {
  const paths: any[] = [];

  const delimiter = ".";

  if (simpul.isArray(json)) {
    json.forEach((item: any, i: number) => {
      const path = prepend ? [prepend, i].join(delimiter) : i.toString();
      const pushPath = isComposite(item) ? dottpathMap(item, path) : path;
      if (pushPath) paths.push(pushPath);
    });
  } else if (simpul.isObject(json)) {
    Object.entries(json).forEach(([key, value]) => {
      const path = prepend ? [prepend, key].join(delimiter) : key;
      const pushPath = isComposite(value) ? dottpathMap(value, path) : path;
      if (pushPath) paths.push(pushPath);
    });
  }

  return paths.flat();
}

function isComposite(item: any): boolean {
  return simpul.isArray(item) || simpul.isObject(item);
}

export default dottpathMap;
