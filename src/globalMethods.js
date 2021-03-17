const globalEve = window || global || this

/* eslint-disable */
// 判断是否为对象
function isObj(test) {
  return Object.prototype.toString.call(test) === "[object Object]"
}
// 判断是否为数组
function isArr(test) {
  return Array.isArray(test)
}
// 判断是否为函数
function isFun(test) {
  return typeof test === 'function'
}
// 判断类型是否一致
function isTypeSame(tar, val) {
  return getType(tar) === getType(val)
}
// 获取类型
function getType(tar) {
  return isObj(tar) ? "object" : isArr(tar) ? "array" : typeof tar
}

function setGlobal() {
  console.log("IN IN BABE");
  /**
 * 针对对象的 map 函数
 * @param {function} callback 对应参数value, key
 * @returns {array} callback 返回的值组成的数组
 */
  Object.defineProperty(Object.prototype, "mapper", {
    enumerable: false,
    value: function (callback) {
      const resArr = [], _this = isObj(this) ? this : {}
      for (const key in _this) {
        resArr.push(callback(_this[key], key))
      }
      return resArr;
    },
  })

  globalEve.isObj = isObj;
  globalEve.isArr = isArr;
  globalEve.isFun = isFun;
  globalEve.isTypeSame = isTypeSame;
}

export default setGlobal