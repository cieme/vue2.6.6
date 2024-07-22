<template>
  <div ref="editor"></div>
</template>
<script>
import CodeFlask from "codeflask";
export default {
  name: "CodeFlask",
  model: {
    prop: "content",
    event: "input",
  },
  props: {
    content: {
      type: String,
    },
  },
  data() {
    return {
      flask: null,
    };
  },
  mounted() {
    this.init();
    this.updateCode(this.content);
  },
  methods: {
    init() {
      const editorElem = this.$refs.editor;
      this.flask = new CodeFlask(editorElem, {
        language: "js",
        lineNumbers: true,
      });
      this.flask.onUpdate(this.codeUpdateHandle);
    },
    updateCode(code) {
      this.flask.updateCode(code);
    },
    getCode() {
      return this.flask.getCode();
    },
    codeUpdateHandle(code) {
      this.$emit("input", code);
    },
  },
};
</script>
