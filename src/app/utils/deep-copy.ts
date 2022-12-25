export function deepCopy(o: object): any {
  // taken from https://jsperf.com/deep-copy-vs-json-stringify-json-parse/5
  let newO, i;

  if (typeof o !== 'object') {
    return o;
  }
  if (!o) {
    return o;
  }

  if ('[object Array]' === Object.prototype.toString.apply(o)) {
    newO = [];
    for (i = 0; i < (o as Array<any>).length; i += 1) {
      // @ts-ignore
      newO[i] = deepCopy(o[i]);
    }
    return newO;
  }

  newO = {};
  for (i in o) {
    if (o.hasOwnProperty(i)) {
      // @ts-ignore
      newO[i] = deepCopy(o[i]);
    }
  }
  return newO;
}

export function getCssScale(zoomLevel: any, scalePerZoomLevel: number, neutralZoomLevel: number): number {
  return Math.pow(scalePerZoomLevel, zoomLevel - neutralZoomLevel);
}
