import InputForm from "../../src/components/InputForm";
import { mount } from "@vue/test-utils";

test("when JSON string invalid, show error msg", async () => {
  const wrapper = mount(InputForm);
  const invalidJSON = "invalid";
  const inputField = wrapper.find('[t-id="InputForm-input-field"]');

  setInputField(inputField, invalidJSON);
  const button = wrapper.find('[t-id="InputForm-button"]');
  await button.trigger("click");

  const errorMsg = wrapper.find('[t-id="InputForm-json-error"]');
  expect(errorMsg.exists()).toBeTruthy();
});

test("when JSON string is valid, do not show error msg", async () => {
  const wrapper = mount(InputForm);
  const validJson = '[{"valid": "json"}]';
  const inputField = wrapper.find('[t-id="InputForm-input-field"]');

  setInputField(inputField, validJson);
  const button = wrapper.find('[t-id="InputForm-button"]');
  await button.trigger("click");

  const errorMsg = wrapper.find('[t-id="InputForm-json-error"]');
  expect(errorMsg.exists()).toBe(false);
});

function setInputField(wrapper, val = "") {
  wrapper.setValue(val);
}
