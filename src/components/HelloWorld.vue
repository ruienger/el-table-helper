<template>
  <div class="hello">
    {{ tableHelper }}
    <ez-table :tableHelper="tableHelper">
      <template v-slot:test1_1="prop">
        <div :style="prop.row['test1_1'] === '第一行测试1'?'color:red':'color:blue'">{{prop.row}}</div>
      </template>
    </ez-table>
  </div>
</template>

<script>
import TableHelper from "../tableHelper";
import ezTable from "./ez-table.vue";

let t = new TableHelper({});
t.setGlobalOptions("loading", true);

export default {
  components: { ezTable },
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      tableHelper: null,
    };
  },
  created() {
    /* eslint-disable */
    const cTest = {
        test1: {
          label: "测试1",
          children: {
            test1_1: "测试1——1",
            test1_2: "测试1——2",
            test1_3: "测试1——3",
          },
        },
        test2: { label: "测试2", children: { test2_1: "测试2——1" } },
      },
      test = {
        test1: "测试1",
        test2: "测试2",
      },
      dataT = [
        { test1: "第一行测试1", test2: "第一行测试2" },
        { test1: "第二行测试1", test2: "第二行测试2" },
      ],
      dataCT = [
        {
          test1_1: "第一行测试1",
          test1_2: "第一行测试2",
          test1_3: "第一行测试3",
          test2_1: "第一行测试4",
        },
        {
          test1_1: "第二行测试1",
          test1_2: "第二行测试2",
          test1_3: "第二行测试3",
          test2_1: "第二行测试4",
        },
      ];
    this.tableHelper = new TableHelper({
      tableRef: cTest,
      tableData: dataCT,
      elTableEvents: {
        rowClick: (row) => {
          console.log(row);
        },
      },
      elTableAttr: {},
      events: {},
      _class: {
        "center-box": true,
      },
    });
    this.tableHelper.setGlobalOptions({
      loading: true,
      abc: "哈哈哈哈哈哈",
      indexCol: false,
      selectionCol: true,
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.center-box {
  text-align: center;
}
</style>
