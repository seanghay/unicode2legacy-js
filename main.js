import Clipboard from 'clipboard';
import { convert } from './reorder.js';


/**
 * @returns {HTMLElement} 
 */
const $ = (a) => document.querySelector(a);

const $el = {
  textInput: $("#text-input"),
  textOutput: $("#text-output"),
  buttonGenerate: $("#button-copy"),
  preview: $("#preview")
}

new Clipboard('#button-copy');

$el.textInput.addEventListener('input', () => {
  const o = convert($el.textInput.value);
  $el.textOutput.value = o;
  $el.preview.value = o;
});

const neutralText = $el.buttonGenerate.textContent;
$el.buttonGenerate.addEventListener('click', () => {
  $el.buttonGenerate.textContent = '✅ បានចម្លងរួចរាល់';
  setTimeout(() => {
    $el.buttonGenerate.textContent = neutralText;
  }, 2000);
})

