/**
 * 表格创建小助手！
 * 使用方式： 全局/局部注册 simp-table 组件 
 *    ==> 将组件的 tableHelper 绑定
 *    ==> tableHelper初始化(new TableHelper(tableOptions: object))
 * tableOptions基本信息包含: tableRef: 表格对应的prop，tableData: 表格数据
 * 
 * @param {Object} tableOptions 
 */
function TableHelper(tableInfo = {}) {
  if (isObj(tableInfo)) {
    // 为 tableOptions 提供默认值
    defaultValueInit({}, tableInfo.tableRef, isObj);
    // 为 tableData 提供默认值
    defaultValueInit([], tableInfo.tableData, isArr);

    ({
      tableData: this.tableData,
      tableRef: this.tableRef,
      loading: this.loading,
      loadingInfo: this.loadingInfo,
      elTableAttrs: this.elTableAttrs,
      elTableEvents: this.elTableEvents,
      elTableColAttrs: this.elTableColAttrs,
      _class: this._class,
      style: this.style,
      attrs: this.attrs,
      ref: this.ref,
      refresh: this.refresh,
      reset: this.reset,
      exportExcel: this.exportExcel,
    } = Object.assign({}, this.global, tableInfo))
  }
}

TableHelper.prototype.global = {// 默认的 全局设置
  // 表格的依赖对象 形如 { test: "标题" }
  tableRef: {},
  // 表格对应的数据 形如 [{ test: "内容" }]
  tableData: [],
  loading: true,
  loadingInfo: {
    elementLoadingText: "在加了在加了，别催了",
    elementLoadingSpinner: "el-icon-loading",
    elementLoadingBackground: "rgba(0, 0, 0, 0.8)"
  },
  elTableAttrs: {
    emptyText: "暂时没有数据哦~",
  },
  elTableEvents: {
  },
  elTableColAttrs: {
  },
  _class: {}, style: {}, attrs: {}, ref: "", refresh() { }, reset() { }, exportExcel() { }
}
/**
 * 修改全局配置，修改成功则不返回值，失败则抛出异常
 * @param {string} key 
 * @param {any} value 
 */
TableHelper.prototype.setGlobalOptions = function (key, value) {
  if (isTypeSame(this.global[key], value)) {
    this.global[key] = value;
  } else {
    throw new TypeError("设置的值 " + value + " 的类型与预定" + key + "的类型" + getType(this.global[key]) + "不符")
  }
}




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
/**
   * 该函数用于给予 目标 一个指定的默认值
   * 可选 ==> passFun 是否通过校验的函数
   * @param {any} defaultV 
   * @param {any} target 
   * @param {boolean} passFun
   */
function defaultValueInit(defaultV, target, passFun) {
  if (!target) {
    target = defaultV;
  } else if (!passFun(target)) {
    throw new TypeError("类型错误，传入的参数：" +
      target + " 应为：" + defaultV)
  }
}

export default TableHelper