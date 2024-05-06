<template>
  <div class="home">
    {{ time }}
    <InputInterval v-model="time" />
  </div>
</template>

<script>
import InputInterval from "@/components/InputInterval.vue";
export default {
  name: "HomeView",
  components: {
    InputInterval,
  },
  data() {
    return {
      time: "",
    };
  },
};
</script>
