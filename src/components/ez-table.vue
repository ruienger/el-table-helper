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

    /**
     *  rendeColumn 返回 mapper 方法执行后的返回值
     *  mapper 方法将对象的 value,key 传入回调函数
     *    并返回由 回调函数的返回值 组成的数组
     *  该例中， 回调函数的返回值是 VNode 节点
     *    同时，在进行完配置后，如果 传入的 value有children属性
     *    则再次调用 rendeColumn，使其返回的数组成为该 VNode 的子节点
     *    如此递归
     */

    /**
     * 遍历 tableRef 中的各项生成 el-table-columns,支持嵌套
     *  如若 该项 有 children 属性则递归处理
     */
    function rendeColumn(ref) {
      // item 可能有两种结构 例如 dydj: "电压等级" / jcxx: { label: "基础信息", children: { dydj: "电压等级" }, colAttrs: {...}}
      return ref.mapper((value, key, isObj = window.isObj(value)) => {
        console.log(!value.children);
        return _c(
          "el-table-column",
          {
            // 相当于 <el-table-column :prop="key" :label=".../>
            props: createDataObj(
              {
                prop: key,
                label: isObj ? value.label : value,
              },
              elTableColAttrs,
              value.colAttrs
            ),
            // 相当于 <template v-slot="prop" />
            scopedSlots:
              // 没有 children 属性的才添加具名插槽
              value.children
                ? {
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
                  }
                : {},
          },
          value.children ? rendeColumn(value.children) : undefined
        );
      });
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
      rendeColumn(tableRef)
    );
  },
};
</script>

<style>
</style>