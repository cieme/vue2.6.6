<template>
  <el-table border :data="tableData" :span-method="arraySpanMethod">
    <el-table-column
      v-for="item in labelArr"
      :key="item"
      :label="item"
      :prop="item"
      align="center"
    />
  </el-table>
</template>
<script>
import data from "./data.json";
export default {
  name: "SpanTable",
  data() {
    return {
      tableData: [],
      mergeObj: {},
      labelArr: [
        "id",
        "date",
        "name",
        "address",
        "address1",
        "address2",
        "address3",
      ],
    };
  },
  mounted() {
    this.spanDataMerge2(data);
    this.tableData = data;
  },
  methods: {
    spanDataMerge2(data) {
      const mergeObj = {};
      const labelArr = this.labelArr;
      /*  */
      data.forEach((item, rowIndex) => {
        labelArr.forEach((_, columnIndex) => {
          const prevValue = item[this.labelArr[columnIndex - 1]];
          const currentValue = item[this.labelArr[columnIndex]];
          const obj = {
            rowIndex: rowIndex,
            columnIndex: columnIndex - 1,
            span: 1,
            end: columnIndex,
            value: currentValue,
            label: [],
          };

          const keys = Object.keys(mergeObj).filter(
            (item) => item.search(`${rowIndex}_`) > -1
          );

          const values = [];
          keys.forEach((key) => {
            values.push(mergeObj[key]);
          });
          const hasThisValue = values.find((item) => item.value === prevValue);
          if (currentValue === prevValue) {
            // 这个判断有点问题，必须值唯一
            if (!hasThisValue) {
              obj.span = 2;
            } else {
              hasThisValue.span++;
              hasThisValue.end = columnIndex;
              obj.span = 0;
            }
          }
          mergeObj[`${rowIndex}_${columnIndex}`] = obj;
        });
      });
      this.mergeObj = mergeObj;
    },

    /**
     * 实现element合并
     */
    arraySpanMethod({ rowIndex, columnIndex }) {
      const x = this.mergeObj[`${rowIndex}_${columnIndex}`];
      return {
        colspan: x.span,
        rowspan: 1,
      };
    },
  },
};
</script>
