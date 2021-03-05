<template>
  <div class="hello">
    <table-test :tableHelper="tableHelper">
    </table-test>
    <!-- <testSlot>
      <slot text="scoped">
        {{ scoped }}
      </slot>
    </testSlot> -->
    <el-table :data="[{ test: 'TEST' }]">
      <el-table-column
        label="123"
        prop="test"
      >
        <template v-slot="prop">
          <slot
            name="KEY"
            :test="prop.row.test"
          >{{ prop.row }}</slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import TableHelper from "../tableHelper";
import tableTest from "./tableTest.vue";
// import testSlot from "./testSlot.vue";

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
