<template>
  <div class="bg">
    <img src="../assets/bg.png" alt="" class="bg-img" />
    <div class="cub-con">
      <div
        v-for="item in list"
        :key="item.id"
        :style="getStyles(item)"
        class="cub-item"
      >
        <div class="cub-item-item">
          <img class="cub-img" src="../assets/cube_big.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ZhongYan",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      list: [
        { id: 0, position: { x: 130, y: -120, z: 0 } },
        { id: 1, position: { x: 294, y: -280, z: 0 } },
        { id: 2, position: { x: 195, y: -400, z: 0 } },
        { id: 3, position: { x: -215, y: -400, z: 0 } },
        { id: 4, position: { x: -314, y: -280, z: 0 } },
        { id: 5, position: { x: -150, y: -120, z: 0 } },
      ],
    };
  },
  methods: {
    getStyles(item) {
      return {
        transform: `translate3d(${item.position.x}px, ${item.position.y}px, ${item.position.z}px)`,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.bg {
  position: relative;
}
.bg-img {
  width: 100%;
  height: 100%;
}
.cub-con {
  position: absolute;
  bottom: 100px;
  left: 50%;
}

.cub-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.cub-item {
  position: absolute;
  &:nth-child(1) {
    transform: translate3d(130px, -120px, 0px);
    animation: runx1 2s ease-out 0s infinite normal both;
    .cub-item-item {
      transform: translate3d(0, -0px, 0px);
      animation: runy1 2s ease-in 0s infinite normal both;
    }
  }
  &:nth-child(2) {
    transform: translate3d(294px, -280px, 0px);
    animation: runx2 2s ease-in 0s infinite normal both;
    .cub-item-item {
      transform: translate3d(0, -0px, 0px);
      animation: runy2 2s ease-out 0s infinite normal both;
    }
  }
}

@keyframes runx1 {
  0% {
    transform: translate3d(130px, -120px, 0px);
  }
  100% {
    transform: translate3d(294px, -120px, 0px);
  }
}
@keyframes runy1 {
  0% {
    transform: translate3d(0, -0px, 0px);
  }
  100% {
    transform: translate3d(0, -160px, 0px);
  }
}
/*  */
@keyframes runx2 {
  0% {
    transform: translate3d(294px, -280px, 0px);
  }
  100% {
    transform: translate3d(195px, -280px, 0px);
  }
}
@keyframes runy2 {
  0% {
    transform: translate3d(0, -0px, 0px);
  }
  100% {
    transform: translate3d(0, -120px, 0px);
  }
}
</style>
