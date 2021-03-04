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
  if (!tableOptions.tableRef) {
    tableOptions.tableRef = {}
  } else if (!isObj(tableOptions.tableRef)) {
    throw new TypeError("类型错误：tableRef 应该是一个 对象")
  }
  // 为 tableData 提供默认值
  if (!tableOptions.tableData) {
    tableOptions.tableData = []
  } else if (!isArr(tableOptions.tableData)) {
    throw new TypeError("类型错误：tableRef 应该是一个 数组")
  }
  // tableData 里没有 template 模板的则添加
  // tableOptions.tableData.forEach(e => {
  //   for (let key in e) {
  //     !e[key].template && (e[key] = { value: e[key], template: e[key] })
  //   }
  // })
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

{/* <template>
  <div>
    {{ tableHelper }}
    <el-table
      :data="tableHelper.tableOptions.tableData"
      @row-click="tableHelper.tableOptions.tableEvents.rowClick"
      style="width: 100%"
    >
      <el-table-column
        v-for="(value, key) in tableHelper.tableOptions.tableRef"
        :key="key"
        :prop="key"
        :label="value"
        width="180"
      >
        <template v-slot="scoped">
          <div v-html="scoped.row[key].template"></div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template> */}
export default TableHelper