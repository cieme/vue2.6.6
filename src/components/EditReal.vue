<script>
export default {
  name: "EditReal",
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
      /* 只允许数字和最多2位小数，如果不符合规则,输入无效 */
      const reg = new RegExp(`^\\d+(\\.\\d{0,${this.max}})?$`);
      if (!reg.test(value)) {
        this.$emit("inputChange", this.beforeValue);
        return;
      }
      // 抛出时间
      this.$emit("inputChange", value); //
      this.$emit("onChange", value); // 最终结束事件
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
    ref="refElement"
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
