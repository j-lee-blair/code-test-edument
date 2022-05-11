import App from "../../src/App";
import { mount } from "@vue/test-utils";

test("when JSON string valid and click ok, should switch to tree view", async () => {
  const wrapper = mount(App);
  const validJson = '[{"valid": "json"}]';
  const inputField = wrapper.find(selectors.InputForminputField);

  await setInputAndClickOk(wrapper, inputField, validJson);

  const treeComp = wrapper.find(selectors.TreeComponent);

  expect(treeComp.exists()).toBeTruthy();
});

async function setInputAndClickOk(wrapper, element, value) {
  setInputField(element, value);
  const button = wrapper.find(selectors.InputFormbutton);
  button.trigger("click");
}

function setInputField(wrapper, val = "") {
  wrapper.setValue(val);
}

const selectors = {
  InputForminputField: '[t-id="InputForm-input-field"]',
  InputFormbutton: '[t-id="InputForm-button"]',
  TreeComponent: '[t-id="TreeComponent"]',
};
