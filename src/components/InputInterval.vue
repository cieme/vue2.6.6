<script>
export default {
  name: "InputInterval", // 间隔输入框
  components: {},
  props: {
    max: {
      type: Number,
      default: 1,
    },
    value: {
      type: String,
      default: "",
    },
  },
  model: {
    prop: "value",
    event: "inputChange",
  },
  data() {
    return {
      beforeValue: "",
      processedLock: false, //
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    };
  },
  methods: {
    focus() {
      this.beforeValue = this.value;
      this.processedLock = false;
    },
    blur(event) {
      if (this.processedLock) return;
      this.valueHandle(event);
      this.processedLock = false;
    },
    valueHandle(event) {
      const value = event.target.value.replace(/\s/g, "");
      // 全部去掉空格
      const newValue = value.replaceAll("，", ",").replaceAll("：", ":");
      const reg = /^(\d{1,9}:)?(\d{1,9}:)?(\d{1,9}:)?(\d{1,9})(\.\d{1,9})?$/;

      const valueArr = newValue.split(",");
      const resultArr = valueArr.map((item) => {
        return reg.test(item);
      });

      // 有效 value 值数组为
      const validValueArr = valueArr.filter((item, index) => {
        return resultArr[index];
      });
      /* 有效长度有效值数组为 */
      const maxValueArr = validValueArr.splice(0, this.max); // 最多只能输入 max 个值
      // 按照 毫秒,秒,分,时,天 的顺序进行排列,保证毫秒开始,没有毫秒位,补位
      const arrData = maxValueArr.map((item) => {
        const arr = item.split(":");
        /* 如果有毫秒位置 */
        if (arr[arr.length - 1].includes(".")) {
          const splitArr = arr[arr.length - 1].split("."); // 秒 和 毫秒

          let [second, dotAfterMillisecondStr] = splitArr;
          arr[arr.length - 1] = second; // 秒 位置
          // console.log(dotAfterMillisecondStr);  // 小数后面的数
          // 1100  900 002
          const originMillisecond = `0.${dotAfterMillisecondStr}`; // 原本的数
          // console.log(originMillisecond);
          // 0.1100  0.900  0.002

          if (Number(originMillisecond) >= 0.1) {
            if (dotAfterMillisecondStr < 1000) {
              dotAfterMillisecondStr = Number(originMillisecond) * 1000;
              // console.log(dotAfterMillisecondStr); // 这行不对
            } else {
              dotAfterMillisecondStr = Number(dotAfterMillisecondStr);
              // console.log(dotAfterMillisecondStr);
            }
          } else {
            dotAfterMillisecondStr = Number(originMillisecond) * 1000;
          }
          arr.push(dotAfterMillisecondStr);
        } else {
          /* 没有毫秒补充毫秒 */
          arr.push("0"); // 保证第一位是毫秒
        }

        const numberArr = arr.map((item) => {
          return Number(item);
        });
        return numberArr.reverse();
      });

      /* 第0位是毫秒,定义其规则 */
      const ruleArr = [1000, 60, 60, 24]; // 1000 毫秒,60 秒,60 分,24 小时

      /* 处理数据,数据超过规则进位 */
      arrData.forEach((item) => {
        /*  */
        ruleArr.forEach((divisor, index) => {
          // 除数
          const value = item[index];
          if (value) {
            // 余数
            const remainder = value % divisor;
            // 商
            const quotient = Math.floor(value / divisor);
            item[index] = remainder;
            if (index + 1 <= item.length) {
              if (item[index + 1] || quotient) {
                item[index + 1] = (Number(item[index + 1]) || 0) + quotient;
              }
              // 却逻辑
            }
          }
        });
      });
      console.log(JSON.stringify(arrData));

      /*  */
      /* 数据格式化 为 天:时:分:秒 */
      const formatStrArr = arrData.map((item) => {
        let str = "";
        if (item[0] != 0) {
          item[1] = 0 + item[1] + item[0] / 1000;
        }

        /* 删除毫秒位置 */
        item.shift();
        /*  */
        if (item.length < 2) {
          item.push(0); // 为了好看,分钟位 补个 0
        }
        item.forEach((value, index) => {
          if (value < 10) {
            item[index] = `0${value}`;
          }
        });
        str = item.reverse().join(":");
        return str;
      });

      /* 补足字符串处理 */
      const maxFormatStrValue = formatStrArr.join(",");
      // 抛出时间
      this.$emit("inputChange", maxFormatStrValue); //
      this.$emit("onChange", maxFormatStrValue); // 最终结束事件
      /* 打开锁 */
      this.processedLock = true;
    },
    inputChange(e) {
      this.$emit("inputChange", e);
    },
  },
};
</script>
<template>
  <el-input
    v-bind="$attrs"
    v-on="$listeners"
    :value="value"
    @focus="focus"
    @blur="blur"
    @keydown.native.enter="valueHandle"
    @input="inputChange"
  >
    <template v-for="(index, name) in $slots" :slot="name">
      <slot :name="name"></slot>
    </template>
  </el-input>
</template>
