export async function setInputAndClickOk(wrapper, element, value) {
  setInputField(element, value);
  const button = wrapper.find(selectors.InputFormbutton);
  button.trigger("click");
}

function setInputField(wrapper, val = "") {
  wrapper.setValue(val);
}

export const selectors = {
  InputForm: '[t-id="InputForm"]',
  InputFormInputField: '[t-id="InputForm-input-field"]',
  InputFormbutton: '[t-id="InputForm-button"]',
  InputFormError: '[t-id="InputForm-json-error"]',
  TreeComponent: '[t-id="TreeComponent"]',
  TreeComponentFolder: '[t-id="TreeComponent-folder"]',
  TreeComponentFolderTitle: '[t-id="TreeComponent-folder-title"]',
  TreeComponentFileName: '[t-id="File-file-name"]',
};
