<template>
  <div>
    <el-input ref="refInput" :value="value" @input="inputHandle" />
  </div>
</template>
<script>
import { useCursor } from "./index";

export default {
  name: "InputPercentage",
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    value: {
      type: String,
      default: "0",
    },
    formatter: {
      type: Function,
      default: undefined,
    },
    parser: {
      type: Function,
      default: undefined,
    },
  },

  data() {
    return {
      input: null,
      recordCursor: null,
      setCursor: null,
    };
  },
  computed: {},
  watch: {
    value() {
      this.setNativeValue();
    },
  },
  mounted() {
    this.input = this.$refs.refInput.$refs.input;
    const [recordCursor, setCursor] = useCursor(this.input);
    this.recordCursor = recordCursor;
    this.setCursor = setCursor;
    this.setNativeValue();
  },
  methods: {
    async inputHandle(event) {
      this.recordCursor();
      let parseValue = event;
      if (this.formatter) {
        parseValue = this.parser ? this.parser(event) : event;
      }
      if (this.input.value === this.value) {
        this.setNativeValue();
        return;
      }
      this.$emit("input", parseValue);

      await this.$nextTick();
      await this.$nextTick();
      this.setNativeValue();
      this.setCursor();
    },
    setNativeValue() {
      const formatterValue = this.formatter
        ? this.formatter(this.value)
        : this.value;
      if (!this.input || this.input.value === formatterValue) return;
      console.log(formatterValue);
      this.input.value = formatterValue;
    },
  },
};
</script>
