<template>
  <el-dialog
    :visible.sync="visibleCom"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    v-bind="options"
    v-on="$listeners"
  >
    <div>
      <div
        class="interface-item"
        v-for="item in options.interfaceList"
        :key="item.uniqueId"
        @click="chooseInterfaceHandle(item)"
      >
        {{ item.label }}
      </div>
    </div>
    <template #footer>
      <el-button @click="visibleCom = false">取消</el-button>
      <el-button type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>
<script>
import { Dialog, Button } from "element-ui";
export default {
  name: "LinkDialog",
  components: {
    [Dialog.name]: Dialog,
    [Button.name]: Button,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      options: {
        title: "链接",
        width: "400px",
        interfaceList: [], // {label: '接口名称'}
        success() {},
        fail() {},
      },
    };
  },
  computed: {
    visibleCom: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.options.fail && this.options.fail.call(this, value);
        }
        this.$emit("update:visible", value);
      },
    },
  },
  methods: {
    chooseInterfaceHandle(item) {
      this.visibleCom = false;
      this.$emit("choose", item);
      this.options.success && this.options.success.call(this, item);
    },
  },
};
</script>
<style lang="scss" scoped>
.interface-item {
  padding: 10px;
  border-radius: 4px;
  background: #eee;
  cursor: pointer;
  margin-bottom: 8px;
  &:last-of-type {
    margin-bottom: 0;
  }
}
</style>
