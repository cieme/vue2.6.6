<template>
  <div class="home">
    <HelloWorld v-model="time" />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  data() {
    return {
      time: "",
    };
  },
};
</script>
