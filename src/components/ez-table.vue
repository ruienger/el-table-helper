<script>
import TableHelper from "../tableHelper";
export default {
  props: {
    tableHelper: {
      type: TableHelper,
      default: () => new TableHelper(),
    },
  },
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    async refresh() {
      this.loading = true;
      await setTimeout(() => {
        this.tableHelper.refresh.call(this, { as: 123123123123 });
        this.loading = false;
      }, 2000);
    },
  },
  created() {
    this.refresh();
  },
  /**
   * 渲染函数
   *   根据 tableHelper 提供的属性、方法渲染 el-table
   *   这使得 el-table 的属性、事件渲染更为灵活
   *
   * !!!! _c 为 创建Vnode 的函数，详情见
   *   https://cn.vuejs.org/v2/guide/render-function.html
   */
  render(_c) {
    const _this = this;
    /**
     * 下面的变量详情见 tableHelper 全局配置
     */
    const {
      tableData,
      tableRef,
      elTableAttrs,
      elTableEvents,
      elTableColAttrs,
      loadingInfo,
      loading,
      attrs,
      style,
      ref,
      _class,
    } = _this.tableHelper;

    /**
     * 该函数用于
     *   将对象形式出现的组件属性转换为 数据对象
     *  例如 { maxHeight: 100 } ==> :max-height = 100
     */
    function createDataObj() {
      const dataOpts = Object.assign(...arguments);
      const props = {};
      for (const key in dataOpts) {
        props[strParser(key)] = dataOpts[key];
      }
      return props;
    }
    /**
     * 该函数用于
     *   将驼峰改为 -
     *   例如 godLike ==> god-like
     */
    function strParser(str) {
      return str.replace(/[A-Z]/g, (word) => "-" + word.toLowerCase());
    }
    return _c(
      "el-table",
      {
        // 创建一个 el-table 标签并添加属性与事件
        class: _class,
        directives: loading
          ? [
              {
                name: "loading",
                value: _this.loading,
              },
            ]
          : [],
        props: createDataObj(
          { data: tableData },
          elTableAttrs,
          attrs,
          ref,
          style,
          loadingInfo
        ),
        on: createDataObj(elTableEvents),
      },
      Object.keys(tableRef).map((key) => {
        return _c("el-table-column", {
          // 相当于 <el-table-column :prop="key" :label=".../>
          props: createDataObj(
            {
              prop: key,
              label: tableRef[key],
            },
            elTableColAttrs,
            tableRef[key].colAttrs
          ),
          // 相当于 <template v-slot="prop" />
          scopedSlots: {
            default(prop) {
              // prop 为 el-table-column 作用域插槽中的数据

              // 在使用组件时，如果没有提供具名插槽将会导致：
              //    该组件的 this.$scopedSlots 中没有对应的 name 属性
              // 因此在不提供具名插槽时使用默认值
              // 该部分也可以使用 插槽后备值 的方式实现
              return typeof _this.$scopedSlots[key] === "function"
                ? _this.$scopedSlots[key]({
                    index: prop.$index,
                    col: prop.column,
                    row: prop.row,
                  })
                : _c("span", prop.row[key]); // 具名插槽
            },
          },
        });
        // map 结束位置 ⬇
      })
    );
  },
};
</script>

<style>
</style>