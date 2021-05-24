/**
 * Make a map and return a function for checking if a key
 * is in that map.
 * IMPORTANT: all calls of this function must be prefixed with
 * \/\*#\_\_PURE\_\_\*\/
 * So that rollup can tree-shake them if necessary.
 */
function makeMap(str, expectsLowerCase) {
    const map = Object.create(null);
    const list = str.split(',');
    for (let i = 0; i < list.length; i++) {
        map[list[i]] = true;
    }
    return expectsLowerCase ? val => !!map[val.toLowerCase()] : val => !!map[val];
}

const GLOBALS_WHITE_LISTED = 'Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,' +
    'decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,' +
    'Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt';
const isGloballyWhitelisted = /*#__PURE__*/ makeMap(GLOBALS_WHITE_LISTED);

/**
 * On the client we only need to offer special cases for boolean attributes that
 * have different names from their corresponding dom properties:
 * - itemscope -> N/A
 * - allowfullscreen -> allowFullscreen
 * - formnovalidate -> formNoValidate
 * - ismap -> isMap
 * - nomodule -> noModule
 * - novalidate -> noValidate
 * - readonly -> readOnly
 */
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /*#__PURE__*/ makeMap(specialBooleanAttrs);

function normalizeStyle(value) {
    if (isArray(value)) {
        const res = {};
        for (let i = 0; i < value.length; i++) {
            const item = value[i];
            const normalized = normalizeStyle(isString(item) ? parseStringStyle(item) : item);
            if (normalized) {
                for (const key in normalized) {
                    res[key] = normalized[key];
                }
            }
        }
        return res;
    }
    else if (isObject(value)) {
        return value;
    }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
    const ret = {};
    cssText.split(listDelimiterRE).forEach(item => {
        if (item) {
            const tmp = item.split(propertyDelimiterRE);
            tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
        }
    });
    return ret;
}
function normalizeClass(value) {
    let res = '';
    if (isString(value)) {
        res = value;
    }
    else if (isArray(value)) {
        for (let i = 0; i < value.length; i++) {
            const normalized = normalizeClass(value[i]);
            if (normalized) {
                res += normalized + ' ';
            }
        }
    }
    else if (isObject(value)) {
        for (const name in value) {
            if (value[name]) {
                res += name + ' ';
            }
        }
    }
    return res.trim();
}

/**
 * For converting {{ interpolation }} values to displayed strings.
 * @private
 */
const toDisplayString = (val) => {
    return val == null
        ? ''
        : isObject(val)
            ? JSON.stringify(val, replacer, 2)
            : String(val);
};
const replacer = (_key, val) => {
    if (isMap(val)) {
        return {
            [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val]) => {
                entries[`${key} =>`] = val;
                return entries;
            }, {})
        };
    }
    else if (isSet(val)) {
        return {
            [`Set(${val.size})`]: [...val.values()]
        };
    }
    else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
        return String(val);
    }
    return val;
};
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => { };
/**
 * Always return false.
 */
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith('onUpdate:');
const extend = Object.assign;
const remove = (arr, el) => {
    const i = arr.indexOf(el);
    if (i > -1) {
        arr.splice(i, 1);
    }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === '[object Map]';
const isSet = (val) => toTypeString(val) === '[object Set]';
const isFunction = (val) => typeof val === 'function';
const isString = (val) => typeof val === 'string';
const isSymbol = (val) => typeof val === 'symbol';
const isObject = (val) => val !== null && typeof val === 'object';
const isPromise = (val) => {
    return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
    // extract "RawType" from strings like "[object RawType]"
    return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === '[object Object]';
const isIntegerKey = (key) => isString(key) &&
    key !== 'NaN' &&
    key[0] !== '-' &&
    '' + parseInt(key, 10) === key;
const isReservedProp = /*#__PURE__*/ makeMap(
// the leading comma is intentional so empty string "" is also included
',key,ref,' +
    'onVnodeBeforeMount,onVnodeMounted,' +
    'onVnodeBeforeUpdate,onVnodeUpdated,' +
    'onVnodeBeforeUnmount,onVnodeUnmounted');
const cacheStringFunction = (fn) => {
    const cache = Object.create(null);
    return ((str) => {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
    });
};
const camelizeRE = /-(\w)/g;
/**
 * @private
 */
const camelize = cacheStringFunction((str) => {
    return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
});
const hyphenateRE = /\B([A-Z])/g;
/**
 * @private
 */
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, '-$1').toLowerCase());
/**
 * @private
 */
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
/**
 * @private
 */
const toHandlerKey = cacheStringFunction((str) => (str ? `on${capitalize(str)}` : ``));
// compare whether a value has changed, accounting for NaN.
const hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);
const invokeArrayFns = (fns, arg) => {
    for (let i = 0; i < fns.length; i++) {
        fns[i](arg);
    }
};
const def = (obj, key, value) => {
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: false,
        value
    });
};
const toNumber = (val) => {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
    return (_globalThis ||
        (_globalThis =
            typeof globalThis !== 'undefined'
                ? globalThis
                : typeof self !== 'undefined'
                    ? self
                    : typeof window !== 'undefined'
                        ? window
                        : typeof global !== 'undefined'
                            ? global
                            : {}));
};

const targetMap = new WeakMap();
const effectStack = [];
let activeEffect;
const ITERATE_KEY = Symbol('');
const MAP_KEY_ITERATE_KEY = Symbol('');
function isEffect(fn) {
    return fn && fn._isEffect === true;
}
function effect(fn, options = EMPTY_OBJ) {
    if (isEffect(fn)) {
        fn = fn.raw;
    }
    const effect = createReactiveEffect(fn, options);
    if (!options.lazy) {
        effect();
    }
    return effect;
}
function stop(effect) {
    if (effect.active) {
        cleanup(effect);
        if (effect.options.onStop) {
            effect.options.onStop();
        }
        effect.active = false;
    }
}
let uid$2 = 0;
function createReactiveEffect(fn, options) {
    const effect = function reactiveEffect() {
        if (!effect.active) {
            return options.scheduler ? undefined : fn();
        }
        if (!effectStack.includes(effect)) {
            cleanup(effect);
            try {
                enableTracking();
                effectStack.push(effect);
                activeEffect = effect;
                return fn();
            }
            finally {
                effectStack.pop();
                resetTracking();
                activeEffect = effectStack[effectStack.length - 1];
            }
        }
    };
    effect.id = uid$2++;
    effect.allowRecurse = !!options.allowRecurse;
    effect._isEffect = true;
    effect.active = true;
    effect.raw = fn;
    effect.deps = [];
    effect.options = options;
    return effect;
}
function cleanup(effect) {
    const { deps } = effect;
    if (deps.length) {
        for (let i = 0; i < deps.length; i++) {
            deps[i].delete(effect);
        }
        deps.length = 0;
    }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
}
function enableTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = true;
}
function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === undefined ? true : last;
}
function track(target, type, key) {
    if (!shouldTrack || activeEffect === undefined) {
        return;
    }
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set()));
    }
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect);
        activeEffect.deps.push(dep);
    }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
        // never been tracked
        return;
    }
    const effects = new Set();
    const add = (effectsToAdd) => {
        if (effectsToAdd) {
            effectsToAdd.forEach(effect => {
                if (effect !== activeEffect || effect.allowRecurse) {
                    effects.add(effect);
                }
            });
        }
    };
    if (type === "clear" /* CLEAR */) {
        // collection being cleared
        // trigger all effects for target
        depsMap.forEach(add);
    }
    else if (key === 'length' && isArray(target)) {
        depsMap.forEach((dep, key) => {
            if (key === 'length' || key >= newValue) {
                add(dep);
            }
        });
    }
    else {
        // schedule runs for SET | ADD | DELETE
        if (key !== void 0) {
            add(depsMap.get(key));
        }
        // also run for iteration key on ADD | DELETE | Map.SET
        switch (type) {
            case "add" /* ADD */:
                if (!isArray(target)) {
                    add(depsMap.get(ITERATE_KEY));
                    if (isMap(target)) {
                        add(depsMap.get(MAP_KEY_ITERATE_KEY));
                    }
                }
                else if (isIntegerKey(key)) {
                    // new index added to array -> length changes
                    add(depsMap.get('length'));
                }
                break;
            case "delete" /* DELETE */:
                if (!isArray(target)) {
                    add(depsMap.get(ITERATE_KEY));
                    if (isMap(target)) {
                        add(depsMap.get(MAP_KEY_ITERATE_KEY));
                    }
                }
                break;
            case "set" /* SET */:
                if (isMap(target)) {
                    add(depsMap.get(ITERATE_KEY));
                }
                break;
        }
    }
    const run = (effect) => {
        if (effect.options.scheduler) {
            effect.options.scheduler(effect);
        }
        else {
            effect();
        }
    };
    effects.forEach(run);
}

const isNonTrackableKeys = /*#__PURE__*/ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol)
    .map(key => Symbol[key])
    .filter(isSymbol));
const get = /*#__PURE__*/ createGetter();
const shallowGet = /*#__PURE__*/ createGetter(false, true);
const readonlyGet = /*#__PURE__*/ createGetter(true);
const shallowReadonlyGet = /*#__PURE__*/ createGetter(true, true);
const arrayInstrumentations = {};
['includes', 'indexOf', 'lastIndexOf'].forEach(key => {
    const method = Array.prototype[key];
    arrayInstrumentations[key] = function (...args) {
        const arr = toRaw(this);
        for (let i = 0, l = this.length; i < l; i++) {
            track(arr, "get" /* GET */, i + '');
        }
        // we run the method using the original args first (which may be reactive)
        const res = method.apply(arr, args);
        if (res === -1 || res === false) {
            // if that didn't work, run it again using raw values.
            return method.apply(arr, args.map(toRaw));
        }
        else {
            return res;
        }
    };
});
['push', 'pop', 'shift', 'unshift', 'splice'].forEach(key => {
    const method = Array.prototype[key];
    arrayInstrumentations[key] = function (...args) {
        pauseTracking();
        const res = method.apply(this, args);
        resetTracking();
        return res;
    };
});
function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key, receiver) {
        if (key === "__v_isReactive" /* IS_REACTIVE */) {
            return !isReadonly;
        }
        else if (key === "__v_isReadonly" /* IS_READONLY */) {
            return isReadonly;
        }
        else if (key === "__v_raw" /* RAW */ &&
            receiver ===
                (isReadonly
                    ? shallow
                        ? shallowReadonlyMap
                        : readonlyMap
                    : shallow
                        ? shallowReactiveMap
                        : reactiveMap).get(target)) {
            return target;
        }
        const targetIsArray = isArray(target);
        if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
            return Reflect.get(arrayInstrumentations, key, receiver);
        }
        const res = Reflect.get(target, key, receiver);
        if (isSymbol(key)
            ? builtInSymbols.has(key)
            : isNonTrackableKeys(key)) {
            return res;
        }
        if (!isReadonly) {
            track(target, "get" /* GET */, key);
        }
        if (shallow) {
            return res;
        }
        if (isRef(res)) {
            // ref unwrapping - does not apply for Array + integer key.
            const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
            return shouldUnwrap ? res.value : res;
        }
        if (isObject(res)) {
            // Convert returned value into a proxy as well. we do the isObject check
            // here to avoid invalid value warning. Also need to lazy access readonly
            // and reactive here to avoid circular dependency.
            return isReadonly ? readonly(res) : reactive(res);
        }
        return res;
    };
}
const set = /*#__PURE__*/ createSetter();
const shallowSet = /*#__PURE__*/ createSetter(true);
function createSetter(shallow = false) {
    return function set(target, key, value, receiver) {
        let oldValue = target[key];
        if (!shallow) {
            value = toRaw(value);
            oldValue = toRaw(oldValue);
            if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
                oldValue.value = value;
                return true;
            }
        }
        const hadKey = isArray(target) && isIntegerKey(key)
            ? Number(key) < target.length
            : hasOwn(target, key);
        const result = Reflect.set(target, key, value, receiver);
        // don't trigger if target is something up in the prototype chain of original
        if (target === toRaw(receiver)) {
            if (!hadKey) {
                trigger(target, "add" /* ADD */, key, value);
            }
            else if (hasChanged(value, oldValue)) {
                trigger(target, "set" /* SET */, key, value);
            }
        }
        return result;
    };
}
function deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
        trigger(target, "delete" /* DELETE */, key, undefined);
    }
    return result;
}
function has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
        track(target, "has" /* HAS */, key);
    }
    return result;
}
function ownKeys(target) {
    track(target, "iterate" /* ITERATE */, isArray(target) ? 'length' : ITERATE_KEY);
    return Reflect.ownKeys(target);
}
const mutableHandlers = {
    get,
    set,
    deleteProperty,
    has,
    ownKeys
};
const readonlyHandlers = {
    get: readonlyGet,
    set(target, key) {
        return true;
    },
    deleteProperty(target, key) {
        return true;
    }
};
const shallowReactiveHandlers = extend({}, mutableHandlers, {
    get: shallowGet,
    set: shallowSet
});
// Props handlers are special in the sense that it should not unwrap top-level
// refs (in order to allow refs to be explicitly passed down), but should
// retain the reactivity of the normal readonly object.
extend({}, readonlyHandlers, {
    get: shallowReadonlyGet
});

const toReactive = (value) => isObject(value) ? reactive(value) : value;
const toReadonly = (value) => isObject(value) ? readonly(value) : value;
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get$1(target, key, isReadonly = false, isShallow = false) {
    // #1772: readonly(reactive(Map)) should return readonly + reactive version
    // of the value
    target = target["__v_raw" /* RAW */];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) {
        !isReadonly && track(rawTarget, "get" /* GET */, key);
    }
    !isReadonly && track(rawTarget, "get" /* GET */, rawKey);
    const { has } = getProto(rawTarget);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    if (has.call(rawTarget, key)) {
        return wrap(target.get(key));
    }
    else if (has.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
    }
}
function has$1(key, isReadonly = false) {
    const target = this["__v_raw" /* RAW */];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) {
        !isReadonly && track(rawTarget, "has" /* HAS */, key);
    }
    !isReadonly && track(rawTarget, "has" /* HAS */, rawKey);
    return key === rawKey
        ? target.has(key)
        : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly = false) {
    target = target["__v_raw" /* RAW */];
    !isReadonly && track(toRaw(target), "iterate" /* ITERATE */, ITERATE_KEY);
    return Reflect.get(target, 'size', target);
}
function add(value) {
    value = toRaw(value);
    const target = toRaw(this);
    const proto = getProto(target);
    const hadKey = proto.has.call(target, value);
    if (!hadKey) {
        target.add(value);
        trigger(target, "add" /* ADD */, value, value);
    }
    return this;
}
function set$1(key, value) {
    value = toRaw(value);
    const target = toRaw(this);
    const { has, get } = getProto(target);
    let hadKey = has.call(target, key);
    if (!hadKey) {
        key = toRaw(key);
        hadKey = has.call(target, key);
    }
    const oldValue = get.call(target, key);
    target.set(key, value);
    if (!hadKey) {
        trigger(target, "add" /* ADD */, key, value);
    }
    else if (hasChanged(value, oldValue)) {
        trigger(target, "set" /* SET */, key, value);
    }
    return this;
}
function deleteEntry(key) {
    const target = toRaw(this);
    const { has, get } = getProto(target);
    let hadKey = has.call(target, key);
    if (!hadKey) {
        key = toRaw(key);
        hadKey = has.call(target, key);
    }
    get ? get.call(target, key) : undefined;
    // forward the operation before queueing reactions
    const result = target.delete(key);
    if (hadKey) {
        trigger(target, "delete" /* DELETE */, key, undefined);
    }
    return result;
}
function clear() {
    const target = toRaw(this);
    const hadItems = target.size !== 0;
    // forward the operation before queueing reactions
    const result = target.clear();
    if (hadItems) {
        trigger(target, "clear" /* CLEAR */, undefined, undefined);
    }
    return result;
}
function createForEach(isReadonly, isShallow) {
    return function forEach(callback, thisArg) {
        const observed = this;
        const target = observed["__v_raw" /* RAW */];
        const rawTarget = toRaw(target);
        const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
        !isReadonly && track(rawTarget, "iterate" /* ITERATE */, ITERATE_KEY);
        return target.forEach((value, key) => {
            // important: make sure the callback is
            // 1. invoked with the reactive map as `this` and 3rd arg
            // 2. the value received should be a corresponding reactive/readonly.
            return callback.call(thisArg, wrap(value), wrap(key), observed);
        });
    };
}
function createIterableMethod(method, isReadonly, isShallow) {
    return function (...args) {
        const target = this["__v_raw" /* RAW */];
        const rawTarget = toRaw(target);
        const targetIsMap = isMap(rawTarget);
        const isPair = method === 'entries' || (method === Symbol.iterator && targetIsMap);
        const isKeyOnly = method === 'keys' && targetIsMap;
        const innerIterator = target[method](...args);
        const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
        !isReadonly &&
            track(rawTarget, "iterate" /* ITERATE */, isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
        // return a wrapped iterator which returns observed versions of the
        // values emitted from the real iterator
        return {
            // iterator protocol
            next() {
                const { value, done } = innerIterator.next();
                return done
                    ? { value, done }
                    : {
                        value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
                        done
                    };
            },
            // iterable protocol
            [Symbol.iterator]() {
                return this;
            }
        };
    };
}
function createReadonlyMethod(type) {
    return function (...args) {
        return type === "delete" /* DELETE */ ? false : this;
    };
}
const mutableInstrumentations = {
    get(key) {
        return get$1(this, key);
    },
    get size() {
        return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
};
const shallowInstrumentations = {
    get(key) {
        return get$1(this, key, false, true);
    },
    get size() {
        return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
};
const readonlyInstrumentations = {
    get(key) {
        return get$1(this, key, true);
    },
    get size() {
        return size(this, true);
    },
    has(key) {
        return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add" /* ADD */),
    set: createReadonlyMethod("set" /* SET */),
    delete: createReadonlyMethod("delete" /* DELETE */),
    clear: createReadonlyMethod("clear" /* CLEAR */),
    forEach: createForEach(true, false)
};
const shallowReadonlyInstrumentations = {
    get(key) {
        return get$1(this, key, true, true);
    },
    get size() {
        return size(this, true);
    },
    has(key) {
        return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add" /* ADD */),
    set: createReadonlyMethod("set" /* SET */),
    delete: createReadonlyMethod("delete" /* DELETE */),
    clear: createReadonlyMethod("clear" /* CLEAR */),
    forEach: createForEach(true, true)
};
const iteratorMethods = ['keys', 'values', 'entries', Symbol.iterator];
iteratorMethods.forEach(method => {
    mutableInstrumentations[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations[method] = createIterableMethod(method, true, false);
    shallowInstrumentations[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations[method] = createIterableMethod(method, true, true);
});
function createInstrumentationGetter(isReadonly, shallow) {
    const instrumentations = shallow
        ? isReadonly
            ? shallowReadonlyInstrumentations
            : shallowInstrumentations
        : isReadonly
            ? readonlyInstrumentations
            : mutableInstrumentations;
    return (target, key, receiver) => {
        if (key === "__v_isReactive" /* IS_REACTIVE */) {
            return !isReadonly;
        }
        else if (key === "__v_isReadonly" /* IS_READONLY */) {
            return isReadonly;
        }
        else if (key === "__v_raw" /* RAW */) {
            return target;
        }
        return Reflect.get(hasOwn(instrumentations, key) && key in target
            ? instrumentations
            : target, key, receiver);
    };
}
const mutableCollectionHandlers = {
    get: createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
    get: createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
    get: createInstrumentationGetter(true, false)
};

const reactiveMap = new WeakMap();
const shallowReactiveMap = new WeakMap();
const readonlyMap = new WeakMap();
const shallowReadonlyMap = new WeakMap();
function targetTypeMap(rawType) {
    switch (rawType) {
        case 'Object':
        case 'Array':
            return 1 /* COMMON */;
        case 'Map':
        case 'Set':
        case 'WeakMap':
        case 'WeakSet':
            return 2 /* COLLECTION */;
        default:
            return 0 /* INVALID */;
    }
}
function getTargetType(value) {
    return value["__v_skip" /* SKIP */] || !Object.isExtensible(value)
        ? 0 /* INVALID */
        : targetTypeMap(toRawType(value));
}
function reactive(target) {
    // if trying to observe a readonly proxy, return the readonly version.
    if (target && target["__v_isReadonly" /* IS_READONLY */]) {
        return target;
    }
    return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
/**
 * Return a shallowly-reactive copy of the original object, where only the root
 * level properties are reactive. It also does not auto-unwrap refs (even at the
 * root level).
 */
function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
/**
 * Creates a readonly copy of the original object. Note the returned copy is not
 * made reactive, but `readonly` can be called on an already reactive object.
 */
function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject(target)) {
        return target;
    }
    // target is already a Proxy, return it.
    // exception: calling readonly() on a reactive object
    if (target["__v_raw" /* RAW */] &&
        !(isReadonly && target["__v_isReactive" /* IS_REACTIVE */])) {
        return target;
    }
    // target already has corresponding Proxy
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
        return existingProxy;
    }
    // only a whitelist of value types can be observed.
    const targetType = getTargetType(target);
    if (targetType === 0 /* INVALID */) {
        return target;
    }
    const proxy = new Proxy(target, targetType === 2 /* COLLECTION */ ? collectionHandlers : baseHandlers);
    proxyMap.set(target, proxy);
    return proxy;
}
function isReactive(value) {
    if (isReadonly(value)) {
        return isReactive(value["__v_raw" /* RAW */]);
    }
    return !!(value && value["__v_isReactive" /* IS_REACTIVE */]);
}
function isReadonly(value) {
    return !!(value && value["__v_isReadonly" /* IS_READONLY */]);
}
function isProxy(value) {
    return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
    return ((observed && toRaw(observed["__v_raw" /* RAW */])) || observed);
}
function isRef(r) {
    return Boolean(r && r.__v_isRef === true);
}
function unref(ref) {
    return isRef(ref) ? ref.value : ref;
}
const shallowUnwrapHandlers = {
    get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
    set: (target, key, value, receiver) => {
        const oldValue = target[key];
        if (isRef(oldValue) && !isRef(value)) {
            oldValue.value = value;
            return true;
        }
        else {
            return Reflect.set(target, key, value, receiver);
        }
    }
};
function proxyRefs(objectWithRefs) {
    return isReactive(objectWithRefs)
        ? objectWithRefs
        : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class ObjectRefImpl {
    constructor(_object, _key) {
        this._object = _object;
        this._key = _key;
        this.__v_isRef = true;
    }
    get value() {
        return this._object[this._key];
    }
    set value(newVal) {
        this._object[this._key] = newVal;
    }
}
function toRef(object, key) {
    return isRef(object[key])
        ? object[key]
        : new ObjectRefImpl(object, key);
}

class ComputedRefImpl {
    constructor(getter, _setter, isReadonly) {
        this._setter = _setter;
        this._dirty = true;
        this.__v_isRef = true;
        this.effect = effect(getter, {
            lazy: true,
            scheduler: () => {
                if (!this._dirty) {
                    this._dirty = true;
                    trigger(toRaw(this), "set" /* SET */, 'value');
                }
            }
        });
        this["__v_isReadonly" /* IS_READONLY */] = isReadonly;
    }
    get value() {
        // the computed ref may get wrapped by other proxies e.g. readonly() #3376
        const self = toRaw(this);
        if (self._dirty) {
            self._value = this.effect();
            self._dirty = false;
        }
        track(self, "get" /* GET */, 'value');
        return self._value;
    }
    set value(newValue) {
        this._setter(newValue);
    }
}
function computed$1(getterOrOptions) {
    let getter;
    let setter;
    if (isFunction(getterOrOptions)) {
        getter = getterOrOptions;
        setter = NOOP;
    }
    else {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
    }
    return new ComputedRefImpl(getter, setter, isFunction(getterOrOptions) || !getterOrOptions.set);
}

const stack = [];
function warn(msg, ...args) {
    // avoid props formatting or warn handler tracking deps that might be mutated
    // during patch, leading to infinite recursion.
    pauseTracking();
    const instance = stack.length ? stack[stack.length - 1].component : null;
    const appWarnHandler = instance && instance.appContext.config.warnHandler;
    const trace = getComponentTrace();
    if (appWarnHandler) {
        callWithErrorHandling(appWarnHandler, instance, 11 /* APP_WARN_HANDLER */, [
            msg + args.join(''),
            instance && instance.proxy,
            trace
                .map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`)
                .join('\n'),
            trace
        ]);
    }
    else {
        const warnArgs = [`[Vue warn]: ${msg}`, ...args];
        /* istanbul ignore if */
        if (trace.length &&
            // avoid spamming console during tests
            !false) {
            warnArgs.push(`\n`, ...formatTrace(trace));
        }
        console.warn(...warnArgs);
    }
    resetTracking();
}
function getComponentTrace() {
    let currentVNode = stack[stack.length - 1];
    if (!currentVNode) {
        return [];
    }
    // we can't just use the stack because it will be incomplete during updates
    // that did not start from the root. Re-construct the parent chain using
    // instance parent pointers.
    const normalizedStack = [];
    while (currentVNode) {
        const last = normalizedStack[0];
        if (last && last.vnode === currentVNode) {
            last.recurseCount++;
        }
        else {
            normalizedStack.push({
                vnode: currentVNode,
                recurseCount: 0
            });
        }
        const parentInstance = currentVNode.component && currentVNode.component.parent;
        currentVNode = parentInstance && parentInstance.vnode;
    }
    return normalizedStack;
}
/* istanbul ignore next */
function formatTrace(trace) {
    const logs = [];
    trace.forEach((entry, i) => {
        logs.push(...(i === 0 ? [] : [`\n`]), ...formatTraceEntry(entry));
    });
    return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
    const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
    const isRoot = vnode.component ? vnode.component.parent == null : false;
    const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
    const close = `>` + postfix;
    return vnode.props
        ? [open, ...formatProps(vnode.props), close]
        : [open + close];
}
/* istanbul ignore next */
function formatProps(props) {
    const res = [];
    const keys = Object.keys(props);
    keys.slice(0, 3).forEach(key => {
        res.push(...formatProp(key, props[key]));
    });
    if (keys.length > 3) {
        res.push(` ...`);
    }
    return res;
}
/* istanbul ignore next */
function formatProp(key, value, raw) {
    if (isString(value)) {
        value = JSON.stringify(value);
        return raw ? value : [`${key}=${value}`];
    }
    else if (typeof value === 'number' ||
        typeof value === 'boolean' ||
        value == null) {
        return raw ? value : [`${key}=${value}`];
    }
    else if (isRef(value)) {
        value = formatProp(key, toRaw(value.value), true);
        return raw ? value : [`${key}=Ref<`, value, `>`];
    }
    else if (isFunction(value)) {
        return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
    }
    else {
        value = toRaw(value);
        return raw ? value : [`${key}=`, value];
    }
}
function callWithErrorHandling(fn, instance, type, args) {
    let res;
    try {
        res = args ? fn(...args) : fn();
    }
    catch (err) {
        handleError(err, instance, type);
    }
    return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
    if (isFunction(fn)) {
        const res = callWithErrorHandling(fn, instance, type, args);
        if (res && isPromise(res)) {
            res.catch(err => {
                handleError(err, instance, type);
            });
        }
        return res;
    }
    const values = [];
    for (let i = 0; i < fn.length; i++) {
        values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
}
function handleError(err, instance, type, throwInDev = true) {
    const contextVNode = instance ? instance.vnode : null;
    if (instance) {
        let cur = instance.parent;
        // the exposed instance is the render proxy to keep it consistent with 2.x
        const exposedInstance = instance.proxy;
        // in production the hook receives only the error code
        const errorInfo = type;
        while (cur) {
            const errorCapturedHooks = cur.ec;
            if (errorCapturedHooks) {
                for (let i = 0; i < errorCapturedHooks.length; i++) {
                    if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
                        return;
                    }
                }
            }
            cur = cur.parent;
        }
        // app-level handling
        const appErrorHandler = instance.appContext.config.errorHandler;
        if (appErrorHandler) {
            callWithErrorHandling(appErrorHandler, null, 10 /* APP_ERROR_HANDLER */, [err, exposedInstance, errorInfo]);
            return;
        }
    }
    logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
    {
        // recover in prod to reduce the impact on end-user
        console.error(err);
    }
}

let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPreFlushCbs = [];
let activePreFlushCbs = null;
let preFlushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = Promise.resolve();
let currentFlushPromise = null;
let currentPreFlushParentJob = null;
const RECURSION_LIMIT = 100;
function nextTick(fn) {
    const p = currentFlushPromise || resolvedPromise;
    return fn ? p.then(this ? fn.bind(this) : fn) : p;
}
// #2768
// Use binary-search to find a suitable position in the queue,
// so that the queue maintains the increasing order of job's id,
// which can prevent the job from being skipped and also can avoid repeated patching.
function findInsertionIndex(job) {
    // the start index should be `flushIndex + 1`
    let start = flushIndex + 1;
    let end = queue.length;
    const jobId = getId(job);
    while (start < end) {
        const middle = (start + end) >>> 1;
        const middleJobId = getId(queue[middle]);
        middleJobId < jobId ? (start = middle + 1) : (end = middle);
    }
    return start;
}
function queueJob(job) {
    // the dedupe search uses the startIndex argument of Array.includes()
    // by default the search index includes the current job that is being run
    // so it cannot recursively trigger itself again.
    // if the job is a watch() callback, the search will start with a +1 index to
    // allow it recursively trigger itself - it is the user's responsibility to
    // ensure it doesn't end up in an infinite loop.
    if ((!queue.length ||
        !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) &&
        job !== currentPreFlushParentJob) {
        const pos = findInsertionIndex(job);
        if (pos > -1) {
            queue.splice(pos, 0, job);
        }
        else {
            queue.push(job);
        }
        queueFlush();
    }
}
function queueFlush() {
    if (!isFlushing && !isFlushPending) {
        isFlushPending = true;
        currentFlushPromise = resolvedPromise.then(flushJobs);
    }
}
function invalidateJob(job) {
    const i = queue.indexOf(job);
    if (i > flushIndex) {
        queue.splice(i, 1);
    }
}
function queueCb(cb, activeQueue, pendingQueue, index) {
    if (!isArray(cb)) {
        if (!activeQueue ||
            !activeQueue.includes(cb, cb.allowRecurse ? index + 1 : index)) {
            pendingQueue.push(cb);
        }
    }
    else {
        // if cb is an array, it is a component lifecycle hook which can only be
        // triggered by a job, which is already deduped in the main queue, so
        // we can skip duplicate check here to improve perf
        pendingQueue.push(...cb);
    }
    queueFlush();
}
function queuePreFlushCb(cb) {
    queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
}
function queuePostFlushCb(cb) {
    queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
}
function flushPreFlushCbs(seen, parentJob = null) {
    if (pendingPreFlushCbs.length) {
        currentPreFlushParentJob = parentJob;
        activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
        pendingPreFlushCbs.length = 0;
        for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
            activePreFlushCbs[preFlushIndex]();
        }
        activePreFlushCbs = null;
        preFlushIndex = 0;
        currentPreFlushParentJob = null;
        // recursively flush until it drains
        flushPreFlushCbs(seen, parentJob);
    }
}
function flushPostFlushCbs(seen) {
    if (pendingPostFlushCbs.length) {
        const deduped = [...new Set(pendingPostFlushCbs)];
        pendingPostFlushCbs.length = 0;
        // #1947 already has active queue, nested flushPostFlushCbs call
        if (activePostFlushCbs) {
            activePostFlushCbs.push(...deduped);
            return;
        }
        activePostFlushCbs = deduped;
        activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
        for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
            activePostFlushCbs[postFlushIndex]();
        }
        activePostFlushCbs = null;
        postFlushIndex = 0;
    }
}
const getId = (job) => job.id == null ? Infinity : job.id;
function flushJobs(seen) {
    isFlushPending = false;
    isFlushing = true;
    flushPreFlushCbs(seen);
    // Sort queue before flush.
    // This ensures that:
    // 1. Components are updated from parent to child. (because parent is always
    //    created before the child so its render effect will have smaller
    //    priority number)
    // 2. If a component is unmounted during a parent component's update,
    //    its update can be skipped.
    queue.sort((a, b) => getId(a) - getId(b));
    try {
        for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
            const job = queue[flushIndex];
            if (job) {
                if (("production" !== 'production')) ;
                callWithErrorHandling(job, null, 14 /* SCHEDULER */);
            }
        }
    }
    finally {
        flushIndex = 0;
        queue.length = 0;
        flushPostFlushCbs();
        isFlushing = false;
        currentFlushPromise = null;
        // some postFlushCb queued jobs!
        // keep flushing until it drains.
        if (queue.length || pendingPostFlushCbs.length) {
            flushJobs(seen);
        }
    }
}
function checkRecursiveUpdates(seen, fn) {
    if (!seen.has(fn)) {
        seen.set(fn, 1);
    }
    else {
        const count = seen.get(fn);
        if (count > RECURSION_LIMIT) {
            throw new Error(`Maximum recursive updates exceeded. ` +
                `This means you have a reactive effect that is mutating its own ` +
                `dependencies and thus recursively triggering itself. Possible sources ` +
                `include component template, render function, updated hook or ` +
                `watcher source function.`);
        }
        else {
            seen.set(fn, count + 1);
        }
    }
}

let devtools;
function setDevtoolsHook(hook) {
    devtools = hook;
}
function devtoolsInitApp(app, version) {
    // TODO queue if devtools is undefined
    if (!devtools)
        return;
    devtools.emit("app:init" /* APP_INIT */, app, version, {
        Fragment,
        Text,
        Comment,
        Static
    });
}
function devtoolsUnmountApp(app) {
    if (!devtools)
        return;
    devtools.emit("app:unmount" /* APP_UNMOUNT */, app);
}
const devtoolsComponentAdded = /*#__PURE__*/ createDevtoolsComponentHook("component:added" /* COMPONENT_ADDED */);
const devtoolsComponentUpdated = /*#__PURE__*/ createDevtoolsComponentHook("component:updated" /* COMPONENT_UPDATED */);
const devtoolsComponentRemoved = /*#__PURE__*/ createDevtoolsComponentHook("component:removed" /* COMPONENT_REMOVED */);
function createDevtoolsComponentHook(hook) {
    return (component) => {
        if (!devtools)
            return;
        devtools.emit(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : undefined, component);
    };
}
function devtoolsComponentEmit(component, event, params) {
    if (!devtools)
        return;
    devtools.emit("component:emit" /* COMPONENT_EMIT */, component.appContext.app, component, event, params);
}

function emit(instance, event, ...rawArgs) {
    const props = instance.vnode.props || EMPTY_OBJ;
    let args = rawArgs;
    const isModelListener = event.startsWith('update:');
    // for v-model update:xxx events, apply modifiers on args
    const modelArg = isModelListener && event.slice(7);
    if (modelArg && modelArg in props) {
        const modifiersKey = `${modelArg === 'modelValue' ? 'model' : modelArg}Modifiers`;
        const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
        if (trim) {
            args = rawArgs.map(a => a.trim());
        }
        else if (number) {
            args = rawArgs.map(toNumber);
        }
    }
    if (__VUE_PROD_DEVTOOLS__) {
        devtoolsComponentEmit(instance, event, args);
    }
    let handlerName;
    let handler = props[(handlerName = toHandlerKey(event))] ||
        // also try camelCase event handler (#2249)
        props[(handlerName = toHandlerKey(camelize(event)))];
    // for v-model update:xxx events, also trigger kebab-case equivalent
    // for props passed via kebab-case
    if (!handler && isModelListener) {
        handler = props[(handlerName = toHandlerKey(hyphenate(event)))];
    }
    if (handler) {
        callWithAsyncErrorHandling(handler, instance, 6 /* COMPONENT_EVENT_HANDLER */, args);
    }
    const onceHandler = props[handlerName + `Once`];
    if (onceHandler) {
        if (!instance.emitted) {
            (instance.emitted = {})[handlerName] = true;
        }
        else if (instance.emitted[handlerName]) {
            return;
        }
        callWithAsyncErrorHandling(onceHandler, instance, 6 /* COMPONENT_EVENT_HANDLER */, args);
    }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
    if (!appContext.deopt && comp.__emits !== undefined) {
        return comp.__emits;
    }
    const raw = comp.emits;
    let normalized = {};
    // apply mixin/extends props
    let hasExtends = false;
    if (__VUE_OPTIONS_API__ && !isFunction(comp)) {
        const extendEmits = (raw) => {
            const normalizedFromExtend = normalizeEmitsOptions(raw, appContext, true);
            if (normalizedFromExtend) {
                hasExtends = true;
                extend(normalized, normalizedFromExtend);
            }
        };
        if (!asMixin && appContext.mixins.length) {
            appContext.mixins.forEach(extendEmits);
        }
        if (comp.extends) {
            extendEmits(comp.extends);
        }
        if (comp.mixins) {
            comp.mixins.forEach(extendEmits);
        }
    }
    if (!raw && !hasExtends) {
        return (comp.__emits = null);
    }
    if (isArray(raw)) {
        raw.forEach(key => (normalized[key] = null));
    }
    else {
        extend(normalized, raw);
    }
    return (comp.__emits = normalized);
}
// Check if an incoming prop key is a declared emit event listener.
// e.g. With `emits: { click: null }`, props named `onClick` and `onclick` are
// both considered matched listeners.
function isEmitListener(options, key) {
    if (!options || !isOn(key)) {
        return false;
    }
    key = key.slice(2).replace(/Once$/, '');
    return (hasOwn(options, key[0].toLowerCase() + key.slice(1)) ||
        hasOwn(options, hyphenate(key)) ||
        hasOwn(options, key));
}

let isRenderingCompiledSlot = 0;
const setCompiledSlotRendering = (n) => (isRenderingCompiledSlot += n);

/**
 * mark the current rendering instance for asset resolution (e.g.
 * resolveComponent, resolveDirective) during render
 */
let currentRenderingInstance = null;
let currentScopeId = null;
/**
 * Note: rendering calls maybe nested. The function returns the parent rendering
 * instance if present, which should be restored after the render is done:
 *
 * ```js
 * const prev = setCurrentRenderingInstance(i)
 * // ...render
 * setCurrentRenderingInstance(prev)
 * ```
 */
function setCurrentRenderingInstance(instance) {
    const prev = currentRenderingInstance;
    currentRenderingInstance = instance;
    currentScopeId = (instance && instance.type.__scopeId) || null;
    return prev;
}
/**
 * Set scope id when creating hoisted vnodes.
 * @private compiler helper
 */
function pushScopeId(id) {
    currentScopeId = id;
}
/**
 * Technically we no longer need this after 3.0.8 but we need to keep the same
 * API for backwards compat w/ code generated by compilers.
 * @private
 */
function popScopeId() {
    currentScopeId = null;
}
/**
 * Wrap a slot function to memoize current rendering instance
 * @private compiler helper
 */
function withCtx(fn, ctx = currentRenderingInstance) {
    if (!ctx)
        return fn;
    const renderFnWithContext = (...args) => {
        // If a user calls a compiled slot inside a template expression (#1745), it
        // can mess up block tracking, so by default we need to push a null block to
        // avoid that. This isn't necessary if rendering a compiled `<slot>`.
        if (!isRenderingCompiledSlot) {
            openBlock(true /* null block that disables tracking */);
        }
        const prevInstance = setCurrentRenderingInstance(ctx);
        const res = fn(...args);
        setCurrentRenderingInstance(prevInstance);
        if (!isRenderingCompiledSlot) {
            closeBlock();
        }
        return res;
    };
    // mark this as a compiled slot function.
    // this is used in vnode.ts -> normalizeChildren() to set the slot
    // rendering flag.
    renderFnWithContext._c = true;
    return renderFnWithContext;
}

/**
 * dev only flag to track whether $attrs was used during render.
 * If $attrs was used during render then the warning for failed attrs
 * fallthrough can be suppressed.
 */
let accessedAttrs = false;
function markAttrsAccessed() {
    accessedAttrs = true;
}
function renderComponentRoot(instance) {
    const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit, render, renderCache, data, setupState, ctx } = instance;
    let result;
    const prev = setCurrentRenderingInstance(instance);
    try {
        let fallthroughAttrs;
        if (vnode.shapeFlag & 4 /* STATEFUL_COMPONENT */) {
            // withProxy is a proxy with a different `has` trap only for
            // runtime-compiled render functions using `with` block.
            const proxyToUse = withProxy || proxy;
            result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
            fallthroughAttrs = attrs;
        }
        else {
            // functional
            const render = Component;
            // in dev, mark attrs accessed if optional props (attrs === props)
            if (("production" !== 'production') && attrs === props) ;
            result = normalizeVNode(render.length > 1
                ? render(props, ("production" !== 'production')
                    ? {
                        get attrs() {
                            markAttrsAccessed();
                            return attrs;
                        },
                        slots,
                        emit
                    }
                    : { attrs, slots, emit })
                : render(props, null /* we know it doesn't need it */));
            fallthroughAttrs = Component.props
                ? attrs
                : getFunctionalFallthrough(attrs);
        }
        // attr merging
        // in dev mode, comments are preserved, and it's possible for a template
        // to have comments along side the root element which makes it a fragment
        let root = result;
        let setRoot = undefined;
        if (("production" !== 'production') &&
            result.patchFlag > 0 &&
            result.patchFlag & 2048 /* DEV_ROOT_FRAGMENT */) ;
        if (Component.inheritAttrs !== false && fallthroughAttrs) {
            const keys = Object.keys(fallthroughAttrs);
            const { shapeFlag } = root;
            if (keys.length) {
                if (shapeFlag & 1 /* ELEMENT */ ||
                    shapeFlag & 6 /* COMPONENT */) {
                    if (propsOptions && keys.some(isModelListener)) {
                        // If a v-model listener (onUpdate:xxx) has a corresponding declared
                        // prop, it indicates this component expects to handle v-model and
                        // it should not fallthrough.
                        // related: #1543, #1643, #1989
                        fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
                    }
                    root = cloneVNode(root, fallthroughAttrs);
                }
                else if (("production" !== 'production') && !accessedAttrs && root.type !== Comment) ;
            }
        }
        // inherit directives
        if (vnode.dirs) {
            if (("production" !== 'production') && !isElementRoot(root)) ;
            root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
        }
        // inherit transition data
        if (vnode.transition) {
            if (("production" !== 'production') && !isElementRoot(root)) ;
            root.transition = vnode.transition;
        }
        if (("production" !== 'production') && setRoot) ;
        else {
            result = root;
        }
    }
    catch (err) {
        blockStack.length = 0;
        handleError(err, instance, 1 /* RENDER_FUNCTION */);
        result = createVNode(Comment);
    }
    setCurrentRenderingInstance(prev);
    return result;
}
/**
 * dev only
 * In dev mode, template root level comments are rendered, which turns the
 * template into a fragment root, but we need to locate the single element
 * root for attrs and scope id processing.
 */
const getChildRoot = (vnode) => {
    const rawChildren = vnode.children;
    const dynamicChildren = vnode.dynamicChildren;
    const childRoot = filterSingleRoot(rawChildren);
    if (!childRoot) {
        return [vnode, undefined];
    }
    const index = rawChildren.indexOf(childRoot);
    const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
    const setRoot = (updatedRoot) => {
        rawChildren[index] = updatedRoot;
        if (dynamicChildren) {
            if (dynamicIndex > -1) {
                dynamicChildren[dynamicIndex] = updatedRoot;
            }
            else if (updatedRoot.patchFlag > 0) {
                vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
            }
        }
    };
    return [normalizeVNode(childRoot), setRoot];
};
function filterSingleRoot(children) {
    let singleRoot;
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (isVNode(child)) {
            // ignore user comment
            if (child.type !== Comment || child.children === 'v-if') {
                if (singleRoot) {
                    // has more than 1 non-comment child, return now
                    return;
                }
                else {
                    singleRoot = child;
                }
            }
        }
        else {
            return;
        }
    }
    return singleRoot;
}
const getFunctionalFallthrough = (attrs) => {
    let res;
    for (const key in attrs) {
        if (key === 'class' || key === 'style' || isOn(key)) {
            (res || (res = {}))[key] = attrs[key];
        }
    }
    return res;
};
const filterModelListeners = (attrs, props) => {
    const res = {};
    for (const key in attrs) {
        if (!isModelListener(key) || !(key.slice(9) in props)) {
            res[key] = attrs[key];
        }
    }
    return res;
};
const isElementRoot = (vnode) => {
    return (vnode.shapeFlag & 6 /* COMPONENT */ ||
        vnode.shapeFlag & 1 /* ELEMENT */ ||
        vnode.type === Comment // potential v-if branch switch
    );
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
    const { props: prevProps, children: prevChildren, component } = prevVNode;
    const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
    const emits = component.emitsOptions;
    // force child update for runtime directive or transition on component vnode.
    if (nextVNode.dirs || nextVNode.transition) {
        return true;
    }
    if (optimized && patchFlag >= 0) {
        if (patchFlag & 1024 /* DYNAMIC_SLOTS */) {
            // slot content that references values that might have changed,
            // e.g. in a v-for
            return true;
        }
        if (patchFlag & 16 /* FULL_PROPS */) {
            if (!prevProps) {
                return !!nextProps;
            }
            // presence of this flag indicates props are always non-null
            return hasPropsChanged(prevProps, nextProps, emits);
        }
        else if (patchFlag & 8 /* PROPS */) {
            const dynamicProps = nextVNode.dynamicProps;
            for (let i = 0; i < dynamicProps.length; i++) {
                const key = dynamicProps[i];
                if (nextProps[key] !== prevProps[key] &&
                    !isEmitListener(emits, key)) {
                    return true;
                }
            }
        }
    }
    else {
        // this path is only taken by manually written render functions
        // so presence of any children leads to a forced update
        if (prevChildren || nextChildren) {
            if (!nextChildren || !nextChildren.$stable) {
                return true;
            }
        }
        if (prevProps === nextProps) {
            return false;
        }
        if (!prevProps) {
            return !!nextProps;
        }
        if (!nextProps) {
            return true;
        }
        return hasPropsChanged(prevProps, nextProps, emits);
    }
    return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
    const nextKeys = Object.keys(nextProps);
    if (nextKeys.length !== Object.keys(prevProps).length) {
        return true;
    }
    for (let i = 0; i < nextKeys.length; i++) {
        const key = nextKeys[i];
        if (nextProps[key] !== prevProps[key] &&
            !isEmitListener(emitsOptions, key)) {
            return true;
        }
    }
    return false;
}
function updateHOCHostEl({ vnode, parent }, el // HostNode
) {
    while (parent && parent.subTree === vnode) {
        (vnode = parent.vnode).el = el;
        parent = parent.parent;
    }
}

const isSuspense = (type) => type.__isSuspense;
function normalizeSuspenseChildren(vnode) {
    const { shapeFlag, children } = vnode;
    let content;
    let fallback;
    if (shapeFlag & 32 /* SLOTS_CHILDREN */) {
        content = normalizeSuspenseSlot(children.default);
        fallback = normalizeSuspenseSlot(children.fallback);
    }
    else {
        content = normalizeSuspenseSlot(children);
        fallback = normalizeVNode(null);
    }
    return {
        content,
        fallback
    };
}
function normalizeSuspenseSlot(s) {
    if (isFunction(s)) {
        s = s();
    }
    if (isArray(s)) {
        const singleChild = filterSingleRoot(s);
        s = singleChild;
    }
    return normalizeVNode(s);
}
function queueEffectWithSuspense(fn, suspense) {
    if (suspense && suspense.pendingBranch) {
        if (isArray(fn)) {
            suspense.effects.push(...fn);
        }
        else {
            suspense.effects.push(fn);
        }
    }
    else {
        queuePostFlushCb(fn);
    }
}

function initProps(instance, rawProps, isStateful, // result of bitwise flag comparison
isSSR = false) {
    const props = {};
    const attrs = {};
    def(attrs, InternalObjectKey, 1);
    instance.propsDefaults = Object.create(null);
    setFullProps(instance, rawProps, props, attrs);
    if (isStateful) {
        // stateful
        instance.props = isSSR ? props : shallowReactive(props);
    }
    else {
        if (!instance.type.props) {
            // functional w/ optional props, props === attrs
            instance.props = attrs;
        }
        else {
            // functional w/ declared props
            instance.props = props;
        }
    }
    instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
    const { props, attrs, vnode: { patchFlag } } = instance;
    const rawCurrentProps = toRaw(props);
    const [options] = instance.propsOptions;
    if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (optimized || patchFlag > 0) &&
        !(patchFlag & 16 /* FULL_PROPS */)) {
        if (patchFlag & 8 /* PROPS */) {
            // Compiler-generated props & no keys change, just set the updated
            // the props.
            const propsToUpdate = instance.vnode.dynamicProps;
            for (let i = 0; i < propsToUpdate.length; i++) {
                const key = propsToUpdate[i];
                // PROPS flag guarantees rawProps to be non-null
                const value = rawProps[key];
                if (options) {
                    // attr / props separation was done on init and will be consistent
                    // in this code path, so just check if attrs have it.
                    if (hasOwn(attrs, key)) {
                        attrs[key] = value;
                    }
                    else {
                        const camelizedKey = camelize(key);
                        props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance);
                    }
                }
                else {
                    attrs[key] = value;
                }
            }
        }
    }
    else {
        // full props update.
        setFullProps(instance, rawProps, props, attrs);
        // in case of dynamic props, check if we need to delete keys from
        // the props object
        let kebabKey;
        for (const key in rawCurrentProps) {
            if (!rawProps ||
                // for camelCase
                (!hasOwn(rawProps, key) &&
                    // it's possible the original props was passed in as kebab-case
                    // and converted to camelCase (#955)
                    ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey)))) {
                if (options) {
                    if (rawPrevProps &&
                        // for camelCase
                        (rawPrevProps[key] !== undefined ||
                            // for kebab-case
                            rawPrevProps[kebabKey] !== undefined)) {
                        props[key] = resolvePropValue(options, rawProps || EMPTY_OBJ, key, undefined, instance);
                    }
                }
                else {
                    delete props[key];
                }
            }
        }
        // in the case of functional component w/o props declaration, props and
        // attrs point to the same object so it should already have been updated.
        if (attrs !== rawCurrentProps) {
            for (const key in attrs) {
                if (!rawProps || !hasOwn(rawProps, key)) {
                    delete attrs[key];
                }
            }
        }
    }
    // trigger updates for $attrs in case it's used in component slots
    trigger(instance, "set" /* SET */, '$attrs');
}
function setFullProps(instance, rawProps, props, attrs) {
    const [options, needCastKeys] = instance.propsOptions;
    if (rawProps) {
        for (const key in rawProps) {
            const value = rawProps[key];
            // key, ref are reserved and never passed down
            if (isReservedProp(key)) {
                continue;
            }
            // prop option names are camelized during normalization, so to support
            // kebab -> camel conversion here we need to camelize the key.
            let camelKey;
            if (options && hasOwn(options, (camelKey = camelize(key)))) {
                props[camelKey] = value;
            }
            else if (!isEmitListener(instance.emitsOptions, key)) {
                // Any non-declared (either as a prop or an emitted event) props are put
                // into a separate `attrs` object for spreading. Make sure to preserve
                // original key casing
                attrs[key] = value;
            }
        }
    }
    if (needCastKeys) {
        const rawCurrentProps = toRaw(props);
        for (let i = 0; i < needCastKeys.length; i++) {
            const key = needCastKeys[i];
            props[key] = resolvePropValue(options, rawCurrentProps, key, rawCurrentProps[key], instance);
        }
    }
}
function resolvePropValue(options, props, key, value, instance) {
    const opt = options[key];
    if (opt != null) {
        const hasDefault = hasOwn(opt, 'default');
        // default values
        if (hasDefault && value === undefined) {
            const defaultValue = opt.default;
            if (opt.type !== Function && isFunction(defaultValue)) {
                const { propsDefaults } = instance;
                if (key in propsDefaults) {
                    value = propsDefaults[key];
                }
                else {
                    setCurrentInstance(instance);
                    value = propsDefaults[key] = defaultValue(props);
                    setCurrentInstance(null);
                }
            }
            else {
                value = defaultValue;
            }
        }
        // boolean casting
        if (opt[0 /* shouldCast */]) {
            if (!hasOwn(props, key) && !hasDefault) {
                value = false;
            }
            else if (opt[1 /* shouldCastTrue */] &&
                (value === '' || value === hyphenate(key))) {
                value = true;
            }
        }
    }
    return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
    if (!appContext.deopt && comp.__props) {
        return comp.__props;
    }
    const raw = comp.props;
    const normalized = {};
    const needCastKeys = [];
    // apply mixin/extends props
    let hasExtends = false;
    if (__VUE_OPTIONS_API__ && !isFunction(comp)) {
        const extendProps = (raw) => {
            hasExtends = true;
            const [props, keys] = normalizePropsOptions(raw, appContext, true);
            extend(normalized, props);
            if (keys)
                needCastKeys.push(...keys);
        };
        if (!asMixin && appContext.mixins.length) {
            appContext.mixins.forEach(extendProps);
        }
        if (comp.extends) {
            extendProps(comp.extends);
        }
        if (comp.mixins) {
            comp.mixins.forEach(extendProps);
        }
    }
    if (!raw && !hasExtends) {
        return (comp.__props = EMPTY_ARR);
    }
    if (isArray(raw)) {
        for (let i = 0; i < raw.length; i++) {
            const normalizedKey = camelize(raw[i]);
            if (validatePropName(normalizedKey)) {
                normalized[normalizedKey] = EMPTY_OBJ;
            }
        }
    }
    else if (raw) {
        for (const key in raw) {
            const normalizedKey = camelize(key);
            if (validatePropName(normalizedKey)) {
                const opt = raw[key];
                const prop = (normalized[normalizedKey] =
                    isArray(opt) || isFunction(opt) ? { type: opt } : opt);
                if (prop) {
                    const booleanIndex = getTypeIndex(Boolean, prop.type);
                    const stringIndex = getTypeIndex(String, prop.type);
                    prop[0 /* shouldCast */] = booleanIndex > -1;
                    prop[1 /* shouldCastTrue */] =
                        stringIndex < 0 || booleanIndex < stringIndex;
                    // if the prop needs boolean casting or default value
                    if (booleanIndex > -1 || hasOwn(prop, 'default')) {
                        needCastKeys.push(normalizedKey);
                    }
                }
            }
        }
    }
    return (comp.__props = [normalized, needCastKeys]);
}
function validatePropName(key) {
    if (key[0] !== '$') {
        return true;
    }
    return false;
}
// use function string name to check type constructors
// so that it works across vms / iframes.
function getType(ctor) {
    const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
    return match ? match[1] : '';
}
function isSameType(a, b) {
    return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
    if (isArray(expectedTypes)) {
        return expectedTypes.findIndex(t => isSameType(t, type));
    }
    else if (isFunction(expectedTypes)) {
        return isSameType(expectedTypes, type) ? 0 : -1;
    }
    return -1;
}

function injectHook(type, hook, target = currentInstance, prepend = false) {
    if (target) {
        const hooks = target[type] || (target[type] = []);
        // cache the error handling wrapper for injected hooks so the same hook
        // can be properly deduped by the scheduler. "__weh" stands for "with error
        // handling".
        const wrappedHook = hook.__weh ||
            (hook.__weh = (...args) => {
                if (target.isUnmounted) {
                    return;
                }
                // disable tracking inside all lifecycle hooks
                // since they can potentially be called inside effects.
                pauseTracking();
                // Set currentInstance during hook invocation.
                // This assumes the hook does not synchronously trigger other hooks, which
                // can only be false when the user does something really funky.
                setCurrentInstance(target);
                const res = callWithAsyncErrorHandling(hook, target, type, args);
                setCurrentInstance(null);
                resetTracking();
                return res;
            });
        if (prepend) {
            hooks.unshift(wrappedHook);
        }
        else {
            hooks.push(wrappedHook);
        }
        return wrappedHook;
    }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => 
// post-create lifecycle registrations are noops during SSR
!isInSSRComponentSetup && injectHook(lifecycle, hook, target);
const onBeforeMount = createHook("bm" /* BEFORE_MOUNT */);
const onMounted = createHook("m" /* MOUNTED */);
const onBeforeUpdate = createHook("bu" /* BEFORE_UPDATE */);
const onUpdated = createHook("u" /* UPDATED */);
const onBeforeUnmount = createHook("bum" /* BEFORE_UNMOUNT */);
const onUnmounted = createHook("um" /* UNMOUNTED */);
const onRenderTriggered = createHook("rtg" /* RENDER_TRIGGERED */);
const onRenderTracked = createHook("rtc" /* RENDER_TRACKED */);
const onErrorCaptured = (hook, target = currentInstance) => {
    injectHook("ec" /* ERROR_CAPTURED */, hook, target);
};
// initial value for watchers to trigger on undefined initial values
const INITIAL_WATCHER_VALUE = {};
// implementation
function watch(source, cb, options) {
    return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ, instance = currentInstance) {
    let getter;
    let forceTrigger = false;
    if (isRef(source)) {
        getter = () => source.value;
        forceTrigger = !!source._shallow;
    }
    else if (isReactive(source)) {
        getter = () => source;
        deep = true;
    }
    else if (isArray(source)) {
        getter = () => source.map(s => {
            if (isRef(s)) {
                return s.value;
            }
            else if (isReactive(s)) {
                return traverse(s);
            }
            else if (isFunction(s)) {
                return callWithErrorHandling(s, instance, 2 /* WATCH_GETTER */, [
                    instance && instance.proxy
                ]);
            }
            else ;
        });
    }
    else if (isFunction(source)) {
        if (cb) {
            // getter with cb
            getter = () => callWithErrorHandling(source, instance, 2 /* WATCH_GETTER */, [
                instance && instance.proxy
            ]);
        }
        else {
            // no cb -> simple effect
            getter = () => {
                if (instance && instance.isUnmounted) {
                    return;
                }
                if (cleanup) {
                    cleanup();
                }
                return callWithAsyncErrorHandling(source, instance, 3 /* WATCH_CALLBACK */, [onInvalidate]);
            };
        }
    }
    else {
        getter = NOOP;
    }
    if (cb && deep) {
        const baseGetter = getter;
        getter = () => traverse(baseGetter());
    }
    let cleanup;
    let onInvalidate = (fn) => {
        cleanup = runner.options.onStop = () => {
            callWithErrorHandling(fn, instance, 4 /* WATCH_CLEANUP */);
        };
    };
    let oldValue = isArray(source) ? [] : INITIAL_WATCHER_VALUE;
    const job = () => {
        if (!runner.active) {
            return;
        }
        if (cb) {
            // watch(source, cb)
            const newValue = runner();
            if (deep || forceTrigger || hasChanged(newValue, oldValue)) {
                // cleanup before running cb again
                if (cleanup) {
                    cleanup();
                }
                callWithAsyncErrorHandling(cb, instance, 3 /* WATCH_CALLBACK */, [
                    newValue,
                    // pass undefined as the old value when it's changed for the first time
                    oldValue === INITIAL_WATCHER_VALUE ? undefined : oldValue,
                    onInvalidate
                ]);
                oldValue = newValue;
            }
        }
        else {
            // watchEffect
            runner();
        }
    };
    // important: mark the job as a watcher callback so that scheduler knows
    // it is allowed to self-trigger (#1727)
    job.allowRecurse = !!cb;
    let scheduler;
    if (flush === 'sync') {
        scheduler = job;
    }
    else if (flush === 'post') {
        scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
    }
    else {
        // default: 'pre'
        scheduler = () => {
            if (!instance || instance.isMounted) {
                queuePreFlushCb(job);
            }
            else {
                // with 'pre' option, the first call must happen before
                // the component is mounted so it is called synchronously.
                job();
            }
        };
    }
    const runner = effect(getter, {
        lazy: true,
        onTrack,
        onTrigger,
        scheduler
    });
    recordInstanceBoundEffect(runner, instance);
    // initial run
    if (cb) {
        if (immediate) {
            job();
        }
        else {
            oldValue = runner();
        }
    }
    else if (flush === 'post') {
        queuePostRenderEffect(runner, instance && instance.suspense);
    }
    else {
        runner();
    }
    return () => {
        stop(runner);
        if (instance) {
            remove(instance.effects, runner);
        }
    };
}
// this.$watch
function instanceWatch(source, cb, options) {
    const publicThis = this.proxy;
    const getter = isString(source)
        ? () => publicThis[source]
        : source.bind(publicThis);
    return doWatch(getter, cb.bind(publicThis), options, this);
}
function traverse(value, seen = new Set()) {
    if (!isObject(value) || seen.has(value)) {
        return value;
    }
    seen.add(value);
    if (isRef(value)) {
        traverse(value.value, seen);
    }
    else if (isArray(value)) {
        for (let i = 0; i < value.length; i++) {
            traverse(value[i], seen);
        }
    }
    else if (isSet(value) || isMap(value)) {
        value.forEach((v) => {
            traverse(v, seen);
        });
    }
    else {
        for (const key in value) {
            traverse(value[key], seen);
        }
    }
    return value;
}

const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
    registerKeepAliveHook(hook, "a" /* ACTIVATED */, target);
}
function onDeactivated(hook, target) {
    registerKeepAliveHook(hook, "da" /* DEACTIVATED */, target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
    // cache the deactivate branch check wrapper for injected hooks so the same
    // hook can be properly deduped by the scheduler. "__wdc" stands for "with
    // deactivation check".
    const wrappedHook = hook.__wdc ||
        (hook.__wdc = () => {
            // only fire the hook if the target instance is NOT in a deactivated branch.
            let current = target;
            while (current) {
                if (current.isDeactivated) {
                    return;
                }
                current = current.parent;
            }
            hook();
        });
    injectHook(type, wrappedHook, target);
    // In addition to registering it on the target instance, we walk up the parent
    // chain and register it on all ancestor instances that are keep-alive roots.
    // This avoids the need to walk the entire component tree when invoking these
    // hooks, and more importantly, avoids the need to track child components in
    // arrays.
    if (target) {
        let current = target.parent;
        while (current && current.parent) {
            if (isKeepAlive(current.parent.vnode)) {
                injectToKeepAliveRoot(wrappedHook, type, target, current);
            }
            current = current.parent;
        }
    }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
    // injectHook wraps the original for error handling, so make sure to remove
    // the wrapped version.
    const injected = injectHook(type, hook, keepAliveRoot, true /* prepend */);
    onUnmounted(() => {
        remove(keepAliveRoot[type], injected);
    }, target);
}

const isInternalKey = (key) => key[0] === '_' || key === '$stable';
const normalizeSlotValue = (value) => isArray(value)
    ? value.map(normalizeVNode)
    : [normalizeVNode(value)];
const normalizeSlot = (key, rawSlot, ctx) => withCtx((props) => {
    return normalizeSlotValue(rawSlot(props));
}, ctx);
const normalizeObjectSlots = (rawSlots, slots) => {
    const ctx = rawSlots._ctx;
    for (const key in rawSlots) {
        if (isInternalKey(key))
            continue;
        const value = rawSlots[key];
        if (isFunction(value)) {
            slots[key] = normalizeSlot(key, value, ctx);
        }
        else if (value != null) {
            const normalized = normalizeSlotValue(value);
            slots[key] = () => normalized;
        }
    }
};
const normalizeVNodeSlots = (instance, children) => {
    const normalized = normalizeSlotValue(children);
    instance.slots.default = () => normalized;
};
const initSlots = (instance, children) => {
    if (instance.vnode.shapeFlag & 32 /* SLOTS_CHILDREN */) {
        const type = children._;
        if (type) {
            instance.slots = children;
            // make compiler marker non-enumerable
            def(children, '_', type);
        }
        else {
            normalizeObjectSlots(children, (instance.slots = {}));
        }
    }
    else {
        instance.slots = {};
        if (children) {
            normalizeVNodeSlots(instance, children);
        }
    }
    def(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children, optimized) => {
    const { vnode, slots } = instance;
    let needDeletionCheck = true;
    let deletionComparisonTarget = EMPTY_OBJ;
    if (vnode.shapeFlag & 32 /* SLOTS_CHILDREN */) {
        const type = children._;
        if (type) {
            // compiled slots.
            if (optimized && type === 1 /* STABLE */) {
                // compiled AND stable.
                // no need to update, and skip stale slots removal.
                needDeletionCheck = false;
            }
            else {
                // compiled but dynamic (v-if/v-for on slots) - update slots, but skip
                // normalization.
                extend(slots, children);
                // #2893
                // when rendering the optimized slots by manually written render function,
                // we need to delete the `slots._` flag if necessary to make subsequent updates reliable,
                // i.e. let the `renderSlot` create the bailed Fragment
                if (!optimized && type === 1 /* STABLE */) {
                    delete slots._;
                }
            }
        }
        else {
            needDeletionCheck = !children.$stable;
            normalizeObjectSlots(children, slots);
        }
        deletionComparisonTarget = children;
    }
    else if (children) {
        // non slot object children (direct value) passed to a component
        normalizeVNodeSlots(instance, children);
        deletionComparisonTarget = { default: 1 };
    }
    // delete stale slots
    if (needDeletionCheck) {
        for (const key in slots) {
            if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
                delete slots[key];
            }
        }
    }
};
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
    const bindings = vnode.dirs;
    const oldBindings = prevVNode && prevVNode.dirs;
    for (let i = 0; i < bindings.length; i++) {
        const binding = bindings[i];
        if (oldBindings) {
            binding.oldValue = oldBindings[i].value;
        }
        const hook = binding.dir[name];
        if (hook) {
            callWithAsyncErrorHandling(hook, instance, 8 /* DIRECTIVE_HOOK */, [
                vnode.el,
                binding,
                vnode,
                prevVNode
            ]);
        }
    }
}

function createAppContext() {
    return {
        app: null,
        config: {
            isNativeTag: NO,
            performance: false,
            globalProperties: {},
            optionMergeStrategies: {},
            isCustomElement: NO,
            errorHandler: undefined,
            warnHandler: undefined
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null)
    };
}
let uid = 0;
function createAppAPI(render, hydrate) {
    return function createApp(rootComponent, rootProps = null) {
        if (rootProps != null && !isObject(rootProps)) {
            rootProps = null;
        }
        const context = createAppContext();
        const installedPlugins = new Set();
        let isMounted = false;
        const app = (context.app = {
            _uid: uid++,
            _component: rootComponent,
            _props: rootProps,
            _container: null,
            _context: context,
            version,
            get config() {
                return context.config;
            },
            set config(v) {
            },
            use(plugin, ...options) {
                if (installedPlugins.has(plugin)) ;
                else if (plugin && isFunction(plugin.install)) {
                    installedPlugins.add(plugin);
                    plugin.install(app, ...options);
                }
                else if (isFunction(plugin)) {
                    installedPlugins.add(plugin);
                    plugin(app, ...options);
                }
                else ;
                return app;
            },
            mixin(mixin) {
                if (__VUE_OPTIONS_API__) {
                    if (!context.mixins.includes(mixin)) {
                        context.mixins.push(mixin);
                        // global mixin with props/emits de-optimizes props/emits
                        // normalization caching.
                        if (mixin.props || mixin.emits) {
                            context.deopt = true;
                        }
                    }
                }
                return app;
            },
            component(name, component) {
                if (!component) {
                    return context.components[name];
                }
                context.components[name] = component;
                return app;
            },
            directive(name, directive) {
                if (!directive) {
                    return context.directives[name];
                }
                context.directives[name] = directive;
                return app;
            },
            mount(rootContainer, isHydrate, isSVG) {
                if (!isMounted) {
                    const vnode = createVNode(rootComponent, rootProps);
                    // store app context on the root VNode.
                    // this will be set on the root instance on initial mount.
                    vnode.appContext = context;
                    if (isHydrate && hydrate) {
                        hydrate(vnode, rootContainer);
                    }
                    else {
                        render(vnode, rootContainer, isSVG);
                    }
                    isMounted = true;
                    app._container = rootContainer;
                    rootContainer.__vue_app__ = app;
                    if (__VUE_PROD_DEVTOOLS__) {
                        devtoolsInitApp(app, version);
                    }
                    return vnode.component.proxy;
                }
            },
            unmount() {
                if (isMounted) {
                    render(null, app._container);
                    if (__VUE_PROD_DEVTOOLS__) {
                        devtoolsUnmountApp(app);
                    }
                    delete app._container.__vue_app__;
                }
            },
            provide(key, value) {
                // TypeScript doesn't allow symbols as index type
                // https://github.com/Microsoft/TypeScript/issues/24587
                context.provides[key] = value;
                return app;
            }
        });
        return app;
    };
}

/**
 * This is only called in esm-bundler builds.
 * It is called when a renderer is created, in `baseCreateRenderer` so that
 * importing runtime-core is side-effects free.
 *
 * istanbul-ignore-next
 */
function initFeatureFlags() {
    if (typeof __VUE_OPTIONS_API__ !== 'boolean') {
        getGlobalThis().__VUE_OPTIONS_API__ = true;
    }
    if (typeof __VUE_PROD_DEVTOOLS__ !== 'boolean') {
        getGlobalThis().__VUE_PROD_DEVTOOLS__ = false;
    }
}

const isAsyncWrapper = (i) => !!i.type.__asyncLoader;

const prodEffectOptions = {
    scheduler: queueJob,
    // #1801, #2043 component render effects should allow recursive updates
    allowRecurse: true
};
const queuePostRenderEffect = queueEffectWithSuspense
    ;
const setRef = (rawRef, oldRawRef, parentSuspense, vnode) => {
    if (isArray(rawRef)) {
        rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode));
        return;
    }
    let value;
    if (!vnode) {
        // means unmount
        value = null;
    }
    else if (isAsyncWrapper(vnode)) {
        // when mounting async components, nothing needs to be done,
        // because the template ref is forwarded to inner component
        return;
    }
    else if (vnode.shapeFlag & 4 /* STATEFUL_COMPONENT */) {
        value = vnode.component.exposed || vnode.component.proxy;
    }
    else {
        value = vnode.el;
    }
    const { i: owner, r: ref } = rawRef;
    const oldRef = oldRawRef && oldRawRef.r;
    const refs = owner.refs === EMPTY_OBJ ? (owner.refs = {}) : owner.refs;
    const setupState = owner.setupState;
    // unset old ref
    if (oldRef != null && oldRef !== ref) {
        if (isString(oldRef)) {
            refs[oldRef] = null;
            if (hasOwn(setupState, oldRef)) {
                setupState[oldRef] = null;
            }
        }
        else if (isRef(oldRef)) {
            oldRef.value = null;
        }
    }
    if (isString(ref)) {
        const doSet = () => {
            refs[ref] = value;
            if (hasOwn(setupState, ref)) {
                setupState[ref] = value;
            }
        };
        // #1789: for non-null values, set them after render
        // null values means this is unmount and it should not overwrite another
        // ref with the same key
        if (value) {
            doSet.id = -1;
            queuePostRenderEffect(doSet, parentSuspense);
        }
        else {
            doSet();
        }
    }
    else if (isRef(ref)) {
        const doSet = () => {
            ref.value = value;
        };
        if (value) {
            doSet.id = -1;
            queuePostRenderEffect(doSet, parentSuspense);
        }
        else {
            doSet();
        }
    }
    else if (isFunction(ref)) {
        callWithErrorHandling(ref, owner, 12 /* FUNCTION_REF */, [value, refs]);
    }
    else ;
};
/**
 * The createRenderer function accepts two generic arguments:
 * HostNode and HostElement, corresponding to Node and Element types in the
 * host environment. For example, for runtime-dom, HostNode would be the DOM
 * `Node` interface and HostElement would be the DOM `Element` interface.
 *
 * Custom renderers can pass in the platform specific types like this:
 *
 * ``` js
 * const { render, createApp } = createRenderer<Node, Element>({
 *   patchProp,
 *   ...nodeOps
 * })
 * ```
 */
function createRenderer(options) {
    return baseCreateRenderer(options);
}
// implementation
function baseCreateRenderer(options, createHydrationFns) {
    // compile-time feature flags check
    {
        initFeatureFlags();
    }
    if (__VUE_PROD_DEVTOOLS__) {
        const target = getGlobalThis();
        target.__VUE__ = true;
        setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__);
    }
    const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, forcePatchProp: hostForcePatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, cloneNode: hostCloneNode, insertStaticContent: hostInsertStaticContent } = options;
    // Note: functions inside this closure should use `const xxx = () => {}`
    // style in order to prevent being inlined by minifiers.
    const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = false) => {
        // patching & not same type, unmount old tree
        if (n1 && !isSameVNodeType(n1, n2)) {
            anchor = getNextHostNode(n1);
            unmount(n1, parentComponent, parentSuspense, true);
            n1 = null;
        }
        if (n2.patchFlag === -2 /* BAIL */) {
            optimized = false;
            n2.dynamicChildren = null;
        }
        const { type, ref, shapeFlag } = n2;
        switch (type) {
            case Text:
                processText(n1, n2, container, anchor);
                break;
            case Comment:
                processCommentNode(n1, n2, container, anchor);
                break;
            case Static:
                if (n1 == null) {
                    mountStaticNode(n2, container, anchor, isSVG);
                }
                break;
            case Fragment:
                processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                break;
            default:
                if (shapeFlag & 1 /* ELEMENT */) {
                    processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                }
                else if (shapeFlag & 6 /* COMPONENT */) {
                    processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                }
                else if (shapeFlag & 64 /* TELEPORT */) {
                    type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
                }
                else if (shapeFlag & 128 /* SUSPENSE */) {
                    type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
                }
                else ;
        }
        // set ref
        if (ref != null && parentComponent) {
            setRef(ref, n1 && n1.ref, parentSuspense, n2);
        }
    };
    const processText = (n1, n2, container, anchor) => {
        if (n1 == null) {
            hostInsert((n2.el = hostCreateText(n2.children)), container, anchor);
        }
        else {
            const el = (n2.el = n1.el);
            if (n2.children !== n1.children) {
                hostSetText(el, n2.children);
            }
        }
    };
    const processCommentNode = (n1, n2, container, anchor) => {
        if (n1 == null) {
            hostInsert((n2.el = hostCreateComment(n2.children || '')), container, anchor);
        }
        else {
            // there's no support for dynamic comments
            n2.el = n1.el;
        }
    };
    const mountStaticNode = (n2, container, anchor, isSVG) => {
        [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
    };
    const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
        let next;
        while (el && el !== anchor) {
            next = hostNextSibling(el);
            hostInsert(el, container, nextSibling);
            el = next;
        }
        hostInsert(anchor, container, nextSibling);
    };
    const removeStaticNode = ({ el, anchor }) => {
        let next;
        while (el && el !== anchor) {
            next = hostNextSibling(el);
            hostRemove(el);
            el = next;
        }
        hostRemove(anchor);
    };
    const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        isSVG = isSVG || n2.type === 'svg';
        if (n1 == null) {
            mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
        else {
            patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
    };
    const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        let el;
        let vnodeHook;
        const { type, props, shapeFlag, transition, patchFlag, dirs } = vnode;
        if (vnode.el &&
            hostCloneNode !== undefined &&
            patchFlag === -1 /* HOISTED */) {
            // If a vnode has non-null el, it means it's being reused.
            // Only static vnodes can be reused, so its mounted DOM nodes should be
            // exactly the same, and we can simply do a clone here.
            // only do this in production since cloned trees cannot be HMR updated.
            el = vnode.el = hostCloneNode(vnode.el);
        }
        else {
            el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
            // mount children first, since some props may rely on child content
            // being already rendered, e.g. `<select value>`
            if (shapeFlag & 8 /* TEXT_CHILDREN */) {
                hostSetElementText(el, vnode.children);
            }
            else if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
                mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== 'foreignObject', slotScopeIds, optimized || !!vnode.dynamicChildren);
            }
            if (dirs) {
                invokeDirectiveHook(vnode, null, parentComponent, 'created');
            }
            // props
            if (props) {
                for (const key in props) {
                    if (!isReservedProp(key)) {
                        hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
                    }
                }
                if ((vnodeHook = props.onVnodeBeforeMount)) {
                    invokeVNodeHook(vnodeHook, parentComponent, vnode);
                }
            }
            // scopeId
            setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
        }
        if (__VUE_PROD_DEVTOOLS__) {
            Object.defineProperty(el, '__vnode', {
                value: vnode,
                enumerable: false
            });
            Object.defineProperty(el, '__vueParentComponent', {
                value: parentComponent,
                enumerable: false
            });
        }
        if (dirs) {
            invokeDirectiveHook(vnode, null, parentComponent, 'beforeMount');
        }
        // #1583 For inside suspense + suspense not resolved case, enter hook should call when suspense resolved
        // #1689 For inside suspense + suspense resolved case, just call it
        const needCallTransitionHooks = (!parentSuspense || (parentSuspense && !parentSuspense.pendingBranch)) &&
            transition &&
            !transition.persisted;
        if (needCallTransitionHooks) {
            transition.beforeEnter(el);
        }
        hostInsert(el, container, anchor);
        if ((vnodeHook = props && props.onVnodeMounted) ||
            needCallTransitionHooks ||
            dirs) {
            queuePostRenderEffect(() => {
                vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
                needCallTransitionHooks && transition.enter(el);
                dirs && invokeDirectiveHook(vnode, null, parentComponent, 'mounted');
            }, parentSuspense);
        }
    };
    const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
        if (scopeId) {
            hostSetScopeId(el, scopeId);
        }
        if (slotScopeIds) {
            for (let i = 0; i < slotScopeIds.length; i++) {
                hostSetScopeId(el, slotScopeIds[i]);
            }
        }
        if (parentComponent) {
            let subTree = parentComponent.subTree;
            if (vnode === subTree) {
                const parentVNode = parentComponent.vnode;
                setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
            }
        }
    };
    const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, optimized, slotScopeIds, start = 0) => {
        for (let i = start; i < children.length; i++) {
            const child = (children[i] = optimized
                ? cloneIfMounted(children[i])
                : normalizeVNode(children[i]));
            patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, optimized, slotScopeIds);
        }
    };
    const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        const el = (n2.el = n1.el);
        let { patchFlag, dynamicChildren, dirs } = n2;
        // #1426 take the old vnode's patch flag into account since user may clone a
        // compiler-generated vnode, which de-opts to FULL_PROPS
        patchFlag |= n1.patchFlag & 16 /* FULL_PROPS */;
        const oldProps = n1.props || EMPTY_OBJ;
        const newProps = n2.props || EMPTY_OBJ;
        let vnodeHook;
        if ((vnodeHook = newProps.onVnodeBeforeUpdate)) {
            invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        }
        if (dirs) {
            invokeDirectiveHook(n2, n1, parentComponent, 'beforeUpdate');
        }
        if (patchFlag > 0) {
            // the presence of a patchFlag means this element's render code was
            // generated by the compiler and can take the fast path.
            // in this path old node and new node are guaranteed to have the same shape
            // (i.e. at the exact same position in the source template)
            if (patchFlag & 16 /* FULL_PROPS */) {
                // element props contain dynamic keys, full diff needed
                patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
            }
            else {
                // class
                // this flag is matched when the element has dynamic class bindings.
                if (patchFlag & 2 /* CLASS */) {
                    if (oldProps.class !== newProps.class) {
                        hostPatchProp(el, 'class', null, newProps.class, isSVG);
                    }
                }
                // style
                // this flag is matched when the element has dynamic style bindings
                if (patchFlag & 4 /* STYLE */) {
                    hostPatchProp(el, 'style', oldProps.style, newProps.style, isSVG);
                }
                // props
                // This flag is matched when the element has dynamic prop/attr bindings
                // other than class and style. The keys of dynamic prop/attrs are saved for
                // faster iteration.
                // Note dynamic keys like :[foo]="bar" will cause this optimization to
                // bail out and go through a full diff because we need to unset the old key
                if (patchFlag & 8 /* PROPS */) {
                    // if the flag is present then dynamicProps must be non-null
                    const propsToUpdate = n2.dynamicProps;
                    for (let i = 0; i < propsToUpdate.length; i++) {
                        const key = propsToUpdate[i];
                        const prev = oldProps[key];
                        const next = newProps[key];
                        if (next !== prev ||
                            (hostForcePatchProp && hostForcePatchProp(el, key))) {
                            hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
                        }
                    }
                }
            }
            // text
            // This flag is matched when the element has only dynamic text children.
            if (patchFlag & 1 /* TEXT */) {
                if (n1.children !== n2.children) {
                    hostSetElementText(el, n2.children);
                }
            }
        }
        else if (!optimized && dynamicChildren == null) {
            // unoptimized, full diff
            patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
        }
        const areChildrenSVG = isSVG && n2.type !== 'foreignObject';
        if (dynamicChildren) {
            patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
        }
        else if (!optimized) {
            // full diff
            patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
        }
        if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
            queuePostRenderEffect(() => {
                vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
                dirs && invokeDirectiveHook(n2, n1, parentComponent, 'updated');
            }, parentSuspense);
        }
    };
    // The fast path for blocks.
    const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
        for (let i = 0; i < newChildren.length; i++) {
            const oldVNode = oldChildren[i];
            const newVNode = newChildren[i];
            // Determine the container (parent element) for the patch.
            const container = 
            // - In the case of a Fragment, we need to provide the actual parent
            // of the Fragment itself so it can move its children.
            oldVNode.type === Fragment ||
                // - In the case of different nodes, there is going to be a replacement
                // which also requires the correct parent container
                !isSameVNodeType(oldVNode, newVNode) ||
                // - In the case of a component, it could contain anything.
                oldVNode.shapeFlag & 6 /* COMPONENT */ ||
                oldVNode.shapeFlag & 64 /* TELEPORT */
                ? hostParentNode(oldVNode.el)
                : // In other cases, the parent container is not actually used so we
                    // just pass the block element here to avoid a DOM parentNode call.
                    fallbackContainer;
            patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
        }
    };
    const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
        if (oldProps !== newProps) {
            for (const key in newProps) {
                // empty string is not valid prop
                if (isReservedProp(key))
                    continue;
                const next = newProps[key];
                const prev = oldProps[key];
                if (next !== prev ||
                    (hostForcePatchProp && hostForcePatchProp(el, key))) {
                    hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
                }
            }
            if (oldProps !== EMPTY_OBJ) {
                for (const key in oldProps) {
                    if (!isReservedProp(key) && !(key in newProps)) {
                        hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
                    }
                }
            }
        }
    };
    const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        const fragmentStartAnchor = (n2.el = n1 ? n1.el : hostCreateText(''));
        const fragmentEndAnchor = (n2.anchor = n1 ? n1.anchor : hostCreateText(''));
        let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
        if (patchFlag > 0) {
            optimized = true;
        }
        // check if this is a slot fragment with :slotted scope ids
        if (fragmentSlotScopeIds) {
            slotScopeIds = slotScopeIds
                ? slotScopeIds.concat(fragmentSlotScopeIds)
                : fragmentSlotScopeIds;
        }
        if (n1 == null) {
            hostInsert(fragmentStartAnchor, container, anchor);
            hostInsert(fragmentEndAnchor, container, anchor);
            // a fragment can only have array children
            // since they are either generated by the compiler, or implicitly created
            // from arrays.
            mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
        else {
            if (patchFlag > 0 &&
                patchFlag & 64 /* STABLE_FRAGMENT */ &&
                dynamicChildren &&
                // #2715 the previous fragment could've been a BAILed one as a result
                // of renderSlot() with no valid children
                n1.dynamicChildren) {
                // a stable fragment (template root or <template v-for>) doesn't need to
                // patch children order, but it may contain dynamicChildren.
                patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
                if (
                // #2080 if the stable fragment has a key, it's a <template v-for> that may
                //  get moved around. Make sure all root level vnodes inherit el.
                // #2134 or if it's a component root, it may also get moved around
                // as the component is being moved.
                n2.key != null ||
                    (parentComponent && n2 === parentComponent.subTree)) {
                    traverseStaticChildren(n1, n2, true /* shallow */);
                }
            }
            else {
                // keyed / unkeyed, or manual fragments.
                // for keyed & unkeyed, since they are compiler generated from v-for,
                // each child is guaranteed to be a block so the fragment will never
                // have dynamicChildren.
                patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            }
        }
    };
    const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        n2.slotScopeIds = slotScopeIds;
        if (n1 == null) {
            if (n2.shapeFlag & 512 /* COMPONENT_KEPT_ALIVE */) {
                parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
            }
            else {
                mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
            }
        }
        else {
            updateComponent(n1, n2, optimized);
        }
    };
    const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
        const instance = (initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense));
        // inject renderer internals for keepAlive
        if (isKeepAlive(initialVNode)) {
            instance.ctx.renderer = internals;
        }
        setupComponent(instance);
        // setup() is async. This component relies on async logic to be resolved
        // before proceeding
        if (instance.asyncDep) {
            parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
            // Give it a placeholder if this is not hydration
            // TODO handle self-defined fallback
            if (!initialVNode.el) {
                const placeholder = (instance.subTree = createVNode(Comment));
                processCommentNode(null, placeholder, container, anchor);
            }
            return;
        }
        setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
    };
    const updateComponent = (n1, n2, optimized) => {
        const instance = (n2.component = n1.component);
        if (shouldUpdateComponent(n1, n2, optimized)) {
            if (instance.asyncDep &&
                !instance.asyncResolved) {
                updateComponentPreRender(instance, n2, optimized);
                return;
            }
            else {
                // normal update
                instance.next = n2;
                // in case the child component is also queued, remove it to avoid
                // double updating the same child component in the same flush.
                invalidateJob(instance.update);
                // instance.update is the reactive effect runner.
                instance.update();
            }
        }
        else {
            // no update needed. just copy over properties
            n2.component = n1.component;
            n2.el = n1.el;
            instance.vnode = n2;
        }
    };
    const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
        // create reactive effect for rendering
        instance.update = effect(function componentEffect() {
            if (!instance.isMounted) {
                let vnodeHook;
                const { el, props } = initialVNode;
                const { bm, m, parent } = instance;
                // beforeMount hook
                if (bm) {
                    invokeArrayFns(bm);
                }
                // onVnodeBeforeMount
                if ((vnodeHook = props && props.onVnodeBeforeMount)) {
                    invokeVNodeHook(vnodeHook, parent, initialVNode);
                }
                const subTree = (instance.subTree = renderComponentRoot(instance));
                if (el && hydrateNode) {
                    // vnode has adopted host node - perform hydration instead of mount.
                    hydrateNode(initialVNode.el, subTree, instance, parentSuspense, null);
                }
                else {
                    patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
                    initialVNode.el = subTree.el;
                }
                // mounted hook
                if (m) {
                    queuePostRenderEffect(m, parentSuspense);
                }
                // onVnodeMounted
                if ((vnodeHook = props && props.onVnodeMounted)) {
                    const scopedInitialVNode = initialVNode;
                    queuePostRenderEffect(() => {
                        invokeVNodeHook(vnodeHook, parent, scopedInitialVNode);
                    }, parentSuspense);
                }
                // activated hook for keep-alive roots.
                // #1742 activated hook must be accessed after first render
                // since the hook may be injected by a child keep-alive
                const { a } = instance;
                if (a &&
                    initialVNode.shapeFlag & 256 /* COMPONENT_SHOULD_KEEP_ALIVE */) {
                    queuePostRenderEffect(a, parentSuspense);
                }
                instance.isMounted = true;
                if (__VUE_PROD_DEVTOOLS__) {
                    devtoolsComponentAdded(instance);
                }
                // #2458: deference mount-only object parameters to prevent memleaks
                initialVNode = container = anchor = null;
            }
            else {
                // updateComponent
                // This is triggered by mutation of component's own state (next: null)
                // OR parent calling processComponent (next: VNode)
                let { next, bu, u, parent, vnode } = instance;
                let originNext = next;
                let vnodeHook;
                if (next) {
                    next.el = vnode.el;
                    updateComponentPreRender(instance, next, optimized);
                }
                else {
                    next = vnode;
                }
                // beforeUpdate hook
                if (bu) {
                    invokeArrayFns(bu);
                }
                // onVnodeBeforeUpdate
                if ((vnodeHook = next.props && next.props.onVnodeBeforeUpdate)) {
                    invokeVNodeHook(vnodeHook, parent, next, vnode);
                }
                const nextTree = renderComponentRoot(instance);
                const prevTree = instance.subTree;
                instance.subTree = nextTree;
                patch(prevTree, nextTree, 
                // parent may have changed if it's in a teleport
                hostParentNode(prevTree.el), 
                // anchor may have changed if it's in a fragment
                getNextHostNode(prevTree), instance, parentSuspense, isSVG);
                next.el = nextTree.el;
                if (originNext === null) {
                    // self-triggered update. In case of HOC, update parent component
                    // vnode el. HOC is indicated by parent instance's subTree pointing
                    // to child component's vnode
                    updateHOCHostEl(instance, nextTree.el);
                }
                // updated hook
                if (u) {
                    queuePostRenderEffect(u, parentSuspense);
                }
                // onVnodeUpdated
                if ((vnodeHook = next.props && next.props.onVnodeUpdated)) {
                    queuePostRenderEffect(() => {
                        invokeVNodeHook(vnodeHook, parent, next, vnode);
                    }, parentSuspense);
                }
                if (__VUE_PROD_DEVTOOLS__) {
                    devtoolsComponentUpdated(instance);
                }
            }
        }, prodEffectOptions);
    };
    const updateComponentPreRender = (instance, nextVNode, optimized) => {
        nextVNode.component = instance;
        const prevProps = instance.vnode.props;
        instance.vnode = nextVNode;
        instance.next = null;
        updateProps(instance, nextVNode.props, prevProps, optimized);
        updateSlots(instance, nextVNode.children, optimized);
        pauseTracking();
        // props update may have triggered pre-flush watchers.
        // flush them before the render update.
        flushPreFlushCbs(undefined, instance.update);
        resetTracking();
    };
    const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
        const c1 = n1 && n1.children;
        const prevShapeFlag = n1 ? n1.shapeFlag : 0;
        const c2 = n2.children;
        const { patchFlag, shapeFlag } = n2;
        // fast path
        if (patchFlag > 0) {
            if (patchFlag & 128 /* KEYED_FRAGMENT */) {
                // this could be either fully-keyed or mixed (some keyed some not)
                // presence of patchFlag means children are guaranteed to be arrays
                patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                return;
            }
            else if (patchFlag & 256 /* UNKEYED_FRAGMENT */) {
                // unkeyed
                patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                return;
            }
        }
        // children has 3 possibilities: text, array or no children.
        if (shapeFlag & 8 /* TEXT_CHILDREN */) {
            // text children fast path
            if (prevShapeFlag & 16 /* ARRAY_CHILDREN */) {
                unmountChildren(c1, parentComponent, parentSuspense);
            }
            if (c2 !== c1) {
                hostSetElementText(container, c2);
            }
        }
        else {
            if (prevShapeFlag & 16 /* ARRAY_CHILDREN */) {
                // prev children was array
                if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
                    // two arrays, cannot assume anything, do full diff
                    patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                }
                else {
                    // no new children, just unmount old
                    unmountChildren(c1, parentComponent, parentSuspense, true);
                }
            }
            else {
                // prev children was text OR null
                // new children is array OR null
                if (prevShapeFlag & 8 /* TEXT_CHILDREN */) {
                    hostSetElementText(container, '');
                }
                // mount new if array
                if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
                    mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                }
            }
        }
    };
    const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        c1 = c1 || EMPTY_ARR;
        c2 = c2 || EMPTY_ARR;
        const oldLength = c1.length;
        const newLength = c2.length;
        const commonLength = Math.min(oldLength, newLength);
        let i;
        for (i = 0; i < commonLength; i++) {
            const nextChild = (c2[i] = optimized
                ? cloneIfMounted(c2[i])
                : normalizeVNode(c2[i]));
            patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
        if (oldLength > newLength) {
            // remove old
            unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
        }
        else {
            // mount new
            mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
        }
    };
    // can be all-keyed or mixed
    const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        let i = 0;
        const l2 = c2.length;
        let e1 = c1.length - 1; // prev ending index
        let e2 = l2 - 1; // next ending index
        // 1. sync from start
        // (a b) c
        // (a b) d e
        while (i <= e1 && i <= e2) {
            const n1 = c1[i];
            const n2 = (c2[i] = optimized
                ? cloneIfMounted(c2[i])
                : normalizeVNode(c2[i]));
            if (isSameVNodeType(n1, n2)) {
                patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            }
            else {
                break;
            }
            i++;
        }
        // 2. sync from end
        // a (b c)
        // d e (b c)
        while (i <= e1 && i <= e2) {
            const n1 = c1[e1];
            const n2 = (c2[e2] = optimized
                ? cloneIfMounted(c2[e2])
                : normalizeVNode(c2[e2]));
            if (isSameVNodeType(n1, n2)) {
                patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            }
            else {
                break;
            }
            e1--;
            e2--;
        }
        // 3. common sequence + mount
        // (a b)
        // (a b) c
        // i = 2, e1 = 1, e2 = 2
        // (a b)
        // c (a b)
        // i = 0, e1 = -1, e2 = 0
        if (i > e1) {
            if (i <= e2) {
                const nextPos = e2 + 1;
                const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
                while (i <= e2) {
                    patch(null, (c2[i] = optimized
                        ? cloneIfMounted(c2[i])
                        : normalizeVNode(c2[i])), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                    i++;
                }
            }
        }
        // 4. common sequence + unmount
        // (a b) c
        // (a b)
        // i = 2, e1 = 2, e2 = 1
        // a (b c)
        // (b c)
        // i = 0, e1 = 0, e2 = -1
        else if (i > e2) {
            while (i <= e1) {
                unmount(c1[i], parentComponent, parentSuspense, true);
                i++;
            }
        }
        // 5. unknown sequence
        // [i ... e1 + 1]: a b [c d e] f g
        // [i ... e2 + 1]: a b [e d c h] f g
        // i = 2, e1 = 4, e2 = 5
        else {
            const s1 = i; // prev starting index
            const s2 = i; // next starting index
            // 5.1 build key:index map for newChildren
            const keyToNewIndexMap = new Map();
            for (i = s2; i <= e2; i++) {
                const nextChild = (c2[i] = optimized
                    ? cloneIfMounted(c2[i])
                    : normalizeVNode(c2[i]));
                if (nextChild.key != null) {
                    keyToNewIndexMap.set(nextChild.key, i);
                }
            }
            // 5.2 loop through old children left to be patched and try to patch
            // matching nodes & remove nodes that are no longer present
            let j;
            let patched = 0;
            const toBePatched = e2 - s2 + 1;
            let moved = false;
            // used to track whether any node has moved
            let maxNewIndexSoFar = 0;
            // works as Map<newIndex, oldIndex>
            // Note that oldIndex is offset by +1
            // and oldIndex = 0 is a special value indicating the new node has
            // no corresponding old node.
            // used for determining longest stable subsequence
            const newIndexToOldIndexMap = new Array(toBePatched);
            for (i = 0; i < toBePatched; i++)
                newIndexToOldIndexMap[i] = 0;
            for (i = s1; i <= e1; i++) {
                const prevChild = c1[i];
                if (patched >= toBePatched) {
                    // all new children have been patched so this can only be a removal
                    unmount(prevChild, parentComponent, parentSuspense, true);
                    continue;
                }
                let newIndex;
                if (prevChild.key != null) {
                    newIndex = keyToNewIndexMap.get(prevChild.key);
                }
                else {
                    // key-less node, try to locate a key-less node of the same type
                    for (j = s2; j <= e2; j++) {
                        if (newIndexToOldIndexMap[j - s2] === 0 &&
                            isSameVNodeType(prevChild, c2[j])) {
                            newIndex = j;
                            break;
                        }
                    }
                }
                if (newIndex === undefined) {
                    unmount(prevChild, parentComponent, parentSuspense, true);
                }
                else {
                    newIndexToOldIndexMap[newIndex - s2] = i + 1;
                    if (newIndex >= maxNewIndexSoFar) {
                        maxNewIndexSoFar = newIndex;
                    }
                    else {
                        moved = true;
                    }
                    patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                    patched++;
                }
            }
            // 5.3 move and mount
            // generate longest stable subsequence only when nodes have moved
            const increasingNewIndexSequence = moved
                ? getSequence(newIndexToOldIndexMap)
                : EMPTY_ARR;
            j = increasingNewIndexSequence.length - 1;
            // looping backwards so that we can use last patched node as anchor
            for (i = toBePatched - 1; i >= 0; i--) {
                const nextIndex = s2 + i;
                const nextChild = c2[nextIndex];
                const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
                if (newIndexToOldIndexMap[i] === 0) {
                    // mount new
                    patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                }
                else if (moved) {
                    // move if:
                    // There is no stable subsequence (e.g. a reverse)
                    // OR current node is not among the stable sequence
                    if (j < 0 || i !== increasingNewIndexSequence[j]) {
                        move(nextChild, container, anchor, 2 /* REORDER */);
                    }
                    else {
                        j--;
                    }
                }
            }
        }
    };
    const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
        const { el, type, transition, children, shapeFlag } = vnode;
        if (shapeFlag & 6 /* COMPONENT */) {
            move(vnode.component.subTree, container, anchor, moveType);
            return;
        }
        if (shapeFlag & 128 /* SUSPENSE */) {
            vnode.suspense.move(container, anchor, moveType);
            return;
        }
        if (shapeFlag & 64 /* TELEPORT */) {
            type.move(vnode, container, anchor, internals);
            return;
        }
        if (type === Fragment) {
            hostInsert(el, container, anchor);
            for (let i = 0; i < children.length; i++) {
                move(children[i], container, anchor, moveType);
            }
            hostInsert(vnode.anchor, container, anchor);
            return;
        }
        if (type === Static) {
            moveStaticNode(vnode, container, anchor);
            return;
        }
        // single nodes
        const needTransition = moveType !== 2 /* REORDER */ &&
            shapeFlag & 1 /* ELEMENT */ &&
            transition;
        if (needTransition) {
            if (moveType === 0 /* ENTER */) {
                transition.beforeEnter(el);
                hostInsert(el, container, anchor);
                queuePostRenderEffect(() => transition.enter(el), parentSuspense);
            }
            else {
                const { leave, delayLeave, afterLeave } = transition;
                const remove = () => hostInsert(el, container, anchor);
                const performLeave = () => {
                    leave(el, () => {
                        remove();
                        afterLeave && afterLeave();
                    });
                };
                if (delayLeave) {
                    delayLeave(el, remove, performLeave);
                }
                else {
                    performLeave();
                }
            }
        }
        else {
            hostInsert(el, container, anchor);
        }
    };
    const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
        const { type, props, ref, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
        // unset ref
        if (ref != null) {
            setRef(ref, null, parentSuspense, null);
        }
        if (shapeFlag & 256 /* COMPONENT_SHOULD_KEEP_ALIVE */) {
            parentComponent.ctx.deactivate(vnode);
            return;
        }
        const shouldInvokeDirs = shapeFlag & 1 /* ELEMENT */ && dirs;
        let vnodeHook;
        if ((vnodeHook = props && props.onVnodeBeforeUnmount)) {
            invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
        if (shapeFlag & 6 /* COMPONENT */) {
            unmountComponent(vnode.component, parentSuspense, doRemove);
        }
        else {
            if (shapeFlag & 128 /* SUSPENSE */) {
                vnode.suspense.unmount(parentSuspense, doRemove);
                return;
            }
            if (shouldInvokeDirs) {
                invokeDirectiveHook(vnode, null, parentComponent, 'beforeUnmount');
            }
            if (shapeFlag & 64 /* TELEPORT */) {
                vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
            }
            else if (dynamicChildren &&
                // #1153: fast path should not be taken for non-stable (v-for) fragments
                (type !== Fragment ||
                    (patchFlag > 0 && patchFlag & 64 /* STABLE_FRAGMENT */))) {
                // fast path for block nodes: only need to unmount dynamic children.
                unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
            }
            else if ((type === Fragment &&
                (patchFlag & 128 /* KEYED_FRAGMENT */ ||
                    patchFlag & 256 /* UNKEYED_FRAGMENT */)) ||
                (!optimized && shapeFlag & 16 /* ARRAY_CHILDREN */)) {
                unmountChildren(children, parentComponent, parentSuspense);
            }
            if (doRemove) {
                remove(vnode);
            }
        }
        if ((vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
            queuePostRenderEffect(() => {
                vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
                shouldInvokeDirs &&
                    invokeDirectiveHook(vnode, null, parentComponent, 'unmounted');
            }, parentSuspense);
        }
    };
    const remove = vnode => {
        const { type, el, anchor, transition } = vnode;
        if (type === Fragment) {
            removeFragment(el, anchor);
            return;
        }
        if (type === Static) {
            removeStaticNode(vnode);
            return;
        }
        const performRemove = () => {
            hostRemove(el);
            if (transition && !transition.persisted && transition.afterLeave) {
                transition.afterLeave();
            }
        };
        if (vnode.shapeFlag & 1 /* ELEMENT */ &&
            transition &&
            !transition.persisted) {
            const { leave, delayLeave } = transition;
            const performLeave = () => leave(el, performRemove);
            if (delayLeave) {
                delayLeave(vnode.el, performRemove, performLeave);
            }
            else {
                performLeave();
            }
        }
        else {
            performRemove();
        }
    };
    const removeFragment = (cur, end) => {
        // For fragments, directly remove all contained DOM nodes.
        // (fragment child nodes cannot have transition)
        let next;
        while (cur !== end) {
            next = hostNextSibling(cur);
            hostRemove(cur);
            cur = next;
        }
        hostRemove(end);
    };
    const unmountComponent = (instance, parentSuspense, doRemove) => {
        const { bum, effects, update, subTree, um } = instance;
        // beforeUnmount hook
        if (bum) {
            invokeArrayFns(bum);
        }
        if (effects) {
            for (let i = 0; i < effects.length; i++) {
                stop(effects[i]);
            }
        }
        // update may be null if a component is unmounted before its async
        // setup has resolved.
        if (update) {
            stop(update);
            unmount(subTree, instance, parentSuspense, doRemove);
        }
        // unmounted hook
        if (um) {
            queuePostRenderEffect(um, parentSuspense);
        }
        queuePostRenderEffect(() => {
            instance.isUnmounted = true;
        }, parentSuspense);
        // A component with async dep inside a pending suspense is unmounted before
        // its async dep resolves. This should remove the dep from the suspense, and
        // cause the suspense to resolve immediately if that was the last dep.
        if (parentSuspense &&
            parentSuspense.pendingBranch &&
            !parentSuspense.isUnmounted &&
            instance.asyncDep &&
            !instance.asyncResolved &&
            instance.suspenseId === parentSuspense.pendingId) {
            parentSuspense.deps--;
            if (parentSuspense.deps === 0) {
                parentSuspense.resolve();
            }
        }
        if (__VUE_PROD_DEVTOOLS__) {
            devtoolsComponentRemoved(instance);
        }
    };
    const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
        for (let i = start; i < children.length; i++) {
            unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
        }
    };
    const getNextHostNode = vnode => {
        if (vnode.shapeFlag & 6 /* COMPONENT */) {
            return getNextHostNode(vnode.component.subTree);
        }
        if (vnode.shapeFlag & 128 /* SUSPENSE */) {
            return vnode.suspense.next();
        }
        return hostNextSibling((vnode.anchor || vnode.el));
    };
    const render = (vnode, container, isSVG) => {
        if (vnode == null) {
            if (container._vnode) {
                unmount(container._vnode, null, null, true);
            }
        }
        else {
            patch(container._vnode || null, vnode, container, null, null, null, isSVG);
        }
        flushPostFlushCbs();
        container._vnode = vnode;
    };
    const internals = {
        p: patch,
        um: unmount,
        m: move,
        r: remove,
        mt: mountComponent,
        mc: mountChildren,
        pc: patchChildren,
        pbc: patchBlockChildren,
        n: getNextHostNode,
        o: options
    };
    let hydrate;
    let hydrateNode;
    if (createHydrationFns) {
        [hydrate, hydrateNode] = createHydrationFns(internals);
    }
    return {
        render,
        hydrate,
        createApp: createAppAPI(render, hydrate)
    };
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
    callWithAsyncErrorHandling(hook, instance, 7 /* VNODE_HOOK */, [
        vnode,
        prevVNode
    ]);
}
/**
 * #1156
 * When a component is HMR-enabled, we need to make sure that all static nodes
 * inside a block also inherit the DOM element from the previous tree so that
 * HMR updates (which are full updates) can retrieve the element for patching.
 *
 * #2080
 * Inside keyed `template` fragment static children, if a fragment is moved,
 * the children will always moved so that need inherit el form previous nodes
 * to ensure correct moved position.
 */
function traverseStaticChildren(n1, n2, shallow = false) {
    const ch1 = n1.children;
    const ch2 = n2.children;
    if (isArray(ch1) && isArray(ch2)) {
        for (let i = 0; i < ch1.length; i++) {
            // this is only called in the optimized path so array children are
            // guaranteed to be vnodes
            const c1 = ch1[i];
            let c2 = ch2[i];
            if (c2.shapeFlag & 1 /* ELEMENT */ && !c2.dynamicChildren) {
                if (c2.patchFlag <= 0 || c2.patchFlag === 32 /* HYDRATE_EVENTS */) {
                    c2 = ch2[i] = cloneIfMounted(ch2[i]);
                    c2.el = c1.el;
                }
                if (!shallow)
                    traverseStaticChildren(c1, c2);
            }
        }
    }
}
// https://en.wikipedia.org/wiki/Longest_increasing_subsequence
function getSequence(arr) {
    const p = arr.slice();
    const result = [0];
    let i, j, u, v, c;
    const len = arr.length;
    for (i = 0; i < len; i++) {
        const arrI = arr[i];
        if (arrI !== 0) {
            j = result[result.length - 1];
            if (arr[j] < arrI) {
                p[i] = j;
                result.push(i);
                continue;
            }
            u = 0;
            v = result.length - 1;
            while (u < v) {
                c = ((u + v) / 2) | 0;
                if (arr[result[c]] < arrI) {
                    u = c + 1;
                }
                else {
                    v = c;
                }
            }
            if (arrI < arr[result[u]]) {
                if (u > 0) {
                    p[i] = result[u - 1];
                }
                result[u] = i;
            }
        }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
        result[u] = v;
        v = p[v];
    }
    return result;
}

const isTeleport = (type) => type.__isTeleport;
const NULL_DYNAMIC_COMPONENT = Symbol();

const Fragment = Symbol(undefined);
const Text = Symbol(undefined);
const Comment = Symbol(undefined);
const Static = Symbol(undefined);
// Since v-if and v-for are the two possible ways node structure can dynamically
// change, once we consider v-if branches and each v-for fragment a block, we
// can divide a template into nested blocks, and within each block the node
// structure would be stable. This allows us to skip most children diffing
// and only worry about the dynamic nodes (indicated by patch flags).
const blockStack = [];
let currentBlock = null;
/**
 * Open a block.
 * This must be called before `createBlock`. It cannot be part of `createBlock`
 * because the children of the block are evaluated before `createBlock` itself
 * is called. The generated code typically looks like this:
 *
 * ```js
 * function render() {
 *   return (openBlock(),createBlock('div', null, [...]))
 * }
 * ```
 * disableTracking is true when creating a v-for fragment block, since a v-for
 * fragment always diffs its children.
 *
 * @private
 */
function openBlock(disableTracking = false) {
    blockStack.push((currentBlock = disableTracking ? null : []));
}
function closeBlock() {
    blockStack.pop();
    currentBlock = blockStack[blockStack.length - 1] || null;
}
/**
 * Create a block root vnode. Takes the same exact arguments as `createVNode`.
 * A block root keeps track of dynamic nodes within the block in the
 * `dynamicChildren` array.
 *
 * @private
 */
function createBlock(type, props, children, patchFlag, dynamicProps) {
    const vnode = createVNode(type, props, children, patchFlag, dynamicProps, true /* isBlock: prevent a block from tracking itself */);
    // save current block children on the block vnode
    vnode.dynamicChildren = currentBlock || EMPTY_ARR;
    // close block
    closeBlock();
    // a block is always going to be patched, so track it as a child of its
    // parent block
    if (currentBlock) {
        currentBlock.push(vnode);
    }
    return vnode;
}
function isVNode(value) {
    return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
    return n1.type === n2.type && n1.key === n2.key;
}
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({ ref }) => {
    return (ref != null
        ? isString(ref) || isRef(ref) || isFunction(ref)
            ? { i: currentRenderingInstance, r: ref }
            : ref
        : null);
};
const createVNode = (_createVNode);
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
    if (!type || type === NULL_DYNAMIC_COMPONENT) {
        type = Comment;
    }
    if (isVNode(type)) {
        // createVNode receiving an existing vnode. This happens in cases like
        // <component :is="vnode"/>
        // #2078 make sure to merge refs during the clone instead of overwriting it
        const cloned = cloneVNode(type, props, true /* mergeRef: true */);
        if (children) {
            normalizeChildren(cloned, children);
        }
        return cloned;
    }
    // class component normalization.
    if (isClassComponent(type)) {
        type = type.__vccOpts;
    }
    // class & style normalization.
    if (props) {
        // for reactive or proxy objects, we need to clone it to enable mutation.
        if (isProxy(props) || InternalObjectKey in props) {
            props = extend({}, props);
        }
        let { class: klass, style } = props;
        if (klass && !isString(klass)) {
            props.class = normalizeClass(klass);
        }
        if (isObject(style)) {
            // reactive state objects need to be cloned since they are likely to be
            // mutated
            if (isProxy(style) && !isArray(style)) {
                style = extend({}, style);
            }
            props.style = normalizeStyle(style);
        }
    }
    // encode the vnode type information into a bitmap
    const shapeFlag = isString(type)
        ? 1 /* ELEMENT */
        : isSuspense(type)
            ? 128 /* SUSPENSE */
            : isTeleport(type)
                ? 64 /* TELEPORT */
                : isObject(type)
                    ? 4 /* STATEFUL_COMPONENT */
                    : isFunction(type)
                        ? 2 /* FUNCTIONAL_COMPONENT */
                        : 0;
    const vnode = {
        __v_isVNode: true,
        ["__v_skip" /* SKIP */]: true,
        type,
        props,
        key: props && normalizeKey(props),
        ref: props && normalizeRef(props),
        scopeId: currentScopeId,
        slotScopeIds: null,
        children: null,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag,
        patchFlag,
        dynamicProps,
        dynamicChildren: null,
        appContext: null
    };
    normalizeChildren(vnode, children);
    // normalize suspense children
    if (shapeFlag & 128 /* SUSPENSE */) {
        const { content, fallback } = normalizeSuspenseChildren(vnode);
        vnode.ssContent = content;
        vnode.ssFallback = fallback;
    }
    if (// avoid a block node from tracking itself
        !isBlockNode &&
        // has current parent block
        currentBlock &&
        // presence of a patch flag indicates this node needs patching on updates.
        // component nodes also should always be patched, because even if the
        // component doesn't need to update, it needs to persist the instance on to
        // the next vnode so that it can be properly unmounted later.
        (patchFlag > 0 || shapeFlag & 6 /* COMPONENT */) &&
        // the EVENTS flag is only for hydration and if it is the only flag, the
        // vnode should not be considered dynamic due to handler caching.
        patchFlag !== 32 /* HYDRATE_EVENTS */) {
        currentBlock.push(vnode);
    }
    return vnode;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
    // This is intentionally NOT using spread or extend to avoid the runtime
    // key enumeration cost.
    const { props, ref, patchFlag, children } = vnode;
    const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
    return {
        __v_isVNode: true,
        ["__v_skip" /* SKIP */]: true,
        type: vnode.type,
        props: mergedProps,
        key: mergedProps && normalizeKey(mergedProps),
        ref: extraProps && extraProps.ref
            ? // #2078 in the case of <component :is="vnode" ref="extra"/>
                // if the vnode itself already has a ref, cloneVNode will need to merge
                // the refs so the single vnode can be set on multiple refs
                mergeRef && ref
                    ? isArray(ref)
                        ? ref.concat(normalizeRef(extraProps))
                        : [ref, normalizeRef(extraProps)]
                    : normalizeRef(extraProps)
            : ref,
        scopeId: vnode.scopeId,
        slotScopeIds: vnode.slotScopeIds,
        children: children,
        target: vnode.target,
        targetAnchor: vnode.targetAnchor,
        staticCount: vnode.staticCount,
        shapeFlag: vnode.shapeFlag,
        // if the vnode is cloned with extra props, we can no longer assume its
        // existing patch flag to be reliable and need to add the FULL_PROPS flag.
        // note: perserve flag for fragments since they use the flag for children
        // fast paths only.
        patchFlag: extraProps && vnode.type !== Fragment
            ? patchFlag === -1 // hoisted node
                ? 16 /* FULL_PROPS */
                : patchFlag | 16 /* FULL_PROPS */
            : patchFlag,
        dynamicProps: vnode.dynamicProps,
        dynamicChildren: vnode.dynamicChildren,
        appContext: vnode.appContext,
        dirs: vnode.dirs,
        transition: vnode.transition,
        // These should technically only be non-null on mounted VNodes. However,
        // they *should* be copied for kept-alive vnodes. So we just always copy
        // them since them being non-null during a mount doesn't affect the logic as
        // they will simply be overwritten.
        component: vnode.component,
        suspense: vnode.suspense,
        ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
        ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
        el: vnode.el,
        anchor: vnode.anchor
    };
}
/**
 * @private
 */
function createTextVNode(text = ' ', flag = 0) {
    return createVNode(Text, null, text, flag);
}
function normalizeVNode(child) {
    if (child == null || typeof child === 'boolean') {
        // empty placeholder
        return createVNode(Comment);
    }
    else if (isArray(child)) {
        // fragment
        return createVNode(Fragment, null, child);
    }
    else if (typeof child === 'object') {
        // already vnode, this should be the most common since compiled templates
        // always produce all-vnode children arrays
        return child.el === null ? child : cloneVNode(child);
    }
    else {
        // strings and numbers
        return createVNode(Text, null, String(child));
    }
}
// optimized normalization for template-compiled render fns
function cloneIfMounted(child) {
    return child.el === null ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
    let type = 0;
    const { shapeFlag } = vnode;
    if (children == null) {
        children = null;
    }
    else if (isArray(children)) {
        type = 16 /* ARRAY_CHILDREN */;
    }
    else if (typeof children === 'object') {
        if (shapeFlag & 1 /* ELEMENT */ || shapeFlag & 64 /* TELEPORT */) {
            // Normalize slot to plain children for plain element and Teleport
            const slot = children.default;
            if (slot) {
                // _c marker is added by withCtx() indicating this is a compiled slot
                slot._c && setCompiledSlotRendering(1);
                normalizeChildren(vnode, slot());
                slot._c && setCompiledSlotRendering(-1);
            }
            return;
        }
        else {
            type = 32 /* SLOTS_CHILDREN */;
            const slotFlag = children._;
            if (!slotFlag && !(InternalObjectKey in children)) {
                children._ctx = currentRenderingInstance;
            }
            else if (slotFlag === 3 /* FORWARDED */ && currentRenderingInstance) {
                // a child component receives forwarded slots from the parent.
                // its slot type is determined by its parent's slot type.
                if (currentRenderingInstance.vnode.patchFlag & 1024 /* DYNAMIC_SLOTS */) {
                    children._ = 2 /* DYNAMIC */;
                    vnode.patchFlag |= 1024 /* DYNAMIC_SLOTS */;
                }
                else {
                    children._ = 1 /* STABLE */;
                }
            }
        }
    }
    else if (isFunction(children)) {
        children = { default: children, _ctx: currentRenderingInstance };
        type = 32 /* SLOTS_CHILDREN */;
    }
    else {
        children = String(children);
        // force teleport children to array so it can be moved around
        if (shapeFlag & 64 /* TELEPORT */) {
            type = 16 /* ARRAY_CHILDREN */;
            children = [createTextVNode(children)];
        }
        else {
            type = 8 /* TEXT_CHILDREN */;
        }
    }
    vnode.children = children;
    vnode.shapeFlag |= type;
}
function mergeProps(...args) {
    const ret = extend({}, args[0]);
    for (let i = 1; i < args.length; i++) {
        const toMerge = args[i];
        for (const key in toMerge) {
            if (key === 'class') {
                if (ret.class !== toMerge.class) {
                    ret.class = normalizeClass([ret.class, toMerge.class]);
                }
            }
            else if (key === 'style') {
                ret.style = normalizeStyle([ret.style, toMerge.style]);
            }
            else if (isOn(key)) {
                const existing = ret[key];
                const incoming = toMerge[key];
                if (existing !== incoming) {
                    ret[key] = existing
                        ? [].concat(existing, toMerge[key])
                        : incoming;
                }
            }
            else if (key !== '') {
                ret[key] = toMerge[key];
            }
        }
    }
    return ret;
}

function provide(key, value) {
    if (!currentInstance) ;
    else {
        let provides = currentInstance.provides;
        // by default an instance inherits its parent's provides object
        // but when it needs to provide values of its own, it creates its
        // own provides object using parent provides object as prototype.
        // this way in `inject` we can simply look up injections from direct
        // parent and let the prototype chain do the work.
        const parentProvides = currentInstance.parent && currentInstance.parent.provides;
        if (parentProvides === provides) {
            provides = currentInstance.provides = Object.create(parentProvides);
        }
        // TS doesn't allow symbol as index type
        provides[key] = value;
    }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
    // fallback to `currentRenderingInstance` so that this can be called in
    // a functional component
    const instance = currentInstance || currentRenderingInstance;
    if (instance) {
        // #2400
        // to support `app.use` plugins,
        // fallback to appContext's `provides` if the intance is at root
        const provides = instance.parent == null
            ? instance.vnode.appContext && instance.vnode.appContext.provides
            : instance.parent.provides;
        if (provides && key in provides) {
            // TS doesn't allow symbol as index type
            return provides[key];
        }
        else if (arguments.length > 1) {
            return treatDefaultAsFactory && isFunction(defaultValue)
                ? defaultValue()
                : defaultValue;
        }
        else ;
    }
}
let shouldCacheAccess = true;
function applyOptions(instance, options, deferredData = [], deferredWatch = [], deferredProvide = [], asMixin = false) {
    const { 
    // composition
    mixins, extends: extendsOptions, 
    // state
    data: dataOptions, computed: computedOptions, methods, watch: watchOptions, provide: provideOptions, inject: injectOptions, 
    // assets
    components, directives, 
    // lifecycle
    beforeMount, mounted, beforeUpdate, updated, activated, deactivated, beforeDestroy, beforeUnmount, destroyed, unmounted, render, renderTracked, renderTriggered, errorCaptured, 
    // public API
    expose } = options;
    const publicThis = instance.proxy;
    const ctx = instance.ctx;
    const globalMixins = instance.appContext.mixins;
    if (asMixin && render && instance.render === NOOP) {
        instance.render = render;
    }
    // applyOptions is called non-as-mixin once per instance
    if (!asMixin) {
        shouldCacheAccess = false;
        callSyncHook('beforeCreate', "bc" /* BEFORE_CREATE */, options, instance, globalMixins);
        shouldCacheAccess = true;
        // global mixins are applied first
        applyMixins(instance, globalMixins, deferredData, deferredWatch, deferredProvide);
    }
    // extending a base component...
    if (extendsOptions) {
        applyOptions(instance, extendsOptions, deferredData, deferredWatch, deferredProvide, true);
    }
    // local mixins
    if (mixins) {
        applyMixins(instance, mixins, deferredData, deferredWatch, deferredProvide);
    }
    // options initialization order (to be consistent with Vue 2):
    // - props (already done outside of this function)
    // - inject
    // - methods
    // - data (deferred since it relies on `this` access)
    // - computed
    // - watch (deferred since it relies on `this` access)
    if (injectOptions) {
        if (isArray(injectOptions)) {
            for (let i = 0; i < injectOptions.length; i++) {
                const key = injectOptions[i];
                ctx[key] = inject(key);
            }
        }
        else {
            for (const key in injectOptions) {
                const opt = injectOptions[key];
                if (isObject(opt)) {
                    ctx[key] = inject(opt.from || key, opt.default, true /* treat default function as factory */);
                }
                else {
                    ctx[key] = inject(opt);
                }
            }
        }
    }
    if (methods) {
        for (const key in methods) {
            const methodHandler = methods[key];
            if (isFunction(methodHandler)) {
                // In dev mode, we use the `createRenderContext` function to define methods to the proxy target,
                // and those are read-only but reconfigurable, so it needs to be redefined here
                {
                    ctx[key] = methodHandler.bind(publicThis);
                }
            }
        }
    }
    if (!asMixin) {
        if (deferredData.length) {
            deferredData.forEach(dataFn => resolveData(instance, dataFn, publicThis));
        }
        if (dataOptions) {
            // @ts-ignore dataOptions is not fully type safe
            resolveData(instance, dataOptions, publicThis);
        }
    }
    else if (dataOptions) {
        deferredData.push(dataOptions);
    }
    if (computedOptions) {
        for (const key in computedOptions) {
            const opt = computedOptions[key];
            const get = isFunction(opt)
                ? opt.bind(publicThis, publicThis)
                : isFunction(opt.get)
                    ? opt.get.bind(publicThis, publicThis)
                    : NOOP;
            const set = !isFunction(opt) && isFunction(opt.set)
                ? opt.set.bind(publicThis)
                : NOOP;
            const c = computed({
                get,
                set
            });
            Object.defineProperty(ctx, key, {
                enumerable: true,
                configurable: true,
                get: () => c.value,
                set: v => (c.value = v)
            });
        }
    }
    if (watchOptions) {
        deferredWatch.push(watchOptions);
    }
    if (!asMixin && deferredWatch.length) {
        deferredWatch.forEach(watchOptions => {
            for (const key in watchOptions) {
                createWatcher(watchOptions[key], ctx, publicThis, key);
            }
        });
    }
    if (provideOptions) {
        deferredProvide.push(provideOptions);
    }
    if (!asMixin && deferredProvide.length) {
        deferredProvide.forEach(provideOptions => {
            const provides = isFunction(provideOptions)
                ? provideOptions.call(publicThis)
                : provideOptions;
            Reflect.ownKeys(provides).forEach(key => {
                provide(key, provides[key]);
            });
        });
    }
    // asset options.
    // To reduce memory usage, only components with mixins or extends will have
    // resolved asset registry attached to instance.
    if (asMixin) {
        if (components) {
            extend(instance.components ||
                (instance.components = extend({}, instance.type.components)), components);
        }
        if (directives) {
            extend(instance.directives ||
                (instance.directives = extend({}, instance.type.directives)), directives);
        }
    }
    // lifecycle options
    if (!asMixin) {
        callSyncHook('created', "c" /* CREATED */, options, instance, globalMixins);
    }
    if (beforeMount) {
        onBeforeMount(beforeMount.bind(publicThis));
    }
    if (mounted) {
        onMounted(mounted.bind(publicThis));
    }
    if (beforeUpdate) {
        onBeforeUpdate(beforeUpdate.bind(publicThis));
    }
    if (updated) {
        onUpdated(updated.bind(publicThis));
    }
    if (activated) {
        onActivated(activated.bind(publicThis));
    }
    if (deactivated) {
        onDeactivated(deactivated.bind(publicThis));
    }
    if (errorCaptured) {
        onErrorCaptured(errorCaptured.bind(publicThis));
    }
    if (renderTracked) {
        onRenderTracked(renderTracked.bind(publicThis));
    }
    if (renderTriggered) {
        onRenderTriggered(renderTriggered.bind(publicThis));
    }
    if (beforeUnmount) {
        onBeforeUnmount(beforeUnmount.bind(publicThis));
    }
    if (unmounted) {
        onUnmounted(unmounted.bind(publicThis));
    }
    if (isArray(expose)) {
        if (!asMixin) {
            if (expose.length) {
                const exposed = instance.exposed || (instance.exposed = proxyRefs({}));
                expose.forEach(key => {
                    exposed[key] = toRef(publicThis, key);
                });
            }
            else if (!instance.exposed) {
                instance.exposed = EMPTY_OBJ;
            }
        }
    }
}
function callSyncHook(name, type, options, instance, globalMixins) {
    for (let i = 0; i < globalMixins.length; i++) {
        callHookWithMixinAndExtends(name, type, globalMixins[i], instance);
    }
    callHookWithMixinAndExtends(name, type, options, instance);
}
function callHookWithMixinAndExtends(name, type, options, instance) {
    const { extends: base, mixins } = options;
    const selfHook = options[name];
    if (base) {
        callHookWithMixinAndExtends(name, type, base, instance);
    }
    if (mixins) {
        for (let i = 0; i < mixins.length; i++) {
            callHookWithMixinAndExtends(name, type, mixins[i], instance);
        }
    }
    if (selfHook) {
        callWithAsyncErrorHandling(selfHook.bind(instance.proxy), instance, type);
    }
}
function applyMixins(instance, mixins, deferredData, deferredWatch, deferredProvide) {
    for (let i = 0; i < mixins.length; i++) {
        applyOptions(instance, mixins[i], deferredData, deferredWatch, deferredProvide, true);
    }
}
function resolveData(instance, dataFn, publicThis) {
    shouldCacheAccess = false;
    const data = dataFn.call(publicThis, publicThis);
    shouldCacheAccess = true;
    if (!isObject(data)) ;
    else if (instance.data === EMPTY_OBJ) {
        instance.data = reactive(data);
    }
    else {
        // existing data: this is a mixin or extends.
        extend(instance.data, data);
    }
}
function createWatcher(raw, ctx, publicThis, key) {
    const getter = key.includes('.')
        ? createPathGetter(publicThis, key)
        : () => publicThis[key];
    if (isString(raw)) {
        const handler = ctx[raw];
        if (isFunction(handler)) {
            watch(getter, handler);
        }
    }
    else if (isFunction(raw)) {
        watch(getter, raw.bind(publicThis));
    }
    else if (isObject(raw)) {
        if (isArray(raw)) {
            raw.forEach(r => createWatcher(r, ctx, publicThis, key));
        }
        else {
            const handler = isFunction(raw.handler)
                ? raw.handler.bind(publicThis)
                : ctx[raw.handler];
            if (isFunction(handler)) {
                watch(getter, handler, raw);
            }
        }
    }
    else ;
}
function createPathGetter(ctx, path) {
    const segments = path.split('.');
    return () => {
        let cur = ctx;
        for (let i = 0; i < segments.length && cur; i++) {
            cur = cur[segments[i]];
        }
        return cur;
    };
}
function resolveMergedOptions(instance) {
    const raw = instance.type;
    const { __merged, mixins, extends: extendsOptions } = raw;
    if (__merged)
        return __merged;
    const globalMixins = instance.appContext.mixins;
    if (!globalMixins.length && !mixins && !extendsOptions)
        return raw;
    const options = {};
    globalMixins.forEach(m => mergeOptions(options, m, instance));
    mergeOptions(options, raw, instance);
    return (raw.__merged = options);
}
function mergeOptions(to, from, instance) {
    const strats = instance.appContext.config.optionMergeStrategies;
    const { mixins, extends: extendsOptions } = from;
    extendsOptions && mergeOptions(to, extendsOptions, instance);
    mixins &&
        mixins.forEach((m) => mergeOptions(to, m, instance));
    for (const key in from) {
        if (strats && hasOwn(strats, key)) {
            to[key] = strats[key](to[key], from[key], instance.proxy, key);
        }
        else {
            to[key] = from[key];
        }
    }
}

/**
 * #2437 In Vue 3, functional components do not have a public instance proxy but
 * they exist in the internal parent chain. For code that relies on traversing
 * public $parent chains, skip functional ones and go to the parent instead.
 */
const getPublicInstance = (i) => {
    if (!i)
        return null;
    if (isStatefulComponent(i))
        return i.exposed ? i.exposed : i.proxy;
    return getPublicInstance(i.parent);
};
const publicPropertiesMap = extend(Object.create(null), {
    $: i => i,
    $el: i => i.vnode.el,
    $data: i => i.data,
    $props: i => (i.props),
    $attrs: i => (i.attrs),
    $slots: i => (i.slots),
    $refs: i => (i.refs),
    $parent: i => getPublicInstance(i.parent),
    $root: i => getPublicInstance(i.root),
    $emit: i => i.emit,
    $options: i => (__VUE_OPTIONS_API__ ? resolveMergedOptions(i) : i.type),
    $forceUpdate: i => () => queueJob(i.update),
    $nextTick: i => nextTick.bind(i.proxy),
    $watch: i => (__VUE_OPTIONS_API__ ? instanceWatch.bind(i) : NOOP)
});
const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
        const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
        // let @vue/reactivity know it should never observe Vue public instances.
        if (key === "__v_skip" /* SKIP */) {
            return true;
        }
        // data / props / ctx
        // This getter gets called for every property access on the render context
        // during render and is a major hotspot. The most expensive part of this
        // is the multiple hasOwn() calls. It's much faster to do a simple property
        // access on a plain object, so we use an accessCache object (with null
        // prototype) to memoize what access type a key corresponds to.
        let normalizedProps;
        if (key[0] !== '$') {
            const n = accessCache[key];
            if (n !== undefined) {
                switch (n) {
                    case 0 /* SETUP */:
                        return setupState[key];
                    case 1 /* DATA */:
                        return data[key];
                    case 3 /* CONTEXT */:
                        return ctx[key];
                    case 2 /* PROPS */:
                        return props[key];
                    // default: just fallthrough
                }
            }
            else if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
                accessCache[key] = 0 /* SETUP */;
                return setupState[key];
            }
            else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
                accessCache[key] = 1 /* DATA */;
                return data[key];
            }
            else if (
            // only cache other properties when instance has declared (thus stable)
            // props
            (normalizedProps = instance.propsOptions[0]) &&
                hasOwn(normalizedProps, key)) {
                accessCache[key] = 2 /* PROPS */;
                return props[key];
            }
            else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
                accessCache[key] = 3 /* CONTEXT */;
                return ctx[key];
            }
            else if (!__VUE_OPTIONS_API__ || shouldCacheAccess) {
                accessCache[key] = 4 /* OTHER */;
            }
        }
        const publicGetter = publicPropertiesMap[key];
        let cssModule, globalProperties;
        // public $xxx properties
        if (publicGetter) {
            if (key === '$attrs') {
                track(instance, "get" /* GET */, key);
            }
            return publicGetter(instance);
        }
        else if (
        // css module (injected by vue-loader)
        (cssModule = type.__cssModules) &&
            (cssModule = cssModule[key])) {
            return cssModule;
        }
        else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
            // user may set custom properties to `this` that start with `$`
            accessCache[key] = 3 /* CONTEXT */;
            return ctx[key];
        }
        else if (
        // global properties
        ((globalProperties = appContext.config.globalProperties),
            hasOwn(globalProperties, key))) {
            return globalProperties[key];
        }
        else ;
    },
    set({ _: instance }, key, value) {
        const { data, setupState, ctx } = instance;
        if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
            setupState[key] = value;
        }
        else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
            data[key] = value;
        }
        else if (hasOwn(instance.props, key)) {
            return false;
        }
        if (key[0] === '$' && key.slice(1) in instance) {
            return false;
        }
        else {
            {
                ctx[key] = value;
            }
        }
        return true;
    },
    has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
        let normalizedProps;
        return (accessCache[key] !== undefined ||
            (data !== EMPTY_OBJ && hasOwn(data, key)) ||
            (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) ||
            ((normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key)) ||
            hasOwn(ctx, key) ||
            hasOwn(publicPropertiesMap, key) ||
            hasOwn(appContext.config.globalProperties, key));
    }
};
const RuntimeCompiledPublicInstanceProxyHandlers = extend({}, PublicInstanceProxyHandlers, {
    get(target, key) {
        // fast path for unscopables when using `with` block
        if (key === Symbol.unscopables) {
            return;
        }
        return PublicInstanceProxyHandlers.get(target, key, target);
    },
    has(_, key) {
        const has = key[0] !== '_' && !isGloballyWhitelisted(key);
        return has;
    }
});

const emptyAppContext = createAppContext();
let uid$1 = 0;
function createComponentInstance(vnode, parent, suspense) {
    const type = vnode.type;
    // inherit parent app context - or - if root, adopt from root vnode
    const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
    const instance = {
        uid: uid$1++,
        vnode,
        type,
        parent,
        appContext,
        root: null,
        next: null,
        subTree: null,
        update: null,
        render: null,
        proxy: null,
        exposed: null,
        withProxy: null,
        effects: null,
        provides: parent ? parent.provides : Object.create(appContext.provides),
        accessCache: null,
        renderCache: [],
        // local resovled assets
        components: null,
        directives: null,
        // resolved props and emits options
        propsOptions: normalizePropsOptions(type, appContext),
        emitsOptions: normalizeEmitsOptions(type, appContext),
        // emit
        emit: null,
        emitted: null,
        // props default value
        propsDefaults: EMPTY_OBJ,
        // state
        ctx: EMPTY_OBJ,
        data: EMPTY_OBJ,
        props: EMPTY_OBJ,
        attrs: EMPTY_OBJ,
        slots: EMPTY_OBJ,
        refs: EMPTY_OBJ,
        setupState: EMPTY_OBJ,
        setupContext: null,
        // suspense related
        suspense,
        suspenseId: suspense ? suspense.pendingId : 0,
        asyncDep: null,
        asyncResolved: false,
        // lifecycle hooks
        // not using enums here because it results in computed properties
        isMounted: false,
        isUnmounted: false,
        isDeactivated: false,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null
    };
    {
        instance.ctx = { _: instance };
    }
    instance.root = parent ? parent.root : instance;
    instance.emit = emit.bind(null, instance);
    return instance;
}
let currentInstance = null;
const setCurrentInstance = (instance) => {
    currentInstance = instance;
};
function isStatefulComponent(instance) {
    return instance.vnode.shapeFlag & 4 /* STATEFUL_COMPONENT */;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
    isInSSRComponentSetup = isSSR;
    const { props, children } = instance.vnode;
    const isStateful = isStatefulComponent(instance);
    initProps(instance, props, isStateful, isSSR);
    initSlots(instance, children);
    const setupResult = isStateful
        ? setupStatefulComponent(instance, isSSR)
        : undefined;
    isInSSRComponentSetup = false;
    return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
    const Component = instance.type;
    // 0. create render proxy property access cache
    instance.accessCache = Object.create(null);
    // 1. create public instance / render proxy
    // also mark it raw so it's never observed
    instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
    // 2. call setup()
    const { setup } = Component;
    if (setup) {
        const setupContext = (instance.setupContext =
            setup.length > 1 ? createSetupContext(instance) : null);
        currentInstance = instance;
        pauseTracking();
        const setupResult = callWithErrorHandling(setup, instance, 0 /* SETUP_FUNCTION */, [instance.props, setupContext]);
        resetTracking();
        currentInstance = null;
        if (isPromise(setupResult)) {
            if (isSSR) {
                // return the promise so server-renderer can wait on it
                return setupResult
                    .then((resolvedResult) => {
                    handleSetupResult(instance, resolvedResult);
                })
                    .catch(e => {
                    handleError(e, instance, 0 /* SETUP_FUNCTION */);
                });
            }
            else {
                // async setup returned Promise.
                // bail here and wait for re-entry.
                instance.asyncDep = setupResult;
            }
        }
        else {
            handleSetupResult(instance, setupResult);
        }
    }
    else {
        finishComponentSetup(instance);
    }
}
function handleSetupResult(instance, setupResult, isSSR) {
    if (isFunction(setupResult)) {
        // setup returned an inline render function
        {
            instance.render = setupResult;
        }
    }
    else if (isObject(setupResult)) {
        // setup returned bindings.
        // assuming a render function compiled from template is present.
        if (__VUE_PROD_DEVTOOLS__) {
            instance.devtoolsRawSetupState = setupResult;
        }
        instance.setupState = proxyRefs(setupResult);
    }
    else ;
    finishComponentSetup(instance);
}
function finishComponentSetup(instance, isSSR) {
    const Component = instance.type;
    // template / render function normalization
    if (!instance.render) {
        instance.render = (Component.render || NOOP);
        // for runtime-compiled render functions using `with` blocks, the render
        // proxy used needs a different `has` handler which is more performant and
        // also only allows a whitelist of globals to fallthrough.
        if (instance.render._rc) {
            instance.withProxy = new Proxy(instance.ctx, RuntimeCompiledPublicInstanceProxyHandlers);
        }
    }
    // support for 2.x options
    if (__VUE_OPTIONS_API__) {
        currentInstance = instance;
        pauseTracking();
        applyOptions(instance, Component);
        resetTracking();
        currentInstance = null;
    }
}
function createSetupContext(instance) {
    const expose = exposed => {
        instance.exposed = proxyRefs(exposed);
    };
    {
        return {
            attrs: instance.attrs,
            slots: instance.slots,
            emit: instance.emit,
            expose
        };
    }
}
// record effects created during a component's setup() so that they can be
// stopped when the component unmounts
function recordInstanceBoundEffect(effect, instance = currentInstance) {
    if (instance) {
        (instance.effects || (instance.effects = [])).push(effect);
    }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, c => c.toUpperCase()).replace(/[-_]/g, '');
function getComponentName(Component) {
    return isFunction(Component)
        ? Component.displayName || Component.name
        : Component.name;
}
/* istanbul ignore next */
function formatComponentName(instance, Component, isRoot = false) {
    let name = getComponentName(Component);
    if (!name && Component.__file) {
        const match = Component.__file.match(/([^/\\]+)\.\w+$/);
        if (match) {
            name = match[1];
        }
    }
    if (!name && instance && instance.parent) {
        // try to infer the name based on reverse resolution
        const inferFromRegistry = (registry) => {
            for (const key in registry) {
                if (registry[key] === Component) {
                    return key;
                }
            }
        };
        name =
            inferFromRegistry(instance.components ||
                instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
    }
    return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
    return isFunction(value) && '__vccOpts' in value;
}

function computed(getterOrOptions) {
    const c = computed$1(getterOrOptions);
    recordInstanceBoundEffect(c.effect);
    return c;
}

// Core API ------------------------------------------------------------------
const version = "3.0.11";

const svgNS = 'http://www.w3.org/2000/svg';
const doc = (typeof document !== 'undefined' ? document : null);
let tempContainer;
let tempSVGContainer;
const nodeOps = {
    insert: (child, parent, anchor) => {
        parent.insertBefore(child, anchor || null);
    },
    remove: child => {
        const parent = child.parentNode;
        if (parent) {
            parent.removeChild(child);
        }
    },
    createElement: (tag, isSVG, is, props) => {
        const el = isSVG
            ? doc.createElementNS(svgNS, tag)
            : doc.createElement(tag, is ? { is } : undefined);
        if (tag === 'select' && props && props.multiple != null) {
            el.setAttribute('multiple', props.multiple);
        }
        return el;
    },
    createText: text => doc.createTextNode(text),
    createComment: text => doc.createComment(text),
    setText: (node, text) => {
        node.nodeValue = text;
    },
    setElementText: (el, text) => {
        el.textContent = text;
    },
    parentNode: node => node.parentNode,
    nextSibling: node => node.nextSibling,
    querySelector: selector => doc.querySelector(selector),
    setScopeId(el, id) {
        el.setAttribute(id, '');
    },
    cloneNode(el) {
        const cloned = el.cloneNode(true);
        // #3072
        // - in `patchDOMProp`, we store the actual value in the `el._value` property.
        // - normally, elements using `:value` bindings will not be hoisted, but if
        //   the bound value is a constant, e.g. `:value="true"` - they do get
        //   hoisted.
        // - in production, hoisted nodes are cloned when subsequent inserts, but
        //   cloneNode() does not copy the custom property we attached.
        // - This may need to account for other custom DOM properties we attach to
        //   elements in addition to `_value` in the future.
        if (`_value` in el) {
            cloned._value = el._value;
        }
        return cloned;
    },
    // __UNSAFE__
    // Reason: innerHTML.
    // Static content here can only come from compiled templates.
    // As long as the user only uses trusted templates, this is safe.
    insertStaticContent(content, parent, anchor, isSVG) {
        const temp = isSVG
            ? tempSVGContainer ||
                (tempSVGContainer = doc.createElementNS(svgNS, 'svg'))
            : tempContainer || (tempContainer = doc.createElement('div'));
        temp.innerHTML = content;
        const first = temp.firstChild;
        let node = first;
        let last = node;
        while (node) {
            last = node;
            nodeOps.insert(node, parent, anchor);
            node = temp.firstChild;
        }
        return [first, last];
    }
};

// compiler should normalize class + :class bindings on the same element
// into a single binding ['staticClass', dynamic]
function patchClass(el, value, isSVG) {
    if (value == null) {
        value = '';
    }
    if (isSVG) {
        el.setAttribute('class', value);
    }
    else {
        // directly setting className should be faster than setAttribute in theory
        // if this is an element during a transition, take the temporary transition
        // classes into account.
        const transitionClasses = el._vtc;
        if (transitionClasses) {
            value = (value
                ? [value, ...transitionClasses]
                : [...transitionClasses]).join(' ');
        }
        el.className = value;
    }
}

function patchStyle(el, prev, next) {
    const style = el.style;
    if (!next) {
        el.removeAttribute('style');
    }
    else if (isString(next)) {
        if (prev !== next) {
            const current = style.display;
            style.cssText = next;
            // indicates that the `display` of the element is controlled by `v-show`,
            // so we always keep the current `display` value regardless of the `style` value,
            // thus handing over control to `v-show`.
            if ('_vod' in el) {
                style.display = current;
            }
        }
    }
    else {
        for (const key in next) {
            setStyle(style, key, next[key]);
        }
        if (prev && !isString(prev)) {
            for (const key in prev) {
                if (next[key] == null) {
                    setStyle(style, key, '');
                }
            }
        }
    }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
    if (isArray(val)) {
        val.forEach(v => setStyle(style, name, v));
    }
    else {
        if (name.startsWith('--')) {
            // custom property definition
            style.setProperty(name, val);
        }
        else {
            const prefixed = autoPrefix(style, name);
            if (importantRE.test(val)) {
                // !important
                style.setProperty(hyphenate(prefixed), val.replace(importantRE, ''), 'important');
            }
            else {
                style[prefixed] = val;
            }
        }
    }
}
const prefixes = ['Webkit', 'Moz', 'ms'];
const prefixCache = {};
function autoPrefix(style, rawName) {
    const cached = prefixCache[rawName];
    if (cached) {
        return cached;
    }
    let name = camelize(rawName);
    if (name !== 'filter' && name in style) {
        return (prefixCache[rawName] = name);
    }
    name = capitalize(name);
    for (let i = 0; i < prefixes.length; i++) {
        const prefixed = prefixes[i] + name;
        if (prefixed in style) {
            return (prefixCache[rawName] = prefixed);
        }
    }
    return rawName;
}

const xlinkNS = 'http://www.w3.org/1999/xlink';
function patchAttr(el, key, value, isSVG) {
    if (isSVG && key.startsWith('xlink:')) {
        if (value == null) {
            el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
        }
        else {
            el.setAttributeNS(xlinkNS, key, value);
        }
    }
    else {
        // note we are only checking boolean attributes that don't have a
        // corresponding dom prop of the same name here.
        const isBoolean = isSpecialBooleanAttr(key);
        if (value == null || (isBoolean && value === false)) {
            el.removeAttribute(key);
        }
        else {
            el.setAttribute(key, isBoolean ? '' : value);
        }
    }
}

// __UNSAFE__
// functions. The user is responsible for using them with only trusted content.
function patchDOMProp(el, key, value, 
// the following args are passed only due to potential innerHTML/textContent
// overriding existing VNodes, in which case the old tree must be properly
// unmounted.
prevChildren, parentComponent, parentSuspense, unmountChildren) {
    if (key === 'innerHTML' || key === 'textContent') {
        if (prevChildren) {
            unmountChildren(prevChildren, parentComponent, parentSuspense);
        }
        el[key] = value == null ? '' : value;
        return;
    }
    if (key === 'value' && el.tagName !== 'PROGRESS') {
        // store value as _value as well since
        // non-string values will be stringified.
        el._value = value;
        const newValue = value == null ? '' : value;
        if (el.value !== newValue) {
            el.value = newValue;
        }
        return;
    }
    if (value === '' || value == null) {
        const type = typeof el[key];
        if (value === '' && type === 'boolean') {
            // e.g. <select multiple> compiles to { multiple: '' }
            el[key] = true;
            return;
        }
        else if (value == null && type === 'string') {
            // e.g. <div :id="null">
            el[key] = '';
            el.removeAttribute(key);
            return;
        }
        else if (type === 'number') {
            // e.g. <img :width="null">
            el[key] = 0;
            el.removeAttribute(key);
            return;
        }
    }
    // some properties perform value validation and throw
    try {
        el[key] = value;
    }
    catch (e) {
    }
}

// Async edge case fix requires storing an event listener's attach timestamp.
let _getNow = Date.now;
let skipTimestampCheck = false;
if (typeof window !== 'undefined') {
    // Determine what event timestamp the browser is using. Annoyingly, the
    // timestamp can either be hi-res (relative to page load) or low-res
    // (relative to UNIX epoch), so in order to compare time we have to use the
    // same timestamp type when saving the flush timestamp.
    if (_getNow() > document.createEvent('Event').timeStamp) {
        // if the low-res timestamp which is bigger than the event timestamp
        // (which is evaluated AFTER) it means the event is using a hi-res timestamp,
        // and we need to use the hi-res version for event listeners as well.
        _getNow = () => performance.now();
    }
    // #3485: Firefox <= 53 has incorrect Event.timeStamp implementation
    // and does not fire microtasks in between event propagation, so safe to exclude.
    const ffMatch = navigator.userAgent.match(/firefox\/(\d+)/i);
    skipTimestampCheck = !!(ffMatch && Number(ffMatch[1]) <= 53);
}
// To avoid the overhead of repeatedly calling performance.now(), we cache
// and use the same timestamp for all event listeners attached in the same tick.
let cachedNow = 0;
const p$1 = Promise.resolve();
const reset = () => {
    cachedNow = 0;
};
const getNow = () => cachedNow || (p$1.then(reset), (cachedNow = _getNow()));
function addEventListener(el, event, handler, options) {
    el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
    el.removeEventListener(event, handler, options);
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
    // vei = vue event invokers
    const invokers = el._vei || (el._vei = {});
    const existingInvoker = invokers[rawName];
    if (nextValue && existingInvoker) {
        // patch
        existingInvoker.value = nextValue;
    }
    else {
        const [name, options] = parseName(rawName);
        if (nextValue) {
            // add
            const invoker = (invokers[rawName] = createInvoker(nextValue, instance));
            addEventListener(el, name, invoker, options);
        }
        else if (existingInvoker) {
            // remove
            removeEventListener(el, name, existingInvoker, options);
            invokers[rawName] = undefined;
        }
    }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
    let options;
    if (optionsModifierRE.test(name)) {
        options = {};
        let m;
        while ((m = name.match(optionsModifierRE))) {
            name = name.slice(0, name.length - m[0].length);
            options[m[0].toLowerCase()] = true;
        }
    }
    return [hyphenate(name.slice(2)), options];
}
function createInvoker(initialValue, instance) {
    const invoker = (e) => {
        // async edge case #6566: inner click event triggers patch, event handler
        // attached to outer element during patch, and triggered again. This
        // happens because browsers fire microtask ticks between event propagation.
        // the solution is simple: we save the timestamp when a handler is attached,
        // and the handler would only fire if the event passed to it was fired
        // AFTER it was attached.
        const timeStamp = e.timeStamp || _getNow();
        if (skipTimestampCheck || timeStamp >= invoker.attached - 1) {
            callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5 /* NATIVE_EVENT_HANDLER */, [e]);
        }
    };
    invoker.value = initialValue;
    invoker.attached = getNow();
    return invoker;
}
function patchStopImmediatePropagation(e, value) {
    if (isArray(value)) {
        const originalStop = e.stopImmediatePropagation;
        e.stopImmediatePropagation = () => {
            originalStop.call(e);
            e._stopped = true;
        };
        return value.map(fn => (e) => !e._stopped && fn(e));
    }
    else {
        return value;
    }
}

const nativeOnRE = /^on[a-z]/;
const forcePatchProp = (_, key) => key === 'value';
const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
    switch (key) {
        // special
        case 'class':
            patchClass(el, nextValue, isSVG);
            break;
        case 'style':
            patchStyle(el, prevValue, nextValue);
            break;
        default:
            if (isOn(key)) {
                // ignore v-model listeners
                if (!isModelListener(key)) {
                    patchEvent(el, key, prevValue, nextValue, parentComponent);
                }
            }
            else if (shouldSetAsProp(el, key, nextValue, isSVG)) {
                patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
            }
            else {
                // special case for <input v-model type="checkbox"> with
                // :true-value & :false-value
                // store value as dom properties since non-string values will be
                // stringified.
                if (key === 'true-value') {
                    el._trueValue = nextValue;
                }
                else if (key === 'false-value') {
                    el._falseValue = nextValue;
                }
                patchAttr(el, key, nextValue, isSVG);
            }
            break;
    }
};
function shouldSetAsProp(el, key, value, isSVG) {
    if (isSVG) {
        // most keys must be set as attribute on svg elements to work
        // ...except innerHTML
        if (key === 'innerHTML') {
            return true;
        }
        // or native onclick with function values
        if (key in el && nativeOnRE.test(key) && isFunction(value)) {
            return true;
        }
        return false;
    }
    // spellcheck and draggable are numerated attrs, however their
    // corresponding DOM properties are actually booleans - this leads to
    // setting it with a string "false" value leading it to be coerced to
    // `true`, so we need to always treat them as attributes.
    // Note that `contentEditable` doesn't have this problem: its DOM
    // property is also enumerated string values.
    if (key === 'spellcheck' || key === 'draggable') {
        return false;
    }
    // #1787, #2840 form property on form elements is readonly and must be set as
    // attribute.
    if (key === 'form') {
        return false;
    }
    // #1526 <input list> must be set as attribute
    if (key === 'list' && el.tagName === 'INPUT') {
        return false;
    }
    // #2766 <textarea type> must be set as attribute
    if (key === 'type' && el.tagName === 'TEXTAREA') {
        return false;
    }
    // native onclick with string value, must be set as attribute
    if (nativeOnRE.test(key) && isString(value)) {
        return false;
    }
    return key in el;
}

const rendererOptions = extend({ patchProp, forcePatchProp }, nodeOps);
// lazy create the renderer - this makes core renderer logic tree-shakable
// in case the user only imports reactivity utilities from Vue.
let renderer;
function ensureRenderer() {
    return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = ((...args) => {
    const app = ensureRenderer().createApp(...args);
    const { mount } = app;
    app.mount = (containerOrSelector) => {
        const container = normalizeContainer(containerOrSelector);
        if (!container)
            return;
        const component = app._component;
        if (!isFunction(component) && !component.render && !component.template) {
            component.template = container.innerHTML;
        }
        // clear content before mounting
        container.innerHTML = '';
        const proxy = mount(container, false, container instanceof SVGElement);
        if (container instanceof Element) {
            container.removeAttribute('v-cloak');
            container.setAttribute('data-v-app', '');
        }
        return proxy;
    };
    return app;
});
function normalizeContainer(container) {
    if (isString(container)) {
        const res = document.querySelector(container);
        return res;
    }
    return container;
}

var _imports_0 = "https://resources.realitymedia.digital/test-vue-app/dist/1a6ace377133f14a.png";

pushScopeId("data-v-76142bf1");
const _hoisted_1$3 = {
  "xr-layer": "",
  class: "fade"
};
const _hoisted_2$3 = /*#__PURE__*/createVNode("p", null, " Here's some more text just to make things not blank. ", -1 /* HOISTED */);
popScopeId();


var script$3 = {
  expose: [],
  props: {
  msg: String
},
  setup(__props) {



const state = reactive({ count: 0 });

return (_ctx, _cache) => {
  return (openBlock(), createBlock(Fragment, null, [
    createVNode("h1", _hoisted_1$3, toDisplayString(__props.msg), 1 /* TEXT */),
    _hoisted_2$3,
    createVNode("button", {
      "xr-layer": "",
      onClick: _cache[1] || (_cache[1] = $event => (unref(state).count++))
    }, "count is: " + toDisplayString(unref(state).count), 1 /* TEXT */)
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$3 = "\na[data-v-76142bf1] {\n  color: #b542b9;\n}\n*[data-v-76142bf1] {\n    line-height : normal;\n}\n.fade[data-v-76142bf1] {\n  color: #9803a5;\n  /* transition: color 1s; */\n}\n.fade[data-v-76142bf1]:hover {\n  color: #a78e06;\n}\np[data-v-76142bf1] {\n    display: block;\n    margin-block-start: 1em;\n    margin-block-end: 1em;\n    margin-inline-start: 0px;\n    margin-inline-end: 0px;\n}\nh1[data-v-76142bf1] {\n      /* text-align: center; */\n\n    display: block;\n    font-size: 2em;\n    margin-block-start: 0.67em;\n    margin-block-end: 0.67em;\n    margin-inline-start: 0px;\n    margin-inline-end: 0px;\n    font-weight: bold;\n}\nbutton[data-v-76142bf1] {\n    /* width: 100px;\n    height: 30px; */\n    appearance: auto;\n    -webkit-writing-mode: horizontal-tb !important;\n    text-rendering: auto;\n    color: -internal-light-dark(black, white);\n    letter-spacing: normal;\n    word-spacing: normal;\n    text-transform: none;\n    text-indent: 0px;\n    text-shadow: none;\n    display: inline-block;\n    text-align: center;\n    align-items: flex-start;\n    cursor: default;\n    background-color: -internal-light-dark(rgb(239, 239, 239), rgb(59, 59, 59));\n    box-sizing: border-box;\n    margin: 0em;\n    font: 400 13.3333px Arial;\n    padding: 1px 6px;\n    border-width: 2px;\n    border-style: outset;\n    border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));\n    border-image: initial;\n    border-radius: 2px;\n}\n\n/* button :hover {\n    background-color: -internal-light-dark(rgb(150, 150, 150), rgb(121, 121, 121));\n} */\n";
styleInject(css_248z$3);

script$3.__scopeId = "data-v-76142bf1";
script$3.__file = "src/components/SomeText.vue";

pushScopeId("data-v-05605788");
const _hoisted_1$2 = { id: "top" };
const _hoisted_2$2 = /*#__PURE__*/createVNode("img", {
  alt: "Vue logo",
  src: _imports_0
}, null, -1 /* HOISTED */);
popScopeId();

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md

var script$2 = {
  expose: [],
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$2, [
    _hoisted_2$2,
    createVNode(script$3, { msg: "Some Text We passed to the SomeText Component" })
  ]))
}
}

};

var css_248z$2 = "\n#top[data-v-05605788] {\n  font-family: Avenir, Helvetica, Arial, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-align: center;\n  color: #50312c;\n  margin-top: 30px;\n  border: 5;\n  border-radius: 10px;\n  border-color: red;\n  width: 400px; height: 450px;\n  position: absolute;\n\n  display: block;\n  background-color: white;\n}\n*[data-v-05605788] {\n    box-sizing: content-box;\n}\nimg[data-v-05605788] {\n    max-width: none;\n        display: inline;\n}\n";
styleInject(css_248z$2);

script$2.__scopeId = "data-v-05605788";
script$2.__file = "src/apps/HubsTest1/AppText.vue";

var THREE$1 = THREE;

var t = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': THREE$1
});

class e{constructor(t=0,e=0){Object.defineProperty(this,"isVector2",{value:!0}),this.x=t,this.y=e;}get width(){return this.x}set width(t){this.x=t;}get height(){return this.y}set height(t){this.y=t;}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t,e){return void 0!==e?(console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,e)):(this.x+=t.x,this.y+=t.y,this)}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t,e){return void 0!==e?(console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,e)):(this.x-=t.x,this.y-=t.y,this)}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,r=this.y,n=t.elements;return this.x=n[0]*e+n[3]*r+n[6],this.y=n[1]*e+n[4]*r+n[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(t,Math.min(e,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,r=this.y-t.y;return e*e+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,r){return this.x=t.x+(e.x-t.x)*r,this.y=t.y+(e.y-t.y)*r,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e,r){return void 0!==r&&console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const r=Math.cos(e),n=Math.sin(e),i=this.x-t.x,s=this.y-t.y;return this.x=i*r-s*n+t.x,this.y=i*n+s*r+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}}const r=[];for(let Oh=0;Oh<256;Oh++)r[Oh]=(Oh<16?"0":"")+Oh.toString(16);let n=1234567;const i={DEG2RAD:Math.PI/180,RAD2DEG:180/Math.PI,generateUUID:function(){const t=4294967295*Math.random()|0,e=4294967295*Math.random()|0,n=4294967295*Math.random()|0,i=4294967295*Math.random()|0;return (r[255&t]+r[t>>8&255]+r[t>>16&255]+r[t>>24&255]+"-"+r[255&e]+r[e>>8&255]+"-"+r[e>>16&15|64]+r[e>>24&255]+"-"+r[63&n|128]+r[n>>8&255]+"-"+r[n>>16&255]+r[n>>24&255]+r[255&i]+r[i>>8&255]+r[i>>16&255]+r[i>>24&255]).toUpperCase()},clamp:function(t,e,r){return Math.max(e,Math.min(r,t))},euclideanModulo:function(t,e){return (t%e+e)%e},mapLinear:function(t,e,r,n,i){return n+(t-e)*(i-n)/(r-e)},lerp:function(t,e,r){return (1-r)*t+r*e},smoothstep:function(t,e,r){return t<=e?0:t>=r?1:(t=(t-e)/(r-e))*t*(3-2*t)},smootherstep:function(t,e,r){return t<=e?0:t>=r?1:(t=(t-e)/(r-e))*t*t*(t*(6*t-15)+10)},randInt:function(t,e){return t+Math.floor(Math.random()*(e-t+1))},randFloat:function(t,e){return t+Math.random()*(e-t)},randFloatSpread:function(t){return t*(.5-Math.random())},seededRandom:function(t){return void 0!==t&&(n=t%2147483647),n=16807*n%2147483647,(n-1)/2147483646},degToRad:function(t){return t*i.DEG2RAD},radToDeg:function(t){return t*i.RAD2DEG},isPowerOfTwo:function(t){return 0==(t&t-1)&&0!==t},ceilPowerOfTwo:function(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))},floorPowerOfTwo:function(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))},setQuaternionFromProperEuler:function(t,e,r,n,i){const s=Math.cos,a=Math.sin,o=s(r/2),u=a(r/2),h=s((e+n)/2),c=a((e+n)/2),l=s((e-n)/2),p=a((e-n)/2),f=s((n-e)/2),d=a((n-e)/2);switch(i){case"XYX":t.set(o*c,u*l,u*p,o*h);break;case"YZY":t.set(u*p,o*c,u*l,o*h);break;case"ZXZ":t.set(u*l,u*p,o*c,o*h);break;case"XZX":t.set(o*c,u*d,u*f,o*h);break;case"YXY":t.set(u*f,o*c,u*d,o*h);break;case"ZYZ":t.set(u*d,u*f,o*c,o*h);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i);}}};class s{constructor(t=0,e=0,r=0,n=1){Object.defineProperty(this,"isQuaternion",{value:!0}),this._x=t,this._y=e,this._z=r,this._w=n;}static slerp(t,e,r,n){return r.copy(t).slerp(e,n)}static slerpFlat(t,e,r,n,i,s,a){let o=r[n+0],u=r[n+1],h=r[n+2],c=r[n+3];const l=i[s+0],p=i[s+1],f=i[s+2],d=i[s+3];if(c!==d||o!==l||u!==p||h!==f){let t=1-a;const e=o*l+u*p+h*f+c*d,r=e>=0?1:-1,n=1-e*e;if(n>Number.EPSILON){const i=Math.sqrt(n),s=Math.atan2(i,e*r);t=Math.sin(t*s)/i,a=Math.sin(a*s)/i;}const i=a*r;if(o=o*t+l*i,u=u*t+p*i,h=h*t+f*i,c=c*t+d*i,t===1-a){const t=1/Math.sqrt(o*o+u*u+h*h+c*c);o*=t,u*=t,h*=t,c*=t;}}t[e]=o,t[e+1]=u,t[e+2]=h,t[e+3]=c;}static multiplyQuaternionsFlat(t,e,r,n,i,s){const a=r[n],o=r[n+1],u=r[n+2],h=r[n+3],c=i[s],l=i[s+1],p=i[s+2],f=i[s+3];return t[e]=a*f+h*c+o*p-u*l,t[e+1]=o*f+h*l+u*c-a*p,t[e+2]=u*f+h*p+a*l-o*c,t[e+3]=h*f-a*c-o*l-u*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback();}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback();}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback();}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback();}set(t,e,r,n){return this._x=t,this._y=e,this._z=r,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e){if(!t||!t.isEuler)throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");const r=t._x,n=t._y,i=t._z,s=t._order,a=Math.cos,o=Math.sin,u=a(r/2),h=a(n/2),c=a(i/2),l=o(r/2),p=o(n/2),f=o(i/2);switch(s){case"XYZ":this._x=l*h*c+u*p*f,this._y=u*p*c-l*h*f,this._z=u*h*f+l*p*c,this._w=u*h*c-l*p*f;break;case"YXZ":this._x=l*h*c+u*p*f,this._y=u*p*c-l*h*f,this._z=u*h*f-l*p*c,this._w=u*h*c+l*p*f;break;case"ZXY":this._x=l*h*c-u*p*f,this._y=u*p*c+l*h*f,this._z=u*h*f+l*p*c,this._w=u*h*c-l*p*f;break;case"ZYX":this._x=l*h*c-u*p*f,this._y=u*p*c+l*h*f,this._z=u*h*f-l*p*c,this._w=u*h*c+l*p*f;break;case"YZX":this._x=l*h*c+u*p*f,this._y=u*p*c+l*h*f,this._z=u*h*f-l*p*c,this._w=u*h*c-l*p*f;break;case"XZY":this._x=l*h*c-u*p*f,this._y=u*p*c-l*h*f,this._z=u*h*f+l*p*c,this._w=u*h*c+l*p*f;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s);}return !1!==e&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const r=e/2,n=Math.sin(r);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,r=e[0],n=e[4],i=e[8],s=e[1],a=e[5],o=e[9],u=e[2],h=e[6],c=e[10],l=r+a+c;if(l>0){const t=.5/Math.sqrt(l+1);this._w=.25/t,this._x=(h-o)*t,this._y=(i-u)*t,this._z=(s-n)*t;}else if(r>a&&r>c){const t=2*Math.sqrt(1+r-a-c);this._w=(h-o)/t,this._x=.25*t,this._y=(n+s)/t,this._z=(i+u)/t;}else if(a>c){const t=2*Math.sqrt(1+a-r-c);this._w=(i-u)/t,this._x=(n+s)/t,this._y=.25*t,this._z=(o+h)/t;}else {const t=2*Math.sqrt(1+c-r-a);this._w=(s-n)/t,this._x=(i+u)/t,this._y=(o+h)/t,this._z=.25*t;}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let r=t.dot(e)+1;return r<1e-6?(r=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=r):(this._x=0,this._y=-t.z,this._z=t.y,this._w=r)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=r),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(i.clamp(this.dot(t),-1,1)))}rotateTowards(t,e){const r=this.angleTo(t);if(0===r)return this;const n=Math.min(1,e/r);return this.slerp(t,n),this}identity(){return this.set(0,0,0,1)}inverse(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return 0===t?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t,e){return void 0!==e?(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(t,e)):this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const r=t._x,n=t._y,i=t._z,s=t._w,a=e._x,o=e._y,u=e._z,h=e._w;return this._x=r*h+s*a+n*u-i*o,this._y=n*h+s*o+i*a-r*u,this._z=i*h+s*u+r*o-n*a,this._w=s*h-r*a-n*o-i*u,this._onChangeCallback(),this}slerp(t,e){if(0===e)return this;if(1===e)return this.copy(t);const r=this._x,n=this._y,i=this._z,s=this._w;let a=s*t._w+r*t._x+n*t._y+i*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=s,this._x=r,this._y=n,this._z=i,this;const o=1-a*a;if(o<=Number.EPSILON){const t=1-e;return this._w=t*s+e*this._w,this._x=t*r+e*this._x,this._y=t*n+e*this._y,this._z=t*i+e*this._z,this.normalize(),this._onChangeCallback(),this}const u=Math.sqrt(o),h=Math.atan2(u,a),c=Math.sin((1-e)*h)/u,l=Math.sin(e*h)/u;return this._w=s*c+this._w*l,this._x=r*c+this._x*l,this._y=n*c+this._y*l,this._z=i*c+this._z*l,this._onChangeCallback(),this}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}}class a{constructor(t=0,e=0,r=0){Object.defineProperty(this,"isVector3",{value:!0}),this.x=t,this.y=e,this.z=r;}set(t,e,r){return void 0===r&&(r=this.z),this.x=t,this.y=e,this.z=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t,e){return void 0!==e?(console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,e)):(this.x+=t.x,this.y+=t.y,this.z+=t.z,this)}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t,e){return void 0!==e?(console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,e)):(this.x-=t.x,this.y-=t.y,this.z-=t.z,this)}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t,e){return void 0!==e?(console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(t,e)):(this.x*=t.x,this.y*=t.y,this.z*=t.z,this)}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return t&&t.isEuler||console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."),this.applyQuaternion(u.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(u.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,r=this.y,n=this.z,i=t.elements;return this.x=i[0]*e+i[3]*r+i[6]*n,this.y=i[1]*e+i[4]*r+i[7]*n,this.z=i[2]*e+i[5]*r+i[8]*n,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,r=this.y,n=this.z,i=t.elements,s=1/(i[3]*e+i[7]*r+i[11]*n+i[15]);return this.x=(i[0]*e+i[4]*r+i[8]*n+i[12])*s,this.y=(i[1]*e+i[5]*r+i[9]*n+i[13])*s,this.z=(i[2]*e+i[6]*r+i[10]*n+i[14])*s,this}applyQuaternion(t){const e=this.x,r=this.y,n=this.z,i=t.x,s=t.y,a=t.z,o=t.w,u=o*e+s*n-a*r,h=o*r+a*e-i*n,c=o*n+i*r-s*e,l=-i*e-s*r-a*n;return this.x=u*o+l*-i+h*-a-c*-s,this.y=h*o+l*-s+c*-i-u*-a,this.z=c*o+l*-a+u*-s-h*-i,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,r=this.y,n=this.z,i=t.elements;return this.x=i[0]*e+i[4]*r+i[8]*n,this.y=i[1]*e+i[5]*r+i[9]*n,this.z=i[2]*e+i[6]*r+i[10]*n,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(t,Math.min(e,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,r){return this.x=t.x+(e.x-t.x)*r,this.y=t.y+(e.y-t.y)*r,this.z=t.z+(e.z-t.z)*r,this}cross(t,e){return void 0!==e?(console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(t,e)):this.crossVectors(this,t)}crossVectors(t,e){const r=t.x,n=t.y,i=t.z,s=e.x,a=e.y,o=e.z;return this.x=n*o-i*a,this.y=i*s-r*o,this.z=r*a-n*s,this}projectOnVector(t){const e=t.lengthSq();if(0===e)return this.set(0,0,0);const r=t.dot(this)/e;return this.copy(t).multiplyScalar(r)}projectOnPlane(t){return o.copy(this).projectOnVector(t),this.sub(o)}reflect(t){return this.sub(o.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(0===e)return Math.PI/2;const r=this.dot(t)/e;return Math.acos(i.clamp(r,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,r=this.y-t.y,n=this.z-t.z;return e*e+r*r+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,r){const n=Math.sin(e)*t;return this.x=n*Math.sin(r),this.y=Math.cos(e)*t,this.z=n*Math.cos(r),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,r){return this.x=t*Math.sin(e),this.y=r,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),r=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=r,this.z=n,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,4*e)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,3*e)}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e,r){return void 0!==r&&console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}}const o=new a,u=new s;class c{constructor(){Object.defineProperty(this,"isMatrix4",{value:!0}),this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.");}set(t,e,r,n,i,s,a,o,u,h,c,l,p,f,d,m){const y=this.elements;return y[0]=t,y[4]=e,y[8]=r,y[12]=n,y[1]=i,y[5]=s,y[9]=a,y[13]=o,y[2]=u,y[6]=h,y[10]=c,y[14]=l,y[3]=p,y[7]=f,y[11]=d,y[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return (new c).fromArray(this.elements)}copy(t){const e=this.elements,r=t.elements;return e[0]=r[0],e[1]=r[1],e[2]=r[2],e[3]=r[3],e[4]=r[4],e[5]=r[5],e[6]=r[6],e[7]=r[7],e[8]=r[8],e[9]=r[9],e[10]=r[10],e[11]=r[11],e[12]=r[12],e[13]=r[13],e[14]=r[14],e[15]=r[15],this}copyPosition(t){const e=this.elements,r=t.elements;return e[12]=r[12],e[13]=r[13],e[14]=r[14],this}extractBasis(t,e,r){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(t,e,r){return this.set(t.x,e.x,r.x,0,t.y,e.y,r.y,0,t.z,e.z,r.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,r=t.elements,n=1/l.setFromMatrixColumn(t,0).length(),i=1/l.setFromMatrixColumn(t,1).length(),s=1/l.setFromMatrixColumn(t,2).length();return e[0]=r[0]*n,e[1]=r[1]*n,e[2]=r[2]*n,e[3]=0,e[4]=r[4]*i,e[5]=r[5]*i,e[6]=r[6]*i,e[7]=0,e[8]=r[8]*s,e[9]=r[9]*s,e[10]=r[10]*s,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){t&&t.isEuler||console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");const e=this.elements,r=t.x,n=t.y,i=t.z,s=Math.cos(r),a=Math.sin(r),o=Math.cos(n),u=Math.sin(n),h=Math.cos(i),c=Math.sin(i);if("XYZ"===t.order){const t=s*h,r=s*c,n=a*h,i=a*c;e[0]=o*h,e[4]=-o*c,e[8]=u,e[1]=r+n*u,e[5]=t-i*u,e[9]=-a*o,e[2]=i-t*u,e[6]=n+r*u,e[10]=s*o;}else if("YXZ"===t.order){const t=o*h,r=o*c,n=u*h,i=u*c;e[0]=t+i*a,e[4]=n*a-r,e[8]=s*u,e[1]=s*c,e[5]=s*h,e[9]=-a,e[2]=r*a-n,e[6]=i+t*a,e[10]=s*o;}else if("ZXY"===t.order){const t=o*h,r=o*c,n=u*h,i=u*c;e[0]=t-i*a,e[4]=-s*c,e[8]=n+r*a,e[1]=r+n*a,e[5]=s*h,e[9]=i-t*a,e[2]=-s*u,e[6]=a,e[10]=s*o;}else if("ZYX"===t.order){const t=s*h,r=s*c,n=a*h,i=a*c;e[0]=o*h,e[4]=n*u-r,e[8]=t*u+i,e[1]=o*c,e[5]=i*u+t,e[9]=r*u-n,e[2]=-u,e[6]=a*o,e[10]=s*o;}else if("YZX"===t.order){const t=s*o,r=s*u,n=a*o,i=a*u;e[0]=o*h,e[4]=i-t*c,e[8]=n*c+r,e[1]=c,e[5]=s*h,e[9]=-a*h,e[2]=-u*h,e[6]=r*c+n,e[10]=t-i*c;}else if("XZY"===t.order){const t=s*o,r=s*u,n=a*o,i=a*u;e[0]=o*h,e[4]=-c,e[8]=u*h,e[1]=t*c+i,e[5]=s*h,e[9]=r*c-n,e[2]=n*c-r,e[6]=a*h,e[10]=i*c+t;}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(f,t,d)}lookAt(t,e,r){const n=this.elements;return g.subVectors(t,e),0===g.lengthSq()&&(g.z=1),g.normalize(),m.crossVectors(r,g),0===m.lengthSq()&&(1===Math.abs(r.z)?g.x+=1e-4:g.z+=1e-4,g.normalize(),m.crossVectors(r,g)),m.normalize(),y.crossVectors(g,m),n[0]=m.x,n[4]=y.x,n[8]=g.x,n[1]=m.y,n[5]=y.y,n[9]=g.y,n[2]=m.z,n[6]=y.z,n[10]=g.z,this}multiply(t,e){return void 0!==e?(console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),this.multiplyMatrices(t,e)):this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const r=t.elements,n=e.elements,i=this.elements,s=r[0],a=r[4],o=r[8],u=r[12],h=r[1],c=r[5],l=r[9],p=r[13],f=r[2],d=r[6],m=r[10],y=r[14],g=r[3],v=r[7],x=r[11],w=r[15],b=n[0],_=n[4],M=n[8],E=n[12],N=n[1],S=n[5],T=n[9],O=n[13],z=n[2],A=n[6],C=n[10],R=n[14],D=n[3],k=n[7],I=n[11],L=n[15];return i[0]=s*b+a*N+o*z+u*D,i[4]=s*_+a*S+o*A+u*k,i[8]=s*M+a*T+o*C+u*I,i[12]=s*E+a*O+o*R+u*L,i[1]=h*b+c*N+l*z+p*D,i[5]=h*_+c*S+l*A+p*k,i[9]=h*M+c*T+l*C+p*I,i[13]=h*E+c*O+l*R+p*L,i[2]=f*b+d*N+m*z+y*D,i[6]=f*_+d*S+m*A+y*k,i[10]=f*M+d*T+m*C+y*I,i[14]=f*E+d*O+m*R+y*L,i[3]=g*b+v*N+x*z+w*D,i[7]=g*_+v*S+x*A+w*k,i[11]=g*M+v*T+x*C+w*I,i[15]=g*E+v*O+x*R+w*L,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],r=t[4],n=t[8],i=t[12],s=t[1],a=t[5],o=t[9],u=t[13],h=t[2],c=t[6],l=t[10],p=t[14];return t[3]*(+i*o*c-n*u*c-i*a*l+r*u*l+n*a*p-r*o*p)+t[7]*(+e*o*p-e*u*l+i*s*l-n*s*p+n*u*h-i*o*h)+t[11]*(+e*u*c-e*a*p-i*s*c+r*s*p+i*a*h-r*u*h)+t[15]*(-n*a*h-e*o*c+e*a*l+n*s*c-r*s*l+r*o*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,r){const n=this.elements;return t.isVector3?(n[12]=t.x,n[13]=t.y,n[14]=t.z):(n[12]=t,n[13]=e,n[14]=r),this}getInverse(t,e){void 0!==e&&console.warn("THREE.Matrix4: .getInverse() can no longer be configured to throw on degenerate.");const r=this.elements,n=t.elements,i=n[0],s=n[1],a=n[2],o=n[3],u=n[4],h=n[5],c=n[6],l=n[7],p=n[8],f=n[9],d=n[10],m=n[11],y=n[12],g=n[13],v=n[14],x=n[15],w=f*v*l-g*d*l+g*c*m-h*v*m-f*c*x+h*d*x,b=y*d*l-p*v*l-y*c*m+u*v*m+p*c*x-u*d*x,_=p*g*l-y*f*l+y*h*m-u*g*m-p*h*x+u*f*x,M=y*f*c-p*g*c-y*h*d+u*g*d+p*h*v-u*f*v,E=i*w+s*b+a*_+o*M;if(0===E)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/E;return r[0]=w*N,r[1]=(g*d*o-f*v*o-g*a*m+s*v*m+f*a*x-s*d*x)*N,r[2]=(h*v*o-g*c*o+g*a*l-s*v*l-h*a*x+s*c*x)*N,r[3]=(f*c*o-h*d*o-f*a*l+s*d*l+h*a*m-s*c*m)*N,r[4]=b*N,r[5]=(p*v*o-y*d*o+y*a*m-i*v*m-p*a*x+i*d*x)*N,r[6]=(y*c*o-u*v*o-y*a*l+i*v*l+u*a*x-i*c*x)*N,r[7]=(u*d*o-p*c*o+p*a*l-i*d*l-u*a*m+i*c*m)*N,r[8]=_*N,r[9]=(y*f*o-p*g*o-y*s*m+i*g*m+p*s*x-i*f*x)*N,r[10]=(u*g*o-y*h*o+y*s*l-i*g*l-u*s*x+i*h*x)*N,r[11]=(p*h*o-u*f*o-p*s*l+i*f*l+u*s*m-i*h*m)*N,r[12]=M*N,r[13]=(p*g*a-y*f*a+y*s*d-i*g*d-p*s*v+i*f*v)*N,r[14]=(y*h*a-u*g*a-y*s*c+i*g*c+u*s*v-i*h*v)*N,r[15]=(u*f*a-p*h*a+p*s*c-i*f*c-u*s*d+i*h*d)*N,this}scale(t){const e=this.elements,r=t.x,n=t.y,i=t.z;return e[0]*=r,e[4]*=n,e[8]*=i,e[1]*=r,e[5]*=n,e[9]*=i,e[2]*=r,e[6]*=n,e[10]*=i,e[3]*=r,e[7]*=n,e[11]*=i,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],r=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],n=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,r,n))}makeTranslation(t,e,r){return this.set(1,0,0,t,0,1,0,e,0,0,1,r,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),r=Math.sin(t);return this.set(1,0,0,0,0,e,-r,0,0,r,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),r=Math.sin(t);return this.set(e,0,r,0,0,1,0,0,-r,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),r=Math.sin(t);return this.set(e,-r,0,0,r,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const r=Math.cos(e),n=Math.sin(e),i=1-r,s=t.x,a=t.y,o=t.z,u=i*s,h=i*a;return this.set(u*s+r,u*a-n*o,u*o+n*a,0,u*a+n*o,h*a+r,h*o-n*s,0,u*o-n*a,h*o+n*s,i*o*o+r,0,0,0,0,1),this}makeScale(t,e,r){return this.set(t,0,0,0,0,e,0,0,0,0,r,0,0,0,0,1),this}makeShear(t,e,r){return this.set(1,e,r,0,t,1,r,0,t,e,1,0,0,0,0,1),this}compose(t,e,r){const n=this.elements,i=e._x,s=e._y,a=e._z,o=e._w,u=i+i,h=s+s,c=a+a,l=i*u,p=i*h,f=i*c,d=s*h,m=s*c,y=a*c,g=o*u,v=o*h,x=o*c,w=r.x,b=r.y,_=r.z;return n[0]=(1-(d+y))*w,n[1]=(p+x)*w,n[2]=(f-v)*w,n[3]=0,n[4]=(p-x)*b,n[5]=(1-(l+y))*b,n[6]=(m+g)*b,n[7]=0,n[8]=(f+v)*_,n[9]=(m-g)*_,n[10]=(1-(l+d))*_,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,this}decompose(t,e,r){const n=this.elements;let i=l.set(n[0],n[1],n[2]).length();const s=l.set(n[4],n[5],n[6]).length(),a=l.set(n[8],n[9],n[10]).length();this.determinant()<0&&(i=-i),t.x=n[12],t.y=n[13],t.z=n[14],p.copy(this);const o=1/i,u=1/s,h=1/a;return p.elements[0]*=o,p.elements[1]*=o,p.elements[2]*=o,p.elements[4]*=u,p.elements[5]*=u,p.elements[6]*=u,p.elements[8]*=h,p.elements[9]*=h,p.elements[10]*=h,e.setFromRotationMatrix(p),r.x=i,r.y=s,r.z=a,this}makePerspective(t,e,r,n,i,s){void 0===s&&console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");const a=this.elements,o=2*i/(e-t),u=2*i/(r-n),h=(e+t)/(e-t),c=(r+n)/(r-n),l=-(s+i)/(s-i),p=-2*s*i/(s-i);return a[0]=o,a[4]=0,a[8]=h,a[12]=0,a[1]=0,a[5]=u,a[9]=c,a[13]=0,a[2]=0,a[6]=0,a[10]=l,a[14]=p,a[3]=0,a[7]=0,a[11]=-1,a[15]=0,this}makeOrthographic(t,e,r,n,i,s){const a=this.elements,o=1/(e-t),u=1/(r-n),h=1/(s-i),c=(e+t)*o,l=(r+n)*u,p=(s+i)*h;return a[0]=2*o,a[4]=0,a[8]=0,a[12]=-c,a[1]=0,a[5]=2*u,a[9]=0,a[13]=-l,a[2]=0,a[6]=0,a[10]=-2*h,a[14]=-p,a[3]=0,a[7]=0,a[11]=0,a[15]=1,this}equals(t){const e=this.elements,r=t.elements;for(let n=0;n<16;n++)if(e[n]!==r[n])return !1;return !0}fromArray(t,e=0){for(let r=0;r<16;r++)this.elements[r]=t[r+e];return this}toArray(t=[],e=0){const r=this.elements;return t[e]=r[0],t[e+1]=r[1],t[e+2]=r[2],t[e+3]=r[3],t[e+4]=r[4],t[e+5]=r[5],t[e+6]=r[6],t[e+7]=r[7],t[e+8]=r[8],t[e+9]=r[9],t[e+10]=r[10],t[e+11]=r[11],t[e+12]=r[12],t[e+13]=r[13],t[e+14]=r[14],t[e+15]=r[15],t}}const l=new a,p=new c,f=new a(0,0,0),d=new a(1,1,1),m=new a,y=new a,g=new a;new c;new s;const O=new e;class z{constructor(t,r){Object.defineProperty(this,"isBox2",{value:!0}),this.min=void 0!==t?t:new e(1/0,1/0),this.max=void 0!==r?r:new e(-1/0,-1/0);}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromPoints(t){this.makeEmpty();for(let e=0,r=t.length;e<r;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const r=O.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(r),this.max.copy(t).add(r),this}clone(){return (new this.constructor).copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(t){return void 0===t&&(console.warn("THREE.Box2: .getCenter() target is now required"),t=new e),this.isEmpty()?t.set(0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return void 0===t&&(console.warn("THREE.Box2: .getSize() target is now required"),t=new e),this.isEmpty()?t.set(0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}containsPoint(t){return !(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y}getParameter(t,r){return void 0===r&&(console.warn("THREE.Box2: .getParameter() target is now required"),r=new e),r.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(t){return !(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y)}clampPoint(t,r){return void 0===r&&(console.warn("THREE.Box2: .clampPoint() target is now required"),r=new e),r.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return O.copy(t).clamp(this.min,this.max).sub(t).length()}intersect(t){return this.min.max(t.min),this.max.min(t.max),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}class A{constructor(t,e){Object.defineProperty(this,"isBox3",{value:!0}),this.min=void 0!==t?t:new a(1/0,1/0,1/0),this.max=void 0!==e?e:new a(-1/0,-1/0,-1/0);}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){let e=1/0,r=1/0,n=1/0,i=-1/0,s=-1/0,a=-1/0;for(let o=0,u=t.length;o<u;o+=3){const u=t[o],h=t[o+1],c=t[o+2];u<e&&(e=u),h<r&&(r=h),c<n&&(n=c),u>i&&(i=u),h>s&&(s=h),c>a&&(a=c);}return this.min.set(e,r,n),this.max.set(i,s,a),this}setFromBufferAttribute(t){let e=1/0,r=1/0,n=1/0,i=-1/0,s=-1/0,a=-1/0;for(let o=0,u=t.count;o<u;o++){const u=t.getX(o),h=t.getY(o),c=t.getZ(o);u<e&&(e=u),h<r&&(r=h),c<n&&(n=c),u>i&&(i=u),h>s&&(s=h),c>a&&(a=c);}return this.min.set(e,r,n),this.max.set(i,s,a),this}setFromPoints(t){this.makeEmpty();for(let e=0,r=t.length;e<r;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const r=D.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(r),this.max.copy(t).add(r),this}setFromObject(t){return this.makeEmpty(),this.expandByObject(t)}clone(){return (new this.constructor).copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return void 0===t&&(console.warn("THREE.Box3: .getCenter() target is now required"),t=new a),this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return void 0===t&&(console.warn("THREE.Box3: .getSize() target is now required"),t=new a),this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t){t.updateWorldMatrix(!1,!1);const e=t.geometry;void 0!==e&&(null===e.boundingBox&&e.computeBoundingBox(),k.copy(e.boundingBox),k.applyMatrix4(t.matrixWorld),this.union(k));const r=t.children;for(let n=0,i=r.length;n<i;n++)this.expandByObject(r[n]);return this}containsPoint(t){return !(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return void 0===e&&(console.warn("THREE.Box3: .getParameter() target is now required"),e=new a),e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return !(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,D),D.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,r;return t.normal.x>0?(e=t.normal.x*this.min.x,r=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,r=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,r+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,r+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,r+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,r+=t.normal.z*this.min.z),e<=-t.constant&&r>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return !1;this.getCenter(j),q.subVectors(this.max,j),I.subVectors(t.a,j),L.subVectors(t.b,j),B.subVectors(t.c,j),F.subVectors(L,I),P.subVectors(B,L),U.subVectors(I,B);let e=[0,-F.z,F.y,0,-P.z,P.y,0,-U.z,U.y,F.z,0,-F.x,P.z,0,-P.x,U.z,0,-U.x,-F.y,F.x,0,-P.y,P.x,0,-U.y,U.x,0];return !!C(e,I,L,B,q)&&(e=[1,0,0,0,1,0,0,0,1],!!C(e,I,L,B,q)&&(H.crossVectors(F,P),e=[H.x,H.y,H.z],C(e,I,L,B,q)))}clampPoint(t,e){return void 0===e&&(console.warn("THREE.Box3: .clampPoint() target is now required"),e=new a),e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return D.copy(t).clamp(this.min,this.max).sub(t).length()}getBoundingSphere(t){return void 0===t&&console.error("THREE.Box3: .getBoundingSphere() target is now required"),this.getCenter(t.center),t.radius=.5*this.getSize(D).length(),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()||(R[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),R[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),R[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),R[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),R[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),R[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),R[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),R[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(R)),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}function C(t,e,r,n,i){for(let s=0,a=t.length-3;s<=a;s+=3){V.fromArray(t,s);const a=i.x*Math.abs(V.x)+i.y*Math.abs(V.y)+i.z*Math.abs(V.z),o=e.dot(V),u=r.dot(V),h=n.dot(V);if(Math.max(-Math.max(o,u,h),Math.min(o,u,h))>a)return !1}return !0}const R=[new a,new a,new a,new a,new a,new a,new a,new a],D=new a,k=new A,I=new a,L=new a,B=new a,F=new a,P=new a,U=new a,j=new a,q=new a,H=new a,V=new a;new a;new a;new a;new a;new a;new a;new a;new a;new a;class rt{constructor(){Object.defineProperty(this,"isMatrix3",{value:!0}),this.elements=[1,0,0,0,1,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.");}set(t,e,r,n,i,s,a,o,u){const h=this.elements;return h[0]=t,h[1]=n,h[2]=a,h[3]=e,h[4]=i,h[5]=o,h[6]=r,h[7]=s,h[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}clone(){return (new this.constructor).fromArray(this.elements)}copy(t){const e=this.elements,r=t.elements;return e[0]=r[0],e[1]=r[1],e[2]=r[2],e[3]=r[3],e[4]=r[4],e[5]=r[5],e[6]=r[6],e[7]=r[7],e[8]=r[8],this}extractBasis(t,e,r){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const r=t.elements,n=e.elements,i=this.elements,s=r[0],a=r[3],o=r[6],u=r[1],h=r[4],c=r[7],l=r[2],p=r[5],f=r[8],d=n[0],m=n[3],y=n[6],g=n[1],v=n[4],x=n[7],w=n[2],b=n[5],_=n[8];return i[0]=s*d+a*g+o*w,i[3]=s*m+a*v+o*b,i[6]=s*y+a*x+o*_,i[1]=u*d+h*g+c*w,i[4]=u*m+h*v+c*b,i[7]=u*y+h*x+c*_,i[2]=l*d+p*g+f*w,i[5]=l*m+p*v+f*b,i[8]=l*y+p*x+f*_,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],r=t[1],n=t[2],i=t[3],s=t[4],a=t[5],o=t[6],u=t[7],h=t[8];return e*s*h-e*a*u-r*i*h+r*a*o+n*i*u-n*s*o}getInverse(t,e){void 0!==e&&console.warn("THREE.Matrix3: .getInverse() can no longer be configured to throw on degenerate.");const r=t.elements,n=this.elements,i=r[0],s=r[1],a=r[2],o=r[3],u=r[4],h=r[5],c=r[6],l=r[7],p=r[8],f=p*u-h*l,d=h*c-p*o,m=l*o-u*c,y=i*f+s*d+a*m;if(0===y)return this.set(0,0,0,0,0,0,0,0,0);const g=1/y;return n[0]=f*g,n[1]=(a*l-p*s)*g,n[2]=(h*s-a*u)*g,n[3]=d*g,n[4]=(p*i-a*c)*g,n[5]=(a*o-h*i)*g,n[6]=m*g,n[7]=(s*c-l*i)*g,n[8]=(u*i-s*o)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).getInverse(this).transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,r,n,i,s,a){const o=Math.cos(i),u=Math.sin(i);this.set(r*o,r*u,-r*(o*s+u*a)+s+t,-n*u,n*o,-n*(-u*s+o*a)+a+e,0,0,1);}scale(t,e){const r=this.elements;return r[0]*=t,r[3]*=t,r[6]*=t,r[1]*=e,r[4]*=e,r[7]*=e,this}rotate(t){const e=Math.cos(t),r=Math.sin(t),n=this.elements,i=n[0],s=n[3],a=n[6],o=n[1],u=n[4],h=n[7];return n[0]=e*i+r*o,n[3]=e*s+r*u,n[6]=e*a+r*h,n[1]=-r*i+e*o,n[4]=-r*s+e*u,n[7]=-r*a+e*h,this}translate(t,e){const r=this.elements;return r[0]+=t*r[2],r[3]+=t*r[5],r[6]+=t*r[8],r[1]+=e*r[2],r[4]+=e*r[5],r[7]+=e*r[8],this}equals(t){const e=this.elements,r=t.elements;for(let n=0;n<9;n++)if(e[n]!==r[n])return !1;return !0}fromArray(t,e=0){for(let r=0;r<9;r++)this.elements[r]=t[r+e];return this}toArray(t=[],e=0){const r=this.elements;return t[e]=r[0],t[e+1]=r[1],t[e+2]=r[2],t[e+3]=r[3],t[e+4]=r[4],t[e+5]=r[5],t[e+6]=r[6],t[e+7]=r[7],t[e+8]=r[8],t}}new a;new a;new rt;Object.freeze(new e(0,0));Object.freeze(new e(1,1));Object.freeze(new a(0,0,0));Object.freeze(new a(1,0,0));Object.freeze(new a(0,1,0));Object.freeze(new a(0,0,1));Object.freeze(new a(1,1,1));Object.freeze(new s);({RIGHT:Object.freeze(new a(1,0,0)),UP:Object.freeze(new a(0,1,0)),NEAR:Object.freeze(new a(0,0,1)),LEFT:Object.freeze(new a(-1,0,0)),DOWN:Object.freeze(new a(0,-1,0)),FAR:Object.freeze(new a(0,0,-1))});new a;(()=>{const t=2*Math.PI,e=new a(0,0,1),r=new s,n=new s,i=new a,o=new s;return function(s=1,a=1){var u=(Math.random()-.5)*t*s,h=Math.random()*t,c=Math.random()*Math.PI*a;return i.set(1,0,0).applyAxisAngle(e,h),r.setFromAxisAngle(e,u),n.setFromAxisAngle(i,c),o.multiplyQuaternions(n,r)}})();(()=>{const t=new a;return function(e,r,n){const i=t.set(e.x,e.y,e.z),s=r.dot(i),a=t.copy(r).multiplyScalar(s),o=n.set(a.x,a.y,a.z,e.w).normalize();return s<0&&(o.x=-o.x,o.y=-o.y,o.z=-o.z,o.w=-o.w),o}})();new z,new z,new e,new e;new a,new a,new a,new a,new a,new a,new a;var Xt=function(t){return function(e){return 1-t(1-e)}},Qt=function(t){return function(e){return e<=.5?t(2*e)/2:(2-t(2*(1-e)))/2}},Jt=Xt,Kt=Qt,te=function(t){return function(e){return Math.pow(e,t)}},ee=function(t){return function(e){return e*e*((t+1)*e-t)}},re=function(t){var e=ee(t);return function(t){return (t*=2)<1?.5*e(t):.5*(2-Math.pow(2,-10*(t-1)))}},ne=te(2),ie=Xt(ne),se=Qt(ne),ae=function(t){return 1-Math.sin(Math.acos(t))},oe=Xt(ae),ue=Qt(oe),he=ee(1.525),ce=Xt(he),le=Qt(he),pe=re(1.525),fe=function(t){var e=t*t;return t<.36363636363636365?7.5625*e:t<.7272727272727273?9.075*e-9.9*t+3.4:t<.9?12.066481994459833*e-19.63545706371191*t+8.898060941828255:10.8*t*t-20.52*t+10.72},de="undefined"!=typeof Float32Array,me=function(t,e){return 1-3*e+3*t},ye=function(t,e){return 3*e-6*t},ge=function(t){return 3*t},ve=function(t,e,r){return 3*me(e,r)*t*t+2*ye(e,r)*t+ge(e)},xe=function(t,e,r){return ((me(e,r)*t+ye(e,r))*t+ge(e))*t};Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",reversed:Xt,mirrored:Qt,createReversedEasing:Jt,createMirroredEasing:Kt,createExpoIn:te,createBackIn:ee,createAnticipateEasing:re,linear:function(t){return t},easeIn:ne,easeOut:ie,easeInOut:se,circIn:ae,circOut:oe,circInOut:ue,backIn:he,backOut:ce,backInOut:le,anticipate:pe,bounceOut:fe,bounceIn:function(t){return 1-fe(1-t)},bounceInOut:function(t){return t<.5?.5*(1-fe(1-2*t)):.5*fe(2*t-1)+.5},cubicBezier:function(t,e,r,n){var i=de?new Float32Array(11):new Array(11),s=function(e){for(var n,s,a,o=0,u=1;10!==u&&i[u]<=e;++u)o+=.1;return --u,n=(e-i[u])/(i[u+1]-i[u]),(a=ve(s=o+.1*n,t,r))>=.001?function(e,n){for(var i=0,s=0;i<8;++i){if(0===(s=ve(n,t,r)))return n;n-=(xe(n,t,r)-e)/s;}return n}(e,s):0===a?s:function(e,n,i){var s,a,o=0;do{(s=xe(a=n+(i-n)/2,t,r)-e)>0?i=a:n=a;}while(Math.abs(s)>1e-7&&++o<10);return a}(e,o,o+.1)};return function(){for(var e=0;e<11;++e)i[e]=xe(.1*e,t,r);}(),function(i){return t===e&&r===n?i:0===i?0:1===i?1:xe(s(i),e,n)}}});function Te(t){return "number"==typeof t}function Oe(t){return t&&!0===t.constructor.prototype.isBigNumber||!1}function ze(t){return t&&"object"==typeof t&&!0===Object.getPrototypeOf(t).isComplex||!1}function Ae(t){return t&&"object"==typeof t&&!0===Object.getPrototypeOf(t).isFraction||!1}function Ce(t){return t&&!0===t.constructor.prototype.isUnit||!1}function Re(t){return "string"==typeof t}var De=Array.isArray;function ke(t){return t&&!0===t.constructor.prototype.isMatrix||!1}function Ie(t){return Array.isArray(t)||ke(t)}function Le(t){return t&&t.isDenseMatrix&&!0===t.constructor.prototype.isMatrix||!1}function Be(t){return t&&t.isSparseMatrix&&!0===t.constructor.prototype.isMatrix||!1}function Fe(t){return t&&!0===t.constructor.prototype.isRange||!1}function Pe(t){return t&&!0===t.constructor.prototype.isIndex||!1}function Ue(t){return "boolean"==typeof t}function je(t){return t&&!0===t.constructor.prototype.isResultSet||!1}function qe(t){return t&&!0===t.constructor.prototype.isHelp||!1}function He(t){return "function"==typeof t}function Ve(t){return t instanceof Date}function $e(t){return t instanceof RegExp}function Ge(t){return !(!t||"object"!=typeof t||t.constructor!==Object||ze(t)||Ae(t))}function We(t){return null===t}function Ye(t){return void 0===t}function Ze(t){return t&&!0===t.isAccessorNode&&!0===t.constructor.prototype.isNode||!1}function Xe(t){return t&&!0===t.isArrayNode&&!0===t.constructor.prototype.isNode||!1}function Qe(t){return t&&!0===t.isAssignmentNode&&!0===t.constructor.prototype.isNode||!1}function Je(t){return t&&!0===t.isBlockNode&&!0===t.constructor.prototype.isNode||!1}function Ke(t){return t&&!0===t.isConditionalNode&&!0===t.constructor.prototype.isNode||!1}function tr(t){return t&&!0===t.isConstantNode&&!0===t.constructor.prototype.isNode||!1}function er(t){return t&&!0===t.isFunctionAssignmentNode&&!0===t.constructor.prototype.isNode||!1}function rr(t){return t&&!0===t.isFunctionNode&&!0===t.constructor.prototype.isNode||!1}function nr(t){return t&&!0===t.isIndexNode&&!0===t.constructor.prototype.isNode||!1}function ir(t){return t&&!0===t.isNode&&!0===t.constructor.prototype.isNode||!1}function sr(t){return t&&!0===t.isObjectNode&&!0===t.constructor.prototype.isNode||!1}function ar(t){return t&&!0===t.isOperatorNode&&!0===t.constructor.prototype.isNode||!1}function or(t){return t&&!0===t.isParenthesisNode&&!0===t.constructor.prototype.isNode||!1}function ur(t){return t&&!0===t.isRangeNode&&!0===t.constructor.prototype.isNode||!1}function hr(t){return t&&!0===t.isSymbolNode&&!0===t.constructor.prototype.isNode||!1}function cr(t){return t&&!0===t.constructor.prototype.isChain||!1}function lr(t){var e=typeof t;return "object"===e?null===t?"null":Array.isArray(t)?"Array":t instanceof Date?"Date":t instanceof RegExp?"RegExp":Oe(t)?"BigNumber":ze(t)?"Complex":Ae(t)?"Fraction":ke(t)?"Matrix":Ce(t)?"Unit":Pe(t)?"Index":Fe(t)?"Range":je(t)?"ResultSet":ir(t)?t.type:cr(t)?"Chain":qe(t)?"Help":"Object":"function"===e?"Function":e}function pr(t){var e=typeof t;if("number"===e||"string"===e||"boolean"===e||null==t)return t;if("function"==typeof t.clone)return t.clone();if(Array.isArray(t))return t.map((function(t){return pr(t)}));if(t instanceof Date)return new Date(t.valueOf());if(Oe(t))return t;if(t instanceof RegExp)throw new TypeError("Cannot clone "+t);return fr(t,pr)}function fr(t,e){var r={};for(var n in t)wr(t,n)&&(r[n]=e(t[n]));return r}function dr(t,e){for(var r in e)wr(e,r)&&(t[r]=e[r]);return t}function yr(t,e){var r,n,i;if(Array.isArray(t)){if(!Array.isArray(e))return !1;if(t.length!==e.length)return !1;for(n=0,i=t.length;n<i;n++)if(!yr(t[n],e[n]))return !1;return !0}if("function"==typeof t)return t===e;if(t instanceof Object){if(Array.isArray(e)||!(e instanceof Object))return !1;for(r in t)if(!(r in e)||!yr(t[r],e[r]))return !1;for(r in e)if(!(r in t)||!yr(t[r],e[r]))return !1;return !0}return t===e}function wr(t,e){return t&&Object.hasOwnProperty.call(t,e)}var Sr="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function Tr(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var zr=function(){function t(){return !0}function e(){return !1}function r(){}function n(){var i=[{name:"number",test:function(t){return "number"==typeof t}},{name:"string",test:function(t){return "string"==typeof t}},{name:"boolean",test:function(t){return "boolean"==typeof t}},{name:"Function",test:function(t){return "function"==typeof t}},{name:"Array",test:Array.isArray},{name:"Date",test:function(t){return t instanceof Date}},{name:"RegExp",test:function(t){return t instanceof RegExp}},{name:"Object",test:function(t){return "object"==typeof t&&null!==t&&t.constructor===Object}},{name:"null",test:function(t){return null===t}},{name:"undefined",test:function(t){return void 0===t}}],s={name:"any",test:t},a=[],o=[],u={types:i,conversions:o,ignore:a};function h(t){var e=Y(u.types,(function(e){return e.name===t}));if(e)return e;if("any"===t)return s;var r=Y(u.types,(function(e){return e.name.toLowerCase()===t.toLowerCase()}));throw new TypeError('Unknown type "'+t+'"'+(r?'. Did you mean "'+r.name+'"?':""))}function c(t){return t===s?999:u.types.indexOf(t)}function l(t){var e=Y(u.types,(function(e){return e.test(t)}));if(e)return e.name;throw new TypeError("Value has unknown type. Value: "+t)}function p(t,e){if(!t.signatures)throw new TypeError("Function is no typed-function");var r;if("string"==typeof e){r=e.split(",");for(var n=0;n<r.length;n++)r[n]=r[n].trim();}else {if(!Array.isArray(e))throw new TypeError("String array or a comma separated string expected");r=e;}var i=r.join(","),s=t.signatures[i];if(s)return s;throw new TypeError("Signature not found (signature: "+(t.name||"unnamed")+"("+r.join(", ")+"))")}function f(t,e){var r=l(t);if(e===r)return t;for(var n=0;n<u.conversions.length;n++){var i=u.conversions[n];if(i.from===r&&i.to===e)return i.convert(t)}throw new Error("Cannot convert from "+r+" to "+e)}function d(t){return t.map((function(t){var e=t.types.map(M);return (t.restParam?"...":"")+e.join("|")})).join(",")}function m(t,e){var r=0===t.indexOf("..."),n=(r?t.length>3?t.slice(3):"any":t).split("|").map(P).filter(U).filter(F),i=C(e,n),s=n.map((function(t){var e=h(t);return {name:t,typeIndex:c(e),test:e.test,conversion:null,conversionIndex:-1}})),a=i.map((function(t){var r=h(t.from);return {name:t.from,typeIndex:c(r),test:r.test,conversion:t,conversionIndex:e.indexOf(t)}}));return {types:s.concat(a),restParam:r}}function y(t,e,r){var n=[];return ""!==t.trim()&&(n=t.split(",").map(P).map((function(t,e,n){var i=m(t,r);if(i.restParam&&e!==n.length-1)throw new SyntaxError('Unexpected rest parameter "'+t+'": only allowed for the last parameter');return i}))),n.some(q)?null:{params:n,fn:e}}function g(t){var e=V(t);return !!e&&e.restParam}function v(t){return t.types.some((function(t){return null!=t.conversion}))}function x(e){if(e&&0!==e.types.length){if(1===e.types.length)return h(e.types[0].name).test;if(2===e.types.length){var r=h(e.types[0].name).test,n=h(e.types[1].name).test;return function(t){return r(t)||n(t)}}var i=e.types.map((function(t){return h(t.name).test}));return function(t){for(var e=0;e<i.length;e++)if(i[e](t))return !0;return !1}}return t}function w(t){var e,r,n;if(g(t)){var i=(e=H(t).map(x)).length,s=x(V(t)),a=function(t){for(var e=i;e<t.length;e++)if(!s(t[e]))return !1;return !0};return function(t){for(var r=0;r<e.length;r++)if(!e[r](t[r]))return !1;return a(t)&&t.length>=i+1}}return 0===t.length?function(t){return 0===t.length}:1===t.length?(r=x(t[0]),function(t){return r(t[0])&&1===t.length}):2===t.length?(r=x(t[0]),n=x(t[1]),function(t){return r(t[0])&&n(t[1])&&2===t.length}):(e=t.map(x),function(t){for(var r=0;r<e.length;r++)if(!e[r](t[r]))return !1;return t.length===e.length})}function b(t,e){return e<t.params.length?t.params[e]:g(t.params)?V(t.params):null}function _(t,e,r){var n=b(t,e);return (n?r?n.types.filter(E):n.types:[]).map(M)}function M(t){return t.name}function E(t){return null===t.conversion||void 0===t.conversion}function N(t,e){var r=Z(X(t,(function(t){return _(t,e,!1)})));return -1!==r.indexOf("any")?["any"]:r}function S(t,e,r){var n,i,s,a=t||"unnamed",o=r;for(s=0;s<e.length;s++){var u=o.filter((function(t){var r=x(b(t,s));return (s<t.params.length||g(t.params))&&r(e[s])}));if(0===u.length){if((i=N(o,s)).length>0){var h=l(e[s]);return (n=new TypeError("Unexpected type of argument in function "+a+" (expected: "+i.join(" or ")+", actual: "+h+", index: "+s+")")).data={category:"wrongType",fn:a,index:s,actual:h,expected:i},n}}else o=u;}var c=o.map((function(t){return g(t.params)?1/0:t.params.length}));if(e.length<Math.min.apply(null,c))return i=N(o,s),(n=new TypeError("Too few arguments in function "+a+" (expected: "+i.join(" or ")+", index: "+e.length+")")).data={category:"tooFewArgs",fn:a,index:e.length,expected:i},n;var p=Math.max.apply(null,c);return e.length>p?((n=new TypeError("Too many arguments in function "+a+" (expected: "+p+", actual: "+e.length+")")).data={category:"tooManyArgs",fn:a,index:e.length,expectedLength:p},n):((n=new TypeError('Arguments of type "'+e.join(", ")+'" do not match any of the defined signatures of function '+a+".")).data={category:"mismatch",actual:e.map(l)},n)}function T(t){for(var e=999,r=0;r<t.types.length;r++)E(t.types[r])&&(e=Math.min(e,t.types[r].typeIndex));return e}function O(t){for(var e=999,r=0;r<t.types.length;r++)E(t.types[r])||(e=Math.min(e,t.types[r].conversionIndex));return e}function z(t,e){var r;return 0!=(r=t.restParam-e.restParam)||0!=(r=v(t)-v(e))||0!=(r=T(t)-T(e))?r:O(t)-O(e)}function A(t,e){var r,n,i=Math.min(t.params.length,e.params.length);if(0!=(n=t.params.some(v)-e.params.some(v)))return n;for(r=0;r<i;r++)if(0!=(n=v(t.params[r])-v(e.params[r])))return n;for(r=0;r<i;r++)if(0!==(n=z(t.params[r],e.params[r])))return n;return t.params.length-e.params.length}function C(t,e){var r={};return t.forEach((function(t){-1!==e.indexOf(t.from)||-1===e.indexOf(t.to)||r[t.from]||(r[t.from]=t);})),Object.keys(r).map((function(t){return r[t]}))}function R(t,e){var r=e;if(t.some(v)){var n=g(t),i=t.map(D);r=function(){for(var t=[],r=n?arguments.length-1:arguments.length,s=0;s<r;s++)t[s]=i[s](arguments[s]);return n&&(t[r]=arguments[r].map(i[r])),e.apply(this,t)};}var s=r;if(g(t)){var a=t.length-1;s=function(){return r.apply(this,$(arguments,0,a).concat([$(arguments,a)]))};}return s}function D(t){var e,r,n,i,s=[],a=[];switch(t.types.forEach((function(t){t.conversion&&(s.push(h(t.conversion.from).test),a.push(t.conversion.convert));})),a.length){case 0:return function(t){return t};case 1:return e=s[0],n=a[0],function(t){return e(t)?n(t):t};case 2:return e=s[0],r=s[1],n=a[0],i=a[1],function(t){return e(t)?n(t):r(t)?i(t):t};default:return function(t){for(var e=0;e<a.length;e++)if(s[e](t))return a[e](t);return t}}}function k(t){var e={};return t.forEach((function(t){t.params.some(v)||I(t.params,!0).forEach((function(r){e[d(r)]=t.fn;}));})),e}function I(t,e){function r(t,n,i){if(n<t.length){var s,a=t[n],o=e?a.types.filter(E):a.types;if(a.restParam){var u=o.filter(E);s=u.length<o.length?[u,o]:[o];}else s=o.map((function(t){return [t]}));return X(s,(function(e){return r(t,n+1,i.concat([e]))}))}return [i.map((function(e,r){return {types:e,restParam:r===t.length-1&&g(t)}}))]}return r(t,0,[])}function L(t,e){for(var r=Math.max(t.params.length,e.params.length),n=0;n<r;n++)if(!W(_(t,n,!0),_(e,n,!0)))return !1;var i=t.params.length,s=e.params.length,a=g(t.params),o=g(e.params);return a?o?i===s:s>=i:o?i>=s:i===s}function B(t,n){if(0===Object.keys(n).length)throw new SyntaxError("No signatures provided");var i=[];Object.keys(n).map((function(t){return y(t,n[t],u.conversions)})).filter(j).forEach((function(t){var e=Y(i,(function(e){return L(e,t)}));if(e)throw new TypeError('Conflicting signatures "'+d(e.params)+'" and "'+d(t.params)+'".');i.push(t);}));var s=X(i,(function(t){return (t?I(t.params,!1):[]).map((function(e){return {params:e,fn:t.fn}}))})).filter(j);s.sort(A);var a=s[0]&&s[0].params.length<=2&&!g(s[0].params),o=s[1]&&s[1].params.length<=2&&!g(s[1].params),h=s[2]&&s[2].params.length<=2&&!g(s[2].params),c=s[3]&&s[3].params.length<=2&&!g(s[3].params),l=s[4]&&s[4].params.length<=2&&!g(s[4].params),p=s[5]&&s[5].params.length<=2&&!g(s[5].params),f=a&&o&&h&&c&&l&&p,m=s.map((function(t){return w(t.params)})),v=a?x(s[0].params[0]):e,b=o?x(s[1].params[0]):e,_=h?x(s[2].params[0]):e,M=c?x(s[3].params[0]):e,E=l?x(s[4].params[0]):e,N=p?x(s[5].params[0]):e,T=a?x(s[0].params[1]):e,O=o?x(s[1].params[1]):e,z=h?x(s[2].params[1]):e,C=c?x(s[3].params[1]):e,D=l?x(s[4].params[1]):e,B=p?x(s[5].params[1]):e,F=s.map((function(t){return R(t.params,t.fn)})),P=a?F[0]:r,U=o?F[1]:r,q=h?F[2]:r,H=c?F[3]:r,V=l?F[4]:r,$=p?F[5]:r,G=a?s[0].params.length:-1,W=o?s[1].params.length:-1,Z=h?s[2].params.length:-1,Q=c?s[3].params.length:-1,J=l?s[4].params.length:-1,K=p?s[5].params.length:-1,tt=f?6:0,et=s.length,rt=function(){for(var e=tt;e<et;e++)if(m[e](arguments))return F[e].apply(this,arguments);throw S(t,arguments,s)},nt=function t(e,r){return arguments.length===G&&v(e)&&T(r)?P.apply(t,arguments):arguments.length===W&&b(e)&&O(r)?U.apply(t,arguments):arguments.length===Z&&_(e)&&z(r)?q.apply(t,arguments):arguments.length===Q&&M(e)&&C(r)?H.apply(t,arguments):arguments.length===J&&E(e)&&D(r)?V.apply(t,arguments):arguments.length===K&&N(e)&&B(r)?$.apply(t,arguments):rt.apply(t,arguments)};try{Object.defineProperty(nt,"name",{value:t});}catch(it){}return nt.signatures=k(s),nt}function F(t){return -1===u.ignore.indexOf(t)}function P(t){return t.trim()}function U(t){return !!t}function j(t){return null!==t}function q(t){return 0===t.types.length}function H(t){return t.slice(0,t.length-1)}function V(t){return t[t.length-1]}function $(t,e,r){return Array.prototype.slice.call(t,e,r)}function G(t,e){return -1!==t.indexOf(e)}function W(t,e){for(var r=0;r<t.length;r++)if(G(e,t[r]))return !0;return !1}function Y(t,e){for(var r=0;r<t.length;r++)if(e(t[r]))return t[r]}function Z(t){for(var e={},r=0;r<t.length;r++)e[t[r]]=!0;return Object.keys(e)}function X(t,e){return Array.prototype.concat.apply([],t.map(e))}function Q(t){for(var e="",r=0;r<t.length;r++){var n=t[r];if(("object"==typeof n.signatures||"string"==typeof n.signature)&&""!==n.name)if(""===e)e=n.name;else if(e!==n.name){var i=new Error("Function names do not match (expected: "+e+", actual: "+n.name+")");throw i.data={actual:n.name,expected:e},i}}return e}function J(t){var e,r={};function n(t,n){if(r.hasOwnProperty(t)&&n!==r[t])throw (e=new Error('Signature "'+t+'" is defined twice')).data={signature:t},e}for(var i=0;i<t.length;i++){var s=t[i];if("object"==typeof s.signatures)for(var a in s.signatures)s.signatures.hasOwnProperty(a)&&(n(a,s.signatures[a]),r[a]=s.signatures[a]);else {if("string"!=typeof s.signature)throw (e=new TypeError("Function is no typed-function (index: "+i+")")).data={index:i},e;n(s.signature,s),r[s.signature]=s;}}return r}return (u=B("typed",{"string, Object":B,Object:function(t){var e=[];for(var r in t)t.hasOwnProperty(r)&&e.push(t[r]);return B(Q(e),t)},"...Function":function(t){return B(Q(t),J(t))},"string, ...Function":function(t,e){return B(t,J(e))}})).create=n,u.types=i,u.conversions=o,u.ignore=a,u.convert=f,u.find=p,u.addType=function(t,e){if(!t||"string"!=typeof t.name||"function"!=typeof t.test)throw new TypeError("Object with properties {name: string, test: function} expected");if(!1!==e)for(var r=0;r<u.types.length;r++)if("Object"===u.types[r].name)return void u.types.splice(r,0,t);u.types.push(t);},u.addConversion=function(t){if(!t||"string"!=typeof t.from||"string"!=typeof t.to||"function"!=typeof t.convert)throw new TypeError("Object with properties {from: string, to: string, convert: function} expected");u.conversions.push(t);},u}return n()}();function Ar(t){return "boolean"==typeof t||!!isFinite(t)&&t===Math.round(t)}var Cr=Math.sign||function(t){return t>0?1:t<0?-1:0};function Rr(t,e){if("function"==typeof e)return e(t);if(t===1/0)return "Infinity";if(t===-1/0)return "-Infinity";if(isNaN(t))return "NaN";var r,n="auto";switch(e&&(e.notation&&(n=e.notation),Te(e)?r=e:Te(e.precision)&&(r=e.precision)),n){case"fixed":return kr(t,r);case"exponential":return Ir(t,r);case"engineering":return function(t,e){if(isNaN(t)||!isFinite(t))return String(t);var r=Lr(Dr(t),e),n=r.exponent,i=r.coefficients,s=n%3==0?n:n<0?n-3-n%3:n-n%3;if(Te(e))for(;e>i.length||n-s+1>i.length;)i.push(0);else for(var a=Math.abs(n-s)-(i.length-1),o=0;o<a;o++)i.push(0);var u=Math.abs(n-s),h=1;for(;u>0;)h++,u--;var c=i.slice(h).join(""),l=Te(e)&&c.length||c.match(/[1-9]/)?"."+c:"",p=i.slice(0,h).join("")+l+"e"+(n>=0?"+":"")+s.toString();return r.sign+p}(t,r);case"auto":return function(t,e,r){if(isNaN(t)||!isFinite(t))return String(t);var n=r&&void 0!==r.lowerExp?r.lowerExp:-3,i=r&&void 0!==r.upperExp?r.upperExp:5,s=Dr(t),a=e?Lr(s,e):s;if(a.exponent<n||a.exponent>=i)return Ir(t,e);var o=a.coefficients,u=a.exponent;o.length<e&&(o=o.concat(Br(e-o.length))),o=o.concat(Br(u-o.length+1+(o.length<e?e-o.length:0)));var h=u>0?u:0;return h<(o=Br(-u).concat(o)).length-1&&o.splice(h+1,0,"."),a.sign+o.join("")}(t,r,e&&e).replace(/((\.\d*?)(0+))($|e)/,(function(){var t=arguments[2],e=arguments[4];return "."!==t?t+e:e}));default:throw new Error('Unknown notation "'+n+'". Choose "auto", "exponential", or "fixed".')}}function Dr(t){var e=String(t).toLowerCase().match(/^0*?(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);if(!e)throw new SyntaxError("Invalid number "+t);var r=e[1],n=e[2],i=parseFloat(e[4]||"0"),s=n.indexOf(".");i+=-1!==s?s-1:n.length-1;var a=n.replace(".","").replace(/^0*/,(function(t){return i-=t.length,""})).replace(/0*$/,"").split("").map((function(t){return parseInt(t)}));return 0===a.length&&(a.push(0),i++),{sign:r,coefficients:a,exponent:i}}function kr(t,e){if(isNaN(t)||!isFinite(t))return String(t);var r=Dr(t),n="number"==typeof e?Lr(r,r.exponent+1+e):r,i=n.coefficients,s=n.exponent+1,a=s+(e||0);return i.length<a&&(i=i.concat(Br(a-i.length))),s<0&&(i=Br(1-s).concat(i),s=1),s<i.length&&i.splice(s,0,0===s?"0.":"."),n.sign+i.join("")}function Ir(t,e){if(isNaN(t)||!isFinite(t))return String(t);var r=Dr(t),n=e?Lr(r,e):r,i=n.coefficients,s=n.exponent;i.length<e&&(i=i.concat(Br(e-i.length)));var a=i.shift();return n.sign+a+(i.length>0?"."+i.join(""):"")+"e"+(s>=0?"+":"")+s}function Lr(t,e){for(var r={sign:t.sign,coefficients:t.coefficients,exponent:t.exponent},n=r.coefficients;e<=0;)n.unshift(0),r.exponent++,e++;if(n.length>e&&n.splice(e,n.length-e)[0]>=5){var i=e-1;for(n[i]++;10===n[i];)n.pop(),0===i&&(n.unshift(0),r.exponent++,i++),n[--i]++;}return r}function Br(t){for(var e=[],r=0;r<t;r++)e.push(0);return e}var Fr=Number.EPSILON||2220446049250313e-31;function Pr(t,e,r){if(null==r)return t===e;if(t===e)return !0;if(isNaN(t)||isNaN(e))return !1;if(isFinite(t)&&isFinite(e)){var n=Math.abs(t-e);return n<Fr||n<=Math.max(Math.abs(t),Math.abs(e))*r}return !1}function Ur(t,e){if("function"==typeof e)return e(t);if(!t.isFinite())return t.isNaN()?"NaN":t.gt(0)?"Infinity":"-Infinity";var r,n="auto";switch(void 0!==e&&(e.notation&&(n=e.notation),"number"==typeof e?r=e:e.precision&&(r=e.precision)),n){case"fixed":return function(t,e){return t.toFixed(e)}(t,r);case"exponential":return jr(t,r);case"engineering":return function(t,e){var r=t.e,n=r%3==0?r:r<0?r-3-r%3:r-r%3,i=t.mul(Math.pow(10,-n)),s=i.toPrecision(e);-1!==s.indexOf("e")&&(s=i.toString());return s+"e"+(r>=0?"+":"")+n.toString()}(t,r);case"auto":var i=e&&void 0!==e.lowerExp?e.lowerExp:-3,s=e&&void 0!==e.upperExp?e.upperExp:5;if(t.isZero())return "0";var a=t.toSignificantDigits(r),o=a.e;return (o>=i&&o<s?a.toFixed():jr(t,r)).replace(/((\.\d*?)(0+))($|e)/,(function(){var t=arguments[2],e=arguments[4];return "."!==t?t+e:e}));default:throw new Error('Unknown notation "'+n+'". Choose "auto", "exponential", or "fixed".')}}function jr(t,e){return void 0!==e?t.toExponential(e-1):t.toExponential()}function qr(t,e){var r=t.length-e.length,n=t.length;return t.substring(r,n)===e}function Hr(t,e){return "number"==typeof t?Rr(t,e):Oe(t)?Ur(t,e):function(t){return t&&"object"==typeof t&&"number"==typeof t.s&&"number"==typeof t.n&&"number"==typeof t.d||!1}(t)?e&&"decimal"===e.fraction?t.toString():t.s*t.n+"/"+t.d:Array.isArray(t)?Gr(t,e):Re(t)?'"'+t+'"':"function"==typeof t?t.syntax?String(t.syntax):"function":t&&"object"==typeof t?"function"==typeof t.format?t.format(e):t&&t.toString(e)!=={}.toString()?t.toString(e):"{"+Object.keys(t).map((r=>'"'+r+'": '+Hr(t[r],e))).join(", ")+"}":String(t)}function Vr(t){for(var e=String(t),r="",n=0;n<e.length;){var i=e.charAt(n);"\\"===i?(r+=i,n++,""!==(i=e.charAt(n))&&-1!=='"\\/bfnrtu'.indexOf(i)||(r+="\\"),r+=i):r+='"'===i?'\\"':i,n++;}return '"'+r+'"'}function $r(t){var e=String(t);return e=e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Gr(t,e){if(Array.isArray(t)){for(var r="[",n=t.length,i=0;i<n;i++)0!==i&&(r+=", "),r+=Gr(t[i],e);return r+="]"}return Hr(t,e)}function Wr(t,e,r){if(!(this instanceof Wr))throw new SyntaxError("Constructor must be called with the new operator");this.actual=t,this.expected=e,this.relation=r,this.message="Dimension mismatch ("+(Array.isArray(t)?"["+t.join(", ")+"]":t)+" "+(this.relation||"!=")+" "+(Array.isArray(e)?"["+e.join(", ")+"]":e)+")",this.stack=(new Error).stack;}function Yr(t,e,r){if(!(this instanceof Yr))throw new SyntaxError("Constructor must be called with the new operator");this.index=t,arguments.length<3?(this.min=0,this.max=e):(this.min=e,this.max=r),void 0!==this.min&&this.index<this.min?this.message="Index out of range ("+this.index+" < "+this.min+")":void 0!==this.max&&this.index>=this.max?this.message="Index out of range ("+this.index+" > "+(this.max-1)+")":this.message="Index out of range ("+this.index+")",this.stack=(new Error).stack;}function Zr(t){for(var e=[];Array.isArray(t);)e.push(t.length),t=t[0];return e}function Xr(t,e,r){var n,i=t.length;if(i!==e[r])throw new Wr(i,e[r]);if(r<e.length-1){var s=r+1;for(n=0;n<i;n++){var a=t[n];if(!Array.isArray(a))throw new Wr(e.length-1,e.length,"<");Xr(t[n],e,s);}}else for(n=0;n<i;n++)if(Array.isArray(t[n]))throw new Wr(e.length+1,e.length,">")}function Qr(t,e){if(0===e.length){if(Array.isArray(t))throw new Wr(t.length,0)}else Xr(t,e,0);}function Jr(t,e){if(!Te(t)||!Ar(t))throw new TypeError("Index must be an integer (value: "+t+")");if(t<0||"number"==typeof e&&t>=e)throw new Yr(t,e)}function Kr(t,e,r){if(!Array.isArray(t)||!Array.isArray(e))throw new TypeError("Array expected");if(0===e.length)throw new Error("Resizing to scalar is not supported");return e.forEach((function(t){if(!Te(t)||!Ar(t)||t<0)throw new TypeError("Invalid size, must contain positive integers (size: "+Hr(e)+")")})),tn(t,e,0,void 0!==r?r:0),t}function tn(t,e,r,n){var i,s,a=t.length,o=e[r],u=Math.min(a,o);if(t.length=o,r<e.length-1){var h=r+1;for(i=0;i<u;i++)s=t[i],Array.isArray(s)||(s=[s],t[i]=s),tn(s,e,h,n);for(i=u;i<o;i++)s=[],t[i]=s,tn(s,e,h,n);}else {for(i=0;i<u;i++)for(;Array.isArray(t[i]);)t[i]=t[i][0];for(i=u;i<o;i++)t[i]=n;}}function en(t,e){var r,n=function(t){if(!Array.isArray(t))return t;var e=[];return t.forEach((function t(r){Array.isArray(r)?r.forEach(t):e.push(r);})),e}(t);function i(t){return t.reduce(((t,e)=>t*e))}if(!Array.isArray(t)||!Array.isArray(e))throw new TypeError("Array expected");if(0===e.length)throw new Wr(0,i(Zr(t)),"!=");for(var s=1,a=0;a<e.length;a++)s*=e[a];if(n.length!==s)throw new Wr(i(e),i(Zr(t)),"!=");try{r=function(t,e){for(var r,n=t,i=e.length-1;i>0;i--){var s=e[i];r=[];for(var a=n.length/s,o=0;o<a;o++)r.push(n.slice(o*s,(o+1)*s));n=r;}return n}(n,e);}catch(o){if(o instanceof Wr)throw new Wr(i(e),i(Zr(t)),"!=");throw o}return r}function rn(t,e,r,n){var i=n||Zr(t);if(r)for(var s=0;s<r;s++)t=[t],i.unshift(1);for(t=nn(t,e,0);i.length<e;)i.push(1);return t}function nn(t,e,r){var n,i;if(Array.isArray(t)){var s=r+1;for(n=0,i=t.length;n<i;n++)t[n]=nn(t[n],e,s);}else for(var a=r;a<e;a++)t=[t];return t}function sn(t,e){return Array.prototype.map.call(t,e)}function an(t,e){Array.prototype.forEach.call(t,e);}function on(t,e){return Array.prototype.join.call(t,e)}function un(t,e){for(var r,n=0,i=0;i<t.length;i++){var s=t[i],a=Array.isArray(s);if(0===i&&a&&(n=s.length),a&&s.length!==n)return;var o=a?un(s,e):e(s);if(void 0===r)r=o;else if(r!==o)return "mixed"}return r}function cn(t,e,r,n){function i(n){var i=function(t,e){for(var r={},n=0;n<e.length;n++){var i=e[n],s=t[i];void 0!==s&&(r[i]=s);}return r}(n,e.map(pn));return function(t,e,r){if(!e.filter((t=>!function(t){return t&&"?"===t[0]}(t))).every((t=>void 0!==r[t]))){var n=e.filter((t=>void 0===r[t]));throw new Error('Cannot create function "'.concat(t,'", ')+"some dependencies are missing: ".concat(n.map((t=>'"'.concat(t,'"'))).join(", "),"."))}}(t,e,n),r(i)}return i.isFactory=!0,i.fn=t,i.dependencies=e.slice().sort(),n&&(i.meta=n),i}function pn(t){return t&&"?"===t[0]?t.slice(1):t}Wr.prototype=new RangeError,Wr.prototype.constructor=RangeError,Wr.prototype.name="DimensionError",Wr.prototype.isDimensionError=!0,Yr.prototype=new RangeError,Yr.prototype.constructor=RangeError,Yr.prototype.name="IndexError",Yr.prototype.isIndexError=!0;var fn=function(){return fn=zr.create,zr},dn=cn("typed",["?BigNumber","?Complex","?DenseMatrix","?Fraction"],(function(t){var{BigNumber:e,Complex:r,DenseMatrix:n,Fraction:i}=t,s=fn();return s.types=[{name:"number",test:Te},{name:"Complex",test:ze},{name:"BigNumber",test:Oe},{name:"Fraction",test:Ae},{name:"Unit",test:Ce},{name:"string",test:Re},{name:"Chain",test:cr},{name:"Array",test:De},{name:"Matrix",test:ke},{name:"DenseMatrix",test:Le},{name:"SparseMatrix",test:Be},{name:"Range",test:Fe},{name:"Index",test:Pe},{name:"boolean",test:Ue},{name:"ResultSet",test:je},{name:"Help",test:qe},{name:"function",test:He},{name:"Date",test:Ve},{name:"RegExp",test:$e},{name:"null",test:We},{name:"undefined",test:Ye},{name:"AccessorNode",test:Ze},{name:"ArrayNode",test:Xe},{name:"AssignmentNode",test:Qe},{name:"BlockNode",test:Je},{name:"ConditionalNode",test:Ke},{name:"ConstantNode",test:tr},{name:"FunctionNode",test:rr},{name:"FunctionAssignmentNode",test:er},{name:"IndexNode",test:nr},{name:"Node",test:ir},{name:"ObjectNode",test:sr},{name:"OperatorNode",test:ar},{name:"ParenthesisNode",test:or},{name:"RangeNode",test:ur},{name:"SymbolNode",test:hr},{name:"Object",test:Ge}],s.conversions=[{from:"number",to:"BigNumber",convert:function(t){if(e||mn(t),t.toExponential().replace(/e.*$/,"").replace(/^0\.?0*|\./,"").length>15)throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: "+t+"). Use function bignumber(x) to convert to BigNumber.");return new e(t)}},{from:"number",to:"Complex",convert:function(t){return r||yn(t),new r(t,0)}},{from:"number",to:"string",convert:function(t){return t+""}},{from:"BigNumber",to:"Complex",convert:function(t){return r||yn(t),new r(t.toNumber(),0)}},{from:"Fraction",to:"BigNumber",convert:function(t){throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.")}},{from:"Fraction",to:"Complex",convert:function(t){return r||yn(t),new r(t.valueOf(),0)}},{from:"number",to:"Fraction",convert:function(t){i||gn(t);var e=new i(t);if(e.valueOf()!==t)throw new TypeError("Cannot implicitly convert a number to a Fraction when there will be a loss of precision (value: "+t+"). Use function fraction(x) to convert to Fraction.");return e}},{from:"string",to:"number",convert:function(t){var e=Number(t);if(isNaN(e))throw new Error('Cannot convert "'+t+'" to a number');return e}},{from:"string",to:"BigNumber",convert:function(t){e||mn(t);try{return new e(t)}catch(r){throw new Error('Cannot convert "'+t+'" to BigNumber')}}},{from:"string",to:"Fraction",convert:function(t){i||gn(t);try{return new i(t)}catch(e){throw new Error('Cannot convert "'+t+'" to Fraction')}}},{from:"string",to:"Complex",convert:function(t){r||yn(t);try{return new r(t)}catch(e){throw new Error('Cannot convert "'+t+'" to Complex')}}},{from:"boolean",to:"number",convert:function(t){return +t}},{from:"boolean",to:"BigNumber",convert:function(t){return e||mn(t),new e(+t)}},{from:"boolean",to:"Fraction",convert:function(t){return i||gn(t),new i(+t)}},{from:"boolean",to:"string",convert:function(t){return String(t)}},{from:"Array",to:"Matrix",convert:function(t){return n||function(){throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided")}(),new n(t)}},{from:"Matrix",to:"Array",convert:function(t){return t.valueOf()}}],s}));function mn(t){throw new Error("Cannot convert value ".concat(t," into a BigNumber: no class 'BigNumber' provided"))}function yn(t){throw new Error("Cannot convert value ".concat(t," into a Complex number: no class 'Complex' provided"))}function gn(t){throw new Error("Cannot convert value ".concat(t," into a Fraction, no class 'Fraction' provided."))}var vn,xn,wn=cn("ResultSet",[],(()=>{function t(e){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");this.entries=e||[];}return t.prototype.type="ResultSet",t.prototype.isResultSet=!0,t.prototype.valueOf=function(){return this.entries},t.prototype.toString=function(){return "["+this.entries.join(", ")+"]"},t.prototype.toJSON=function(){return {mathjs:"ResultSet",entries:this.entries}},t.fromJSON=function(e){return new t(e.entries)},t}),{isClass:!0}),bn=9e15,_n="0123456789abcdef",Mn="2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058",En="3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789",Nn={precision:20,rounding:4,modulo:1,toExpNeg:-7,toExpPos:21,minE:-bn,maxE:bn,crypto:!1},Sn=!0,Tn="[DecimalError] Invalid argument: ",On=Math.floor,zn=Math.pow,An=/^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,Cn=/^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,Rn=/^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,Dn=/^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,kn=1e7,In=Mn.length-1,Ln=En.length-1,Bn={name:"[object Decimal]"};function Fn(t){var e,r,n,i=t.length-1,s="",a=t[0];if(i>0){for(s+=a,e=1;e<i;e++)(r=7-(n=t[e]+"").length)&&(s+=Zn(r)),s+=n;(r=7-(n=(a=t[e])+"").length)&&(s+=Zn(r));}else if(0===a)return "0";for(;a%10==0;)a/=10;return s+a}function Pn(t,e,r){if(t!==~~t||t<e||t>r)throw Error(Tn+t)}function Un(t,e,r,n){var i,s,a,o;for(s=t[0];s>=10;s/=10)--e;return --e<0?(e+=7,i=0):(i=Math.ceil((e+1)/7),e%=7),s=zn(10,7-e),o=t[i]%s|0,null==n?e<3?(0==e?o=o/100|0:1==e&&(o=o/10|0),a=r<4&&99999==o||r>3&&49999==o||5e4==o||0==o):a=(r<4&&o+1==s||r>3&&o+1==s/2)&&(t[i+1]/s/100|0)==zn(10,e-2)-1||(o==s/2||0==o)&&0==(t[i+1]/s/100|0):e<4?(0==e?o=o/1e3|0:1==e?o=o/100|0:2==e&&(o=o/10|0),a=(n||r<4)&&9999==o||!n&&r>3&&4999==o):a=((n||r<4)&&o+1==s||!n&&r>3&&o+1==s/2)&&(t[i+1]/s/1e3|0)==zn(10,e-3)-1,a}function jn(t,e,r){for(var n,i,s=[0],a=0,o=t.length;a<o;){for(i=s.length;i--;)s[i]*=e;for(s[0]+=_n.indexOf(t.charAt(a++)),n=0;n<s.length;n++)s[n]>r-1&&(void 0===s[n+1]&&(s[n+1]=0),s[n+1]+=s[n]/r|0,s[n]%=r);}return s.reverse()}Bn.absoluteValue=Bn.abs=function(){var t=new this.constructor(this);return t.s<0&&(t.s=1),Hn(t)},Bn.ceil=function(){return Hn(new this.constructor(this),this.e+1,2)},Bn.comparedTo=Bn.cmp=function(t){var e,r,n,i,s=this,a=s.d,o=(t=new s.constructor(t)).d,u=s.s,h=t.s;if(!a||!o)return u&&h?u!==h?u:a===o?0:!a^u<0?1:-1:NaN;if(!a[0]||!o[0])return a[0]?u:o[0]?-h:0;if(u!==h)return u;if(s.e!==t.e)return s.e>t.e^u<0?1:-1;for(e=0,r=(n=a.length)<(i=o.length)?n:i;e<r;++e)if(a[e]!==o[e])return a[e]>o[e]^u<0?1:-1;return n===i?0:n>i^u<0?1:-1},Bn.cosine=Bn.cos=function(){var t,e,r=this,n=r.constructor;return r.d?r.d[0]?(t=n.precision,e=n.rounding,n.precision=t+Math.max(r.e,r.sd())+7,n.rounding=1,r=function(t,e){var r,n,i=e.d.length;i<32?n=(1/ii(4,r=Math.ceil(i/3))).toString():(r=16,n="2.3283064365386962890625e-10");t.precision+=r,e=ni(t,1,e.times(n),new t(1));for(var s=r;s--;){var a=e.times(e);e=a.times(a).minus(a).times(8).plus(1);}return t.precision-=r,e}(n,si(n,r)),n.precision=t,n.rounding=e,Hn(2==xn||3==xn?r.neg():r,t,e,!0)):new n(1):new n(NaN)},Bn.cubeRoot=Bn.cbrt=function(){var t,e,r,n,i,s,a,o,u,h,c=this,l=c.constructor;if(!c.isFinite()||c.isZero())return new l(c);for(Sn=!1,(s=c.s*zn(c.s*c,1/3))&&Math.abs(s)!=1/0?n=new l(s.toString()):(r=Fn(c.d),(s=((t=c.e)-r.length+1)%3)&&(r+=1==s||-2==s?"0":"00"),s=zn(r,1/3),t=On((t+1)/3)-(t%3==(t<0?-1:2)),(n=new l(r=s==1/0?"5e"+t:(r=s.toExponential()).slice(0,r.indexOf("e")+1)+t)).s=c.s),a=(t=l.precision)+3;;)if(h=(u=(o=n).times(o).times(o)).plus(c),n=qn(h.plus(c).times(o),h.plus(u),a+2,1),Fn(o.d).slice(0,a)===(r=Fn(n.d)).slice(0,a)){if("9999"!=(r=r.slice(a-3,a+1))&&(i||"4999"!=r)){+r&&(+r.slice(1)||"5"!=r.charAt(0))||(Hn(n,t+1,1),e=!n.times(n).times(n).eq(c));break}if(!i&&(Hn(o,t+1,0),o.times(o).times(o).eq(c))){n=o;break}a+=4,i=1;}return Sn=!0,Hn(n,t,l.rounding,e)},Bn.decimalPlaces=Bn.dp=function(){var t,e=this.d,r=NaN;if(e){if(r=7*((t=e.length-1)-On(this.e/7)),t=e[t])for(;t%10==0;t/=10)r--;r<0&&(r=0);}return r},Bn.dividedBy=Bn.div=function(t){return qn(this,new this.constructor(t))},Bn.dividedToIntegerBy=Bn.divToInt=function(t){var e=this.constructor;return Hn(qn(this,new e(t),0,1,1),e.precision,e.rounding)},Bn.equals=Bn.eq=function(t){return 0===this.cmp(t)},Bn.floor=function(){return Hn(new this.constructor(this),this.e+1,3)},Bn.greaterThan=Bn.gt=function(t){return this.cmp(t)>0},Bn.greaterThanOrEqualTo=Bn.gte=function(t){var e=this.cmp(t);return 1==e||0===e},Bn.hyperbolicCosine=Bn.cosh=function(){var t,e,r,n,i,s=this,a=s.constructor,o=new a(1);if(!s.isFinite())return new a(s.s?1/0:NaN);if(s.isZero())return o;r=a.precision,n=a.rounding,a.precision=r+Math.max(s.e,s.sd())+4,a.rounding=1,(i=s.d.length)<32?e=(1/ii(4,t=Math.ceil(i/3))).toString():(t=16,e="2.3283064365386962890625e-10"),s=ni(a,1,s.times(e),new a(1),!0);for(var u,h=t,c=new a(8);h--;)u=s.times(s),s=o.minus(u.times(c.minus(u.times(c))));return Hn(s,a.precision=r,a.rounding=n,!0)},Bn.hyperbolicSine=Bn.sinh=function(){var t,e,r,n,i=this,s=i.constructor;if(!i.isFinite()||i.isZero())return new s(i);if(e=s.precision,r=s.rounding,s.precision=e+Math.max(i.e,i.sd())+4,s.rounding=1,(n=i.d.length)<3)i=ni(s,2,i,i,!0);else {t=(t=1.4*Math.sqrt(n))>16?16:0|t,i=ni(s,2,i=i.times(1/ii(5,t)),i,!0);for(var a,o=new s(5),u=new s(16),h=new s(20);t--;)a=i.times(i),i=i.times(o.plus(a.times(u.times(a).plus(h))));}return s.precision=e,s.rounding=r,Hn(i,e,r,!0)},Bn.hyperbolicTangent=Bn.tanh=function(){var t,e,r=this,n=r.constructor;return r.isFinite()?r.isZero()?new n(r):(t=n.precision,e=n.rounding,n.precision=t+7,n.rounding=1,qn(r.sinh(),r.cosh(),n.precision=t,n.rounding=e)):new n(r.s)},Bn.inverseCosine=Bn.acos=function(){var t,e=this,r=e.constructor,n=e.abs().cmp(1),i=r.precision,s=r.rounding;return -1!==n?0===n?e.isNeg()?Wn(r,i,s):new r(0):new r(NaN):e.isZero()?Wn(r,i+4,s).times(.5):(r.precision=i+6,r.rounding=1,e=e.asin(),t=Wn(r,i+4,s).times(.5),r.precision=i,r.rounding=s,t.minus(e))},Bn.inverseHyperbolicCosine=Bn.acosh=function(){var t,e,r=this,n=r.constructor;return r.lte(1)?new n(r.eq(1)?0:NaN):r.isFinite()?(t=n.precision,e=n.rounding,n.precision=t+Math.max(Math.abs(r.e),r.sd())+4,n.rounding=1,Sn=!1,r=r.times(r).minus(1).sqrt().plus(r),Sn=!0,n.precision=t,n.rounding=e,r.ln()):new n(r)},Bn.inverseHyperbolicSine=Bn.asinh=function(){var t,e,r=this,n=r.constructor;return !r.isFinite()||r.isZero()?new n(r):(t=n.precision,e=n.rounding,n.precision=t+2*Math.max(Math.abs(r.e),r.sd())+6,n.rounding=1,Sn=!1,r=r.times(r).plus(1).sqrt().plus(r),Sn=!0,n.precision=t,n.rounding=e,r.ln())},Bn.inverseHyperbolicTangent=Bn.atanh=function(){var t,e,r,n,i=this,s=i.constructor;return i.isFinite()?i.e>=0?new s(i.abs().eq(1)?i.s/0:i.isZero()?i:NaN):(t=s.precision,e=s.rounding,n=i.sd(),Math.max(n,t)<2*-i.e-1?Hn(new s(i),t,e,!0):(s.precision=r=n-i.e,i=qn(i.plus(1),new s(1).minus(i),r+t,1),s.precision=t+4,s.rounding=1,i=i.ln(),s.precision=t,s.rounding=e,i.times(.5))):new s(NaN)},Bn.inverseSine=Bn.asin=function(){var t,e,r,n,i=this,s=i.constructor;return i.isZero()?new s(i):(e=i.abs().cmp(1),r=s.precision,n=s.rounding,-1!==e?0===e?((t=Wn(s,r+4,n).times(.5)).s=i.s,t):new s(NaN):(s.precision=r+6,s.rounding=1,i=i.div(new s(1).minus(i.times(i)).sqrt().plus(1)).atan(),s.precision=r,s.rounding=n,i.times(2)))},Bn.inverseTangent=Bn.atan=function(){var t,e,r,n,i,s,a,o,u,h=this,c=h.constructor,l=c.precision,p=c.rounding;if(h.isFinite()){if(h.isZero())return new c(h);if(h.abs().eq(1)&&l+4<=Ln)return (a=Wn(c,l+4,p).times(.25)).s=h.s,a}else {if(!h.s)return new c(NaN);if(l+4<=Ln)return (a=Wn(c,l+4,p).times(.5)).s=h.s,a}for(c.precision=o=l+10,c.rounding=1,t=r=Math.min(28,o/7+2|0);t;--t)h=h.div(h.times(h).plus(1).sqrt().plus(1));for(Sn=!1,e=Math.ceil(o/7),n=1,u=h.times(h),a=new c(h),i=h;-1!==t;)if(i=i.times(u),s=a.minus(i.div(n+=2)),i=i.times(u),void 0!==(a=s.plus(i.div(n+=2))).d[e])for(t=e;a.d[t]===s.d[t]&&t--;);return r&&(a=a.times(2<<r-1)),Sn=!0,Hn(a,c.precision=l,c.rounding=p,!0)},Bn.isFinite=function(){return !!this.d},Bn.isInteger=Bn.isInt=function(){return !!this.d&&On(this.e/7)>this.d.length-2},Bn.isNaN=function(){return !this.s},Bn.isNegative=Bn.isNeg=function(){return this.s<0},Bn.isPositive=Bn.isPos=function(){return this.s>0},Bn.isZero=function(){return !!this.d&&0===this.d[0]},Bn.lessThan=Bn.lt=function(t){return this.cmp(t)<0},Bn.lessThanOrEqualTo=Bn.lte=function(t){return this.cmp(t)<1},Bn.logarithm=Bn.log=function(t){var e,r,n,i,s,a,o,u,h=this,c=h.constructor,l=c.precision,p=c.rounding;if(null==t)t=new c(10),e=!0;else {if(r=(t=new c(t)).d,t.s<0||!r||!r[0]||t.eq(1))return new c(NaN);e=t.eq(10);}if(r=h.d,h.s<0||!r||!r[0]||h.eq(1))return new c(r&&!r[0]?-1/0:1!=h.s?NaN:r?0:1/0);if(e)if(r.length>1)s=!0;else {for(i=r[0];i%10==0;)i/=10;s=1!==i;}if(Sn=!1,a=ti(h,o=l+5),n=e?Gn(c,o+10):ti(t,o),Un((u=qn(a,n,o,1)).d,i=l,p))do{if(a=ti(h,o+=10),n=e?Gn(c,o+10):ti(t,o),u=qn(a,n,o,1),!s){+Fn(u.d).slice(i+1,i+15)+1==1e14&&(u=Hn(u,l+1,0));break}}while(Un(u.d,i+=10,p));return Sn=!0,Hn(u,l,p)},Bn.minus=Bn.sub=function(t){var e,r,n,i,s,a,o,u,h,c,l,p,f=this,d=f.constructor;if(t=new d(t),!f.d||!t.d)return f.s&&t.s?f.d?t.s=-t.s:t=new d(t.d||f.s!==t.s?f:NaN):t=new d(NaN),t;if(f.s!=t.s)return t.s=-t.s,f.plus(t);if(h=f.d,p=t.d,o=d.precision,u=d.rounding,!h[0]||!p[0]){if(p[0])t.s=-t.s;else {if(!h[0])return new d(3===u?-0:0);t=new d(f);}return Sn?Hn(t,o,u):t}if(r=On(t.e/7),c=On(f.e/7),h=h.slice(),s=c-r){for((l=s<0)?(e=h,s=-s,a=p.length):(e=p,r=c,a=h.length),s>(n=Math.max(Math.ceil(o/7),a)+2)&&(s=n,e.length=1),e.reverse(),n=s;n--;)e.push(0);e.reverse();}else {for((l=(n=h.length)<(a=p.length))&&(a=n),n=0;n<a;n++)if(h[n]!=p[n]){l=h[n]<p[n];break}s=0;}for(l&&(e=h,h=p,p=e,t.s=-t.s),a=h.length,n=p.length-a;n>0;--n)h[a++]=0;for(n=p.length;n>s;){if(h[--n]<p[n]){for(i=n;i&&0===h[--i];)h[i]=kn-1;--h[i],h[n]+=kn;}h[n]-=p[n];}for(;0===h[--a];)h.pop();for(;0===h[0];h.shift())--r;return h[0]?(t.d=h,t.e=$n(h,r),Sn?Hn(t,o,u):t):new d(3===u?-0:0)},Bn.modulo=Bn.mod=function(t){var e,r=this,n=r.constructor;return t=new n(t),!r.d||!t.s||t.d&&!t.d[0]?new n(NaN):!t.d||r.d&&!r.d[0]?Hn(new n(r),n.precision,n.rounding):(Sn=!1,9==n.modulo?(e=qn(r,t.abs(),0,3,1)).s*=t.s:e=qn(r,t,0,n.modulo,1),e=e.times(t),Sn=!0,r.minus(e))},Bn.naturalExponential=Bn.exp=function(){return Kn(this)},Bn.naturalLogarithm=Bn.ln=function(){return ti(this)},Bn.negated=Bn.neg=function(){var t=new this.constructor(this);return t.s=-t.s,Hn(t)},Bn.plus=Bn.add=function(t){var e,r,n,i,s,a,o,u,h,c,l=this,p=l.constructor;if(t=new p(t),!l.d||!t.d)return l.s&&t.s?l.d||(t=new p(t.d||l.s===t.s?l:NaN)):t=new p(NaN),t;if(l.s!=t.s)return t.s=-t.s,l.minus(t);if(h=l.d,c=t.d,o=p.precision,u=p.rounding,!h[0]||!c[0])return c[0]||(t=new p(l)),Sn?Hn(t,o,u):t;if(s=On(l.e/7),n=On(t.e/7),h=h.slice(),i=s-n){for(i<0?(r=h,i=-i,a=c.length):(r=c,n=s,a=h.length),i>(a=(s=Math.ceil(o/7))>a?s+1:a+1)&&(i=a,r.length=1),r.reverse();i--;)r.push(0);r.reverse();}for((a=h.length)-(i=c.length)<0&&(i=a,r=c,c=h,h=r),e=0;i;)e=(h[--i]=h[i]+c[i]+e)/kn|0,h[i]%=kn;for(e&&(h.unshift(e),++n),a=h.length;0==h[--a];)h.pop();return t.d=h,t.e=$n(h,n),Sn?Hn(t,o,u):t},Bn.precision=Bn.sd=function(t){var e,r=this;if(void 0!==t&&t!==!!t&&1!==t&&0!==t)throw Error(Tn+t);return r.d?(e=Yn(r.d),t&&r.e+1>e&&(e=r.e+1)):e=NaN,e},Bn.round=function(){var t=this,e=t.constructor;return Hn(new e(t),t.e+1,e.rounding)},Bn.sine=Bn.sin=function(){var t,e,r=this,n=r.constructor;return r.isFinite()?r.isZero()?new n(r):(t=n.precision,e=n.rounding,n.precision=t+Math.max(r.e,r.sd())+7,n.rounding=1,r=function(t,e){var r,n=e.d.length;if(n<3)return ni(t,2,e,e);r=(r=1.4*Math.sqrt(n))>16?16:0|r,e=e.times(1/ii(5,r)),e=ni(t,2,e,e);for(var i,s=new t(5),a=new t(16),o=new t(20);r--;)i=e.times(e),e=e.times(s.plus(i.times(a.times(i).minus(o))));return e}(n,si(n,r)),n.precision=t,n.rounding=e,Hn(xn>2?r.neg():r,t,e,!0)):new n(NaN)},Bn.squareRoot=Bn.sqrt=function(){var t,e,r,n,i,s,a=this,o=a.d,u=a.e,h=a.s,c=a.constructor;if(1!==h||!o||!o[0])return new c(!h||h<0&&(!o||o[0])?NaN:o?a:1/0);for(Sn=!1,0==(h=Math.sqrt(+a))||h==1/0?(((e=Fn(o)).length+u)%2==0&&(e+="0"),h=Math.sqrt(e),u=On((u+1)/2)-(u<0||u%2),n=new c(e=h==1/0?"5e"+u:(e=h.toExponential()).slice(0,e.indexOf("e")+1)+u)):n=new c(h.toString()),r=(u=c.precision)+3;;)if(n=(s=n).plus(qn(a,s,r+2,1)).times(.5),Fn(s.d).slice(0,r)===(e=Fn(n.d)).slice(0,r)){if("9999"!=(e=e.slice(r-3,r+1))&&(i||"4999"!=e)){+e&&(+e.slice(1)||"5"!=e.charAt(0))||(Hn(n,u+1,1),t=!n.times(n).eq(a));break}if(!i&&(Hn(s,u+1,0),s.times(s).eq(a))){n=s;break}r+=4,i=1;}return Sn=!0,Hn(n,u,c.rounding,t)},Bn.tangent=Bn.tan=function(){var t,e,r=this,n=r.constructor;return r.isFinite()?r.isZero()?new n(r):(t=n.precision,e=n.rounding,n.precision=t+10,n.rounding=1,(r=r.sin()).s=1,r=qn(r,new n(1).minus(r.times(r)).sqrt(),t+10,0),n.precision=t,n.rounding=e,Hn(2==xn||4==xn?r.neg():r,t,e,!0)):new n(NaN)},Bn.times=Bn.mul=function(t){var e,r,n,i,s,a,o,u,h,c=this,l=c.constructor,p=c.d,f=(t=new l(t)).d;if(t.s*=c.s,!(p&&p[0]&&f&&f[0]))return new l(!t.s||p&&!p[0]&&!f||f&&!f[0]&&!p?NaN:p&&f?0*t.s:t.s/0);for(r=On(c.e/7)+On(t.e/7),(u=p.length)<(h=f.length)&&(s=p,p=f,f=s,a=u,u=h,h=a),s=[],n=a=u+h;n--;)s.push(0);for(n=h;--n>=0;){for(e=0,i=u+n;i>n;)o=s[i]+f[n]*p[i-n-1]+e,s[i--]=o%kn|0,e=o/kn|0;s[i]=(s[i]+e)%kn|0;}for(;!s[--a];)s.pop();return e?++r:s.shift(),t.d=s,t.e=$n(s,r),Sn?Hn(t,l.precision,l.rounding):t},Bn.toBinary=function(t,e){return ai(this,2,t,e)},Bn.toDecimalPlaces=Bn.toDP=function(t,e){var r=this,n=r.constructor;return r=new n(r),void 0===t?r:(Pn(t,0,1e9),void 0===e?e=n.rounding:Pn(e,0,8),Hn(r,t+r.e+1,e))},Bn.toExponential=function(t,e){var r,n=this,i=n.constructor;return void 0===t?r=Vn(n,!0):(Pn(t,0,1e9),void 0===e?e=i.rounding:Pn(e,0,8),r=Vn(n=Hn(new i(n),t+1,e),!0,t+1)),n.isNeg()&&!n.isZero()?"-"+r:r},Bn.toFixed=function(t,e){var r,n,i=this,s=i.constructor;return void 0===t?r=Vn(i):(Pn(t,0,1e9),void 0===e?e=s.rounding:Pn(e,0,8),r=Vn(n=Hn(new s(i),t+i.e+1,e),!1,t+n.e+1)),i.isNeg()&&!i.isZero()?"-"+r:r},Bn.toFraction=function(t){var e,r,n,i,s,a,o,u,h,c,l,p,f=this,d=f.d,m=f.constructor;if(!d)return new m(f);if(h=r=new m(1),n=u=new m(0),a=(s=(e=new m(n)).e=Yn(d)-f.e-1)%7,e.d[0]=zn(10,a<0?7+a:a),null==t)t=s>0?e:h;else {if(!(o=new m(t)).isInt()||o.lt(h))throw Error(Tn+o);t=o.gt(e)?s>0?e:h:o;}for(Sn=!1,o=new m(Fn(d)),c=m.precision,m.precision=s=7*d.length*2;l=qn(o,e,0,1,1),1!=(i=r.plus(l.times(n))).cmp(t);)r=n,n=i,i=h,h=u.plus(l.times(i)),u=i,i=e,e=o.minus(l.times(i)),o=i;return i=qn(t.minus(r),n,0,1,1),u=u.plus(i.times(h)),r=r.plus(i.times(n)),u.s=h.s=f.s,p=qn(h,n,s,1).minus(f).abs().cmp(qn(u,r,s,1).minus(f).abs())<1?[h,n]:[u,r],m.precision=c,Sn=!0,p},Bn.toHexadecimal=Bn.toHex=function(t,e){return ai(this,16,t,e)},Bn.toNearest=function(t,e){var r=this,n=r.constructor;if(r=new n(r),null==t){if(!r.d)return r;t=new n(1),e=n.rounding;}else {if(t=new n(t),void 0===e?e=n.rounding:Pn(e,0,8),!r.d)return t.s?r:t;if(!t.d)return t.s&&(t.s=r.s),t}return t.d[0]?(Sn=!1,r=qn(r,t,0,e,1).times(t),Sn=!0,Hn(r)):(t.s=r.s,r=t),r},Bn.toNumber=function(){return +this},Bn.toOctal=function(t,e){return ai(this,8,t,e)},Bn.toPower=Bn.pow=function(t){var e,r,n,i,s,a,o=this,u=o.constructor,h=+(t=new u(t));if(!(o.d&&t.d&&o.d[0]&&t.d[0]))return new u(zn(+o,h));if((o=new u(o)).eq(1))return o;if(n=u.precision,s=u.rounding,t.eq(1))return Hn(o,n,s);if((e=On(t.e/7))>=t.d.length-1&&(r=h<0?-h:h)<=9007199254740991)return i=Xn(u,o,r,n),t.s<0?new u(1).div(i):Hn(i,n,s);if((a=o.s)<0){if(e<t.d.length-1)return new u(NaN);if(0==(1&t.d[e])&&(a=1),0==o.e&&1==o.d[0]&&1==o.d.length)return o.s=a,o}return (e=0!=(r=zn(+o,h))&&isFinite(r)?new u(r+"").e:On(h*(Math.log("0."+Fn(o.d))/Math.LN10+o.e+1)))>u.maxE+1||e<u.minE-1?new u(e>0?a/0:0):(Sn=!1,u.rounding=o.s=1,r=Math.min(12,(e+"").length),(i=Kn(t.times(ti(o,n+r)),n)).d&&Un((i=Hn(i,n+5,1)).d,n,s)&&(e=n+10,+Fn((i=Hn(Kn(t.times(ti(o,e+r)),e),e+5,1)).d).slice(n+1,n+15)+1==1e14&&(i=Hn(i,n+1,0))),i.s=a,Sn=!0,u.rounding=s,Hn(i,n,s))},Bn.toPrecision=function(t,e){var r,n=this,i=n.constructor;return void 0===t?r=Vn(n,n.e<=i.toExpNeg||n.e>=i.toExpPos):(Pn(t,1,1e9),void 0===e?e=i.rounding:Pn(e,0,8),r=Vn(n=Hn(new i(n),t,e),t<=n.e||n.e<=i.toExpNeg,t)),n.isNeg()&&!n.isZero()?"-"+r:r},Bn.toSignificantDigits=Bn.toSD=function(t,e){var r=this.constructor;return void 0===t?(t=r.precision,e=r.rounding):(Pn(t,1,1e9),void 0===e?e=r.rounding:Pn(e,0,8)),Hn(new r(this),t,e)},Bn.toString=function(){var t=this,e=t.constructor,r=Vn(t,t.e<=e.toExpNeg||t.e>=e.toExpPos);return t.isNeg()&&!t.isZero()?"-"+r:r},Bn.truncated=Bn.trunc=function(){return Hn(new this.constructor(this),this.e+1,1)},Bn.valueOf=Bn.toJSON=function(){var t=this,e=t.constructor,r=Vn(t,t.e<=e.toExpNeg||t.e>=e.toExpPos);return t.isNeg()?"-"+r:r};var qn=function(){function t(t,e,r){var n,i=0,s=t.length;for(t=t.slice();s--;)n=t[s]*e+i,t[s]=n%r|0,i=n/r|0;return i&&t.unshift(i),t}function e(t,e,r,n){var i,s;if(r!=n)s=r>n?1:-1;else for(i=s=0;i<r;i++)if(t[i]!=e[i]){s=t[i]>e[i]?1:-1;break}return s}function r(t,e,r,n){for(var i=0;r--;)t[r]-=i,i=t[r]<e[r]?1:0,t[r]=i*n+t[r]-e[r];for(;!t[0]&&t.length>1;)t.shift();}return function(n,i,s,a,o,u){var h,c,l,p,f,d,m,y,g,v,x,w,b,_,M,E,N,S,T,O,z=n.constructor,A=n.s==i.s?1:-1,C=n.d,R=i.d;if(!(C&&C[0]&&R&&R[0]))return new z(n.s&&i.s&&(C?!R||C[0]!=R[0]:R)?C&&0==C[0]||!R?0*A:A/0:NaN);for(u?(f=1,c=n.e-i.e):(u=kn,f=7,c=On(n.e/f)-On(i.e/f)),T=R.length,N=C.length,v=(g=new z(A)).d=[],l=0;R[l]==(C[l]||0);l++);if(R[l]>(C[l]||0)&&c--,null==s?(_=s=z.precision,a=z.rounding):_=o?s+(n.e-i.e)+1:s,_<0)v.push(1),d=!0;else {if(_=_/f+2|0,l=0,1==T){for(p=0,R=R[0],_++;(l<N||p)&&_--;l++)M=p*u+(C[l]||0),v[l]=M/R|0,p=M%R|0;d=p||l<N;}else {for((p=u/(R[0]+1)|0)>1&&(R=t(R,p,u),C=t(C,p,u),T=R.length,N=C.length),E=T,w=(x=C.slice(0,T)).length;w<T;)x[w++]=0;(O=R.slice()).unshift(0),S=R[0],R[1]>=u/2&&++S;do{p=0,(h=e(R,x,T,w))<0?(b=x[0],T!=w&&(b=b*u+(x[1]||0)),(p=b/S|0)>1?(p>=u&&(p=u-1),1==(h=e(m=t(R,p,u),x,y=m.length,w=x.length))&&(p--,r(m,T<y?O:R,y,u))):(0==p&&(h=p=1),m=R.slice()),(y=m.length)<w&&m.unshift(0),r(x,m,w,u),-1==h&&(h=e(R,x,T,w=x.length))<1&&(p++,r(x,T<w?O:R,w,u)),w=x.length):0===h&&(p++,x=[0]),v[l++]=p,h&&x[0]?x[w++]=C[E]||0:(x=[C[E]],w=1);}while((E++<N||void 0!==x[0])&&_--);d=void 0!==x[0];}v[0]||v.shift();}if(1==f)g.e=c,vn=d;else {for(l=1,p=v[0];p>=10;p/=10)l++;g.e=l+c*f-1,Hn(g,o?s+g.e+1:s,a,d);}return g}}();function Hn(t,e,r,n){var i,s,a,o,u,h,c,l,p,f=t.constructor;t:if(null!=e){if(!(l=t.d))return t;for(i=1,o=l[0];o>=10;o/=10)i++;if((s=e-i)<0)s+=7,a=e,u=(c=l[p=0])/zn(10,i-a-1)%10|0;else if((p=Math.ceil((s+1)/7))>=(o=l.length)){if(!n)break t;for(;o++<=p;)l.push(0);c=u=0,i=1,a=(s%=7)-7+1;}else {for(c=o=l[p],i=1;o>=10;o/=10)i++;u=(a=(s%=7)-7+i)<0?0:c/zn(10,i-a-1)%10|0;}if(n=n||e<0||void 0!==l[p+1]||(a<0?c:c%zn(10,i-a-1)),h=r<4?(u||n)&&(0==r||r==(t.s<0?3:2)):u>5||5==u&&(4==r||n||6==r&&(s>0?a>0?c/zn(10,i-a):0:l[p-1])%10&1||r==(t.s<0?8:7)),e<1||!l[0])return l.length=0,h?(e-=t.e+1,l[0]=zn(10,(7-e%7)%7),t.e=-e||0):l[0]=t.e=0,t;if(0==s?(l.length=p,o=1,p--):(l.length=p+1,o=zn(10,7-s),l[p]=a>0?(c/zn(10,i-a)%zn(10,a)|0)*o:0),h)for(;;){if(0==p){for(s=1,a=l[0];a>=10;a/=10)s++;for(a=l[0]+=o,o=1;a>=10;a/=10)o++;s!=o&&(t.e++,l[0]==kn&&(l[0]=1));break}if(l[p]+=o,l[p]!=kn)break;l[p--]=0,o=1;}for(s=l.length;0===l[--s];)l.pop();}return Sn&&(t.e>f.maxE?(t.d=null,t.e=NaN):t.e<f.minE&&(t.e=0,t.d=[0])),t}function Vn(t,e,r){if(!t.isFinite())return ei(t);var n,i=t.e,s=Fn(t.d),a=s.length;return e?(r&&(n=r-a)>0?s=s.charAt(0)+"."+s.slice(1)+Zn(n):a>1&&(s=s.charAt(0)+"."+s.slice(1)),s=s+(t.e<0?"e":"e+")+t.e):i<0?(s="0."+Zn(-i-1)+s,r&&(n=r-a)>0&&(s+=Zn(n))):i>=a?(s+=Zn(i+1-a),r&&(n=r-i-1)>0&&(s=s+"."+Zn(n))):((n=i+1)<a&&(s=s.slice(0,n)+"."+s.slice(n)),r&&(n=r-a)>0&&(i+1===a&&(s+="."),s+=Zn(n))),s}function $n(t,e){var r=t[0];for(e*=7;r>=10;r/=10)e++;return e}function Gn(t,e,r){if(e>In)throw Sn=!0,r&&(t.precision=r),Error("[DecimalError] Precision limit exceeded");return Hn(new t(Mn),e,1,!0)}function Wn(t,e,r){if(e>Ln)throw Error("[DecimalError] Precision limit exceeded");return Hn(new t(En),e,r,!0)}function Yn(t){var e=t.length-1,r=7*e+1;if(e=t[e]){for(;e%10==0;e/=10)r--;for(e=t[0];e>=10;e/=10)r++;}return r}function Zn(t){for(var e="";t--;)e+="0";return e}function Xn(t,e,r,n){var i,s=new t(1),a=Math.ceil(n/7+4);for(Sn=!1;;){if(r%2&&oi((s=s.times(e)).d,a)&&(i=!0),0===(r=On(r/2))){r=s.d.length-1,i&&0===s.d[r]&&++s.d[r];break}oi((e=e.times(e)).d,a);}return Sn=!0,s}function Qn(t){return 1&t.d[t.d.length-1]}function Jn(t,e,r){for(var n,i=new t(e[0]),s=0;++s<e.length;){if(!(n=new t(e[s])).s){i=n;break}i[r](n)&&(i=n);}return i}function Kn(t,e){var r,n,i,s,a,o,u,h=0,c=0,l=0,p=t.constructor,f=p.rounding,d=p.precision;if(!t.d||!t.d[0]||t.e>17)return new p(t.d?t.d[0]?t.s<0?0:1/0:1:t.s?t.s<0?0:t:NaN);for(null==e?(Sn=!1,u=d):u=e,o=new p(.03125);t.e>-2;)t=t.times(o),l+=5;for(u+=n=Math.log(zn(2,l))/Math.LN10*2+5|0,r=s=a=new p(1),p.precision=u;;){if(s=Hn(s.times(t),u,1),r=r.times(++c),Fn((o=a.plus(qn(s,r,u,1))).d).slice(0,u)===Fn(a.d).slice(0,u)){for(i=l;i--;)a=Hn(a.times(a),u,1);if(null!=e)return p.precision=d,a;if(!(h<3&&Un(a.d,u-n,f,h)))return Hn(a,p.precision=d,f,Sn=!0);p.precision=u+=10,r=s=o=new p(1),c=0,h++;}a=o;}}function ti(t,e){var r,n,i,s,a,o,u,h,c,l,p,f=1,d=t,m=d.d,y=d.constructor,g=y.rounding,v=y.precision;if(d.s<0||!m||!m[0]||!d.e&&1==m[0]&&1==m.length)return new y(m&&!m[0]?-1/0:1!=d.s?NaN:m?0:d);if(null==e?(Sn=!1,c=v):c=e,y.precision=c+=10,n=(r=Fn(m)).charAt(0),!(Math.abs(s=d.e)<15e14))return h=Gn(y,c+2,v).times(s+""),d=ti(new y(n+"."+r.slice(1)),c-10).plus(h),y.precision=v,null==e?Hn(d,v,g,Sn=!0):d;for(;n<7&&1!=n||1==n&&r.charAt(1)>3;)n=(r=Fn((d=d.times(t)).d)).charAt(0),f++;for(s=d.e,n>1?(d=new y("0."+r),s++):d=new y(n+"."+r.slice(1)),l=d,u=a=d=qn(d.minus(1),d.plus(1),c,1),p=Hn(d.times(d),c,1),i=3;;){if(a=Hn(a.times(p),c,1),Fn((h=u.plus(qn(a,new y(i),c,1))).d).slice(0,c)===Fn(u.d).slice(0,c)){if(u=u.times(2),0!==s&&(u=u.plus(Gn(y,c+2,v).times(s+""))),u=qn(u,new y(f),c,1),null!=e)return y.precision=v,u;if(!Un(u.d,c-10,g,o))return Hn(u,y.precision=v,g,Sn=!0);y.precision=c+=10,h=a=d=qn(l.minus(1),l.plus(1),c,1),p=Hn(d.times(d),c,1),i=o=1;}u=h,i+=2;}}function ei(t){return String(t.s*t.s/0)}function ri(t,e){var r,n,i;for((r=e.indexOf("."))>-1&&(e=e.replace(".","")),(n=e.search(/e/i))>0?(r<0&&(r=n),r+=+e.slice(n+1),e=e.substring(0,n)):r<0&&(r=e.length),n=0;48===e.charCodeAt(n);n++);for(i=e.length;48===e.charCodeAt(i-1);--i);if(e=e.slice(n,i)){if(i-=n,t.e=r=r-n-1,t.d=[],n=(r+1)%7,r<0&&(n+=7),n<i){for(n&&t.d.push(+e.slice(0,n)),i-=7;n<i;)t.d.push(+e.slice(n,n+=7));n=7-(e=e.slice(n)).length;}else n-=i;for(;n--;)e+="0";t.d.push(+e),Sn&&(t.e>t.constructor.maxE?(t.d=null,t.e=NaN):t.e<t.constructor.minE&&(t.e=0,t.d=[0]));}else t.e=0,t.d=[0];return t}function ni(t,e,r,n,i){var s,a,o,u,h=t.precision,c=Math.ceil(h/7);for(Sn=!1,u=r.times(r),o=new t(n);;){if(a=qn(o.times(u),new t(e++*e++),h,1),o=i?n.plus(a):n.minus(a),n=qn(a.times(u),new t(e++*e++),h,1),void 0!==(a=o.plus(n)).d[c]){for(s=c;a.d[s]===o.d[s]&&s--;);if(-1==s)break}s=o,o=n,n=a,a=s;}return Sn=!0,a.d.length=c+1,a}function ii(t,e){for(var r=t;--e;)r*=t;return r}function si(t,e){var r,n=e.s<0,i=Wn(t,t.precision,1),s=i.times(.5);if((e=e.abs()).lte(s))return xn=n?4:1,e;if((r=e.divToInt(i)).isZero())xn=n?3:2;else {if((e=e.minus(r.times(i))).lte(s))return xn=Qn(r)?n?2:3:n?4:1,e;xn=Qn(r)?n?1:4:n?3:2;}return e.minus(i).abs()}function ai(t,e,r,n){var i,s,a,o,u,h,c,l,p,f=t.constructor,d=void 0!==r;if(d?(Pn(r,1,1e9),void 0===n?n=f.rounding:Pn(n,0,8)):(r=f.precision,n=f.rounding),t.isFinite()){for(d?(i=2,16==e?r=4*r-3:8==e&&(r=3*r-2)):i=e,(a=(c=Vn(t)).indexOf("."))>=0&&(c=c.replace(".",""),(p=new f(1)).e=c.length-a,p.d=jn(Vn(p),10,i),p.e=p.d.length),s=u=(l=jn(c,10,i)).length;0==l[--u];)l.pop();if(l[0]){if(a<0?s--:((t=new f(t)).d=l,t.e=s,l=(t=qn(t,p,r,n,0,i)).d,s=t.e,h=vn),a=l[r],o=i/2,h=h||void 0!==l[r+1],h=n<4?(void 0!==a||h)&&(0===n||n===(t.s<0?3:2)):a>o||a===o&&(4===n||h||6===n&&1&l[r-1]||n===(t.s<0?8:7)),l.length=r,h)for(;++l[--r]>i-1;)l[r]=0,r||(++s,l.unshift(1));for(u=l.length;!l[u-1];--u);for(a=0,c="";a<u;a++)c+=_n.charAt(l[a]);if(d){if(u>1)if(16==e||8==e){for(a=16==e?4:3,--u;u%a;u++)c+="0";for(u=(l=jn(c,i,e)).length;!l[u-1];--u);for(a=1,c="1.";a<u;a++)c+=_n.charAt(l[a]);}else c=c.charAt(0)+"."+c.slice(1);c=c+(s<0?"p":"p+")+s;}else if(s<0){for(;++s;)c="0"+c;c="0."+c;}else if(++s>u)for(s-=u;s--;)c+="0";else s<u&&(c=c.slice(0,s)+"."+c.slice(s));}else c=d?"0p+0":"0";c=(16==e?"0x":2==e?"0b":8==e?"0o":"")+c;}else c=ei(t);return t.s<0?"-"+c:c}function oi(t,e){if(t.length>e)return t.length=e,!0}function ui(t){return new this(t).abs()}function hi(t){return new this(t).acos()}function ci(t){return new this(t).acosh()}function li(t,e){return new this(t).plus(e)}function pi(t){return new this(t).asin()}function fi(t){return new this(t).asinh()}function di(t){return new this(t).atan()}function mi(t){return new this(t).atanh()}function yi(t,e){t=new this(t),e=new this(e);var r,n=this.precision,i=this.rounding,s=n+4;return t.s&&e.s?t.d||e.d?!e.d||t.isZero()?(r=e.s<0?Wn(this,n,i):new this(0)).s=t.s:!t.d||e.isZero()?(r=Wn(this,s,1).times(.5)).s=t.s:e.s<0?(this.precision=s,this.rounding=1,r=this.atan(qn(t,e,s,1)),e=Wn(this,s,1),this.precision=n,this.rounding=i,r=t.s<0?r.minus(e):r.plus(e)):r=this.atan(qn(t,e,s,1)):(r=Wn(this,s,1).times(e.s>0?.25:.75)).s=t.s:r=new this(NaN),r}function gi(t){return new this(t).cbrt()}function vi(t){return Hn(t=new this(t),t.e+1,2)}function xi(t){if(!t||"object"!=typeof t)throw Error("[DecimalError] Object expected");var e,r,n,i=!0===t.defaults,s=["precision",1,1e9,"rounding",0,8,"toExpNeg",-bn,0,"toExpPos",0,bn,"maxE",0,bn,"minE",-bn,0,"modulo",0,9];for(e=0;e<s.length;e+=3)if(r=s[e],i&&(this[r]=Nn[r]),void 0!==(n=t[r])){if(!(On(n)===n&&n>=s[e+1]&&n<=s[e+2]))throw Error(Tn+r+": "+n);this[r]=n;}if(r="crypto",i&&(this[r]=Nn[r]),void 0!==(n=t[r])){if(!0!==n&&!1!==n&&0!==n&&1!==n)throw Error(Tn+r+": "+n);if(n){if("undefined"==typeof crypto||!crypto||!crypto.getRandomValues&&!crypto.randomBytes)throw Error("[DecimalError] crypto unavailable");this[r]=!0;}else this[r]=!1;}return this}function wi(t){return new this(t).cos()}function bi(t){return new this(t).cosh()}function _i(t,e){return new this(t).div(e)}function Mi(t){return new this(t).exp()}function Ei(t){return Hn(t=new this(t),t.e+1,3)}function Ni(){var t,e,r=new this(0);for(Sn=!1,t=0;t<arguments.length;)if((e=new this(arguments[t++])).d)r.d&&(r=r.plus(e.times(e)));else {if(e.s)return Sn=!0,new this(1/0);r=e;}return Sn=!0,r.sqrt()}function Si(t){return t instanceof Gi||t&&"[object Decimal]"===t.name||!1}function Ti(t){return new this(t).ln()}function Oi(t,e){return new this(t).log(e)}function zi(t){return new this(t).log(2)}function Ai(t){return new this(t).log(10)}function Ci(){return Jn(this,arguments,"lt")}function Ri(){return Jn(this,arguments,"gt")}function Di(t,e){return new this(t).mod(e)}function ki(t,e){return new this(t).mul(e)}function Ii(t,e){return new this(t).pow(e)}function Li(t){var e,r,n,i,s=0,a=new this(1),o=[];if(void 0===t?t=this.precision:Pn(t,1,1e9),n=Math.ceil(t/7),this.crypto)if(crypto.getRandomValues)for(e=crypto.getRandomValues(new Uint32Array(n));s<n;)(i=e[s])>=429e7?e[s]=crypto.getRandomValues(new Uint32Array(1))[0]:o[s++]=i%1e7;else {if(!crypto.randomBytes)throw Error("[DecimalError] crypto unavailable");for(e=crypto.randomBytes(n*=4);s<n;)(i=e[s]+(e[s+1]<<8)+(e[s+2]<<16)+((127&e[s+3])<<24))>=214e7?crypto.randomBytes(4).copy(e,s):(o.push(i%1e7),s+=4);s=n/4;}else for(;s<n;)o[s++]=1e7*Math.random()|0;for(t%=7,(n=o[--s])&&t&&(i=zn(10,7-t),o[s]=(n/i|0)*i);0===o[s];s--)o.pop();if(s<0)r=0,o=[0];else {for(r=-1;0===o[0];r-=7)o.shift();for(n=1,i=o[0];i>=10;i/=10)n++;n<7&&(r-=7-n);}return a.e=r,a.d=o,a}function Bi(t){return Hn(t=new this(t),t.e+1,this.rounding)}function Fi(t){return (t=new this(t)).d?t.d[0]?t.s:0*t.s:t.s||NaN}function Pi(t){return new this(t).sin()}function Ui(t){return new this(t).sinh()}function ji(t){return new this(t).sqrt()}function qi(t,e){return new this(t).sub(e)}function Hi(t){return new this(t).tan()}function Vi(t){return new this(t).tanh()}function $i(t){return Hn(t=new this(t),t.e+1,1)}Bn[Symbol.for("nodejs.util.inspect.custom")]=Bn.toString,Bn[Symbol.toStringTag]="Decimal";var Gi=function t(e){var r,n,i;function s(t){var e,r,n,i=this;if(!(i instanceof s))return new s(t);if(i.constructor=s,t instanceof s)return i.s=t.s,void(Sn?!t.d||t.e>s.maxE?(i.e=NaN,i.d=null):t.e<s.minE?(i.e=0,i.d=[0]):(i.e=t.e,i.d=t.d.slice()):(i.e=t.e,i.d=t.d?t.d.slice():t.d));if("number"===(n=typeof t)){if(0===t)return i.s=1/t<0?-1:1,i.e=0,void(i.d=[0]);if(t<0?(t=-t,i.s=-1):i.s=1,t===~~t&&t<1e7){for(e=0,r=t;r>=10;r/=10)e++;return void(Sn?e>s.maxE?(i.e=NaN,i.d=null):e<s.minE?(i.e=0,i.d=[0]):(i.e=e,i.d=[t]):(i.e=e,i.d=[t]))}return 0*t!=0?(t||(i.s=NaN),i.e=NaN,void(i.d=null)):ri(i,t.toString())}if("string"!==n)throw Error(Tn+t);return 45===(r=t.charCodeAt(0))?(t=t.slice(1),i.s=-1):(43===r&&(t=t.slice(1)),i.s=1),Dn.test(t)?ri(i,t):function(t,e){var r,n,i,s,a,o,u,h,c;if("Infinity"===e||"NaN"===e)return +e||(t.s=NaN),t.e=NaN,t.d=null,t;if(Cn.test(e))r=16,e=e.toLowerCase();else if(An.test(e))r=2;else {if(!Rn.test(e))throw Error(Tn+e);r=8;}for((s=e.search(/p/i))>0?(u=+e.slice(s+1),e=e.substring(2,s)):e=e.slice(2),a=(s=e.indexOf("."))>=0,n=t.constructor,a&&(s=(o=(e=e.replace(".","")).length)-s,i=Xn(n,new n(r),s,2*s)),s=c=(h=jn(e,r,kn)).length-1;0===h[s];--s)h.pop();return s<0?new n(0*t.s):(t.e=$n(h,c),t.d=h,Sn=!1,a&&(t=qn(t,i,4*o)),u&&(t=t.times(Math.abs(u)<54?zn(2,u):Gi.pow(2,u))),Sn=!0,t)}(i,t)}if(s.prototype=Bn,s.ROUND_UP=0,s.ROUND_DOWN=1,s.ROUND_CEIL=2,s.ROUND_FLOOR=3,s.ROUND_HALF_UP=4,s.ROUND_HALF_DOWN=5,s.ROUND_HALF_EVEN=6,s.ROUND_HALF_CEIL=7,s.ROUND_HALF_FLOOR=8,s.EUCLID=9,s.config=s.set=xi,s.clone=t,s.isDecimal=Si,s.abs=ui,s.acos=hi,s.acosh=ci,s.add=li,s.asin=pi,s.asinh=fi,s.atan=di,s.atanh=mi,s.atan2=yi,s.cbrt=gi,s.ceil=vi,s.cos=wi,s.cosh=bi,s.div=_i,s.exp=Mi,s.floor=Ei,s.hypot=Ni,s.ln=Ti,s.log=Oi,s.log10=Ai,s.log2=zi,s.max=Ci,s.min=Ri,s.mod=Di,s.mul=ki,s.pow=Ii,s.random=Li,s.round=Bi,s.sign=Fi,s.sin=Pi,s.sinh=Ui,s.sqrt=ji,s.sub=qi,s.tan=Hi,s.tanh=Vi,s.trunc=$i,void 0===e&&(e={}),e&&!0!==e.defaults)for(i=["precision","rounding","toExpNeg","toExpPos","maxE","minE","modulo","crypto"],r=0;r<i.length;)e.hasOwnProperty(n=i[r++])||(e[n]=this[n]);return s.config(e),s}(Nn);Mn=new Gi(Mn),En=new Gi(En);var Wi,Yi=cn("BigNumber",["?on","config"],(t=>{var{on:e,config:r}=t,n=Gi.clone({precision:r.precision,modulo:9});return n.prototype.type="BigNumber",n.prototype.isBigNumber=!0,n.prototype.toJSON=function(){return {mathjs:"BigNumber",value:this.toString()}},n.fromJSON=function(t){return new n(t.value)},e&&e("config",(function(t,e){t.precision!==e.precision&&n.config({precision:t.precision});})),n}),{isClass:!0}),Zi={exports:{}};
/**
 * @license Complex.js v2.0.13 12/05/2020
 *
 * Copyright (c) 2020, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/
Wi=Zi,function(t){var e=function(t){return .5*(Math.exp(t)+Math.exp(-t))},r=function(t){return .5*(Math.exp(t)-Math.exp(-t))},n=function(){throw SyntaxError("Invalid Param")};function i(t,e){var r=Math.abs(t),n=Math.abs(e);return 0===t?Math.log(n):0===e?Math.log(r):r<3e3&&n<3e3?.5*Math.log(t*t+e*e):Math.log(t/Math.cos(Math.atan2(e,t)))}function s(t,e){if(!(this instanceof s))return new s(t,e);var r=function(t,e){var r={re:0,im:0};if(null==t)r.re=r.im=0;else if(void 0!==e)r.re=t,r.im=e;else switch(typeof t){case"object":if("im"in t&&"re"in t)r.re=t.re,r.im=t.im;else if("abs"in t&&"arg"in t){if(!Number.isFinite(t.abs)&&Number.isFinite(t.arg))return s.INFINITY;r.re=t.abs*Math.cos(t.arg),r.im=t.abs*Math.sin(t.arg);}else if("r"in t&&"phi"in t){if(!Number.isFinite(t.r)&&Number.isFinite(t.phi))return s.INFINITY;r.re=t.r*Math.cos(t.phi),r.im=t.r*Math.sin(t.phi);}else 2===t.length?(r.re=t[0],r.im=t[1]):n();break;case"string":r.im=r.re=0;var i=t.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g),a=1,o=0;null===i&&n();for(var u=0;u<i.length;u++){var h=i[u];" "===h||"\t"===h||"\n"===h||("+"===h?a++:"-"===h?o++:"i"===h||"I"===h?(a+o===0&&n()," "===i[u+1]||isNaN(i[u+1])?r.im+=parseFloat((o%2?"-":"")+"1"):(r.im+=parseFloat((o%2?"-":"")+i[u+1]),u++),a=o=0):((a+o===0||isNaN(h))&&n(),"i"===i[u+1]||"I"===i[u+1]?(r.im+=parseFloat((o%2?"-":"")+h),u++):r.re+=parseFloat((o%2?"-":"")+h),a=o=0));}a+o>0&&n();break;case"number":r.im=0,r.re=t;break;default:n();}return r}(t,e);this.re=r.re,this.im=r.im;}s.prototype={re:0,im:0,sign:function(){var t=this.abs();return new s(this.re/t,this.im/t)},add:function(t,e){var r=new s(t,e);return this.isInfinite()&&r.isInfinite()?s.NAN:this.isInfinite()||r.isInfinite()?s.INFINITY:new s(this.re+r.re,this.im+r.im)},sub:function(t,e){var r=new s(t,e);return this.isInfinite()&&r.isInfinite()?s.NAN:this.isInfinite()||r.isInfinite()?s.INFINITY:new s(this.re-r.re,this.im-r.im)},mul:function(t,e){var r=new s(t,e);return this.isInfinite()&&r.isZero()||this.isZero()&&r.isInfinite()?s.NAN:this.isInfinite()||r.isInfinite()?s.INFINITY:0===r.im&&0===this.im?new s(this.re*r.re,0):new s(this.re*r.re-this.im*r.im,this.re*r.im+this.im*r.re)},div:function(t,e){var r=new s(t,e);if(this.isZero()&&r.isZero()||this.isInfinite()&&r.isInfinite())return s.NAN;if(this.isInfinite()||r.isZero())return s.INFINITY;if(this.isZero()||r.isInfinite())return s.ZERO;t=this.re,e=this.im;var n,i,a=r.re,o=r.im;return 0===o?new s(t/a,e/a):Math.abs(a)<Math.abs(o)?new s((t*(i=a/o)+e)/(n=a*i+o),(e*i-t)/n):new s((t+e*(i=o/a))/(n=o*i+a),(e-t*i)/n)},pow:function(t,e){var r=new s(t,e);if(t=this.re,e=this.im,r.isZero())return s.ONE;if(0===r.im){if(0===e&&t>0)return new s(Math.pow(t,r.re),0);if(0===t)switch((r.re%4+4)%4){case 0:return new s(Math.pow(e,r.re),0);case 1:return new s(0,Math.pow(e,r.re));case 2:return new s(-Math.pow(e,r.re),0);case 3:return new s(0,-Math.pow(e,r.re))}}if(0===t&&0===e&&r.re>0&&r.im>=0)return s.ZERO;var n=Math.atan2(e,t),a=i(t,e);return t=Math.exp(r.re*a-r.im*n),e=r.im*a+r.re*n,new s(t*Math.cos(e),t*Math.sin(e))},sqrt:function(){var t,e,r=this.re,n=this.im,i=this.abs();if(r>=0){if(0===n)return new s(Math.sqrt(r),0);t=.5*Math.sqrt(2*(i+r));}else t=Math.abs(n)/Math.sqrt(2*(i-r));return e=r<=0?.5*Math.sqrt(2*(i-r)):Math.abs(n)/Math.sqrt(2*(i+r)),new s(t,n<0?-e:e)},exp:function(){var t=Math.exp(this.re);return this.im,new s(t*Math.cos(this.im),t*Math.sin(this.im))},expm1:function(){var t=this.re,e=this.im;return new s(Math.expm1(t)*Math.cos(e)+function(t){var e=Math.PI/4;if(t<-e||t>e)return Math.cos(t)-1;var r=t*t;return r*(r*(1/24+r*(-1/720+r*(1/40320+r*(-1/3628800+r*(1/4790014600+r*(-1/87178291200+r*(1/20922789888e3)))))))-.5)}(e),Math.exp(t)*Math.sin(e))},log:function(){var t=this.re,e=this.im;return new s(i(t,e),Math.atan2(e,t))},abs:function(){return t=this.re,e=this.im,r=Math.abs(t),n=Math.abs(e),r<3e3&&n<3e3?Math.sqrt(r*r+n*n):(r<n?(r=n,n=t/e):n=e/t,r*Math.sqrt(1+n*n));var t,e,r,n;},arg:function(){return Math.atan2(this.im,this.re)},sin:function(){var t=this.re,n=this.im;return new s(Math.sin(t)*e(n),Math.cos(t)*r(n))},cos:function(){var t=this.re,n=this.im;return new s(Math.cos(t)*e(n),-Math.sin(t)*r(n))},tan:function(){var t=2*this.re,n=2*this.im,i=Math.cos(t)+e(n);return new s(Math.sin(t)/i,r(n)/i)},cot:function(){var t=2*this.re,n=2*this.im,i=Math.cos(t)-e(n);return new s(-Math.sin(t)/i,r(n)/i)},sec:function(){var t=this.re,n=this.im,i=.5*e(2*n)+.5*Math.cos(2*t);return new s(Math.cos(t)*e(n)/i,Math.sin(t)*r(n)/i)},csc:function(){var t=this.re,n=this.im,i=.5*e(2*n)-.5*Math.cos(2*t);return new s(Math.sin(t)*e(n)/i,-Math.cos(t)*r(n)/i)},asin:function(){var t=this.re,e=this.im,r=new s(e*e-t*t+1,-2*t*e).sqrt(),n=new s(r.re-e,r.im+t).log();return new s(n.im,-n.re)},acos:function(){var t=this.re,e=this.im,r=new s(e*e-t*t+1,-2*t*e).sqrt(),n=new s(r.re-e,r.im+t).log();return new s(Math.PI/2-n.im,n.re)},atan:function(){var t=this.re,e=this.im;if(0===t){if(1===e)return new s(0,1/0);if(-1===e)return new s(0,-1/0)}var r=t*t+(1-e)*(1-e),n=new s((1-e*e-t*t)/r,-2*t/r).log();return new s(-.5*n.im,.5*n.re)},acot:function(){var t=this.re,e=this.im;if(0===e)return new s(Math.atan2(1,t),0);var r=t*t+e*e;return 0!==r?new s(t/r,-e/r).atan():new s(0!==t?t/0:0,0!==e?-e/0:0).atan()},asec:function(){var t=this.re,e=this.im;if(0===t&&0===e)return new s(0,1/0);var r=t*t+e*e;return 0!==r?new s(t/r,-e/r).acos():new s(0!==t?t/0:0,0!==e?-e/0:0).acos()},acsc:function(){var t=this.re,e=this.im;if(0===t&&0===e)return new s(Math.PI/2,1/0);var r=t*t+e*e;return 0!==r?new s(t/r,-e/r).asin():new s(0!==t?t/0:0,0!==e?-e/0:0).asin()},sinh:function(){var t=this.re,n=this.im;return new s(r(t)*Math.cos(n),e(t)*Math.sin(n))},cosh:function(){var t=this.re,n=this.im;return new s(e(t)*Math.cos(n),r(t)*Math.sin(n))},tanh:function(){var t=2*this.re,n=2*this.im,i=e(t)+Math.cos(n);return new s(r(t)/i,Math.sin(n)/i)},coth:function(){var t=2*this.re,n=2*this.im,i=e(t)-Math.cos(n);return new s(r(t)/i,-Math.sin(n)/i)},csch:function(){var t=this.re,n=this.im,i=Math.cos(2*n)-e(2*t);return new s(-2*r(t)*Math.cos(n)/i,2*e(t)*Math.sin(n)/i)},sech:function(){var t=this.re,n=this.im,i=Math.cos(2*n)+e(2*t);return new s(2*e(t)*Math.cos(n)/i,-2*r(t)*Math.sin(n)/i)},asinh:function(){var t=this.im;this.im=-this.re,this.re=t;var e=this.asin();return this.re=-this.im,this.im=t,t=e.re,e.re=-e.im,e.im=t,e},acosh:function(){var t=this.acos();if(t.im<=0){var e=t.re;t.re=-t.im,t.im=e;}else e=t.im,t.im=-t.re,t.re=e;return t},atanh:function(){var t=this.re,e=this.im,r=t>1&&0===e,n=1-t,a=1+t,o=n*n+e*e,u=0!==o?new s((a*n-e*e)/o,(e*n+a*e)/o):new s(-1!==t?t/0:0,0!==e?e/0:0),h=u.re;return u.re=i(u.re,u.im)/2,u.im=Math.atan2(u.im,h)/2,r&&(u.im=-u.im),u},acoth:function(){var t=this.re,e=this.im;if(0===t&&0===e)return new s(0,Math.PI/2);var r=t*t+e*e;return 0!==r?new s(t/r,-e/r).atanh():new s(0!==t?t/0:0,0!==e?-e/0:0).atanh()},acsch:function(){var t=this.re,e=this.im;if(0===e)return new s(0!==t?Math.log(t+Math.sqrt(t*t+1)):1/0,0);var r=t*t+e*e;return 0!==r?new s(t/r,-e/r).asinh():new s(0!==t?t/0:0,0!==e?-e/0:0).asinh()},asech:function(){var t=this.re,e=this.im;if(this.isZero())return s.INFINITY;var r=t*t+e*e;return 0!==r?new s(t/r,-e/r).acosh():new s(0!==t?t/0:0,0!==e?-e/0:0).acosh()},inverse:function(){if(this.isZero())return s.INFINITY;if(this.isInfinite())return s.ZERO;var t=this.re,e=this.im,r=t*t+e*e;return new s(t/r,-e/r)},conjugate:function(){return new s(this.re,-this.im)},neg:function(){return new s(-this.re,-this.im)},ceil:function(t){return t=Math.pow(10,t||0),new s(Math.ceil(this.re*t)/t,Math.ceil(this.im*t)/t)},floor:function(t){return t=Math.pow(10,t||0),new s(Math.floor(this.re*t)/t,Math.floor(this.im*t)/t)},round:function(t){return t=Math.pow(10,t||0),new s(Math.round(this.re*t)/t,Math.round(this.im*t)/t)},equals:function(t,e){var r=new s(t,e);return Math.abs(r.re-this.re)<=s.EPSILON&&Math.abs(r.im-this.im)<=s.EPSILON},clone:function(){return new s(this.re,this.im)},toString:function(){var t=this.re,e=this.im,r="";return this.isNaN()?"NaN":this.isInfinite()?"Infinity":(Math.abs(t)<s.EPSILON&&(t=0),Math.abs(e)<s.EPSILON&&(e=0),0===e?r+t:(0!==t?(r+=t,r+=" ",e<0?(e=-e,r+="-"):r+="+",r+=" "):e<0&&(e=-e,r+="-"),1!==e&&(r+=e),r+"i"))},toVector:function(){return [this.re,this.im]},valueOf:function(){return 0===this.im?this.re:null},isNaN:function(){return isNaN(this.re)||isNaN(this.im)},isZero:function(){return 0===this.im&&0===this.re},isFinite:function(){return isFinite(this.re)&&isFinite(this.im)},isInfinite:function(){return !(this.isNaN()||this.isFinite())}},s.ZERO=new s(0,0),s.ONE=new s(1,0),s.I=new s(0,1),s.PI=new s(Math.PI,0),s.E=new s(Math.E,0),s.INFINITY=new s(1/0,1/0),s.NAN=new s(NaN,NaN),s.EPSILON=1e-15,Object.defineProperty(s,"__esModule",{value:!0}),s.default=s,s.Complex=s,Wi.exports=s;}();var Xi=Tr(Zi.exports),Qi=cn("Complex",[],(()=>(Xi.prototype.type="Complex",Xi.prototype.isComplex=!0,Xi.prototype.toJSON=function(){return {mathjs:"Complex",re:this.re,im:this.im}},Xi.prototype.toPolar=function(){return {r:this.abs(),phi:this.arg()}},Xi.prototype.format=function(t){var e=this.im,r=this.re,n=Rr(this.re,t),i=Rr(this.im,t),s=Te(t)?t:t?t.precision:null;if(null!==s){var a=Math.pow(10,-s);Math.abs(r/e)<a&&(r=0),Math.abs(e/r)<a&&(e=0);}return 0===e?n:0===r?1===e?"i":-1===e?"-i":i+"i":e<0?-1===e?n+" - i":n+" - "+i.substring(1)+"i":1===e?n+" + i":n+" + "+i+"i"},Xi.fromPolar=function(t){switch(arguments.length){case 1:var e=arguments[0];if("object"==typeof e)return Xi(e);throw new TypeError("Input has to be an object with r and phi keys.");case 2:var r=arguments[0],n=arguments[1];if(Te(r)){if(Ce(n)&&n.hasBase("ANGLE")&&(n=n.toNumber("rad")),Te(n))return new Xi({r:r,phi:n});throw new TypeError("Phi is not a number nor an angle unit.")}throw new TypeError("Radius r is not a number.");default:throw new SyntaxError("Wrong number of arguments in function fromPolar")}},Xi.prototype.valueOf=Xi.prototype.toString,Xi.fromJSON=function(t){return new Xi(t)},Xi.compare=function(t,e){return t.re>e.re?1:t.re<e.re?-1:t.im>e.im?1:t.im<e.im?-1:0},Xi)),{isClass:!0}),Ji={exports:{}};
/**
 * @license Fraction.js v4.1.0 13/05/2021
 * https://www.xarg.org/2014/03/rational-numbers-in-javascript/
 *
 * Copyright (c) 2021, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/
!function(t,e){!function(e){var r={s:1,n:0,d:1};function n(t){function e(){var e=Error.apply(this,arguments);e.name=this.name=t,this.stack=e.stack,this.message=e.message;}function r(){}return r.prototype=Error.prototype,e.prototype=new r,e}var i=l.DivisionByZero=n("DivisionByZero"),s=l.InvalidParameter=n("InvalidParameter");function a(t,e){return isNaN(t=parseInt(t,10))&&o(),t*e}function o(){throw new s}function u(t){for(var e={},r=t,n=2,i=4;i<=r;){for(;r%n==0;)r/=n,e[n]=(e[n]||0)+1;i+=1+2*n++;}return r!==t?r>1&&(e[r]=(e[r]||0)+1):e[t]=(e[t]||0)+1,e}var h=function(t,e){var n,s=0,u=1,h=1,c=0,l=0,p=0,f=1,d=1,m=0,y=1,g=1,v=1,x=1e7;if(null==t);else if(void 0!==e)h=(s=t)*(u=e);else switch(typeof t){case"object":"d"in t&&"n"in t?(s=t.n,u=t.d,"s"in t&&(s*=t.s)):0 in t?(s=t[0],1 in t&&(u=t[1])):o(),h=s*u;break;case"number":if(t<0&&(h=t,t=-t),t%1==0)s=t;else if(t>0){for(t>=1&&(t/=d=Math.pow(10,Math.floor(1+Math.log(t)/Math.LN10)));y<=x&&v<=x;){if(t===(n=(m+g)/(y+v))){y+v<=x?(s=m+g,u=y+v):v>y?(s=g,u=v):(s=m,u=y);break}t>n?(m+=g,y+=v):(g+=m,v+=y),y>x?(s=g,u=v):(s=m,u=y);}s*=d;}else (isNaN(t)||isNaN(e))&&(u=s=NaN);break;case"string":if(null===(y=t.match(/\d+|./g))&&o(),"-"===y[m]?(h=-1,m++):"+"===y[m]&&m++,y.length===m+1?l=a(y[m++],h):"."===y[m+1]||"."===y[m]?("."!==y[m]&&(c=a(y[m++],h)),(++m+1===y.length||"("===y[m+1]&&")"===y[m+3]||"'"===y[m+1]&&"'"===y[m+3])&&(l=a(y[m],h),f=Math.pow(10,y[m].length),m++),("("===y[m]&&")"===y[m+2]||"'"===y[m]&&"'"===y[m+2])&&(p=a(y[m+1],h),d=Math.pow(10,y[m+1].length)-1,m+=3)):"/"===y[m+1]||":"===y[m+1]?(l=a(y[m],h),f=a(y[m+2],1),m+=3):"/"===y[m+3]&&" "===y[m+1]&&(c=a(y[m],h),l=a(y[m+2],h),f=a(y[m+4],1),m+=5),y.length<=m){h=s=p+(u=f*d)*c+d*l;break}default:o();}if(0===u)throw new i;r.s=h<0?-1:1,r.n=Math.abs(s),r.d=Math.abs(u);};function c(t,e){if(!t)return e;if(!e)return t;for(;;){if(!(t%=e))return e;if(!(e%=t))return t}}function l(t,e){if(!(this instanceof l))return new l(t,e);h(t,e),t=l.REDUCE?c(r.d,r.n):1,this.s=r.s,this.n=r.n/t,this.d=r.d/t;}l.REDUCE=1,l.prototype={s:1,n:0,d:1,abs:function(){return new l(this.n,this.d)},neg:function(){return new l(-this.s*this.n,this.d)},add:function(t,e){return h(t,e),new l(this.s*this.n*r.d+r.s*this.d*r.n,this.d*r.d)},sub:function(t,e){return h(t,e),new l(this.s*this.n*r.d-r.s*this.d*r.n,this.d*r.d)},mul:function(t,e){return h(t,e),new l(this.s*r.s*this.n*r.n,this.d*r.d)},div:function(t,e){return h(t,e),new l(this.s*r.s*this.n*r.d,this.d*r.n)},clone:function(){return new l(this)},mod:function(t,e){return isNaN(this.n)||isNaN(this.d)?new l(NaN):void 0===t?new l(this.s*this.n%this.d,1):(h(t,e),0===r.n&&0===this.d&&l(0,0),new l(this.s*(r.d*this.n)%(r.n*this.d),r.d*this.d))},gcd:function(t,e){return h(t,e),new l(c(r.n,this.n)*c(r.d,this.d),r.d*this.d)},lcm:function(t,e){return h(t,e),0===r.n&&0===this.n?new l:new l(r.n*this.n,c(r.n,this.n)*c(r.d,this.d))},ceil:function(t){return t=Math.pow(10,t||0),isNaN(this.n)||isNaN(this.d)?new l(NaN):new l(Math.ceil(t*this.s*this.n/this.d),t)},floor:function(t){return t=Math.pow(10,t||0),isNaN(this.n)||isNaN(this.d)?new l(NaN):new l(Math.floor(t*this.s*this.n/this.d),t)},round:function(t){return t=Math.pow(10,t||0),isNaN(this.n)||isNaN(this.d)?new l(NaN):new l(Math.round(t*this.s*this.n/this.d),t)},inverse:function(){return new l(this.s*this.d,this.n)},pow:function(t,e){if(h(t,e),1===r.d)return r.s<0?new l(Math.pow(this.s*this.d,r.n),Math.pow(this.n,r.n)):new l(Math.pow(this.s*this.n,r.n),Math.pow(this.d,r.n));if(this.s<0)return null;var n=u(this.n),i=u(this.d),s=this.s,a=1;for(var o in n)if("1"!==o){if("0"===o){s=0;break}if(n[o]*=r.n,n[o]%r.d!=0)return null;n[o]/=r.d,s*=Math.pow(o,n[o]);}for(var o in i)if("1"!==o){if(i[o]*=r.n,i[o]%r.d!=0)return null;i[o]/=r.d,a*=Math.pow(o,i[o]);}return r.s<0?new l(a,s):new l(s,a)},equals:function(t,e){return h(t,e),this.s*this.n*r.d==r.s*r.n*this.d},compare:function(t,e){h(t,e);var n=this.s*this.n*r.d-r.s*r.n*this.d;return (0<n)-(n<0)},simplify:function(t){if(isNaN(this.n)||isNaN(this.d))return this;var e=this.abs().toContinued();function r(t){return 1===t.length?new l(t[0]):r(t.slice(1)).inverse().add(t[0])}t=t||.001;for(var n=0;n<e.length;n++){var i=r(e.slice(0,n+1));if(i.sub(this.abs()).abs().valueOf()<t)return i.mul(this.s)}return this},divisible:function(t,e){return h(t,e),!(!(r.n*this.d)||this.n*r.d%(r.n*this.d))},valueOf:function(){return this.s*this.n/this.d},toFraction:function(t){var e,r="",n=this.n,i=this.d;return this.s<0&&(r+="-"),1===i?r+=n:(t&&(e=Math.floor(n/i))>0&&(r+=e,r+=" ",n%=i),r+=n,r+="/",r+=i),r},toLatex:function(t){var e,r="",n=this.n,i=this.d;return this.s<0&&(r+="-"),1===i?r+=n:(t&&(e=Math.floor(n/i))>0&&(r+=e,n%=i),r+="\\frac{",r+=n,r+="}{",r+=i,r+="}"),r},toContinued:function(){var t,e=this.n,r=this.d,n=[];if(isNaN(e)||isNaN(r))return n;do{n.push(Math.floor(e/r)),t=e%r,e=r,r=t;}while(1!==e);return n},toString:function(t){var e,r=this.n,n=this.d;if(isNaN(r)||isNaN(n))return "NaN";l.REDUCE||(r/=e=c(r,n),n/=e),t=t||15;var i=function(t,e){for(;e%2==0;e/=2);for(;e%5==0;e/=5);if(1===e)return 0;for(var r=10%e,n=1;1!==r;n++)if(r=10*r%e,n>2e3)return 0;return n}(0,n),s=function(t,e,r){for(var n=1,i=function(t,e,r){for(var n=1;e>0;t=t*t%r,e>>=1)1&e&&(n=n*t%r);return n}(10,r,e),s=0;s<300;s++){if(n===i)return s;n=10*n%e,i=10*i%e;}return 0}(0,n,i),a=-1===this.s?"-":"";if(a+=r/n|0,r%=n,(r*=10)&&(a+="."),i){for(var o=s;o--;)a+=r/n|0,r%=n,r*=10;a+="(";for(o=i;o--;)a+=r/n|0,r%=n,r*=10;a+=")";}else for(o=t;r&&o--;)a+=r/n|0,r%=n,r*=10;return a}},Object.defineProperty(l,"__esModule",{value:!0}),l.default=l,l.Fraction=l,t.exports=l;}();}(Ji);var Ki=Tr(Ji.exports),ts=cn("Fraction",[],(()=>(Ki.prototype.type="Fraction",Ki.prototype.isFraction=!0,Ki.prototype.toJSON=function(){return {mathjs:"Fraction",n:this.s*this.n,d:this.d}},Ki.fromJSON=function(t){return new Ki(t)},Ki)),{isClass:!0}),es=cn("Range",[],(()=>{function t(e,r,n){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");var i=null!=e,s=null!=r,a=null!=n;if(i)if(Oe(e))e=e.toNumber();else if("number"!=typeof e)throw new TypeError("Parameter start must be a number");if(s)if(Oe(r))r=r.toNumber();else if("number"!=typeof r)throw new TypeError("Parameter end must be a number");if(a)if(Oe(n))n=n.toNumber();else if("number"!=typeof n)throw new TypeError("Parameter step must be a number");this.start=i?parseFloat(e):0,this.end=s?parseFloat(r):0,this.step=a?parseFloat(n):1;}return t.prototype.type="Range",t.prototype.isRange=!0,t.parse=function(e){if("string"!=typeof e)return null;var r=e.split(":").map((function(t){return parseFloat(t)}));if(r.some((function(t){return isNaN(t)})))return null;switch(r.length){case 2:return new t(r[0],r[1]);case 3:return new t(r[0],r[2],r[1]);default:return null}},t.prototype.clone=function(){return new t(this.start,this.end,this.step)},t.prototype.size=function(){var t=0,e=this.start,r=this.step,n=this.end-e;return Cr(r)===Cr(n)?t=Math.ceil(n/r):0===n&&(t=0),isNaN(t)&&(t=0),[t]},t.prototype.min=function(){var t=this.size()[0];return t>0?this.step>0?this.start:this.start+(t-1)*this.step:void 0},t.prototype.max=function(){var t=this.size()[0];return t>0?this.step>0?this.start+(t-1)*this.step:this.start:void 0},t.prototype.forEach=function(t){var e=this.start,r=this.step,n=this.end,i=0;if(r>0)for(;e<n;)t(e,[i],this),e+=r,i++;else if(r<0)for(;e>n;)t(e,[i],this),e+=r,i++;},t.prototype.map=function(t){var e=[];return this.forEach((function(r,n,i){e[n[0]]=t(r,n,i);})),e},t.prototype.toArray=function(){var t=[];return this.forEach((function(e,r){t[r[0]]=e;})),t},t.prototype.valueOf=function(){return this.toArray()},t.prototype.format=function(t){var e=Rr(this.start,t);return 1!==this.step&&(e+=":"+Rr(this.step,t)),e+=":"+Rr(this.end,t)},t.prototype.toString=function(){return this.format()},t.prototype.toJSON=function(){return {mathjs:"Range",start:this.start,end:this.end,step:this.step}},t.fromJSON=function(e){return new t(e.start,e.end,e.step)},t}),{isClass:!0}),rs=cn("Matrix",[],(()=>{function t(){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator")}return t.prototype.type="Matrix",t.prototype.isMatrix=!0,t.prototype.storage=function(){throw new Error("Cannot invoke storage on a Matrix interface")},t.prototype.datatype=function(){throw new Error("Cannot invoke datatype on a Matrix interface")},t.prototype.create=function(t,e){throw new Error("Cannot invoke create on a Matrix interface")},t.prototype.subset=function(t,e,r){throw new Error("Cannot invoke subset on a Matrix interface")},t.prototype.get=function(t){throw new Error("Cannot invoke get on a Matrix interface")},t.prototype.set=function(t,e,r){throw new Error("Cannot invoke set on a Matrix interface")},t.prototype.resize=function(t,e){throw new Error("Cannot invoke resize on a Matrix interface")},t.prototype.reshape=function(t,e){throw new Error("Cannot invoke reshape on a Matrix interface")},t.prototype.clone=function(){throw new Error("Cannot invoke clone on a Matrix interface")},t.prototype.size=function(){throw new Error("Cannot invoke size on a Matrix interface")},t.prototype.map=function(t,e){throw new Error("Cannot invoke map on a Matrix interface")},t.prototype.forEach=function(t){throw new Error("Cannot invoke forEach on a Matrix interface")},t.prototype.toArray=function(){throw new Error("Cannot invoke toArray on a Matrix interface")},t.prototype.valueOf=function(){throw new Error("Cannot invoke valueOf on a Matrix interface")},t.prototype.format=function(t){throw new Error("Cannot invoke format on a Matrix interface")},t.prototype.toString=function(){throw new Error("Cannot invoke toString on a Matrix interface")},t}),{isClass:!0}),ns=cn("DenseMatrix",["Matrix"],(t=>{var{Matrix:e}=t;function r(t,e){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");if(e&&!Re(e))throw new Error("Invalid datatype: "+e);if(ke(t))"DenseMatrix"===t.type?(this._data=pr(t._data),this._size=pr(t._size),this._datatype=e||t._datatype):(this._data=t.toArray(),this._size=t.size(),this._datatype=e||t._datatype);else if(t&&De(t.data)&&De(t.size))this._data=t.data,this._size=t.size,Qr(this._data,this._size),this._datatype=e||t.datatype;else if(De(t))this._data=h(t),this._size=Zr(this._data),Qr(this._data,this._size),this._datatype=e;else {if(t)throw new TypeError("Unsupported type of data ("+lr(t)+")");this._data=[],this._size=[0],this._datatype=e;}}function n(t,e){if(!Pe(e))throw new TypeError("Invalid index");if(e.isScalar())return t.get(e.min());var n=e.size();if(n.length!==t._size.length)throw new Wr(n.length,t._size.length);for(var s=e.min(),a=e.max(),o=0,u=t._size.length;o<u;o++)Jr(s[o],t._size[o]),Jr(a[o],t._size[o]);return new r(i(t._data,e,n.length,0),t._datatype)}function i(t,e,r,n){var s=n===r-1,a=e.dimension(n);return s?a.map((function(e){return Jr(e,t.length),t[e]})).valueOf():a.map((function(s){return Jr(s,t.length),i(t[s],e,r,n+1)})).valueOf()}function s(t,e,r,n){if(!e||!0!==e.isIndex)throw new TypeError("Invalid index");var i,s=e.size(),o=e.isScalar();if(ke(r)?(i=r.size(),r=r.valueOf()):i=Zr(r),o){if(0!==i.length)throw new TypeError("Scalar expected");t.set(e.min(),r,n);}else {if(s.length<t._size.length)throw new Wr(s.length,t._size.length,"<");if(i.length<s.length){for(var h=0,c=0;1===s[h]&&1===i[h];)h++;for(;1===s[h];)c++,h++;r=rn(r,s.length,c,i);}if(!yr(s,i))throw new Wr(s,i,">");u(t,e.max().map((function(t){return t+1})),n);var l=s.length;a(t._data,e,r,l,0);}return t}function a(t,e,r,n,i){var s=i===n-1,o=e.dimension(i);s?o.forEach((function(e,n){Jr(e),t[e]=r[n[0]];})):o.forEach((function(s,o){Jr(s),a(t[s],e,r[o[0]],n,i+1);}));}function o(t,e,r){if(0===e.length){for(var n=t._data;De(n);)n=n[0];return n}return t._size=e.slice(0),t._data=Kr(t._data,t._size,r),t}function u(t,e,r){for(var n=t._size.slice(0),i=!1;n.length<e.length;)n.push(0),i=!0;for(var s=0,a=e.length;s<a;s++)e[s]>n[s]&&(n[s]=e[s],i=!0);i&&o(t,n,r);}function h(t){for(var e=0,r=t.length;e<r;e++){var n=t[e];De(n)?t[e]=h(n):n&&!0===n.isMatrix&&(t[e]=h(n.valueOf()));}return t}return r.prototype=new e,r.prototype.createDenseMatrix=function(t,e){return new r(t,e)},r.prototype.type="DenseMatrix",r.prototype.isDenseMatrix=!0,r.prototype.getDataType=function(){return un(this._data,lr)},r.prototype.storage=function(){return "dense"},r.prototype.datatype=function(){return this._datatype},r.prototype.create=function(t,e){return new r(t,e)},r.prototype.subset=function(t,e,r){switch(arguments.length){case 1:return n(this,t);case 2:case 3:return s(this,t,e,r);default:throw new SyntaxError("Wrong number of arguments")}},r.prototype.get=function(t){if(!De(t))throw new TypeError("Array expected");if(t.length!==this._size.length)throw new Wr(t.length,this._size.length);for(var e=0;e<t.length;e++)Jr(t[e],this._size[e]);for(var r=this._data,n=0,i=t.length;n<i;n++){var s=t[n];Jr(s,r.length),r=r[s];}return r},r.prototype.set=function(t,e,r){if(!De(t))throw new TypeError("Array expected");if(t.length<this._size.length)throw new Wr(t.length,this._size.length,"<");var n,i,s;u(this,t.map((function(t){return t+1})),r);var a=this._data;for(n=0,i=t.length-1;n<i;n++)Jr(s=t[n],a.length),a=a[s];return Jr(s=t[t.length-1],a.length),a[s]=e,this},r.prototype.resize=function(t,e,r){if(!Ie(t))throw new TypeError("Array or Matrix expected");var n=t.valueOf().map((t=>Array.isArray(t)&&1===t.length?t[0]:t));return o(r?this.clone():this,n,e)},r.prototype.reshape=function(t,e){var r=e?this.clone():this;return r._data=en(r._data,t),r._size=t.slice(0),r},r.prototype.clone=function(){return new r({data:pr(this._data),size:pr(this._size),datatype:this._datatype})},r.prototype.size=function(){return this._size.slice(0)},r.prototype.map=function(t){var e=this,n=function r(n,i){return De(n)?n.map((function(t,e){return r(t,i.concat(e))})):t(n,i,e)}(this._data,[]);return new r(n,void 0!==this._datatype?un(n,lr):void 0)},r.prototype.forEach=function(t){var e=this;!function r(n,i){De(n)?n.forEach((function(t,e){r(t,i.concat(e));})):t(n,i,e);}(this._data,[]);},r.prototype.toArray=function(){return pr(this._data)},r.prototype.valueOf=function(){return this._data},r.prototype.format=function(t){return Hr(this._data,t)},r.prototype.toString=function(){return Hr(this._data)},r.prototype.toJSON=function(){return {mathjs:"DenseMatrix",data:this._data,size:this._size,datatype:this._datatype}},r.prototype.diagonal=function(t){if(t){if(Oe(t)&&(t=t.toNumber()),!Te(t)||!Ar(t))throw new TypeError("The parameter k must be an integer number")}else t=0;for(var e=t>0?t:0,n=t<0?-t:0,i=this._size[0],s=this._size[1],a=Math.min(i-n,s-e),o=[],u=0;u<a;u++)o[u]=this._data[u+n][u+e];return new r({data:o,size:[a],datatype:this._datatype})},r.diagonal=function(t,e,n,i){if(!De(t))throw new TypeError("Array expected, size parameter");if(2!==t.length)throw new Error("Only two dimensions matrix are supported");if(t=t.map((function(t){if(Oe(t)&&(t=t.toNumber()),!Te(t)||!Ar(t)||t<1)throw new Error("Size values must be positive integers");return t})),n){if(Oe(n)&&(n=n.toNumber()),!Te(n)||!Ar(n))throw new TypeError("The parameter k must be an integer number")}else n=0;var s,a=n>0?n:0,o=n<0?-n:0,u=t[0],h=t[1],c=Math.min(u-o,h-a);if(De(e)){if(e.length!==c)throw new Error("Invalid value array length");s=function(t){return e[t]};}else if(ke(e)){var l=e.size();if(1!==l.length||l[0]!==c)throw new Error("Invalid matrix length");s=function(t){return e.get([t])};}else s=function(){return e};i||(i=Oe(s(0))?s(0).mul(0):0);var p=[];if(t.length>0){p=Kr(p,t,i);for(var f=0;f<c;f++)p[f+o][f+a]=s(f);}return new r({data:p,size:[u,h]})},r.fromJSON=function(t){return new r(t)},r.prototype.swapRows=function(t,e){if(!(Te(t)&&Ar(t)&&Te(e)&&Ar(e)))throw new Error("Row index must be positive integers");if(2!==this._size.length)throw new Error("Only two dimensional matrix is supported");return Jr(t,this._size[0]),Jr(e,this._size[0]),r._swapRows(t,e,this._data),this},r._swapRows=function(t,e,r){var n=r[t];r[t]=r[e],r[e]=n;},r}),{isClass:!0});function is(t,e,r){return t&&"function"==typeof t.map?t.map((function(t){return is(t,e)})):e(t)}var ss="number",as="number, number";function os(t){return Math.abs(t)}function us(t,e){return t+e}function hs(t,e){return t*e}function cs(t){return -t}function ls(t){return Math.ceil(t)}function ps(t,e){if(e>0)return t-e*Math.floor(t/e);if(0===e)return t;throw new Error("Cannot calculate mod for a negative divisor")}function fs(t,e){return t*t<1&&e===1/0||t*t>1&&e===-1/0?0:Math.pow(t,e)}function ds(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return parseFloat(kr(t,e))}os.signature=ss,us.signature=as,hs.signature=as,cs.signature=ss,ls.signature=ss,ps.signature=as,fs.signature=as,ds.signature=as;var ms=cn("isNumeric",["typed"],(t=>{var{typed:e}=t;return e("isNumeric",{"number | BigNumber | Fraction | boolean":function(){return !0},"Complex | Unit | string | null | undefined | Node":function(){return !1},"Array | Matrix":function(t){return is(t,this)}})}));function ys(t,e,r){if(null==r)return t.eq(e);if(t.eq(e))return !0;if(t.isNaN()||e.isNaN())return !1;if(t.isFinite()&&e.isFinite()){var n=t.minus(e).abs();if(n.isZero())return !0;var i=t.constructor.max(t.abs(),e.abs());return n.lte(i.times(r))}return !1}var gs="equalScalar",vs=cn(gs,["typed","config"],(t=>{var{typed:e,config:r}=t;return e(gs,{"boolean, boolean":function(t,e){return t===e},"number, number":function(t,e){return Pr(t,e,r.epsilon)},"BigNumber, BigNumber":function(t,e){return t.eq(e)||ys(t,e,r.epsilon)},"Fraction, Fraction":function(t,e){return t.equals(e)},"Complex, Complex":function(t,e){return function(t,e,r){return Pr(t.re,e.re,r)&&Pr(t.im,e.im,r)}(t,e,r.epsilon)},"Unit, Unit":function(t,e){if(!t.equalBase(e))throw new Error("Cannot compare units with different base");return this(t.value,e.value)}})}));cn(gs,["typed","config"],(t=>{var{typed:e,config:r}=t;return e(gs,{"number, number":function(t,e){return Pr(t,e,r.epsilon)}})}));var xs=cn("SparseMatrix",["typed","equalScalar","Matrix"],(t=>{var{typed:e,equalScalar:r,Matrix:n}=t;function i(t,e){if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator");if(e&&!Re(e))throw new Error("Invalid datatype: "+e);if(ke(t))!function(t,e,r){"SparseMatrix"===e.type?(t._values=e._values?pr(e._values):void 0,t._index=pr(e._index),t._ptr=pr(e._ptr),t._size=pr(e._size),t._datatype=r||e._datatype):s(t,e.valueOf(),r||e._datatype);}(this,t,e);else if(t&&De(t.index)&&De(t.ptr)&&De(t.size))this._values=t.values,this._index=t.index,this._ptr=t.ptr,this._size=t.size,this._datatype=e||t.datatype;else if(De(t))s(this,t,e);else {if(t)throw new TypeError("Unsupported type of data ("+lr(t)+")");this._values=[],this._index=[],this._ptr=[0],this._size=[0,0],this._datatype=e;}}function s(t,n,i){t._values=[],t._index=[],t._ptr=[],t._datatype=i;var s=n.length,a=0,o=r,u=0;if(Re(i)&&(o=e.find(r,[i,i])||r,u=e.convert(0,i)),s>0){var h=0;do{t._ptr.push(t._index.length);for(var c=0;c<s;c++){var l=n[c];if(De(l)){if(0===h&&a<l.length&&(a=l.length),h<l.length){var p=l[h];o(p,u)||(t._values.push(p),t._index.push(c));}}else 0===h&&a<1&&(a=1),o(l,u)||(t._values.push(l),t._index.push(c));}h++;}while(h<a)}t._ptr.push(t._index.length),t._size=[s,a];}function a(t,e){if(!Pe(e))throw new TypeError("Invalid index");if(e.isScalar())return t.get(e.min());var r,n,s,a,o=e.size();if(o.length!==t._size.length)throw new Wr(o.length,t._size.length);var u=e.min(),h=e.max();for(r=0,n=t._size.length;r<n;r++)Jr(u[r],t._size[r]),Jr(h[r],t._size[r]);var c=t._values,l=t._index,p=t._ptr,f=e.dimension(0),d=e.dimension(1),m=[],y=[];f.forEach((function(t,e){y[t]=e[0],m[t]=!0;}));var g=c?[]:void 0,v=[],x=[];return d.forEach((function(t){for(x.push(v.length),s=p[t],a=p[t+1];s<a;s++)r=l[s],!0===m[r]&&(v.push(y[r]),g&&g.push(c[s]));})),x.push(v.length),new i({values:g,index:v,ptr:x,size:o,datatype:t._datatype})}function o(t,e,r,n){if(!e||!0!==e.isIndex)throw new TypeError("Invalid index");var i,s=e.size(),a=e.isScalar();if(ke(r)?(i=r.size(),r=r.toArray()):i=Zr(r),a){if(0!==i.length)throw new TypeError("Scalar expected");t.set(e.min(),r,n);}else {if(1!==s.length&&2!==s.length)throw new Wr(s.length,t._size.length,"<");if(i.length<s.length){for(var o=0,u=0;1===s[o]&&1===i[o];)o++;for(;1===s[o];)u++,o++;r=rn(r,s.length,u,i);}if(!yr(s,i))throw new Wr(s,i,">");for(var h=e.min()[0],c=e.min()[1],l=i[0],p=i[1],f=0;f<l;f++)for(var d=0;d<p;d++){var m=r[f][d];t.set([f+h,d+c],m,n);}}return t}function u(t,e,r,n){if(r-e==0)return r;for(var i=e;i<r;i++)if(n[i]===t)return i;return e}function h(t,e,r,n,i,s,a){i.splice(t,0,n),s.splice(t,0,e);for(var o=r+1;o<a.length;o++)a[o]++;}function c(t,n,i,s){var a=s||0,o=r,u=0;Re(t._datatype)&&(o=e.find(r,[t._datatype,t._datatype])||r,u=e.convert(0,t._datatype),a=e.convert(a,t._datatype));var h,c,l,p=!o(a,u),f=t._size[0],d=t._size[1];if(i>d){for(c=d;c<i;c++)if(t._ptr[c]=t._values.length,p)for(h=0;h<f;h++)t._values.push(a),t._index.push(h);t._ptr[i]=t._values.length;}else i<d&&(t._ptr.splice(i+1,d-i),t._values.splice(t._ptr[i],t._values.length),t._index.splice(t._ptr[i],t._index.length));if(d=i,n>f){if(p){var m=0;for(c=0;c<d;c++){t._ptr[c]=t._ptr[c]+m,l=t._ptr[c+1]+m;var y=0;for(h=f;h<n;h++,y++)t._values.splice(l+y,0,a),t._index.splice(l+y,0,h),m++;}t._ptr[d]=t._values.length;}}else if(n<f){var g=0;for(c=0;c<d;c++){t._ptr[c]=t._ptr[c]-g;var v=t._ptr[c],x=t._ptr[c+1]-g;for(l=v;l<x;l++)(h=t._index[l])>n-1&&(t._values.splice(l,1),t._index.splice(l,1),g++);}t._ptr[c]=t._values.length;}return t._size[0]=n,t._size[1]=i,t}function l(t,e,r,n,i){var s,a,o=n[0],u=n[1],h=[];for(s=0;s<o;s++)for(h[s]=[],a=0;a<u;a++)h[s][a]=0;for(a=0;a<u;a++)for(var c=r[a],l=r[a+1],p=c;p<l;p++)h[s=e[p]][a]=t?i?pr(t[p]):t[p]:1;return h}return i.prototype=new n,i.prototype.createSparseMatrix=function(t,e){return new i(t,e)},i.prototype.type="SparseMatrix",i.prototype.isSparseMatrix=!0,i.prototype.getDataType=function(){return un(this._values,lr)},i.prototype.storage=function(){return "sparse"},i.prototype.datatype=function(){return this._datatype},i.prototype.create=function(t,e){return new i(t,e)},i.prototype.density=function(){var t=this._size[0],e=this._size[1];return 0!==t&&0!==e?this._index.length/(t*e):0},i.prototype.subset=function(t,e,r){if(!this._values)throw new Error("Cannot invoke subset on a Pattern only matrix");switch(arguments.length){case 1:return a(this,t);case 2:case 3:return o(this,t,e,r);default:throw new SyntaxError("Wrong number of arguments")}},i.prototype.get=function(t){if(!De(t))throw new TypeError("Array expected");if(t.length!==this._size.length)throw new Wr(t.length,this._size.length);if(!this._values)throw new Error("Cannot invoke get on a Pattern only matrix");var e=t[0],r=t[1];Jr(e,this._size[0]),Jr(r,this._size[1]);var n=u(e,this._ptr[r],this._ptr[r+1],this._index);return n<this._ptr[r+1]&&this._index[n]===e?this._values[n]:0},i.prototype.set=function(t,n,i){if(!De(t))throw new TypeError("Array expected");if(t.length!==this._size.length)throw new Wr(t.length,this._size.length);if(!this._values)throw new Error("Cannot invoke set on a Pattern only matrix");var s=t[0],a=t[1],o=this._size[0],l=this._size[1],p=r,f=0;Re(this._datatype)&&(p=e.find(r,[this._datatype,this._datatype])||r,f=e.convert(0,this._datatype)),(s>o-1||a>l-1)&&(c(this,Math.max(s+1,o),Math.max(a+1,l),i),o=this._size[0],l=this._size[1]),Jr(s,o),Jr(a,l);var d=u(s,this._ptr[a],this._ptr[a+1],this._index);return d<this._ptr[a+1]&&this._index[d]===s?p(n,f)?function(t,e,r,n,i){r.splice(t,1),n.splice(t,1);for(var s=e+1;s<i.length;s++)i[s]--;}(d,a,this._values,this._index,this._ptr):this._values[d]=n:h(d,s,a,n,this._values,this._index,this._ptr),this},i.prototype.resize=function(t,e,r){if(!Ie(t))throw new TypeError("Array or Matrix expected");var n=t.valueOf().map((t=>Array.isArray(t)&&1===t.length?t[0]:t));if(2!==n.length)throw new Error("Only two dimensions matrix are supported");return n.forEach((function(t){if(!Te(t)||!Ar(t)||t<0)throw new TypeError("Invalid size, must contain positive integers (size: "+Hr(n)+")")})),c(r?this.clone():this,n[0],n[1],e)},i.prototype.reshape=function(t,e){if(!De(t))throw new TypeError("Array expected");if(2!==t.length)throw new Error("Sparse matrices can only be reshaped in two dimensions");if(t.forEach((function(e){if(!Te(e)||!Ar(e)||e<0)throw new TypeError("Invalid size, must contain positive integers (size: "+Hr(t)+")")})),this._size[0]*this._size[1]!=t[0]*t[1])throw new Error("Reshaping sparse matrix will result in the wrong number of elements");var r=e?this.clone():this;if(this._size[0]===t[0]&&this._size[1]===t[1])return r;for(var n=[],i=0;i<r._ptr.length;i++)for(var s=0;s<r._ptr[i+1]-r._ptr[i];s++)n.push(i);for(var a=r._values.slice(),o=r._index.slice(),c=0;c<r._index.length;c++){var l=o[c],p=n[c],f=l*r._size[1]+p;n[c]=f%t[1],o[c]=Math.floor(f/t[1]);}r._values.length=0,r._index.length=0,r._ptr.length=t[1]+1,r._size=t.slice();for(var d=0;d<r._ptr.length;d++)r._ptr[d]=0;for(var m=0;m<a.length;m++){var y=o[m],g=n[m],v=a[m];h(u(y,r._ptr[g],r._ptr[g+1],r._index),y,g,v,r._values,r._index,r._ptr);}return r},i.prototype.clone=function(){return new i({values:this._values?pr(this._values):void 0,index:pr(this._index),ptr:pr(this._ptr),size:pr(this._size),datatype:this._datatype})},i.prototype.size=function(){return this._size.slice(0)},i.prototype.map=function(t,n){if(!this._values)throw new Error("Cannot invoke map on a Pattern only matrix");var s=this;return function(t,n,s,a,o,u,h){var c=[],l=[],p=[],f=r,d=0;Re(t._datatype)&&(f=e.find(r,[t._datatype,t._datatype])||r,d=e.convert(0,t._datatype));for(var m=function(t,e,r){t=u(t,e,r),f(t,d)||(c.push(t),l.push(e));},y=a;y<=o;y++){p.push(c.length);var g=t._ptr[y],v=t._ptr[y+1];if(h)for(var x=g;x<v;x++){var w=t._index[x];w>=n&&w<=s&&m(t._values[x],w-n,y-a);}else {for(var b={},_=g;_<v;_++){b[t._index[_]]=t._values[_];}for(var M=n;M<=s;M++){m(M in b?b[M]:0,M-n,y-a);}}}return p.push(c.length),new i({values:c,index:l,ptr:p,size:[s-n+1,o-a+1]})}(this,0,this._size[0]-1,0,this._size[1]-1,(function(e,r,n){return t(e,[r,n],s)}),n)},i.prototype.forEach=function(t,e){if(!this._values)throw new Error("Cannot invoke forEach on a Pattern only matrix");for(var r=this._size[0],n=this._size[1],i=0;i<n;i++){var s=this._ptr[i],a=this._ptr[i+1];if(e)for(var o=s;o<a;o++){var u=this._index[o];t(this._values[o],[u,i],this);}else {for(var h={},c=s;c<a;c++){h[this._index[c]]=this._values[c];}for(var l=0;l<r;l++){t(l in h?h[l]:0,[l,i],this);}}}},i.prototype.toArray=function(){return l(this._values,this._index,this._ptr,this._size,!0)},i.prototype.valueOf=function(){return l(this._values,this._index,this._ptr,this._size,!1)},i.prototype.format=function(t){for(var e=this._size[0],r=this._size[1],n=this.density(),i="Sparse Matrix ["+Hr(e,t)+" x "+Hr(r,t)+"] density: "+Hr(n,t)+"\n",s=0;s<r;s++)for(var a=this._ptr[s],o=this._ptr[s+1],u=a;u<o;u++){i+="\n    ("+Hr(this._index[u],t)+", "+Hr(s,t)+") ==> "+(this._values?Hr(this._values[u],t):"X");}return i},i.prototype.toString=function(){return Hr(this.toArray())},i.prototype.toJSON=function(){return {mathjs:"SparseMatrix",values:this._values,index:this._index,ptr:this._ptr,size:this._size,datatype:this._datatype}},i.prototype.diagonal=function(t){if(t){if(Oe(t)&&(t=t.toNumber()),!Te(t)||!Ar(t))throw new TypeError("The parameter k must be an integer number")}else t=0;var e=t>0?t:0,r=t<0?-t:0,n=this._size[0],s=this._size[1],a=Math.min(n-r,s-e),o=[],u=[],h=[];h[0]=0;for(var c=e;c<s&&o.length<a;c++)for(var l=this._ptr[c],p=this._ptr[c+1],f=l;f<p;f++){var d=this._index[f];if(d===c-e+r){o.push(this._values[f]),u[o.length-1]=d-r;break}}return h.push(o.length),new i({values:o,index:u,ptr:h,size:[a,1]})},i.fromJSON=function(t){return new i(t)},i.diagonal=function(t,n,s,a,o){if(!De(t))throw new TypeError("Array expected, size parameter");if(2!==t.length)throw new Error("Only two dimensions matrix are supported");if(t=t.map((function(t){if(Oe(t)&&(t=t.toNumber()),!Te(t)||!Ar(t)||t<1)throw new Error("Size values must be positive integers");return t})),s){if(Oe(s)&&(s=s.toNumber()),!Te(s)||!Ar(s))throw new TypeError("The parameter k must be an integer number")}else s=0;var u=r,h=0;Re(o)&&(u=e.find(r,[o,o])||r,h=e.convert(0,o));var c,l=s>0?s:0,p=s<0?-s:0,f=t[0],d=t[1],m=Math.min(f-p,d-l);if(De(n)){if(n.length!==m)throw new Error("Invalid value array length");c=function(t){return n[t]};}else if(ke(n)){var y=n.size();if(1!==y.length||y[0]!==m)throw new Error("Invalid matrix length");c=function(t){return n.get([t])};}else c=function(){return n};for(var g=[],v=[],x=[],w=0;w<d;w++){x.push(g.length);var b=w-l;if(b>=0&&b<m){var _=c(b);u(_,h)||(v.push(b+p),g.push(_));}}return x.push(g.length),new i({values:g,index:v,ptr:x,size:[f,d]})},i.prototype.swapRows=function(t,e){if(!(Te(t)&&Ar(t)&&Te(e)&&Ar(e)))throw new Error("Row index must be positive integers");if(2!==this._size.length)throw new Error("Only two dimensional matrix is supported");return Jr(t,this._size[0]),Jr(e,this._size[0]),i._swapRows(t,e,this._size[1],this._values,this._index,this._ptr),this},i._forEachRow=function(t,e,r,n,i){for(var s=n[t],a=n[t+1],o=s;o<a;o++)i(r[o],e[o]);},i._swapRows=function(t,e,r,n,i,s){for(var a=0;a<r;a++){var o=s[a],h=s[a+1],c=u(t,o,h,i),l=u(e,o,h,i);if(c<h&&l<h&&i[c]===t&&i[l]===e){if(n){var p=n[c];n[c]=n[l],n[l]=p;}}else if(c<h&&i[c]===t&&(l>=h||i[l]!==e)){var f=n?n[c]:void 0;i.splice(l,0,e),n&&n.splice(l,0,f),i.splice(l<=c?c+1:c,1),n&&n.splice(l<=c?c+1:c,1);}else if(l<h&&i[l]===e&&(c>=h||i[c]!==t)){var d=n?n[l]:void 0;i.splice(c,0,t),n&&n.splice(c,0,d),i.splice(c<=l?l+1:l,1),n&&n.splice(c<=l?l+1:l,1);}}},i}),{isClass:!0}),ws=cn("number",["typed"],(t=>{var{typed:e}=t,r=e("number",{"":function(){return 0},number:function(t){return t},string:function(t){if("NaN"===t)return NaN;var e=Number(t);if(isNaN(e))throw new SyntaxError('String "'+t+'" is no valid number');if(["0b","0o","0x"].includes(t.substring(0,2))){if(e>2**32-1)throw new SyntaxError('String "'.concat(t,'" is out of range'));2147483648&e&&(e=-1*~(e-1));}return e},BigNumber:function(t){return t.toNumber()},Fraction:function(t){return t.valueOf()},Unit:function(t){throw new Error("Second argument with valueless unit expected")},null:function(t){return 0},"Unit, string | Unit":function(t,e){return t.toNumber(e)},"Array | Matrix":function(t){return is(t,this)}});return r.fromJSON=function(t){return parseFloat(t.value)},r})),bs=cn("bignumber",["typed","BigNumber"],(t=>{var{typed:e,BigNumber:r}=t;return e("bignumber",{"":function(){return new r(0)},number:function(t){return new r(t+"")},string:function(t){return new r(t)},BigNumber:function(t){return t},Fraction:function(t){return new r(t.n).div(t.d).times(t.s)},null:function(t){return new r(0)},"Array | Matrix":function(t){return is(t,this)}})})),_s=cn("fraction",["typed","Fraction"],(t=>{var{typed:e,Fraction:r}=t;return e("fraction",{number:function(t){if(!isFinite(t)||isNaN(t))throw new Error(t+" cannot be represented as a fraction");return new r(t)},string:function(t){return new r(t)},"number, number":function(t,e){return new r(t,e)},null:function(t){return new r(0)},BigNumber:function(t){return new r(t.toString())},Fraction:function(t){return t},Object:function(t){return new r(t)},"Array | Matrix":function(t){return is(t,this)}})})),Ms=cn("matrix",["typed","Matrix","DenseMatrix","SparseMatrix"],(t=>{var{typed:e,Matrix:r,DenseMatrix:n,SparseMatrix:i}=t;return e("matrix",{"":function(){return s([])},string:function(t){return s([],t)},"string, string":function(t,e){return s([],t,e)},Array:function(t){return s(t)},Matrix:function(t){return s(t,t.storage())},"Array | Matrix, string":s,"Array | Matrix, string, string":s});function s(t,e,r){if("dense"===e||"default"===e||void 0===e)return new n(t,r);if("sparse"===e)return new i(t,r);throw new TypeError("Unknown matrix type "+JSON.stringify(e)+".")}})),Es=cn("unaryMinus",["typed"],(t=>{var{typed:e}=t;return e("unaryMinus",{number:cs,Complex:function(t){return t.neg()},BigNumber:function(t){return t.neg()},Fraction:function(t){return t.neg()},Unit:function(t){var e=t.clone();return e.value=this(t.value),e},"Array | Matrix":function(t){return is(t,this)}})})),Ns=cn("abs",["typed"],(t=>{var{typed:e}=t;return e("abs",{number:os,Complex:function(t){return t.abs()},BigNumber:function(t){return t.abs()},Fraction:function(t){return t.abs()},"Array | Matrix":function(t){return is(t,this)},Unit:function(t){return t.abs()}})})),Ss=cn("addScalar",["typed"],(t=>{var{typed:e}=t;return e("addScalar",{"number, number":us,"Complex, Complex":function(t,e){return t.add(e)},"BigNumber, BigNumber":function(t,e){return t.plus(e)},"Fraction, Fraction":function(t,e){return t.add(e)},"Unit, Unit":function(t,e){if(null===t.value||void 0===t.value)throw new Error("Parameter x contains a unit with undefined value");if(null===e.value||void 0===e.value)throw new Error("Parameter y contains a unit with undefined value");if(!t.equalBase(e))throw new Error("Units do not match");var r=t.clone();return r.value=this(r.value,e.value),r.fixPrefix=!1,r}})})),Ts=cn("algorithm11",["typed","equalScalar"],(t=>{var{typed:e,equalScalar:r}=t;return function(t,n,i,s){var a=t._values,o=t._index,u=t._ptr,h=t._size,c=t._datatype;if(!a)throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");var l,p=h[0],f=h[1],d=r,m=0,y=i;"string"==typeof c&&(l=c,d=e.find(r,[l,l]),m=e.convert(0,l),n=e.convert(n,l),y=e.find(i,[l,l]));for(var g=[],v=[],x=[],w=0;w<f;w++){x[w]=v.length;for(var b=u[w],_=u[w+1],M=b;M<_;M++){var E=o[M],N=s?y(n,a[M]):y(a[M],n);d(N,m)||(v.push(E),g.push(N));}}return x[f]=v.length,t.createSparseMatrix({values:g,index:v,ptr:x,size:[p,f],datatype:l})}})),Os=cn("algorithm14",["typed"],(t=>{var{typed:e}=t;return function(t,n,i,s){var a,o=t._data,u=t._size,h=t._datatype,c=i;"string"==typeof h&&(a=h,n=e.convert(n,a),c=e.find(i,[a,a]));var l=u.length>0?r(c,0,u,u[0],o,n,s):[];return t.createDenseMatrix({data:l,size:pr(u),datatype:a})};function r(t,e,n,i,s,a,o){var u=[];if(e===n.length-1)for(var h=0;h<i;h++)u[h]=o?t(a,s[h]):t(s[h],a);else for(var c=0;c<i;c++)u[c]=r(t,e+1,n,n[e+1],s[c],a,o);return u}})),zs=cn("ceil",["typed","config","round","matrix","equalScalar"],(t=>{var{typed:e,config:r,round:n,matrix:i,equalScalar:s}=t,a=Ts({typed:e,equalScalar:s}),o=Os({typed:e});return e("ceil",{number:function(t){return Pr(t,n(t),r.epsilon)?n(t):ls(t)},"number, number":function(t,e){if(Pr(t,n(t,e),r.epsilon))return n(t,e);var[i,s]="".concat(t,"e").split("e"),a=Math.ceil(Number("".concat(i,"e").concat(Number(s)+e)));return [i,s]="".concat(a,"e").split("e"),Number("".concat(i,"e").concat(Number(s)-e))},Complex:function(t){return t.ceil()},"Complex, number":function(t,e){return t.ceil(e)},BigNumber:function(t){return ys(t,n(t),r.epsilon)?n(t):t.ceil()},"BigNumber, BigNumber":function(t,e){return ys(t,n(t,e),r.epsilon)?n(t,e):t.toDecimalPlaces(e.toNumber(),Gi.ROUND_CEIL)},Fraction:function(t){return t.ceil()},"Fraction, number":function(t,e){return t.ceil(e)},"Array | Matrix":function(t){return is(t,this)},"Array | Matrix, number":function(t,e){return is(t,(t=>this(t,e)))},"SparseMatrix, number | BigNumber":function(t,e){return a(t,e,this,!1)},"DenseMatrix, number | BigNumber":function(t,e){return o(t,e,this,!1)},"number | Complex | BigNumber, Array":function(t,e){return o(i(e),t,this,!0).valueOf()}})})),As=cn("fix",["typed","Complex","matrix","ceil","floor"],(t=>{var{typed:e,Complex:r,matrix:n,ceil:i,floor:s}=t,a=Os({typed:e});return e("fix",{number:function(t){return t>0?s(t):i(t)},"number, number | BigNumber":function(t,e){return t>0?s(t,e):i(t,e)},Complex:function(t){return new r(t.re>0?Math.floor(t.re):Math.ceil(t.re),t.im>0?Math.floor(t.im):Math.ceil(t.im))},"Complex, number | BigNumber":function(t,e){return new r(t.re>0?s(t.re,e):i(t.re,e),t.im>0?s(t.im,e):i(t.im,e))},BigNumber:function(t){return t.isNegative()?i(t):s(t)},"BigNumber, number | BigNumber":function(t,e){return t.isNegative()?i(t,e):s(t,e)},Fraction:function(t){return t.s<0?t.ceil():t.floor()},"Fraction, number | BigNumber":function(t,e){return t.s<0?t.ceil(e):t.floor(e)},"Array | Matrix":function(t){return is(t,this)},"Array | Matrix, number | BigNumber":function(t,e){return is(t,(t=>this(t,e)))},"number | Complex | BigNumber, Array":function(t,e){return a(n(e),t,this,!0).valueOf()}})})),Cs=cn("floor",["typed","config","round","matrix","equalScalar"],(t=>{var{typed:e,config:r,round:n,matrix:i,equalScalar:s}=t,a=Ts({typed:e,equalScalar:s}),o=Os({typed:e});return e("floor",{number:function(t){return Pr(t,n(t),r.epsilon)?n(t):Math.floor(t)},"number, number":function(t,e){if(Pr(t,n(t,e),r.epsilon))return n(t,e);var[i,s]="".concat(t,"e").split("e"),a=Math.floor(Number("".concat(i,"e").concat(Number(s)+e)));return [i,s]="".concat(a,"e").split("e"),Number("".concat(i,"e").concat(Number(s)-e))},Complex:function(t){return t.floor()},"Complex, number":function(t,e){return t.floor(e)},BigNumber:function(t){return ys(t,n(t),r.epsilon)?n(t):t.floor()},"BigNumber, BigNumber":function(t,e){return ys(t,n(t,e),r.epsilon)?n(t,e):t.toDecimalPlaces(e.toNumber(),Gi.ROUND_FLOOR)},Fraction:function(t){return t.floor()},"Fraction, number":function(t,e){return t.floor(e)},"Array | Matrix":function(t){return is(t,this)},"Array | Matrix, number":function(t,e){return is(t,(t=>this(t,e)))},"SparseMatrix, number | BigNumber":function(t,e){return a(t,e,this,!1)},"DenseMatrix, number | BigNumber":function(t,e){return o(t,e,this,!1)},"number | Complex | BigNumber, Array":function(t,e){return o(i(e),t,this,!0).valueOf()}})})),Rs=cn("algorithm01",["typed"],(t=>{var{typed:e}=t;return function(t,r,n,i){var s=t._data,a=t._size,o=t._datatype,u=r._values,h=r._index,c=r._ptr,l=r._size,p=r._datatype;if(a.length!==l.length)throw new Wr(a.length,l.length);if(a[0]!==l[0]||a[1]!==l[1])throw new RangeError("Dimension mismatch. Matrix A ("+a+") must match Matrix B ("+l+")");if(!u)throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");var f,d,m=a[0],y=a[1],g="string"==typeof o&&o===p?o:void 0,v=g?e.find(n,[g,g]):n,x=[];for(f=0;f<m;f++)x[f]=[];var w=[],b=[];for(d=0;d<y;d++){for(var _=d+1,M=c[d],E=c[d+1],N=M;N<E;N++)w[f=h[N]]=i?v(u[N],s[f][d]):v(s[f][d],u[N]),b[f]=_;for(f=0;f<m;f++)b[f]===_?x[f][d]=w[f]:x[f][d]=s[f][d];}return t.createDenseMatrix({data:x,size:[m,y],datatype:g})}})),Ds=cn("algorithm04",["typed","equalScalar"],(t=>{var{typed:e,equalScalar:r}=t;return function(t,n,i){var s=t._values,a=t._index,o=t._ptr,u=t._size,h=t._datatype,c=n._values,l=n._index,p=n._ptr,f=n._size,d=n._datatype;if(u.length!==f.length)throw new Wr(u.length,f.length);if(u[0]!==f[0]||u[1]!==f[1])throw new RangeError("Dimension mismatch. Matrix A ("+u+") must match Matrix B ("+f+")");var m,y=u[0],g=u[1],v=r,x=0,w=i;"string"==typeof h&&h===d&&(m=h,v=e.find(r,[m,m]),x=e.convert(0,m),w=e.find(i,[m,m]));var b,_,M,E,N,S=s&&c?[]:void 0,T=[],O=[],z=s&&c?[]:void 0,A=s&&c?[]:void 0,C=[],R=[];for(_=0;_<g;_++){O[_]=T.length;var D=_+1;for(E=o[_],N=o[_+1],M=E;M<N;M++)b=a[M],T.push(b),C[b]=D,z&&(z[b]=s[M]);for(E=p[_],N=p[_+1],M=E;M<N;M++)if(C[b=l[M]]===D){if(z){var k=w(z[b],c[M]);v(k,x)?C[b]=null:z[b]=k;}}else T.push(b),R[b]=D,A&&(A[b]=c[M]);if(z&&A)for(M=O[_];M<T.length;)C[b=T[M]]===D?(S[M]=z[b],M++):R[b]===D?(S[M]=A[b],M++):T.splice(M,1);}return O[g]=T.length,t.createSparseMatrix({values:S,index:T,ptr:O,size:[y,g],datatype:m})}})),ks=cn("algorithm10",["typed","DenseMatrix"],(t=>{var{typed:e,DenseMatrix:r}=t;return function(t,n,i,s){var a=t._values,o=t._index,u=t._ptr,h=t._size,c=t._datatype;if(!a)throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");var l,p=h[0],f=h[1],d=i;"string"==typeof c&&(l=c,n=e.convert(n,l),d=e.find(i,[l,l]));for(var m=[],y=[],g=[],v=0;v<f;v++){for(var x=v+1,w=u[v],b=u[v+1],_=w;_<b;_++){var M=o[_];y[M]=a[_],g[M]=x;}for(var E=0;E<p;E++)0===v&&(m[E]=[]),g[E]===x?m[E][v]=s?d(n,y[E]):d(y[E],n):m[E][v]=n;}return new r({data:m,size:[p,f],datatype:l})}})),Is=cn("algorithm13",["typed"],(t=>{var{typed:e}=t;return function(t,n,i){var s,a=t._data,o=t._size,u=t._datatype,h=n._data,c=n._size,l=n._datatype,p=[];if(o.length!==c.length)throw new Wr(o.length,c.length);for(var f=0;f<o.length;f++){if(o[f]!==c[f])throw new RangeError("Dimension mismatch. Matrix A ("+o+") must match Matrix B ("+c+")");p[f]=o[f];}var d=i;"string"==typeof u&&u===l&&(s=u,d=e.find(i,[s,s]));var m=p.length>0?r(d,0,p,p[0],a,h):[];return t.createDenseMatrix({data:m,size:p,datatype:s})};function r(t,e,n,i,s,a){var o=[];if(e===n.length-1)for(var u=0;u<i;u++)o[u]=t(s[u],a[u]);else for(var h=0;h<i;h++)o[h]=r(t,e+1,n,n[e+1],s[h],a[h]);return o}})),Ls=cn("algorithm02",["typed","equalScalar"],(t=>{var{typed:e,equalScalar:r}=t;return function(t,n,i,s){var a=t._data,o=t._size,u=t._datatype,h=n._values,c=n._index,l=n._ptr,p=n._size,f=n._datatype;if(o.length!==p.length)throw new Wr(o.length,p.length);if(o[0]!==p[0]||o[1]!==p[1])throw new RangeError("Dimension mismatch. Matrix A ("+o+") must match Matrix B ("+p+")");if(!h)throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");var d,m=o[0],y=o[1],g=r,v=0,x=i;"string"==typeof u&&u===f&&(d=u,g=e.find(r,[d,d]),v=e.convert(0,d),x=e.find(i,[d,d]));for(var w=[],b=[],_=[],M=0;M<y;M++){_[M]=b.length;for(var E=l[M],N=l[M+1],S=E;S<N;S++){var T=c[S],O=s?x(h[S],a[T][M]):x(a[T][M],h[S]);g(O,v)||(b.push(T),w.push(O));}}return _[y]=b.length,n.createSparseMatrix({values:w,index:b,ptr:_,size:[m,y],datatype:d})}})),Bs=cn("algorithm03",["typed"],(t=>{var{typed:e}=t;return function(t,r,n,i){var s=t._data,a=t._size,o=t._datatype,u=r._values,h=r._index,c=r._ptr,l=r._size,p=r._datatype;if(a.length!==l.length)throw new Wr(a.length,l.length);if(a[0]!==l[0]||a[1]!==l[1])throw new RangeError("Dimension mismatch. Matrix A ("+a+") must match Matrix B ("+l+")");if(!u)throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");var f,d=a[0],m=a[1],y=0,g=n;"string"==typeof o&&o===p&&(f=o,y=e.convert(0,f),g=e.find(n,[f,f]));for(var v=[],x=0;x<d;x++)v[x]=[];for(var w=[],b=[],_=0;_<m;_++){for(var M=_+1,E=c[_],N=c[_+1],S=E;S<N;S++){var T=h[S];w[T]=i?g(u[S],s[T][_]):g(s[T][_],u[S]),b[T]=M;}for(var O=0;O<d;O++)b[O]===M?v[O][_]=w[O]:v[O][_]=i?g(y,s[O][_]):g(s[O][_],y);}return t.createDenseMatrix({data:v,size:[d,m],datatype:f})}})),Fs=cn("algorithm05",["typed","equalScalar"],(t=>{var{typed:e,equalScalar:r}=t;return function(t,n,i){var s=t._values,a=t._index,o=t._ptr,u=t._size,h=t._datatype,c=n._values,l=n._index,p=n._ptr,f=n._size,d=n._datatype;if(u.length!==f.length)throw new Wr(u.length,f.length);if(u[0]!==f[0]||u[1]!==f[1])throw new RangeError("Dimension mismatch. Matrix A ("+u+") must match Matrix B ("+f+")");var m,y=u[0],g=u[1],v=r,x=0,w=i;"string"==typeof h&&h===d&&(m=h,v=e.find(r,[m,m]),x=e.convert(0,m),w=e.find(i,[m,m]));var b,_,M,E,N=s&&c?[]:void 0,S=[],T=[],O=N?[]:void 0,z=N?[]:void 0,A=[],C=[];for(_=0;_<g;_++){T[_]=S.length;var R=_+1;for(M=o[_],E=o[_+1];M<E;M++)b=a[M],S.push(b),A[b]=R,O&&(O[b]=s[M]);for(M=p[_],E=p[_+1];M<E;M++)A[b=l[M]]!==R&&S.push(b),C[b]=R,z&&(z[b]=c[M]);if(N)for(M=T[_];M<S.length;){var D=A[b=S[M]],k=C[b];if(D===R||k===R){var I=w(D===R?O[b]:x,k===R?z[b]:x);v(I,x)?S.splice(M,1):(N.push(I),M++);}}}return T[g]=S.length,t.createSparseMatrix({values:N,index:S,ptr:T,size:[y,g],datatype:m})}})),Ps=cn("algorithm12",["typed","DenseMatrix"],(t=>{var{typed:e,DenseMatrix:r}=t;return function(t,n,i,s){var a=t._values,o=t._index,u=t._ptr,h=t._size,c=t._datatype;if(!a)throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");var l,p=h[0],f=h[1],d=i;"string"==typeof c&&(l=c,n=e.convert(n,l),d=e.find(i,[l,l]));for(var m=[],y=[],g=[],v=0;v<f;v++){for(var x=v+1,w=u[v],b=u[v+1],_=w;_<b;_++){var M=o[_];y[M]=a[_],g[M]=x;}for(var E=0;E<p;E++)0===v&&(m[E]=[]),g[E]===x?m[E][v]=s?d(n,y[E]):d(y[E],n):m[E][v]=s?d(n,0):d(0,n);}return new r({data:m,size:[p,f],datatype:l})}}));cn("mod",["typed","matrix","equalScalar","DenseMatrix"],(t=>{var{typed:e,matrix:r,equalScalar:n,DenseMatrix:i}=t,s=Ls({typed:e,equalScalar:n}),a=Bs({typed:e}),o=Fs({typed:e,equalScalar:n}),u=Ts({typed:e,equalScalar:n}),h=Ps({typed:e,DenseMatrix:i}),c=Is({typed:e}),l=Os({typed:e});return e("mod",{"number, number":ps,"BigNumber, BigNumber":function(t,e){if(e.isNeg())throw new Error("Cannot calculate mod for a negative divisor");return e.isZero()?t:t.mod(e)},"Fraction, Fraction":function(t,e){if(e.compare(0)<0)throw new Error("Cannot calculate mod for a negative divisor");return t.compare(0)>=0?t.mod(e):t.mod(e).add(e).mod(e)},"SparseMatrix, SparseMatrix":function(t,e){return o(t,e,this,!1)},"SparseMatrix, DenseMatrix":function(t,e){return s(e,t,this,!0)},"DenseMatrix, SparseMatrix":function(t,e){return a(t,e,this,!1)},"DenseMatrix, DenseMatrix":function(t,e){return c(t,e,this)},"Array, Array":function(t,e){return this(r(t),r(e)).valueOf()},"Array, Matrix":function(t,e){return this(r(t),e)},"Matrix, Array":function(t,e){return this(t,r(e))},"SparseMatrix, any":function(t,e){return u(t,e,this,!1)},"DenseMatrix, any":function(t,e){return l(t,e,this,!1)},"any, SparseMatrix":function(t,e){return h(e,t,this,!0)},"any, DenseMatrix":function(t,e){return l(e,t,this,!0)},"Array, any":function(t,e){return l(r(t),e,this,!1).valueOf()},"any, Array":function(t,e){return l(r(e),t,this,!0).valueOf()}})}));var js=cn("multiplyScalar",["typed"],(t=>{var{typed:e}=t;return e("multiplyScalar",{"number, number":hs,"Complex, Complex":function(t,e){return t.mul(e)},"BigNumber, BigNumber":function(t,e){return t.times(e)},"Fraction, Fraction":function(t,e){return t.mul(e)},"number | Fraction | BigNumber | Complex, Unit":function(t,e){var r=e.clone();return r.value=null===r.value?r._normalize(t):this(r.value,t),r},"Unit, number | Fraction | BigNumber | Complex":function(t,e){var r=t.clone();return r.value=null===r.value?r._normalize(e):this(r.value,e),r},"Unit, Unit":function(t,e){return t.multiply(e)}})})),qs=cn("multiply",["typed","matrix","addScalar","multiplyScalar","equalScalar","dot"],(t=>{var{typed:e,matrix:r,addScalar:n,multiplyScalar:i,equalScalar:s,dot:a}=t,o=Ts({typed:e,equalScalar:s}),u=Os({typed:e});function h(t,e){switch(t.length){case 1:switch(e.length){case 1:if(t[0]!==e[0])throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length");break;case 2:if(t[0]!==e[0])throw new RangeError("Dimension mismatch in multiplication. Vector length ("+t[0]+") must match Matrix rows ("+e[0]+")");break;default:throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has "+e.length+" dimensions)")}break;case 2:switch(e.length){case 1:if(t[1]!==e[0])throw new RangeError("Dimension mismatch in multiplication. Matrix columns ("+t[1]+") must match Vector length ("+e[0]+")");break;case 2:if(t[1]!==e[0])throw new RangeError("Dimension mismatch in multiplication. Matrix A columns ("+t[1]+") must match Matrix B rows ("+e[0]+")");break;default:throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has "+e.length+" dimensions)")}break;default:throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix A has "+t.length+" dimensions)")}}function c(t,r){if("dense"!==r.storage())throw new Error("Support for SparseMatrix not implemented");return function(t,r){var s,a=t._data,o=t._size,u=t._datatype,h=r._data,c=r._size,l=r._datatype,p=o[0],f=c[1],d=n,m=i;u&&l&&u===l&&"string"==typeof u&&(s=u,d=e.find(n,[s,s]),m=e.find(i,[s,s]));for(var y=[],g=0;g<f;g++){for(var v=m(a[0],h[0][g]),x=1;x<p;x++)v=d(v,m(a[x],h[x][g]));y[g]=v;}return t.createDenseMatrix({data:y,size:[f],datatype:s})}(t,r)}var l=e("_multiplyMatrixVector",{"DenseMatrix, any":function(t,r){var s,a=t._data,o=t._size,u=t._datatype,h=r._data,c=r._datatype,l=o[0],p=o[1],f=n,d=i;u&&c&&u===c&&"string"==typeof u&&(s=u,f=e.find(n,[s,s]),d=e.find(i,[s,s]));for(var m=[],y=0;y<l;y++){for(var g=a[y],v=d(g[0],h[0]),x=1;x<p;x++)v=f(v,d(g[x],h[x]));m[y]=v;}return t.createDenseMatrix({data:m,size:[l],datatype:s})},"SparseMatrix, any":function(t,r){var a=t._values,o=t._index,u=t._ptr,h=t._datatype;if(!a)throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");var c,l=r._data,p=r._datatype,f=t._size[0],d=r._size[0],m=[],y=[],g=[],v=n,x=i,w=s,b=0;h&&p&&h===p&&"string"==typeof h&&(c=h,v=e.find(n,[c,c]),x=e.find(i,[c,c]),w=e.find(s,[c,c]),b=e.convert(0,c));var _=[],M=[];g[0]=0;for(var E=0;E<d;E++){var N=l[E];if(!w(N,b))for(var S=u[E],T=u[E+1],O=S;O<T;O++){var z=o[O];M[z]?_[z]=v(_[z],x(N,a[O])):(M[z]=!0,y.push(z),_[z]=x(N,a[O]));}}for(var A=y.length,C=0;C<A;C++){var R=y[C];m[C]=_[R];}return g[1]=y.length,t.createSparseMatrix({values:m,index:y,ptr:g,size:[f,1],datatype:c})}}),p=e("_multiplyMatrixMatrix",{"DenseMatrix, DenseMatrix":function(t,r){var s,a=t._data,o=t._size,u=t._datatype,h=r._data,c=r._size,l=r._datatype,p=o[0],f=o[1],d=c[1],m=n,y=i;u&&l&&u===l&&"string"==typeof u&&(s=u,m=e.find(n,[s,s]),y=e.find(i,[s,s]));for(var g=[],v=0;v<p;v++){var x=a[v];g[v]=[];for(var w=0;w<d;w++){for(var b=y(x[0],h[0][w]),_=1;_<f;_++)b=m(b,y(x[_],h[_][w]));g[v][w]=b;}}return t.createDenseMatrix({data:g,size:[p,d],datatype:s})},"DenseMatrix, SparseMatrix":function(t,r){var a=t._data,o=t._size,u=t._datatype,h=r._values,c=r._index,l=r._ptr,p=r._size,f=r._datatype;if(!h)throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");var d,m=o[0],y=p[1],g=n,v=i,x=s,w=0;u&&f&&u===f&&"string"==typeof u&&(d=u,g=e.find(n,[d,d]),v=e.find(i,[d,d]),x=e.find(s,[d,d]),w=e.convert(0,d));for(var b=[],_=[],M=[],E=r.createSparseMatrix({values:b,index:_,ptr:M,size:[m,y],datatype:d}),N=0;N<y;N++){M[N]=_.length;var S=l[N],T=l[N+1];if(T>S)for(var O=0,z=0;z<m;z++){for(var A=z+1,C=void 0,R=S;R<T;R++){var D=c[R];O!==A?(C=v(a[z][D],h[R]),O=A):C=g(C,v(a[z][D],h[R]));}O!==A||x(C,w)||(_.push(z),b.push(C));}}return M[y]=_.length,E},"SparseMatrix, DenseMatrix":function(t,r){var a=t._values,o=t._index,u=t._ptr,h=t._datatype;if(!a)throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");var c,l=r._data,p=r._datatype,f=t._size[0],d=r._size[0],m=r._size[1],y=n,g=i,v=s,x=0;h&&p&&h===p&&"string"==typeof h&&(c=h,y=e.find(n,[c,c]),g=e.find(i,[c,c]),v=e.find(s,[c,c]),x=e.convert(0,c));for(var w=[],b=[],_=[],M=t.createSparseMatrix({values:w,index:b,ptr:_,size:[f,m],datatype:c}),E=[],N=[],S=0;S<m;S++){_[S]=b.length;for(var T=S+1,O=0;O<d;O++){var z=l[O][S];if(!v(z,x))for(var A=u[O],C=u[O+1],R=A;R<C;R++){var D=o[R];N[D]!==T?(N[D]=T,b.push(D),E[D]=g(z,a[R])):E[D]=y(E[D],g(z,a[R]));}}for(var k=_[S],I=b.length,L=k;L<I;L++){var B=b[L];w[L]=E[B];}}return _[m]=b.length,M},"SparseMatrix, SparseMatrix":function(t,r){var s,a=t._values,o=t._index,u=t._ptr,h=t._datatype,c=r._values,l=r._index,p=r._ptr,f=r._datatype,d=t._size[0],m=r._size[1],y=a&&c,g=n,v=i;h&&f&&h===f&&"string"==typeof h&&(s=h,g=e.find(n,[s,s]),v=e.find(i,[s,s]));for(var x,w,b,_,M,E,N,S,T=y?[]:void 0,O=[],z=[],A=t.createSparseMatrix({values:T,index:O,ptr:z,size:[d,m],datatype:s}),C=y?[]:void 0,R=[],D=0;D<m;D++){z[D]=O.length;var k=D+1;for(M=p[D],E=p[D+1],_=M;_<E;_++)if(S=l[_],y)for(w=u[S],b=u[S+1],x=w;x<b;x++)N=o[x],R[N]!==k?(R[N]=k,O.push(N),C[N]=v(c[_],a[x])):C[N]=g(C[N],v(c[_],a[x]));else for(w=u[S],b=u[S+1],x=w;x<b;x++)N=o[x],R[N]!==k&&(R[N]=k,O.push(N));if(y)for(var I=z[D],L=O.length,B=I;B<L;B++){var F=O[B];T[B]=C[F];}}return z[m]=O.length,A}});return e("multiply",dr({"Array, Array":function(t,e){h(Zr(t),Zr(e));var n=this(r(t),r(e));return ke(n)?n.valueOf():n},"Matrix, Matrix":function(t,e){var r=t.size(),n=e.size();return h(r,n),1===r.length?1===n.length?function(t,e,r){if(0===r)throw new Error("Cannot multiply two empty vectors");return a(t,e)}(t,e,r[0]):c(t,e):1===n.length?l(t,e):p(t,e)},"Matrix, Array":function(t,e){return this(t,r(e))},"Array, Matrix":function(t,e){return this(r(t,e.storage()),e)},"SparseMatrix, any":function(t,e){return o(t,e,i,!1)},"DenseMatrix, any":function(t,e){return u(t,e,i,!1)},"any, SparseMatrix":function(t,e){return o(e,t,i,!0)},"any, DenseMatrix":function(t,e){return u(e,t,i,!0)},"Array, any":function(t,e){return u(r(t),e,i,!1).valueOf()},"any, Array":function(t,e){return u(r(e),t,i,!0).valueOf()},"any, any":i,"any, any, ...any":function(t,e,r){for(var n=this(t,e),i=0;i<r.length;i++)n=this(n,r[i]);return n}},i.signatures))})),Hs=cn("subtract",["typed","matrix","equalScalar","addScalar","unaryMinus","DenseMatrix"],(t=>{var{typed:e,matrix:r,equalScalar:n,addScalar:i,unaryMinus:s,DenseMatrix:a}=t,o=Rs({typed:e}),u=Bs({typed:e}),h=Fs({typed:e,equalScalar:n}),c=ks({typed:e,DenseMatrix:a}),l=Is({typed:e}),p=Os({typed:e});return e("subtract",{"number, number":function(t,e){return t-e},"Complex, Complex":function(t,e){return t.sub(e)},"BigNumber, BigNumber":function(t,e){return t.minus(e)},"Fraction, Fraction":function(t,e){return t.sub(e)},"Unit, Unit":function(t,e){if(null===t.value)throw new Error("Parameter x contains a unit with undefined value");if(null===e.value)throw new Error("Parameter y contains a unit with undefined value");if(!t.equalBase(e))throw new Error("Units do not match");var r=t.clone();return r.value=this(r.value,e.value),r.fixPrefix=!1,r},"SparseMatrix, SparseMatrix":function(t,e){return Vs(t,e),h(t,e,this)},"SparseMatrix, DenseMatrix":function(t,e){return Vs(t,e),u(e,t,this,!0)},"DenseMatrix, SparseMatrix":function(t,e){return Vs(t,e),o(t,e,this,!1)},"DenseMatrix, DenseMatrix":function(t,e){return Vs(t,e),l(t,e,this)},"Array, Array":function(t,e){return this(r(t),r(e)).valueOf()},"Array, Matrix":function(t,e){return this(r(t),e)},"Matrix, Array":function(t,e){return this(t,r(e))},"SparseMatrix, any":function(t,e){return c(t,s(e),i)},"DenseMatrix, any":function(t,e){return p(t,e,this)},"any, SparseMatrix":function(t,e){return c(e,t,this,!0)},"any, DenseMatrix":function(t,e){return p(e,t,this,!0)},"Array, any":function(t,e){return p(r(t),e,this,!1).valueOf()},"any, Array":function(t,e){return p(r(e),t,this,!0).valueOf()}})}));function Vs(t,e){var r=t.size(),n=e.size();if(r.length!==n.length)throw new Wr(r.length,n.length)}var $s=cn("algorithm07",["typed","DenseMatrix"],(t=>{var{typed:e,DenseMatrix:r}=t;return function(t,i,s){var a=t._size,o=t._datatype,u=i._size,h=i._datatype;if(a.length!==u.length)throw new Wr(a.length,u.length);if(a[0]!==u[0]||a[1]!==u[1])throw new RangeError("Dimension mismatch. Matrix A ("+a+") must match Matrix B ("+u+")");var c,l,p,f=a[0],d=a[1],m=0,y=s;"string"==typeof o&&o===h&&(c=o,m=e.convert(0,c),y=e.find(s,[c,c]));var g=[];for(l=0;l<f;l++)g[l]=[];var v=[],x=[],w=[],b=[];for(p=0;p<d;p++){var _=p+1;for(n(t,p,w,v,_),n(i,p,b,x,_),l=0;l<f;l++){var M=w[l]===_?v[l]:m,E=b[l]===_?x[l]:m;g[l][p]=y(M,E);}}return new r({data:g,size:[f,d],datatype:c})};function n(t,e,r,n,i){for(var s=t._values,a=t._index,o=t._ptr,u=o[e],h=o[e+1];u<h;u++){var c=a[u];r[c]=i,n[c]=s[u];}}})),Gs=cn("conj",["typed"],(t=>{var{typed:e}=t;return e("conj",{number:function(t){return t},BigNumber:function(t){return t},Complex:function(t){return t.conjugate()},"Array | Matrix":function(t){return is(t,this)}})}));function Ws(t){var e=0,r=1,n=Object.create(null),i=Object.create(null),s=0,a=function(t){var a=i[t];if(a&&(delete n[a],delete i[t],--e,r===a)){if(!e)return s=0,void(r=1);for(;!hasOwnProperty.call(n,++r););}};return t=Math.abs(t),{hit:function(o){var u=i[o],h=++s;if(n[h]=o,i[o]=h,!u){if(++e<=t)return;return o=n[r],a(o),o}if(delete n[u],r===u)for(;!hasOwnProperty.call(n,++r););},delete:a,clear:function(){e=s=0,r=1,n=Object.create(null),i=Object.create(null);}}}function Ys(t){var{hasher:e,limit:r}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return r=null==r?Number.POSITIVE_INFINITY:r,e=null==e?JSON.stringify:e,function n(){"object"!=typeof n.cache&&(n.cache={values:new Map,lru:Ws(r||Number.POSITIVE_INFINITY)});for(var i=[],s=0;s<arguments.length;s++)i[s]=arguments[s];var a=e(i);if(n.cache.values.has(a))return n.cache.lru.hit(a),n.cache.values.get(a);var o=t.apply(t,i);return n.cache.values.set(a,o),n.cache.values.delete(n.cache.lru.hit(a)),o}}var Zs=cn("identity",["typed","config","matrix","BigNumber","DenseMatrix","SparseMatrix"],(t=>{var{typed:e,config:r,matrix:n,BigNumber:i,DenseMatrix:s,SparseMatrix:a}=t;return e("identity",{"":function(){return "Matrix"===r.matrix?n([]):[]},string:function(t){return n(t)},"number | BigNumber":function(t){return u(t,t,"Matrix"===r.matrix?"dense":void 0)},"number | BigNumber, string":function(t,e){return u(t,t,e)},"number | BigNumber, number | BigNumber":function(t,e){return u(t,e,"Matrix"===r.matrix?"dense":void 0)},"number | BigNumber, number | BigNumber, string":function(t,e,r){return u(t,e,r)},Array:function(t){return o(t)},"Array, string":function(t,e){return o(t,e)},Matrix:function(t){return o(t.valueOf(),t.storage())},"Matrix, string":function(t,e){return o(t.valueOf(),e)}});function o(t,e){switch(t.length){case 0:return e?n(e):[];case 1:return u(t[0],t[0],e);case 2:return u(t[0],t[1],e);default:throw new Error("Vector containing two values expected")}}function u(t,e,r){var n=Oe(t)||Oe(e)?i:null;if(Oe(t)&&(t=t.toNumber()),Oe(e)&&(e=e.toNumber()),!Ar(t)||t<1)throw new Error("Parameters in function identity must be positive integers");if(!Ar(e)||e<1)throw new Error("Parameters in function identity must be positive integers");var o=n?new i(1):1,u=n?new n(0):0,h=[t,e];if(r){if("sparse"===r)return a.diagonal(h,o,0,u);if("dense"===r)return s.diagonal(h,o,0,u);throw new TypeError('Unknown matrix type "'.concat(r,'"'))}for(var c=Kr([],h,u),l=t<e?t:e,p=0;p<l;p++)c[p][p]=o;return c}}));function Xs(){throw new Error('No "bignumber" implementation available')}function Qs(){throw new Error('No "fraction" implementation available')}function Js(t,e,r,n){if(!(this instanceof Js))throw new SyntaxError("Constructor must be called with the new operator");this.fn=t,this.count=e,this.min=r,this.max=n,this.message="Wrong number of arguments in function "+t+" ("+e+" provided, "+r+(null!=n?"-"+n:"")+" expected)",this.stack=(new Error).stack;}Js.prototype=new Error,Js.prototype.constructor=Error,Js.prototype.name="ArgumentsError",Js.prototype.isArgumentsError=!0;var Ks=cn("size",["typed","config","?matrix"],(t=>{var{typed:e,config:r,matrix:n}=t;return e("size",{Matrix:function(t){return t.create(t.size())},Array:Zr,string:function(t){return "Array"===r.matrix?[t.length]:n([t.length])},"number | Complex | BigNumber | Unit | boolean | null":function(t){return "Array"===r.matrix?[]:n?n([]):function(){throw new Error('No "matrix" implementation available')}()}})}));function ta(t,e){if(ia(t)&&ra(t,e))return t[e];if("function"==typeof t[e]&&na(t,e))throw new Error('Cannot access method "'+e+'" as a property');throw new Error('No access to property "'+e+'"')}function ea(t,e,r){if(ia(t)&&ra(t,e))return t[e]=r,r;throw new Error('No access to property "'+e+'"')}function ra(t,e){return !(!t||"object"!=typeof t)&&(!!wr(sa,e)||!(e in Object.prototype)&&!(e in Function.prototype))}function na(t,e){return null!=t&&"function"==typeof t[e]&&(!(wr(t,e)&&Object.getPrototypeOf&&e in Object.getPrototypeOf(t))&&(!!wr(aa,e)||!(e in Object.prototype)&&!(e in Function.prototype)))}function ia(t){return "object"==typeof t&&t&&t.constructor===Object}var sa={length:!0,name:!0},aa={toString:!0,valueOf:!0,toLocaleString:!0},oa=cn("subset",["typed","matrix"],(t=>{var{typed:e,matrix:r}=t;return e("subset",{"Array, Index":function(t,e){var n=r(t).subset(e);return e.isScalar()?n:n.valueOf()},"Matrix, Index":function(t,e){return t.subset(e)},"Object, Index":ca,"string, Index":ua,"Array, Index, any":function(t,e,n){return r(pr(t)).subset(e,n,void 0).valueOf()},"Array, Index, any, any":function(t,e,n,i){return r(pr(t)).subset(e,n,i).valueOf()},"Matrix, Index, any":function(t,e,r){return t.clone().subset(e,r)},"Matrix, Index, any, any":function(t,e,r,n){return t.clone().subset(e,r,n)},"string, Index, string":ha,"string, Index, string, string":ha,"Object, Index, any":la})}));function ua(t,e){if(!Pe(e))throw new TypeError("Index expected");if(1!==e.size().length)throw new Wr(e.size().length,1);var r=t.length;Jr(e.min()[0],r),Jr(e.max()[0],r);var n=e.dimension(0),i="";return n.forEach((function(e){i+=t.charAt(e);})),i}function ha(t,e,r,n){if(!e||!0!==e.isIndex)throw new TypeError("Index expected");if(1!==e.size().length)throw new Wr(e.size().length,1);if(void 0!==n){if("string"!=typeof n||1!==n.length)throw new TypeError("Single character expected as defaultValue")}else n=" ";var i=e.dimension(0);if(i.size()[0]!==r.length)throw new Wr(i.size()[0],r.length);var s=t.length;Jr(e.min()[0]),Jr(e.max()[0]);for(var a=[],o=0;o<s;o++)a[o]=t.charAt(o);if(i.forEach((function(t,e){a[t]=r.charAt(e[0]);})),a.length>s)for(var u=s-1,h=a.length;u<h;u++)a[u]||(a[u]=n);return a.join("")}function ca(t,e){if(1!==e.size().length)throw new Wr(e.size(),1);var r=e.dimension(0);if("string"!=typeof r)throw new TypeError("String expected as index to retrieve an object property");return ta(t,r)}function la(t,e,r){if(1!==e.size().length)throw new Wr(e.size(),1);var n=e.dimension(0);if("string"!=typeof n)throw new TypeError("String expected as index to retrieve an object property");var i=pr(t);return ea(i,n,r),i}var pa=cn("zeros",["typed","config","matrix","BigNumber"],(t=>{var{typed:e,config:r,matrix:n,BigNumber:i}=t;return e("zeros",{"":function(){return "Array"===r.matrix?s([]):s([],"default")},"...number | BigNumber | string":function(t){if("string"==typeof t[t.length-1]){var e=t.pop();return s(t,e)}return "Array"===r.matrix?s(t):s(t,"default")},Array:s,Matrix:function(t){var e=t.storage();return s(t.valueOf(),e)},"Array | Matrix, string":function(t,e){return s(t.valueOf(),e)}});function s(t,e){var r=function(t){var e=!1;return t.forEach((function(t,r,n){Oe(t)&&(e=!0,n[r]=t.toNumber());})),e}(t)?new i(0):0;if(function(t){t.forEach((function(t){if("number"!=typeof t||!Ar(t)||t<0)throw new Error("Parameters in function zeros must be positive integers")}));}(t),e){var s=n(e);return t.length>0?s.resize(t,r):s}var a=[];return t.length>0?Kr(a,t,r):a}})),fa=cn("format",["typed"],(t=>{var{typed:e}=t;return e("format",{any:Hr,"any, Object | function | number":Hr})})),da=cn("numeric",["number","?bignumber","?fraction"],(t=>{var{number:e,bignumber:r,fraction:n}=t,i={string:!0,number:!0,BigNumber:!0,Fraction:!0},s={number:t=>e(t),BigNumber:r?t=>r(t):Xs,Fraction:n?t=>n(t):Qs};return function(t,e){var r=lr(t);if(!(r in i))throw new TypeError("Cannot convert "+t+' of type "'+r+'"; valid input types are '+Object.keys(i).join(", "));if(!(e in s))throw new TypeError("Cannot convert "+t+' to type "'+e+'"; valid output types are '+Object.keys(s).join(", "));return e===r?t:s[e](t)}})),ma=cn("divideScalar",["typed","numeric"],(t=>{var{typed:e,numeric:r}=t;return e("divideScalar",{"number, number":function(t,e){return t/e},"Complex, Complex":function(t,e){return t.div(e)},"BigNumber, BigNumber":function(t,e){return t.div(e)},"Fraction, Fraction":function(t,e){return t.div(e)},"Unit, number | Fraction | BigNumber":function(t,e){var n=t.clone(),i=r(1,lr(e));return n.value=this(null===n.value?n._normalize(i):n.value,e),n},"number | Fraction | BigNumber, Unit":function(t,e){var n=e.clone();n=n.pow(-1);var i=r(1,lr(t));return n.value=this(t,null===e.value?e._normalize(i):e.value),n},"Unit, Unit":function(t,e){return t.divide(e)}})})),ya=cn("pow",["typed","config","identity","multiply","matrix","fraction","number","Complex"],(t=>{var{typed:e,config:r,identity:n,multiply:i,matrix:s,number:a,fraction:o,Complex:u}=t;return e("pow",{"number, number":h,"Complex, Complex":function(t,e){return t.pow(e)},"BigNumber, BigNumber":function(t,e){return e.isInteger()||t>=0||r.predictable?t.pow(e):new u(t.toNumber(),0).pow(e.toNumber(),0)},"Fraction, Fraction":function(t,e){if(1!==e.d){if(r.predictable)throw new Error("Function pow does not support non-integer exponents for fractions.");return h(t.valueOf(),e.valueOf())}return t.pow(e)},"Array, number":c,"Array, BigNumber":function(t,e){return c(t,e.toNumber())},"Matrix, number":l,"Matrix, BigNumber":function(t,e){return l(t,e.toNumber())},"Unit, number | BigNumber":function(t,e){return t.pow(e)}});function h(t,e){if(r.predictable&&!Ar(e)&&t<0)try{var n=o(e),i=a(n);if((e===i||Math.abs((e-i)/e)<1e-14)&&n.d%2==1)return (n.n%2==0?1:-1)*Math.pow(-t,e)}catch(s){}return r.predictable&&(t<-1&&e===1/0||t>-1&&t<0&&e===-1/0)?NaN:Ar(e)||t>=0||r.predictable?fs(t,e):t*t<1&&e===1/0||t*t>1&&e===-1/0?0:new u(t,0).pow(e,0)}function c(t,e){if(!Ar(e)||e<0)throw new TypeError("For A^b, b must be a positive integer (value is "+e+")");var r=Zr(t);if(2!==r.length)throw new Error("For A^b, A must be 2 dimensional (A has "+r.length+" dimensions)");if(r[0]!==r[1])throw new Error("For A^b, A must be square (size is "+r[0]+"x"+r[1]+")");for(var s=n(r[0]).valueOf(),a=t;e>=1;)1==(1&e)&&(s=i(a,s)),e>>=1,a=i(a,a);return s}function l(t,e){return s(c(t.valueOf(),e))}}));function ga(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n);}return r}function va(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ga(Object(r),!0).forEach((function(e){xa(t,e,r[e]);})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ga(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e));}));}return t}function xa(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var wa="Number of decimals in function round must be an integer",ba=cn("round",["typed","matrix","equalScalar","zeros","BigNumber","DenseMatrix"],(t=>{var{typed:e,matrix:r,equalScalar:n,zeros:i,BigNumber:s,DenseMatrix:a}=t,o=Ts({typed:e,equalScalar:n}),u=Ps({typed:e,DenseMatrix:a}),h=Os({typed:e});return e("round",va(va({},_a),{},{Complex:function(t){return t.round()},"Complex, number":function(t,e){if(e%1)throw new TypeError(wa);return t.round(e)},"Complex, BigNumber":function(t,e){if(!e.isInteger())throw new TypeError(wa);var r=e.toNumber();return t.round(r)},"number, BigNumber":function(t,e){if(!e.isInteger())throw new TypeError(wa);return new s(t).toDecimalPlaces(e.toNumber())},BigNumber:function(t){return t.toDecimalPlaces(0)},"BigNumber, BigNumber":function(t,e){if(!e.isInteger())throw new TypeError(wa);return t.toDecimalPlaces(e.toNumber())},Fraction:function(t){return t.round()},"Fraction, number":function(t,e){if(e%1)throw new TypeError(wa);return t.round(e)},"Array | Matrix":function(t){return is(t,this)},"SparseMatrix, number | BigNumber":function(t,e){return o(t,e,this,!1)},"DenseMatrix, number | BigNumber":function(t,e){return h(t,e,this,!1)},"number | Complex | BigNumber, SparseMatrix":function(t,e){return n(t,0)?i(e.size(),e.storage()):u(e,t,this,!0)},"number | Complex | BigNumber, DenseMatrix":function(t,e){return n(t,0)?i(e.size(),e.storage()):h(e,t,this,!0)},"Array, number | BigNumber":function(t,e){return h(r(t),e,this,!1).valueOf()},"number | Complex | BigNumber, Array":function(t,e){return h(r(e),t,this,!0).valueOf()}}))})),_a={number:ds,"number, number":function(t,e){if(!Ar(e))throw new TypeError(wa);if(e<0||e>15)throw new Error("Number of decimals in function round must be in te range of 0-15");return ds(t,e)}},Ma=cn("equal",["typed","matrix","equalScalar","DenseMatrix"],(t=>{var{typed:e,matrix:r,equalScalar:n,DenseMatrix:i}=t,s=Bs({typed:e}),a=$s({typed:e,DenseMatrix:i}),o=Ps({typed:e,DenseMatrix:i}),u=Is({typed:e}),h=Os({typed:e});return e("equal",{"any, any":function(t,e){return null===t?null===e:null===e?null===t:void 0===t?void 0===e:void 0===e?void 0===t:n(t,e)},"SparseMatrix, SparseMatrix":function(t,e){return a(t,e,n)},"SparseMatrix, DenseMatrix":function(t,e){return s(e,t,n,!0)},"DenseMatrix, SparseMatrix":function(t,e){return s(t,e,n,!1)},"DenseMatrix, DenseMatrix":function(t,e){return u(t,e,n)},"Array, Array":function(t,e){return this(r(t),r(e)).valueOf()},"Array, Matrix":function(t,e){return this(r(t),e)},"Matrix, Array":function(t,e){return this(t,r(e))},"SparseMatrix, any":function(t,e){return o(t,e,n,!1)},"DenseMatrix, any":function(t,e){return h(t,e,n,!1)},"any, SparseMatrix":function(t,e){return o(e,t,n,!0)},"any, DenseMatrix":function(t,e){return h(e,t,n,!0)},"Array, any":function(t,e){return h(r(t),e,n,!1).valueOf()},"any, Array":function(t,e){return h(r(e),t,n,!0).valueOf()}})}));cn("equal",["typed","equalScalar"],(t=>{var{typed:e,equalScalar:r}=t;return e("equal",{"any, any":function(t,e){return null===t?null===e:null===e?null===t:void 0===t?void 0===e:void 0===e?void 0===t:r(t,e)}})}));var Ea=cn("smaller",["typed","config","matrix","DenseMatrix"],(t=>{var{typed:e,config:r,matrix:n,DenseMatrix:i}=t,s=Bs({typed:e}),a=$s({typed:e,DenseMatrix:i}),o=Ps({typed:e,DenseMatrix:i}),u=Is({typed:e}),h=Os({typed:e});return e("smaller",{"boolean, boolean":function(t,e){return t<e},"number, number":function(t,e){return t<e&&!Pr(t,e,r.epsilon)},"BigNumber, BigNumber":function(t,e){return t.lt(e)&&!ys(t,e,r.epsilon)},"Fraction, Fraction":function(t,e){return -1===t.compare(e)},"Complex, Complex":function(t,e){throw new TypeError("No ordering relation is defined for complex numbers")},"Unit, Unit":function(t,e){if(!t.equalBase(e))throw new Error("Cannot compare units with different base");return this(t.value,e.value)},"SparseMatrix, SparseMatrix":function(t,e){return a(t,e,this)},"SparseMatrix, DenseMatrix":function(t,e){return s(e,t,this,!0)},"DenseMatrix, SparseMatrix":function(t,e){return s(t,e,this,!1)},"DenseMatrix, DenseMatrix":function(t,e){return u(t,e,this)},"Array, Array":function(t,e){return this(n(t),n(e)).valueOf()},"Array, Matrix":function(t,e){return this(n(t),e)},"Matrix, Array":function(t,e){return this(t,n(e))},"SparseMatrix, any":function(t,e){return o(t,e,this,!1)},"DenseMatrix, any":function(t,e){return h(t,e,this,!1)},"any, SparseMatrix":function(t,e){return o(e,t,this,!0)},"any, DenseMatrix":function(t,e){return h(e,t,this,!0)},"Array, any":function(t,e){return h(n(t),e,this,!1).valueOf()},"any, Array":function(t,e){return h(n(e),t,this,!0).valueOf()}})})),Na=cn("larger",["typed","config","matrix","DenseMatrix"],(t=>{var{typed:e,config:r,matrix:n,DenseMatrix:i}=t,s=Bs({typed:e}),a=$s({typed:e,DenseMatrix:i}),o=Ps({typed:e,DenseMatrix:i}),u=Is({typed:e}),h=Os({typed:e});return e("larger",{"boolean, boolean":function(t,e){return t>e},"number, number":function(t,e){return t>e&&!Pr(t,e,r.epsilon)},"BigNumber, BigNumber":function(t,e){return t.gt(e)&&!ys(t,e,r.epsilon)},"Fraction, Fraction":function(t,e){return 1===t.compare(e)},"Complex, Complex":function(){throw new TypeError("No ordering relation is defined for complex numbers")},"Unit, Unit":function(t,e){if(!t.equalBase(e))throw new Error("Cannot compare units with different base");return this(t.value,e.value)},"SparseMatrix, SparseMatrix":function(t,e){return a(t,e,this)},"SparseMatrix, DenseMatrix":function(t,e){return s(e,t,this,!0)},"DenseMatrix, SparseMatrix":function(t,e){return s(t,e,this,!1)},"DenseMatrix, DenseMatrix":function(t,e){return u(t,e,this)},"Array, Array":function(t,e){return this(n(t),n(e)).valueOf()},"Array, Matrix":function(t,e){return this(n(t),e)},"Matrix, Array":function(t,e){return this(t,n(e))},"SparseMatrix, any":function(t,e){return o(t,e,this,!1)},"DenseMatrix, any":function(t,e){return h(t,e,this,!1)},"any, SparseMatrix":function(t,e){return o(e,t,this,!0)},"any, DenseMatrix":function(t,e){return h(e,t,this,!0)},"Array, any":function(t,e){return h(n(t),e,this,!1).valueOf()},"any, Array":function(t,e){return h(n(e),t,this,!0).valueOf()}})})),Sa=cn("FibonacciHeap",["smaller","larger"],(t=>{var{smaller:e,larger:r}=t,n=1/Math.log((1+Math.sqrt(5))/2);function i(){if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator");this._minimum=null,this._size=0;}function s(t,e,r){e.left.right=e.right,e.right.left=e.left,r.degree--,r.child===e&&(r.child=e.right),0===r.degree&&(r.child=null),e.left=t,e.right=t.right,t.right=e,e.right.left=e,e.parent=null,e.mark=!1;}function a(t,e){var r=e.parent;r&&(e.mark?(s(t,e,r),a(r)):e.mark=!0);}i.prototype.type="FibonacciHeap",i.prototype.isFibonacciHeap=!0,i.prototype.insert=function(t,r){var n={key:t,value:r,degree:0};if(this._minimum){var i=this._minimum;n.left=i,n.right=i.right,i.right=n,n.right.left=n,e(t,i.key)&&(this._minimum=n);}else n.left=n,n.right=n,this._minimum=n;return this._size++,n},i.prototype.size=function(){return this._size},i.prototype.clear=function(){this._minimum=null,this._size=0;},i.prototype.isEmpty=function(){return 0===this._size},i.prototype.extractMinimum=function(){var t=this._minimum;if(null===t)return t;for(var i=this._minimum,s=t.degree,a=t.child;s>0;){var u=a.right;a.left.right=a.right,a.right.left=a.left,a.left=i,a.right=i.right,i.right=a,a.right.left=a,a.parent=null,a=u,s--;}return t.left.right=t.right,t.right.left=t.left,i=t===t.right?null:function(t,i){var s,a=Math.floor(Math.log(i)*n)+1,u=new Array(a),h=0,c=t;if(c)for(h++,c=c.right;c!==t;)h++,c=c.right;for(;h>0;){for(var l=c.degree,p=c.right;s=u[l];){if(r(c.key,s.key)){var f=s;s=c,c=f;}o(s,c),u[l]=null,l++;}u[l]=c,c=p,h--;}t=null;for(var d=0;d<a;d++)(s=u[d])&&(t?(s.left.right=s.right,s.right.left=s.left,s.left=t,s.right=t.right,t.right=s,s.right.left=s,e(s.key,t.key)&&(t=s)):t=s);return t}(i=t.right,this._size),this._size--,this._minimum=i,t},i.prototype.remove=function(t){this._minimum=function(t,r,n){r.key=n;var i=r.parent;i&&e(r.key,i.key)&&(s(t,r,i),a(t,i));e(r.key,t.key)&&(t=r);return t}(this._minimum,t,-1),this.extractMinimum();};var o=function(t,e){t.left.right=t.right,t.right.left=t.left,t.parent=e,e.child?(t.left=e.child,t.right=e.child.right,e.child.right=t,t.right.left=t):(e.child=t,t.right=t,t.left=t),e.degree++,t.mark=!1;};return i}),{isClass:!0}),Ta=cn("Spa",["addScalar","equalScalar","FibonacciHeap"],(t=>{var{addScalar:e,equalScalar:r,FibonacciHeap:n}=t;function i(){if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator");this._values=[],this._heap=new n;}return i.prototype.type="Spa",i.prototype.isSpa=!0,i.prototype.set=function(t,e){if(this._values[t])this._values[t].value=e;else {var r=this._heap.insert(t,e);this._values[t]=r;}},i.prototype.get=function(t){var e=this._values[t];return e?e.value:0},i.prototype.accumulate=function(t,r){var n=this._values[t];n?n.value=e(n.value,r):(n=this._heap.insert(t,r),this._values[t]=n);},i.prototype.forEach=function(t,e,n){var i=this._heap,s=this._values,a=[],o=i.extractMinimum();for(o&&a.push(o);o&&o.key<=e;)o.key>=t&&(r(o.value,0)||n(o.key,o.value,this)),(o=i.extractMinimum())&&a.push(o);for(var u=0;u<a.length;u++){var h=a[u];s[(o=i.insert(h.key,h.value)).key]=o;}},i.prototype.swap=function(t,e){var r=this._values[t],n=this._values[e];if(!r&&n)r=this._heap.insert(t,n.value),this._heap.remove(n),this._values[t]=r,this._values[e]=void 0;else if(r&&!n)n=this._heap.insert(e,r.value),this._heap.remove(r),this._values[e]=n,this._values[t]=void 0;else if(r&&n){var i=r.value;r.value=n.value,n.value=i;}},i}),{isClass:!0});Ys((function(t){return new t(1).exp()}),{hasher:za}),Ys((function(t){return new t(1).plus(new t(5).sqrt()).div(2)}),{hasher:za});var Oa=Ys((function(t){return t.acos(-1)}),{hasher:za});function za(t){return t[0].precision}function Aa(){return (Aa=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n]);}return t}).apply(this,arguments)}function Ca(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n);}return r}function Ra(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?Ca(Object(r),!0).forEach((function(e){Da(t,e,r[e]);})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Ca(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e));}));}return t}function Da(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}Ys((function(t){return Oa(t).times(2)}),{hasher:za});var ka=cn("Unit",["?on","config","addScalar","subtract","multiplyScalar","divideScalar","pow","abs","fix","round","equal","isNumeric","format","number","Complex","BigNumber","Fraction"],(t=>{var e,r,n,{on:i,config:s,addScalar:a,subtract:o,multiplyScalar:u,divideScalar:h,pow:c,abs:l,fix:p,round:f,equal:d,isNumeric:m,format:y,number:g,Complex:v,BigNumber:x,Fraction:w}=t,b=g;function _(t,e){if(!(this instanceof _))throw new Error("Constructor must be called with the new operator");if(null!=t&&!m(t)&&!ze(t))throw new TypeError("First parameter in Unit constructor must be number, BigNumber, Fraction, Complex, or undefined");if(void 0!==e&&("string"!=typeof e||""===e))throw new TypeError("Second parameter in Unit constructor must be a string");if(void 0!==e){var r=_.parse(e);this.units=r.units,this.dimensions=r.dimensions;}else {this.units=[{unit:L,prefix:R.NONE,power:0}],this.dimensions=[];for(var n=0;n<D.length;n++)this.dimensions[n]=0;}this.value=null!=t?this._normalize(t):null,this.fixPrefix=!1,this.skipAutomaticSimplification=!0;}function M(){for(;" "===n||"\t"===n;)N();}function E(t){return t>="0"&&t<="9"}function N(){r++,n=e.charAt(r);}function S(t){r=t,n=e.charAt(r);}function T(){var t,e="",i=r;if("+"===n?N():"-"===n&&(e+=n,N()),!((t=n)>="0"&&t<="9"||"."===t))return S(i),null;if("."===n){if(e+=n,N(),!E(n))return S(i),null}else {for(;E(n);)e+=n,N();"."===n&&(e+=n,N());}for(;E(n);)e+=n,N();if("E"===n||"e"===n){var s="",a=r;if(s+=n,N(),"+"!==n&&"-"!==n||(s+=n,N()),!E(n))return S(a),e;for(e+=s;E(n);)e+=n,N();}return e}function O(){for(var t="";E(n)||_.isValidAlpha(n);)t+=n,N();var e=t.charAt(0);return _.isValidAlpha(e)?t:null}function z(t){return n===t?(N(),t):null}_.prototype.type="Unit",_.prototype.isUnit=!0,_.parse=function(t,i){if(i=i||{},r=-1,n="","string"!=typeof(e=t))throw new TypeError("Invalid argument in Unit.parse, string expected");var a=new _;a.units=[];var o=1,u=!1;N(),M();var h=T(),c=null;if(h){if("BigNumber"===s.number)c=new x(h);else if("Fraction"===s.number)try{c=new w(h);}catch(E){c=parseFloat(h);}else c=parseFloat(h);M(),z("*")?(o=1,u=!0):z("/")&&(o=-1,u=!0);}for(var l=[],p=1;;){for(M();"("===n;)l.push(o),p*=o,o=1,N(),M();var f=void 0;if(!n)break;var d=n;if(null===(f=O()))throw new SyntaxError('Unexpected "'+d+'" in "'+e+'" at index '+r.toString());var m=A(f);if(null===m)throw new SyntaxError('Unit "'+f+'" not found.');var y=o*p;if(M(),z("^")){M();var g=T();if(null===g)throw new SyntaxError('In "'+t+'", "^" must be followed by a floating-point number');y*=g;}a.units.push({unit:m.unit,prefix:m.prefix,power:y});for(var v=0;v<D.length;v++)a.dimensions[v]+=(m.unit.dimensions[v]||0)*y;for(M();")"===n;){if(0===l.length)throw new SyntaxError('Unmatched ")" in "'+e+'" at index '+r.toString());p/=l.pop(),N(),M();}if(u=!1,z("*")?(o=1,u=!0):z("/")?(o=-1,u=!0):o=1,m.unit.base){var b=m.unit.base.key;U.auto[b]={unit:m.unit,prefix:m.prefix};}}if(M(),n)throw new SyntaxError('Could not parse: "'+t+'"');if(u)throw new SyntaxError('Trailing characters: "'+t+'"');if(0!==l.length)throw new SyntaxError('Unmatched "(" in "'+e+'"');if(0===a.units.length&&!i.allowNoUnits)throw new SyntaxError('"'+t+'" contains no units');return a.value=void 0!==c?a._normalize(c):null,a},_.prototype.clone=function(){var t=new _;t.fixPrefix=this.fixPrefix,t.skipAutomaticSimplification=this.skipAutomaticSimplification,t.value=pr(this.value),t.dimensions=this.dimensions.slice(0),t.units=[];for(var e=0;e<this.units.length;e++)for(var r in t.units[e]={},this.units[e])wr(this.units[e],r)&&(t.units[e][r]=this.units[e][r]);return t},_.prototype._isDerived=function(){return 0!==this.units.length&&(this.units.length>1||Math.abs(this.units[0].power-1)>1e-15)},_.prototype._normalize=function(t){var e,r,n,i,s;if(null==t||0===this.units.length)return t;if(this._isDerived()){var o=t;s=_._getNumberConverter(lr(t));for(var h=0;h<this.units.length;h++)e=s(this.units[h].unit.value),i=s(this.units[h].prefix.value),n=s(this.units[h].power),o=u(o,c(u(e,i),n));return o}return e=(s=_._getNumberConverter(lr(t)))(this.units[0].unit.value),r=s(this.units[0].unit.offset),i=s(this.units[0].prefix.value),u(a(t,r),u(e,i))},_.prototype._denormalize=function(t,e){var r,n,i,s,a;if(null==t||0===this.units.length)return t;if(this._isDerived()){var l=t;a=_._getNumberConverter(lr(t));for(var p=0;p<this.units.length;p++)r=a(this.units[p].unit.value),s=a(this.units[p].prefix.value),i=a(this.units[p].power),l=h(l,c(u(r,s),i));return l}return r=(a=_._getNumberConverter(lr(t)))(this.units[0].unit.value),s=a(this.units[0].prefix.value),n=a(this.units[0].unit.offset),o(h(h(t,r),null==e?s:e),n)};var A=Ys((t=>{if(wr(B,t)){var e=B[t];return {unit:e,prefix:e.prefixes[""]}}for(var r in B)if(wr(B,r)&&qr(t,r)){var n=B[r],i=t.length-r.length,s=t.substring(0,i),a=wr(n.prefixes,s)?n.prefixes[s]:void 0;if(void 0!==a)return {unit:n,prefix:a}}return null}),{hasher:t=>t[0],limit:100});function C(t){return t.equalBase(k.NONE)&&null!==t.value&&!s.predictable?t.value:t}_.isValuelessUnit=function(t){return null!==A(t)},_.prototype.hasBase=function(t){if("string"==typeof t&&(t=k[t]),!t)return !1;for(var e=0;e<D.length;e++)if(Math.abs((this.dimensions[e]||0)-(t.dimensions[e]||0))>1e-12)return !1;return !0},_.prototype.equalBase=function(t){for(var e=0;e<D.length;e++)if(Math.abs((this.dimensions[e]||0)-(t.dimensions[e]||0))>1e-12)return !1;return !0},_.prototype.equals=function(t){return this.equalBase(t)&&d(this.value,t.value)},_.prototype.multiply=function(t){for(var e=this.clone(),r=0;r<D.length;r++)e.dimensions[r]=(this.dimensions[r]||0)+(t.dimensions[r]||0);for(var n=0;n<t.units.length;n++){var i=Ra({},t.units[n]);e.units.push(i);}if(null!==this.value||null!==t.value){var s=null===this.value?this._normalize(1):this.value,a=null===t.value?t._normalize(1):t.value;e.value=u(s,a);}else e.value=null;return e.skipAutomaticSimplification=!1,C(e)},_.prototype.divide=function(t){for(var e=this.clone(),r=0;r<D.length;r++)e.dimensions[r]=(this.dimensions[r]||0)-(t.dimensions[r]||0);for(var n=0;n<t.units.length;n++){var i=Ra(Ra({},t.units[n]),{},{power:-t.units[n].power});e.units.push(i);}if(null!==this.value||null!==t.value){var s=null===this.value?this._normalize(1):this.value,a=null===t.value?t._normalize(1):t.value;e.value=h(s,a);}else e.value=null;return e.skipAutomaticSimplification=!1,C(e)},_.prototype.pow=function(t){for(var e=this.clone(),r=0;r<D.length;r++)e.dimensions[r]=(this.dimensions[r]||0)*t;for(var n=0;n<e.units.length;n++)e.units[n].power*=t;return null!==e.value?e.value=c(e.value,t):e.value=null,e.skipAutomaticSimplification=!1,C(e)},_.prototype.abs=function(){var t=this.clone();for(var e in t.value=null!==t.value?l(t.value):null,t.units)"VA"!==t.units[e].unit.name&&"VAR"!==t.units[e].unit.name||(t.units[e].unit=B.W);return t},_.prototype.to=function(t){var e,r=null===this.value?this._normalize(1):this.value;if("string"==typeof t){if(e=_.parse(t),!this.equalBase(e))throw new Error("Units do not match ('".concat(e.toString(),"' != '").concat(this.toString(),"')"));if(null!==e.value)throw new Error("Cannot convert to a unit with a value");return e.value=pr(r),e.fixPrefix=!0,e.skipAutomaticSimplification=!0,e}if(Ce(t)){if(!this.equalBase(t))throw new Error("Units do not match ('".concat(t.toString(),"' != '").concat(this.toString(),"')"));if(null!==t.value)throw new Error("Cannot convert to a unit with a value");return (e=t.clone()).value=pr(r),e.fixPrefix=!0,e.skipAutomaticSimplification=!0,e}throw new Error("String or Unit expected as parameter")},_.prototype.toNumber=function(t){return b(this.toNumeric(t))},_.prototype.toNumeric=function(t){var e;return (e=t?this.to(t):this.clone())._isDerived()||0===e.units.length?e._denormalize(e.value):e._denormalize(e.value,e.units[0].prefix.value)},_.prototype.toString=function(){return this.format()},_.prototype.toJSON=function(){return {mathjs:"Unit",value:this._denormalize(this.value),unit:this.formatUnits(),fixPrefix:this.fixPrefix}},_.fromJSON=function(t){var e=new _(t.value,t.unit);return e.fixPrefix=t.fixPrefix||!1,e},_.prototype.valueOf=_.prototype.toString,_.prototype.simplify=function(){var t,e,r=this.clone(),n=[];for(var i in j)if(wr(j,i)&&r.hasBase(k[i])){t=i;break}if("NONE"===t)r.units=[];else if(t&&wr(j,t)&&(e=j[t]),e)r.units=[{unit:e.unit,prefix:e.prefix,power:1}];else {for(var s=!1,a=0;a<D.length;a++){var o=D[a];Math.abs(r.dimensions[a]||0)>1e-12&&(wr(j,o)?n.push({unit:j[o].unit,prefix:j[o].prefix,power:r.dimensions[a]||0}):s=!0);}n.length<r.units.length&&!s&&(r.units=n);}return r},_.prototype.toSI=function(){for(var t=this.clone(),e=[],r=0;r<D.length;r++){var n=D[r];if(Math.abs(t.dimensions[r]||0)>1e-12){if(!wr(U.si,n))throw new Error("Cannot express custom unit "+n+" in SI units");e.push({unit:U.si[n].unit,prefix:U.si[n].prefix,power:t.dimensions[r]||0});}}return t.units=e,t.fixPrefix=!0,t.skipAutomaticSimplification=!0,t},_.prototype.formatUnits=function(){for(var t="",e="",r=0,n=0,i=0;i<this.units.length;i++)this.units[i].power>0?(r++,t+=" "+this.units[i].prefix.name+this.units[i].unit.name,Math.abs(this.units[i].power-1)>1e-15&&(t+="^"+this.units[i].power)):this.units[i].power<0&&n++;if(n>0)for(var s=0;s<this.units.length;s++)this.units[s].power<0&&(r>0?(e+=" "+this.units[s].prefix.name+this.units[s].unit.name,Math.abs(this.units[s].power+1)>1e-15&&(e+="^"+-this.units[s].power)):(e+=" "+this.units[s].prefix.name+this.units[s].unit.name,e+="^"+this.units[s].power));t=t.substr(1),e=e.substr(1),r>1&&n>0&&(t="("+t+")"),n>1&&r>0&&(e="("+e+")");var a=t;return r>0&&n>0&&(a+=" / "),a+=e},_.prototype.format=function(t){var e=this.skipAutomaticSimplification||null===this.value?this.clone():this.simplify(),r=!1;for(var n in void 0!==e.value&&null!==e.value&&ze(e.value)&&(r=Math.abs(e.value.re)<1e-14),e.units)wr(e.units,n)&&e.units[n].unit&&("VA"===e.units[n].unit.name&&r?e.units[n].unit=B.VAR:"VAR"!==e.units[n].unit.name||r||(e.units[n].unit=B.VA));1!==e.units.length||e.fixPrefix||Math.abs(e.units[0].power-Math.round(e.units[0].power))<1e-14&&(e.units[0].prefix=e._bestPrefix());var i=e._denormalize(e.value),s=null!==e.value?y(i,t||{}):"",a=e.formatUnits();return e.value&&ze(e.value)&&(s="("+s+")"),a.length>0&&s.length>0&&(s+=" "),s+=a},_.prototype._bestPrefix=function(){if(1!==this.units.length)throw new Error("Can only compute the best prefix for single units with integer powers, like kg, s^2, N^-1, and so forth!");if(Math.abs(this.units[0].power-Math.round(this.units[0].power))>=1e-14)throw new Error("Can only compute the best prefix for single units with integer powers, like kg, s^2, N^-1, and so forth!");var t=null!==this.value?l(this.value):0,e=l(this.units[0].unit.value),r=this.units[0].prefix;if(0===t)return r;var n=this.units[0].power,i=Math.log(t/Math.pow(r.value*e,n))/Math.LN10-1.2;if(i>-2.200001&&i<1.800001)return r;i=Math.abs(i);var s=this.units[0].unit.prefixes;for(var a in s)if(wr(s,a)){var o=s[a];if(o.scientific){var u=Math.abs(Math.log(t/Math.pow(o.value*e,n))/Math.LN10-1.2);(u<i||u===i&&o.name.length<r.name.length)&&(r=o,i=u);}}return r},_.prototype.splitUnit=function(t){for(var e=this.clone(),r=[],n=0;n<t.length&&(e=e.to(t[n]),n!==t.length-1);n++){var i=e.toNumeric(),s=f(i),u=new _(d(s,i)?s:p(e.toNumeric()),t[n].toString());r.push(u),e=o(e,u);}for(var h=0,c=0;c<r.length;c++)h=a(h,r[c].value);return d(h,this.value)&&(e.value=0),r.push(e),r};var R={NONE:{"":{name:"",value:1,scientific:!0}},SHORT:{"":{name:"",value:1,scientific:!0},da:{name:"da",value:10,scientific:!1},h:{name:"h",value:100,scientific:!1},k:{name:"k",value:1e3,scientific:!0},M:{name:"M",value:1e6,scientific:!0},G:{name:"G",value:1e9,scientific:!0},T:{name:"T",value:1e12,scientific:!0},P:{name:"P",value:1e15,scientific:!0},E:{name:"E",value:1e18,scientific:!0},Z:{name:"Z",value:1e21,scientific:!0},Y:{name:"Y",value:1e24,scientific:!0},d:{name:"d",value:.1,scientific:!1},c:{name:"c",value:.01,scientific:!1},m:{name:"m",value:.001,scientific:!0},u:{name:"u",value:1e-6,scientific:!0},n:{name:"n",value:1e-9,scientific:!0},p:{name:"p",value:1e-12,scientific:!0},f:{name:"f",value:1e-15,scientific:!0},a:{name:"a",value:1e-18,scientific:!0},z:{name:"z",value:1e-21,scientific:!0},y:{name:"y",value:1e-24,scientific:!0}},LONG:{"":{name:"",value:1,scientific:!0},deca:{name:"deca",value:10,scientific:!1},hecto:{name:"hecto",value:100,scientific:!1},kilo:{name:"kilo",value:1e3,scientific:!0},mega:{name:"mega",value:1e6,scientific:!0},giga:{name:"giga",value:1e9,scientific:!0},tera:{name:"tera",value:1e12,scientific:!0},peta:{name:"peta",value:1e15,scientific:!0},exa:{name:"exa",value:1e18,scientific:!0},zetta:{name:"zetta",value:1e21,scientific:!0},yotta:{name:"yotta",value:1e24,scientific:!0},deci:{name:"deci",value:.1,scientific:!1},centi:{name:"centi",value:.01,scientific:!1},milli:{name:"milli",value:.001,scientific:!0},micro:{name:"micro",value:1e-6,scientific:!0},nano:{name:"nano",value:1e-9,scientific:!0},pico:{name:"pico",value:1e-12,scientific:!0},femto:{name:"femto",value:1e-15,scientific:!0},atto:{name:"atto",value:1e-18,scientific:!0},zepto:{name:"zepto",value:1e-21,scientific:!0},yocto:{name:"yocto",value:1e-24,scientific:!0}},SQUARED:{"":{name:"",value:1,scientific:!0},da:{name:"da",value:100,scientific:!1},h:{name:"h",value:1e4,scientific:!1},k:{name:"k",value:1e6,scientific:!0},M:{name:"M",value:1e12,scientific:!0},G:{name:"G",value:1e18,scientific:!0},T:{name:"T",value:1e24,scientific:!0},P:{name:"P",value:1e30,scientific:!0},E:{name:"E",value:1e36,scientific:!0},Z:{name:"Z",value:1e42,scientific:!0},Y:{name:"Y",value:1e48,scientific:!0},d:{name:"d",value:.01,scientific:!1},c:{name:"c",value:1e-4,scientific:!1},m:{name:"m",value:1e-6,scientific:!0},u:{name:"u",value:1e-12,scientific:!0},n:{name:"n",value:1e-18,scientific:!0},p:{name:"p",value:1e-24,scientific:!0},f:{name:"f",value:1e-30,scientific:!0},a:{name:"a",value:1e-36,scientific:!0},z:{name:"z",value:1e-42,scientific:!0},y:{name:"y",value:1e-48,scientific:!0}},CUBIC:{"":{name:"",value:1,scientific:!0},da:{name:"da",value:1e3,scientific:!1},h:{name:"h",value:1e6,scientific:!1},k:{name:"k",value:1e9,scientific:!0},M:{name:"M",value:1e18,scientific:!0},G:{name:"G",value:1e27,scientific:!0},T:{name:"T",value:1e36,scientific:!0},P:{name:"P",value:1e45,scientific:!0},E:{name:"E",value:1e54,scientific:!0},Z:{name:"Z",value:1e63,scientific:!0},Y:{name:"Y",value:1e72,scientific:!0},d:{name:"d",value:.001,scientific:!1},c:{name:"c",value:1e-6,scientific:!1},m:{name:"m",value:1e-9,scientific:!0},u:{name:"u",value:1e-18,scientific:!0},n:{name:"n",value:1e-27,scientific:!0},p:{name:"p",value:1e-36,scientific:!0},f:{name:"f",value:1e-45,scientific:!0},a:{name:"a",value:1e-54,scientific:!0},z:{name:"z",value:1e-63,scientific:!0},y:{name:"y",value:1e-72,scientific:!0}},BINARY_SHORT_SI:{"":{name:"",value:1,scientific:!0},k:{name:"k",value:1e3,scientific:!0},M:{name:"M",value:1e6,scientific:!0},G:{name:"G",value:1e9,scientific:!0},T:{name:"T",value:1e12,scientific:!0},P:{name:"P",value:1e15,scientific:!0},E:{name:"E",value:1e18,scientific:!0},Z:{name:"Z",value:1e21,scientific:!0},Y:{name:"Y",value:1e24,scientific:!0}},BINARY_SHORT_IEC:{"":{name:"",value:1,scientific:!0},Ki:{name:"Ki",value:1024,scientific:!0},Mi:{name:"Mi",value:Math.pow(1024,2),scientific:!0},Gi:{name:"Gi",value:Math.pow(1024,3),scientific:!0},Ti:{name:"Ti",value:Math.pow(1024,4),scientific:!0},Pi:{name:"Pi",value:Math.pow(1024,5),scientific:!0},Ei:{name:"Ei",value:Math.pow(1024,6),scientific:!0},Zi:{name:"Zi",value:Math.pow(1024,7),scientific:!0},Yi:{name:"Yi",value:Math.pow(1024,8),scientific:!0}},BINARY_LONG_SI:{"":{name:"",value:1,scientific:!0},kilo:{name:"kilo",value:1e3,scientific:!0},mega:{name:"mega",value:1e6,scientific:!0},giga:{name:"giga",value:1e9,scientific:!0},tera:{name:"tera",value:1e12,scientific:!0},peta:{name:"peta",value:1e15,scientific:!0},exa:{name:"exa",value:1e18,scientific:!0},zetta:{name:"zetta",value:1e21,scientific:!0},yotta:{name:"yotta",value:1e24,scientific:!0}},BINARY_LONG_IEC:{"":{name:"",value:1,scientific:!0},kibi:{name:"kibi",value:1024,scientific:!0},mebi:{name:"mebi",value:Math.pow(1024,2),scientific:!0},gibi:{name:"gibi",value:Math.pow(1024,3),scientific:!0},tebi:{name:"tebi",value:Math.pow(1024,4),scientific:!0},pebi:{name:"pebi",value:Math.pow(1024,5),scientific:!0},exi:{name:"exi",value:Math.pow(1024,6),scientific:!0},zebi:{name:"zebi",value:Math.pow(1024,7),scientific:!0},yobi:{name:"yobi",value:Math.pow(1024,8),scientific:!0}},BTU:{"":{name:"",value:1,scientific:!0},MM:{name:"MM",value:1e6,scientific:!0}}};R.SHORTLONG=Aa({},R.SHORT,R.LONG),R.BINARY_SHORT=Aa({},R.BINARY_SHORT_SI,R.BINARY_SHORT_IEC),R.BINARY_LONG=Aa({},R.BINARY_LONG_SI,R.BINARY_LONG_IEC);var D=["MASS","LENGTH","TIME","CURRENT","TEMPERATURE","LUMINOUS_INTENSITY","AMOUNT_OF_SUBSTANCE","ANGLE","BIT"],k={NONE:{dimensions:[0,0,0,0,0,0,0,0,0]},MASS:{dimensions:[1,0,0,0,0,0,0,0,0]},LENGTH:{dimensions:[0,1,0,0,0,0,0,0,0]},TIME:{dimensions:[0,0,1,0,0,0,0,0,0]},CURRENT:{dimensions:[0,0,0,1,0,0,0,0,0]},TEMPERATURE:{dimensions:[0,0,0,0,1,0,0,0,0]},LUMINOUS_INTENSITY:{dimensions:[0,0,0,0,0,1,0,0,0]},AMOUNT_OF_SUBSTANCE:{dimensions:[0,0,0,0,0,0,1,0,0]},FORCE:{dimensions:[1,1,-2,0,0,0,0,0,0]},SURFACE:{dimensions:[0,2,0,0,0,0,0,0,0]},VOLUME:{dimensions:[0,3,0,0,0,0,0,0,0]},ENERGY:{dimensions:[1,2,-2,0,0,0,0,0,0]},POWER:{dimensions:[1,2,-3,0,0,0,0,0,0]},PRESSURE:{dimensions:[1,-1,-2,0,0,0,0,0,0]},ELECTRIC_CHARGE:{dimensions:[0,0,1,1,0,0,0,0,0]},ELECTRIC_CAPACITANCE:{dimensions:[-1,-2,4,2,0,0,0,0,0]},ELECTRIC_POTENTIAL:{dimensions:[1,2,-3,-1,0,0,0,0,0]},ELECTRIC_RESISTANCE:{dimensions:[1,2,-3,-2,0,0,0,0,0]},ELECTRIC_INDUCTANCE:{dimensions:[1,2,-2,-2,0,0,0,0,0]},ELECTRIC_CONDUCTANCE:{dimensions:[-1,-2,3,2,0,0,0,0,0]},MAGNETIC_FLUX:{dimensions:[1,2,-2,-1,0,0,0,0,0]},MAGNETIC_FLUX_DENSITY:{dimensions:[1,0,-2,-1,0,0,0,0,0]},FREQUENCY:{dimensions:[0,0,-1,0,0,0,0,0,0]},ANGLE:{dimensions:[0,0,0,0,0,0,0,1,0]},BIT:{dimensions:[0,0,0,0,0,0,0,0,1]}};for(var I in k)wr(k,I)&&(k[I].key=I);var L={name:"",base:{},value:1,offset:0,dimensions:D.map((t=>0))},B={meter:{name:"meter",base:k.LENGTH,prefixes:R.LONG,value:1,offset:0},inch:{name:"inch",base:k.LENGTH,prefixes:R.NONE,value:.0254,offset:0},foot:{name:"foot",base:k.LENGTH,prefixes:R.NONE,value:.3048,offset:0},yard:{name:"yard",base:k.LENGTH,prefixes:R.NONE,value:.9144,offset:0},mile:{name:"mile",base:k.LENGTH,prefixes:R.NONE,value:1609.344,offset:0},link:{name:"link",base:k.LENGTH,prefixes:R.NONE,value:.201168,offset:0},rod:{name:"rod",base:k.LENGTH,prefixes:R.NONE,value:5.0292,offset:0},chain:{name:"chain",base:k.LENGTH,prefixes:R.NONE,value:20.1168,offset:0},angstrom:{name:"angstrom",base:k.LENGTH,prefixes:R.NONE,value:1e-10,offset:0},m:{name:"m",base:k.LENGTH,prefixes:R.SHORT,value:1,offset:0},in:{name:"in",base:k.LENGTH,prefixes:R.NONE,value:.0254,offset:0},ft:{name:"ft",base:k.LENGTH,prefixes:R.NONE,value:.3048,offset:0},yd:{name:"yd",base:k.LENGTH,prefixes:R.NONE,value:.9144,offset:0},mi:{name:"mi",base:k.LENGTH,prefixes:R.NONE,value:1609.344,offset:0},li:{name:"li",base:k.LENGTH,prefixes:R.NONE,value:.201168,offset:0},rd:{name:"rd",base:k.LENGTH,prefixes:R.NONE,value:5.02921,offset:0},ch:{name:"ch",base:k.LENGTH,prefixes:R.NONE,value:20.1168,offset:0},mil:{name:"mil",base:k.LENGTH,prefixes:R.NONE,value:254e-7,offset:0},m2:{name:"m2",base:k.SURFACE,prefixes:R.SQUARED,value:1,offset:0},sqin:{name:"sqin",base:k.SURFACE,prefixes:R.NONE,value:64516e-8,offset:0},sqft:{name:"sqft",base:k.SURFACE,prefixes:R.NONE,value:.09290304,offset:0},sqyd:{name:"sqyd",base:k.SURFACE,prefixes:R.NONE,value:.83612736,offset:0},sqmi:{name:"sqmi",base:k.SURFACE,prefixes:R.NONE,value:2589988.110336,offset:0},sqrd:{name:"sqrd",base:k.SURFACE,prefixes:R.NONE,value:25.29295,offset:0},sqch:{name:"sqch",base:k.SURFACE,prefixes:R.NONE,value:404.6873,offset:0},sqmil:{name:"sqmil",base:k.SURFACE,prefixes:R.NONE,value:6.4516e-10,offset:0},acre:{name:"acre",base:k.SURFACE,prefixes:R.NONE,value:4046.86,offset:0},hectare:{name:"hectare",base:k.SURFACE,prefixes:R.NONE,value:1e4,offset:0},m3:{name:"m3",base:k.VOLUME,prefixes:R.CUBIC,value:1,offset:0},L:{name:"L",base:k.VOLUME,prefixes:R.SHORT,value:.001,offset:0},l:{name:"l",base:k.VOLUME,prefixes:R.SHORT,value:.001,offset:0},litre:{name:"litre",base:k.VOLUME,prefixes:R.LONG,value:.001,offset:0},cuin:{name:"cuin",base:k.VOLUME,prefixes:R.NONE,value:16387064e-12,offset:0},cuft:{name:"cuft",base:k.VOLUME,prefixes:R.NONE,value:.028316846592,offset:0},cuyd:{name:"cuyd",base:k.VOLUME,prefixes:R.NONE,value:.764554857984,offset:0},teaspoon:{name:"teaspoon",base:k.VOLUME,prefixes:R.NONE,value:5e-6,offset:0},tablespoon:{name:"tablespoon",base:k.VOLUME,prefixes:R.NONE,value:15e-6,offset:0},drop:{name:"drop",base:k.VOLUME,prefixes:R.NONE,value:5e-8,offset:0},gtt:{name:"gtt",base:k.VOLUME,prefixes:R.NONE,value:5e-8,offset:0},minim:{name:"minim",base:k.VOLUME,prefixes:R.NONE,value:6.161152e-8,offset:0},fluiddram:{name:"fluiddram",base:k.VOLUME,prefixes:R.NONE,value:36966911e-13,offset:0},fluidounce:{name:"fluidounce",base:k.VOLUME,prefixes:R.NONE,value:2957353e-11,offset:0},gill:{name:"gill",base:k.VOLUME,prefixes:R.NONE,value:.0001182941,offset:0},cc:{name:"cc",base:k.VOLUME,prefixes:R.NONE,value:1e-6,offset:0},cup:{name:"cup",base:k.VOLUME,prefixes:R.NONE,value:.0002365882,offset:0},pint:{name:"pint",base:k.VOLUME,prefixes:R.NONE,value:.0004731765,offset:0},quart:{name:"quart",base:k.VOLUME,prefixes:R.NONE,value:.0009463529,offset:0},gallon:{name:"gallon",base:k.VOLUME,prefixes:R.NONE,value:.003785412,offset:0},beerbarrel:{name:"beerbarrel",base:k.VOLUME,prefixes:R.NONE,value:.1173478,offset:0},oilbarrel:{name:"oilbarrel",base:k.VOLUME,prefixes:R.NONE,value:.1589873,offset:0},hogshead:{name:"hogshead",base:k.VOLUME,prefixes:R.NONE,value:.238481,offset:0},fldr:{name:"fldr",base:k.VOLUME,prefixes:R.NONE,value:36966911e-13,offset:0},floz:{name:"floz",base:k.VOLUME,prefixes:R.NONE,value:2957353e-11,offset:0},gi:{name:"gi",base:k.VOLUME,prefixes:R.NONE,value:.0001182941,offset:0},cp:{name:"cp",base:k.VOLUME,prefixes:R.NONE,value:.0002365882,offset:0},pt:{name:"pt",base:k.VOLUME,prefixes:R.NONE,value:.0004731765,offset:0},qt:{name:"qt",base:k.VOLUME,prefixes:R.NONE,value:.0009463529,offset:0},gal:{name:"gal",base:k.VOLUME,prefixes:R.NONE,value:.003785412,offset:0},bbl:{name:"bbl",base:k.VOLUME,prefixes:R.NONE,value:.1173478,offset:0},obl:{name:"obl",base:k.VOLUME,prefixes:R.NONE,value:.1589873,offset:0},g:{name:"g",base:k.MASS,prefixes:R.SHORT,value:.001,offset:0},gram:{name:"gram",base:k.MASS,prefixes:R.LONG,value:.001,offset:0},ton:{name:"ton",base:k.MASS,prefixes:R.SHORT,value:907.18474,offset:0},t:{name:"t",base:k.MASS,prefixes:R.SHORT,value:1e3,offset:0},tonne:{name:"tonne",base:k.MASS,prefixes:R.LONG,value:1e3,offset:0},grain:{name:"grain",base:k.MASS,prefixes:R.NONE,value:6479891e-11,offset:0},dram:{name:"dram",base:k.MASS,prefixes:R.NONE,value:.0017718451953125,offset:0},ounce:{name:"ounce",base:k.MASS,prefixes:R.NONE,value:.028349523125,offset:0},poundmass:{name:"poundmass",base:k.MASS,prefixes:R.NONE,value:.45359237,offset:0},hundredweight:{name:"hundredweight",base:k.MASS,prefixes:R.NONE,value:45.359237,offset:0},stick:{name:"stick",base:k.MASS,prefixes:R.NONE,value:.115,offset:0},stone:{name:"stone",base:k.MASS,prefixes:R.NONE,value:6.35029318,offset:0},gr:{name:"gr",base:k.MASS,prefixes:R.NONE,value:6479891e-11,offset:0},dr:{name:"dr",base:k.MASS,prefixes:R.NONE,value:.0017718451953125,offset:0},oz:{name:"oz",base:k.MASS,prefixes:R.NONE,value:.028349523125,offset:0},lbm:{name:"lbm",base:k.MASS,prefixes:R.NONE,value:.45359237,offset:0},cwt:{name:"cwt",base:k.MASS,prefixes:R.NONE,value:45.359237,offset:0},s:{name:"s",base:k.TIME,prefixes:R.SHORT,value:1,offset:0},min:{name:"min",base:k.TIME,prefixes:R.NONE,value:60,offset:0},h:{name:"h",base:k.TIME,prefixes:R.NONE,value:3600,offset:0},second:{name:"second",base:k.TIME,prefixes:R.LONG,value:1,offset:0},sec:{name:"sec",base:k.TIME,prefixes:R.LONG,value:1,offset:0},minute:{name:"minute",base:k.TIME,prefixes:R.NONE,value:60,offset:0},hour:{name:"hour",base:k.TIME,prefixes:R.NONE,value:3600,offset:0},day:{name:"day",base:k.TIME,prefixes:R.NONE,value:86400,offset:0},week:{name:"week",base:k.TIME,prefixes:R.NONE,value:604800,offset:0},month:{name:"month",base:k.TIME,prefixes:R.NONE,value:2629800,offset:0},year:{name:"year",base:k.TIME,prefixes:R.NONE,value:31557600,offset:0},decade:{name:"decade",base:k.TIME,prefixes:R.NONE,value:315576e3,offset:0},century:{name:"century",base:k.TIME,prefixes:R.NONE,value:315576e4,offset:0},millennium:{name:"millennium",base:k.TIME,prefixes:R.NONE,value:315576e5,offset:0},hertz:{name:"Hertz",base:k.FREQUENCY,prefixes:R.LONG,value:1,offset:0,reciprocal:!0},Hz:{name:"Hz",base:k.FREQUENCY,prefixes:R.SHORT,value:1,offset:0,reciprocal:!0},rad:{name:"rad",base:k.ANGLE,prefixes:R.SHORT,value:1,offset:0},radian:{name:"radian",base:k.ANGLE,prefixes:R.LONG,value:1,offset:0},deg:{name:"deg",base:k.ANGLE,prefixes:R.SHORT,value:null,offset:0},degree:{name:"degree",base:k.ANGLE,prefixes:R.LONG,value:null,offset:0},grad:{name:"grad",base:k.ANGLE,prefixes:R.SHORT,value:null,offset:0},gradian:{name:"gradian",base:k.ANGLE,prefixes:R.LONG,value:null,offset:0},cycle:{name:"cycle",base:k.ANGLE,prefixes:R.NONE,value:null,offset:0},arcsec:{name:"arcsec",base:k.ANGLE,prefixes:R.NONE,value:null,offset:0},arcmin:{name:"arcmin",base:k.ANGLE,prefixes:R.NONE,value:null,offset:0},A:{name:"A",base:k.CURRENT,prefixes:R.SHORT,value:1,offset:0},ampere:{name:"ampere",base:k.CURRENT,prefixes:R.LONG,value:1,offset:0},K:{name:"K",base:k.TEMPERATURE,prefixes:R.NONE,value:1,offset:0},degC:{name:"degC",base:k.TEMPERATURE,prefixes:R.NONE,value:1,offset:273.15},degF:{name:"degF",base:k.TEMPERATURE,prefixes:R.NONE,value:1/1.8,offset:459.67},degR:{name:"degR",base:k.TEMPERATURE,prefixes:R.NONE,value:1/1.8,offset:0},kelvin:{name:"kelvin",base:k.TEMPERATURE,prefixes:R.NONE,value:1,offset:0},celsius:{name:"celsius",base:k.TEMPERATURE,prefixes:R.NONE,value:1,offset:273.15},fahrenheit:{name:"fahrenheit",base:k.TEMPERATURE,prefixes:R.NONE,value:1/1.8,offset:459.67},rankine:{name:"rankine",base:k.TEMPERATURE,prefixes:R.NONE,value:1/1.8,offset:0},mol:{name:"mol",base:k.AMOUNT_OF_SUBSTANCE,prefixes:R.SHORT,value:1,offset:0},mole:{name:"mole",base:k.AMOUNT_OF_SUBSTANCE,prefixes:R.LONG,value:1,offset:0},cd:{name:"cd",base:k.LUMINOUS_INTENSITY,prefixes:R.SHORT,value:1,offset:0},candela:{name:"candela",base:k.LUMINOUS_INTENSITY,prefixes:R.LONG,value:1,offset:0},N:{name:"N",base:k.FORCE,prefixes:R.SHORT,value:1,offset:0},newton:{name:"newton",base:k.FORCE,prefixes:R.LONG,value:1,offset:0},dyn:{name:"dyn",base:k.FORCE,prefixes:R.SHORT,value:1e-5,offset:0},dyne:{name:"dyne",base:k.FORCE,prefixes:R.LONG,value:1e-5,offset:0},lbf:{name:"lbf",base:k.FORCE,prefixes:R.NONE,value:4.4482216152605,offset:0},poundforce:{name:"poundforce",base:k.FORCE,prefixes:R.NONE,value:4.4482216152605,offset:0},kip:{name:"kip",base:k.FORCE,prefixes:R.LONG,value:4448.2216,offset:0},kilogramforce:{name:"kilogramforce",base:k.FORCE,prefixes:R.NONE,value:9.80665,offset:0},J:{name:"J",base:k.ENERGY,prefixes:R.SHORT,value:1,offset:0},joule:{name:"joule",base:k.ENERGY,prefixes:R.SHORT,value:1,offset:0},erg:{name:"erg",base:k.ENERGY,prefixes:R.NONE,value:1e-7,offset:0},Wh:{name:"Wh",base:k.ENERGY,prefixes:R.SHORT,value:3600,offset:0},BTU:{name:"BTU",base:k.ENERGY,prefixes:R.BTU,value:1055.05585262,offset:0},eV:{name:"eV",base:k.ENERGY,prefixes:R.SHORT,value:1602176565e-28,offset:0},electronvolt:{name:"electronvolt",base:k.ENERGY,prefixes:R.LONG,value:1602176565e-28,offset:0},W:{name:"W",base:k.POWER,prefixes:R.SHORT,value:1,offset:0},watt:{name:"watt",base:k.POWER,prefixes:R.LONG,value:1,offset:0},hp:{name:"hp",base:k.POWER,prefixes:R.NONE,value:745.6998715386,offset:0},VAR:{name:"VAR",base:k.POWER,prefixes:R.SHORT,value:v.I,offset:0},VA:{name:"VA",base:k.POWER,prefixes:R.SHORT,value:1,offset:0},Pa:{name:"Pa",base:k.PRESSURE,prefixes:R.SHORT,value:1,offset:0},psi:{name:"psi",base:k.PRESSURE,prefixes:R.NONE,value:6894.75729276459,offset:0},atm:{name:"atm",base:k.PRESSURE,prefixes:R.NONE,value:101325,offset:0},bar:{name:"bar",base:k.PRESSURE,prefixes:R.SHORTLONG,value:1e5,offset:0},torr:{name:"torr",base:k.PRESSURE,prefixes:R.NONE,value:133.322,offset:0},mmHg:{name:"mmHg",base:k.PRESSURE,prefixes:R.NONE,value:133.322,offset:0},mmH2O:{name:"mmH2O",base:k.PRESSURE,prefixes:R.NONE,value:9.80665,offset:0},cmH2O:{name:"cmH2O",base:k.PRESSURE,prefixes:R.NONE,value:98.0665,offset:0},coulomb:{name:"coulomb",base:k.ELECTRIC_CHARGE,prefixes:R.LONG,value:1,offset:0},C:{name:"C",base:k.ELECTRIC_CHARGE,prefixes:R.SHORT,value:1,offset:0},farad:{name:"farad",base:k.ELECTRIC_CAPACITANCE,prefixes:R.LONG,value:1,offset:0},F:{name:"F",base:k.ELECTRIC_CAPACITANCE,prefixes:R.SHORT,value:1,offset:0},volt:{name:"volt",base:k.ELECTRIC_POTENTIAL,prefixes:R.LONG,value:1,offset:0},V:{name:"V",base:k.ELECTRIC_POTENTIAL,prefixes:R.SHORT,value:1,offset:0},ohm:{name:"ohm",base:k.ELECTRIC_RESISTANCE,prefixes:R.SHORTLONG,value:1,offset:0},henry:{name:"henry",base:k.ELECTRIC_INDUCTANCE,prefixes:R.LONG,value:1,offset:0},H:{name:"H",base:k.ELECTRIC_INDUCTANCE,prefixes:R.SHORT,value:1,offset:0},siemens:{name:"siemens",base:k.ELECTRIC_CONDUCTANCE,prefixes:R.LONG,value:1,offset:0},S:{name:"S",base:k.ELECTRIC_CONDUCTANCE,prefixes:R.SHORT,value:1,offset:0},weber:{name:"weber",base:k.MAGNETIC_FLUX,prefixes:R.LONG,value:1,offset:0},Wb:{name:"Wb",base:k.MAGNETIC_FLUX,prefixes:R.SHORT,value:1,offset:0},tesla:{name:"tesla",base:k.MAGNETIC_FLUX_DENSITY,prefixes:R.LONG,value:1,offset:0},T:{name:"T",base:k.MAGNETIC_FLUX_DENSITY,prefixes:R.SHORT,value:1,offset:0},b:{name:"b",base:k.BIT,prefixes:R.BINARY_SHORT,value:1,offset:0},bits:{name:"bits",base:k.BIT,prefixes:R.BINARY_LONG,value:1,offset:0},B:{name:"B",base:k.BIT,prefixes:R.BINARY_SHORT,value:8,offset:0},bytes:{name:"bytes",base:k.BIT,prefixes:R.BINARY_LONG,value:8,offset:0}},F={meters:"meter",inches:"inch",feet:"foot",yards:"yard",miles:"mile",links:"link",rods:"rod",chains:"chain",angstroms:"angstrom",lt:"l",litres:"litre",liter:"litre",liters:"litre",teaspoons:"teaspoon",tablespoons:"tablespoon",minims:"minim",fluiddrams:"fluiddram",fluidounces:"fluidounce",gills:"gill",cups:"cup",pints:"pint",quarts:"quart",gallons:"gallon",beerbarrels:"beerbarrel",oilbarrels:"oilbarrel",hogsheads:"hogshead",gtts:"gtt",grams:"gram",tons:"ton",tonnes:"tonne",grains:"grain",drams:"dram",ounces:"ounce",poundmasses:"poundmass",hundredweights:"hundredweight",sticks:"stick",lb:"lbm",lbs:"lbm",kips:"kip",kgf:"kilogramforce",acres:"acre",hectares:"hectare",sqfeet:"sqft",sqyard:"sqyd",sqmile:"sqmi",sqmiles:"sqmi",mmhg:"mmHg",mmh2o:"mmH2O",cmh2o:"cmH2O",seconds:"second",secs:"second",minutes:"minute",mins:"minute",hours:"hour",hr:"hour",hrs:"hour",days:"day",weeks:"week",months:"month",years:"year",decades:"decade",centuries:"century",millennia:"millennium",hertz:"hertz",radians:"radian",degrees:"degree",gradians:"gradian",cycles:"cycle",arcsecond:"arcsec",arcseconds:"arcsec",arcminute:"arcmin",arcminutes:"arcmin",BTUs:"BTU",watts:"watt",joules:"joule",amperes:"ampere",coulombs:"coulomb",volts:"volt",ohms:"ohm",farads:"farad",webers:"weber",teslas:"tesla",electronvolts:"electronvolt",moles:"mole",bit:"bits",byte:"bytes"};function P(t){if("BigNumber"===t.number){var e=Oa(x);B.rad.value=new x(1),B.deg.value=e.div(180),B.grad.value=e.div(200),B.cycle.value=e.times(2),B.arcsec.value=e.div(648e3),B.arcmin.value=e.div(10800);}else B.rad.value=1,B.deg.value=Math.PI/180,B.grad.value=Math.PI/200,B.cycle.value=2*Math.PI,B.arcsec.value=Math.PI/648e3,B.arcmin.value=Math.PI/10800;B.radian.value=B.rad.value,B.degree.value=B.deg.value,B.gradian.value=B.grad.value;}P(s),i&&i("config",(function(t,e){t.number!==e.number&&P(t);}));var U={si:{NONE:{unit:L,prefix:R.NONE[""]},LENGTH:{unit:B.m,prefix:R.SHORT[""]},MASS:{unit:B.g,prefix:R.SHORT.k},TIME:{unit:B.s,prefix:R.SHORT[""]},CURRENT:{unit:B.A,prefix:R.SHORT[""]},TEMPERATURE:{unit:B.K,prefix:R.SHORT[""]},LUMINOUS_INTENSITY:{unit:B.cd,prefix:R.SHORT[""]},AMOUNT_OF_SUBSTANCE:{unit:B.mol,prefix:R.SHORT[""]},ANGLE:{unit:B.rad,prefix:R.SHORT[""]},BIT:{unit:B.bits,prefix:R.SHORT[""]},FORCE:{unit:B.N,prefix:R.SHORT[""]},ENERGY:{unit:B.J,prefix:R.SHORT[""]},POWER:{unit:B.W,prefix:R.SHORT[""]},PRESSURE:{unit:B.Pa,prefix:R.SHORT[""]},ELECTRIC_CHARGE:{unit:B.C,prefix:R.SHORT[""]},ELECTRIC_CAPACITANCE:{unit:B.F,prefix:R.SHORT[""]},ELECTRIC_POTENTIAL:{unit:B.V,prefix:R.SHORT[""]},ELECTRIC_RESISTANCE:{unit:B.ohm,prefix:R.SHORT[""]},ELECTRIC_INDUCTANCE:{unit:B.H,prefix:R.SHORT[""]},ELECTRIC_CONDUCTANCE:{unit:B.S,prefix:R.SHORT[""]},MAGNETIC_FLUX:{unit:B.Wb,prefix:R.SHORT[""]},MAGNETIC_FLUX_DENSITY:{unit:B.T,prefix:R.SHORT[""]},FREQUENCY:{unit:B.Hz,prefix:R.SHORT[""]}}};U.cgs=JSON.parse(JSON.stringify(U.si)),U.cgs.LENGTH={unit:B.m,prefix:R.SHORT.c},U.cgs.MASS={unit:B.g,prefix:R.SHORT[""]},U.cgs.FORCE={unit:B.dyn,prefix:R.SHORT[""]},U.cgs.ENERGY={unit:B.erg,prefix:R.NONE[""]},U.us=JSON.parse(JSON.stringify(U.si)),U.us.LENGTH={unit:B.ft,prefix:R.NONE[""]},U.us.MASS={unit:B.lbm,prefix:R.NONE[""]},U.us.TEMPERATURE={unit:B.degF,prefix:R.NONE[""]},U.us.FORCE={unit:B.lbf,prefix:R.NONE[""]},U.us.ENERGY={unit:B.BTU,prefix:R.BTU[""]},U.us.POWER={unit:B.hp,prefix:R.NONE[""]},U.us.PRESSURE={unit:B.psi,prefix:R.NONE[""]},U.auto=JSON.parse(JSON.stringify(U.si));var j=U.auto;for(var q in _.setUnitSystem=function(t){if(!wr(U,t))throw new Error("Unit system "+t+" does not exist. Choices are: "+Object.keys(U).join(", "));j=U[t];},_.getUnitSystem=function(){for(var t in U)if(wr(U,t)&&U[t]===j)return t},_.typeConverters={BigNumber:function(t){return new x(t+"")},Fraction:function(t){return new w(t)},Complex:function(t){return t},number:function(t){return t}},_._getNumberConverter=function(t){if(!_.typeConverters[t])throw new TypeError('Unsupported type "'+t+'"');return _.typeConverters[t]},B)if(wr(B,q)){var H=B[q];H.dimensions=H.base.dimensions;}for(var V in F)if(wr(F,V)){var $=B[F[V]],G={};for(var W in $)wr($,W)&&(G[W]=$[W]);G.name=V,B[V]=G;}return _.isValidAlpha=function(t){return /^[a-zA-Z]$/.test(t)},_.createUnit=function(t,e){if("object"!=typeof t)throw new TypeError("createUnit expects first parameter to be of type 'Object'");if(e&&e.override)for(var r in t)if(wr(t,r)&&_.deleteUnit(r),t[r].aliases)for(var n=0;n<t[r].aliases.length;n++)_.deleteUnit(t[r].aliases[n]);var i;for(var s in t)wr(t,s)&&(i=_.createUnitSingle(s,t[s]));return i},_.createUnitSingle=function(t,e,r){if(null==e&&(e={}),"string"!=typeof t)throw new TypeError("createUnitSingle expects first parameter to be of type 'string'");if(wr(B,t))throw new Error('Cannot create unit "'+t+'": a unit with that name already exists');!function(t){for(var e=0;e<t.length;e++){if(n=t.charAt(e),0===e&&!_.isValidAlpha(n))throw new Error('Invalid unit name (must begin with alpha character): "'+t+'"');if(e>0&&!_.isValidAlpha(n)&&!E(n))throw new Error('Invalid unit name (only alphanumeric characters are allowed): "'+t+'"')}}(t);var i,s,a,o=null,u=[],h=0;if(e&&"Unit"===e.type)o=e.clone();else if("string"==typeof e)""!==e&&(i=e);else {if("object"!=typeof e)throw new TypeError('Cannot create unit "'+t+'" from "'+e.toString()+'": expecting "string" or "Unit" or "Object"');i=e.definition,s=e.prefixes,h=e.offset,a=e.baseName,e.aliases&&(u=e.aliases.valueOf());}if(u)for(var c=0;c<u.length;c++)if(wr(B,u[c]))throw new Error('Cannot create alias "'+u[c]+'": a unit with that name already exists');if(i&&"string"==typeof i&&!o)try{o=_.parse(i,{allowNoUnits:!0});}catch(S){throw S.message='Could not create unit "'+t+'" from "'+i+'": '+S.message,S}else i&&"Unit"===i.type&&(o=i.clone());u=u||[],h=h||0,s=s&&s.toUpperCase&&R[s.toUpperCase()]||R.NONE;var l={};if(o){l={name:t,value:o.value,dimensions:o.dimensions.slice(0),prefixes:s,offset:h};var p=!1;for(var f in k)if(wr(k,f)){for(var d=!0,m=0;m<D.length;m++)if(Math.abs((l.dimensions[m]||0)-(k[f].dimensions[m]||0))>1e-12){d=!1;break}if(d){p=!0,l.base=k[f];break}}if(!p){a=a||t+"_STUFF";var y={dimensions:o.dimensions.slice(0)};y.key=a,k[a]=y,j[a]={unit:l,prefix:R.NONE[""]},l.base=k[a];}}else {if(a=a||t+"_STUFF",D.indexOf(a)>=0)throw new Error('Cannot create new base unit "'+t+'": a base unit with that name already exists (and cannot be overridden)');for(var g in D.push(a),k)wr(k,g)&&(k[g].dimensions[D.length-1]=0);for(var v={dimensions:[]},x=0;x<D.length;x++)v.dimensions[x]=0;v.dimensions[D.length-1]=1,v.key=a,k[a]=v,l={name:t,value:1,dimensions:k[a].dimensions.slice(0),prefixes:s,offset:h,base:k[a]},j[a]={unit:l,prefix:R.NONE[""]};}_.UNITS[t]=l;for(var w=0;w<u.length;w++){var b=u[w],M={};for(var N in l)wr(l,N)&&(M[N]=l[N]);M.name=b,_.UNITS[b]=M;}return delete A.cache,new _(null,t)},_.deleteUnit=function(t){delete _.UNITS[t];},_.PREFIXES=R,_.BASE_DIMENSIONS=D,_.BASE_UNITS=k,_.UNIT_SYSTEMS=U,_.UNITS=B,_}),{isClass:!0});cn("unit",["typed","Unit"],(t=>{var{typed:e,Unit:r}=t;return e("unit",{Unit:function(t){return t.clone()},string:function(t){return r.isValuelessUnit(t)?new r(null,t):r.parse(t,{allowNoUnits:!0})},"number | BigNumber | Fraction | Complex, string":function(t,e){return new r(t,e)},"Array | Matrix":function(t){return is(t,this)}})}));cn("createUnit",["typed","Unit"],(t=>{var{typed:e,Unit:r}=t;return e("createUnit",{"Object, Object":function(t,e){return r.createUnit(t,e)},Object:function(t){return r.createUnit(t,{})},"string, Unit | string | Object, Object":function(t,e,n){var i={};return i[t]=e,r.createUnit(i,n)},"string, Unit | string | Object":function(t,e){var n={};return n[t]=e,r.createUnit(n,{})},string:function(t){var e={};return e[t]={},r.createUnit(e,{})}})}));cn("add",["typed","matrix","addScalar","equalScalar","DenseMatrix","SparseMatrix"],(t=>{var{typed:e,matrix:r,addScalar:n,equalScalar:i,DenseMatrix:s,SparseMatrix:a}=t,o=Rs({typed:e}),u=Ds({typed:e,equalScalar:i}),h=ks({typed:e,DenseMatrix:s}),c=Is({typed:e}),l=Os({typed:e});return e("add",dr({"DenseMatrix, DenseMatrix":function(t,e){return c(t,e,n)},"DenseMatrix, SparseMatrix":function(t,e){return o(t,e,n,!1)},"SparseMatrix, DenseMatrix":function(t,e){return o(e,t,n,!0)},"SparseMatrix, SparseMatrix":function(t,e){return u(t,e,n)},"Array, Array":function(t,e){return this(r(t),r(e)).valueOf()},"Array, Matrix":function(t,e){return this(r(t),e)},"Matrix, Array":function(t,e){return this(t,r(e))},"DenseMatrix, any":function(t,e){return l(t,e,n,!1)},"SparseMatrix, any":function(t,e){return h(t,e,n,!1)},"any, DenseMatrix":function(t,e){return l(e,t,n,!0)},"any, SparseMatrix":function(t,e){return h(e,t,n,!0)},"Array, any":function(t,e){return l(r(t),e,n,!1).valueOf()},"any, Array":function(t,e){return l(r(e),t,n,!0).valueOf()},"any, any":n,"any, any, ...any":function(t,e,r){for(var n=this(t,e),i=0;i<r.length;i++)n=this(n,r[i]);return n}},n.signatures))}));var Fa=cn("dot",["typed","addScalar","multiplyScalar","conj","size"],(t=>{var{typed:e,addScalar:r,multiplyScalar:n,conj:i,size:s}=t;return e("dot",{"Array | DenseMatrix, Array | DenseMatrix":function(t,s){var u=a(t,s),h=ke(t)?t._data:t,c=ke(t)?t._datatype:void 0,l=ke(s)?s._data:s,p=ke(s)?s._datatype:void 0,f=2===o(t).length,d=2===o(s).length,m=r,y=n;if(c&&p&&c===p&&"string"==typeof c){var g=c;m=e.find(r,[g,g]),y=e.find(n,[g,g]);}if(!f&&!d){for(var v=y(i(h[0]),l[0]),x=1;x<u;x++)v=m(v,y(i(h[x]),l[x]));return v}if(!f&&d){for(var w=y(i(h[0]),l[0][0]),b=1;b<u;b++)w=m(w,y(i(h[b]),l[b][0]));return w}if(f&&!d){for(var _=y(i(h[0][0]),l[0]),M=1;M<u;M++)_=m(_,y(i(h[M][0]),l[M]));return _}if(f&&d){for(var E=y(i(h[0][0]),l[0][0]),N=1;N<u;N++)E=m(E,y(i(h[N][0]),l[N][0]));return E}},"SparseMatrix, SparseMatrix":function(t,e){a(t,e);var i=t._index,s=t._values,o=e._index,u=e._values,h=0,c=r,l=n,p=0,f=0;for(;p<i.length&&f<o.length;){var d=i[p],m=o[f];d<m?p++:d>m?f++:d===m&&(h=c(h,l(s[p],u[f])),p++,f++);}return h}});function a(t,e){var r,n,i=o(t),s=o(e);if(1===i.length)r=i[0];else {if(2!==i.length||1!==i[1])throw new RangeError("Expected a column vector, instead got a matrix of size ("+i.join(", ")+")");r=i[0];}if(1===s.length)n=s[0];else {if(2!==s.length||1!==s[1])throw new RangeError("Expected a column vector, instead got a matrix of size ("+s.join(", ")+")");n=s[0];}if(r!==n)throw new RangeError("Vectors must have equal length ("+r+" != "+n+")");if(0===r)throw new RangeError("Cannot calculate the dot product of empty vectors");return r}function o(t){return ke(t)?t.size():s(t)}})),Pa={end:!0},Ua=cn("Node",["mathWithTransform"],(t=>{var{mathWithTransform:e}=t;function r(){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator")}return r.prototype.evaluate=function(t){return this.compile().evaluate(t)},r.prototype.type="Node",r.prototype.isNode=!0,r.prototype.comment="",r.prototype.compile=function(){var t=this._compile(e,{}),r={};return {evaluate:function(e){var n=e||{};return function(t){for(var e in t)if(wr(t,e)&&e in Pa)throw new Error('Scope contains an illegal symbol, "'+e+'" is a reserved keyword')}(n),t(n,r,null)}}},r.prototype._compile=function(t,e){throw new Error("Method _compile should be implemented by type "+this.type)},r.prototype.forEach=function(t){throw new Error("Cannot run forEach on a Node interface")},r.prototype.map=function(t){throw new Error("Cannot run map on a Node interface")},r.prototype._ifNode=function(t){if(!ir(t))throw new TypeError("Callback function must return a Node");return t},r.prototype.traverse=function(t){t(this,null,null),function t(e,r){e.forEach((function(e,n,i){r(e,n,i),t(e,r);}));}(this,t);},r.prototype.transform=function(t){return function e(r,n,i){var s=t(r,n,i);return s!==r?s:r.map(e)}(this,null,null)},r.prototype.filter=function(t){var e=[];return this.traverse((function(r,n,i){t(r,n,i)&&e.push(r);})),e},r.prototype.clone=function(){throw new Error("Cannot clone a Node interface")},r.prototype.cloneDeep=function(){return this.map((function(t){return t.cloneDeep()}))},r.prototype.equals=function(t){return !!t&&yr(this,t)},r.prototype.toString=function(t){var e;if(t&&"object"==typeof t)switch(typeof t.handler){case"object":case"undefined":break;case"function":e=t.handler(this,t);break;default:throw new TypeError("Object or function expected as callback")}return void 0!==e?e:this._toString(t)},r.prototype.toJSON=function(){throw new Error("Cannot serialize object: toJSON not implemented by "+this.type)},r.prototype.toHTML=function(t){var e;if(t&&"object"==typeof t)switch(typeof t.handler){case"object":case"undefined":break;case"function":e=t.handler(this,t);break;default:throw new TypeError("Object or function expected as callback")}return void 0!==e?e:this.toHTML(t)},r.prototype._toString=function(){throw new Error("_toString not implemented for "+this.type)},r.prototype.toTex=function(t){var e;if(t&&"object"==typeof t)switch(typeof t.handler){case"object":case"undefined":break;case"function":e=t.handler(this,t);break;default:throw new TypeError("Object or function expected as callback")}return void 0!==e?e:this._toTex(t)},r.prototype._toTex=function(t){throw new Error("_toTex not implemented for "+this.type)},r.prototype.getIdentifier=function(){return this.type},r.prototype.getContent=function(){return this},r}),{isClass:!0,isNode:!0});function ja(t){return t&&t.isIndexError?new Yr(t.index+1,t.min+1,void 0!==t.max?t.max+1:void 0):t}function qa(t){var{subset:e}=t;return function(t,r){try{if(Array.isArray(t))return e(t,r);if(t&&"function"==typeof t.subset)return t.subset(r);if("string"==typeof t)return e(t,r);if("object"==typeof t){if(!r.isObjectProperty())throw new TypeError("Cannot apply a numeric index as object property");return ta(t,r.getObjectProperty())}throw new TypeError("Cannot apply index: unsupported type of object")}catch(n){throw ja(n)}}}var Ha=cn("AccessorNode",["subset","Node"],(t=>{var{subset:e,Node:r}=t,n=qa({subset:e});function i(t,e){if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator");if(!ir(t))throw new TypeError('Node expected for parameter "object"');if(!nr(e))throw new TypeError('IndexNode expected for parameter "index"');this.object=t||null,this.index=e,Object.defineProperty(this,"name",{get:function(){return this.index?this.index.isObjectProperty()?this.index.getObjectProperty():"":this.object.name||""}.bind(this),set:function(){throw new Error("Cannot assign a new name, name is read-only")}});}function s(t){return !(Ze(t)||Xe(t)||tr(t)||rr(t)||sr(t)||or(t)||hr(t))}return i.prototype=new r,i.prototype.type="AccessorNode",i.prototype.isAccessorNode=!0,i.prototype._compile=function(t,e){var r=this.object._compile(t,e),i=this.index._compile(t,e);if(this.index.isObjectProperty()){var s=this.index.getObjectProperty();return function(t,e,n){return ta(r(t,e,n),s)}}return function(t,e,s){var a=r(t,e,s),o=i(t,e,a);return n(a,o)}},i.prototype.forEach=function(t){t(this.object,"object",this),t(this.index,"index",this);},i.prototype.map=function(t){return new i(this._ifNode(t(this.object,"object",this)),this._ifNode(t(this.index,"index",this)))},i.prototype.clone=function(){return new i(this.object,this.index)},i.prototype._toString=function(t){var e=this.object.toString(t);return s(this.object)&&(e="("+e+")"),e+this.index.toString(t)},i.prototype.toHTML=function(t){var e=this.object.toHTML(t);return s(this.object)&&(e='<span class="math-parenthesis math-round-parenthesis">(</span>'+e+'<span class="math-parenthesis math-round-parenthesis">)</span>'),e+this.index.toHTML(t)},i.prototype._toTex=function(t){var e=this.object.toTex(t);return s(this.object)&&(e="\\left(' + object + '\\right)"),e+this.index.toTex(t)},i.prototype.toJSON=function(){return {mathjs:"AccessorNode",object:this.object,index:this.index}},i.fromJSON=function(t){return new i(t.object,t.index)},i}),{isClass:!0,isNode:!0}),Va=cn("ArrayNode",["Node"],(t=>{var{Node:e}=t;function r(t){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");if(this.items=t||[],!Array.isArray(this.items)||!this.items.every(ir))throw new TypeError("Array containing Nodes expected")}return r.prototype=new e,r.prototype.type="ArrayNode",r.prototype.isArrayNode=!0,r.prototype._compile=function(t,e){var r=sn(this.items,(function(r){return r._compile(t,e)}));if("Array"!==t.config.matrix){var n=t.matrix;return function(t,e,i){return n(sn(r,(function(r){return r(t,e,i)})))}}return function(t,e,n){return sn(r,(function(r){return r(t,e,n)}))}},r.prototype.forEach=function(t){for(var e=0;e<this.items.length;e++){t(this.items[e],"items["+e+"]",this);}},r.prototype.map=function(t){for(var e=[],n=0;n<this.items.length;n++)e[n]=this._ifNode(t(this.items[n],"items["+n+"]",this));return new r(e)},r.prototype.clone=function(){return new r(this.items.slice(0))},r.prototype._toString=function(t){return "["+this.items.map((function(e){return e.toString(t)})).join(", ")+"]"},r.prototype.toJSON=function(){return {mathjs:"ArrayNode",items:this.items}},r.fromJSON=function(t){return new r(t.items)},r.prototype.toHTML=function(t){return '<span class="math-parenthesis math-square-parenthesis">[</span>'+this.items.map((function(e){return e.toHTML(t)})).join('<span class="math-separator">,</span>')+'<span class="math-parenthesis math-square-parenthesis">]</span>'},r.prototype._toTex=function(t){var e="\\begin{bmatrix}";return this.items.forEach((function(r){r.items?e+=r.items.map((function(e){return e.toTex(t)})).join("&"):e+=r.toTex(t),e+="\\\\";})),e+="\\end{bmatrix}"},r}),{isClass:!0,isNode:!0});var $a=[{AssignmentNode:{},FunctionAssignmentNode:{}},{ConditionalNode:{latexLeftParens:!1,latexRightParens:!1,latexParens:!1}},{"OperatorNode:or":{associativity:"left",associativeWith:[]}},{"OperatorNode:xor":{associativity:"left",associativeWith:[]}},{"OperatorNode:and":{associativity:"left",associativeWith:[]}},{"OperatorNode:bitOr":{associativity:"left",associativeWith:[]}},{"OperatorNode:bitXor":{associativity:"left",associativeWith:[]}},{"OperatorNode:bitAnd":{associativity:"left",associativeWith:[]}},{"OperatorNode:equal":{associativity:"left",associativeWith:[]},"OperatorNode:unequal":{associativity:"left",associativeWith:[]},"OperatorNode:smaller":{associativity:"left",associativeWith:[]},"OperatorNode:larger":{associativity:"left",associativeWith:[]},"OperatorNode:smallerEq":{associativity:"left",associativeWith:[]},"OperatorNode:largerEq":{associativity:"left",associativeWith:[]},RelationalNode:{associativity:"left",associativeWith:[]}},{"OperatorNode:leftShift":{associativity:"left",associativeWith:[]},"OperatorNode:rightArithShift":{associativity:"left",associativeWith:[]},"OperatorNode:rightLogShift":{associativity:"left",associativeWith:[]}},{"OperatorNode:to":{associativity:"left",associativeWith:[]}},{RangeNode:{}},{"OperatorNode:add":{associativity:"left",associativeWith:["OperatorNode:add","OperatorNode:subtract"]},"OperatorNode:subtract":{associativity:"left",associativeWith:[]}},{"OperatorNode:multiply":{associativity:"left",associativeWith:["OperatorNode:multiply","OperatorNode:divide","Operator:dotMultiply","Operator:dotDivide"]},"OperatorNode:divide":{associativity:"left",associativeWith:[],latexLeftParens:!1,latexRightParens:!1,latexParens:!1},"OperatorNode:dotMultiply":{associativity:"left",associativeWith:["OperatorNode:multiply","OperatorNode:divide","OperatorNode:dotMultiply","OperatorNode:doDivide"]},"OperatorNode:dotDivide":{associativity:"left",associativeWith:[]},"OperatorNode:mod":{associativity:"left",associativeWith:[]}},{"OperatorNode:unaryPlus":{associativity:"right"},"OperatorNode:unaryMinus":{associativity:"right"},"OperatorNode:bitNot":{associativity:"right"},"OperatorNode:not":{associativity:"right"}},{"OperatorNode:pow":{associativity:"right",associativeWith:[],latexRightParens:!1},"OperatorNode:dotPow":{associativity:"right",associativeWith:[]}},{"OperatorNode:factorial":{associativity:"left"}},{"OperatorNode:transpose":{associativity:"left"}}];function Ga(t,e){var r=t;"keep"!==e&&(r=t.getContent());for(var n=r.getIdentifier(),i=0;i<$a.length;i++)if(n in $a[i])return i;return null}function Wa(t,e){var r=t;"keep"!==e&&(r=t.getContent());var n=r.getIdentifier(),i=Ga(r,e);if(null===i)return null;var s=$a[i][n];if(wr(s,"associativity")){if("left"===s.associativity)return "left";if("right"===s.associativity)return "right";throw Error("'"+n+"' has the invalid associativity '"+s.associativity+"'.")}return null}function Ya(t,e,r){var n="keep"!==r?t.getContent():t,i="keep"!==r?t.getContent():e,s=n.getIdentifier(),a=i.getIdentifier(),o=Ga(n,r);if(null===o)return null;var u=$a[o][s];if(wr(u,"associativeWith")&&u.associativeWith instanceof Array){for(var h=0;h<u.associativeWith.length;h++)if(u.associativeWith[h]===a)return !0;return !1}return null}var Za=cn("AssignmentNode",["subset","?matrix","Node"],(t=>{var{subset:e,matrix:r,Node:n}=t,i=qa({subset:e}),s=function(t){var{subset:e,matrix:r}=t;return function(t,n,i){try{if(Array.isArray(t))return r(t).subset(n,i).valueOf();if(t&&"function"==typeof t.subset)return t.subset(n,i);if("string"==typeof t)return e(t,n,i);if("object"==typeof t){if(!n.isObjectProperty())throw TypeError("Cannot apply a numeric index as object property");return ea(t,n.getObjectProperty(),i),t}throw new TypeError("Cannot apply index: unsupported type of object")}catch(s){throw ja(s)}}}({subset:e,matrix:r});function a(t,e,r){if(!(this instanceof a))throw new SyntaxError("Constructor must be called with the new operator");if(this.object=t,this.index=r?e:null,this.value=r||e,!hr(t)&&!Ze(t))throw new TypeError('SymbolNode or AccessorNode expected as "object"');if(hr(t)&&"end"===t.name)throw new Error('Cannot assign to symbol "end"');if(this.index&&!nr(this.index))throw new TypeError('IndexNode expected as "index"');if(!ir(this.value))throw new TypeError('Node expected as "value"');Object.defineProperty(this,"name",{get:function(){return this.index?this.index.isObjectProperty()?this.index.getObjectProperty():"":this.object.name||""}.bind(this),set:function(){throw new Error("Cannot assign a new name, name is read-only")}});}function o(t,e){e||(e="keep");var r=Ga(t,e),n=Ga(t.value,e);return "all"===e||null!==n&&n<=r}return a.prototype=new n,a.prototype.type="AssignmentNode",a.prototype.isAssignmentNode=!0,a.prototype._compile=function(t,e){var r=this.object._compile(t,e),n=this.index?this.index._compile(t,e):null,a=this.value._compile(t,e),o=this.object.name;if(this.index){if(this.index.isObjectProperty()){var u=this.index.getObjectProperty();return function(t,e,n){var i=r(t,e,n),s=a(t,e,n);return ea(i,u,s)}}if(hr(this.object))return function(t,e,i){var u=r(t,e,i),h=a(t,e,i),c=n(t,e,u);return ea(t,o,s(u,c,h)),h};var h=this.object.object._compile(t,e);if(this.object.index.isObjectProperty()){var c=this.object.index.getObjectProperty();return function(t,e,r){var i=h(t,e,r),o=ta(i,c),u=n(t,e,o),l=a(t,e,r);return ea(i,c,s(o,u,l)),l}}var l=this.object.index._compile(t,e);return function(t,e,r){var o=h(t,e,r),u=l(t,e,o),c=i(o,u),p=n(t,e,c),f=a(t,e,r);return s(o,u,s(c,p,f)),f}}if(!hr(this.object))throw new TypeError("SymbolNode expected as object");return function(t,e,r){return ea(t,o,a(t,e,r))}},a.prototype.forEach=function(t){t(this.object,"object",this),this.index&&t(this.index,"index",this),t(this.value,"value",this);},a.prototype.map=function(t){return new a(this._ifNode(t(this.object,"object",this)),this.index?this._ifNode(t(this.index,"index",this)):null,this._ifNode(t(this.value,"value",this)))},a.prototype.clone=function(){return new a(this.object,this.index,this.value)},a.prototype._toString=function(t){var e=this.object.toString(t),r=this.index?this.index.toString(t):"",n=this.value.toString(t);return o(this,t&&t.parenthesis)&&(n="("+n+")"),e+r+" = "+n},a.prototype.toJSON=function(){return {mathjs:"AssignmentNode",object:this.object,index:this.index,value:this.value}},a.fromJSON=function(t){return new a(t.object,t.index,t.value)},a.prototype.toHTML=function(t){var e=this.object.toHTML(t),r=this.index?this.index.toHTML(t):"",n=this.value.toHTML(t);return o(this,t&&t.parenthesis)&&(n='<span class="math-paranthesis math-round-parenthesis">(</span>'+n+'<span class="math-paranthesis math-round-parenthesis">)</span>'),e+r+'<span class="math-operator math-assignment-operator math-variable-assignment-operator math-binary-operator">=</span>'+n},a.prototype._toTex=function(t){var e=this.object.toTex(t),r=this.index?this.index.toTex(t):"",n=this.value.toTex(t);return o(this,t&&t.parenthesis)&&(n="\\left(".concat(n,"\\right)")),e+r+":="+n},a}),{isClass:!0,isNode:!0}),Xa=cn("BlockNode",["ResultSet","Node"],(t=>{var{ResultSet:e,Node:r}=t;function n(t){if(!(this instanceof n))throw new SyntaxError("Constructor must be called with the new operator");if(!Array.isArray(t))throw new Error("Array expected");this.blocks=t.map((function(t){var e=t&&t.node,r=!t||void 0===t.visible||t.visible;if(!ir(e))throw new TypeError('Property "node" must be a Node');if("boolean"!=typeof r)throw new TypeError('Property "visible" must be a boolean');return {node:e,visible:r}}));}return n.prototype=new r,n.prototype.type="BlockNode",n.prototype.isBlockNode=!0,n.prototype._compile=function(t,r){var n=sn(this.blocks,(function(e){return {evaluate:e.node._compile(t,r),visible:e.visible}}));return function(t,r,i){var s=[];return an(n,(function(e){var n=e.evaluate(t,r,i);e.visible&&s.push(n);})),new e(s)}},n.prototype.forEach=function(t){for(var e=0;e<this.blocks.length;e++)t(this.blocks[e].node,"blocks["+e+"].node",this);},n.prototype.map=function(t){for(var e=[],r=0;r<this.blocks.length;r++){var i=this.blocks[r],s=this._ifNode(t(i.node,"blocks["+r+"].node",this));e[r]={node:s,visible:i.visible};}return new n(e)},n.prototype.clone=function(){return new n(this.blocks.map((function(t){return {node:t.node,visible:t.visible}})))},n.prototype._toString=function(t){return this.blocks.map((function(e){return e.node.toString(t)+(e.visible?"":";")})).join("\n")},n.prototype.toJSON=function(){return {mathjs:"BlockNode",blocks:this.blocks}},n.fromJSON=function(t){return new n(t.blocks)},n.prototype.toHTML=function(t){return this.blocks.map((function(e){return e.node.toHTML(t)+(e.visible?"":'<span class="math-separator">;</span>')})).join('<span class="math-separator"><br /></span>')},n.prototype._toTex=function(t){return this.blocks.map((function(e){return e.node.toTex(t)+(e.visible?"":";")})).join("\\;\\;\n")},n}),{isClass:!0,isNode:!0}),Qa=cn("ConditionalNode",["Node"],(t=>{var{Node:e}=t;function r(t,e,n){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");if(!ir(t))throw new TypeError("Parameter condition must be a Node");if(!ir(e))throw new TypeError("Parameter trueExpr must be a Node");if(!ir(n))throw new TypeError("Parameter falseExpr must be a Node");this.condition=t,this.trueExpr=e,this.falseExpr=n;}return r.prototype=new e,r.prototype.type="ConditionalNode",r.prototype.isConditionalNode=!0,r.prototype._compile=function(t,e){var r=this.condition._compile(t,e),n=this.trueExpr._compile(t,e),i=this.falseExpr._compile(t,e);return function(t,e,s){return function(t){if("number"==typeof t||"boolean"==typeof t||"string"==typeof t)return !!t;if(t){if(Oe(t))return !t.isZero();if(ze(t))return !(!t.re&&!t.im);if(Ce(t))return !!t.value}if(null==t)return !1;throw new TypeError('Unsupported type of condition "'+lr(t)+'"')}(r(t,e,s))?n(t,e,s):i(t,e,s)}},r.prototype.forEach=function(t){t(this.condition,"condition",this),t(this.trueExpr,"trueExpr",this),t(this.falseExpr,"falseExpr",this);},r.prototype.map=function(t){return new r(this._ifNode(t(this.condition,"condition",this)),this._ifNode(t(this.trueExpr,"trueExpr",this)),this._ifNode(t(this.falseExpr,"falseExpr",this)))},r.prototype.clone=function(){return new r(this.condition,this.trueExpr,this.falseExpr)},r.prototype._toString=function(t){var e=t&&t.parenthesis?t.parenthesis:"keep",r=Ga(this,e),n=this.condition.toString(t),i=Ga(this.condition,e);("all"===e||"OperatorNode"===this.condition.type||null!==i&&i<=r)&&(n="("+n+")");var s=this.trueExpr.toString(t),a=Ga(this.trueExpr,e);("all"===e||"OperatorNode"===this.trueExpr.type||null!==a&&a<=r)&&(s="("+s+")");var o=this.falseExpr.toString(t),u=Ga(this.falseExpr,e);return ("all"===e||"OperatorNode"===this.falseExpr.type||null!==u&&u<=r)&&(o="("+o+")"),n+" ? "+s+" : "+o},r.prototype.toJSON=function(){return {mathjs:"ConditionalNode",condition:this.condition,trueExpr:this.trueExpr,falseExpr:this.falseExpr}},r.fromJSON=function(t){return new r(t.condition,t.trueExpr,t.falseExpr)},r.prototype.toHTML=function(t){var e=t&&t.parenthesis?t.parenthesis:"keep",r=Ga(this,e),n=this.condition.toHTML(t),i=Ga(this.condition,e);("all"===e||"OperatorNode"===this.condition.type||null!==i&&i<=r)&&(n='<span class="math-parenthesis math-round-parenthesis">(</span>'+n+'<span class="math-parenthesis math-round-parenthesis">)</span>');var s=this.trueExpr.toHTML(t),a=Ga(this.trueExpr,e);("all"===e||"OperatorNode"===this.trueExpr.type||null!==a&&a<=r)&&(s='<span class="math-parenthesis math-round-parenthesis">(</span>'+s+'<span class="math-parenthesis math-round-parenthesis">)</span>');var o=this.falseExpr.toHTML(t),u=Ga(this.falseExpr,e);return ("all"===e||"OperatorNode"===this.falseExpr.type||null!==u&&u<=r)&&(o='<span class="math-parenthesis math-round-parenthesis">(</span>'+o+'<span class="math-parenthesis math-round-parenthesis">)</span>'),n+'<span class="math-operator math-conditional-operator">?</span>'+s+'<span class="math-operator math-conditional-operator">:</span>'+o},r.prototype._toTex=function(t){return "\\begin{cases} {"+this.trueExpr.toTex(t)+"}, &\\quad{\\text{if }\\;"+this.condition.toTex(t)+"}\\\\{"+this.falseExpr.toTex(t)+"}, &\\quad{\\text{otherwise}}\\end{cases}"},r}),{isClass:!0,isNode:!0}),Ja=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n]);}return t},Ka={"{":"\\{","}":"\\}","\\":"\\textbackslash{}","#":"\\#",$:"\\$","%":"\\%","&":"\\&","^":"\\textasciicircum{}",_:"\\_","~":"\\textasciitilde{}"},to={"–":"\\--","—":"\\---"," ":"~","\t":"\\qquad{}","\r\n":"\\newline{}","\n":"\\newline{}"},eo=function(t,e){return Ja({},t,e)},ro={Alpha:"A",alpha:"\\alpha",Beta:"B",beta:"\\beta",Gamma:"\\Gamma",gamma:"\\gamma",Delta:"\\Delta",delta:"\\delta",Epsilon:"E",epsilon:"\\epsilon",varepsilon:"\\varepsilon",Zeta:"Z",zeta:"\\zeta",Eta:"H",eta:"\\eta",Theta:"\\Theta",theta:"\\theta",vartheta:"\\vartheta",Iota:"I",iota:"\\iota",Kappa:"K",kappa:"\\kappa",varkappa:"\\varkappa",Lambda:"\\Lambda",lambda:"\\lambda",Mu:"M",mu:"\\mu",Nu:"N",nu:"\\nu",Xi:"\\Xi",xi:"\\xi",Omicron:"O",omicron:"o",Pi:"\\Pi",pi:"\\pi",varpi:"\\varpi",Rho:"P",rho:"\\rho",varrho:"\\varrho",Sigma:"\\Sigma",sigma:"\\sigma",varsigma:"\\varsigma",Tau:"T",tau:"\\tau",Upsilon:"\\Upsilon",upsilon:"\\upsilon",Phi:"\\Phi",phi:"\\phi",varphi:"\\varphi",Chi:"X",chi:"\\chi",Psi:"\\Psi",psi:"\\psi",Omega:"\\Omega",omega:"\\omega",true:"\\mathrm{True}",false:"\\mathrm{False}",i:"i",inf:"\\infty",Inf:"\\infty",infinity:"\\infty",Infinity:"\\infty",oo:"\\infty",lim:"\\lim",undefined:"\\mathbf{?}"},no={transpose:"^\\top",ctranspose:"^H",factorial:"!",pow:"^",dotPow:".^\\wedge",unaryPlus:"+",unaryMinus:"-",bitNot:"\\~",not:"\\neg",multiply:"\\cdot",divide:"\\frac",dotMultiply:".\\cdot",dotDivide:".:",mod:"\\mod",add:"+",subtract:"-",to:"\\rightarrow",leftShift:"<<",rightArithShift:">>",rightLogShift:">>>",equal:"=",unequal:"\\neq",smaller:"<",larger:">",smallerEq:"\\leq",largerEq:"\\geq",bitAnd:"\\&",bitXor:"\\underline{|}",bitOr:"|",and:"\\wedge",xor:"\\veebar",or:"\\vee"},io={abs:{1:"\\left|${args[0]}\\right|"},add:{2:"\\left(${args[0]}".concat(no.add,"${args[1]}\\right)")},cbrt:{1:"\\sqrt[3]{${args[0]}}"},ceil:{1:"\\left\\lceil${args[0]}\\right\\rceil"},cube:{1:"\\left(${args[0]}\\right)^3"},divide:{2:"\\frac{${args[0]}}{${args[1]}}"},dotDivide:{2:"\\left(${args[0]}".concat(no.dotDivide,"${args[1]}\\right)")},dotMultiply:{2:"\\left(${args[0]}".concat(no.dotMultiply,"${args[1]}\\right)")},dotPow:{2:"\\left(${args[0]}".concat(no.dotPow,"${args[1]}\\right)")},exp:{1:"\\exp\\left(${args[0]}\\right)"},expm1:"\\left(e".concat(no.pow,"{${args[0]}}-1\\right)"),fix:{1:"\\mathrm{${name}}\\left(${args[0]}\\right)"},floor:{1:"\\left\\lfloor${args[0]}\\right\\rfloor"},gcd:"\\gcd\\left(${args}\\right)",hypot:"\\hypot\\left(${args}\\right)",log:{1:"\\ln\\left(${args[0]}\\right)",2:"\\log_{${args[1]}}\\left(${args[0]}\\right)"},log10:{1:"\\log_{10}\\left(${args[0]}\\right)"},log1p:{1:"\\ln\\left(${args[0]}+1\\right)",2:"\\log_{${args[1]}}\\left(${args[0]}+1\\right)"},log2:"\\log_{2}\\left(${args[0]}\\right)",mod:{2:"\\left(${args[0]}".concat(no.mod,"${args[1]}\\right)")},multiply:{2:"\\left(${args[0]}".concat(no.multiply,"${args[1]}\\right)")},norm:{1:"\\left\\|${args[0]}\\right\\|",2:void 0},nthRoot:{2:"\\sqrt[${args[1]}]{${args[0]}}"},nthRoots:{2:"\\{y : $y^{args[1]} = {${args[0]}}\\}"},pow:{2:"\\left(${args[0]}\\right)".concat(no.pow,"{${args[1]}}")},round:{1:"\\left\\lfloor${args[0]}\\right\\rceil",2:void 0},sign:{1:"\\mathrm{${name}}\\left(${args[0]}\\right)"},sqrt:{1:"\\sqrt{${args[0]}}"},square:{1:"\\left(${args[0]}\\right)^2"},subtract:{2:"\\left(${args[0]}".concat(no.subtract,"${args[1]}\\right)")},unaryMinus:{1:"".concat(no.unaryMinus,"\\left(${args[0]}\\right)")},unaryPlus:{1:"".concat(no.unaryPlus,"\\left(${args[0]}\\right)")},bitAnd:{2:"\\left(${args[0]}".concat(no.bitAnd,"${args[1]}\\right)")},bitNot:{1:no.bitNot+"\\left(${args[0]}\\right)"},bitOr:{2:"\\left(${args[0]}".concat(no.bitOr,"${args[1]}\\right)")},bitXor:{2:"\\left(${args[0]}".concat(no.bitXor,"${args[1]}\\right)")},leftShift:{2:"\\left(${args[0]}".concat(no.leftShift,"${args[1]}\\right)")},rightArithShift:{2:"\\left(${args[0]}".concat(no.rightArithShift,"${args[1]}\\right)")},rightLogShift:{2:"\\left(${args[0]}".concat(no.rightLogShift,"${args[1]}\\right)")},bellNumbers:{1:"\\mathrm{B}_{${args[0]}}"},catalan:{1:"\\mathrm{C}_{${args[0]}}"},stirlingS2:{2:"\\mathrm{S}\\left(${args}\\right)"},arg:{1:"\\arg\\left(${args[0]}\\right)"},conj:{1:"\\left(${args[0]}\\right)^*"},im:{1:"\\Im\\left\\lbrace${args[0]}\\right\\rbrace"},re:{1:"\\Re\\left\\lbrace${args[0]}\\right\\rbrace"},and:{2:"\\left(${args[0]}".concat(no.and,"${args[1]}\\right)")},not:{1:no.not+"\\left(${args[0]}\\right)"},or:{2:"\\left(${args[0]}".concat(no.or,"${args[1]}\\right)")},xor:{2:"\\left(${args[0]}".concat(no.xor,"${args[1]}\\right)")},cross:{2:"\\left(${args[0]}\\right)\\times\\left(${args[1]}\\right)"},ctranspose:{1:"\\left(${args[0]}\\right)".concat(no.ctranspose)},det:{1:"\\det\\left(${args[0]}\\right)"},dot:{2:"\\left(${args[0]}\\cdot${args[1]}\\right)"},expm:{1:"\\exp\\left(${args[0]}\\right)"},inv:{1:"\\left(${args[0]}\\right)^{-1}"},sqrtm:{1:"{${args[0]}}".concat(no.pow,"{\\frac{1}{2}}")},trace:{1:"\\mathrm{tr}\\left(${args[0]}\\right)"},transpose:{1:"\\left(${args[0]}\\right)".concat(no.transpose)},combinations:{2:"\\binom{${args[0]}}{${args[1]}}"},combinationsWithRep:{2:"\\left(\\!\\!{\\binom{${args[0]}}{${args[1]}}}\\!\\!\\right)"},factorial:{1:"\\left(${args[0]}\\right)".concat(no.factorial)},gamma:{1:"\\Gamma\\left(${args[0]}\\right)"},equal:{2:"\\left(${args[0]}".concat(no.equal,"${args[1]}\\right)")},larger:{2:"\\left(${args[0]}".concat(no.larger,"${args[1]}\\right)")},largerEq:{2:"\\left(${args[0]}".concat(no.largerEq,"${args[1]}\\right)")},smaller:{2:"\\left(${args[0]}".concat(no.smaller,"${args[1]}\\right)")},smallerEq:{2:"\\left(${args[0]}".concat(no.smallerEq,"${args[1]}\\right)")},unequal:{2:"\\left(${args[0]}".concat(no.unequal,"${args[1]}\\right)")},erf:{1:"erf\\left(${args[0]}\\right)"},max:"\\max\\left(${args}\\right)",min:"\\min\\left(${args}\\right)",variance:"\\mathrm{Var}\\left(${args}\\right)",acos:{1:"\\cos^{-1}\\left(${args[0]}\\right)"},acosh:{1:"\\cosh^{-1}\\left(${args[0]}\\right)"},acot:{1:"\\cot^{-1}\\left(${args[0]}\\right)"},acoth:{1:"\\coth^{-1}\\left(${args[0]}\\right)"},acsc:{1:"\\csc^{-1}\\left(${args[0]}\\right)"},acsch:{1:"\\mathrm{csch}^{-1}\\left(${args[0]}\\right)"},asec:{1:"\\sec^{-1}\\left(${args[0]}\\right)"},asech:{1:"\\mathrm{sech}^{-1}\\left(${args[0]}\\right)"},asin:{1:"\\sin^{-1}\\left(${args[0]}\\right)"},asinh:{1:"\\sinh^{-1}\\left(${args[0]}\\right)"},atan:{1:"\\tan^{-1}\\left(${args[0]}\\right)"},atan2:{2:"\\mathrm{atan2}\\left(${args}\\right)"},atanh:{1:"\\tanh^{-1}\\left(${args[0]}\\right)"},cos:{1:"\\cos\\left(${args[0]}\\right)"},cosh:{1:"\\cosh\\left(${args[0]}\\right)"},cot:{1:"\\cot\\left(${args[0]}\\right)"},coth:{1:"\\coth\\left(${args[0]}\\right)"},csc:{1:"\\csc\\left(${args[0]}\\right)"},csch:{1:"\\mathrm{csch}\\left(${args[0]}\\right)"},sec:{1:"\\sec\\left(${args[0]}\\right)"},sech:{1:"\\mathrm{sech}\\left(${args[0]}\\right)"},sin:{1:"\\sin\\left(${args[0]}\\right)"},sinh:{1:"\\sinh\\left(${args[0]}\\right)"},tan:{1:"\\tan\\left(${args[0]}\\right)"},tanh:{1:"\\tanh\\left(${args[0]}\\right)"},to:{2:"\\left(${args[0]}".concat(no.to,"${args[1]}\\right)")},numeric:function(t,e){return t.args[0].toTex()},number:{0:"0",1:"\\left(${args[0]}\\right)",2:"\\left(\\left(${args[0]}\\right)${args[1]}\\right)"},string:{0:'\\mathtt{""}',1:"\\mathrm{string}\\left(${args[0]}\\right)"},bignumber:{0:"0",1:"\\left(${args[0]}\\right)"},complex:{0:"0",1:"\\left(${args[0]}\\right)",2:"\\left(\\left(${args[0]}\\right)+".concat(ro.i,"\\cdot\\left(${args[1]}\\right)\\right)")},matrix:{0:"\\begin{bmatrix}\\end{bmatrix}",1:"\\left(${args[0]}\\right)",2:"\\left(${args[0]}\\right)"},sparse:{0:"\\begin{bsparse}\\end{bsparse}",1:"\\left(${args[0]}\\right)"},unit:{1:"\\left(${args[0]}\\right)",2:"\\left(\\left(${args[0]}\\right)${args[1]}\\right)"}},so={deg:"^\\circ"};function ao(t){return function(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=e.preserveFormatting,n=void 0!==r&&r,i=e.escapeMapFn,s=void 0===i?eo:i,a=String(t),o="",u=s(Ja({},Ka),n?Ja({},to):{}),h=Object.keys(u),c=function(){var t=!1;h.forEach((function(e,r){t||a.length>=e.length&&a.slice(0,e.length)===e&&(o+=u[h[r]],a=a.slice(e.length,a.length),t=!0);})),t||(o+=a.slice(0,1),a=a.slice(1,a.length));};a;)c();return o}(t,{preserveFormatting:!0})}function oo(t,e){return (e=void 0!==e&&e)?wr(so,t)?so[t]:"\\mathrm{"+ao(t)+"}":wr(ro,t)?ro[t]:ao(t)}var uo=cn("ConstantNode",["Node"],(t=>{var{Node:e}=t;function r(t){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");this.value=t;}return r.prototype=new e,r.prototype.type="ConstantNode",r.prototype.isConstantNode=!0,r.prototype._compile=function(t,e){var r=this.value;return function(){return r}},r.prototype.forEach=function(t){},r.prototype.map=function(t){return this.clone()},r.prototype.clone=function(){return new r(this.value)},r.prototype._toString=function(t){return Hr(this.value,t)},r.prototype.toHTML=function(t){var e=this._toString(t);switch(lr(this.value)){case"number":case"BigNumber":case"Fraction":return '<span class="math-number">'+e+"</span>";case"string":return '<span class="math-string">'+e+"</span>";case"boolean":return '<span class="math-boolean">'+e+"</span>";case"null":return '<span class="math-null-symbol">'+e+"</span>";case"undefined":return '<span class="math-undefined">'+e+"</span>";default:return '<span class="math-symbol">'+e+"</span>"}},r.prototype.toJSON=function(){return {mathjs:"ConstantNode",value:this.value}},r.fromJSON=function(t){return new r(t.value)},r.prototype._toTex=function(t){var e=this._toString(t);switch(lr(this.value)){case"string":return "\\mathtt{"+ao(e)+"}";case"number":case"BigNumber":if(!isFinite(this.value))return this.value.valueOf()<0?"-\\infty":"\\infty";var r=e.toLowerCase().indexOf("e");return -1!==r?e.substring(0,r)+"\\cdot10^{"+e.substring(r+1)+"}":e;case"Fraction":return this.value.toLatex();default:return e}},r}),{isClass:!0,isNode:!0}),ho=cn("FunctionAssignmentNode",["typed","Node"],(t=>{var{typed:e,Node:r}=t;function n(t,e,r){if(!(this instanceof n))throw new SyntaxError("Constructor must be called with the new operator");if("string"!=typeof t)throw new TypeError('String expected for parameter "name"');if(!Array.isArray(e))throw new TypeError('Array containing strings or objects expected for parameter "params"');if(!ir(r))throw new TypeError('Node expected for parameter "expr"');if(t in Pa)throw new Error('Illegal function name, "'+t+'" is a reserved keyword');this.name=t,this.params=e.map((function(t){return t&&t.name||t})),this.types=e.map((function(t){return t&&t.type||"any"})),this.expr=r;}function i(t,e){var r=Ga(t,e),n=Ga(t.expr,e);return "all"===e||null!==n&&n<=r}return n.prototype=new r,n.prototype.type="FunctionAssignmentNode",n.prototype.isFunctionAssignmentNode=!0,n.prototype._compile=function(t,r){var n=Object.create(r);an(this.params,(function(t){n[t]=!0;}));var i=this.expr._compile(t,n),s=this.name,a=this.params,o=on(this.types,","),u=s+"("+on(this.params,", ")+")";return function(t,r,n){var h={};h[o]=function(){for(var e=Object.create(r),s=0;s<a.length;s++)e[a[s]]=arguments[s];return i(t,e,n)};var c=e(s,h);return c.syntax=u,ea(t,s,c),c}},n.prototype.forEach=function(t){t(this.expr,"expr",this);},n.prototype.map=function(t){var e=this._ifNode(t(this.expr,"expr",this));return new n(this.name,this.params.slice(0),e)},n.prototype.clone=function(){return new n(this.name,this.params.slice(0),this.expr)},n.prototype._toString=function(t){var e=t&&t.parenthesis?t.parenthesis:"keep",r=this.expr.toString(t);return i(this,e)&&(r="("+r+")"),this.name+"("+this.params.join(", ")+") = "+r},n.prototype.toJSON=function(){var t=this.types;return {mathjs:"FunctionAssignmentNode",name:this.name,params:this.params.map((function(e,r){return {name:e,type:t[r]}})),expr:this.expr}},n.fromJSON=function(t){return new n(t.name,t.params,t.expr)},n.prototype.toHTML=function(t){for(var e=t&&t.parenthesis?t.parenthesis:"keep",r=[],n=0;n<this.params.length;n++)r.push('<span class="math-symbol math-parameter">'+$r(this.params[n])+"</span>");var s=this.expr.toHTML(t);return i(this,e)&&(s='<span class="math-parenthesis math-round-parenthesis">(</span>'+s+'<span class="math-parenthesis math-round-parenthesis">)</span>'),'<span class="math-function">'+$r(this.name)+'</span><span class="math-parenthesis math-round-parenthesis">(</span>'+r.join('<span class="math-separator">,</span>')+'<span class="math-parenthesis math-round-parenthesis">)</span><span class="math-operator math-assignment-operator math-variable-assignment-operator math-binary-operator">=</span>'+s},n.prototype._toTex=function(t){var e=t&&t.parenthesis?t.parenthesis:"keep",r=this.expr.toTex(t);return i(this,e)&&(r="\\left(".concat(r,"\\right)")),"\\mathrm{"+this.name+"}\\left("+this.params.map(oo).join(",")+"\\right):="+r},n}),{isClass:!0,isNode:!0}),co=cn("IndexNode",["Range","Node","size"],(t=>{var{Range:e,Node:r,size:n}=t;function i(t,e){if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator");if(this.dimensions=t,this.dotNotation=e||!1,!Array.isArray(t)||!t.every(ir))throw new TypeError('Array containing Nodes expected for parameter "dimensions"');if(this.dotNotation&&!this.isObjectProperty())throw new Error("dotNotation only applicable for object properties")}function s(t,r,n){return new e(Oe(t)?t.toNumber():t,Oe(r)?r.toNumber():r,Oe(n)?n.toNumber():n)}return i.prototype=new r,i.prototype.type="IndexNode",i.prototype.isIndexNode=!0,i.prototype._compile=function(t,e){var r=sn(this.dimensions,(function(r,i){if(ur(r)){if(r.needsEnd()){var a=Object.create(e);a.end=!0;var o=r.start._compile(t,a),u=r.end._compile(t,a),h=r.step?r.step._compile(t,a):function(){return 1};return function(t,e,r){var a=n(r).valueOf(),c=Object.create(e);return c.end=a[i],s(o(t,c,r),u(t,c,r),h(t,c,r))}}var c=r.start._compile(t,e),l=r.end._compile(t,e),p=r.step?r.step._compile(t,e):function(){return 1};return function(t,e,r){return s(c(t,e,r),l(t,e,r),p(t,e,r))}}if(hr(r)&&"end"===r.name){var f=Object.create(e);f.end=!0;var d=r._compile(t,f);return function(t,e,r){var s=n(r).valueOf(),a=Object.create(e);return a.end=s[i],d(t,a,r)}}var m=r._compile(t,e);return function(t,e,r){return m(t,e,r)}})),i=ta(t,"index");return function(t,e,n){var s=sn(r,(function(r){return r(t,e,n)}));return i(...s)}},i.prototype.forEach=function(t){for(var e=0;e<this.dimensions.length;e++)t(this.dimensions[e],"dimensions["+e+"]",this);},i.prototype.map=function(t){for(var e=[],r=0;r<this.dimensions.length;r++)e[r]=this._ifNode(t(this.dimensions[r],"dimensions["+r+"]",this));return new i(e,this.dotNotation)},i.prototype.clone=function(){return new i(this.dimensions.slice(0),this.dotNotation)},i.prototype.isObjectProperty=function(){return 1===this.dimensions.length&&tr(this.dimensions[0])&&"string"==typeof this.dimensions[0].value},i.prototype.getObjectProperty=function(){return this.isObjectProperty()?this.dimensions[0].value:null},i.prototype._toString=function(t){return this.dotNotation?"."+this.getObjectProperty():"["+this.dimensions.join(", ")+"]"},i.prototype.toJSON=function(){return {mathjs:"IndexNode",dimensions:this.dimensions,dotNotation:this.dotNotation}},i.fromJSON=function(t){return new i(t.dimensions,t.dotNotation)},i.prototype.toHTML=function(t){for(var e=[],r=0;r<this.dimensions.length;r++)e[r]=this.dimensions[r].toHTML();return this.dotNotation?'<span class="math-operator math-accessor-operator">.</span><span class="math-symbol math-property">'+$r(this.getObjectProperty())+"</span>":'<span class="math-parenthesis math-square-parenthesis">[</span>'+e.join('<span class="math-separator">,</span>')+'<span class="math-parenthesis math-square-parenthesis">]</span>'},i.prototype._toTex=function(t){var e=this.dimensions.map((function(e){return e.toTex(t)}));return this.dotNotation?"."+this.getObjectProperty():"_{"+e.join(",")+"}"},i}),{isClass:!0,isNode:!0}),lo=cn("ObjectNode",["Node"],(t=>{var{Node:e}=t;function r(t){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");if(this.properties=t||{},t&&("object"!=typeof t||!Object.keys(t).every((function(e){return ir(t[e])}))))throw new TypeError("Object containing Nodes expected")}return r.prototype=new e,r.prototype.type="ObjectNode",r.prototype.isObjectNode=!0,r.prototype._compile=function(t,e){var r={};for(var n in this.properties)if(wr(this.properties,n)){var i=Vr(n),s=JSON.parse(i);if(!ra(this.properties,s))throw new Error('No access to property "'+s+'"');r[s]=this.properties[n]._compile(t,e);}return function(t,e,n){var i={};for(var s in r)wr(r,s)&&(i[s]=r[s](t,e,n));return i}},r.prototype.forEach=function(t){for(var e in this.properties)wr(this.properties,e)&&t(this.properties[e],"properties["+Vr(e)+"]",this);},r.prototype.map=function(t){var e={};for(var n in this.properties)wr(this.properties,n)&&(e[n]=this._ifNode(t(this.properties[n],"properties["+Vr(n)+"]",this)));return new r(e)},r.prototype.clone=function(){var t={};for(var e in this.properties)wr(this.properties,e)&&(t[e]=this.properties[e]);return new r(t)},r.prototype._toString=function(t){var e=[];for(var r in this.properties)wr(this.properties,r)&&e.push(Vr(r)+": "+this.properties[r].toString(t));return "{"+e.join(", ")+"}"},r.prototype.toJSON=function(){return {mathjs:"ObjectNode",properties:this.properties}},r.fromJSON=function(t){return new r(t.properties)},r.prototype.toHTML=function(t){var e=[];for(var r in this.properties)wr(this.properties,r)&&e.push('<span class="math-symbol math-property">'+$r(r)+'</span><span class="math-operator math-assignment-operator math-property-assignment-operator math-binary-operator">:</span>'+this.properties[r].toHTML(t));return '<span class="math-parenthesis math-curly-parenthesis">{</span>'+e.join('<span class="math-separator">,</span>')+'<span class="math-parenthesis math-curly-parenthesis">}</span>'},r.prototype._toTex=function(t){var e=[];for(var r in this.properties)wr(this.properties,r)&&e.push("\\mathbf{"+r+":} & "+this.properties[r].toTex(t)+"\\\\");return "\\left\\{\\begin{array}{ll}".concat(e.join("\n"),"\\end{array}\\right\\}")},r}),{isClass:!0,isNode:!0}),po=cn("OperatorNode",["Node"],(t=>{var{Node:e}=t;function r(t,e,n,i){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");if("string"!=typeof t)throw new TypeError('string expected for parameter "op"');if("string"!=typeof e)throw new TypeError('string expected for parameter "fn"');if(!Array.isArray(n)||!n.every(ir))throw new TypeError('Array containing Nodes expected for parameter "args"');this.implicit=!0===i,this.op=t,this.fn=e,this.args=n||[];}function n(t,e,r,n,i){var s,a=Ga(t,e),o=Wa(t,e);if("all"===e||n.length>2&&"OperatorNode:add"!==t.getIdentifier()&&"OperatorNode:multiply"!==t.getIdentifier())return n.map((function(t){switch(t.getContent().type){case"ArrayNode":case"ConstantNode":case"SymbolNode":case"ParenthesisNode":return !1;default:return !0}}));switch(n.length){case 0:s=[];break;case 1:var u=Ga(n[0],e);if(i&&null!==u){var h,c;if("keep"===e?(h=n[0].getIdentifier(),c=t.getIdentifier()):(h=n[0].getContent().getIdentifier(),c=t.getContent().getIdentifier()),!1===$a[a][c].latexLeftParens){s=[!1];break}if(!1===$a[u][h].latexParens){s=[!1];break}}if(null===u){s=[!1];break}if(u<=a){s=[!0];break}s=[!1];break;case 2:var l,p,f=Ga(n[0],e),d=Ya(t,n[0],e);l=null!==f&&(f===a&&"right"===o&&!d||f<a);var m,y,g,v=Ga(n[1],e),x=Ya(t,n[1],e);if(p=null!==v&&(v===a&&"left"===o&&!x||v<a),i)"keep"===e?(m=t.getIdentifier(),y=t.args[0].getIdentifier(),g=t.args[1].getIdentifier()):(m=t.getContent().getIdentifier(),y=t.args[0].getContent().getIdentifier(),g=t.args[1].getContent().getIdentifier()),null!==f&&(!1===$a[a][m].latexLeftParens&&(l=!1),!1===$a[f][y].latexParens&&(l=!1)),null!==v&&(!1===$a[a][m].latexRightParens&&(p=!1),!1===$a[v][g].latexParens&&(p=!1));s=[l,p];break;default:"OperatorNode:add"!==t.getIdentifier()&&"OperatorNode:multiply"!==t.getIdentifier()||(s=n.map((function(r){var n=Ga(r,e),i=Ya(t,r,e),s=Wa(r,e);return null!==n&&(a===n&&o===s&&!i||n<a)})));}return n.length>=2&&"OperatorNode:multiply"===t.getIdentifier()&&t.implicit&&"auto"===e&&"hide"===r&&(s=n.map((function(t,e){var r="ParenthesisNode"===t.getIdentifier();return !(!s[e]&&!r)}))),s}return r.prototype=new e,r.prototype.type="OperatorNode",r.prototype.isOperatorNode=!0,r.prototype._compile=function(t,e){if("string"!=typeof this.fn||!na(t,this.fn))throw t[this.fn]?new Error('No access to function "'+this.fn+'"'):new Error("Function "+this.fn+' missing in provided namespace "math"');var r=ta(t,this.fn),n=sn(this.args,(function(r){return r._compile(t,e)}));if(1===n.length){var i=n[0];return function(t,e,n){return r(i(t,e,n))}}if(2===n.length){var s=n[0],a=n[1];return function(t,e,n){return r(s(t,e,n),a(t,e,n))}}return function(t,e,i){return r.apply(null,sn(n,(function(r){return r(t,e,i)})))}},r.prototype.forEach=function(t){for(var e=0;e<this.args.length;e++)t(this.args[e],"args["+e+"]",this);},r.prototype.map=function(t){for(var e=[],n=0;n<this.args.length;n++)e[n]=this._ifNode(t(this.args[n],"args["+n+"]",this));return new r(this.op,this.fn,e,this.implicit)},r.prototype.clone=function(){return new r(this.op,this.fn,this.args.slice(0),this.implicit)},r.prototype.isUnary=function(){return 1===this.args.length},r.prototype.isBinary=function(){return 2===this.args.length},r.prototype._toString=function(t){var e=t&&t.parenthesis?t.parenthesis:"keep",r=t&&t.implicit?t.implicit:"hide",i=this.args,s=n(this,e,r,i,!1);if(1===i.length){var a=Wa(this,e),o=i[0].toString(t);s[0]&&(o="("+o+")");var u=/[a-zA-Z]+/.test(this.op);return "right"===a?this.op+(u?" ":"")+o:"left"===a?o+(u?" ":"")+this.op:o+this.op}if(2===i.length){var h=i[0].toString(t),c=i[1].toString(t);return s[0]&&(h="("+h+")"),s[1]&&(c="("+c+")"),this.implicit&&"OperatorNode:multiply"===this.getIdentifier()&&"hide"===r?h+" "+c:h+" "+this.op+" "+c}if(i.length>2&&("OperatorNode:add"===this.getIdentifier()||"OperatorNode:multiply"===this.getIdentifier())){var l=i.map((function(e,r){return e=e.toString(t),s[r]&&(e="("+e+")"),e}));return this.implicit&&"OperatorNode:multiply"===this.getIdentifier()&&"hide"===r?l.join(" "):l.join(" "+this.op+" ")}return this.fn+"("+this.args.join(", ")+")"},r.prototype.toJSON=function(){return {mathjs:"OperatorNode",op:this.op,fn:this.fn,args:this.args,implicit:this.implicit}},r.fromJSON=function(t){return new r(t.op,t.fn,t.args,t.implicit)},r.prototype.toHTML=function(t){var e=t&&t.parenthesis?t.parenthesis:"keep",r=t&&t.implicit?t.implicit:"hide",i=this.args,s=n(this,e,r,i,!1);if(1===i.length){var a=Wa(this,e),o=i[0].toHTML(t);return s[0]&&(o='<span class="math-parenthesis math-round-parenthesis">(</span>'+o+'<span class="math-parenthesis math-round-parenthesis">)</span>'),"right"===a?'<span class="math-operator math-unary-operator math-lefthand-unary-operator">'+$r(this.op)+"</span>"+o:o+'<span class="math-operator math-unary-operator math-righthand-unary-operator">'+$r(this.op)+"</span>"}if(2===i.length){var u=i[0].toHTML(t),h=i[1].toHTML(t);return s[0]&&(u='<span class="math-parenthesis math-round-parenthesis">(</span>'+u+'<span class="math-parenthesis math-round-parenthesis">)</span>'),s[1]&&(h='<span class="math-parenthesis math-round-parenthesis">(</span>'+h+'<span class="math-parenthesis math-round-parenthesis">)</span>'),this.implicit&&"OperatorNode:multiply"===this.getIdentifier()&&"hide"===r?u+'<span class="math-operator math-binary-operator math-implicit-binary-operator"></span>'+h:u+'<span class="math-operator math-binary-operator math-explicit-binary-operator">'+$r(this.op)+"</span>"+h}var c=i.map((function(e,r){return e=e.toHTML(t),s[r]&&(e='<span class="math-parenthesis math-round-parenthesis">(</span>'+e+'<span class="math-parenthesis math-round-parenthesis">)</span>'),e}));return i.length>2&&("OperatorNode:add"===this.getIdentifier()||"OperatorNode:multiply"===this.getIdentifier())?this.implicit&&"OperatorNode:multiply"===this.getIdentifier()&&"hide"===r?c.join('<span class="math-operator math-binary-operator math-implicit-binary-operator"></span>'):c.join('<span class="math-operator math-binary-operator math-explicit-binary-operator">'+$r(this.op)+"</span>"):'<span class="math-function">'+$r(this.fn)+'</span><span class="math-paranthesis math-round-parenthesis">(</span>'+c.join('<span class="math-separator">,</span>')+'<span class="math-paranthesis math-round-parenthesis">)</span>'},r.prototype._toTex=function(t){var e=t&&t.parenthesis?t.parenthesis:"keep",r=t&&t.implicit?t.implicit:"hide",i=this.args,s=n(this,e,r,i,!0),a=no[this.fn];if(a=void 0===a?this.op:a,1===i.length){var o=Wa(this,e),u=i[0].toTex(t);return s[0]&&(u="\\left(".concat(u,"\\right)")),"right"===o?a+u:u+a}if(2===i.length){var h=i[0],c=h.toTex(t);s[0]&&(c="\\left(".concat(c,"\\right)"));var l,p=i[1].toTex(t);switch(s[1]&&(p="\\left(".concat(p,"\\right)")),l="keep"===e?h.getIdentifier():h.getContent().getIdentifier(),this.getIdentifier()){case"OperatorNode:divide":return a+"{"+c+"}{"+p+"}";case"OperatorNode:pow":switch(c="{"+c+"}",p="{"+p+"}",l){case"ConditionalNode":case"OperatorNode:divide":c="\\left(".concat(c,"\\right)");}break;case"OperatorNode:multiply":if(this.implicit&&"hide"===r)return c+"~"+p}return c+a+p}if(i.length>2&&("OperatorNode:add"===this.getIdentifier()||"OperatorNode:multiply"===this.getIdentifier())){var f=i.map((function(e,r){return e=e.toTex(t),s[r]&&(e="\\left(".concat(e,"\\right)")),e}));return "OperatorNode:multiply"===this.getIdentifier()&&this.implicit?f.join("~"):f.join(a)}return "\\mathrm{"+this.fn+"}\\left("+i.map((function(e){return e.toTex(t)})).join(",")+"\\right)"},r.prototype.getIdentifier=function(){return this.type+":"+this.fn},r}),{isClass:!0,isNode:!0}),fo=cn("ParenthesisNode",["Node"],(t=>{var{Node:e}=t;function r(t){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");if(!ir(t))throw new TypeError('Node expected for parameter "content"');this.content=t;}return r.prototype=new e,r.prototype.type="ParenthesisNode",r.prototype.isParenthesisNode=!0,r.prototype._compile=function(t,e){return this.content._compile(t,e)},r.prototype.getContent=function(){return this.content.getContent()},r.prototype.forEach=function(t){t(this.content,"content",this);},r.prototype.map=function(t){return new r(t(this.content,"content",this))},r.prototype.clone=function(){return new r(this.content)},r.prototype._toString=function(t){return !t||t&&!t.parenthesis||t&&"keep"===t.parenthesis?"("+this.content.toString(t)+")":this.content.toString(t)},r.prototype.toJSON=function(){return {mathjs:"ParenthesisNode",content:this.content}},r.fromJSON=function(t){return new r(t.content)},r.prototype.toHTML=function(t){return !t||t&&!t.parenthesis||t&&"keep"===t.parenthesis?'<span class="math-parenthesis math-round-parenthesis">(</span>'+this.content.toHTML(t)+'<span class="math-parenthesis math-round-parenthesis">)</span>':this.content.toHTML(t)},r.prototype._toTex=function(t){return !t||t&&!t.parenthesis||t&&"keep"===t.parenthesis?"\\left(".concat(this.content.toTex(t),"\\right)"):this.content.toTex(t)},r}),{isClass:!0,isNode:!0}),mo=cn("RangeNode",["Node"],(t=>{var{Node:e}=t;function r(t,e,n){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");if(!ir(t))throw new TypeError("Node expected");if(!ir(e))throw new TypeError("Node expected");if(n&&!ir(n))throw new TypeError("Node expected");if(arguments.length>3)throw new Error("Too many arguments");this.start=t,this.end=e,this.step=n||null;}function n(t,e){var r=Ga(t,e),n={},i=Ga(t.start,e);if(n.start=null!==i&&i<=r||"all"===e,t.step){var s=Ga(t.step,e);n.step=null!==s&&s<=r||"all"===e;}var a=Ga(t.end,e);return n.end=null!==a&&a<=r||"all"===e,n}return r.prototype=new e,r.prototype.type="RangeNode",r.prototype.isRangeNode=!0,r.prototype.needsEnd=function(){return this.filter((function(t){return hr(t)&&"end"===t.name})).length>0},r.prototype._compile=function(t,e){var r=t.range,n=this.start._compile(t,e),i=this.end._compile(t,e);if(this.step){var s=this.step._compile(t,e);return function(t,e,a){return r(n(t,e,a),i(t,e,a),s(t,e,a))}}return function(t,e,s){return r(n(t,e,s),i(t,e,s))}},r.prototype.forEach=function(t){t(this.start,"start",this),t(this.end,"end",this),this.step&&t(this.step,"step",this);},r.prototype.map=function(t){return new r(this._ifNode(t(this.start,"start",this)),this._ifNode(t(this.end,"end",this)),this.step&&this._ifNode(t(this.step,"step",this)))},r.prototype.clone=function(){return new r(this.start,this.end,this.step&&this.step)},r.prototype._toString=function(t){var e,r=n(this,t&&t.parenthesis?t.parenthesis:"keep"),i=this.start.toString(t);if(r.start&&(i="("+i+")"),e=i,this.step){var s=this.step.toString(t);r.step&&(s="("+s+")"),e+=":"+s;}var a=this.end.toString(t);return r.end&&(a="("+a+")"),e+=":"+a},r.prototype.toJSON=function(){return {mathjs:"RangeNode",start:this.start,end:this.end,step:this.step}},r.fromJSON=function(t){return new r(t.start,t.end,t.step)},r.prototype.toHTML=function(t){var e,r=n(this,t&&t.parenthesis?t.parenthesis:"keep"),i=this.start.toHTML(t);if(r.start&&(i='<span class="math-parenthesis math-round-parenthesis">(</span>'+i+'<span class="math-parenthesis math-round-parenthesis">)</span>'),e=i,this.step){var s=this.step.toHTML(t);r.step&&(s='<span class="math-parenthesis math-round-parenthesis">(</span>'+s+'<span class="math-parenthesis math-round-parenthesis">)</span>'),e+='<span class="math-operator math-range-operator">:</span>'+s;}var a=this.end.toHTML(t);return r.end&&(a='<span class="math-parenthesis math-round-parenthesis">(</span>'+a+'<span class="math-parenthesis math-round-parenthesis">)</span>'),e+='<span class="math-operator math-range-operator">:</span>'+a},r.prototype._toTex=function(t){var e=n(this,t&&t.parenthesis?t.parenthesis:"keep"),r=this.start.toTex(t);if(e.start&&(r="\\left(".concat(r,"\\right)")),this.step){var i=this.step.toTex(t);e.step&&(i="\\left(".concat(i,"\\right)")),r+=":"+i;}var s=this.end.toTex(t);return e.end&&(s="\\left(".concat(s,"\\right)")),r+=":"+s},r}),{isClass:!0,isNode:!0}),yo=cn("RelationalNode",["Node"],(t=>{var{Node:e}=t;function r(t,e){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");if(!Array.isArray(t))throw new TypeError("Parameter conditionals must be an array");if(!Array.isArray(e))throw new TypeError("Parameter params must be an array");if(t.length!==e.length-1)throw new TypeError("Parameter params must contain exactly one more element than parameter conditionals");this.conditionals=t,this.params=e;}return r.prototype=new e,r.prototype.type="RelationalNode",r.prototype.isRelationalNode=!0,r.prototype._compile=function(t,e){var r=this,n=this.params.map((r=>r._compile(t,e)));return function(e,i,s){for(var a,o=n[0](e,i,s),u=0;u<r.conditionals.length;u++){if(a=o,o=n[u+1](e,i,s),!ta(t,r.conditionals[u])(a,o))return !1}return !0}},r.prototype.forEach=function(t){this.params.forEach(((e,r)=>t(e,"params["+r+"]",this)),this);},r.prototype.map=function(t){return new r(this.conditionals.slice(),this.params.map(((e,r)=>this._ifNode(t(e,"params["+r+"]",this))),this))},r.prototype.clone=function(){return new r(this.conditionals,this.params)},r.prototype._toString=function(t){for(var e=t&&t.parenthesis?t.parenthesis:"keep",r=Ga(this,e),n=this.params.map((function(n,i){var s=Ga(n,e);return "all"===e||null!==s&&s<=r?"("+n.toString(t)+")":n.toString(t)})),i={equal:"==",unequal:"!=",smaller:"<",larger:">",smallerEq:"<=",largerEq:">="},s=n[0],a=0;a<this.conditionals.length;a++)s+=" "+i[this.conditionals[a]]+" "+n[a+1];return s},r.prototype.toJSON=function(){return {mathjs:"RelationalNode",conditionals:this.conditionals,params:this.params}},r.fromJSON=function(t){return new r(t.conditionals,t.params)},r.prototype.toHTML=function(t){for(var e=t&&t.parenthesis?t.parenthesis:"keep",r=Ga(this,e),n=this.params.map((function(n,i){var s=Ga(n,e);return "all"===e||null!==s&&s<=r?'<span class="math-parenthesis math-round-parenthesis">(</span>'+n.toHTML(t)+'<span class="math-parenthesis math-round-parenthesis">)</span>':n.toHTML(t)})),i={equal:"==",unequal:"!=",smaller:"<",larger:">",smallerEq:"<=",largerEq:">="},s=n[0],a=0;a<this.conditionals.length;a++)s+='<span class="math-operator math-binary-operator math-explicit-binary-operator">'+$r(i[this.conditionals[a]])+"</span>"+n[a+1];return s},r.prototype._toTex=function(t){for(var e=t&&t.parenthesis?t.parenthesis:"keep",r=Ga(this,e),n=this.params.map((function(n,i){var s=Ga(n,e);return "all"===e||null!==s&&s<=r?"\\left("+n.toTex(t)+"\right)":n.toTex(t)})),i=n[0],s=0;s<this.conditionals.length;s++)i+=no[this.conditionals[s]]+n[s+1];return i},r}),{isClass:!0,isNode:!0});function go(){return (go=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n]);}return t}).apply(this,arguments)}function vo(){return (vo=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n]);}return t}).apply(this,arguments)}var xo={createBigNumberClass:Yi},wo={createComplexClass:Qi},bo={createMatrixClass:rs},_o={MatrixDependencies:bo,createDenseMatrixClass:ns},Mo={createFractionClass:ts},Eo={BigNumberDependencies:xo,ComplexDependencies:wo,DenseMatrixDependencies:_o,FractionDependencies:Mo,createTyped:dn},No={typedDependencies:Eo,createEqualScalar:vs},So={MatrixDependencies:bo,equalScalarDependencies:No,typedDependencies:Eo,createSparseMatrixClass:xs},To={typedDependencies:Eo,createNumber:ws},Oo={FractionDependencies:Mo,typedDependencies:Eo,createFraction:_s},zo={DenseMatrixDependencies:_o,MatrixDependencies:bo,SparseMatrixDependencies:So,typedDependencies:Eo,createMatrix:Ms},Ao={typedDependencies:Eo,createUnaryMinus:Es},Co={typedDependencies:Eo,createAbs:Ns},Ro={typedDependencies:Eo,createAddScalar:Ss},Do={BigNumberDependencies:xo,DenseMatrixDependencies:_o,equalScalarDependencies:No,matrixDependencies:zo,typedDependencies:Eo,zerosDependencies:{BigNumberDependencies:xo,matrixDependencies:zo,typedDependencies:Eo,createZeros:pa},createRound:ba},Io={typedDependencies:Eo,createMultiplyScalar:js},Lo={matrixDependencies:zo,typedDependencies:Eo,createSize:Ks},Bo={addScalarDependencies:Ro,dotDependencies:{addScalarDependencies:Ro,conjDependencies:{typedDependencies:Eo,createConj:Gs},multiplyScalarDependencies:Io,sizeDependencies:Lo,typedDependencies:Eo,createDot:Fa},equalScalarDependencies:No,matrixDependencies:zo,multiplyScalarDependencies:Io,typedDependencies:Eo,createMultiply:qs},Fo={DenseMatrixDependencies:_o,addScalarDependencies:Ro,equalScalarDependencies:No,matrixDependencies:zo,typedDependencies:Eo,unaryMinusDependencies:Ao,createSubtract:Hs},Po={DenseMatrixDependencies:_o,matrixDependencies:zo,typedDependencies:Eo,createLarger:Na},Uo={BigNumberDependencies:xo,DenseMatrixDependencies:_o,SparseMatrixDependencies:So,matrixDependencies:zo,typedDependencies:Eo,createIdentity:Zs},qo={bignumberDependencies:{BigNumberDependencies:xo,typedDependencies:Eo,createBignumber:bs},fractionDependencies:Oo,numberDependencies:To,createNumeric:da},Ho={numericDependencies:qo,typedDependencies:Eo,createDivideScalar:ma},Vo={matrixDependencies:zo,typedDependencies:Eo,createSubset:oa},$o={BigNumberDependencies:xo,ComplexDependencies:wo,FractionDependencies:Mo,absDependencies:Co,addScalarDependencies:Ro,divideScalarDependencies:Ho,equalDependencies:{DenseMatrixDependencies:_o,equalScalarDependencies:No,matrixDependencies:zo,typedDependencies:Eo,createEqual:Ma},fixDependencies:{ComplexDependencies:wo,ceilDependencies:{equalScalarDependencies:No,matrixDependencies:zo,roundDependencies:Do,typedDependencies:Eo,createCeil:zs},floorDependencies:{equalScalarDependencies:No,matrixDependencies:zo,roundDependencies:Do,typedDependencies:Eo,createFloor:Cs},matrixDependencies:zo,typedDependencies:Eo,createFix:As},formatDependencies:{typedDependencies:Eo,createFormat:fa},isNumericDependencies:{typedDependencies:Eo,createIsNumeric:ms},multiplyScalarDependencies:Io,numberDependencies:To,powDependencies:{ComplexDependencies:wo,fractionDependencies:Oo,identityDependencies:Uo,matrixDependencies:zo,multiplyDependencies:Bo,numberDependencies:To,typedDependencies:Eo,createPow:ya},roundDependencies:Do,subtractDependencies:Fo,createUnitClass:ka},Yo={createNode:Ua},Zo={UnitDependencies:$o,NodeDependencies:Yo,createSymbolNode:cn("SymbolNode",["math","?Unit","Node"],(t=>{var{math:e,Unit:r,Node:n}=t;function i(t){return !!r&&r.isValuelessUnit(t)}function s(t){if(!(this instanceof s))throw new SyntaxError("Constructor must be called with the new operator");if("string"!=typeof t)throw new TypeError('String expected for parameter "name"');this.name=t;}return s.prototype=new n,s.prototype.type="SymbolNode",s.prototype.isSymbolNode=!0,s.prototype._compile=function(t,e){var n=this.name;if(!0===e[n])return function(t,e,r){return e[n]};if(n in t)return function(e,r,i){return ta(n in e?e:t,n)};var s=i(n);return function(t,e,i){return n in t?ta(t,n):s?new r(null,n):function(t){throw new Error("Undefined symbol "+t)}(n)}},s.prototype.forEach=function(t){},s.prototype.map=function(t){return this.clone()},s.prototype.clone=function(){return new s(this.name)},s.prototype._toString=function(t){return this.name},s.prototype.toHTML=function(t){var e=$r(this.name);return "true"===e||"false"===e?'<span class="math-symbol math-boolean">'+e+"</span>":"i"===e?'<span class="math-symbol math-imaginary-symbol">'+e+"</span>":"Infinity"===e?'<span class="math-symbol math-infinity-symbol">'+e+"</span>":"NaN"===e?'<span class="math-symbol math-nan-symbol">'+e+"</span>":"null"===e?'<span class="math-symbol math-null-symbol">'+e+"</span>":"undefined"===e?'<span class="math-symbol math-undefined-symbol">'+e+"</span>":'<span class="math-symbol">'+e+"</span>"},s.prototype.toJSON=function(){return {mathjs:"SymbolNode",name:this.name}},s.fromJSON=function(t){return new s(t.name)},s.prototype._toTex=function(t){var r=!1;void 0===e[this.name]&&i(this.name)&&(r=!0);var n=oo(this.name,r);return "\\"===n[0]?n:" "+n},s}),{isClass:!0,isNode:!0})};({parseDependencies:{AccessorNodeDependencies:{NodeDependencies:Yo,subsetDependencies:Vo,createAccessorNode:Ha},ArrayNodeDependencies:{NodeDependencies:Yo,createArrayNode:Va},AssignmentNodeDependencies:{matrixDependencies:zo,NodeDependencies:Yo,subsetDependencies:Vo,createAssignmentNode:Za},BlockNodeDependencies:{NodeDependencies:Yo,ResultSetDependencies:{createResultSet:wn},createBlockNode:Xa},ConditionalNodeDependencies:{NodeDependencies:Yo,createConditionalNode:Qa},ConstantNodeDependencies:{NodeDependencies:Yo,createConstantNode:uo},FunctionAssignmentNodeDependencies:{NodeDependencies:Yo,typedDependencies:Eo,createFunctionAssignmentNode:ho},FunctionNodeDependencies:{NodeDependencies:Yo,SymbolNodeDependencies:Zo,createFunctionNode:cn("FunctionNode",["math","Node","SymbolNode"],(t=>{var{math:e,Node:r,SymbolNode:n}=t;function i(t,e){if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator");if("string"==typeof t&&(t=new n(t)),!ir(t))throw new TypeError('Node expected as parameter "fn"');if(!Array.isArray(e)||!e.every(ir))throw new TypeError('Array containing Nodes expected for parameter "args"');this.fn=t,this.args=e||[],Object.defineProperty(this,"name",{get:function(){return this.fn.name||""}.bind(this),set:function(){throw new Error("Cannot assign a new name, name is read-only")}});}i.prototype=new r,i.prototype.type="FunctionNode",i.prototype.isFunctionNode=!0,i.prototype._compile=function(t,e){if(!(this instanceof i))throw new TypeError("No valid FunctionNode");var r=sn(this.args,(function(r){return r._compile(t,e)}));if(hr(this.fn)){var n=this.fn.name,s=n in t?ta(t,n):void 0;if("function"==typeof s&&!0===s.rawArgs){var a=this.args;return function(e,r,i){return (n in e?ta(e,n):s)(a,t,go({},e,r))}}if(1===r.length){var o=r[0];return function(t,e,r){return (n in t?ta(t,n):s)(o(t,e,r))}}if(2===r.length){var u=r[0],h=r[1];return function(t,e,r){return (n in t?ta(t,n):s)(u(t,e,r),h(t,e,r))}}return function(t,e,i){return (n in t?ta(t,n):s).apply(null,sn(r,(function(r){return r(t,e,i)})))}}if(Ze(this.fn)&&nr(this.fn.index)&&this.fn.index.isObjectProperty()){var c=this.fn.object._compile(t,e),l=this.fn.index.getObjectProperty(),p=this.args;return function(e,n,i){var s=c(e,n,i);return function(t,e){if(!na(t,e))throw new Error('No access to method "'+e+'"')}(s,l),s[l]&&s[l].rawArgs?s[l](p,t,go({},e,n)):s[l].apply(s,sn(r,(function(t){return t(e,n,i)})))}}var f=this.fn._compile(t,e),d=this.args;return function(e,n,i){var s=f(e,n,i);return s&&s.rawArgs?s(d,t,go({},e,n)):s.apply(s,sn(r,(function(t){return t(e,n,i)})))}},i.prototype.forEach=function(t){t(this.fn,"fn",this);for(var e=0;e<this.args.length;e++)t(this.args[e],"args["+e+"]",this);},i.prototype.map=function(t){for(var e=this._ifNode(t(this.fn,"fn",this)),r=[],n=0;n<this.args.length;n++)r[n]=this._ifNode(t(this.args[n],"args["+n+"]",this));return new i(e,r)},i.prototype.clone=function(){return new i(this.fn,this.args.slice(0))};var s=i.prototype.toString;function a(t,e,r){for(var n,i="",s=/\$(?:\{([a-z_][a-z_0-9]*)(?:\[([0-9]+)\])?\}|\$)/gi,a=0;null!==(n=s.exec(t));)if(i+=t.substring(a,n.index),a=n.index,"$$"===n[0])i+="$",a++;else {a+=n[0].length;var o=e[n[1]];if(!o)throw new ReferenceError("Template: Property "+n[1]+" does not exist.");if(void 0===n[2])switch(typeof o){case"string":i+=o;break;case"object":if(ir(o))i+=o.toTex(r);else {if(!Array.isArray(o))throw new TypeError("Template: "+n[1]+" has to be a Node, String or array of Nodes");i+=o.map((function(t,e){if(ir(t))return t.toTex(r);throw new TypeError("Template: "+n[1]+"["+e+"] is not a Node.")})).join(",");}break;default:throw new TypeError("Template: "+n[1]+" has to be a Node, String or array of Nodes")}else {if(!ir(o[n[2]]&&o[n[2]]))throw new TypeError("Template: "+n[1]+"["+n[2]+"] is not a Node.");i+=o[n[2]].toTex(r);}}return i+=t.slice(a)}i.prototype.toString=function(t){var e,r=this.fn.toString(t);return t&&"object"==typeof t.handler&&wr(t.handler,r)&&(e=t.handler[r](this,t)),void 0!==e?e:s.call(this,t)},i.prototype._toString=function(t){var e=this.args.map((function(e){return e.toString(t)}));return (er(this.fn)?"("+this.fn.toString(t)+")":this.fn.toString(t))+"("+e.join(", ")+")"},i.prototype.toJSON=function(){return {mathjs:"FunctionNode",fn:this.fn,args:this.args}},i.fromJSON=function(t){return new i(t.fn,t.args)},i.prototype.toHTML=function(t){var e=this.args.map((function(e){return e.toHTML(t)}));return '<span class="math-function">'+$r(this.fn)+'</span><span class="math-paranthesis math-round-parenthesis">(</span>'+e.join('<span class="math-separator">,</span>')+'<span class="math-paranthesis math-round-parenthesis">)</span>'};var o=i.prototype.toTex;return i.prototype.toTex=function(t){var e;return t&&"object"==typeof t.handler&&wr(t.handler,this.name)&&(e=t.handler[this.name](this,t)),void 0!==e?e:o.call(this,t)},i.prototype._toTex=function(t){var r,n,i=this.args.map((function(e){return e.toTex(t)}));switch(io[this.name]&&(r=io[this.name]),!e[this.name]||"function"!=typeof e[this.name].toTex&&"object"!=typeof e[this.name].toTex&&"string"!=typeof e[this.name].toTex||(r=e[this.name].toTex),typeof r){case"function":n=r(this,t);break;case"string":n=a(r,this,t);break;case"object":switch(typeof r[i.length]){case"function":n=r[i.length](this,t);break;case"string":n=a(r[i.length],this,t);}}return void 0!==n?n:a("\\mathrm{${name}}\\left(${args}\\right)",this,t)},i.prototype.getIdentifier=function(){return this.type+":"+this.name},i}),{isClass:!0,isNode:!0})},IndexNodeDependencies:{NodeDependencies:Yo,RangeDependencies:{createRangeClass:es},sizeDependencies:Lo,createIndexNode:co},ObjectNodeDependencies:{NodeDependencies:Yo,createObjectNode:lo},OperatorNodeDependencies:{NodeDependencies:Yo,createOperatorNode:po},ParenthesisNodeDependencies:{NodeDependencies:Yo,createParenthesisNode:fo},RangeNodeDependencies:{NodeDependencies:Yo,createRangeNode:mo},RelationalNodeDependencies:{NodeDependencies:Yo,createRelationalNode:yo},SymbolNodeDependencies:Zo,numericDependencies:qo,typedDependencies:Eo,createParse:cn("parse",["typed","numeric","config","AccessorNode","ArrayNode","AssignmentNode","BlockNode","ConditionalNode","ConstantNode","FunctionAssignmentNode","FunctionNode","IndexNode","ObjectNode","OperatorNode","ParenthesisNode","RangeNode","RelationalNode","SymbolNode"],(t=>{var{typed:e,numeric:r,config:n,AccessorNode:i,ArrayNode:s,AssignmentNode:a,BlockNode:o,ConditionalNode:u,ConstantNode:h,FunctionAssignmentNode:c,FunctionNode:l,IndexNode:p,ObjectNode:f,OperatorNode:d,ParenthesisNode:m,RangeNode:y,RelationalNode:g,SymbolNode:v}=t,x=e("parse",{string:function(t){return P(t,{})},"Array | Matrix":function(t){return w(t,{})},"string, Object":function(t,e){return P(t,void 0!==e.nodes?e.nodes:{})},"Array | Matrix, Object":w});function w(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=void 0!==e.nodes?e.nodes:{};return is(t,(function(t){if("string"!=typeof t)throw new TypeError("String expected");return P(t,r)}))}var b=0,_=1,M=2,E=3,N=4,S={",":!0,"(":!0,")":!0,"[":!0,"]":!0,"{":!0,"}":!0,'"':!0,"'":!0,";":!0,"+":!0,"-":!0,"*":!0,".*":!0,"/":!0,"./":!0,"%":!0,"^":!0,".^":!0,"~":!0,"!":!0,"&":!0,"|":!0,"^|":!0,"=":!0,":":!0,"?":!0,"==":!0,"!=":!0,"<":!0,">":!0,"<=":!0,">=":!0,"<<":!0,">>":!0,">>>":!0},T={mod:!0,to:!0,in:!0,and:!0,xor:!0,or:!0,not:!0},O={true:!0,false:!1,null:null,undefined:void 0},z=["NaN","Infinity"];function A(t,e){return t.expression.substr(t.index,e)}function C(t){return A(t,1)}function R(t){t.index++;}function D(t){return t.expression.charAt(t.index-1)}function k(t){return t.expression.charAt(t.index+1)}function I(t){for(t.tokenType=b,t.token="",t.comment="";x.isWhitespace(C(t),t.nestingLevel);)R(t);if("#"===C(t))for(;"\n"!==C(t)&&""!==C(t);)t.comment+=C(t),R(t);if(""!==C(t)){if("\n"===C(t)&&!t.nestingLevel)return t.tokenType=_,t.token=C(t),void R(t);var e=C(t),r=A(t,2),n=A(t,3);if(3===n.length&&S[n])return t.tokenType=_,t.token=n,R(t),R(t),void R(t);if(2===r.length&&S[r])return t.tokenType=_,t.token=r,R(t),void R(t);if(S[e])return t.tokenType=_,t.token=e,void R(t);if(x.isDigitDot(e)){t.tokenType=M;var i=A(t,2);if("0b"===i||"0o"===i||"0x"===i){for(t.token+=C(t),R(t),t.token+=C(t),R(t);x.isHexDigit(C(t));)t.token+=C(t),R(t);return}if("."===C(t))t.token+=C(t),R(t),x.isDigit(C(t))||(t.tokenType=_);else {for(;x.isDigit(C(t));)t.token+=C(t),R(t);x.isDecimalMark(C(t),k(t))&&(t.token+=C(t),R(t));}for(;x.isDigit(C(t));)t.token+=C(t),R(t);if("E"===C(t)||"e"===C(t))if(x.isDigit(k(t))||"-"===k(t)||"+"===k(t)){if(t.token+=C(t),R(t),"+"!==C(t)&&"-"!==C(t)||(t.token+=C(t),R(t)),!x.isDigit(C(t)))throw at(t,'Digit expected, got "'+C(t)+'"');for(;x.isDigit(C(t));)t.token+=C(t),R(t);if(x.isDecimalMark(C(t),k(t)))throw at(t,'Digit expected, got "'+C(t)+'"')}else if("."===k(t))throw R(t),at(t,'Digit expected, got "'+C(t)+'"')}else {if(!x.isAlpha(C(t),D(t),k(t))){for(t.tokenType=N;""!==C(t);)t.token+=C(t),R(t);throw at(t,'Syntax error in part "'+t.token+'"')}for(;x.isAlpha(C(t),D(t),k(t))||x.isDigit(C(t));)t.token+=C(t),R(t);wr(T,t.token)?t.tokenType=_:t.tokenType=E;}}else t.tokenType=_;}function L(t){do{I(t);}while("\n"===t.token)}function B(t){t.nestingLevel++;}function F(t){t.nestingLevel--;}function P(t,e){var r={extraNodes:{},expression:"",comment:"",index:0,token:"",tokenType:b,nestingLevel:0,conditionalLevel:null};vo(r,{expression:t,extraNodes:e}),I(r);var n=function(t){var e,r,n=[];""!==t.token&&"\n"!==t.token&&";"!==t.token&&((e=U(t)).comment=t.comment);for(;"\n"===t.token||";"===t.token;)0===n.length&&e&&(r=";"!==t.token,n.push({node:e,visible:r})),I(t),"\n"!==t.token&&";"!==t.token&&""!==t.token&&((e=U(t)).comment=t.comment,r=";"!==t.token,n.push({node:e,visible:r}));return n.length>0?new o(n):(e||((e=new h(void 0)).comment=t.comment),e)}(r);if(""!==r.token)throw r.tokenType===_?ot(r,"Unexpected operator "+r.token):at(r,'Unexpected part "'+r.token+'"');return n}function U(t){var e,r,n,i,s=function(t){var e=function(t){var e=j(t);for(;"or"===t.token;)L(t),e=new d("or","or",[e,j(t)]);return e}(t);for(;"?"===t.token;){var r=t.conditionalLevel;t.conditionalLevel=t.nestingLevel,L(t);var n=e,i=U(t);if(":"!==t.token)throw at(t,"False part of conditional expression expected");t.conditionalLevel=null,L(t);var s=U(t);e=new u(n,i,s),t.conditionalLevel=r;}return e}(t);if("="===t.token){if(hr(s))return e=s.name,L(t),n=U(t),new a(new v(e),n);if(Ze(s))return L(t),n=U(t),new a(s.object,s.index,n);if(rr(s)&&hr(s.fn)&&(i=!0,r=[],e=s.name,s.args.forEach((function(t,e){hr(t)?r[e]=t.name:i=!1;})),i))return L(t),n=U(t),new c(e,r,n);throw at(t,"Invalid left hand side of assignment operator =")}return s}function j(t){for(var e=q(t);"xor"===t.token;)L(t),e=new d("xor","xor",[e,q(t)]);return e}function q(t){for(var e=H(t);"and"===t.token;)L(t),e=new d("and","and",[e,H(t)]);return e}function H(t){for(var e=V(t);"|"===t.token;)L(t),e=new d("|","bitOr",[e,V(t)]);return e}function V(t){for(var e=$(t);"^|"===t.token;)L(t),e=new d("^|","bitXor",[e,$(t)]);return e}function $(t){for(var e=G(t);"&"===t.token;)L(t),e=new d("&","bitAnd",[e,G(t)]);return e}function G(t){for(var e=[W(t)],r=[],n={"==":"equal","!=":"unequal","<":"smaller",">":"larger","<=":"smallerEq",">=":"largerEq"};wr(n,t.token);){var i={name:t.token,fn:n[t.token]};r.push(i),L(t),e.push(W(t));}return 1===e.length?e[0]:2===e.length?new d(r[0].name,r[0].fn,e):new g(r.map((t=>t.fn)),e)}function W(t){var e,r,n,i;e=Y(t);for(var s={"<<":"leftShift",">>":"rightArithShift",">>>":"rightLogShift"};wr(s,t.token);)n=s[r=t.token],L(t),i=[e,Y(t)],e=new d(r,n,i);return e}function Y(t){var e,r,n,i;e=Z(t);for(var s={to:"to",in:"to"};wr(s,t.token);)n=s[r=t.token],L(t),"in"===r&&""===t.token?e=new d("*","multiply",[e,new v("in")],!0):(i=[e,Z(t)],e=new d(r,n,i));return e}function Z(t){var e,r=[];if(e=":"===t.token?new h(1):X(t),":"===t.token&&t.conditionalLevel!==t.nestingLevel){for(r.push(e);":"===t.token&&r.length<3;)L(t),")"===t.token||"]"===t.token||","===t.token||""===t.token?r.push(new v("end")):r.push(X(t));e=3===r.length?new y(r[0],r[2],r[1]):new y(r[0],r[1]);}return e}function X(t){var e,r,n,i;e=Q(t);for(var s={"+":"add","-":"subtract"};wr(s,t.token);)n=s[r=t.token],L(t),i=[e,Q(t)],e=new d(r,n,i);return e}function Q(t){var e,r,n,i;r=e=J(t);for(var s={"*":"multiply",".*":"dotMultiply","/":"divide","./":"dotDivide","%":"mod",mod:"mod"};wr(s,t.token);)i=s[n=t.token],L(t),r=J(t),e=new d(n,i,[e,r]);return e}function J(t){var e,r;for(r=e=K(t);t.tokenType===E||"in"===t.token&&tr(e)||!(t.tokenType!==M||tr(r)||ar(r)&&"!"!==r.op)||"("===t.token;)r=K(t),e=new d("*","multiply",[e,r],!0);return e}function K(t){for(var e=tt(t),r=e,n=[];"/"===t.token&&tr(r);){if(n.push(vo({},t)),L(t),t.tokenType!==M){vo(t,n.pop());break}if(n.push(vo({},t)),L(t),t.tokenType!==E&&"("!==t.token){n.pop(),vo(t,n.pop());break}vo(t,n.pop()),n.pop(),r=tt(t),e=new d("/","divide",[e,r]);}return e}function tt(t){var e,i,a,o={"-":"unaryMinus","+":"unaryPlus","~":"bitNot",not:"not"};return wr(o,t.token)?(a=o[t.token],e=t.token,L(t),i=[tt(t)],new d(e,a,i)):function(t){var e,i,a,o;e=function(t){var e,i,a;e=function(t){var e=[];if(t.tokenType===E&&wr(t.extraNodes,t.token)){var i=t.extraNodes[t.token];if(I(t),"("===t.token){if(e=[],B(t),I(t),")"!==t.token)for(e.push(U(t));","===t.token;)I(t),e.push(U(t));if(")"!==t.token)throw at(t,"Parenthesis ) expected");F(t),I(t);}return new i(e)}return function(t){var e;if(t.tokenType===E||t.tokenType===_&&t.token in T)return e=t.token,I(t),et(t,wr(O,e)?new h(O[e]):-1!==z.indexOf(e)?new h(r(e,"number")):new v(e));return function(t){var e;if('"'===t.token)return e=rt(t),et(t,new h(e));return function(t){var e;if("'"===t.token)return e=nt(t),et(t,new h(e));return function(t){var e,i,a,o;if("["===t.token){if(B(t),I(t),"]"!==t.token){var u=it(t);if(";"===t.token){for(a=1,i=[u];";"===t.token;)I(t),i[a]=it(t),a++;if("]"!==t.token)throw at(t,"End of matrix ] expected");F(t),I(t),o=i[0].items.length;for(var c=1;c<a;c++)if(i[c].items.length!==o)throw ot(t,"Column dimensions mismatch ("+i[c].items.length+" !== "+o+")");e=new s(i);}else {if("]"!==t.token)throw at(t,"End of matrix ] expected");F(t),I(t),e=u;}}else F(t),I(t),e=new s([]);return et(t,e)}return function(t){if("{"===t.token){var e;B(t);var i={};do{if(I(t),"}"!==t.token){if('"'===t.token)e=rt(t);else if("'"===t.token)e=nt(t);else {if(!(t.tokenType===E||t.tokenType===_&&t.token in T))throw at(t,"Symbol or string expected as object key");e=t.token,I(t);}if(":"!==t.token)throw at(t,"Colon : expected after object key");I(t),i[e]=U(t);}}while(","===t.token);if("}"!==t.token)throw at(t,"Comma , or bracket } expected after object value");F(t),I(t);var s=new f(i);return s=et(t,s)}return function(t){var e;if(t.tokenType===M)return e=t.token,I(t),new h(r(e,n.number));return function(t){var e;if("("===t.token){if(B(t),I(t),e=U(t),")"!==t.token)throw at(t,"Parenthesis ) expected");return F(t),I(t),e=et(t,e=new m(e))}return function(t){throw ""===t.token?at(t,"Unexpected end of expression"):at(t,"Value expected")}(t)}(t)}(t)}(t)}(t)}(t)}(t)}(t)}(t);var o={"!":"factorial","'":"ctranspose"};for(;wr(o,t.token);)a=o[i=t.token],I(t),e=et(t,e=new d(i,a,[e]));return e}(t),("^"===t.token||".^"===t.token)&&(a="^"===(i=t.token)?"pow":"dotPow",L(t),o=[e,tt(t)],e=new d(i,a,o));return e}(t)}function et(t,e,r){for(var n;!("("!==t.token&&"["!==t.token&&"."!==t.token||r&&-1===r.indexOf(t.token));)if(n=[],"("===t.token){if(!hr(e)&&!Ze(e))return e;if(B(t),I(t),")"!==t.token)for(n.push(U(t));","===t.token;)I(t),n.push(U(t));if(")"!==t.token)throw at(t,"Parenthesis ) expected");F(t),I(t),e=new l(e,n);}else if("["===t.token){if(B(t),I(t),"]"!==t.token)for(n.push(U(t));","===t.token;)I(t),n.push(U(t));if("]"!==t.token)throw at(t,"Parenthesis ] expected");F(t),I(t),e=new i(e,new p(n));}else {if(I(t),t.tokenType!==E)throw at(t,"Property name expected after dot");n.push(new h(t.token)),I(t);e=new i(e,new p(n,!0));}return e}function rt(t){for(var e="";""!==C(t)&&'"'!==C(t);)"\\"===C(t)&&(e+=C(t),R(t)),e+=C(t),R(t);if(I(t),'"'!==t.token)throw at(t,'End of string " expected');return I(t),JSON.parse('"'+e+'"')}function nt(t){for(var e="";""!==C(t)&&"'"!==C(t);)"\\"===C(t)&&(e+=C(t),R(t)),e+=C(t),R(t);if(I(t),"'"!==t.token)throw at(t,"End of string ' expected");return I(t),JSON.parse('"'+e+'"')}function it(t){for(var e=[U(t)],r=1;","===t.token;)I(t),e[r]=U(t),r++;return new s(e)}function st(t){return t.index-t.token.length+1}function at(t,e){var r=st(t),n=new SyntaxError(e+" (char "+r+")");return n.char=r,n}function ot(t,e){var r=st(t),n=new SyntaxError(e+" (char "+r+")");return n.char=r,n}return x.isAlpha=function(t,e,r){return x.isValidLatinOrGreek(t)||x.isValidMathSymbol(t,r)||x.isValidMathSymbol(e,t)},x.isValidLatinOrGreek=function(t){return /^[a-zA-Z_$\u00C0-\u02AF\u0370-\u03FF\u2100-\u214F]$/.test(t)},x.isValidMathSymbol=function(t,e){return /^[\uD835]$/.test(t)&&/^[\uDC00-\uDFFF]$/.test(e)&&/^[^\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]$/.test(e)},x.isWhitespace=function(t,e){return " "===t||"\t"===t||"\n"===t&&e>0},x.isDecimalMark=function(t,e){return "."===t&&"/"!==e&&"*"!==e&&"^"!==e},x.isDigitDot=function(t){return t>="0"&&t<="9"||"."===t},x.isDigit=function(t){return t>="0"&&t<="9"},x.isHexDigit=function(t){return t>="0"&&t<="9"||t>="a"&&t<="f"||t>="A"&&t<="F"},x}))},typedDependencies:Eo,createEvaluate:cn("evaluate",["typed","parse"],(t=>{var{typed:e,parse:r}=t;return e("evaluate",{string:function(t){return r(t).compile().evaluate({})},"string, Object":function(t,e){return r(t).compile().evaluate(e)},"Array | Matrix":function(t){var e={};return is(t,(function(t){return r(t).compile().evaluate(e)}))},"Array | Matrix, Object":function(t,e){return is(t,(function(t){return r(t).compile().evaluate(e)}))}})}))});({divideScalarDependencies:Ho,equalScalarDependencies:No,invDependencies:{absDependencies:Co,addScalarDependencies:Ro,detDependencies:{lupDependencies:{DenseMatrixDependencies:_o,SpaDependencies:{FibonacciHeapDependencies:{largerDependencies:Po,smallerDependencies:{DenseMatrixDependencies:_o,matrixDependencies:zo,typedDependencies:Eo,createSmaller:Ea},createFibonacciHeapClass:Sa},addScalarDependencies:Ro,equalScalarDependencies:No,createSpaClass:Ta},SparseMatrixDependencies:So,absDependencies:Co,addScalarDependencies:Ro,divideScalarDependencies:Ho,equalScalarDependencies:No,largerDependencies:Po,matrixDependencies:zo,multiplyScalarDependencies:Io,subtractDependencies:Fo,typedDependencies:Eo,unaryMinusDependencies:Ao,createLup:cn("lup",["typed","matrix","abs","addScalar","divideScalar","multiplyScalar","subtract","larger","equalScalar","unaryMinus","DenseMatrix","SparseMatrix","Spa"],(t=>{var{typed:e,matrix:r,abs:n,addScalar:i,divideScalar:s,multiplyScalar:a,subtract:o,larger:u,equalScalar:h,unaryMinus:c,DenseMatrix:l,SparseMatrix:p,Spa:f}=t;return e("lup",{DenseMatrix:function(t){return d(t)},SparseMatrix:function(t){return function(t){var e,r,i,o=t._size[0],l=t._size[1],d=Math.min(o,l),m=t._values,y=t._index,g=t._ptr,v=[],x=[],w=[],b=[o,d],_=[],M=[],E=[],N=[d,l],S=[],T=[];for(e=0;e<o;e++)S[e]=e,T[e]=e;var O=function(t,e){var r=T[t],n=T[e];S[r]=e,S[n]=t,T[t]=n,T[e]=r;},z=function(){var t=new f;r<o&&(w.push(v.length),v.push(1),x.push(r)),E.push(_.length);var l=g[r],d=g[r+1];for(i=l;i<d;i++)e=y[i],t.set(S[e],m[i]);r>0&&t.forEach(0,r-1,(function(e,r){p._forEachRow(e,v,x,w,(function(n,i){n>e&&t.accumulate(n,c(a(i,r)));}));}));var T=r,z=t.get(r),A=n(z);t.forEach(r+1,o-1,(function(t,e){var r=n(e);u(r,A)&&(T=t,A=r,z=e);})),r!==T&&(p._swapRows(r,T,b[1],v,x,w),p._swapRows(r,T,N[1],_,M,E),t.swap(r,T),O(r,T)),t.forEach(0,o-1,(function(t,e){t<=r?(_.push(e),M.push(t)):(e=s(e,z),h(e,0)||(v.push(e),x.push(t)));}));};for(r=0;r<l;r++)z();return E.push(_.length),w.push(v.length),{L:new p({values:v,index:x,ptr:w,size:b}),U:new p({values:_,index:M,ptr:E,size:N}),p:S,toString:function(){return "L: "+this.L.toString()+"\nU: "+this.U.toString()+"\nP: "+this.p}}}(t)},Array:function(t){var e=d(r(t));return {L:e.L.valueOf(),U:e.U.valueOf(),p:e.p}}});function d(t){var e,r,c,p=t._size[0],f=t._size[1],d=Math.min(p,f),m=pr(t._data),y=[],g=[p,d],v=[],x=[d,f],w=[];for(e=0;e<p;e++)w[e]=e;for(r=0;r<f;r++){if(r>0)for(e=0;e<p;e++){var b=Math.min(e,r),_=0;for(c=0;c<b;c++)_=i(_,a(m[e][c],m[c][r]));m[e][r]=o(m[e][r],_);}var M=r,E=0,N=0;for(e=r;e<p;e++){var S=m[e][r],T=n(S);u(T,E)&&(M=e,E=T,N=S);}if(r!==M&&(w[r]=[w[M],w[M]=w[r]][0],l._swapRows(r,M,m)),r<p)for(e=r+1;e<p;e++){var O=m[e][r];h(O,0)||(m[e][r]=s(m[e][r],N));}}for(r=0;r<f;r++)for(e=0;e<p;e++)0===r&&(e<f&&(v[e]=[]),y[e]=[]),e<r?(e<f&&(v[e][r]=m[e][r]),r<p&&(y[e][r]=0)):e!==r?(e<f&&(v[e][r]=0),r<p&&(y[e][r]=m[e][r])):(e<f&&(v[e][r]=m[e][r]),r<p&&(y[e][r]=1));var z=new l({data:y,size:g}),A=new l({data:v,size:x}),C=[];for(e=0,d=w.length;e<d;e++)C[w[e]]=e;return {L:z,U:A,p:C,toString:function(){return "L: "+this.L.toString()+"\nU: "+this.U.toString()+"\nP: "+this.p}}}}))},matrixDependencies:zo,multiplyDependencies:Bo,subtractDependencies:Fo,typedDependencies:Eo,unaryMinusDependencies:Ao,createDet:cn("det",["typed","matrix","subtract","multiply","unaryMinus","lup"],(t=>{var{typed:e,matrix:r,subtract:n,multiply:i,unaryMinus:s,lup:a}=t;return e("det",{any:function(t){return pr(t)},"Array | Matrix":function(t){var e;switch((e=ke(t)?t.size():Array.isArray(t)?(t=r(t)).size():[]).length){case 0:return pr(t);case 1:if(1===e[0])return pr(t.valueOf()[0]);throw new RangeError("Matrix must be square (size: "+Hr(e)+")");case 2:var o=e[0];if(o===e[1])return function(t,e,r){if(1===e)return pr(t[0][0]);if(2===e)return n(i(t[0][0],t[1][1]),i(t[1][0],t[0][1]));for(var o=a(t),u=o.U[0][0],h=1;h<e;h++)u=i(u,o.U[h][h]);for(var c=0,l=0,p=[];;){for(;p[l];)l++;if(l>=e)break;for(var f=l,d=0;!p[o.p[f]];)p[o.p[f]]=!0,f=o.p[f],d++;d%2==0&&c++;}return c%2==0?u:s(u)}(t.clone().valueOf(),o);throw new RangeError("Matrix must be square (size: "+Hr(e)+")");default:throw new RangeError("Matrix must be two dimensional (size: "+Hr(e)+")")}}})}))},divideScalarDependencies:Ho,identityDependencies:Uo,matrixDependencies:zo,multiplyDependencies:Bo,typedDependencies:Eo,unaryMinusDependencies:Ao,createInv:cn("inv",["typed","matrix","divideScalar","addScalar","multiply","unaryMinus","det","identity","abs"],(t=>{var{typed:e,matrix:r,divideScalar:n,addScalar:i,multiply:s,unaryMinus:a,det:o,identity:u,abs:h}=t;return e("inv",{"Array | Matrix":function(t){var e=ke(t)?t.size():Zr(t);switch(e.length){case 1:if(1===e[0])return ke(t)?r([n(1,t.valueOf()[0])]):[n(1,t[0])];throw new RangeError("Matrix must be square (size: "+Hr(e)+")");case 2:var i=e[0],s=e[1];if(i===s)return ke(t)?r(c(t.valueOf(),i,s),t.storage()):c(t,i,s);throw new RangeError("Matrix must be square (size: "+Hr(e)+")");default:throw new RangeError("Matrix must be two dimensional (size: "+Hr(e)+")")}},any:function(t){return n(1,t)}});function c(t,e,r){var c,l,p,f,d;if(1===e){if(0===(f=t[0][0]))throw Error("Cannot calculate inverse, determinant is zero");return [[n(1,f)]]}if(2===e){var m=o(t);if(0===m)throw Error("Cannot calculate inverse, determinant is zero");return [[n(t[1][1],m),n(a(t[0][1]),m)],[n(a(t[1][0]),m),n(t[0][0],m)]]}var y=t.concat();for(c=0;c<e;c++)y[c]=y[c].concat();for(var g=u(e).valueOf(),v=0;v<r;v++){var x=h(y[v][v]),w=v;for(c=v+1;c<e;)h(y[c][v])>x&&(x=h(y[c][v]),w=c),c++;if(0===x)throw Error("Cannot calculate inverse, determinant is zero");(c=w)!==v&&(d=y[v],y[v]=y[c],y[c]=d,d=g[v],g[v]=g[c],g[c]=d);var b=y[v],_=g[v];for(c=0;c<e;c++){var M=y[c],E=g[c];if(c!==v){if(0!==M[v]){for(p=n(a(M[v]),b[v]),l=v;l<r;l++)M[l]=i(M[l],s(p,b[l]));for(l=0;l<r;l++)E[l]=i(E[l],s(p,_[l]));}}else {for(p=b[v],l=v;l<r;l++)M[l]=n(M[l],p);for(l=0;l<r;l++)E[l]=n(E[l],p);}}}return g}}))},matrixDependencies:zo,multiplyDependencies:Bo,typedDependencies:Eo,createDivide:cn("divide",["typed","matrix","multiply","equalScalar","divideScalar","inv"],(t=>{var{typed:e,matrix:r,multiply:n,equalScalar:i,divideScalar:s,inv:a}=t,o=Ts({typed:e,equalScalar:i}),u=Os({typed:e});return e("divide",dr({"Array | Matrix, Array | Matrix":function(t,e){return n(t,a(e))},"DenseMatrix, any":function(t,e){return u(t,e,s,!1)},"SparseMatrix, any":function(t,e){return o(t,e,s,!1)},"Array, any":function(t,e){return u(r(t),e,s,!1).valueOf()},"any, Array | Matrix":function(t,e){return n(t,a(e))}},s.signatures))}))});var Jo={exports:{}};function Ko(){}Ko.prototype={on:function(t,e,r){var n=this.e||(this.e={});return (n[t]||(n[t]=[])).push({fn:e,ctx:r}),this},once:function(t,e,r){var n=this;function i(){n.off(t,i),e.apply(r,arguments);}return i._=e,this.on(t,i,r)},emit:function(t){for(var e=[].slice.call(arguments,1),r=((this.e||(this.e={}))[t]||[]).slice(),n=0,i=r.length;n<i;n++)r[n].fn.apply(r[n].ctx,e);return this},off:function(t,e){var r=this.e||(this.e={}),n=r[t],i=[];if(n&&e)for(var s=0,a=n.length;s<a;s++)n[s].fn!==e&&n[s].fn._!==e&&i.push(n[s]);return i.length?r[t]=i:delete r[t],this}},Jo.exports=Ko,Jo.exports.TinyEmitter=Ko;new a;function ou(t,e,r,n=0){n++;for(let i=t.firstChild;i;i=i.nextSibling)if(i.nodeType===Node.ELEMENT_NODE){const t=i;e.call(r,t,n)&&ou(t,e,r,n);}}function uu(t,e,r,n){"insertRule"in t?t.insertRule(e+"{"+r+"}",n):"addRule"in t&&t.addRule(e,r,n);}!function(t){function e(){}function r(t,e){if(t=void 0===t?"utf-8":t,e=void 0===e?{fatal:!1}:e,-1===i.indexOf(t.toLowerCase()))throw new RangeError("Failed to construct 'TextDecoder': The encoding label provided ('"+t+"') is invalid.");if(e.fatal)throw Error("Failed to construct 'TextDecoder': the 'fatal' option is unsupported.")}function n(t){for(var e=0,r=Math.min(65536,t.length+1),n=new Uint16Array(r),i=[],s=0;;){var a=e<t.length;if(!a||s>=r-1){if(i.push(String.fromCharCode.apply(null,n.subarray(0,s))),!a)return i.join("");t=t.subarray(e),s=e=0;}if(0==(128&(a=t[e++])))n[s++]=a;else if(192==(224&a)){var o=63&t[e++];n[s++]=(31&a)<<6|o;}else if(224==(240&a)){o=63&t[e++];var u=63&t[e++];n[s++]=(31&a)<<12|o<<6|u;}else if(240==(248&a)){65535<(a=(7&a)<<18|(o=63&t[e++])<<12|(u=63&t[e++])<<6|63&t[e++])&&(a-=65536,n[s++]=a>>>10&1023|55296,a=56320|1023&a),n[s++]=a;}}}if(t.TextEncoder&&t.TextDecoder)return !1;var i=["utf-8","utf8","unicode-1-1-utf-8"];Object.defineProperty(e.prototype,"encoding",{value:"utf-8"}),e.prototype.encode=function(t,e){if((e=void 0===e?{stream:!1}:e).stream)throw Error("Failed to encode: the 'stream' option is unsupported.");e=0;for(var r=t.length,n=0,i=Math.max(32,r+(r>>>1)+7),s=new Uint8Array(i>>>3<<3);e<r;){var a=t.charCodeAt(e++);if(55296<=a&&56319>=a){if(e<r){var o=t.charCodeAt(e);56320==(64512&o)&&(++e,a=((1023&a)<<10)+(1023&o)+65536);}if(55296<=a&&56319>=a)continue}if(n+4>s.length&&(i+=8,i=(i*=1+e/t.length*2)>>>3<<3,(o=new Uint8Array(i)).set(s),s=o),0==(4294967168&a))s[n++]=a;else {if(0==(4294965248&a))s[n++]=a>>>6&31|192;else if(0==(4294901760&a))s[n++]=a>>>12&15|224,s[n++]=a>>>6&63|128;else {if(0!=(4292870144&a))continue;s[n++]=a>>>18&7|240,s[n++]=a>>>12&63|128,s[n++]=a>>>6&63|128;}s[n++]=63&a|128;}}return s.slice?s.slice(0,n):s.subarray(0,n)},Object.defineProperty(r.prototype,"encoding",{value:"utf-8"}),Object.defineProperty(r.prototype,"fatal",{value:!1}),Object.defineProperty(r.prototype,"ignoreBOM",{value:!1});var s=n;"function"==typeof Buffer&&Buffer.from?s=function(t){return Buffer.from(t.buffer,t.byteOffset,t.byteLength).toString("utf-8")}:"function"==typeof Blob&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&(s=function(t){var e=URL.createObjectURL(new Blob([t],{type:"text/plain;charset=UTF-8"}));try{var r=new XMLHttpRequest;return r.open("GET",e,!1),r.send(),r.responseText}catch(i){return n(t)}finally{URL.revokeObjectURL(e);}}),r.prototype.decode=function(t,e){if((e=void 0===e?{stream:!1}:e).stream)throw Error("Failed to decode: the 'stream' option is unsupported.");return t=t instanceof Uint8Array?t:t.buffer instanceof ArrayBuffer?new Uint8Array(t.buffer):new Uint8Array(t),s(t)},t.TextEncoder=e,t.TextDecoder=r;}("undefined"!=typeof window?window:Sr);class hu{constructor(){this.left=0,this.top=0,this.width=0,this.height=0;}copy(t){return this.top=t.top,this.left=t.left,this.width=t.width,this.height=t.height,this}}class cu{constructor(){this.left=0,this.top=0,this.right=0,this.bottom=0;}copy(t){return this.top=t.top,this.left=t.left,this.right=t.right,this.bottom=t.bottom,this}}function lu(t,e=new hu,r){const n=t.ownerDocument,i=n.documentElement,s=n.body;if(t===i)return function(t,e){const r=t.documentElement,n=t.body,i=getComputedStyle(r),s=getComputedStyle(n);return e.top=n.offsetTop+parseFloat(i.marginTop)||0+parseFloat(s.marginTop)||0,e.left=n.offsetLeft+parseFloat(i.marginLeft)||0+parseFloat(s.marginLeft)||0,e.width=Math.max(Math.max(n.scrollWidth,r.scrollWidth),Math.max(n.offsetWidth,r.offsetWidth),Math.max(n.clientWidth,r.clientWidth)),e.height=Math.max(Math.max(n.scrollHeight,r.scrollHeight),Math.max(n.offsetHeight,r.offsetHeight),Math.max(n.clientHeight,r.clientHeight)),e}(n,e);if(r===t)return e.left=0,e.top=0,e.width=t.offsetWidth,void(e.height=t.offsetHeight);const a=t.ownerDocument.defaultView;let o,u=t,h=u.offsetParent,c=a.getComputedStyle(u,null),l=u.offsetTop,p=u.offsetLeft;for(h&&r&&h.contains(r)&&h!==r&&(lu(r,e,h),p-=e.left,l-=e.top);(u=u.parentElement)&&u!==s&&u!==i&&u!==r&&"fixed"!==c.position;)o=a.getComputedStyle(u,null),l-=u.scrollTop,p-=u.scrollLeft,u===h&&(l+=u.offsetTop,p+=u.offsetLeft,l+=parseFloat(o.borderTopWidth)||0,p+=parseFloat(o.borderLeftWidth)||0,h=u.offsetParent),c=o;return "fixed"===c.position&&(l+=Math.max(i.scrollTop,s.scrollTop),p+=Math.max(i.scrollLeft,s.scrollLeft)),e.left=p,e.top=l,e.width=t.offsetWidth,e.height=t.offsetHeight,e}const pu=document.createElement("div");function fu(t){const e=document.createElement("div");e.innerHTML=t;const r=e.firstElementChild;return e.removeChild(r),r}pu.id="VIEWPORT",pu.style.position="fixed",pu.style.width="100vw",pu.style.height="100vh",pu.style.visibility="hidden",pu.style.pointerEvents="none";var du={};!function(t){const e=Symbol("newer"),r=Symbol("older");function n(t,e){"number"!=typeof t&&(e=t,t=0),this.size=0,this.limit=t,this.oldest=this.newest=void 0,this._keymap=new Map,e&&(this.assign(e),t<1&&(this.limit=this.size));}function i(t,n){this.key=t,this.value=n,this[e]=void 0,this[r]=void 0;}function s(t){this.entry=t;}function a(t){this.entry=t;}function o(t){this.entry=t;}t.LRUMap=n,n.prototype._markEntryAsUsed=function(t){t!==this.newest&&(t[e]&&(t===this.oldest&&(this.oldest=t[e]),t[e][r]=t[r]),t[r]&&(t[r][e]=t[e]),t[e]=void 0,t[r]=this.newest,this.newest&&(this.newest[e]=t),this.newest=t);},n.prototype.assign=function(t){let n,s=this.limit||Number.MAX_VALUE;this._keymap.clear();let a=t[Symbol.iterator]();for(let o=a.next();!o.done;o=a.next()){let t=new i(o.value[0],o.value[1]);if(this._keymap.set(t.key,t),n?(n[e]=t,t[r]=n):this.oldest=t,n=t,0==s--)throw new Error("overflow")}this.newest=n,this.size=this._keymap.size;},n.prototype.get=function(t){var e=this._keymap.get(t);if(e)return this._markEntryAsUsed(e),e.value},n.prototype.set=function(t,n){var s=this._keymap.get(t);return s?(s.value=n,this._markEntryAsUsed(s),this):(this._keymap.set(t,s=new i(t,n)),this.newest?(this.newest[e]=s,s[r]=this.newest):this.oldest=s,this.newest=s,++this.size,this.size>this.limit&&this.shift(),this)},n.prototype.shift=function(){var t=this.oldest;if(t)return this.oldest[e]?(this.oldest=this.oldest[e],this.oldest[r]=void 0):(this.oldest=void 0,this.newest=void 0),t[e]=t[r]=void 0,this._keymap.delete(t.key),--this.size,[t.key,t.value]},n.prototype.find=function(t){let e=this._keymap.get(t);return e?e.value:void 0},n.prototype.has=function(t){return this._keymap.has(t)},n.prototype.delete=function(t){var n=this._keymap.get(t);if(n)return this._keymap.delete(n.key),n[e]&&n[r]?(n[r][e]=n[e],n[e][r]=n[r]):n[e]?(n[e][r]=void 0,this.oldest=n[e]):n[r]?(n[r][e]=void 0,this.newest=n[r]):this.oldest=this.newest=void 0,this.size--,n.value},n.prototype.clear=function(){this.oldest=this.newest=void 0,this.size=0,this._keymap.clear();},s.prototype[Symbol.iterator]=function(){return this},s.prototype.next=function(){let t=this.entry;return t?(this.entry=t[e],{done:!1,value:[t.key,t.value]}):{done:!0,value:void 0}},a.prototype[Symbol.iterator]=function(){return this},a.prototype.next=function(){let t=this.entry;return t?(this.entry=t[e],{done:!1,value:t.key}):{done:!0,value:void 0}},o.prototype[Symbol.iterator]=function(){return this},o.prototype.next=function(){let t=this.entry;return t?(this.entry=t[e],{done:!1,value:t.value}):{done:!0,value:void 0}},n.prototype.keys=function(){return new a(this.oldest)},n.prototype.values=function(){return new o(this.oldest)},n.prototype.entries=function(){return this},n.prototype[Symbol.iterator]=function(){return new s(this.oldest)},n.prototype.forEach=function(t,r){"object"!=typeof r&&(r=this);let n=this.oldest;for(;n;)t.call(r,n.value,n.key,this),n=n[e];},n.prototype.toJSON=function(){for(var t=new Array(this.size),r=0,n=this.oldest;n;)t[r++]={key:n.key,value:n.value},n=n[e];return t},n.prototype.toString=function(){for(var t="",r=this.oldest;r;)t+=String(r.key)+":"+r.value,(r=r[e])&&(t+=" < ");return t};}(du);var mu={exports:{}};!function(t){!function(e,r){var n={};!function(t){t.__esModule=!0,t.digestLength=32,t.blockSize=64;var e=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]);function r(t,r,n,i,s){for(var a,o,u,h,c,l,p,f,d,m,y,g,v;s>=64;){for(a=r[0],o=r[1],u=r[2],h=r[3],c=r[4],l=r[5],p=r[6],f=r[7],m=0;m<16;m++)y=i+4*m,t[m]=(255&n[y])<<24|(255&n[y+1])<<16|(255&n[y+2])<<8|255&n[y+3];for(m=16;m<64;m++)g=((d=t[m-2])>>>17|d<<15)^(d>>>19|d<<13)^d>>>10,v=((d=t[m-15])>>>7|d<<25)^(d>>>18|d<<14)^d>>>3,t[m]=(g+t[m-7]|0)+(v+t[m-16]|0);for(m=0;m<64;m++)g=(((c>>>6|c<<26)^(c>>>11|c<<21)^(c>>>25|c<<7))+(c&l^~c&p)|0)+(f+(e[m]+t[m]|0)|0)|0,v=((a>>>2|a<<30)^(a>>>13|a<<19)^(a>>>22|a<<10))+(a&o^a&u^o&u)|0,f=p,p=l,l=c,c=h+g|0,h=u,u=o,o=a,a=g+v|0;r[0]+=a,r[1]+=o,r[2]+=u,r[3]+=h,r[4]+=c,r[5]+=l,r[6]+=p,r[7]+=f,i+=64,s-=64;}return i}var n=function(){function e(){this.digestLength=t.digestLength,this.blockSize=t.blockSize,this.state=new Int32Array(8),this.temp=new Int32Array(64),this.buffer=new Uint8Array(128),this.bufferLength=0,this.bytesHashed=0,this.finished=!1,this.reset();}return e.prototype.reset=function(){return this.state[0]=1779033703,this.state[1]=3144134277,this.state[2]=1013904242,this.state[3]=2773480762,this.state[4]=1359893119,this.state[5]=2600822924,this.state[6]=528734635,this.state[7]=1541459225,this.bufferLength=0,this.bytesHashed=0,this.finished=!1,this},e.prototype.clean=function(){for(var t=0;t<this.buffer.length;t++)this.buffer[t]=0;for(t=0;t<this.temp.length;t++)this.temp[t]=0;this.reset();},e.prototype.update=function(t,e){if(void 0===e&&(e=t.length),this.finished)throw new Error("SHA256: can't update because hash was finished.");var n=0;if(this.bytesHashed+=e,this.bufferLength>0){for(;this.bufferLength<64&&e>0;)this.buffer[this.bufferLength++]=t[n++],e--;64===this.bufferLength&&(r(this.temp,this.state,this.buffer,0,64),this.bufferLength=0);}for(e>=64&&(n=r(this.temp,this.state,t,n,e),e%=64);e>0;)this.buffer[this.bufferLength++]=t[n++],e--;return this},e.prototype.finish=function(t){if(!this.finished){var e=this.bytesHashed,n=this.bufferLength,i=e/536870912|0,s=e<<3,a=e%64<56?64:128;this.buffer[n]=128;for(var o=n+1;o<a-8;o++)this.buffer[o]=0;this.buffer[a-8]=i>>>24&255,this.buffer[a-7]=i>>>16&255,this.buffer[a-6]=i>>>8&255,this.buffer[a-5]=i>>>0&255,this.buffer[a-4]=s>>>24&255,this.buffer[a-3]=s>>>16&255,this.buffer[a-2]=s>>>8&255,this.buffer[a-1]=s>>>0&255,r(this.temp,this.state,this.buffer,0,a),this.finished=!0;}for(o=0;o<8;o++)t[4*o+0]=this.state[o]>>>24&255,t[4*o+1]=this.state[o]>>>16&255,t[4*o+2]=this.state[o]>>>8&255,t[4*o+3]=this.state[o]>>>0&255;return this},e.prototype.digest=function(){var t=new Uint8Array(this.digestLength);return this.finish(t),t},e.prototype._saveState=function(t){for(var e=0;e<this.state.length;e++)t[e]=this.state[e];},e.prototype._restoreState=function(t,e){for(var r=0;r<this.state.length;r++)this.state[r]=t[r];this.bytesHashed=e,this.finished=!1,this.bufferLength=0;},e}();t.Hash=n;var i=function(){function t(t){this.inner=new n,this.outer=new n,this.blockSize=this.inner.blockSize,this.digestLength=this.inner.digestLength;var e=new Uint8Array(this.blockSize);if(t.length>this.blockSize)(new n).update(t).finish(e).clean();else for(var r=0;r<t.length;r++)e[r]=t[r];for(r=0;r<e.length;r++)e[r]^=54;this.inner.update(e);for(r=0;r<e.length;r++)e[r]^=106;this.outer.update(e),this.istate=new Uint32Array(8),this.ostate=new Uint32Array(8),this.inner._saveState(this.istate),this.outer._saveState(this.ostate);for(r=0;r<e.length;r++)e[r]=0;}return t.prototype.reset=function(){return this.inner._restoreState(this.istate,this.inner.blockSize),this.outer._restoreState(this.ostate,this.outer.blockSize),this},t.prototype.clean=function(){for(var t=0;t<this.istate.length;t++)this.ostate[t]=this.istate[t]=0;this.inner.clean(),this.outer.clean();},t.prototype.update=function(t){return this.inner.update(t),this},t.prototype.finish=function(t){return this.outer.finished?this.outer.finish(t):(this.inner.finish(t),this.outer.update(t,this.digestLength).finish(t)),this},t.prototype.digest=function(){var t=new Uint8Array(this.digestLength);return this.finish(t),t},t}();function s(t){var e=(new n).update(t),r=e.digest();return e.clean(),r}function a(t,e){var r=new i(t).update(e),n=r.digest();return r.clean(),n}function o(t,e,r,n){var i=n[0];if(0===i)throw new Error("hkdf: cannot expand more");e.reset(),i>1&&e.update(t),r&&e.update(r),e.update(n),e.finish(t),n[0]++;}t.HMAC=i,t.hash=s,t.default=s,t.hmac=a;var u=new Uint8Array(t.digestLength);function h(t,e,r,n){void 0===e&&(e=u),void 0===n&&(n=32);for(var s=new Uint8Array([1]),h=a(e,t),c=new i(h),l=new Uint8Array(c.digestLength),p=l.length,f=new Uint8Array(n),d=0;d<n;d++)p===l.length&&(o(l,c,r,s),p=0),f[d]=l[p++];return c.clean(),l.fill(0),s.fill(0),f}function c(t,e,r,n){for(var s=new i(t),a=s.digestLength,o=new Uint8Array(4),u=new Uint8Array(a),h=new Uint8Array(a),c=new Uint8Array(n),l=0;l*a<n;l++){var p=l+1;o[0]=p>>>24&255,o[1]=p>>>16&255,o[2]=p>>>8&255,o[3]=p>>>0&255,s.reset(),s.update(e),s.update(o),s.finish(h);for(var f=0;f<a;f++)u[f]=h[f];for(f=2;f<=r;f++){s.reset(),s.update(h).finish(h);for(var d=0;d<a;d++)u[d]^=h[d];}for(f=0;f<a&&l*a+f<n;f++)c[l*a+f]=u[f];}for(l=0;l<a;l++)u[l]=h[l]=0;for(l=0;l<4;l++)o[l]=0;return s.clean(),c}t.hkdf=h,t.pbkdf2=c;}(n);var i=n.default;for(var s in n)i[s]=n[s];t.exports=i;}();}(mu);const yu=class{constructor(t,e){this.element=t,this.eventCallback=e,this.needsRefresh=!0,this.needsRemoval=!1,this.psuedoStates={hover:!1,active:!1,focus:!1,target:!1},this.svgImage=new Image,this.bounds=new hu,this.padding=new cu,this.margin=new cu,this.border=new cu,this.childLayers=[],this.cachedBounds=new Map,this.cachedMargin=new Map,this._dynamicAttributes="",this._svgDocument="",this._rasterizingDocument="",this._svgSrc="",this._hashingCanvas=document.createElement("canvas"),ch.layers.set(t,this),this.id=t.getAttribute(ch.ELEMENT_UID_ATTRIBUTE)||ch.generateElementUID(),t.setAttribute(ch.ELEMENT_UID_ATTRIBUTE,this.id),t.setAttribute(ch.LAYER_ATTRIBUTE,""),this.parentLayer=ch.getClosestLayer(this.element.parentElement),this.eventCallback("layercreated",{target:t}),yu.cachedCanvases.limit=ch.layers.size*yu.DEFAULT_CACHE_SIZE,this._hashingCanvas.width=20,this._hashingCanvas.height=20;}set canvas(t){this._canvas!==t&&(this._canvas=t,this.eventCallback&&this.eventCallback("layerpainted",{target:this.element}));}get canvas(){return this._canvas}get depth(){let t=0,e=this;for(;e.parentLayer;)e=e.parentLayer,t++;return t}get rootLayer(){let t=this;for(;t.parentLayer;)t=t.parentLayer;return t}traverseParentLayers(t){const e=this.parentLayer;e&&(e.traverseParentLayers(t),t(e));}traverseLayers(t){t(this),this.traverseChildLayers(t);}traverseChildLayers(t){for(const e of this.childLayers)e.traverseLayers(t);}refresh(){lu(this.element,this.bounds,this.parentLayer&&this.parentLayer.element),this.needsRefresh=!1,this._updateParentAndChildLayers(),ch.addToSerializeQueue(this);}_updateParentAndChildLayers(){const t=this.element,e=this.childLayers,r=e.slice(),n=this.parentLayer;this.parentLayer=ch.getClosestLayer(this.element.parentElement),n!==this.parentLayer&&(this.parentLayer&&this.parentLayer.childLayers.push(this),this.eventCallback("layermoved",{target:t})),e.length=0,ou(t,this._tryConvertElementToWebLayer,this);for(const i of r){ch.getClosestLayer(i.element.parentElement)||(i.needsRemoval=!0,e.push(i));}}_tryConvertElementToWebLayer(t){if(this.needsRemoval)return !1;const e=t,r=getComputedStyle(e);e.getAttribute(ch.ELEMENT_UID_ATTRIBUTE)||e.setAttribute(ch.ELEMENT_UID_ATTRIBUTE,ch.generateElementUID());if(e.hasAttribute(ch.LAYER_ATTRIBUTE)||"VIDEO"===e.nodeName||"none"!==r.transform){let t=ch.layers.get(e);return t||(t=new yu(e,this.eventCallback)),this.childLayers.push(t),!1}return !0}async serialize(){if("VIDEO"===this.element.nodeName)return;let{width:t,height:e}=this.bounds;if(t*e>0){!function(t,e){let r=getComputedStyle(t);e.left=parseFloat(r.paddingLeft)||0,e.right=parseFloat(r.paddingRight)||0,e.top=parseFloat(r.paddingTop)||0,e.bottom=parseFloat(r.paddingBottom)||0;}(this.element,this.padding),function(t,e){let r=getComputedStyle(t);e.left=parseFloat(r.marginLeft)||0,e.right=parseFloat(r.marginRight)||0,e.top=parseFloat(r.marginTop)||0,e.bottom=parseFloat(r.marginBottom)||0;}(this.element,this.margin),function(t,e){let r=getComputedStyle(t);e.left=parseFloat(r.borderLeftWidth)||0,e.right=parseFloat(r.borderRightWidth)||0,e.top=parseFloat(r.borderTopWidth)||0,e.bottom=parseFloat(r.borderBottomWidth)||0;}(this.element,this.border),t+=Math.max(this.margin.left,0)+Math.max(this.margin.right,0),e+=Math.max(this.margin.top,0)+Math.max(this.margin.bottom,0);const r=ch.attributeHTML(ch.ELEMENT_UID_ATTRIBUTE,""+this.id),n=this.element,i="inline"===getComputedStyle(n).display;ch.updateInputAttributes(n);const s=ch.serializer.serializeToString(n).replace(r,`${r} ${ch.RENDERING_ATTRIBUTE}="" ${i?`${ch.RENDERING_INLINE_ATTRIBUTE}="" `:" "} `+ch.getPsuedoAttributes(this.psuedoStates)),a=this._getParentsHTML(n);a[0]=a[0].replace("html","html "+ch.RENDERING_DOCUMENT_ATTRIBUTE+'="" ');const[o]=await Promise.all([ch.getEmbeddedCSS(this.element),ch.embedExternalResources(this.element)]),u='<svg width="'+t+'" height="'+e+'" xmlns="http://www.w3.org/2000/svg"><defs><style type="text/css"><![CDATA[a[href]{color:#0000EE;text-decoration:underline;}'+o.join("")+']]></style></defs><foreignObject x="0" y="0" width="'+t+'" height="'+e+'">'+a[0]+s+a[1]+"</foreignObject></svg>",h=this._svgDocument=u,c=yu.canvasHashes.get(h);if(c&&yu.cachedCanvases.has(c))return void(this.canvas=yu.cachedCanvases.get(c));this.cachedBounds.set(h,(new hu).copy(this.bounds)),this.cachedMargin.set(h,(new cu).copy(this.margin)),ch.addToRasterizeQueue(this);}}async rasterize(){return new Promise((t=>{this.svgImage.onload=()=>{ch.addToRenderQueue(this),t();},this._rasterizingDocument=this._svgDocument,this.svgImage.src=this._svgSrc="data:image/svg+xml;utf8,"+encodeURIComponent(this._svgDocument),this.svgImage.complete&&this.svgImage.currentSrc===this.svgImage.src&&(ch.addToRenderQueue(this),this.svgImage.onload=null,t());}))}render(){const t=this._rasterizingDocument;if(!this.cachedBounds.has(t)||!this.cachedMargin.has(t))return void(this.needsRefresh=!0);if(!this.svgImage.complete)return void ch.addToRenderQueue(this);let{width:e,height:r}=this.cachedBounds.get(t),{left:n,top:i}=this.cachedMargin.get(t);const s=this._hashingCanvas;let a=s.width,o=s.height;const u=s.getContext("2d");u.clearRect(0,0,a,o),u.imageSmoothingEnabled=!1,u.drawImage(this.svgImage,n,i,e,r,0,0,a,o);const h=u.getImageData(0,0,a,o).data,c=ch.arrayBufferToBase64(mu.exports.hash(new Uint8Array(h)))+"?w="+e+";h="+r;yu.canvasHashes.set(t,c);const l=yu.blankRetryCounts.get(t)||0;if(ch.isBlankImage(h)&&l<10)return yu.blankRetryCounts.set(t,l+1),void setTimeout((()=>ch.addToRenderQueue(this)),500);if(yu.cachedCanvases.has(c))return void(this.canvas=yu.cachedCanvases.get(c));const p=this.pixelRatio||parseFloat(this.element.getAttribute(ch.PIXEL_RATIO_ATTRIBUTE))||window.devicePixelRatio,f=yu.cachedCanvases.size===yu.cachedCanvases.limit?yu.cachedCanvases.shift()[1]:document.createElement("canvas");let d=f.width=e*p,m=f.height=r*p;const y=f.getContext("2d");y.imageSmoothingEnabled=!1,y.clearRect(0,0,d,m),y.drawImage(this.svgImage,n,i,e,r,0,0,d,m),yu.cachedCanvases.set(c,f),this.canvas=f;}_getParentsHTML(t){const e=[],r=[];let n=t.parentElement;n||(n=document.documentElement);do{let t=n.tagName.toLowerCase(),i=" ";for(const e of n.attributes)"style"!==e.name&&(i+=`${e.name}="${e.value}" `);const s="<"+t+("html"===t?` xmlns="http://www.w3.org/1999/xhtml" style="--x-width:${this.bounds.width}px;--x-height:${this.bounds.height}px;--x-inline-top:${this.border.top+this.margin.top+this.padding.top}px" `:"")+i+`${ch.RENDERING_PARENT_ATTRIBUTE}=""  >`;e.unshift(s);const a="</"+t+">";if(r.push(a),"html"==t)break}while(n=n.parentElement);return [e.join(""),r.join("")]}};let gu=yu;gu.DEFAULT_CACHE_SIZE=4,gu.blankRetryCounts=new Map,gu.canvasHashes=new du.LRUMap(1e3),gu.cachedCanvases=new du.LRUMap(yu.DEFAULT_CACHE_SIZE);var vu,xu,wu=[],bu="ResizeObserver loop completed with undelivered notifications.";(xu=vu||(vu={})).BORDER_BOX="border-box",xu.CONTENT_BOX="content-box",xu.DEVICE_PIXEL_CONTENT_BOX="device-pixel-content-box";var _u,Mu=function(t){return Object.freeze(t)},Eu=function(t,e){this.inlineSize=t,this.blockSize=e,Mu(this);},Nu=function(){function t(t,e,r,n){return this.x=t,this.y=e,this.width=r,this.height=n,this.top=this.y,this.left=this.x,this.bottom=this.top+this.height,this.right=this.left+this.width,Mu(this)}return t.prototype.toJSON=function(){var t=this;return {x:t.x,y:t.y,top:t.top,right:t.right,bottom:t.bottom,left:t.left,width:t.width,height:t.height}},t.fromRect=function(e){return new t(e.x,e.y,e.width,e.height)},t}(),Su=function(t){return t instanceof SVGElement&&"getBBox"in t},Tu=function(t){if(Su(t)){var e=t.getBBox(),r=e.width,n=e.height;return !r&&!n}var i=t,s=i.offsetWidth,a=i.offsetHeight;return !(s||a||t.getClientRects().length)},Ou=function(t){var e,r;if(t instanceof Element)return !0;var n=null===(r=null===(e=t)||void 0===e?void 0:e.ownerDocument)||void 0===r?void 0:r.defaultView;return !!(n&&t instanceof n.Element)},zu="undefined"!=typeof window?window:{},Au=new WeakMap,Cu=/auto|scroll/,Ru=/^tb|vertical/,Du=/msie|trident/i.test(zu.navigator&&zu.navigator.userAgent),ku=function(t){return parseFloat(t||"0")},Iu=function(t,e,r){return void 0===t&&(t=0),void 0===e&&(e=0),void 0===r&&(r=!1),new Eu((r?e:t)||0,(r?t:e)||0)},Lu=Mu({devicePixelContentBoxSize:Iu(),borderBoxSize:Iu(),contentBoxSize:Iu(),contentRect:new Nu(0,0,0,0)}),Bu=function(t,e){if(void 0===e&&(e=!1),Au.has(t)&&!e)return Au.get(t);if(Tu(t))return Au.set(t,Lu),Lu;var r=getComputedStyle(t),n=Su(t)&&t.ownerSVGElement&&t.getBBox(),i=!Du&&"border-box"===r.boxSizing,s=Ru.test(r.writingMode||""),a=!n&&Cu.test(r.overflowY||""),o=!n&&Cu.test(r.overflowX||""),u=n?0:ku(r.paddingTop),h=n?0:ku(r.paddingRight),c=n?0:ku(r.paddingBottom),l=n?0:ku(r.paddingLeft),p=n?0:ku(r.borderTopWidth),f=n?0:ku(r.borderRightWidth),d=n?0:ku(r.borderBottomWidth),m=l+h,y=u+c,g=(n?0:ku(r.borderLeftWidth))+f,v=p+d,x=o?t.offsetHeight-v-t.clientHeight:0,w=a?t.offsetWidth-g-t.clientWidth:0,b=i?m+g:0,_=i?y+v:0,M=n?n.width:ku(r.width)-b-w,E=n?n.height:ku(r.height)-_-x,N=M+m+w+g,S=E+y+x+v,T=Mu({devicePixelContentBoxSize:Iu(Math.round(M*devicePixelRatio),Math.round(E*devicePixelRatio),s),borderBoxSize:Iu(N,S,s),contentBoxSize:Iu(M,E,s),contentRect:new Nu(l,u,M,E)});return Au.set(t,T),T},Fu=function(t,e,r){var n=Bu(t,r),i=n.borderBoxSize,s=n.contentBoxSize,a=n.devicePixelContentBoxSize;switch(e){case vu.DEVICE_PIXEL_CONTENT_BOX:return a;case vu.BORDER_BOX:return i;default:return s}},Pu=function(t){var e=Bu(t);this.target=t,this.contentRect=e.contentRect,this.borderBoxSize=Mu([e.borderBoxSize]),this.contentBoxSize=Mu([e.contentBoxSize]),this.devicePixelContentBoxSize=Mu([e.devicePixelContentBoxSize]);},Uu=function(t){if(Tu(t))return 1/0;for(var e=0,r=t.parentNode;r;)e+=1,r=r.parentNode;return e},ju=function(){var t=1/0,e=[];wu.forEach((function(r){if(0!==r.activeTargets.length){var n=[];r.activeTargets.forEach((function(e){var r=new Pu(e.target),i=Uu(e.target);n.push(r),e.lastReportedSize=Fu(e.target,e.observedBox),i<t&&(t=i);})),e.push((function(){r.callback.call(r.observer,n,r.observer);})),r.activeTargets.splice(0,r.activeTargets.length);}}));for(var r=0,n=e;r<n.length;r++){(0, n[r])();}return t},qu=function(t){wu.forEach((function(e){e.activeTargets.splice(0,e.activeTargets.length),e.skippedTargets.splice(0,e.skippedTargets.length),e.observationTargets.forEach((function(r){r.isActive()&&(Uu(r.target)>t?e.activeTargets.push(r):e.skippedTargets.push(r));}));}));},Hu=function(){var t,e=0;for(qu(e);wu.some((function(t){return t.activeTargets.length>0}));)e=ju(),qu(e);return wu.some((function(t){return t.skippedTargets.length>0}))&&("function"==typeof ErrorEvent?t=new ErrorEvent("error",{message:bu}):((t=document.createEvent("Event")).initEvent("error",!1,!1),t.message=bu),window.dispatchEvent(t)),e>0},Vu=[],$u=function(t){if(!_u){var e=0,r=document.createTextNode("");new MutationObserver((function(){return Vu.splice(0).forEach((function(t){return t()}))})).observe(r,{characterData:!0}),_u=function(){r.textContent=""+(e?e--:e++);};}Vu.push(t),_u();},Gu=0,Wu={attributes:!0,characterData:!0,childList:!0,subtree:!0},Yu=["resize","load","transitionend","animationend","animationstart","animationiteration","keyup","keydown","mouseup","mousedown","mouseover","mouseout","blur","focus"],Zu=function(t){return void 0===t&&(t=0),Date.now()+t},Xu=!1,Qu=new(function(){function t(){var t=this;this.stopped=!0,this.listener=function(){return t.schedule()};}return t.prototype.run=function(t){var e=this;if(void 0===t&&(t=250),!Xu){Xu=!0;var r,n=Zu(t);r=function(){var r=!1;try{r=Hu();}finally{if(Xu=!1,t=n-Zu(),!Gu)return;r?e.run(1e3):t>0?e.run(t):e.start();}},$u((function(){requestAnimationFrame(r);}));}},t.prototype.schedule=function(){this.stop(),this.run();},t.prototype.observe=function(){var t=this,e=function(){return t.observer&&t.observer.observe(document.body,Wu)};document.body?e():zu.addEventListener("DOMContentLoaded",e);},t.prototype.start=function(){var t=this;this.stopped&&(this.stopped=!1,this.observer=new MutationObserver(this.listener),this.observe(),Yu.forEach((function(e){return zu.addEventListener(e,t.listener,!0)})));},t.prototype.stop=function(){var t=this;this.stopped||(this.observer&&this.observer.disconnect(),Yu.forEach((function(e){return zu.removeEventListener(e,t.listener,!0)})),this.stopped=!0);},t}()),Ju=function(t){!Gu&&t>0&&Qu.start(),!(Gu+=t)&&Qu.stop();},Ku=function(){function t(t,e){this.target=t,this.observedBox=e||vu.CONTENT_BOX,this.lastReportedSize={inlineSize:0,blockSize:0};}return t.prototype.isActive=function(){var t,e=Fu(this.target,this.observedBox,!0);return t=this.target,Su(t)||function(t){switch(t.tagName){case"INPUT":if("image"!==t.type)break;case"VIDEO":case"AUDIO":case"EMBED":case"OBJECT":case"CANVAS":case"IFRAME":case"IMG":return !0}return !1}(t)||"inline"!==getComputedStyle(t).display||(this.lastReportedSize=e),this.lastReportedSize.inlineSize!==e.inlineSize||this.lastReportedSize.blockSize!==e.blockSize},t}(),th=function(t,e){this.activeTargets=[],this.skippedTargets=[],this.observationTargets=[],this.observer=t,this.callback=e;},eh=new WeakMap,rh=function(t,e){for(var r=0;r<t.length;r+=1)if(t[r].target===e)return r;return -1},nh=function(){function t(){}return t.connect=function(t,e){var r=new th(t,e);eh.set(t,r);},t.observe=function(t,e,r){var n=eh.get(t),i=0===n.observationTargets.length;rh(n.observationTargets,e)<0&&(i&&wu.push(n),n.observationTargets.push(new Ku(e,r&&r.box)),Ju(1),Qu.schedule());},t.unobserve=function(t,e){var r=eh.get(t),n=rh(r.observationTargets,e),i=1===r.observationTargets.length;n>=0&&(i&&wu.splice(wu.indexOf(r),1),r.observationTargets.splice(n,1),Ju(-1));},t.disconnect=function(t){var e=this,r=eh.get(t);r.observationTargets.slice().forEach((function(r){return e.unobserve(t,r.target)})),r.activeTargets.splice(0,r.activeTargets.length);},t}(),ih=function(){function t(t){if(0===arguments.length)throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");if("function"!=typeof t)throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");nh.connect(this,t);}return t.prototype.observe=function(t,e){if(0===arguments.length)throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");if(!Ou(t))throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");nh.observe(this,t,e);},t.prototype.unobserve=function(t){if(0===arguments.length)throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");if(!Ou(t))throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");nh.unobserve(this,t);},t.prototype.disconnect=function(){nh.disconnect(this);},t.toString=function(){return "function ResizeObserver () { [polyfill code] }"},t}();const sh=self.ResizeObserver||ih;const ah=new c,oh=new c,uh=new TextDecoder,hh=class{static get ELEMENT_UID_ATTRIBUTE(){return this.ATTRIBUTE_PREFIX+"-uid"}static get HOVER_ATTRIBUTE(){return this.ATTRIBUTE_PREFIX+"-hover"}static get ACTIVE_ATTRIBUTE(){return this.ATTRIBUTE_PREFIX+"-active"}static get FOCUS_ATTRIBUTE(){return this.ATTRIBUTE_PREFIX+"-focus"}static get TARGET_ATTRIBUTE(){return this.ATTRIBUTE_PREFIX+"-target"}static get LAYER_ATTRIBUTE(){return this.ATTRIBUTE_PREFIX+"-layer"}static get PIXEL_RATIO_ATTRIBUTE(){return this.ATTRIBUTE_PREFIX+"-pixel-ratio"}static get RENDERING_ATTRIBUTE(){return this.ATTRIBUTE_PREFIX+"-rendering"}static get RENDERING_PARENT_ATTRIBUTE(){return this.ATTRIBUTE_PREFIX+"-rendering-parent"}static get RENDERING_CONTAINER_ATTRIBUTE(){return this.ATTRIBUTE_PREFIX+"-rendering-container"}static get RENDERING_INLINE_ATTRIBUTE(){return this.ATTRIBUTE_PREFIX+"-rendering-inline"}static get RENDERING_DOCUMENT_ATTRIBUTE(){return this.ATTRIBUTE_PREFIX+"-rendering-document"}static generateElementUID(){return ""+this._nextUID++}static getPsuedoAttributes(t){return `${t.hover?`${this.HOVER_ATTRIBUTE}="" `:" "}${t.focus?`${this.FOCUS_ATTRIBUTE}="" `:" "}${t.active?`${this.ACTIVE_ATTRIBUTE}="" `:" "}${t.target?`${this.TARGET_ATTRIBUTE}="" `:" "}`}static initRootNodeObservation(t){const e=t.ownerDocument,r=t.getRootNode(),n="head"in r?r.head:r;if(this.rootNodeObservers.get(r))return;const i=e.createElement("style");n.append(i);const s=i.sheet;let a=0;if(uu(s,`[${hh.RENDERING_DOCUMENT_ATTRIBUTE}] *`,"transform: none !important;",a++),uu(s,`[${hh.RENDERING_ATTRIBUTE}], [${hh.RENDERING_ATTRIBUTE}] *`,"visibility: visible !important;",a++),uu(s,`[${hh.RENDERING_ATTRIBUTE}] [${hh.LAYER_ATTRIBUTE}], [${hh.RENDERING_ATTRIBUTE}] [${hh.LAYER_ATTRIBUTE}] *`,"visibility: hidden !important;",a++),uu(s,`[${hh.RENDERING_ATTRIBUTE}]`,"position: relative; top: 0 !important; left: 0 !important; float: none; box-sizing:border-box; min-width:var(--x-width); min-height:var(--x-height); display:block !important;",a++),uu(s,`[${hh.RENDERING_INLINE_ATTRIBUTE}]`,"top: var(--x-inline-top) !important; width:auto !important",a++),uu(s,`[${hh.RENDERING_PARENT_ATTRIBUTE}]`,"transform: none !important; left: 0 !important; top: 0 !important; margin: 0 !important; border:0 !important; border-radius:0 !important; height:100% !important; padding:0 !important; position:static !important; display:block !important; background: rgba(0,0,0,0) none !important; box-shadow:none !important",a++),uu(s,`[${hh.RENDERING_PARENT_ATTRIBUTE}]::before, [${hh.RENDERING_PARENT_ATTRIBUTE}]::after`,"content:none !important; box-shadow:none !important;",a++),r===e){let t="";const e=()=>{if(t!=window.location.hash&&window.location.hash)try{this.targetElement=r.querySelector(window.location.hash);}catch{}t=window.location.hash;};window.addEventListener("hashchange",e,!1),e(),window.addEventListener("focusin",(t=>{this.focusElement=t.target;}),!1),window.addEventListener("focusout",(t=>{this.focusElement=null;}),!1),window.addEventListener("load",(t=>{o();}));}const o=()=>{for(const[t,e]of this.layers)e.needsRefresh=!0;},u=t=>{var e=t.nodeName.toUpperCase();-1!==h.indexOf(e)&&t.addEventListener("load",o);},h=["STYLE","LINK"],c=new MutationObserver((t=>{var r;for(const n of t){-1!==h.indexOf(n.target.nodeName.toUpperCase())&&(o(),null==(r=this.embeddedCSS.get(e))||r.delete(n.target));for(const t of n.addedNodes)u(t);}}));c.observe(e,{childList:!0,attributes:!0,characterData:!0,subtree:!0,attributeOldValue:!0,characterDataOldValue:!0}),this.rootNodeObservers.set(r,c);}static addToSerializeQueue(t){-1===this.serializeQueue.indexOf(t)&&this.serializeQueue.push(t);}static addToRasterizeQueue(t){-1===this.rasterizeQueue.indexOf(t)&&this.rasterizeQueue.push(t);}static addToRenderQueue(t){-1===this.renderQueue.indexOf(t)&&this.renderQueue.push(t);}static _runTasks(){hh.tasksPending=!1;const t=hh.serializeQueue,e=hh.rasterizeQueue,r=hh.renderQueue,n=hh.TASK_SYNC_MAX_TIME/2;let i=performance.now();for(;r.length&&performance.now()-i<n;)r.shift().render();for(i=performance.now();t.length&&performance.now()-i<n;)t.shift().serialize();e.length&&hh.rasterizeTaskCount<hh.TASK_ASYNC_MAX_COUNT&&(hh.rasterizeTaskCount++,e.shift().rasterize().then((()=>{hh.rasterizeTaskCount--;})));}static scheduleTasksIfNeeded(){this.tasksPending||0===hh.serializeQueue.length&&0===hh.renderQueue.length&&(0===hh.rasterizeQueue.length||hh.rasterizeTaskCount===hh.TASK_ASYNC_MAX_COUNT)||(this.tasksPending=!0,hh.scheduleIdle(hh._runTasks));}static scheduleIdle(t){setTimeout(t,1);}static setLayerNeedsRefresh(t){t.needsRefresh=!0;}static createLayerTree(t,e){if(hh.getClosestLayer(t))throw new Error("A root WebLayer for the given element already exists");!function(t){const e=t.ownerDocument,r=t.getRootNode();if(e.contains(t)||e.contains(null==r?void 0:r.host))return t;const n=r.host||e.createElement("div");n.setAttribute(ch.RENDERING_CONTAINER_ATTRIBUTE,""),n.style.position="fixed",n.style.width="100%",n.style.height="100%",n.style.top="-100000px",n.style.contain="strict",r.host||n.appendChild(t),e.documentElement.appendChild(n);}(t),hh.initRootNodeObservation(t);const r=new MutationObserver(hh._handleMutations);this.mutationObservers.set(t,r),this.startMutationObserver(t);const n=new sh((t=>{for(const e of t){const t=this.getClosestLayer(e.target);t.traverseLayers(hh.setLayerNeedsRefresh),t.traverseParentLayers(hh.setLayerNeedsRefresh);}}));n.observe(t),this.resizeObservers.set(t,n),t.addEventListener("input",this._triggerRefresh,{capture:!0}),t.addEventListener("keydown",this._triggerRefresh,{capture:!0}),t.addEventListener("submit",this._triggerRefresh,{capture:!0}),t.addEventListener("change",this._triggerRefresh,{capture:!0}),t.addEventListener("focus",this._triggerRefresh,{capture:!0}),t.addEventListener("blur",this._triggerRefresh,{capture:!0}),t.addEventListener("transitionend",this._triggerRefresh,{capture:!0});const i=new gu(t,e);return this.rootLayers.set(t,i),i}static disposeLayer(t){if(this.rootLayers.has(t.element)){this.rootLayers.delete(t.element);this.mutationObservers.get(t.element).disconnect(),this.mutationObservers.delete(t.element);this.resizeObservers.get(t.element).disconnect(),this.resizeObservers.delete(t.element),t.element.removeEventListener("input",this._triggerRefresh,{capture:!0}),t.element.removeEventListener("keydown",this._triggerRefresh,{capture:!0}),t.element.removeEventListener("submit",this._triggerRefresh,{capture:!0}),t.element.removeEventListener("change",this._triggerRefresh,{capture:!0}),t.element.removeEventListener("focus",this._triggerRefresh,{capture:!0}),t.element.removeEventListener("blur",this._triggerRefresh,{capture:!0}),t.element.removeEventListener("transitionend",this._triggerRefresh,{capture:!0});}}static getClosestLayer(t){const e=t&&t.closest(`[${hh.LAYER_ATTRIBUTE}]`);return this.layers.get(e)}static getCSSTransformForElement(t,e=new c){const r=getComputedStyle(t);var n=r.transform;if(0==n.indexOf("matrix(")){e.identity();var i=n.substring(7,n.length-1).split(", ").map(parseFloat);e.elements[0]=i[0],e.elements[1]=i[1],e.elements[4]=i[2],e.elements[5]=i[3],e.elements[12]=i[4],e.elements[13]=i[5];}else {if(0!=n.indexOf("matrix3d("))return e.identity();i=n.substring(9,n.length-1).split(", ").map(parseFloat);e.fromArray(i);}var s=r.transformOrigin.split(" ").map(parseFloat),a=s[0],o=s[1],u=s[2]||0,h=ah.identity().makeTranslation(-a,-o,-u),l=oh.identity().makeTranslation(a,o,u);return e.premultiply(l).multiply(h)}static async embedExternalResources(t){const e=[],r=t.querySelectorAll("*");for(const i of r){const t=i.getAttributeNS("http://www.w3.org/1999/xlink","href");t&&e.push(hh.getDataURL(t).then((t=>{i.removeAttributeNS("http://www.w3.org/1999/xlink","href"),i.setAttribute("href",t);})));const r=i;if("IMG"==i.tagName&&"data"!=r.src.substr(0,4)&&e.push(hh.getDataURL(r.src).then((t=>{i.setAttribute("src",t);}))),"http://www.w3.org/1999/xhtml"==i.namespaceURI&&i.hasAttribute("style")){const t=i.getAttribute("style")||"";e.push(hh.generateEmbeddedCSS(window.location.href,t).then((e=>{t!=e&&i.setAttribute("style",e);})));}}const n=t.querySelectorAll("style");for(const i of n)e.push(hh.generateEmbeddedCSS(window.location.href,i.innerHTML).then((t=>{i.innerHTML!=t&&(i.innerHTML=t);})));return Promise.all(e)}static pauseMutationObservers(){const t=hh.mutationObservers.values();for(const e of t)hh._handleMutations(e.takeRecords()),e.disconnect();}static resumeMutationObservers(){for(const[t]of hh.mutationObservers)this.startMutationObserver(t);}static startMutationObserver(t){hh.mutationObservers.get(t).observe(t,{attributes:!0,childList:!0,subtree:!0,characterData:!0,characterDataOldValue:!0,attributeOldValue:!0});}static _addDynamicPseudoClassRules(t){const e=t.styleSheets;for(let s=0;s<e.length;s++)try{const t=e[s],i=t.cssRules;if(!i)continue;const a=[];for(var r=0;r<i.length;r++){i[r].cssText.indexOf(":hover")>-1&&a.push(i[r].cssText.replace(new RegExp(":hover","g"),`[${hh.HOVER_ATTRIBUTE}]`)),i[r].cssText.indexOf(":active")>-1&&a.push(i[r].cssText.replace(new RegExp(":active","g"),`[${hh.ACTIVE_ATTRIBUTE}]`)),i[r].cssText.indexOf(":focus")>-1&&a.push(i[r].cssText.replace(new RegExp(":focus","g"),`[${hh.FOCUS_ATTRIBUTE}]`)),i[r].cssText.indexOf(":target")>-1&&a.push(i[r].cssText.replace(new RegExp(":target","g"),`[${hh.TARGET_ATTRIBUTE}]`));var n=a.indexOf(i[r].cssText);n>-1&&a.splice(n,1);}for(r=0;r<a.length;r++)t.insertRule(a[r]);}catch(i){}}static arrayBufferToBase64(t){for(var e="",r=t.byteLength,n=0;n<r;n++)e+=String.fromCharCode(t[n]);return window.btoa(e)}static attributeCSS(t,e){return e?`[${t}]=${e}`:`[${t}]`}static attributeHTML(t,e){return e?`${t}="${e}"`:`${t}=""`}static async generateEmbeddedCSS(t,e){let r;const n=[];e=(e=(e=(e=e.replace(new RegExp(":hover","g"),this.attributeCSS(this.HOVER_ATTRIBUTE))).replace(new RegExp(":active","g"),this.attributeCSS(this.ACTIVE_ATTRIBUTE))).replace(new RegExp(":focus","g"),this.attributeCSS(this.FOCUS_ATTRIBUTE))).replace(new RegExp(":target","g"),this.attributeCSS(this.TARGET_ATTRIBUTE));const i=RegExp(/url\((?!['"]?(?:data):)['"]?([^'"\)]*)['"]?\)/gi);for(;r=i.exec(e);){const i=r[1];n.push(this.getDataURL(new URL(i,t).href).then((t=>{e=e.replace(i,t);})));}return await Promise.all(n),e}static async getURL(t){return t=new URL(t,window.location.href).href,new Promise((e=>{var r=new XMLHttpRequest;r.open("GET",t,!0),r.responseType="arraybuffer",r.onload=()=>{e(r);},r.onerror=()=>{e(r);},r.send();}))}static async getEmbeddedCSS(t){const e=t.getRootNode(),r=this.embeddedCSS.get(e)||new Map;this.embeddedCSS.set(e,r);const n=Array.from(e.querySelectorAll("style, link[type='text/css'], link[rel='stylesheet']"));let i=!1;for(const s of n)if(!r.has(s))if(i=!0,"STYLE"==s.tagName){const t=s.sheet;let e="";for(const r of t.cssRules)e+=r.cssText+"\n";r.set(s,this.generateEmbeddedCSS(window.location.href,e));}else r.set(s,this.getURL(s.getAttribute("href")).then((t=>{if(!t.response)return "";this._addDynamicPseudoClassRules(e);var r=uh.decode(t.response);return this.generateEmbeddedCSS(window.location.href,r)})));return i&&this._addDynamicPseudoClassRules(e),Promise.all(r.values())}static async getDataURL(t){var e;const r=await this.getURL(t),n=new Uint8Array(r.response),i=null==(e=r.getResponseHeader("Content-Type"))?void 0:e.split(";")[0];if("text/css"==i){let e=uh.decode(n);e=await this.generateEmbeddedCSS(t,e);const r=window.btoa(e);return r.length>0?"data:"+i+";base64,"+r:""}return "data:"+i+";base64,"+this.arrayBufferToBase64(n)}static updateInputAttributes(t){t.matches("input")&&this._updateInputAttribute(t);for(const e of t.getElementsByTagName("input"))this._updateInputAttribute(e);}static _updateInputAttribute(t){t.hasAttribute("checked")?t.checked||t.removeAttribute("checked"):t.checked&&t.setAttribute("checked",""),t.getAttribute("value")!==t.value&&t.setAttribute("value",t.value);}static isBlankImage(t){return !new Uint32Array(t.buffer).some((t=>0!==t))}};let ch=hh;if(ch.ATTRIBUTE_PREFIX="xr",ch._nextUID=0,ch.serializer=new XMLSerializer,ch.rootLayers=new Map,ch.layers=new Map,ch.mutationObservers=new Map,ch.resizeObservers=new Map,ch.serializeQueue=[],ch.rasterizeQueue=[],ch.renderQueue=[],ch.focusElement=null,ch.activeElement=null,ch.targetElement=null,ch.rootNodeObservers=new Map,ch.TASK_ASYNC_MAX_COUNT=2,ch.TASK_SYNC_MAX_TIME=200,ch.rasterizeTaskCount=0,ch.tasksPending=!1,ch._handleMutations=t=>{for(const e of t){if("attributes"===e.type){if(e.target.getAttribute(e.attributeName)===e.oldValue)continue}if("characterData"===e.type){if(e.target.data===e.oldValue)continue}const t=e.target.nodeType===Node.ELEMENT_NODE?e.target:e.target.parentElement;if(!t)continue;const r=hh.getClosestLayer(t);if(r){if("attributes"===e.type&&"class"===e.attributeName){if((e.oldValue?e.oldValue:"")===e.target.className)continue}r.parentLayer?r.parentLayer.traverseChildLayers(hh.setLayerNeedsRefresh):r.traverseLayers(hh.setLayerNeedsRefresh);}}},ch._triggerRefresh=async t=>{const e=hh.getClosestLayer(t.target);e&&(e.parentLayer?e.parentLayer.traverseChildLayers(hh.setLayerNeedsRefresh):e.traverseLayers(hh.setLayerNeedsRefresh));},ch.embeddedCSS=new Map,self.THREE)var lh=self.THREE;else lh=t;const ph=new lh.Vector3,fh=new lh.Vector3,dh=new hu,mh=new hu;class yh extends lh.Group{constructor(t,e={}){super(),this.options=e,this.textures=new Map,this.textureNeedsUpdate=!1,this.contentMesh=new lh.Mesh(vh.GEOMETRY,new lh.MeshBasicMaterial({transparent:!0,alphaTest:.001,opacity:1})),this._boundsMesh=new lh.Mesh(vh.GEOMETRY,new lh.MeshBasicMaterial({visible:!1})),this.cursor=new lh.Object3D,this.depthMaterial=new lh.MeshDepthMaterial({depthPacking:lh.RGBADepthPacking,alphaTest:.01}),this.domLayout=new lh.Object3D,this.domSize=new lh.Vector3(1,1,1),this.childWebLayers=[],this.shouldApplyDOMLayout="auto";const r=this.element="string"==typeof t?fu(t):t;this.name=r.id,this._webLayer=ch.getClosestLayer(r),this.add(this.contentMesh),this.add(this._boundsMesh),this.cursor.visible=!1,this.matrixAutoUpdate=!0,this.contentMesh.matrixAutoUpdate=!0,this.contentMesh.material.toneMapped=!1,this.contentMesh.visible=!1,this.contentMesh.customDepthMaterial=this.depthMaterial,this._boundsMesh.matrixAutoUpdate=!0,vh.layersByElement.set(this.element,this),vh.layersByMesh.set(this.contentMesh,this);}get currentTexture(){if("VIDEO"===this._webLayer.element.tagName){const t=this._webLayer.element;let e=this.textures.get(t);return e||(e=new lh.VideoTexture(t),e.wrapS=lh.ClampToEdgeWrapping,e.wrapT=lh.ClampToEdgeWrapping,e.minFilter=lh.LinearFilter,this.options.textureEncoding&&(e.encoding=this.options.textureEncoding),this.textures.set(t,e)),e}const t=this._webLayer.canvas;let e=this.textures.get(t);return e?this.textureNeedsUpdate&&(this.textureNeedsUpdate=!1,e.needsUpdate=!0):(e=new lh.Texture(t),e.needsUpdate=!0,e.wrapS=lh.ClampToEdgeWrapping,e.wrapT=lh.ClampToEdgeWrapping,e.minFilter=lh.LinearFilter,this.options.textureEncoding&&(e.encoding=this.options.textureEncoding),this.textures.set(t,e)),e}get pseudoStates(){return this._webLayer.psuedoStates}get depth(){return this._webLayer.depth}get index(){return this.parentWebLayer?this.parentWebLayer.childWebLayers.indexOf(this):0}get needsRefresh(){return this._webLayer.needsRefresh}setNeedsRefresh(){this._webLayer.traverseLayers(ch.setLayerNeedsRefresh);}get needsRemoval(){return this._webLayer.needsRemoval}get bounds(){return this._webLayer.bounds}get parentWebLayer(){return this._webLayer.parentLayer&&vh.layersByElement.get(this._webLayer.parentLayer.element)}refresh(t=!1){this._webLayer.refresh(),this.childWebLayers.length=0;for(const e of this._webLayer.childLayers){const r=vh.getClosestLayerForElement(e.element);r&&(this.childWebLayers.push(r),t&&r.refresh(t));}this._refreshVideoBounds(),this._refreshDOMLayout();}updateLayout(){this.position.copy(this.domLayout.position),this.quaternion.copy(this.domLayout.quaternion),this.scale.copy(this.domLayout.scale),this.contentMesh.scale.copy(this.domSize),this._boundsMesh.scale.copy(this.domSize);const t=this.contentMesh,e=t.material.opacity<.005;e?t.visible=!1:t.material.map&&(t.visible=!0),this.needsRemoval&&e&&(this.parent&&this.parent.remove(this),this.dispose());}updateContent(){const t=this.contentMesh,e=this.currentTexture,r=t.material;e.image&&r.map!==e&&(r.map=e,this.depthMaterial.map=e,this.depthMaterial.needsUpdate=!0,r.depthWrite=!1,this.renderOrder=this.depth+.001*this.index+(this.options.renderOrderOffset||0),r.needsUpdate=!0);}_doUpdate(){this.updateLayout(),this.updateContent(),this.needsRefresh&&this.options.autoRefresh&&this.refresh(),ch.scheduleTasksIfNeeded();}update(t=!1){t?this.traverseLayersPreOrder(this._doUpdate):this._doUpdate();}querySelector(t){const e=this.element.querySelector(t);if(e)return vh.layersByElement.get(e)}traverseLayerAncestors(t){const e=this.parentWebLayer;e&&(e.traverseLayerAncestors(t),t.call(this,e));}traverseLayersPreOrder(t){if(!1===t.call(this,this))return !1;for(const e of this.childWebLayers)if(!1===e.traverseLayersPreOrder(t))return !1;return !0}traverseLayersPostOrder(t){for(const e of this.childWebLayers)if(!1===e.traverseLayersPostOrder(t))return !1;return t.call(this,this)||!0}dispose(){for(const t of this.textures.values())t.dispose();this.contentMesh.geometry.dispose(),this._boundsMesh.geometry.dispose(),ch.disposeLayer(this._webLayer);for(const t of this.childWebLayers)t.dispose();}_refreshVideoBounds(){if("VIDEO"===this.element.nodeName){const t=this.element,e=this.currentTexture,r=getComputedStyle(this.element),{objectFit:n}=r,{width:i,height:s}=this.bounds,{videoWidth:a,videoHeight:o}=t,u=a/o,h=i/s;switch(e.center.set(.5,.5),n){case"none":e.repeat.set(i/a,s/o).clampScalar(0,1);break;case"contain":case"scale-down":if(e.repeat.set(1,1),h>u){const t=this.bounds.height*u||0;this.bounds.left+=(this.bounds.width-t)/2,this.bounds.width=t;}else {const t=this.bounds.width/u||0;this.bounds.top+=(this.bounds.height-t)/2,this.bounds.height=t;}break;case"cover":if(e.repeat.set(i/a,s/o),h<u){const t=this.bounds.height*u||0;this.bounds.left+=(this.bounds.width-t)/2,this.bounds.width=t;}else {const t=this.bounds.width/u||0;this.bounds.top+=(this.bounds.height-t)/2,this.bounds.height=t;}break;default:case"fill":e.repeat.set(1,1);}}}_refreshDOMLayout(){if(this.needsRemoval)return;this.domLayout.position.set(0,0,0),this.domLayout.scale.set(1,1,1),this.domLayout.quaternion.set(0,0,0,1);const t=this.bounds,e=t.width,r=t.height,n=1/vh.DEFAULT_PIXELS_PER_UNIT;if(this.domSize.set(Math.max(n*e,1e-5),Math.max(n*r,1e-5),1),!vh.shouldApplyDOMLayout(this))return;const i=this.parentWebLayer instanceof yh?this.parentWebLayer.bounds:function(t){return pu.parentNode||document.documentElement.append(pu),t.left=pageXOffset,t.top=pageYOffset,t.width=pu.offsetWidth,t.height=pu.offsetHeight,t}(dh),s=-i.width/2+e/2,a=i.height/2-r/2;this.options.layerSeparation||vh.DEFAULT_LAYER_SEPARATION,this.domLayout.position.set(n*(s+t.left),n*(a-t.top),0);}}const gh=class extends yh{constructor(t,e={}){super(t,e),this.options=e,this._interactionRays=[],this._raycaster=new lh.Raycaster,this._hitIntersections=[],this._previousHoverLayers=new Set,this._contentMeshes=[],this._prepareHitTest=t=>{t.pseudoStates.hover&&this._previousHoverLayers.add(t),t.cursor.visible=!1,t.pseudoStates.hover=!1,this._contentMeshes.push(t.contentMesh);},this._webLayer=ch.createLayerTree(this.element,((t,{target:e})=>{var r,n;if("layercreated"===t){if(e===this.element)return;const t=new yh(e,this.options);null==(r=t.parentWebLayer)||r.add(t),this.options.onLayerCreate&&this.options.onLayerCreate(t);}else if("layerpainted"===t){const t=ch.layers.get(e);gh.layersByElement.get(t.element).textureNeedsUpdate=!0;}else if("layermoved"===t){const t=gh.layersByElement.get(e);null==(n=t.parentWebLayer)||n.add(t);}})),this.options.onLayerCreate&&this.options.onLayerCreate(this),this.refresh(!0),this.update();}static computeNaturalDistance(t,e){let r=t;t.isCamera&&(r=t.projectionMatrix);const n=e.getPixelRatio(),i=e.domElement.width/n,s=gh.DEFAULT_PIXELS_PER_UNIT*i,a=function(t){const e=xh,r=wh.getInverse(t),n=bh;return e.left=n.set(-1,0,-1).applyMatrix4(r).angleTo(_h),e.right=n.set(1,0,-1).applyMatrix4(r).angleTo(_h),e.top=n.set(0,1,-1).applyMatrix4(r).angleTo(_h),e.bottom=n.set(0,-1,-1).applyMatrix4(r).angleTo(_h),e.horizontal=e.right+e.left,e.vertical=e.top+e.bottom,e}(r).horizontal;return s/2/Math.tan(a/2)}static shouldApplyDOMLayout(t){const e=t.shouldApplyDOMLayout;return "always"===e||!0===e||"never"!==e&&!1!==e&&!("auto"!==e||!t.parentWebLayer||t.parent!==t.parentWebLayer)}get parentWebLayer(){return super.parentWebLayer}get interactionRays(){return this._interactionRays}set interactionRays(t){this._interactionRays=t;}update(t=!1){this._updateInteractions(),super.update(t);}_intersectionGetGroupOrder(t){let e=t.object;for(;e.parent&&!e.isGroup;)e=e.parent;t.groupOrder=e.renderOrder;}_intersectionSort(t,e){return t.groupOrder!==e.groupOrder?e.groupOrder-t.groupOrder:t.object.renderOrder!==e.object.renderOrder?e.object.renderOrder-t.object.renderOrder:t.distance-e.distance}_updateInteractions(){const t=this._previousHoverLayers;t.clear(),this._contentMeshes.length=0,this.traverseLayersPreOrder(this._prepareHitTest);for(const e of this._interactionRays){e instanceof lh.Ray?this._raycaster.ray.copy(e):this._raycaster.ray.set(e.getWorldPosition(ph),e.getWorldDirection(fh)),this._hitIntersections.length=0;const r=this._raycaster.intersectObjects(this._contentMeshes,!1,this._hitIntersections);r.forEach(this._intersectionGetGroupOrder),r.sort(this._intersectionSort);const n=r[0];if(n){const e=n.object.parent;e.cursor.position.copy(n.point),e.cursor.visible=!0,e.pseudoStates.hover=!0,t.has(e)||e.setNeedsRefresh();}}for(const e of t)e.pseudoStates.hover||e.setNeedsRefresh();}static getLayerForQuery(t){const e=document.querySelector(t);return gh.layersByElement.get(e)}static getClosestLayerForElement(t){const e=t&&t.closest(`[${ch.LAYER_ATTRIBUTE}]`);return gh.layersByElement.get(e)}hitTest(t){const e=this._raycaster,r=this._hitIntersections,n=gh.layersByMesh;e.ray.copy(t),r.length=0,e.intersectObject(this,!0,r),r.forEach(this._intersectionGetGroupOrder),r.sort(this._intersectionSort);for(const i of r){const t=n.get(i.object);if(!t)continue;const e=lu(t.element,dh);if(!e.width||!e.height)continue;let r=t.element;const s=i.uv.x*e.width,a=(1-i.uv.y)*e.height;return ou(t.element,(t=>{if(!r.contains(t))return !1;const n=lu(t,mh),i=n.left-e.left,o=n.top-e.top,{width:u,height:h}=n;return s>i&&s<i+u&&a>o&&a<o+h&&(r=t,!0)})),{layer:t,intersection:i,target:r}}}};let vh=gh;vh.layersByElement=new WeakMap,vh.layersByMesh=new WeakMap,vh.DEFAULT_LAYER_SEPARATION=.001,vh.DEFAULT_PIXELS_PER_UNIT=1e3,vh.GEOMETRY=new lh.PlaneGeometry(1,1,2,2);const xh=new class{constructor(){this.top=0,this.left=0,this.bottom=0,this.right=0,this.horizontal=0,this.vertical=0;}},wh=new lh.Matrix4,bh=new lh.Vector3,_h=new lh.Vector3(0,0,-1);

class HubsApp {
    constructor (width, height, App) {
        this.headDiv = document.createElement("div");
        this.appDiv  = document.createElement("div");
    
        // this.headDiv.style.position = "absolute";
        // this.headDiv.style.left = -10000+'px';
        // this.headDiv.style.top = 0+'px';
        
        this.headDiv.appendChild(this.appDiv);
        // document.body.appendChild(this.headDiv)

        this.width = width;
        this.height = height;

        this.vueApp = createApp(App, {}).mount(this.appDiv);
        this.webLayer3D = new vh(this.vueApp.$el, {
            autoRefresh: true,
            onLayerCreate: (layer) => {
                // nothing yet
            },
            onAfterRasterize(layer) {
                   // nothing yet
            },
            textureEncoding: THREE.sRGBEncoding,
            renderOrderOffset: -1000
        });
    }
}

class HubsTest1 extends HubsApp {
    constructor (width, height) {
        super(width, height, script$2);

        // this.createWebLayer(App)
        // this.vueApp = createApp(App, {}).mount(this.appDiv);
        // this.webLayer3D = new WebLayer3D(this.vueApp.$el, {autoRefresh: true});
    }
}

var init$1 = function () {
    return new HubsTest1(2, 2.25)
};

pushScopeId("data-v-469af010");
const _hoisted_1$1 = /*#__PURE__*/createVNode("p", null, [
  /*#__PURE__*/createVNode("a", {
    href: "https://vitejs.dev/guide/features.html",
    target: "_blank"
  }, " Vite Documentation and Then Some! "),
  /*#__PURE__*/createTextVNode(" | "),
  /*#__PURE__*/createVNode("a", {
    href: "https://v3.vuejs.org/",
    target: "_blank"
  }, "Vue 3 Documentation")
], -1 /* HOISTED */);
const _hoisted_2$1 = /*#__PURE__*/createVNode("p", null, [
  /*#__PURE__*/createTextVNode(" Edit "),
  /*#__PURE__*/createVNode("code", null, "components/HelloWorld.vue"),
  /*#__PURE__*/createTextVNode(" to test hot module replacement. ")
], -1 /* HOISTED */);
popScopeId();


var script$1 = {
  expose: [],
  props: {
  msg: String
},
  setup(__props) {



const state = reactive({ count: 0 });

return (_ctx, _cache) => {
  return (openBlock(), createBlock(Fragment, null, [
    createVNode("h1", null, toDisplayString(__props.msg), 1 /* TEXT */),
    _hoisted_1$1,
    createVNode("button", {
      onClick: _cache[1] || (_cache[1] = $event => (unref(state).count++))
    }, "count is: " + toDisplayString(unref(state).count), 1 /* TEXT */),
    _hoisted_2$1
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

var css_248z$1 = "\na[data-v-469af010] {\n  color: #42b983;\n}\n*[data-v-469af010] {\n    box-sizing: content-box;\n}\nh1[data-v-469af010] {\n    display: block;\n    font-size: 2em;\n    margin-block-start: 0.67em;\n    margin-block-end: 0.67em;\n    margin-inline-start: 0px;\n    margin-inline-end: 0px;\n    font-weight: bold;\n}\n";
styleInject(css_248z$1);

script$1.__scopeId = "data-v-469af010";
script$1.__file = "src/components/HelloWorld.vue";

pushScopeId("data-v-1654fff2");
const _hoisted_1 = { id: "top" };
const _hoisted_2 = /*#__PURE__*/createVNode("img", {
  alt: "Vue logo",
  src: _imports_0
}, null, -1 /* HOISTED */);
popScopeId();

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md

var script = {
  expose: [],
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1, [
    _hoisted_2,
    createVNode(script$1, { msg: "Hello From the HelloWorld Component" })
  ]))
}
}

};

var css_248z = "\n#top[data-v-1654fff2] {\n  font-family: Avenir, Helvetica, Arial, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-align: center;\n  color: #50312c;\n  margin-top: 30px;\n\n  width: 400px; height: 500px;\n  position: absolute;\n\n  display: block;\n  background-color: white;\n}\n*[data-v-1654fff2] {\n    box-sizing: content-box;\n}\nimg[data-v-1654fff2] {\n    max-width: none;\n        display: inline;\n}\n";
styleInject(css_248z);

script.__scopeId = "data-v-1654fff2";
script.__file = "src/apps/HubsTest2/AppHello.vue";

class HubsTest2 extends HubsApp {
    constructor (width, height) {
        super(width, height, script);

        // this.vueApp = createApp(App, {}).mount(this.appDiv);
        // this.webLayer3D = new WebLayer3D(this.vueApp.$el, {autoRefresh: true});
    }
}

var init = function () {
    return new HubsTest2(2, 2.5)
};

export { init$1 as hubsTest1, init as hubsTest2 };
