import setGlobal from '@/globalMethods'
setGlobal();

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
  // tableInfo 为对象时才进行下一步
  if (window.isObj(tableInfo)) {
    // 为 tableOptions 提供默认值
    defaultValueInit({}, tableInfo.tableRef, window.isObj);
    // 为 tableData 提供默认值
    defaultValueInit([], tableInfo.tableData, window.isArr);


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
      indexCol: this.indexCol,
      selectionCol: this.selectionCol,
    } = Object.assign({}, this.global, tableInfo))

    // 判断是否要添加 index、selection 列
    if (this.indexCol) {
      this.indexCol = Object.assign({
        colAttrs: { type: "index" }
      }, this.indexCol)
    }
    if (this.selectionCol) {
      this.selectionCol = Object.assign({
        colAttrs: { type: "selection" }
      }, this.selectionCol)
    }

  } else {
    throw new TypeError("the tableInfo expect type object but got " + window.getType(tableInfo))
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
  indexCol: false,
  selectionCol: false,
  _class: {}, style: {}, attrs: {}, ref: ""
}
/**
 * 修改全局配置，修改成功则不返回值，失败则抛出异常
 * @param {string} key 
 * @param {any} value 
 */
TableHelper.prototype.setGlobalOption = function (key, value) {
  if (this.global[key] !== undefined) {
    this.global[key] = value;
  } else {
    console.warn("设置的键 " + key + " 不包括在全局配置内")
  }
}
/**
 * 根据传入的对象修改全局配置，修改成功则不返回值，失败则保持原样
 * @param {object} options 
 */
TableHelper.prototype.setGlobalOptions = function (GLopts) {
  GLopts.mapper((value, key) => {
    this.setGlobalOption(key, value);
  })
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