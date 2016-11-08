const MAX_SAFE_INTEGER = 9007199254740991;
const funcTag = '[object Function]';
const genTag = '[object GeneratorFunction]';
const asyncTag = '[object AsyncFunction]';
const proxyTag = '[object Proxy]';
const undefinedTag = '[object Undefined]';
const nullTag = '[object Null]';
const symToStringTag = Symbol ? Symbol.toStringTag : undefined;
const objectProto = Object.prototype;
const hasOwnProperty = objectProto.hasOwnProperty;
const nativeObjectToString = objectProto.toString;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag`
 * values.
 */
export const getRawTag = (value) => {
  const val = value;
  const isOwn = hasOwnProperty.call(val, symToStringTag);
  const tag = val[symToStringTag];
  let unmasked = false;
  try {
    val[symToStringTag] = undefined;
    unmasked = true;
  } catch (e) {
    // continue regardless of error
  }
  const result = nativeObjectToString.call(val);
  if (unmasked) {
    if (isOwn) {
      val[symToStringTag] = tag;
    } else {
      delete val[symToStringTag];
    }
  }
  return result;
};

/**
 * Convers `value` to a string using `Object.prototype.toString`.
 */
export const objectToString = value =>
  nativeObjectToString.call(value);

/**
 * Checks if 'value' is a valid array-like length.
 */
export const isLength = value =>
  typeof value === 'number' &&
    value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER;

/**
 * The base implemantation of `getTag` without fallbacks for buggy
 * environments.
 */
export const baseGetTag = (value) => {
  let val = value;
  if (val === null) {
    return val === undefined ? undefinedTag : nullTag;
  }
  val = Object(value);
  return (symToStringTag && symToStringTag in val) ?
    getRawTag(val) :
    objectToString(val);
};

/**
 * Checks if `value` is the type of `Object`.
 */
export const isObject = (value) => {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
};

/**
 * Checks if 'value' is classified as a `Function` object.
 */
export const isFunction = (value) => {
  if (!isObject(value)) return false;
  const tag = baseGetTag(value);
  return tag === funcTag || tag === genTag || tag === asyncTag || tag === proxyTag;
};

/**
 * Checks if `value` is array-like. A value is considered array-like if
 * it's not a funciont and has a `value.length` that's an integer greater
 * than or equal to `0` and less than or equal to `MAX_SAFE_INTEGER`.
 */
export const isArrayLike = value =>
  value != null && isLength(value.length) && !isFunction(value);

/**
 * Checks if the `value` is an empty object, collection, map or set.
 */
export const isEmptyObject = value =>
  Object.keys(value).length === 0 && value.constructor === Object;

/**
 * Function used by debounce (below) that enforces to run a method
 * to be called again after certain amount of time.
 */
export const debounce = (fn, duration) => {
  let timeoutId;
  function wrapper(...args) {
    wrapper.clear();
    timeoutId = setTimeout(() => {
      timeoutId = null;
      fn.apply(this, args);
    }, duration);
  }
  wrapper.clear = function clear() {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };
  return wrapper;
};

/**
 * Debounce is a decorator to allow functions be debounced by the
 * time passed in the argument. Defaults 300ms.
 */
export const debouncer = function debouncer(duration = 300) {
  return function debounceMethod(target, key, { enumerable, value }) {
    return {
      configurable: true,
      enumerable,
      get: function getter() {
        Object.defineProperty(this, key, {
          configurable: true,
          writable: true,
          enumerable,
          value: debounce(value, duration),
        });
        return this[key];
      },
    };
  };
};
