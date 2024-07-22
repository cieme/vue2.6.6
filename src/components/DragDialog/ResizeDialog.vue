<template>
  <div style="padding: 200px">
    <div ref="DRefResize" class="resize" :style="style">
      <div ref="header" class="resize-header">
        <div @click="vis = !vis">xxxxx</div>
      </div>
    </div>
  </div>
</template>
<script>
const sideArr = [
  "right",
  "left",
  "top",
  "bottom",
  "left-bottom",
  "right-bottom",
];
const errmsg = "resizable needs string value of: " + sideArr;
const minSize = 40;
const dragSize = 10;

export default {
  name: "ResizeDialog",
  props: {
    width: {
      type: Number,
      default: 700,
    },
    height: {
      type: Number,
      default: 500,
    },
    binding: {
      type: Array,
      default: () => ["right", "bottom", "left-bottom", "right-bottom"],
    },
  },
  data() {
    return {
      vis: false,
      comLeft: 0,
      comTop: 0,
    };
  },
  computed: {
    comWidth: {
      get() {
        return this.width;
      },
      set(val) {
        this.$emit("update:width", val);
      },
    },
    comHeight: {
      get() {
        return this.height;
      },
      set(val) {
        this.$emit("update:height", val);
      },
    },
    style() {
      return {
        width: this.width + "px",
        height: this.height + "px",
        transform: `translate3d(${-this.comLeft}px, ${-this.comTop}px, 0px)`,
      };
    },
  },
  mounted() {
    this.dragChangeSize(this.$refs.DRefResize);
    this.dragPosition(this.$refs.header, this.$refs.DRefResize);
  },
  methods: {
    dragChangeSize(el) {
      const dragable = {};
      let oriCur;
      const binding = this.binding;
      const sides = binding;
      let dragSide = "";
      let dragging = false;

      if (sides.length === 0) {
        throw errmsg;
      }
      for (let i = 0; i < sides.length; i++) {
        if (sideArr.indexOf(sides[i]) < 0) {
          throw errmsg;
        }
        dragable[sides[i]] = true;
      }

      el.addEventListener("mousemove", (e) => {
        if (dragging) return;

        if (
          dragable["left-bottom"] &&
          el.offsetWidth - e.offsetX < dragSize &&
          el.offsetHeight - e.offsetY < dragSize
        ) {
          el.style.cursor = "nwse-resize";
          dragSide = "right-bottom";
        } else if (
          dragable["right-bottom"] &&
          e.offsetX < dragSize &&
          el.offsetHeight - e.offsetY < dragSize
        ) {
          el.style.cursor = "nesw-resize";
          dragSide = "left-bottom";
        } else if (dragable["right"] && el.offsetWidth - e.offsetX < dragSize) {
          el.style.cursor = "ew-resize";
          dragSide = "right";
        } else if (dragable["left"] && e.offsetX < dragSize) {
          el.style.cursor = "ew-resize";
          dragSide = "left";
        } else if (dragable["top"] && e.offsetY < dragSize) {
          el.style.cursor = "ns-resize";
          dragSide = "top";
        } else if (
          dragable["bottom"] &&
          el.offsetHeight - e.offsetY < dragSize
        ) {
          el.style.cursor = "ns-resize";
          dragSide = "bottom";
        } else {
          el.style.cursor = oriCur;
          dragSide = "";
        }
      });

      el.addEventListener("mousedown", (e) => {
        oriCur = el.style.cursor;
        if (!dragSide) return;

        dragging = true;
        const cstyle = window.getComputedStyle(el);
        const width = Number.parseInt(cstyle.width);
        const height = Number.parseInt(cstyle.height);
        const elW = width > 0 ? width : el.offsetWidth;
        const elH = height > 0 ? height : el.offsetHeight;
        const clientX = e.clientX;
        const clientY = e.clientY;

        const movefun = (e) => {
          e.preventDefault();
          if (dragSide === "right-bottom") {
            this.comWidth = elW + (e.clientX - clientX);
            this.comHeight = elH + (e.clientY - clientY);
          } else if (dragSide === "left-bottom") {
            this.comWidth = elW + (clientX - e.clientX);
            this.comHeight = elH + (e.clientY - clientY);
          } else if (
            dragSide === "right" &&
            (e.clientX > clientX || el.offsetWidth >= minSize)
          ) {
            this.comWidth = elW + (e.clientX - clientX);
          } else if (
            dragSide === "left" &&
            (e.clientX < clientX || el.offsetWidth >= minSize)
          ) {
            this.comWidth = elW + (clientX - e.clientX);
          } else if (
            dragSide === "top" &&
            (e.clientY < clientY || el.offsetHeight >= minSize)
          ) {
            this.comHeight = elH + (clientY - e.clientY);
          } else if (
            dragSide === "bottom" &&
            (e.clientY > clientY || el.offsetHeight >= minSize)
          ) {
            this.comHeight = elH + (e.clientY - clientY);
          }
        };
        const removefun = () => {
          dragging = false;
          document.removeEventListener("mousemove", movefun);
          document.removeEventListener("mouseup", removefun);
        };

        document.addEventListener("mousemove", movefun);
        document.addEventListener("mouseup", removefun);
      });
    },
    dragPosition(el) {
      el.addEventListener("mousedown", (e) => {
        const clientX = e.clientX;
        const clientY = e.clientY;
        const beforeX = this.comLeft;
        const beforeY = this.comTop;
        el.style.cursor = "move";
        const movefun = (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.comLeft = beforeX + clientX - e.clientX;
          this.comTop = beforeY + clientY - e.clientY;
        };
        const removefun = () => {
          el.style.cursor = "default";
          document.removeEventListener("mousemove", movefun);
          document.removeEventListener("mouseup", removefun);
        };
        document.addEventListener("mousemove", movefun);
        document.addEventListener("mouseup", removefun);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.resize {
  position: fixed;
  inset: 0;
  margin: auto;
  background: blueviolet;
  user-select: none;
  max-height: 80vh;
  max-width: 80vw;
  min-width: 100px;
  min-height: 100px;
}
.resize-header {
  position: relative;
  height: 100px;
  background: orange;
}
</style>
