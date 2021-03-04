<template>
  <div class="hello">
    <table-test :tableHelper="tableHelper">
    </table-test>
  </div>
</template>

<script>
import TableHelper from "../tableHelper";
import tableTest from "./tableTest.vue";

export default {
  components: { tableTest },
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
        { test1: "第一列测试1", test2: "第一列测试2" },
        { test1: "第二列测试1", test2: "第二列测试2" },
      ],
      tableEvents: {
        rowClick: (row) => {
          console.log(row);
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
