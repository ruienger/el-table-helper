<template>
  <div class="hello">
    <ez-table :tableHelper="tableHelper">
      <template v-slot:test1="prop">
        <div :style="prop.row['test1'] === '第一行测试1'?'color:red':'color:blue'">{{prop.row['test1']}}</div>
      </template>
    </ez-table>
  </div>
</template>

<script>
import TableHelper from "../tableHelper";
import ezTable from "./ez-table.vue";
// import testSlot from "./testSlot.vue";

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
    this.tableHelper = new TableHelper({
      tableRef: { test1: "测试1", test2: "测试2" },
      tableData: [
        { test1: "第一行测试1", test2: "第一行测试2" },
        { test1: "第二行测试1", test2: "第二行测试2" },
      ],
      tableEvents: {
        rowClick: (row) => {
          console.log(row);
        },
      },
      tableAttr: {
        cellStyle: {
          "text-align": "center",
        },
      },
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
</style>
