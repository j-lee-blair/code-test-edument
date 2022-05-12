export async function setInputAndClickOk(wrapper, element, value) {
  element.setValue(value);
  const button = wrapper.find(selectors.InputFormbutton);
  button.trigger("click");
}

export const selectors = {
  InputForm: '[t-id="InputForm"]',
  InputFormInputField: '[t-id="InputForm-input-field"]',
  InputFormbutton: '[t-id="InputForm-button"]',
  InputFormError: '[t-id="InputForm-json-error"]',
  TreeComponent: '[t-id="TreeComponent"]',
  FolderComponentFolder: '[t-id="Folder-folder"]',
  FolderComponentFolderTitle: '[t-id="Folder-folder-title"]',
  FileComponentFileName: '[t-id="File-file-name"]',
};
