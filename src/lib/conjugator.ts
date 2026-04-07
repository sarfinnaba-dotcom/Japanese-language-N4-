import { Verb, VerbGroup } from '../data/verbs';

export interface ConjugatedForm {
  formName: string;
  japanese: string;
  romaji: string;
  meaningBn: string;
}

export function conjugate(verb: Verb): ConjugatedForm[] {
  const forms: ConjugatedForm[] = [];
  const base = verb.hiragana;
  const lastChar = base.slice(-1);
  const stem = base.slice(0, -1);

  // Helper for Bengali meanings (simplified mapping)
  const getBnMeaning = (form: string, baseMeaning: string) => {
    const cleanMeaning = baseMeaning.split('/')[0].trim();
    switch (form) {
      case 'Masu': return `${cleanMeaning} (ভদ্রভাবে)`;
      case 'Te': return `${cleanMeaning} (গিয়ে/করে/হয়ে)`;
      case 'Nai': return `${cleanMeaning} না`;
      case 'Ta': return `${cleanMeaning} (অতীত কাল)`;
      case 'Potential': return `${cleanMeaning} পারা (সামর্থ্য)`;
      case 'Volitional': return `চলো ${cleanMeaning} (প্রস্তাব)`;
      case 'Conditional': return `যদি ${cleanMeaning} (শর্ত)`;
      case 'Imperative': return `${cleanMeaning}! (আদেশ)`;
      case 'Passive': return `${cleanMeaning} হওয়া (কর্মবাচ্য)`;
      case 'Causative': return `${cleanMeaning} করানো (প্রেরণার্থ)`;
      default: return baseMeaning;
    }
  };

  // Dictionary Form
  forms.push({
    formName: 'Dictionary (Plain)',
    japanese: verb.hiragana,
    romaji: verb.romaji,
    meaningBn: verb.meaningBn,
  });

  if (verb.group === VerbGroup.G2) {
    // Group 2 (Ru-verbs)
    forms.push({ formName: 'Masu (Polite)', japanese: stem + 'ます', romaji: '...', meaningBn: getBnMeaning('Masu', verb.meaningBn) });
    forms.push({ formName: 'Te (Connective)', japanese: stem + 'て', romaji: '...', meaningBn: getBnMeaning('Te', verb.meaningBn) });
    forms.push({ formName: 'Nai (Negative)', japanese: stem + 'ない', romaji: '...', meaningBn: getBnMeaning('Nai', verb.meaningBn) });
    forms.push({ formName: 'Ta (Past)', japanese: stem + 'た', romaji: '...', meaningBn: getBnMeaning('Ta', verb.meaningBn) });
    forms.push({ formName: 'Potential (Can)', japanese: stem + 'られる', romaji: '...', meaningBn: getBnMeaning('Potential', verb.meaningBn) });
    forms.push({ formName: 'Volitional (Let\'s)', japanese: stem + 'よう', romaji: '...', meaningBn: getBnMeaning('Volitional', verb.meaningBn) });
    forms.push({ formName: 'Conditional (If)', japanese: stem + 'れば', romaji: '...', meaningBn: getBnMeaning('Conditional', verb.meaningBn) });
    forms.push({ formName: 'Imperative (Command)', japanese: stem + 'ろ', romaji: '...', meaningBn: getBnMeaning('Imperative', verb.meaningBn) });
    forms.push({ formName: 'Passive (Be done)', japanese: stem + 'られる', romaji: '...', meaningBn: getBnMeaning('Passive', verb.meaningBn) });
    forms.push({ formName: 'Causative (Make do)', japanese: stem + 'させる', romaji: '...', meaningBn: getBnMeaning('Causative', verb.meaningBn) });
  } else if (verb.group === VerbGroup.G1) {
    // Group 1 (U-verbs)
    const uToI: Record<string, string> = { う: 'い', く: 'き', ぐ: 'ぎ', す: 'し', つ: 'ち', ぬ: 'নি', ぶ: 'び', む: 'み', る: 'り' };
    const uToA: Record<string, string> = { う: 'わ', く: 'か', ぐ: '가', す: 'さ', つ: 'た', ぬ: 'な', ぶ: 'ば', む: 'ま', る: 'ら' };
    const uToE: Record<string, string> = { う: 'え', く: 'け', ぐ: 'げ', す: 'せ', つ: 'て', ぬ: 'ね', ぶ: 'べ', む: 'め', る: 'れ' };
    const uToO: Record<string, string> = { う: 'お', く: 'こ', ぐ: 'ご', す: 'そ', つ: 'と', ぬ: 'の', ぶ: 'ぼ', む: 'も', る: 'ろ' };
    
    forms.push({ formName: 'Masu (Polite)', japanese: stem + uToI[lastChar] + 'ます', romaji: '...', meaningBn: getBnMeaning('Masu', verb.meaningBn) });
    
    // Te & Ta (Complex logic already handled partially, keeping it simple for brevity)
    let te = ''; let ta = '';
    if (verb.romaji === 'iku') { te = 'いって'; ta = 'いった'; }
    else if (['う', 'つ', 'る'].includes(lastChar)) { te = stem + 'って'; ta = stem + 'った'; }
    else if (['む', 'ぶ', 'ぬ'].includes(lastChar)) { te = stem + 'んで'; ta = stem + 'んだ'; }
    else if (lastChar === 'く') { te = stem + 'いて'; ta = stem + 'いた'; }
    else if (lastChar === 'ぐ') { te = stem + 'いで'; ta = stem + 'いだ'; }
    else if (lastChar === 'す') { te = stem + 'して'; ta = stem + 'した'; }
    forms.push({ formName: 'Te (Connective)', japanese: te, romaji: '...', meaningBn: getBnMeaning('Te', verb.meaningBn) });
    forms.push({ formName: 'Ta (Past)', japanese: ta, romaji: '...', meaningBn: getBnMeaning('Ta', verb.meaningBn) });

    forms.push({ formName: 'Nai (Negative)', japanese: stem + uToA[lastChar] + 'ない', romaji: '...', meaningBn: getBnMeaning('Nai', verb.meaningBn) });
    forms.push({ formName: 'Potential (Can)', japanese: stem + uToE[lastChar] + 'る', romaji: '...', meaningBn: getBnMeaning('Potential', verb.meaningBn) });
    forms.push({ formName: 'Volitional (Let\'s)', japanese: stem + uToO[lastChar] + 'う', romaji: '...', meaningBn: getBnMeaning('Volitional', verb.meaningBn) });
    forms.push({ formName: 'Conditional (If)', japanese: stem + uToE[lastChar] + 'ば', romaji: '...', meaningBn: getBnMeaning('Conditional', verb.meaningBn) });
    forms.push({ formName: 'Imperative (Command)', japanese: stem + uToE[lastChar], romaji: '...', meaningBn: getBnMeaning('Imperative', verb.meaningBn) });
    forms.push({ formName: 'Passive (Be done)', japanese: stem + uToA[lastChar] + 'れる', romaji: '...', meaningBn: getBnMeaning('Passive', verb.meaningBn) });
    forms.push({ formName: 'Causative (Make do)', japanese: stem + uToA[lastChar] + 'せる', romaji: '...', meaningBn: getBnMeaning('Causative', verb.meaningBn) });
  } else {
    // Group 3 (Irregular)
    if (verb.romaji === 'kuru') {
      forms.push({ formName: 'Masu', japanese: 'きます', romaji: '...', meaningBn: getBnMeaning('Masu', verb.meaningBn) });
      forms.push({ formName: 'Te', japanese: 'きて', romaji: '...', meaningBn: getBnMeaning('Te', verb.meaningBn) });
      forms.push({ formName: 'Nai', japanese: 'こない', romaji: '...', meaningBn: getBnMeaning('Nai', verb.meaningBn) });
      forms.push({ formName: 'Ta', japanese: 'きた', romaji: '...', meaningBn: getBnMeaning('Ta', verb.meaningBn) });
      forms.push({ formName: 'Potential', japanese: 'こられる', romaji: '...', meaningBn: getBnMeaning('Potential', verb.meaningBn) });
      forms.push({ formName: 'Volitional', japanese: 'こよう', romaji: '...', meaningBn: getBnMeaning('Volitional', verb.meaningBn) });
      forms.push({ formName: 'Conditional', japanese: 'くれば', romaji: '...', meaningBn: getBnMeaning('Conditional', verb.meaningBn) });
      forms.push({ formName: 'Imperative', japanese: 'こい', romaji: '...', meaningBn: getBnMeaning('Imperative', verb.meaningBn) });
      forms.push({ formName: 'Passive', japanese: 'こられる', romaji: '...', meaningBn: getBnMeaning('Passive', verb.meaningBn) });
      forms.push({ formName: 'Causative', japanese: 'こさせる', romaji: '...', meaningBn: getBnMeaning('Causative', verb.meaningBn) });
    }
  }

  return forms;
}
