import _ from "lodash";

type CompactOptions = {
  skipEmptyString?: boolean;
  skipFalse?: boolean;
};

export function compact(
  value: any,
  options: CompactOptions = {
    skipEmptyString: false,
    skipFalse: false,
  },
) {
  if (_.isArray(value)) {
    return value
      .map((v) => compact(v, options))
      .filter((v) => {
        if (_.isNil(v)) {
          return false;
        }
        if (options.skipEmptyString && v === "") {
          return false;
        }
        if (options.skipFalse && v === false) {
          return false;
        }
        return true;
      });
  }
  if (_.isPlainObject(value)) {
    return _.reduce(
      value,
      (acc: any, val: any, key: string) => {
        if (_.isNil(val)) {
          return acc;
        }
        if (options.skipEmptyString && val === "") {
          return acc;
        }
        if (options.skipFalse && val === false) {
          return acc;
        }
        if (_.isArray(val) || _.isPlainObject(val)) {
          val = compact(val, options);
          if (_.isEmpty(val)) {
            return acc;
          }
        }
        return _.assign(acc, { [key]: val });
      },
      {},
    );
  }
  return value;
}
