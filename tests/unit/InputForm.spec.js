import InputForm from "../../src/components/InputForm";
import { mount } from "@vue/test-utils";
import { setInputAndClickOk, selectors } from "./helpers";

test("when JSON string invalid, show error msg", async () => {
  const wrapper = mount(InputForm);
  const invalidJSON = "invalid";
  const inputField = wrapper.find(selectors.InputFormInputField);

  await setInputAndClickOk(wrapper, inputField, invalidJSON);

  const errorMsg = wrapper.find(selectors.InputFormError);
  expect(errorMsg.exists()).toBeTruthy();
  expect(wrapper.emitted().childCallback).toBeFalsy();
});

test("when JSON string is valid, do not show error msg", async () => {
  const wrapper = mount(InputForm);
  const validJson = '[{"valid": "json"}]';
  const inputField = wrapper.find(selectors.InputFormInputField);

  await setInputAndClickOk(wrapper, inputField, validJson);

  const errorMsg = wrapper.find(selectors.InputFormError);
  expect(errorMsg.exists()).toBe(false);
});

test("when JSON string is valid and click ok, should emit inputValid event", async () => {
  const wrapper = mount(InputForm);
  const validJson = '[{"valid": "json"}]';
  const inputField = wrapper.find(selectors.InputFormInputField);

  await setInputAndClickOk(wrapper, inputField, validJson);

  expect(wrapper.emitted().childCallback).toBeTruthy();
  expect(wrapper.emitted().childCallback[0][0]).toEqual(validJson);
});
