<template>
  <div ref="Root" class="Root">
    <slot></slot>
    <transition name="fade">
      <div
        ref="Teleport"
        class="123"
        :style="style"
        v-if="isCreated"
        v-show="show"
      >
        <el-cascader-panel
          :props="propsOptions"
          :options="options"
          @change="change"
        ></el-cascader-panel>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "ContextMenu",
  data() {
    return {
      propsOptions: {
        expandTrigger: "hover",
        checkStrictly: false, // 严格的单选
      },
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则1",
            },
          ],
        },
        {
          value: "zhinan2",
          label: "指南",
          children: [
            {
              value: "shejiyuanze2",
              label: "设计原则2",
            },
          ],
        },
      ],
      isCreated: false,
      show: false,
      style: {
        position: "fixed",
        top: "0",
        left: "0",
        width: "",
        height: "",
        zIndex: "999",
      },
    };
  },
  mounted() {
    this.setEvent();
  },
  beforeDestroy() {
    this.removeEvent();
  },
  methods: {
    /* 打开 */
    onOpen(e) {
      e.preventDefault();
      e.stopPropagation();
      if (!this.isCreated) {
        this.isCreated = true;
        this.$nextTick(() => {
          document.body.appendChild(this.$refs.Teleport);
        });
      }
      /*  */
      this.show = true;
      this.style.left = e.clientX + "px";
      this.style.top = e.clientY + "px";
    },
    closeMenu() {
      this.show = false;
    },
    closeMenuLeft(e) {
      if (this.$refs.Teleport && !this.$refs.Teleport.contains(e.target)) {
        this.closeMenu();
      }
    },
    /*  */
    setEvent() {
      this.$refs.Root.addEventListener("contextmenu", this.onOpen);
      window.addEventListener("click", this.closeMenuLeft, true);
      window.addEventListener("contextmenu", this.closeMenu, true);
    },
    removeEvent() {
      this.$refs.Root.removeEventListener("contextmenu", this.onOpen);
      window.removeEventListener("click", this.closeMenuLeft);
      window.removeEventListener("contextmenu", this.closeMenu);
      document.body.removeChild(this.$refs.Teleport);
    },
    change(val) {
      console.log(val);
      this.closeMenu();
      this.$emit("select", val);
    },
  },
};
</script>
