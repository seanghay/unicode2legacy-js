import lottie from 'lottie-web';
import Clipboard from 'clipboard';
import { limon as convert } from 'khmer-unicode-converter';


/**
 * @returns {HTMLElement} 
 */
const $ = (a) => document.querySelector(a);

const $el = {
  textInput: $("#text-input"),
  textOutput: $("#text-output"),
  buttonGenerate: $("#button-copy"),
  preview: $("#preview"),
  downloadTrigger: $("#download-trigger"),
  fontDownload: $("#font-download")
}

$el.downloadTrigger.addEventListener('click', () => {
  $el.fontDownload.classList.remove('hidden')
})

$el.fontDownload.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    $el.fontDownload.classList.add('hidden');
  }
})

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


lottie.loadAnimation({
  container: $('#lottie-container'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: '/anim.json',
});