<template>
  <codemirror ref="myCodeMirror" v-model="contentCom" :options="cmOptions" />
</template>
<script>
import { codemirror } from "vue-codemirror";
import "codemirror/addon/hint/javascript-hint.js";

import "codemirror/lib/codemirror.css";

import "codemirror/mode/sql/sql.js"; // 引入mode
import "codemirror/theme/solarized.css"; // 引入theme

import "codemirror/theme/idea.css";
import "codemirror/mode/shell/shell";
// 代码提示功能 具体语言可以从 codemirror/addon/hint/ 下引入多个
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint";
// 高亮行功能
import "codemirror/addon/selection/active-line";

export default {
  name: "CodeEdit",
  model: {
    prop: "content",
    event: "input",
  },
  components: {
    codemirror: codemirror,
  },
  props: {
    content: {
      type: String,
      default: "",
    },
    windowItem: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      list: [],
      hintList: [
        {
          name: "const",
        },
        {
          name: "count",
        },
        {
          name: "var",
        },
        {
          name: "from",
        },
      ],
      hintLabel: "name",
      splitRules: ["(", ")", ".", " "],
      cmOptions: {
        tabSize: 4,
        lineNumbers: true,
        line: true,
        mode: "text/javascript",
        smartIndent: true,
        indentUnit: 4,
        autoRefresh: true,
        theme: "default",
        lineWrapping: true,
        // 高亮行功能
        styleActiveLine: true,
        hintOptions: {
          completeSingle: false,
          hint: this.handleShowHint,
        },
      },
    };
  },
  computed: {
    contentCom: {
      get() {
        return this.content;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const editor = this.$refs.myCodeMirror.codemirror;
      console.log(editor);
      editor.on("inputRead", (editor) => {
        editor.showHint();
      });
      editor.on("keydown", (editor, event) => {
        const keyCode = event.keyCode;
        if (keyCode === 219 || keyCode === 221) {
          editor.showHint();
        }
      });
    },
    handleShowHint() {
      // 获取输入框实例
      const cmInstance = this.$refs.myCodeMirror.codemirror;
      // 得到光标
      let cursor = cmInstance.getCursor();
      // 得到行内容
      let cursorLine = cmInstance.getLine(cursor.line);
      // 得到光标位置
      let end = cursor.ch;
      this.list = [];
      // 得到光标标识
      let token = cmInstance.getTokenAt(cursor);
      this.getListHint(cursorLine, end);
      return {
        list: this.list, // 自定义提示内容
        // ch:选择提示内容替换的开始位置，line: 光标所在行
        from: { ch: token.start, line: cursor.line },
        to: { ch: token.end, line: cursor.line },
      };
    },
    getListHint(cursorLine, cursorIndex) {
      let indexList = [];
      for (let i = 0; i < cursorIndex; i++) {
        // 获取所有分隔符小于当前光标的位置
        if (this.splitRules.includes(cursorLine[i])) indexList.push(i);
      }
      // 得到当前距离光标最近且小于光标位置的字符位置
      const earlayRightIndex = indexList[indexList.length - 1];
      // 截取光标与最近且位置坐标小于光标的内容
      const str = cursorLine.substring(earlayRightIndex + 1, cursorIndex);
      // 遍历自定义提示数组，得到满足条件的提示内容
      this.hintList.forEach((item) => {
        if (item[this.hintLabel].indexOf(str) !== -1 && str) {
          this.list.push(item[this.hintLabel]);
        }
      });
    },
  },
};
</script>
