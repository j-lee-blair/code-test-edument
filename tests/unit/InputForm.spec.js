import InputForm from "../../src/components/InputForm";
import { mount } from "@vue/test-utils";
import { setInputAndClickOk, Selectors } from "./helpers";

const VALID_INPUT = `["dc/character_list.txt"]`;

test("when input is not array, show error msg", async () => {
  const wrapper = mount(InputForm);
  const invalidInput = "invalid";
  const inputField = wrapper.find(Selectors.InputFormInputField);

  await setInputAndClickOk(wrapper, inputField, invalidInput);

  const errorMsg = wrapper.find(Selectors.InputFormError);
  expect(errorMsg.exists()).toBeTruthy();
  expect(wrapper.emitted().childCallback).toBeFalsy();
});

test("when array is valid, do not show error msg", async () => {
  const wrapper = mount(InputForm);
  const inputField = wrapper.find(Selectors.InputFormInputField);

  await setInputAndClickOk(wrapper, inputField, VALID_INPUT);

  const errorMsg = wrapper.find(Selectors.InputFormError);
  expect(errorMsg.exists()).toBe(false);
});

test("when JSON string is valid and click ok, emit inputValid event with array data", async () => {
  const wrapper = mount(InputForm);
  const inputField = wrapper.find(Selectors.InputFormInputField);

  await setInputAndClickOk(wrapper, inputField, VALID_INPUT);

  expect(wrapper.emitted().childCallback).toBeTruthy();
  expect(wrapper.emitted().childCallback[0][0]).toEqual([
    "dc/character_list.txt",
  ]);
});
