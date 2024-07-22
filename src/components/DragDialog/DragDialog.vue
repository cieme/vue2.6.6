<template>
  <vue-draggable-resizable
    :w="width"
    :h="height"
    @resizing="onResize"
    @dragging="onDrag"
  >
    <!-- 弹窗内容 -->
    <div class="dialog">
      <header>我是标题</header>
      <main>我是内容</main>
      <footer>我是按钮</footer>
    </div>
  </vue-draggable-resizable>
</template>

<script>
import VueDraggableResizable from "vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";

export default {
  components: {
    VueDraggableResizable,
  },
  data() {
    return {
      width: 300,
      height: 200,
      x: 0,
      y: 0,
    };
  },
  methods: {
    onResize: function (x, y, width, height) {
      this.width = width;
      this.height = height;
    },
    onDrag: function (x, y) {
      this.x = x;
      this.y = y;
    },
  },
};
</script>

<style scoped>
.dialog {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
}

header,
footer {
  padding: 10px;
  background-color: #f0f0f0;
}

main {
  padding: 20px;
  flex-grow: 1;
}
</style>
