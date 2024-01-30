import Clipboard from 'clipboard';


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
  const o = transform($el.textInput.value);
  $el.textOutput.value = o;
  $el.preview.textContent = o;
});

const neutralText = $el.buttonGenerate.textContent;
$el.buttonGenerate.addEventListener('click', () => {
  $el.buttonGenerate.textContent = '✅ បានចម្លងរួចរាល់';
  setTimeout(() => {
    $el.buttonGenerate.textContent = neutralText;
  }, 2000);
})


const re = {
  /**
   * @param {string} replacer 
   * @param {string} replacement 
   * @param {string} text 
   */
  sub(replacer, replacement, text) {
    return text.replaceAll(replacer, replacement);
  }
}


function transform(text) {
  text = re.sub("ញ្ញ", "BaØ", text)
  text = re.sub('ខ្ញុំ', '´', text)
  text = re.sub('ឫ', 'ប£', text)
  text = re.sub('ឬ', 'ប¤', text)
  text = re.sub('ឭ', 'ព£', text)
  text = re.sub('ឮ', 'ព¤', text)
  text = re.sub('ឰ', 'ព្ធ', text)
  text = re.sub('៊ី', 'uI', text)
  text = re.sub('្ក', 'á', text)
  text = re.sub('្ខ', 'ç', text)
  text = re.sub('្គ', 'Á', text)
  text = re.sub('្ឃ', 'Ç', text)
  text = re.sub('្ង', '¶', text)
  text = re.sub('្ច', '©', text)
  text = re.sub('្ឆ', 'ä', text)
  text = re.sub('្ជ', '¢', text)
  text = re.sub('្ឈ', 'Ä', text)
  text = re.sub('្ញ', 'J', text)
  text = re.sub('្ដ', 'þ', text)
  text = re.sub('្ថ', 'ß', text)
  text = re.sub('្ឌ', 'Ð', text)
  text = re.sub('្ធ', '§', text)
  text = re.sub('្ន', 'ñ', text)
  text = re.sub('្ត', 'þ', text)
  text = re.sub('្ឋ', 'æ', text)
  text = re.sub('្ទ', 'Þ', text)
  text = re.sub('្ឍ', 'Æ', text)
  text = re.sub('្ណ', 'Ñ', text)
  text = re.sub('្ប', ',', text)
  text = re.sub('្ផ', 'ö', text)
  text = re.sub('្ព', '<', text)
  text = re.sub('្ភ', 'Ö', text)
  text = re.sub('្ម', 'µ', text)
  text = re.sub('្យ', 'ü', text)
  text = re.sub('្រ', 'R', text)
  text = re.sub('្ល', 'ø', text)
  text = re.sub('្វ', 'V', text)
  text = re.sub('្ស', 'S', text)
  text = re.sub('្ហ', 'ð', text)
  text = re.sub('្អ', '¥', text)

  text = re.sub("ក", "k", text)
  text = re.sub("ខ", "x", text)
  text = re.sub("គ", "K", text)
  text = re.sub("ឃ", "X", text)
  text = re.sub("ង", "g", text)
  text = re.sub("ច", "c", text)
  text = re.sub("ឆ", "q", text)
  text = re.sub("ជ", "C", text)
  text = re.sub("ឈ", "Q", text)
  text = re.sub("ញ", "j", text)
  text = re.sub("ដ", "d", text)
  text = re.sub("ឋ", "z", text)
  text = re.sub("ឌ", "D", text)
  text = re.sub("ឍ", "Z", text)
  text = re.sub("ណ", "N", text)
  text = re.sub("ត", "t", text)
  text = re.sub("ថ", "f", text)
  text = re.sub("ទ", "T", text)
  text = re.sub("ធ", "F", text)
  text = re.sub("ន", "n", text)
  text = re.sub("ប", "b", text)
  text = re.sub("ផ", "p", text)
  text = re.sub("ព", "B", text)
  text = re.sub("ភ", "P", text)
  text = re.sub("ម", "m", text)
  text = re.sub("យ", "y", text)
  text = re.sub("រ", "", text)
  text = re.sub("ល", "l", text)
  text = re.sub("វ", "v", text)
  text = re.sub("ស", "s", text)
  text = re.sub("ហ", "h", text)
  text = re.sub("ឡ", "L", text)
  text = re.sub("អ", "G", text)

  text = re.sub("១", "1", text)
  text = re.sub("២", "2", text)
  text = re.sub("៣", "3", text)
  text = re.sub("៤", "4", text)
  text = re.sub("៥", "5", text)
  text = re.sub("៦", "6", text)
  text = re.sub("៧", "7", text)
  text = re.sub("៨", "8", text)
  text = re.sub("៩", "9", text)
  text = re.sub("០", "0", text)

  text = re.sub('ា', 'a', text)
  text = re.sub('ិ', 'i', text)
  text = re.sub('ី', 'I', text)
  text = re.sub('ឹ', 'w', text)
  text = re.sub('ឺ', 'W', text)
  text = re.sub('ុ', 'u', text)
  text = re.sub('ូ', 'U', text)
  text = re.sub('ួ', 'Y', text)
  text = re.sub('ំ', 'M', text)
  text = re.sub('ះ', 'H', text)
  text = re.sub('េ', 'e', text)
  text = re.sub('ឿ', 'O', text)
  text = re.sub('ៀ', 'o', text)
  text = re.sub('ែ', 'E', text)
  text = re.sub('ៃ', 'é', text)
  text = re.sub('ៅ', 'A', text)

  text = re.sub('ៈ', '³', text)
  text = re.sub('់', ';', text)
  text = re.sub('ៗ', '²', text)
  text = re.sub('៊', '‘', text)
  text = re.sub('៉', ':', text)
  text = re.sub('័', '½', text)
  text = re.sub('៏', '¾', text)
  text = re.sub('៌', '’', text)
  text = re.sub('៎', '+', text)
  text = re.sub('៍', '_', text)
  text = re.sub('ិ៍', '×', text)
  text = re.sub('។', '.', text)
  text = re.sub('\(', '¬', text)
  text = re.sub('\)', '¦', text)
  text = re.sub('\?', '?', text)
  text = re.sub('«', '{', text)
  text = re.sub('»', '}', text)
  text = re.sub('%', '°', text)
  text = re.sub('\.', '>', text)
  text = re.sub(',', '/', text)
  text = re.sub('/', '¼', text)
  text = re.sub('=', '=', text)
  text = re.sub('\+', '÷', text)
  text = re.sub('-', '-', text)
  text = re.sub('!', '¡', text)
  text = re.sub('៛', '¹', text)
  text = re.sub('ឥ', '\\', text)
  text = re.sub('ឦ', '|', text)
  text = re.sub('ឧ', ']', text)
  text = re.sub('ឪ', '«', text)
  text = re.sub('ឯ', 'É', text)
  text = re.sub('ឱ', '»', text)
  text = re.sub('\u17ea', '', text)

  return text;
}