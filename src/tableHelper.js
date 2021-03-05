/**
 * 表格创建小助手！
 * 使用方式： 全局/局部注册 simp-table 组件 
 *    ==> 将组件的 tableHelper 绑定
 *    ==> tableHelper初始化(new TableHelper(tableOptions: object))
 * tableOptions基本信息包含: tableRef: 表格对应的prop，tableData: 表格数据
 * 
 * @param {Object} tableOptions 
 */
function TableHelper(tableOptions = {}) {
  // 为 tableOptions 提供默认值
  defaultValueInit({}, tableOptions.tableRef, isObj);
  // 为 tableData 提供默认值
  defaultValueInit([], tableOptions.tableData, isArr);

  this.tableOptions = Object.assign({}, this.global, tableOptions)
}

TableHelper.prototype.global = {// 默认的 全局设置
  // 表格的依赖对象 形如 { test: "标题" }
  tableRef: {},
  // 表格对应的数据 形如 [{ test: "内容" }]
  tableData: [],
  loadingInfo: {

  },
  tableAttrs: {
    emptyText: "暂时没有数据哦~",
    height: "auto",
    maxHeight: 10000,
    stripe: false,
    border: false,
    size: "medium",
    fit: true,
    showHeader: true,
    highlightCurrentRow: false,
    rowStyle: {},
    cellStyle: {},
    headerRowStyle: {},
    headerCellStyle: {},
    defaultExpandAll: false,
    defaultSort: {},
    tooltipEffect: "dark",
    rowClassName: "",
    cellClassName: "",
    headerRowClassName: "",
    headerCellClassName: "",
    showSummary: false,
    sumText: "合计",
    summaryMethod: () => { },
  },
  tableEvents: {
    select: () => { },
    selectAll: () => { },
    selectionChange: () => { },
    cellMouseEnter: () => { },
    cellMouseLeave: () => { },
    cellClick: () => { },
    cellDBClick: () => { },
    rowClick: () => { },
    rowContextmenu: () => { },
    rowDBClick: () => { },
    headerClick: () => { },
    headerContextmenu: () => { },
    sortChange: () => { },
    filterChange: () => { },
    currentChange: () => { },
    headerDragend: () => { },
    expandChange: () => { },
  },
  tableColAttrs: {

  }
}
// 修改全局设置
TableHelper.prototype.setGlobalOptions = function () {
  console.log(this)
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