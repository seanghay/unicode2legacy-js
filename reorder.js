'use strict';
const len = s =>
  typeof s === 'string' ? s.length :
    'size' in s ? s.size : s.length;
const unichr = String.fromCharCode;
const ord = c =>
  (typeof c === 'string' && c.length === 1)
    ? c.charCodeAt(0) :
    new Error("input must be a type of string and has 1 length");

const SRAAA = unichr(0x17B6)
const SRAE = unichr(0x17C1)
const SRAOE = unichr(0x17BE)
const SRAOO = unichr(0x17C4)
const SRAYA = unichr(0x17BF)
const SRAIE = unichr(0x17C0)
const SRAAU = unichr(0x17C5)
const SRAII = unichr(0x17B8)
const SRAU = unichr(0x17BB)
const TRIISAP = unichr(0x17CA)
const MUUSIKATOAN = unichr(0x17C9)
const SAMYOKSANNYA = unichr(0x17D0)

const LA = unichr(0x17A1)
const NYO = unichr(0x1789)
const BA = unichr(0x1794)
const YO = unichr(0x1799)
const SA = unichr(0x179F)
const COENG = unichr(0x17D2)
const CORO = unichr(0x17D2) + unichr(0x179A)
const CONYO = unichr(0x17D2) + unichr(0x1789)
const SRAOM = unichr(0x17C6)

const MARK = unichr(0x17EA)
const DOTCIRCLE = '';

const sraEcombining = {
  [SRAOE]: SRAII,
  [SRAYA]: SRAYA,
  [SRAIE]: SRAIE,
  [SRAOO]: SRAAA,
  [SRAAU]: SRAAU
}

const CC_RESERVED = 0
const CC_CONSONANT = 1
const CC_CONSONANT2 = 2
const CC_CONSONANT3 = 3
const CC_ZERO_WIDTH_NJ_MARK = 4
const CC_CONSONANT_SHIFTER = 5
const CC_ROBAT = 6
const CC_COENG = 7
const CC_DEPENDENT_VOWEL = 8
const CC_SIGN_ABOVE = 9
const CC_SIGN_AFTER = 10
const CC_ZERO_WIDTH_J_MARK = 11
const CC_COUNT = 12

const CF_CLASS_MASK = 0x0000FFFF
const CF_CONSONANT = 0x01000000
const CF_SPLIT_VOWEL = 0x02000000
const CF_DOTTED_CIRCLE = 0x04000000
const CF_COENG = 0x08000000
const CF_SHIFTER = 0x10000000
const CF_ABOVE_VOWEL = 0x20000000
const CF_POS_BEFORE = 0x00080000
const CF_POS_BELOW = 0x00040000
const CF_POS_ABOVE = 0x00020000
const CF_POS_AFTER = 0x00010000
const CF_POS_MASK = 0x000f0000

const _xx = CC_RESERVED
const _sa = CC_SIGN_ABOVE | CF_DOTTED_CIRCLE | CF_POS_ABOVE
const _sp = CC_SIGN_AFTER | CF_DOTTED_CIRCLE | CF_POS_AFTER
const _c1 = CC_CONSONANT | CF_CONSONANT
const _c2 = CC_CONSONANT2 | CF_CONSONANT
const _c3 = CC_CONSONANT3 | CF_CONSONANT
const _rb = CC_ROBAT | CF_POS_ABOVE | CF_DOTTED_CIRCLE
const _cs = CC_CONSONANT_SHIFTER | CF_DOTTED_CIRCLE | CF_SHIFTER
const _dl = CC_DEPENDENT_VOWEL | CF_POS_BEFORE | CF_DOTTED_CIRCLE
const _db = CC_DEPENDENT_VOWEL | CF_POS_BELOW | CF_DOTTED_CIRCLE
const _da = CC_DEPENDENT_VOWEL | CF_POS_ABOVE | CF_DOTTED_CIRCLE | CF_ABOVE_VOWEL
const _dr = CC_DEPENDENT_VOWEL | CF_POS_AFTER | CF_DOTTED_CIRCLE
const _co = CC_COENG | CF_COENG | CF_DOTTED_CIRCLE

const _va = _da | CF_SPLIT_VOWEL
const _vr = _dr | CF_SPLIT_VOWEL


const khmerCharClasses = [
  _c1, _c1, _c1, _c3, _c1, _c1, _c1, _c1, _c3, _c1, _c1, _c1, _c1, _c3, _c1, _c1, // 1780 - 178F
  _c1, _c1, _c1, _c1, _c3, _c1, _c1, _c1, _c1, _c3, _c2, _c1, _c1, _c1, _c3, _c3, // 1790 - 179F
  _c1, _c3, _c1, _c1, _c1, _c1, _c1, _c1, _c1, _c1, _c1, _c1, _c1, _c1, _c1, _c1, // 17A0 - 17AF
  _c1, _c1, _c1, _c1, _dr, _dr, _dr, _da, _da, _da, _da, _db, _db, _db, _va, _vr, // 17B0 - 17BF
  _vr, _dl, _dl, _dl, _vr, _vr, _sa, _sp, _sp, _cs, _cs, _sa, _rb, _sa, _sa, _sa, // 17C0 - 17CF
  _sa, _sa, _co, _sa, _xx, _xx, _xx, _xx, _xx, _xx, _xx, _xx, _xx, _sa, _xx, _xx, // 17D0 - 17DF
]

const khmerStateTable = [
  // xx  c1  c2  c3 zwnj cs  rb  co  dv  sa  sp zwj
  [1, 2, 2, 2, 1, 1, 1, 6, 1, 1, 1, 2], //  0 - ground state
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //  1 - exit state(or sign to the right of the
  //      syllable)
  [-1, -1, -1, -1, 3, 4, 5, 6, 16, 17, 1, -1], //  2 - Base consonant
  [-1, -1, -1, -1, -1, 4, -1, -1, 16, -1, -1, -1], //  3 - First ZWNJ before a register shifter
  //      It can only be followed by a shifter or a vowel
  [-1, -1, -1, -1, 15, -1, -1, 6, 16, 17, 1, 14], //  4 - First register shifter
  [-1, -1, -1, -1, -1, -1, -1, -1, 20, -1, 1, -1], //  5 - Robat
  [-1, 7, 8, 9, -1, -1, -1, -1, -1, -1, -1, -1], //  6 - First Coeng
  [-1, -1, -1, -1, 12, 13, -1, 10, 16, 17, 1, 14], //  7 - First consonant of type 1 after coeng
  [-1, -1, -1, -1, 12, 13, -1, -1, 16, 17, 1, 14], //  8 - First consonant of type 2 after coeng
  [-1, -1, -1, -1, 12, 13, -1, 10, 16, 17, 1, 14], //  9 - First consonant or type 3 after ceong
  [-1, 11, 11, 11, -1, -1, -1, -1, -1, -1, -1, -1], // 10 - Second Coeng(no register shifter before)
  [-1, -1, -1, -1, 15, -1, -1, -1, 16, 17, 1, 14], // 11 - Second coeng consonant(or ind.vowel) no
  //      register shifter before
  [-1, -1, -1, -1, -1, 13, -1, -1, 16, -1, -1, -1], // 12 - Second ZWNJ before a register shifter
  [-1, -1, -1, -1, 15, -1, -1, -1, 16, 17, 1, 14], // 13 - Second register shifter
  [-1, -1, -1, -1, -1, -1, -1, -1, 16, -1, -1, -1], // 14 - ZWJ before vowel
  [-1, -1, -1, -1, -1, -1, -1, -1, 16, -1, -1, -1], // 15 - ZWNJ before vowel
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, 17, 1, 18], // 16 - dependent vowel
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 18], // 17 - sign above
  [-1, -1, -1, -1, -1, -1, -1, 19, -1, -1, -1, -1], // 18 - ZWJ after vowel
  [-1, 1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1], // 19 - Third coeng
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1]  // 20 - dependent vowel after a Robat
]

function getCharClass(uniChar) {
  let ch = ord(uniChar[0]);
  if (ch >= 0x1780) {
    ch -= 0x1780
    if (ch < len(khmerCharClasses)) {
      return khmerCharClasses[ch]
    }
  }
  return 0;
}

function reorder(sin) {
  let cursor = 0
  let state = 0
  let charCount = len(sin)
  let result = ''

  while (cursor < charCount) {
    let reserved = ''
    let signAbove = ''
    let signAfter = ''
    let base = ''
    let robat = ''
    let shifter = ''
    let vowelBefore = ''
    let vowelBelow = ''
    let vowelAbove = ''
    let vowelAfter = ''
    let coeng = false
    let cluster = ''
    let coeng1 = ''
    let coeng2 = ''
    let shifterAfterCoeng = false

    while (cursor < charCount) {
      const curChar = sin[cursor]
      const kChar = getCharClass(curChar)
      const charClass = kChar & CF_CLASS_MASK
      state = khmerStateTable[state][charClass]
      if (state < 0) break

      // collect variable for cluster here
      if (kChar === _xx) reserved = curChar
      else if (kChar === _sa)        // Sign placed above the base
        signAbove = curChar
      else if (kChar === _sp)        // Sign placed after the base
        signAfter = curChar
      else if ((kChar === _c1) || (kChar === _c2) || (kChar === _c3))    // Consonant
        if (coeng) {
          if (!coeng1) coeng1 = COENG + curChar
          else coeng2 = COENG + curChar
          coeng = false
        } else base = curChar
      else if (kChar === _rb)            // Khmer sign robat u17CC
        robat = curChar
      else if (kChar === _cs) {            // Consonant-shifter
        if (coeng1) shifterAfterCoeng = true
        shifter = curChar
      } else if (kChar === _dl)            // Dependent vowel placed before the base
        vowelBefore = curChar
      else if (kChar === _db)            // Dependent vowel placed below the base
        vowelBelow = curChar
      else if (kChar === _da)            // Dependent vowel placed above the base
        vowelAbove = curChar
      else if (kChar === _dr)            // Dependent vowel placed behind the base
        vowelAfter = curChar
      else if (kChar === _co)            // Khmer combining mark COENG
        coeng = true
      else if (kChar === _va) {           // Khmer split vowel, see _da
        vowelBefore = SRAE
        vowelAbove = sraEcombining[curChar]
      } else if (kChar === _vr) {           // Khmer split vowel, see _dr
        vowelBefore = SRAE
        vowelAfter = sraEcombining[curChar]
      }
      cursor += 1
      // end of while (a cluster has found)
    }


    // logic of vowel
    // determine if right side vowel should be marked
    if (coeng1 && vowelBelow)
      vowelBelow = MARK + vowelBelow
    else if ((base === LA || base === NYO) && vowelBelow)
      vowelBelow = MARK + vowelBelow
    else if (coeng1 && vowelBefore && vowelAfter)
      vowelAfter = MARK + vowelAfter

    // logic when cluster has coeng
    // should coeng be located on left side
    let coengBefore = ''
    if (coeng1 === CORO) {
      coengBefore = coeng1
      coeng1 = ''
    } else if (coeng2 === CORO) {
      coengBefore = MARK + coeng2
      coeng2 = ''
    }

    if (coeng1 || coeng2) {
      // NYO must change to other form when there is coeng
      if (base === NYO) {
        base = MARK + base
        // coeng NYO must be marked
        if (coeng1 === CONYO) coeng1 = MARK + coeng1
      }
      if (coeng1 && coeng2) coeng2 = MARK + coeng2
    }

    // logic of shifter with base character
    if (base && shifter) {
      // special case apply to BA only
      if ((vowelAbove) && (base === BA) && (shifter === TRIISAP))
        vowelAbove = MARK + vowelAbove
      else if (vowelAbove)
        shifter = MARK + shifter
      else if ((signAbove === SAMYOKSANNYA) && (shifter === MUUSIKATOAN))
        shifter = MARK + shifter
      else if (signAbove && vowelAfter)
        shifter = MARK + shifter
      else if (signAbove)
        signAbove = MARK + signAbove
      // add another mark to shifter
      if ((coeng1) && (vowelAbove || signAbove))
        shifter = MARK + shifter
      if (base === LA || base === NYO)
        shifter = MARK + shifter
    }

    // uncomplete coeng
    if (coeng && !coeng1)
      coeng1 = COENG
    else if (coeng && !coeng2)
      coeng2 = MARK + COENG

    // render DOTCIRCLE for standalone sign or vowel
    if ((!base) && (vowelBefore || coengBefore || robat || shifter || coeng1 || coeng2 || vowelAfter || vowelBelow || vowelAbove || signAbove || signAfter))
      base = DOTCIRCLE

    // place of shifter
    let shifter1 = ''
    let shifter2 = ''

    if (shifterAfterCoeng)
      shifter2 = shifter
    else shifter1 = shifter

    let specialCaseBA = false
    if ((base === BA) && ((vowelAfter === SRAAA) || (vowelAfter === SRAAU) || (vowelAfter === MARK + SRAAA) || (vowelAfter === MARK + SRAAU))) {
      // SRAAA or SRAAU will get a MARK if there is coeng, redefine to last char
      vowelAfter = vowelAfter[vowelAfter.length - 1]
      specialCaseBA = true
      if ((coeng1) && ([BA, YO, SA].includes(coeng1[coeng1.length - 1])))
        specialCaseBA = false
    }

    // cluster formation
    if (specialCaseBA)
      cluster = vowelBefore + coengBefore + base + vowelAfter + robat + shifter1 + coeng1 + coeng2 + shifter2 + vowelBelow + vowelAbove + signAbove + signAfter
    else
      cluster = vowelBefore + coengBefore + base + robat + shifter1 + coeng1 + coeng2 + shifter2 + vowelBelow + vowelAbove + vowelAfter + signAbove + signAfter
    result += cluster + reserved
    state = 0
  }
  return result
}

let LIMON_REPLACERS = [
  [0x30, "០"],
  [0x31, "១"],
  [0x32, "២"],
  [0x33, "៣"],
  [0x34, "៤"],
  [0x35, "៥"],
  [0x36, "៦"],
  [0x37, "៧"],
  [0x38, "៨"],
  [0x39, "៩"],
  //
  [0x2b, "៎"],
  [0x2c, "\u17D2ប"],
  [0x2d, "-"],
  [0x2f, ","],
  [0x3c, "\u17D2ព"],
  [0x41, "ៅ"],
  [0x42, "ព"],
  [0x43, "ជ"],
  [0x44, "ឌ"],
  [0x45, "ែ"],
  [0x46, "ធ"],
  [0x47, "អ"],
  [0x49, "ី"],
  [0x4a, "\u17D2ញ"],
  [0x4b, "គ"],
  [0x4d, "ំ"],
  [0x4e, "ណ"],
  [0x4f, "ឿ"],
  [0x50, "ភ"],
  [0x51, "ឈ"],
  [0x52, "\u17D2រ"],
  [0x54, "ទ"],
  [0x55, "ូ"],
  [0x56, "\u17D2វ"],
  [0x57, "ឺ"],
  [0x58, "ឃ"],
  [0x59, "ួ"],
  [0x5a, "ឍ"],
  [0x5f, "៍"],
  [0x61, "ា"],
  [0x62, "ប"],
  [0x63, "ច"],
  [0x64, "ដ"],
  [0x65, "េ"],
  [0x66, "ថ"],
  [0x67, "ង"],
  [0x68, "ហ"],
  [0x69, "ិ"],
  [0x6a, "ញ"],
  [0x6b, "ក"],
  [0x6c, "ល"],
  [0x6d, "ម"],
  [0x6e, "ន"],
  [0x6f, "ៀ"],
  [0x70, "ផ"],
  [0x71, "ឆ"],
  [0x72, "រ"],
  [0x73, "ស"],
  [0x74, "ត"],
  [0x75, "ុ"],
  [0x76, "វ"],
  [0x77, "ឹ"],
  [0x78, "ខ"],
  [0x79, "យ"],
  [0x7a, "ឋ"],
  [0xa2, "\u17D2ជ"],
  [0xa7, "\u17D2ធ"],
  [0xa9, "\u17D2ច"],
  [0xb5, "\u17D2ម"],
  [0xb6, "\u17D2ង"],
  [0xbe, "៏"],
  [0xc4, "\u17D2ឈ"],
  [0xc6, "\u17D2ឍ"],
  [0xc7, "\u17D2ឃ"],
  [0xc9, "ឯ"],
  [0xd0, "\u17D2ឌ"],
  [0xd1, "\u17D2ណ"],
  [0xd6, "\u17D2ភ"],
  [0xde, "\u17D2ទ"],
  [0xe4, "\u17D2ឆ"],
  [0xe6, "\u17D2ឋ"],
  [0xe7, "\u17D2ខ"],
  [0xe9, "ៃ"],
  [0xf1, "\u17D2ន"],
  [0xf6, "\u17D2ផ"],
  [0xf8, "\u17D2ល"],
  [0xfc, "\u17D2យ"],
  [0xfe, "\u17D2ត"],
  [[0x42, 0xa7], "ឰ"],
  [[0x47, 0x61], "អា"],
  [[0x2e, 0x6c, 0x2e], "៘"],

  //
  [0xae, "\u17EA\u17D2រ"],
  [0xc5, "\u17EAឺ"],
  [0xcd, "\u17EAី"],
  [0xd3, "\u17EAឿ"],
  [0xd8, "\u17EA\u17D2ញ"],
  [0xda, "\u17EAូ"],
  [0xdc, "\u17EAួ"],
  [0xe5, "\u17EAឹ"],
  [0xed, "\u17EAិ"],
  [0xf3, "\u17EAៀ"],
  [0xfa, "\u17EAុ"],
  [0x47, "\u17a3"],
  [[0x42, 0x61], "\u17EAញ"],
  [0x75, "\u17EA៉"],
  [0x75, "\u17EA៊"],
  [0xfa, "\u17EA\u17EA៊"],
  [0xfa, "\u17EA\u17EA៉"],

  // limon parent
  [0x21, "1"],
  [0x23, "3"],
  [0x24, "4"],
  [0x25, "5"],
  [0x26, "7"],
  [0x28, "9"],
  [[0x29, 0x61], "បា"],
  [[0x29, 0x41], "បៅ"],
  [0x2a, "8"],
  [0x2e, "។"],
  [0x3a, "៉"],
  [0x3d, "="],
  [0x3e, "."],
  [0x40, "2"],
  [0x48, "ះ"],
  [0x4c, "ឡ"],
  [0x53, "\u17D2ស"],
  [0x5c, "ឥ"],
  [0x5d, "ឧ"],
  [0x5e, "6"],
  [0x7b, "\u201c"],
  [0x7c, "ឦ"],
  [0x7d, "\u201d"],
  [0x91, "៊"],
  [0x92, "៌"],
  [0xa1, "!"],
  [0xa5, "\u17D2អ"],
  [0xab, "ឪ"],
  [0xb2, "ៗ"],
  [0xb3, "ៈ"],
  [0xb9, "៛"],
  [0xbb, "ឱ"],
  [0xbd, "័"],
  [0xc1, "\u17D2គ"],
  [0xd7, "ិ៍"],
  [0xdf, "\u17D2ថ"],
  [0xe1, "\u17D2ក"],
  [0xf0, "\u17D2ហ"],
  [0xf7, "+"],
  [[0x5d, 0x5f], "ឳ"],
  [[0x5d, 0x75], "ឩ"],
  [[0x42, 0xa3], "ឭ"],
  [[0x62, 0xa3], "ឫ"],
  [[0x42, 0xa4], "ឮ"],
  [[0x62, 0xa4], "ឬ"],
  //
  [0x7b, "«"],
  [0x7b, "‘"],
  [0x7d, "»"],
  [0xb3, "៖"],
  [0xbf, "\u17EAំ"],

  // limon s1
  [0x3b, "់"],
  [0x5b, "ឱ\u17d2យ"],
  [0xa6, ")"],
  [0xac, "("],
  [0xb0, "%"],
  [0xb4, "ខ\u17d2ញុំ"],
  [0xbc, "/"],
  [[0x5d, 0x91], "ឨ"],

  [0x2e, "៕"],
  [0x5b, "ឲ\u17d2យ"],
  [0xb4, "ខ\u17d2ញ\u17EAុំ"],
  [0x5b, "ឲ"],
  [0xfe, "\u17d2ដ"],
];

LIMON_REPLACERS.reverse();
LIMON_REPLACERS = LIMON_REPLACERS.map(([replacement, replacer]) => {
  if (Array.isArray(replacement))
    return [unichr(...replacement), replacer];
  return [unichr(replacement), replacer];
});

export function convert(text) {
  text = reorder(text);
  for (let [replacement, replacer] of LIMON_REPLACERS) {
    if (replacer.startsWith("\u17d2")) {
      text = text.replaceAll(replacer, replacement);
    }
  }
  for (let [replacement, replacer] of LIMON_REPLACERS) {
    if (!replacer.startsWith("\u17d2")) {
      text = text.replaceAll(replacer, replacement);
    }
  }
  
  return text.replace(/\u17ea/g, '');
}
