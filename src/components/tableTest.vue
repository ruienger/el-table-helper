
<script>
import TableHelper from "../tableHelper";

export default {
  props: {
    tableHelper: {
      type: TableHelper,
      default: () => new TableHelper(),
    },
  },
  created() {
    // let test = new TableHelper();
    // test.setGlobalOptions();
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
    /**
     * 下面四个变量详情见 tableHelper 全局配置
     */
    const {
      tableData,
      tableRef,
      tableAttrs,
      tableEvents,
    } = this.tableHelper.tableOptions;
    /**
     * 该函数用于
     *   将对象形式出现的组件属性转换为 数据对象
     *  例如 { maxHeight: 100 } ==> :max-height = 100
     */
    function createDataObj(dataOpts) {
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
      "div",
      {
        // 相当于 <div></div>
      },
      [
        _c(
          "el-table",
          {
            // 创建一个 el-table 标签并添加属性与事件
            props: createDataObj(
              Object.assign({ data: tableData }, tableAttrs)
            ),
            on: createDataObj(tableEvents),
          },
          Object.keys(tableRef).map((key) => {
            return _c("el-table-column", {
              // 相当于 <el-table-column :prop="key" :label=".../>
              props: createDataObj(
                {
                  prop: key,
                  label: tableRef[key],
                },
                tableRef[key].colAttrs
              ),
              //  * 实现 el-table-column 下 template + scoped 自定义内容(未完成)
            });
            // map 结束位置 ⬇
          })
        ),
      ]
    );
  },
};
/**
 * !!!!!!!!!!!!!!!!!! 暂弃用代码段
 * 
 * 实现 el-table-column 下 template + scoped 自定义内容(未完成)
 * 
              [
                _c("template", {
                  // 相当于 <template v-slot="scoped"/>
                  scopedSlots: {
                    scoped: (props) => {
                      console.log(props);
                      return _c("div", {
                        domProps: {
                          // 相当于 <div v-html="scoped.row[key].template" />
                          innerHTML: props.row[key].template,
                        },
                      });
                    },
                  },
                  slot: "scoped",
                }),
              ]
 */
</script>

<style>
</style>