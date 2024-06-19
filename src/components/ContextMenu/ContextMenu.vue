<template>
  <transition name="msgbox-fade">
    <div ref="Teleport" class="123" :style="style" v-if="isCreated && visible">
      <el-menu
        class="el-menu-vertical-demo"
        :collapse="true"
        style="padding: 5px 0"
        @select="change"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="">收藏</i>
          </template>
          <el-scrollbar wrap-style="overflow-x:hidden;">
            <el-menu-item-group>
              <el-menu-item index="1-1" v-for="item in children" :key="item.id"
                >选项1</el-menu-item
              >
            </el-menu-item-group>
          </el-scrollbar>
        </el-submenu>
      </el-menu>
    </div>
  </transition>
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
      children: [],
      isCreated: false,
      visible: false,
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
          this.setDirection(e);
        });
      }
      /*  */
      this.visible = true;
      if (this.isCreated) {
        this.$nextTick(() => {
          this.setDirection(e);
        });
      }
    },
    closeMenu() {
      this.visible = false;
    },
    closeMenuLeft(e) {
      if (this.$refs.Teleport && !this.$refs.Teleport.contains(e.target)) {
        this.closeMenu();
      }
    },
    /*  */
    setEvent() {
      window.addEventListener("click", this.closeMenuLeft, true);
      window.addEventListener("contextmenu", this.closeMenu, true);
    },
    removeEvent() {
      window.removeEventListener("click", this.closeMenuLeft);
      window.removeEventListener("contextmenu", this.closeMenu);
      document.body.removeChild(this.$refs.Teleport);
    },
    change(val) {
      console.log(val);
      this.closeMenu();
      this.$emit("select", val);
    },
    /* 应该出现在上下左右 */
    setDirection(e) {
      const { clientWidth, clientHeight } = document.documentElement;
      const { clientX, clientY } = e;
      if (clientX + this.$refs.Teleport.clientWidth > clientWidth) {
        this.style.left = clientX - this.$refs.Teleport.clientWidth + "px";
      } else {
        this.style.left = clientX + "px";
      }
      if (clientY + this.$refs.Teleport.clientHeight > clientHeight) {
        this.style.top = clientY - this.$refs.Teleport.clientHeight + "px";
      } else {
        this.style.top = clientY + "px";
      }
    },
  },
};
</script>
<style lang="scss">
.xx {
  overflow: hidden;
}

body {
  .el-menu-item,
  .el-submenu__title {
    height: 32px;
    line-height: 32px;
  }
  .el-menu-item-group__title {
    padding: 0;
  }
}
.el-menu-item-group {
  max-height: 230px;
}
</style>
