import App from "../../src/App";
import { mount } from "@vue/test-utils";
import { setInputAndClickOk, selectors } from "./helpers";

test("when JSON string valid and click ok, should switch to tree view", async () => {
  const wrapper = mount(App);
  const validJson = '[{"valid": "json"}]';
  const inputField = wrapper.find(selectors.InputFormInputField);

  await setInputAndClickOk(wrapper, inputField, validJson);

  const treeComp = wrapper.find(selectors.TreeComponent);
  const inputForm = wrapper.find(selectors.InputForm);
  expect(treeComp.exists()).toBeTruthy();
  expect(inputForm.exists()).toBeFalsy();
});
