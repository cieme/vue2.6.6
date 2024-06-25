// Keep input cursor in the correct position when we use formatter.
export function useCursor(input) {
  let selectionRef = {
    selectionStart: 0,
    selectionEnd: 0,
    value: "",
    beforeTxt: "",
    afterTxt: "",
  };

  function recordCursor() {
    if (input == undefined) return;

    const { selectionStart, selectionEnd, value } = input;

    if (selectionStart == null || selectionEnd == null) return;

    const beforeTxt = value.slice(0, Math.max(0, selectionStart));
    const afterTxt = value.slice(Math.max(0, selectionEnd));

    selectionRef = {
      selectionStart,
      selectionEnd,
      value,
      beforeTxt,
      afterTxt,
    };
  }
  function setCursor() {
    if (input == undefined || selectionRef == undefined) return;

    const { value } = input;
    const { beforeTxt, afterTxt, selectionStart } = selectionRef;

    if (
      beforeTxt == undefined ||
      afterTxt == undefined ||
      selectionStart == undefined
    )
      return;

    let startPos = value.length;

    if (value.endsWith(afterTxt)) {
      console.log("end");
      startPos = value.length - afterTxt.length;
    } else if (value.startsWith(beforeTxt)) {
      console.log("start");
      startPos = beforeTxt.length;
    } else {
      const beforeLastChar = beforeTxt[selectionStart - 1];
      const newIndex = value.indexOf(beforeLastChar, selectionStart - 1);
      if (newIndex !== -1) {
        startPos = newIndex + 1;
      }
    }

    input.setSelectionRange(startPos, startPos);
  }

  return [recordCursor, setCursor];
}
