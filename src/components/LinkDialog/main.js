import Vue from "vue";
// import { Dialog } from "element-ui";
import Dialog from "./LinkDialog.vue";
const LinkDialogConstructor = Vue.extend(Dialog);
let instance;
let promise = {
  resolve: null,
  reject: null,
};
const initInstance = () => {
  instance = new LinkDialogConstructor({
    el: document.createElement("div"),
  });
  document.body.appendChild(instance.$el);
};
export const showLinkDialog = (options) => {
  if (!instance) {
    initInstance();
  }
  instance.$once("choose", (e) => {
    promise.resolve(e);
  });
  instance.$once("update:visible", (visible) => {
    instance.visible = visible;
    if (!visible) {
      promise.reject();
      instance.$nextTick(() => {
        destroy();
      });
    }
  });

  instance.options = options;
  instance.visible = true;
  return new Promise((resolve, reject) => {
    promise.resolve = resolve;
    promise.reject = reject;
  });
};
function destroy() {
  document.body.removeChild(instance.$el);
  instance && instance.$destroy();
  instance = null;
}

// window.addEventListener("contextmenu", (e) => {
//   e.preventDefault();
//   showLinkDialog({
//     title: "链接",
//     width: "400px",
//     interfaceList: [
//       {
//         label: "链接",
//         uniqueId: 1,
//       },
//       {
//         label: "链接2",
//         uniqueId: 2,
//       },
//     ],
//     success(interfaceItem) {
//       console.log(interfaceItem);
//     },
//     fail() {},
//   })
//     .then((interfaceItem) => {
//       console.log(interfaceItem);
//     })
//     .catch(() => {});
// });
