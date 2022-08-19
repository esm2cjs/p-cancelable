var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var esm_exports = {};
__export(esm_exports, {
  CancelError: () => CancelError,
  default: () => PCancelable
});
module.exports = __toCommonJS(esm_exports);
var _cancelHandlers, _rejectOnCancel, _state, _promise, _reject, _setState, setState_fn;
class CancelError extends Error {
  constructor(reason) {
    super(reason || "Promise was canceled");
    this.name = "CancelError";
  }
  get isCanceled() {
    return true;
  }
}
const promiseState = Object.freeze({
  pending: Symbol("pending"),
  canceled: Symbol("canceled"),
  resolved: Symbol("resolved"),
  rejected: Symbol("rejected")
});
const _PCancelable = class {
  constructor(executor) {
    __privateAdd(this, _setState);
    __privateAdd(this, _cancelHandlers, []);
    __privateAdd(this, _rejectOnCancel, true);
    __privateAdd(this, _state, promiseState.pending);
    __privateAdd(this, _promise, void 0);
    __privateAdd(this, _reject, void 0);
    __privateSet(this, _promise, new Promise((resolve, reject) => {
      __privateSet(this, _reject, reject);
      const onResolve = (value) => {
        if (__privateGet(this, _state) !== promiseState.canceled || !onCancel.shouldReject) {
          resolve(value);
          __privateMethod(this, _setState, setState_fn).call(this, promiseState.resolved);
        }
      };
      const onReject = (error) => {
        if (__privateGet(this, _state) !== promiseState.canceled || !onCancel.shouldReject) {
          reject(error);
          __privateMethod(this, _setState, setState_fn).call(this, promiseState.rejected);
        }
      };
      const onCancel = (handler) => {
        if (__privateGet(this, _state) !== promiseState.pending) {
          throw new Error(`The \`onCancel\` handler was attached after the promise ${__privateGet(this, _state).description}.`);
        }
        __privateGet(this, _cancelHandlers).push(handler);
      };
      Object.defineProperties(onCancel, {
        shouldReject: {
          get: () => __privateGet(this, _rejectOnCancel),
          set: (boolean) => {
            __privateSet(this, _rejectOnCancel, boolean);
          }
        }
      });
      executor(onResolve, onReject, onCancel);
    }));
  }
  static fn(userFunction) {
    return (...arguments_) => new _PCancelable((resolve, reject, onCancel) => {
      arguments_.push(onCancel);
      userFunction(...arguments_).then(resolve, reject);
    });
  }
  then(onFulfilled, onRejected) {
    return __privateGet(this, _promise).then(onFulfilled, onRejected);
  }
  catch(onRejected) {
    return __privateGet(this, _promise).catch(onRejected);
  }
  finally(onFinally) {
    return __privateGet(this, _promise).finally(onFinally);
  }
  cancel(reason) {
    if (__privateGet(this, _state) !== promiseState.pending) {
      return;
    }
    __privateMethod(this, _setState, setState_fn).call(this, promiseState.canceled);
    if (__privateGet(this, _cancelHandlers).length > 0) {
      try {
        for (const handler of __privateGet(this, _cancelHandlers)) {
          handler();
        }
      } catch (error) {
        __privateGet(this, _reject).call(this, error);
        return;
      }
    }
    if (__privateGet(this, _rejectOnCancel)) {
      __privateGet(this, _reject).call(this, new CancelError(reason));
    }
  }
  get isCanceled() {
    return __privateGet(this, _state) === promiseState.canceled;
  }
};
let PCancelable = _PCancelable;
_cancelHandlers = new WeakMap();
_rejectOnCancel = new WeakMap();
_state = new WeakMap();
_promise = new WeakMap();
_reject = new WeakMap();
_setState = new WeakSet();
setState_fn = function(state) {
  if (__privateGet(this, _state) === promiseState.pending) {
    __privateSet(this, _state, state);
  }
};
Object.setPrototypeOf(PCancelable.prototype, Promise.prototype);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CancelError
});
//# sourceMappingURL=index.js.map
