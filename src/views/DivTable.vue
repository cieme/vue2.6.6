<template>
  <div class="padding">
    <div class="table-container">
      <div v-for="(item, index) in list" :key="index">
        <div class="table-row">
          <div class="table-col"></div>
          <div class="table-col"></div>
        </div>
        <div class="table-row">
          <div class="table-col"></div>
          <div class="table-col"></div>
        </div>
      </div>
    </div>
    <el-table :data="list" border>
      <el-table-column prop="name" label="Name">
        <el-input></el-input>
      </el-table-column>
      <el-table-column prop="name" label="Name">
        <el-input></el-input>
      </el-table-column>
      <el-table-column prop="name" label="Name">
        <el-input></el-input>
        <el-input></el-input>
      </el-table-column>
      <el-table-column prop="name" label="Name">
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "DivTable",
  data() {
    return {
      list: [1, 2, 3, 4],
    };
  },
};
</script>
<style lang="scss" scoped>
.padding {
  padding: 100px;
}
.table-container {
  width: 240px;
  background-color: beige;
}
.table-row {
  display: flex;
}
.table-col {
  flex: 1;
  border: 1px solid #333;
  height: 40px;
  margin-left: -1px;
  margin-top: -1px;
}
.el-input + .el-input {
  margin-top: 20px;
}
</style>
