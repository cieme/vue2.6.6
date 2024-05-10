<template>
  <div class="home">
    {{ time }}
    <InputInterval v-model="time" />
    {{ integer }}
    <EditInteger v-model="integer" />
    {{ real }}
    <EditReal v-model="real" />
  </div>
</template>

<script>
import InputInterval from "@/components/InputInterval.vue";
import EditInteger from "@/components/EditInteger.vue";
import EditReal from "@/components/EditReal.vue";
export default {
  name: "HomeView",
  components: {
    InputInterval,
    EditInteger,
    EditReal,
  },
  data() {
    return {
      time: "",
      integer: "",
      real: "",
    };
  },
};
</script>
