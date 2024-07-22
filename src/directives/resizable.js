// 支持上下左右四边拖动。若内部元素太贴边，不易触发拖动事件，最好在拖动一边加边框，使鼠标容易选中。
// 使用方式：
// <div v-resizable="'right, bottom'">

const sideArr = [
  "right",
  "left",
  "top",
  "bottom",
  "left-bottom",
  "right-bottom",
];
const errmsg = "resizable needs string value of: " + sideArr;
const minSize = 40;
const dragSize = 10;
export const resizable = {
  // eslint-disable-next-line no-unused-vars
  bind(el, binding, vnode, oldVnode) {
    const dragable = {};
    const oriCur = el.style.cursor;
    const sides = binding.value.replace(" ", "").split(",");
    let dragSide = "";
    let dragging = false;

    if (sides.length === 0) {
      throw errmsg;
    }
    for (let i = 0; i < sides.length; i++) {
      if (sideArr.indexOf(sides[i]) < 0) {
        throw errmsg;
      }
      dragable[sides[i]] = true;
    }

    el.addEventListener("mousemove", (e) => {
      if (dragging) return;

      if (
        dragable["left-bottom"] &&
        el.offsetWidth - e.offsetX < dragSize &&
        el.offsetHeight - e.offsetY < dragSize
      ) {
        el.style.cursor = "nwse-resize";
        dragSide = "right-bottom";
      } else if (
        dragable["right-bottom"] &&
        e.offsetX < dragSize &&
        el.offsetHeight - e.offsetY < dragSize
      ) {
        el.style.cursor = "nesw-resize";
        dragSide = "left-bottom";
      } else if (dragable["right"] && el.offsetWidth - e.offsetX < dragSize) {
        el.style.cursor = "ew-resize";
        dragSide = "right";
      } else if (dragable["left"] && e.offsetX < dragSize) {
        el.style.cursor = "ew-resize";
        dragSide = "left";
      } else if (dragable["top"] && e.offsetY < dragSize) {
        el.style.cursor = "ns-resize";
        dragSide = "top";
      } else if (dragable["bottom"] && el.offsetHeight - e.offsetY < dragSize) {
        el.style.cursor = "ns-resize";
        dragSide = "bottom";
      } else {
        el.style.cursor = oriCur;
        dragSide = "";
      }
    });

    el.addEventListener("mousedown", (e) => {
      if (!dragSide) return;

      dragging = true;
      const cstyle = window.getComputedStyle(el);
      const width = Number.parseInt(cstyle.width);
      const height = Number.parseInt(cstyle.height);
      const elW = width > 0 ? width : el.offsetWidth;
      const elH = height > 0 ? height : el.offsetHeight;
      const clientX = e.clientX;
      const clientY = e.clientY;

      const movefun = (e) => {
        e.preventDefault();
        if (dragSide === "right-bottom") {
          el.style.width = elW + (e.clientX - clientX) + "px";
          el.style.height = elH + (e.clientY - clientY) + "px";
        } else if (dragSide === "left-bottom") {
          el.style.width = elW + (clientX - e.clientX) + "px";
          el.style.height = elH + (e.clientY - clientY) + "px";
        } else if (
          dragSide === "right" &&
          (e.clientX > clientX || el.offsetWidth >= minSize)
        ) {
          el.style.width = elW + (e.clientX - clientX) + "px";
        } else if (
          dragSide === "left" &&
          (e.clientX < clientX || el.offsetWidth >= minSize)
        ) {
          el.style.width = elW + (clientX - e.clientX) + "px";
        } else if (
          dragSide === "top" &&
          (e.clientY < clientY || el.offsetHeight >= minSize)
        ) {
          el.style.height = elH + (clientY - e.clientY) + "px";
        } else if (
          dragSide === "bottom" &&
          (e.clientY > clientY || el.offsetHeight >= minSize)
        ) {
          el.style.height = elH + (e.clientY - clientY) + "px";
        }
      };
      const removefun = () => {
        dragging = false;
        document.removeEventListener("mousemove", movefun);
        document.removeEventListener("mouseup", removefun);
      };

      document.addEventListener("mousemove", movefun);
      document.addEventListener("mouseup", removefun);
    });
  },
};
export default {
  install: (app) => {
    app.directive("resizable", resizable);
  },
};
