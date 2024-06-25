
/**
 * 复制某段指定文字
 * @param text
 */
export const copySpecifiedText = (text: string) => {
  if (text) window.navigator.clipboard.writeText(text).catch(err => err);
}

/**
 * 是否可以复制文本
 * @returns
 */
export const canCopyText = () => {
  const selection = window.getSelection();
  if (!selection) return false;
  return selection.toString() !== '';
}

/*
 * 复制选中的文字
 * @returns
 */
export const copySelectionText = () => {
  const context = window.getSelection()?.toString();
  if (context) copySpecifiedText(context);
}

/**
 * 粘贴指定文字
 * @param text
 */
export const pasteSpecifiedText = (text: string) => {
  const activeElement = document.activeElement;

  console.log(document.activeElement);

  console.log(activeElement, text);
}

/**
 * 粘贴剪贴板中的文字
 */
export const pasteSelectionText = async () => {
  const text = await window.navigator.clipboard.readText();
  if (text) pasteSpecifiedText(text);
}
