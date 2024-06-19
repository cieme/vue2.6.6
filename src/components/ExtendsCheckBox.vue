<template>
  <div>
    {{ checkedValue }} {{ isAllIn }}
    <el-checkbox v-model="checked" @change="changeHandle"></el-checkbox>
  </div>
</template>
<script>
export default {
  name: "ExtendsCheckBox",
  props: {
    /* 双向绑定的值,选中的值 */
    value: {
      type: Array,
      default: () => [],
    },
    /* 选中的值,配置的 */
    checkedValue: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      checked: false,
    };
  },
  computed: {
    /* 是否所有的值都在 */
    isAllIn() {
      return this.checkedValue.every((item) => this.value.includes(item));
    },
  },
  watch: {
    value: {
      handler() {
        /* 如果所有的值都在这里 */
        if (this.isAllIn) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      },
      immediate: true,
    },
  },
  methods: {
    changeHandle() {
      // this.checked = !this.checked;
      if (this.checked) {
        // eslint-disable-next-line vue/no-mutating-props
        this.value.push(...this.checkedValue);
      } else {
        for (let i = 0; i < this.value.length; i++) {
          const isIncludes = this.checkedValue.includes(this.value[i]);
          if (isIncludes) {
            // eslint-disable-next-line vue/no-mutating-props
            this.value.splice(i, 1);
            i--;
          }
        }
      }
      console.log(this.value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
