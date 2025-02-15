/* msoeg 中古擬音 V8
 *
 * https://zhuanlan.zhihu.com/p/145409852
 *
 * @author unt
 */

const is = (x) => 音韻地位.屬於(x);

if (!音韻地位) return [
  ['章組:', [2, '齦後音', '齦腭音']],
  ['保留非三等ʶ記號', false],
  ['莊三介音', [2, '捲舌元音', 'ɻ']], // 知乎文章用捲舌元音，韻鑒用 ɻ
  ['覺韻:', [2, '中元音', '低元音']],
  ['庚三清:', [2, '中元音', '低元音']],
  ['捲舌元音記號:', [1, 'r音鉤（帶空隙）◌˞ ', 'r音鉤（無空隙）◌˞', '下加點 ◌̣']], // 知乎文章用下加點，韻鑒用 r 音鉤
  ['通江宕攝韻尾:', [3, 'ŋ/k', 'ŋʷ/kʷ', 'ɴ/q', 'ɴʷ/qʷ']], // 知乎文章用 ŋʷ/kʷ，韻鑒用 ɴ/q
  ['宕攝入聲附加:', [2, '無', '⁽ʷ⁾', 'ʷ']],
];

for (var key in 選項) {
  選項[key.replace(':', '')] = 選項[key]; // 去除冒號，方便下面代碼中引用
}

function get聲母_默認拼寫() {
  // 五十一聲類 + 俟母
  const 普通聲母字典 = {
    幫: 'p', 滂: 'pʰ', 並: 'b', 明: 'm',
    知: 'ʈ', 徹: 'ʈʰ', 澄: 'ɖ', 孃: 'ɳ', 來: 'ɭ',
    見: 'k', 溪: 'kʰ', 羣: 'ɡ', 疑: 'ŋ', 云: 'w',
    影: 'ʔ', 曉: 'x',
    精: 'ts', 清: 'tsʰ', 從: 'dz', 心: 's', 邪: 'z',
    莊: 'tʂ', 初: 'tʂʰ', 崇: 'dʐ', 生: 'ʂ', 俟: 'ʐ',
    章: 'tç', 昌: 'tçʰ', 常: 'dʝ', 書: 'ç', 船: 'ʝ', 日: 'ɲ', 以: 'j',
  };
  const 小舌化聲母字典 = {
    幫: 'pʶ', 滂: 'pʶʰ', 並: 'bʶ', 明: 'mʶ',
    端: 'tʶ', 透: 'tʶʰ', 定: 'dʶ', 泥: 'nʶ', 來: 'lʶ',
    見: 'q', 溪: 'qʰ', 疑: 'ɴ',
    影: 'ʔʶ', 曉: 'χ', 匣: 'ʁ',
    精: 'tsʶ', 清: 'tsʶʰ', 從: 'dzʶ', 心: 'sʶ',
  };
  if (is('庚韻 二等') && 字頭 === '打') return 'tʶ';
  if (is('庚韻 二等') && 字頭 === '冷') return 'lʶ';
  if (is('云母 開口') && !is('侵鹽韻')) return 'ɰ';
  if (is('以母 合口 或 以母 東鍾虞韻')) return 'ɥ';
  if (is('三等 或 來母 二等')) return 普通聲母字典[音韻地位.母] || 小舌化聲母字典[音韻地位.母];
  return 小舌化聲母字典[音韻地位.母] || 普通聲母字典[音韻地位.母];
}

function get聲母() {
  let 聲母 = get聲母_默認拼寫();
  if (選項.章組 === '齦後音') {
    聲母 = 聲母.replace('ç', 'ʃ').replace('ʝ', 'ʒ');
  }
  if (!選項.保留非三等ʶ記號) {
    聲母 = 聲母.replace('ʶ', '');
  }
  return 聲母;
}

function get韻母() {
  const 切韻韻到推導韻 = [
    // 爲了方便推導，本代碼採用略有不同的韻類，這裏稱作推導韻
    ['臻韻 或 莊組 欣韻', '眞'],
    ['文韻', '欣'],
    ['灰韻', '咍'],
    ['魂韻', '痕'],
    ['凡韻', '嚴'],
    ['東韻 三等', '終'],
    ['麻韻 三等', '遮'],
    ['歌韻 三等', '迦'],
    ['庚清韻 三等', 選項.庚三清 === '中元音' ? '淸' : '清'],
    ['庚韻 二等', ['打', '冷'].includes(字頭) ? '打' : '庚'],
    ['江韻 入聲', 選項.覺韻 === '中元音' ? '江' : '覺'],
  ];
  const 推導韻到元音 = [
    //  ŋ u ŋʷi n m
    ['　　幽　脂眞侵', 'i'],
    ['之蒸　　微欣　', 'ɯ'],
    ['　　尤終　　　', 'u'],
    ['　　侯東　　　', 'ᵒu'],

    ['支　　　　　　', 'ie'], // 知乎原文支韻在 -i 列
    ['魚　　　　　　', 'ɯɤ'],
    ['虞　　鍾　　　', 'uo'], // 知乎原文虞韻在 -u 列
    ['模　　　　　　', 'o'], // 知乎原文模韻在 -u 列

    ['　淸宵　祭仙鹽', 'iɛ'], // 用“淸”表示庚三清的中元音變體
    ['　青蕭　齊先添', 'ɛ'],
    ['佳耕　　皆山咸', 'ɜ̣'],
    ['　　　江　　　', 'ɞ̣'],
    ['　　宵　廢元嚴', 'ɯʌ'],
    ['　登　　咍痕　', 'ʌ'],
    ['　　　冬　　覃', 'ɔ'],

    ['遮清　　　　　', 'ia'],
    ['　打　　　　　', 'a'],
    ['麻庚肴　夬刪銜', 'ạ'],
    ['　　　覺　　　', 'ɑ̣'],
    ['迦　　陽　　　', 'ɯɑ'],
    ['歌　豪唐泰寒談', 'ɑ'],
  ];
  const 韻尾列表 = ['', 'ŋ/k', 'u', 選項.通江宕攝韻尾, 'i', 'n/t', 'm/p'];

  let 推導韻 = 音韻地位.韻;
  切韻韻到推導韻.some((pair) => { if (is(pair[0])) return 推導韻 = pair[1]; });

  let 元音;
  let 韻尾;
  推導韻到元音.some((pair) => {
    if (pair[0].includes(推導韻)) {
      元音 = pair[1];
      韻尾 = 韻尾列表[pair[0].indexOf(推導韻)].split('/')[+is('入聲')];
      return true;
    }
  });
  if (推導韻 === '覺' && !韻尾.includes('ʷ')) {
    韻尾 += 'ʷ';
  }
  if (is('宕攝 入聲') && !韻尾.includes('ʷ')) {
    韻尾 += 選項.宕攝入聲附加.replace('無', '');
  }

  // 處理三等介音
  if (元音 === 'ɯ' && !is('幫見影組') || is('蒸韻 幫組 或 蒸韻 合口') || '抑𡊁'.includes(字頭)) {
    // 銳音之蒸韻歸 A 類，唇音性蒸韻下面歸 B 類
    元音 = 'i' + 元音;
  }
  if (元音.includes('i') && is('重紐B類 或 云母 或 幫見影組 庚蒸韻')) {
    // 其中，支宵侵的重紐三等開口歸 C 類
    元音 = 元音.replace('i', is('支宵韻 或 侵韻 見溪羣疑影曉母') ? 'ɯ' : 'ị');
  }
  if (is('莊組 三等')) {
    元音 = 元音[0] + '̣' + 元音.slice(1);
    if (!is('支魚韻')) {
      // 介音變爲等同於二等的 ɨ̣（支魚的第一部分不是介音）
      元音 = 元音[0].replace('ɯ', 'ɨ').replace('i', 'ɨ') + 元音.slice(1);
    }
    if (選項.莊三介音 !== '捲舌元音') {
      // 介音是 ɨ̣ 則改寫爲 ɻ，否則前加 ɻ。支韻的 ị 也改寫爲 ɻ
      元音 = 選項.莊三介音 + 元音.replace('ị', '').replace('ɨ̣', '').replace('̣', '');
    }
  }

  // 處理開合介音
  if (元音[0] === 'ɯ') {
    if (is('合口') || is('幫組') && !is('支宵侵韻')) {
      元音 = 元音.replace('ɯ', 'u');
    }
  } else if (is('合口') && !is('云以母')) {
    元音 = 'ʷ' + 元音;
    元音 = 元音.replace('ʷɻ', 'ɻʷ');
  }

  元音 = 元音.replace('̣', 選項.捲舌元音記號.split('◌')[1]);
  韻尾 = 韻尾.replace(元音.slice(-1), ''); // 刪去重複字母 ii、uu
  return 元音 + 韻尾;
}

function get聲調() {
  return { 上: 'ˀ', 去: 'ʰ' }[音韻地位.聲] || '';
}

return get聲母() + get韻母() + get聲調();
