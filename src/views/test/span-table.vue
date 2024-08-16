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
export default {
  name: "SpanTable",
  data() {
    return {
      tableData: [],
      mergeList: [],
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
    const data = [
      {
        id: "0",
        date: "2016-05-02",
        name: "王小虎",
        address: "address",
        address1: "address",
        address2: "address1",
        address3: "address1",
      },
      {
        id: "1",
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄",
        address1: "上海市普陀区金沙江路 1518 弄",
        address2: "上海市普陀区金沙江路 1518 弄",
        address3: "上海市",
      },
      {
        id: "2",
        date: "2016-05-02",
        name: "王小虎",
        address: "王小虎家",
        address1: "王小虎家",
        address2: "yyy",
        address3: "yyy",
      },
      {
        id: "3",
        date: "2016-05-02",
        name: "王小虎",
        address: "王小虎的地址",
        address1: "王小虎的地址",
        address2: "zzz",
        address3: "zzz",
      },
    ];
    this.spanDataMerge2(data);
    // this.dataToSpan(data);

    // data.forEach((item) => {
    //   console.log(item);
    //   for (const key in item) {
    //     if (item[key] === "") {
    //       delete item[key];
    //     }
    //   }
    // });
    console.log(data);
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
          const hasThisValue = Object.values(mergeObj).find(
            (item) => item.value === prevValue
          );
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
      this.mergeList = mergeObj;
      console.log(this.mergeList);
    },
    /* 处理数据 改为 '' */
    dataToSpan(data) {
      data.forEach((tableCurrentRow, tableRowIndex) => {
        const currentMergeRow = this.mergeList[tableRowIndex];

        currentMergeRow.forEach((list, columnIndex) => {
          columnIndex;
          // console.log(tableCurrentRow, tableRowIndex, list, columnIndex);
          if (list.rowIndex === tableRowIndex) {
            currentMergeRow.forEach((item) => {
              item.label.forEach((label, index) => {
                if (index !== 0) {
                  tableCurrentRow[label] = "";
                }
              });
            });
            // console.log(tableCurrentRow);
          }
        });
      });
    },
    /**
     * 实现element合并
     */
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      row, column, rowIndex, columnIndex;
      const x = this.mergeList[`${rowIndex}_${columnIndex}`];
      return {
        colspan: x.span,
        rowspan: 1,
      };
    },
  },
};
</script>
