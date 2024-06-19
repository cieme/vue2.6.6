<template>
  <div class="home">
    {{ checkList.xxx }}
    {{ time }}
    <InputInterval v-model="time" />
    {{ integer }}
    <EditInteger v-model="integer" />
    {{ real }}
    <EditReal v-model="real" />
    {{ checkList }}
    <ExtendsCheckBox
      v-for="(item, index) in list"
      :key="index"
      :checkedValue="item.value"
      :value="checkList"
    />

    <div class="box1"></div>
  </div>
</template>

<script>
import InputInterval from "@/components/InputInterval.vue";
import EditInteger from "@/components/EditInteger.vue";
import EditReal from "@/components/EditReal.vue";
import ExtendsCheckBox from "@/components/ExtendsCheckBox.vue";

export default {
  name: "HomeView",
  components: {
    InputInterval,
    EditInteger,
    EditReal,
    ExtendsCheckBox,
  },
  data() {
    return {
      time: "",
      integer: "",
      real: "",
      list: [
        { label: "复选框 A", value: [1, 2] },
        { label: "复选框 B", value: [3, 4] },
        { label: "复选框 C", value: [5, 6] },
      ],
      checkList: [1, 2],
    };
  },

  methods: {},
};
</script>
<style lang="scss" scoped>
@function generateImage($number, $startDeg: 0) {
  $str: "";
  $deg: 360 / $number;
  $currentDeg: 0;
  @for $i from 1 through $number {
    @if ($i!=1) {
      $currentDeg: $currentDeg + $deg;
    }

    @if $i%2 ==1 {
      $str: $str +
        red +
        " " +
        $currentDeg +
        deg +
        " "+
        ($currentDeg + $deg) +
        deg;
    } @else {
      $str: $str +
        white +
        " " +
        $currentDeg +
        deg +
        " " +
        ($currentDeg + $deg) +
        deg;
    }
    @if ($i !=($number)) {
      $str: $str + ",";
    }
  }
  @return unquote("from " + $startDeg + "deg at 50% 50%," + $str);
}
.box {
  width: 400px;
  height: 400px;
  background: orange;
}
.box1 {
  width: 200px;
  height: 200px;
  border: 1px solid #333;
  border-radius: 50%;
  background-image: conic-gradient(generateImage(2, 20));
  image-rendering: pixelated;
  // -webkit-box-reflect: right;
}
.box2 {
  width: 200px;
  height: 200px;
  border: 1px solid #333;
  border-radius: 50%;
  background-image: conic-gradient(generateImage(4, 45));
  image-rendering: pixelated;
  // -webkit-box-reflect: below;
}
.box3 {
  width: 200px;
  height: 200px;
  border: 1px solid #333;
  border-radius: 50%;
  background-image: conic-gradient(generateImage(6, 0));
  image-rendering: pixelated;
  // -webkit-box-reflect: below;
}
.box4 {
  width: 200px;
  height: 200px;
  border: 1px solid #333;
  border-radius: 50%;
  background-image: conic-gradient(generateImage(8, 20));
  image-rendering: pixelated;
  // -webkit-box-reflect: below;
  // -webkit-box-reflect: right;
}
</style>
