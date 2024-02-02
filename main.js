import lottie from 'lottie-web';
import Clipboard from 'clipboard';
import { limon as convert } from 'khmer-unicode-converter';

const fonts = [
  "/lmnf1.ttf",
  "/lmnf2.ttf",
  "/lmnf3.ttf",
  "/lmnf4.ttf",
  "/lmnf5.ttf",
  "/lmnf6.ttf",
  "/lmnf7.ttf",
  "/lmnf8.ttf",
  "/lmnr1.ttf",
  "/lmnr2.ttf",
  "/lmnr3.ttf",
  "/lmnr4.ttf",
  "/lmnr5.ttf",
  "/lmns1.ttf",
  "/lmns2.ttf",
  "/lmns3.ttf",
  "/lmns4.ttf",
  "/lmns5.ttf",
  "/lmns6.ttf",
  "/lmns7.ttf",
];

let limonFontsAreLoaded = false;

function loadLimonFonts() {
  if (limonFontsAreLoaded) return;
  let css = '';
  for (const url of fonts) {
    const family = url.slice(1, -4);
    const fontface = new FontFace(family, `url(${url})`, {
      style: "normal",
      display: 'block',
    });
    css += `.${family} { color: #333; font-weight: normal; font-family: ${family}, Inter, "Noto Serif Khmer", sans-serif; font-size: 2.5rem;}\n`
    document.fonts.add(fontface);
  }

  const s = document.createElement('style');
  s.innerHTML = css;
  document.head.appendChild(s);
  limonFontsAreLoaded = true;
}


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
  loadLimonFonts();
  $el.fontDownload.classList.remove('hidden');
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
