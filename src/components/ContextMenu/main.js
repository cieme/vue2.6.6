import Vue from "vue";
// import ElementUI from "element-ui";
import ContextMenu from "../ContextMenu/ContextMenu.vue";
const ContextMenuConstructor = Vue.extend(ContextMenu);
// ContextMenuConstructor.use(ElementUI);
let instance;
const initInstance = () => {
  instance = new ContextMenuConstructor({
    el: document.createElement("div"),
  });
  document.body.appendChild(instance.$el);
};

export const showMenu = (e, options) => {
  if (!instance) {
    initInstance();
  }
  instance.options = options;
  instance.visible = true;

  instance.onOpen(e);
};
initInstance();

// window.addEventListener("contextmenu", (e) => {
//   e.stopPropagation();
//   e.preventDefault();
//   instance.children.push(
//     ...[
//       {},
//       {},
//       {},
//       {},
//       {},
//       {},
//       {},
//       {},
//       {},
//       {},
//       {},
//       {},
//       {},
//       {},
//       {},
//       {},
//       {},
//       {},
//       {},
//       {},
//       {},
//       {},
//       {},
//       {},
//     ]
//   );
//   showMenu(e, {});
// });
