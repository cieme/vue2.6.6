<template>
  <div ref="editor"></div>
</template>
<script>
import { CodeJar } from "codejar";
import Prism from "prismjs";
export default {
  name: "CodeJar",

  props: {
    content: {
      type: String,
    },
  },
  data() {
    return {
      jar: null,
    };
  },
  mounted() {
    this.init();
  },

  methods: {
    init() {
      const editorElem = this.$refs.editor;
      // const highlight = (editor) => {
      //   let code = editor.textContent;
      //   code = code.replace("foo", '<span style="color: red">foo</span>');
      //   editor.innerHTML = code;
      // };
      this.jar = CodeJar(editorElem, Prism.highlightElement);
    },
  },
};
</script>
