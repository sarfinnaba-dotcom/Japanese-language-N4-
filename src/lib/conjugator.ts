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

  // Helper for Bengali meanings (refined for better accuracy)
  const getBnMeaning = (form: string, baseMeaning: string) => {
    const cleanMeaning = baseMeaning.split('/')[0].trim();
    switch (form) {
      case 'Masu': return `${cleanMeaning} (সম্মানসূচক/ভদ্রভাবে)`;
      case 'Te': return `${cleanMeaning}ে / করে / হয়ে (সংযোজক)`;
      case 'Nai': return `${cleanMeaning} না (না-বোধক)`;
      case 'Ta': return `${cleanMeaning}েছিল / করেছিল (অতীত কাল)`;
      case 'Potential': return `${cleanMeaning}তে পারা (সামর্থ্য)`;
      case 'Volitional': return `${cleanMeaning}ার প্রস্তাব (চলো করি)`;
      case 'Conditional': return `যদি ${cleanMeaning}ে (শর্তসাপেক্ষ)`;
      case 'Imperative': return `${cleanMeaning}ো / করো (আদেশ)`;
      case 'Passive': return `${cleanMeaning} হওয়া (কর্মবাচ্য)`;
      case 'Causative': return `${cleanMeaning}ানো / করতে বাধ্য করা`;
      default: return baseMeaning;
    }
  };

  // Dictionary Form
  forms.push({
    formName: 'Dictionary (সাধারণ রূপ)',
    japanese: verb.hiragana,
    romaji: verb.romaji,
    meaningBn: verb.meaningBn,
  });

  if (verb.group === VerbGroup.G2) {
    // Group 2 (Ru-verbs)
    forms.push({ formName: 'Masu (ভদ্র রূপ)', japanese: stem + 'ます', romaji: '...', meaningBn: getBnMeaning('Masu', verb.meaningBn) });
    forms.push({ formName: 'Te (সংযোজক রূপ)', japanese: stem + 'て', romaji: '...', meaningBn: getBnMeaning('Te', verb.meaningBn) });
    forms.push({ formName: 'Nai (না-বোধক রূপ)', japanese: stem + 'ない', romaji: '...', meaningBn: getBnMeaning('Nai', verb.meaningBn) });
    forms.push({ formName: 'Ta (অতীত রূপ)', japanese: stem + 'た', romaji: '...', meaningBn: getBnMeaning('Ta', verb.meaningBn) });
    forms.push({ formName: 'Potential (সামর্থ্য রূপ)', japanese: stem + 'られる', romaji: '...', meaningBn: getBnMeaning('Potential', verb.meaningBn) });
    forms.push({ formName: 'Volitional (প্রস্তাব রূপ)', japanese: stem + 'よう', romaji: '...', meaningBn: getBnMeaning('Volitional', verb.meaningBn) });
    forms.push({ formName: 'Conditional (শর্ত রূপ)', japanese: stem + 'れば', romaji: '...', meaningBn: getBnMeaning('Conditional', verb.meaningBn) });
    forms.push({ formName: 'Imperative (আদেশ রূপ)', japanese: stem + 'ろ', romaji: '...', meaningBn: getBnMeaning('Imperative', verb.meaningBn) });
    forms.push({ formName: 'Passive (কর্মবাচ্য)', japanese: stem + 'られる', romaji: '...', meaningBn: getBnMeaning('Passive', verb.meaningBn) });
    forms.push({ formName: 'Causative (প্রেরণার্থ)', japanese: stem + 'させる', romaji: '...', meaningBn: getBnMeaning('Causative', verb.meaningBn) });
  } else if (verb.group === VerbGroup.G1) {
    // Group 1 (U-verbs)
    const uToI: Record<string, string> = { う: 'い', く: 'き', ぐ: 'ぎ', す: 'し', つ: 'ち', ぬ: 'に', ぶ: 'び', む: 'み', る: 'り' };
    const uToA: Record<string, string> = { う: 'わ', く: 'か', ぐ: 'が', す: 'さ', つ: 'た', ぬ: 'な', ぶ: 'ば', む: 'ま', る: 'ら' };
    const uToE: Record<string, string> = { う: 'え', く: 'け', ぐ: 'げ', す: 'せ', つ: 'て', ぬ: 'ね', ぶ: 'べ', む: 'め', る: 'れ' };
    const uToO: Record<string, string> = { う: 'お', く: 'こ', ぐ: 'ご', す: 'そ', つ: 'と', ぬ: 'の', ぶ: 'ぼ', む: 'も', る: 'ろ' };
    
    forms.push({ formName: 'Masu (ভদ্র রূপ)', japanese: stem + uToI[lastChar] + 'ます', romaji: '...', meaningBn: getBnMeaning('Masu', verb.meaningBn) });
    
    // Te & Ta (Complex logic already handled partially, keeping it simple for brevity)
    let te = ''; let ta = '';
    if (verb.romaji === 'iku') { te = 'いって'; ta = 'いった'; }
    else if (['う', 'つ', 'る'].includes(lastChar)) { te = stem + 'って'; ta = stem + 'った'; }
    else if (['む', 'ぶ', 'ぬ'].includes(lastChar)) { te = stem + 'んで'; ta = stem + 'んだ'; }
    else if (lastChar === 'く') { te = stem + 'いて'; ta = stem + 'いた'; }
    else if (lastChar === 'ぐ') { te = stem + 'いで'; ta = stem + 'いだ'; }
    else if (lastChar === 'す') { te = stem + 'して'; ta = stem + 'した'; }
    forms.push({ formName: 'Te (সংযোজক রূপ)', japanese: te, romaji: '...', meaningBn: getBnMeaning('Te', verb.meaningBn) });
    forms.push({ formName: 'Ta (অতীত রূপ)', japanese: ta, romaji: '...', meaningBn: getBnMeaning('Ta', verb.meaningBn) });

    forms.push({ formName: 'Nai (না-বোধক রূপ)', japanese: stem + uToA[lastChar] + 'ない', romaji: '...', meaningBn: getBnMeaning('Nai', verb.meaningBn) });
    forms.push({ formName: 'Potential (সামর্থ্য রূপ)', japanese: stem + uToE[lastChar] + 'る', romaji: '...', meaningBn: getBnMeaning('Potential', verb.meaningBn) });
    forms.push({ formName: 'Volitional (প্রস্তাব রূপ)', japanese: stem + uToO[lastChar] + 'う', romaji: '...', meaningBn: getBnMeaning('Volitional', verb.meaningBn) });
    forms.push({ formName: 'Conditional (শর্ত রূপ)', japanese: stem + uToE[lastChar] + 'ば', romaji: '...', meaningBn: getBnMeaning('Conditional', verb.meaningBn) });
    forms.push({ formName: 'Imperative (আদেশ রূপ)', japanese: stem + uToE[lastChar], romaji: '...', meaningBn: getBnMeaning('Imperative', verb.meaningBn) });
    forms.push({ formName: 'Passive (কর্মবাচ্য)', japanese: stem + uToA[lastChar] + 'れる', romaji: '...', meaningBn: getBnMeaning('Passive', verb.meaningBn) });
    forms.push({ formName: 'Causative (প্রেরণার্থ)', japanese: stem + uToA[lastChar] + 'せる', romaji: '...', meaningBn: getBnMeaning('Causative', verb.meaningBn) });
  } else {
    // Group 3 (Irregular)
    if (verb.romaji === 'kuru') {
      forms.push({ formName: 'Masu (ভদ্র রূপ)', japanese: 'きます', romaji: '...', meaningBn: getBnMeaning('Masu', verb.meaningBn) });
      forms.push({ formName: 'Te (সংযোজক রূপ)', japanese: 'きて', romaji: '...', meaningBn: getBnMeaning('Te', verb.meaningBn) });
      forms.push({ formName: 'Nai (না-বোধক রূপ)', japanese: 'こない', romaji: '...', meaningBn: getBnMeaning('Nai', verb.meaningBn) });
      forms.push({ formName: 'Ta (অতীত রূপ)', japanese: 'きた', romaji: '...', meaningBn: getBnMeaning('Ta', verb.meaningBn) });
      forms.push({ formName: 'Potential (সামর্থ্য রূপ)', japanese: 'こられる', romaji: '...', meaningBn: getBnMeaning('Potential', verb.meaningBn) });
      forms.push({ formName: 'Volitional (প্রস্তাব রূপ)', japanese: 'こよう', romaji: '...', meaningBn: getBnMeaning('Volitional', verb.meaningBn) });
      forms.push({ formName: 'Conditional (শর্ত রূপ)', japanese: 'くれば', romaji: '...', meaningBn: getBnMeaning('Conditional', verb.meaningBn) });
      forms.push({ formName: 'Imperative (আদেশ রূপ)', japanese: 'こい', romaji: '...', meaningBn: getBnMeaning('Imperative', verb.meaningBn) });
      forms.push({ formName: 'Passive (কর্মবাচ্য)', japanese: 'こられる', romaji: '...', meaningBn: getBnMeaning('Passive', verb.meaningBn) });
      forms.push({ formName: 'Causative (প্রেরণার্থ)', japanese: 'こさせる', romaji: '...', meaningBn: getBnMeaning('Causative', verb.meaningBn) });
    }
  }

  return forms;
}
