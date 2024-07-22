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
    {{ value }}
    <InputPercentage
      v-model="value"
      :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
      :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
    />
    {{ value2 }}
    <InputPercentage
      v-model="value2"
      :formatter="formatter"
      :parser="parser1"
    />
    {{ code }}
    <codemirror v-if="false" v-model="code" />
    <CodeFlask v-model="code" />
    <CodeJar v-if="false" />
  </div>
</template>

<script>
import InputInterval from "@/components/InputInterval.vue";
import EditInteger from "@/components/EditInteger.vue";
import EditReal from "@/components/EditReal.vue";
import ExtendsCheckBox from "@/components/ExtendsCheckBox.vue";
import InputPercentage from "@/components/inputPercentage.vue";
import codemirror from "@/components/codemirror.vue";
import CodeFlask from "@/components/CodeFlask.vue";
import CodeJar from "@/components/CodeJar.vue";
export default {
  name: "HomeView",
  components: {
    InputInterval,
    EditInteger,
    EditReal,
    ExtendsCheckBox,
    InputPercentage,
    codemirror,
    CodeFlask,
    CodeJar,
  },
  data() {
    return {
      code: "const a = 1",
      time: "",
      integer: "",
      real: "",
      list: [
        { label: "复选框 A", value: [1, 2] },
        { label: "复选框 B", value: [3, 4] },
        { label: "复选框 C", value: [5, 6] },
      ],
      checkList: [1, 2],
      value: "9500",
      value2: "1023",
    };
  },

  methods: {
    formatter1(value) {
      const index = value.length - 2;
      const newValue = value.replaceAll(".", "");
      if (index > 0) {
        return newValue.slice(0, index) + "." + newValue.slice(index);
      }
      return value;
    },
    parser1(value) {
      return value.replaceAll(".", "");
    },
    formatter(value) {
      const index = value.length - 2;
      const reg = new RegExp(/\./, "g");
      const newValue = value.replace(reg, "");
      if (index > 0) {
        return newValue.slice(0, index) + "." + newValue.slice(index);
      }
      return value;
    },
    parser(value) {
      const reg = new RegExp(/\./, "g");
      return value.replace(reg, "");
    },
  },
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
