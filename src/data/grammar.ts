export interface GrammarExample {
  japanese: string;
  romaji: string;
  meaningBn: string;
}

export interface GrammarPoint {
  id: string;
  title: string;
  structure: string;
  explanationBn: string;
  examples: GrammarExample[];
  lesson: number;
}

export const grammarPoints: GrammarPoint[] = [
  // --- LESSON 1-25 (N5 Level) ---
  {
    id: 'g1',
    title: 'N1 wa N2 desu (পরিচয়)',
    structure: 'N1 は N2 です',
    explanationBn: 'N1 হলো N2। নিজের বা অন্যের পরিচয় দিতে ব্যবহৃত হয়।',
    lesson: 1,
    examples: [
      { japanese: '私は学生です।', romaji: 'Watashi wa gakusei desu.', meaningBn: 'আমি একজন ছাত্র।' }
    ]
  },
  {
    id: 'g1-2',
    title: 'Particle mo (ও)',
    structure: 'N1 も N2 です',
    explanationBn: 'আগের বাক্যের মতো একই তথ্য দিতে ব্যবহৃত হয়।',
    lesson: 1,
    examples: [
      { japanese: 'ミラーさんも学生です।', romaji: 'Miraa-san mo gakusei desu.', meaningBn: 'মিলার সাহেবও একজন ছাত্র।' }
    ]
  },
  {
    id: 'g1-3',
    title: 'Particle no (এর)',
    structure: 'N1 の N2',
    explanationBn: 'মালিকানা বা সম্পর্ক বোঝাতে ব্যবহৃত হয়।',
    lesson: 1,
    examples: [
      { japanese: 'これは私の本です।', romaji: 'Kore wa watashi no hon desu.', meaningBn: 'এটি আমার বই।' }
    ]
  },
  {
    id: 'g2',
    title: 'kore/sore/are (এই/ওই)',
    structure: 'これ / それ / あれ',
    explanationBn: 'কাছের, দূরের এবং অনেক দূরের বস্তু নির্দেশ করতে ব্যবহৃত হয়।',
    lesson: 2,
    examples: [
      { japanese: 'これは本です।', romaji: 'Kore wa hon desu.', meaningBn: 'এটি একটি বই।' }
    ]
  },
  {
    id: 'g2-2',
    title: 'kono / sono / ano (এই/ওই + Noun)',
    structure: 'この / その / あの + Noun',
    explanationBn: 'নির্দিষ্ট কোনো নাউনকে নির্দেশ করতে ব্যবহৃত হয়।',
    lesson: 2,
    examples: [
      { japanese: 'この本は私のです।', romaji: 'Kono hon wa watashi no desu.', meaningBn: 'এই বইটি আমার।' }
    ]
  },
  {
    id: 'g3',
    title: 'koko / soko / asoko (স্থান নির্দেশ)',
    structure: 'ここ / そこ / あそこ',
    explanationBn: 'স্থান নির্দেশ করতে ব্যবহৃত হয় (এখানে, ওখানে, সেখানে)।',
    lesson: 3,
    examples: [
      { japanese: 'ここは食堂です।', romaji: 'Koko wa shokudou desu.', meaningBn: 'এটি ডাইনিং হল।' }
    ]
  },
  {
    id: 'g4',
    title: 'V-masu / masen / mashita (ভার্বের কাল)',
    structure: 'ます / ません / ました',
    explanationBn: 'বর্তমান, ভবিষ্যৎ এবং অতীত কাল প্রকাশ করতে ভার্বের শেষে বসে।',
    lesson: 4,
    examples: [
      { japanese: '毎日勉強します।', romaji: 'Mainichi benkyou shimasu.', meaningBn: 'প্রতিদিন পড়াশোনা করি।' }
    ]
  },
  {
    id: 'g4-2',
    title: 'kara / made (থেকে / পর্যন্ত)',
    structure: 'N1 から N2 まで',
    explanationBn: 'সময় বা স্থানের শুরু এবং শেষ বোঝাতে।',
    lesson: 4,
    examples: [
      { japanese: '9時から5時まで働きます।', romaji: 'Kuji kara goji made hatarakimasu.', meaningBn: '৯টা থেকে ৫টা পর্যন্ত কাজ করি।' }
    ]
  },
  {
    id: 'g5',
    title: 'Particle e (দিকে)',
    structure: 'Place + へ + 行きます / 来ます / 帰ります',
    explanationBn: 'গন্তব্য বা দিক নির্দেশ করতে ব্যবহৃত হয়।',
    lesson: 5,
    examples: [
      { japanese: '日本へ行きます।', romaji: 'Nihon e ikimasu.', meaningBn: 'জাপানে যাবো।' }
    ]
  },
  {
    id: 'g6',
    title: 'Particle o (অবজেক্ট)',
    structure: 'Noun + を + Verb',
    explanationBn: 'সরাসরি অবজেক্ট নির্দেশ করতে ব্যবহৃত হয়।',
    lesson: 6,
    examples: [
      { japanese: 'ご飯を食べます।', romaji: 'Gohan o tabemasu.', meaningBn: 'ভাত খাই।' }
    ]
  },
  {
    id: 'g7',
    title: 'N (tool) de V (মাধ্যম)',
    structure: 'Noun (Tool/Means) + で + Verb',
    explanationBn: 'কোনো যন্ত্র বা মাধ্যম ব্যবহার করে কাজ করা বোঝাতে।',
    lesson: 7,
    examples: [
      { japanese: 'はしで食べます।', romaji: 'Hashi de tabemasu.', meaningBn: 'চপস্টিক দিয়ে খাই।' }
    ]
  },
  {
    id: 'g8',
    title: 'Adjectives (বিশেষণ)',
    structure: 'i-Adjective / na-Adjective',
    explanationBn: 'জাপানিজ ভাষায় দুই ধরনের বিশেষণ আছে। i-adj সরাসরি নাউনের আগে বসে, na-adj এর পরে na বসে।',
    lesson: 8,
    examples: [
      { japanese: '富士山は高いです।', romaji: 'Fujisan wa takai desu.', meaningBn: 'ফুজি পর্বত উঁচু।' },
      { japanese: '奈良は静かな町です।', romaji: 'Nara wa shizuka na machi desu.', meaningBn: 'নারা একটি শান্ত শহর।' }
    ]
  },
  {
    id: 'g9',
    title: 'suki / kirai / jouzu / heta',
    structure: 'Noun + が + 好き / 嫌い / 上手 / 下手',
    explanationBn: 'পছন্দ, অপছন্দ, দক্ষ বা অদক্ষ বোঝাতে ga পার্টিকেল ব্যবহৃত হয়।',
    lesson: 9,
    examples: [
      { japanese: '私は料理が好きです।', romaji: 'Watashi wa ryouri ga suki desu.', meaningBn: 'আমি রান্না পছন্দ করি।' }
    ]
  },
  {
    id: 'g10',
    title: 'N ga arimasu / imasu (থাকা)',
    structure: 'Noun + が + あります / います',
    explanationBn: 'বস্তু (arimasu) বা প্রাণী (imasu) আছে বোঝাতে।',
    lesson: 10,
    examples: [
      { japanese: '机の上に本があります।', romaji: 'Tsukue no ue ni hon ga arimasu.', meaningBn: 'টেবিলের ওপর বই আছে।' }
    ]
  },
  {
    id: 'g11',
    title: 'Counters (গণনা)',
    structure: 'Noun + Particle + Number + Verb',
    explanationBn: 'জাপানিজ ভাষায় বস্তু গণনার জন্য বিশেষ শব্দ ব্যবহৃত হয়।',
    lesson: 11,
    examples: [
      { japanese: 'りんごを4つ買いました।', romaji: 'Ringo o yotsu kaimashita.', meaningBn: '৪টি আপেল কিনেছি।' }
    ]
  },
  {
    id: 'g12',
    title: 'Comparison (তুলনা)',
    structure: 'N1 は N2 より Adj です',
    explanationBn: 'দুটি বস্তুর মধ্যে তুলনা করতে ব্যবহৃত হয়।',
    lesson: 12,
    examples: [
      { japanese: 'この車はあの車より速いです।', romaji: 'Kono kuruma wa ano kuruma yori hayai desu.', meaningBn: 'এই গাড়িটি ওই গাড়িটির চেয়ে দ্রুত।' }
    ]
  },
  {
    id: 'g13-1',
    title: 'hoshii (চাওয়া)',
    structure: 'Noun + が + 欲しいです',
    explanationBn: 'কোনো বস্তু পাওয়ার ইচ্ছা প্রকাশ করতে।',
    lesson: 13,
    examples: [
      { japanese: '車が欲しいです।', romaji: 'Kuruma ga hoshii desu.', meaningBn: 'আমি একটি গাড়ি চাই।' }
    ]
  },
  {
    id: 'g13-2',
    title: 'V-tai (করতে চাওয়া)',
    structure: 'Verb (Masu-stem) + たいです',
    explanationBn: 'কোনো কাজ করার ইচ্ছা প্রকাশ করতে।',
    lesson: 13,
    examples: [
      { japanese: '日本へ行きたいです।', romaji: 'Nihon e ikitai desu.', meaningBn: 'আমি জাপানে যেতে চাই।' }
    ]
  },
  {
    id: 'g14-1',
    title: 'V-te kudasai (অনুরোধ)',
    structure: 'Verb (Te-form) + ください',
    explanationBn: 'কাউকে কোনো কাজ করতে অনুরোধ করতে ব্যবহৃত হয়।',
    lesson: 14,
    examples: [
      { japanese: 'ちょっと待ってください।', romaji: 'Chotto matte kudasai.', meaningBn: 'একটু অপেক্ষা করুন।' }
    ]
  },
  {
    id: 'g14-2',
    title: 'V-te imasu (চলমান কাজ)',
    structure: 'Verb (Te-form) + いています',
    explanationBn: 'বর্তমানে কোনো কাজ চলছে (Action in progress) বোঝাতে।',
    lesson: 14,
    examples: [
      { japanese: '今雨が降っています।', romaji: 'Ima ame ga futte imasu.', meaningBn: 'এখন বৃষ্টি পড়ছে।' }
    ]
  },
  {
    id: 'g16-1',
    title: 'V1-te, V2-te, V3 (কাজের ধারাবাহিকতা)',
    structure: 'Verb1 (Te) + Verb2 (Te) + Verb3',
    explanationBn: 'একাধিক কাজ পর্যায়ক্রমে করা বোঝালে এটি ব্যবহৃত হয়।',
    lesson: 16,
    examples: [
      { japanese: '朝起きて、顔を洗って、朝ご飯を食べます।', romaji: 'Asa okite, kao o aratte, asagohan o tabemasu.', meaningBn: 'সকালে উঠে, মুখ ধুয়ে, সকালের নাস্তা করি।' }
    ]
  },
  {
    id: 'g16-2',
    title: 'Adj-te / N-de (বিশেষণ ও নাউনের সংযোগ)',
    structure: 'i-Adj (~kute) / na-Adj (~de) / Noun (~de)',
    explanationBn: 'একাধিক বিশেষণ বা নাউনকে যুক্ত করতে ব্যবহৃত হয়।',
    lesson: 16,
    examples: [
      { japanese: 'この部屋は広くて、明るいです।', romaji: 'Kono heya wa hirokute, akarui desu.', meaningBn: 'এই রুমটি প্রশস্ত এবং উজ্জ্বল।' }
    ]
  },
  {
    id: 'g17-1',
    title: 'V-nai kudasai (অনুরোধ - না করা)',
    structure: 'Verb (Nai-form) + ください',
    explanationBn: 'কাউকে কোনো কাজ না করতে অনুরোধ করতে।',
    lesson: 17,
    examples: [
      { japanese: 'ここで写真を撮らないでください।', romaji: 'Koko de shashin o toranaide kudasai.', meaningBn: 'এখানে ছবি তুলবেন না দয়া করে।' }
    ]
  },
  {
    id: 'g17-2',
    title: 'V-nakereba narimasen (অবশ্যই করতে হবে)',
    structure: 'Verb (Nai-form - i) + ければなりません',
    explanationBn: 'কোনো কাজ করা বাধ্যতামূলক বা অবশ্যই করতে হবে বোঝাতে।',
    lesson: 17,
    examples: [
      { japanese: '薬を飲まなければなりません।', romaji: 'Kusuri o nomanakereba narimasen.', meaningBn: 'ওষুধ অবশ্যই খেতে হবে।' }
    ]
  },
  {
    id: 'g17-3',
    title: 'V-nakute mo ii desu (না করলেও চলবে)',
    structure: 'Verb (Nai-form - i) + くていいです',
    explanationBn: 'কোনো কাজ করা বাধ্যতামূলক নয় বোঝাতে।',
    lesson: 17,
    examples: [
      { japanese: '明日来なくてもいいです।', romaji: 'Ashita konakute mo ii desu.', meaningBn: 'আগামীকাল না আসলেও চলবে।' }
    ]
  },
  {
    id: 'g18-1',
    title: 'V-jisho form koto ga dekimasu (পারা)',
    structure: 'Verb (Dictionary form) + ことが できます',
    explanationBn: 'সামর্থ্য বা সম্ভাবনা বোঝাতে (Potential)।',
    lesson: 18,
    examples: [
      { japanese: 'ピアノを弾くことができます।', romaji: 'Piano o hiku koto ga dekimasu.', meaningBn: 'আমি পিয়ানো বাজাতে পারি।' }
    ]
  },
  {
    id: 'g18-2',
    title: 'mae ni (আগে)',
    structure: 'Verb (Dict. form) / Noun + の + 前に',
    explanationBn: 'কোনো কাজের আগে অন্য কাজ করা।',
    lesson: 18,
    examples: [
      { japanese: '寝る前に、本を読みます।', romaji: 'Neru mae ni, hon o yomimasu.', meaningBn: 'ঘুমানোর আগে বই পড়ি।' }
    ]
  },
  {
    id: 'g19-1',
    title: 'V-ta koto ga arimasu (অভিজ্ঞতা)',
    structure: 'Verb (Ta-form) + ことが あります',
    explanationBn: 'অতীতে কোনো কাজ করার অভিজ্ঞতা আছে বোঝাতে।',
    lesson: 19,
    examples: [
      { japanese: '日本へ行ったことがあります।', romaji: 'Nihon e itta koto ga arimasu.', meaningBn: 'আমার জাপানে যাওয়ার অভিজ্ঞতা আছে।' }
    ]
  },
  {
    id: 'g19-2',
    title: 'V-tari, V-tari shimasu (তালিকাভুক্ত কাজ)',
    structure: 'V1-ta + ri, V2-ta + ri します',
    explanationBn: 'অগোছালোভাবে একাধিক কাজের উদাহরণ দিতে।',
    lesson: 19,
    examples: [
      { japanese: '日曜日はテニスをしたり、買い物をしたりします।', romaji: 'Nichiyoubi wa tenisu o shitari, kaimono o shitari shimasu.', meaningBn: 'রবিবার টেনিস খেলি, কেনাকাটা করি ইত্যাদি।' }
    ]
  },
  {
    id: 'g20',
    title: 'Plain Form (অনানুষ্ঠানিক ভাষা)',
    structure: 'Plain Form (Dictionary, Nai, Ta, Nakatta)',
    explanationBn: 'বন্ধু বা পরিবারের সাথে কথা বলতে অনানুষ্ঠানিক বা প্লেইন ফর্ম ব্যবহৃত হয়।',
    lesson: 20,
    examples: [
      { japanese: 'ご飯食べる？', romaji: 'Gohan taberu?', meaningBn: 'ভাত খাবে? (Informal)' }
    ]
  },
  {
    id: 'g21-1',
    title: '~to omoimasu (মনে করি)',
    structure: 'Plain Form + と思います',
    explanationBn: 'নিজের মতামত বা অনুমান প্রকাশ করতে।',
    lesson: 21,
    examples: [
      { japanese: '明日は雨が降ると思います।', romaji: 'Ashita wa ame ga furu to omoimasu.', meaningBn: 'আমি মনে করি আগামীকাল বৃষ্টি হবে।' }
    ]
  },
  {
    id: 'g21-2',
    title: '~to iimasu (বলেছে)',
    structure: 'Plain Form + と言いました',
    explanationBn: 'কেউ কিছু বলেছে তা উদ্ধৃত করতে।',
    lesson: 21,
    examples: [
      { japanese: '彼は明日休みだと言いました।', romaji: 'Kare wa ashita yasumi da to iimashita.', meaningBn: 'সে বলেছে যে আগামীকাল তার ছুটি।' }
    ]
  },
  {
    id: 'g22',
    title: 'Noun Modification (নাউন মডিফিকেশন)',
    structure: 'Plain Form + Noun',
    explanationBn: 'একটি পুরো বাক্য দিয়ে কোনো নাউনকে বর্ণনা করা।',
    lesson: 22,
    examples: [
      { japanese: 'これは私が買った本です।', romaji: 'Kore wa watashi ga katta hon desu.', meaningBn: 'এটি সেই বই যা আমি কিনেছি।' }
    ]
  },
  {
    id: 'g23-3',
    title: '~to (যদি/যখন - প্রাকৃতিক নিয়ম)',
    structure: 'Verb (Dict. form) + と',
    explanationBn: 'একটি কাজ করলে অন্যটি অনিবার্যভাবে ঘটে (যেমন রাস্তার মোড় ঘুরা বা মেশিনের বোতাম চাপা)।',
    lesson: 23,
    examples: [
      { japanese: 'このボタンを押すと、お釣りが出ます।', romaji: 'Kono botan o osu to, otsuri ga demasu.', meaningBn: 'এই বোতামটি চাপলে ভাংতি টাকা বের হবে।' }
    ]
  },
  {
    id: 'g24',
    title: 'Giving and Receiving (দেওয়া ও নেওয়া)',
    structure: 'V-te + あげます / もらいます / くれます',
    explanationBn: 'উপকার হিসেবে কোনো কাজ করে দেওয়া বা নেওয়া।',
    lesson: 24,
    examples: [
      { japanese: '私は母にセーターを編んであげました।', romaji: 'Watashi wa haha ni seetaa o ande agemashita.', meaningBn: 'আমি মাকে একটি সোয়েটার বুনে দিয়েছি।' }
    ]
  },
  {
    id: 'g25-1',
    title: '~tara (যদি)',
    structure: 'Verb (Ta-form) + ら',
    explanationBn: 'যদি কোনো শর্ত পূরণ হয় তবে কী ঘটবে।',
    lesson: 25,
    examples: [
      { japanese: '雨が降ったら、行きません।', romaji: 'Ame ga futtara, ikimasen.', meaningBn: 'যদি বৃষ্টি পড়ে, তবে যাবো না।' }
    ]
  },
  {
    id: 'g25-2',
    title: '~te mo (যদিও)',
    structure: 'Verb (Te-form) + も',
    explanationBn: 'যদিও কোনো কাজ করা হয়, তবুও ফলাফল একই থাকবে।',
    lesson: 25,
    examples: [
      { japanese: '雨が降っても、行きます।', romaji: 'Ame ga futte mo, ikimasu.', meaningBn: 'যদিও বৃষ্টি পড়ে, তবুও আমি যাবো।' }
    ]
  },
  {
    id: 'g23-1',
    title: 'Toki (যখন)',
    structure: 'Plain Form / Noun + の + とき',
    explanationBn: 'যখন কোনো কাজ ঘটে বা কোনো অবস্থা থাকে।',
    lesson: 23,
    examples: [
      { japanese: '暇なとき、本を読みます।', romaji: 'Hima na toki, hon o yomimasu.', meaningBn: 'অবসর সময়ে বই পড়ি।' }
    ]
  },
  {
    id: 'g23-2',
    title: 'Toki + Particle (যখন এর সাথে পার্টিকেল)',
    structure: 'とき + に / は / も',
    explanationBn: 'Toki এর সাথে ni (নির্দিষ্ট সময়), wa (তুলনা) বা mo (ও) যোগ করা যায়।',
    lesson: 23,
    examples: [
      { japanese: '子供のときに、日本にいました।', romaji: 'Kodomo no toki ni, nihon ni imashita.', meaningBn: 'ছোটবেলায় আমি জাপানে ছিলাম।' }
    ]
  },

  // --- LESSON 26-50 (N4 Level) ---
  {
    id: 'g26-1',
    title: '～んです (ব্যাখ্যা)',
    structure: 'Plain Form + んです',
    explanationBn: 'কোনো কিছুর কারণ ব্যাখ্যা করতে বা জোর দিয়ে কিছু বলতে।',
    lesson: 26,
    examples: [
      { japanese: '頭が痛いんです।', romaji: 'Atama ga itai n desu.', meaningBn: 'আসলে মাথা ব্যথা করছে।' }
    ]
  },
  {
    id: 'g26-2',
    title: 'te itadakemasen ka (অনুরোধ)',
    structure: 'Verb (Te-form) + いただけませんか',
    explanationBn: 'খুবই বিনীতভাবে কাউকে কোনো অনুরোধ করতে।',
    lesson: 26,
    examples: [
      { japanese: '書き方を教えていただけませんか।', romaji: 'Kakikata o oshiete itadakemasen ka.', meaningBn: 'কিভাবে লিখতে হয় তা কি আমাকে একটু শিখিয়ে দেবেন?' }
    ]
  },
  {
    id: 'g27-1',
    title: 'Potential Form (পারা)',
    structure: 'Group 1: u -> e + masu | Group 2: ru -> rareru',
    explanationBn: 'কোনো কাজ করতে পারা বা সামর্থ্য বোঝাতে।',
    lesson: 27,
    examples: [
      { japanese: '日本語が話せます।', romaji: 'Nihongo ga hanasemasu.', meaningBn: 'জাপানিজ বলতে পারি।' }
    ]
  },
  {
    id: 'g27-2',
    title: 'Dekimasu (তৈরি হওয়া)',
    structure: 'Noun + が + できました',
    explanationBn: 'কোনো কিছু তৈরি হওয়া বা সম্পন্ন হওয়া।',
    lesson: 27,
    examples: [
      { japanese: '晩ご飯ができました।', romaji: 'Bangohan ga dekimashita.', meaningBn: 'রাতের খাবার তৈরি হয়ে গেছে।' }
    ]
  },
  {
    id: 'g27-3',
    title: 'Shika (ছাড়া আর নেই)',
    structure: 'Noun + しか + Verb (Negative)',
    explanationBn: 'শুধুমাত্র বা কোনো কিছু ছাড়া আর নেই বোঝাতে।',
    lesson: 27,
    examples: [
      { japanese: '500円しかありません।', romaji: 'Gohyaku-en shika arimasen.', meaningBn: '৫০০ ইয়েন ছাড়া আর নেই (মাত্র ৫০০ ইয়েন আছে)।' }
    ]
  },
  {
    id: 'g27-4',
    title: 'Double Particle (wa এর ব্যবহার)',
    structure: 'Particle (ni, de, kara) + は',
    explanationBn: 'অন্য পার্টিকেলের সাথে wa যোগ করে গুরুত্ব দেওয়া।',
    lesson: 27,
    examples: [
      { japanese: '私の学校にはアメリカ人の先生がいます।', romaji: 'Watashi no gakkou ni wa amerikajin no sensei ga imasu.', meaningBn: 'আমার স্কুলে আমেরিকান শিক্ষক আছেন।' }
    ]
  },
  {
    id: 'g28-1',
    title: 'V1 nagara V2 (একই সাথে দুটি কাজ)',
    structure: 'Verb1 (Masu-stem) + ながら + Verb2',
    explanationBn: 'একই সাথে দুটি কাজ করা বোঝালে এটি ব্যবহৃত হয়।',
    lesson: 28,
    examples: [
      { japanese: '音楽を聞きながら、勉強します।', romaji: 'Ongaku o kikinagara, benkyou shimasu.', meaningBn: 'গান শুনতে শুনতে পড়াশোনা করি।' }
    ]
  },
  {
    id: 'g28-2',
    title: 'V-te imasu (অভ্যাস)',
    structure: 'Verb (Te-form) + いています',
    explanationBn: 'কোনো কাজ নিয়মিত বা অভ্যাসগতভাবে করা।',
    lesson: 28,
    examples: [
      { japanese: '毎朝ジョギングをしています।', romaji: 'Maiasa jogingu o shite imasu.', meaningBn: 'প্রতিদিন সকালে জগিং করি।' }
    ]
  },
  {
    id: 'g28-3',
    title: 'Plain Form shi (কারণ বর্ণনা)',
    structure: 'Plain Form + し',
    explanationBn: 'একাধিক কারণ বা গুণাবলী বর্ণনা করতে।',
    lesson: 28,
    examples: [
      { japanese: '安いし、おいしいし、この店はいいです।', romaji: 'Yasui shi, oishii shi, kono mise wa ii desu.', meaningBn: 'সস্তা এবং সুস্বাদু, তাই এই দোকানটি ভালো।' }
    ]
  },
  {
    id: 'g28-4',
    title: 'Sorede (তাই / সেই কারণে)',
    structure: 'S1. それで、S2.',
    explanationBn: 'আগের বাক্যের কারণ হিসেবে পরের বাক্যটি শুরু করতে।',
    lesson: 28,
    examples: [
      { japanese: '雨が降っています।それで、行きません।', romaji: 'Ame ga futte imasu. Sorede, ikimasen.', meaningBn: 'বৃষ্টি পড়ছে। তাই, যাবো না।' }
    ]
  },
  {
    id: 'g29-1',
    title: 'V-te imasu (অবস্থা)',
    structure: 'Intransitive Verb (Te-form) + いています',
    explanationBn: 'কোনো কাজ ঘটার পর তার বর্তমান অবস্থা।',
    lesson: 29,
    examples: [
      { japanese: '窓が閉まっています।', romaji: 'Mado ga shimatte imasu.', meaningBn: 'জানালা বন্ধ আছে।' }
    ]
  },
  {
    id: 'g29-2',
    title: 'te shimaimashita (পুরোপুরি শেষ হওয়া / অনুশোচনা)',
    structure: 'Verb (Te-form) + しまいました',
    explanationBn: 'কোনো কাজ পুরোপুরি শেষ হওয়া অথবা অনিচ্ছাকৃত ভুলের জন্য অনুশোচনা প্রকাশ করতে।',
    lesson: 29,
    examples: [
      { japanese: '宿題を忘れてしまいました।', romaji: 'Shukudai o wasurete shimaimashita.', meaningBn: 'আমি হোমওয়ার্ক ভুলে গেছি (দুর্ভাগ্যবশত)।' }
    ]
  },
  {
    id: 'g30-1',
    title: 'V-te arimasu (উদ্দেশ্যমূলক অবস্থা)',
    structure: 'Transitive Verb (Te-form) + あります',
    explanationBn: 'কেউ কোনো উদ্দেশ্যে কাজ করে রেখেছে এবং তার ফলাফল বিদ্যমান।',
    lesson: 30,
    examples: [
      { japanese: 'カレンダーに予定が書いてあります।', romaji: 'Karendaa ni yotei ga kaite arimasu.', meaningBn: 'ক্যালেন্ডারে শিডিউল লেখা আছে।' }
    ]
  },
  {
    id: 'g30-2',
    title: 'te okimasu (আগে থেকে করে রাখা)',
    structure: 'Verb (Te-form) + おきます',
    explanationBn: 'ভবিষ্যতের কথা ভেবে কোনো কাজ আগে থেকেই করে রাখা।',
    lesson: 30,
    examples: [
      { japanese: '旅行の前に切符を買っておきます।', romaji: 'Ryokou no mae ni kippu o katte okimasu.', meaningBn: 'ভ্রমণের আগে টিকিট কিনে রাখবো।' }
    ]
  },
  {
    id: 'g31-1',
    title: 'Volitional Form (ইচ্ছাসূচক রূপ)',
    structure: 'Group 1: u -> o-column + u | Group 2: ru -> you',
    explanationBn: 'নিজের ইচ্ছা বা প্রস্তাব প্রকাশ করতে ভার্বের এই রূপ ব্যবহৃত হয়।',
    lesson: 31,
    examples: [
      { japanese: '明日、映画を見よう।', romaji: 'Ashita, eiga o miyou.', meaningBn: 'চলো আগামীকাল সিনেমা দেখি।' }
    ]
  },
  {
    id: 'g31-2',
    title: 'V-to omoimasu (ভাবছি)',
    structure: 'Volitional Form + と思っています',
    explanationBn: 'নিজের কোনো ইচ্ছা বা পরিকল্পনা অনেক আগে থেকেই ভেবে রাখা।',
    lesson: 31,
    examples: [
      { japanese: '日本へ行こうと思っています।', romaji: 'Nihon e ikou to omotte imasu.', meaningBn: 'জাপানে যাওয়ার কথা ভাবছি।' }
    ]
  },
  {
    id: 'g31-3',
    title: 'V-yotei desu (পরিকল্পনা)',
    structure: 'Verb (Dict. form) / Noun + の + 予定です',
    explanationBn: 'কোনো নির্দিষ্ট শিডিউল বা পরিকল্পনা বোঝাতে।',
    lesson: 31,
    examples: [
      { japanese: '来月、出張する予定です।', romaji: 'Raigetsu, shucchou suru yotei desu.', meaningBn: 'আগামী মাসে ব্যবসায়িক সফরে যাওয়ার পরিকল্পনা আছে।' }
    ]
  },
  {
    id: 'g32-2',
    title: 'deshou (সম্ভবত)',
    structure: 'Plain Form + でしょう',
    explanationBn: 'কোনো কিছু ঘটার সম্ভাবনা বা অনুমান করতে।',
    lesson: 32,
    examples: [
      { japanese: '明日は雨が降るでしょう।', romaji: 'Ashita wa ame ga furu deshou.', meaningBn: 'আগামীকাল সম্ভবত বৃষ্টি হবে।' }
    ]
  },
  {
    id: 'g32-3',
    title: 'kamoshiremasen (হতেও পারে)',
    structure: 'Plain Form + かもしれません',
    explanationBn: 'খুব কম সম্ভাবনা বা অনিশ্চয়তা বোঝাতে।',
    lesson: 32,
    examples: [
      { japanese: '時間に間に合わないかもしれません।', romaji: 'Jikan ni maniawanai kamoshiremasen.', meaningBn: 'সময়ে পৌঁছাতে না-ও পারি।' }
    ]
  },
  {
    id: 'g33-2',
    title: 'to yomimasu (পড়া হয়)',
    structure: 'Kanji + と読みます',
    explanationBn: 'কোনো কাঞ্জি বা শব্দ কীভাবে পড়তে হয় তা বলতে।',
    lesson: 33,
    examples: [
      { japanese: 'これは「いりぐち」と読みます।', romaji: 'Kore wa "iriguchi" to yomimasu.', meaningBn: 'এটি "ইরিগুচি" হিসেবে পড়া হয়।' }
    ]
  },
  {
    id: 'g33-3',
    title: 'to iu imi desu (এর মানে হলো)',
    structure: 'Phrase + という意味です',
    explanationBn: 'কোনো শব্দ বা চিহ্নের অর্থ ব্যাখ্যা করতে।',
    lesson: 33,
    examples: [
      { japanese: '「立入禁止」は入るなという意味です।', romaji: '"Tachiiri kinshi" wa hairu na to iu imi desu.', meaningBn: '"তাচিইরি কিনশি" মানে হলো প্রবেশ নিষেধ।' }
    ]
  },
  {
    id: 'g34-2',
    title: 'ato de (পরে)',
    structure: 'Verb (Ta form) / Noun + の + あとで',
    explanationBn: 'একটি কাজ করার পর অন্যটি করা।',
    lesson: 34,
    examples: [
      { japanese: '仕事のあとで、飲みに行きます।', romaji: 'Shigoto no ato de, nomi ni ikimasu.', meaningBn: 'কাজের পর পান করতে যাবো।' }
    ]
  },
  {
    id: 'g34-3',
    title: 'nai de (না করে)',
    structure: 'Verb (Nai form) + で',
    explanationBn: 'একটি কাজ না করে অন্যটি করা।',
    lesson: 34,
    examples: [
      { japanese: '傘を持たないで、出かけました।', romaji: 'Kasa o motanaide, dekakemashita.', meaningBn: 'ছাতা না নিয়েই বাইরে গেলাম।' }
    ]
  },
  {
    id: 'g34-4',
    title: 'zu ni (না করে - বিনীত)',
    structure: 'Verb (Nai-stem) + ずに',
    explanationBn: 'Nai de এর পরিবর্তে বিনীতভাবে "না করে" বোঝাতে ব্যবহৃত হয়।',
    lesson: 34,
    examples: [
      { japanese: '砂糖を入れずに飲みます।', romaji: 'Satou o irezu ni nomimasu.', meaningBn: 'চিনি ছাড়াই পান করি।' }
    ]
  },
  {
    id: 'g35-2',
    title: 'nara (যদি এমন হয়)',
    structure: 'Noun + なら',
    explanationBn: 'আগের প্রসঙ্গের ভিত্তিতে কোনো পরামর্শ দিতে।',
    lesson: 35,
    examples: [
      { japanese: 'カメラなら、秋葉原がいいですよ।', romaji: 'Kamera nara, Akihabara ga ii desu yo.', meaningBn: 'ক্যামেরার কথা বললে, আকিহাবারা ভালো হবে।' }
    ]
  },
  {
    id: 'g32-1',
    title: 'hou ga ii desu (উপদেশ)',
    structure: 'Verb (Ta/Nai form) + ほうがいいです',
    explanationBn: 'কাউকে উপদেশ দিতে যে এটি করা ভালো হবে।',
    lesson: 32,
    examples: [
      { japanese: '毎日運動したほうがいいです।', romaji: 'Mainichi undou shita hou ga ii desu.', meaningBn: 'প্রতিদিন ব্যায়াম করা ভালো।' }
    ]
  },
  {
    id: 'g32-2',
    title: 'deshou (সম্ভবত)',
    structure: 'Plain Form + でしょう',
    explanationBn: 'ভবিষ্যতের কোনো সম্ভাবনা বা অনুমান প্রকাশ করতে।',
    lesson: 32,
    examples: [
      { japanese: '明日は雨が降るでしょう।', romaji: 'Ashita wa ame ga furu deshou.', meaningBn: 'আগামীকাল সম্ভবত বৃষ্টি হবে।' }
    ]
  },
  {
    id: 'g32-3',
    title: 'kamoshiremasen (হতেও পারে)',
    structure: 'Plain Form + かもしれません',
    explanationBn: 'কোনো কিছু হওয়ার সম্ভাবনা আছে কিন্তু নিশ্চিত নয় (হতেও পারে)।',
    lesson: 32,
    examples: [
      { japanese: '午後は雨が降るかもしれません।', romaji: 'Gogo wa ame ga furu kamoshiremasen.', meaningBn: 'বিকালে বৃষ্টি হতেও পারে।' }
    ]
  },
  {
    id: 'g33-1',
    title: 'Imperative / Prohibitive (আদেশ/নিষেধ)',
    structure: 'Imperative: e-column | Prohibitive: Dict. Form + な',
    explanationBn: 'সরাসরি আদেশ দিতে বা নিষেধ করতে।',
    lesson: 33,
    examples: [
      { japanese: '早く寝ろ！', romaji: 'Hayaku nero!', meaningBn: 'তাড়াতাড়ি ঘুমাও!' }
    ]
  },
  {
    id: 'g34-1',
    title: 'toori ni (অনুরূপভাবে)',
    structure: 'Verb (Dict/Ta form) + とおりに',
    explanationBn: 'যেভাবে বলা বা দেখা হয়েছে ঠিক সেভাবে করা।',
    lesson: 34,
    examples: [
      { japanese: '私が言うとおりに、書いてください।', romaji: 'Watashi ga iu toori ni, kaite kudasai.', meaningBn: 'আমি যেভাবে বলছি সেভাবে লিখুন।' }
    ]
  },
  {
    id: 'g34-2',
    title: 'ato de (পরে)',
    structure: 'Verb (Ta-form) / Noun + の + あとで',
    explanationBn: 'কোনো কাজ বা ঘটনার পরে অন্য কিছু করা।',
    lesson: 34,
    examples: [
      { japanese: '仕事のあとで、飲みに行きます।', romaji: 'Shigoto no ato de, nomi ni ikimasu.', meaningBn: 'কাজের পরে পান করতে যাবো।' }
    ]
  },
  {
    id: 'g35-1',
    title: 'ba (শর্ত)',
    structure: 'Group 1: u -> e + ba | Group 2: ru -> reba',
    explanationBn: 'যদি এটি হয় তবে ওটি হবে।',
    lesson: 35,
    examples: [
      { japanese: '安ければ、買います।', romaji: 'Yasukereba, kaimasu.', meaningBn: 'সস্তা হলে কিনবো।' }
    ]
  },
  {
    id: 'g36-1',
    title: 'you ni narimashita (পরিবর্তন হওয়া)',
    structure: 'Verb (Potential/Dict. form) + ようになりました',
    explanationBn: 'আগে পারতাম না কিন্তু এখন পারি—এমন পরিবর্তন বোঝাতে।',
    lesson: 36,
    examples: [
      { japanese: '日本語が話せるようになりました।', romaji: 'Nihongo ga hanaseru you ni narimashita.', meaningBn: 'এখন জাপানিজ বলতে পারি (আগে পারতাম না)।' }
    ]
  },
  {
    id: 'g36-2',
    title: 'you ni shite imasu (চেষ্টা করছি)',
    structure: 'Verb (Dict/Nai form) + ようにしています',
    explanationBn: 'নিয়মিত কোনো কিছু করার বা না করার চেষ্টা করা।',
    lesson: 36,
    examples: [
      { japanese: '毎日野菜を食べるようにしています।', romaji: 'Mainichi yasai o taberu you ni shite imasu.', meaningBn: 'প্রতিদিন সবজি খাওয়ার চেষ্টা করছি।' }
    ]
  },
  {
    id: 'g37-2',
    title: 'Suffering Passive (অসুবিধায় পড়া)',
    structure: 'Person A wa Person B ni Verb (Passive)',
    explanationBn: 'অন্যের কোনো কাজের কারণে নিজের অসুবিধা হওয়া।',
    lesson: 37,
    examples: [
      { japanese: '雨に降られました।', romaji: 'Ame ni furaremashita.', meaningBn: 'বৃষ্টির কারণে (আমি) অসুবিধায় পড়েছি।' }
    ]
  },
  {
    id: 'g38-2',
    title: 'no o wasuremashita (ভুলে গেছি)',
    structure: 'Verb (Dict. form) + のを忘れました',
    explanationBn: 'কোনো কাজ করতে ভুলে যাওয়া।',
    lesson: 38,
    examples: [
      { japanese: '鍵をかけるのを忘れました।', romaji: 'Kagi o kakeru no o wasuremashita.', meaningBn: 'তালা দিতে ভুলে গেছি।' }
    ]
  },
  {
    id: 'g38-3',
    title: 'no o shitte imasu ka (জানেন কি?)',
    structure: 'Plain Form + のを知っていますか',
    explanationBn: 'কোনো তথ্য বা ঘটনা জানেন কি না তা জিজ্ঞাসা করতে।',
    lesson: 38,
    examples: [
      { japanese: '木村さんが結婚したのを知っていますか।', romaji: 'Kimura-san ga kekkon shita no o shitte imasu ka.', meaningBn: 'কিমুরা সাহেব যে বিয়ে করেছেন তা কি আপনি জানেন?' }
    ]
  },
  {
    id: 'g39-2',
    title: 'node (যেহেতু)',
    structure: 'Plain Form + ので',
    explanationBn: 'কারণ দর্শাতে kara এর চেয়ে বেশি বিনীত বা আনুষ্ঠানিক।',
    lesson: 39,
    examples: [
      { japanese: '用事があるので、お先に失礼します।', romaji: 'Youji ga aru node, osaki ni shitsurei shimasu.', meaningBn: 'কাজ থাকায় আমি আগেই বিদায় নিচ্ছি।' }
    ]
  },
  {
    id: 'g41-1',
    title: 'itadakimasu / kudasaimasu / yarimasu (সম্মানসূচক দেওয়া-নেওয়া)',
    structure: 'itadakimasu (গ্রহণ), kudasaimasu (দেওয়া), yarimasu (ছোটদের দেওয়া)',
    explanationBn: 'সম্মানিত ব্যক্তিদের সাথে লেনদেনের ক্ষেত্রে ব্যবহৃত হয়।',
    lesson: 41,
    examples: [
      { japanese: '先生にお土産をいただきました।', romaji: 'Sensei ni omiyage o itadakimashita.', meaningBn: 'শিক্ষকের কাছ থেকে উপহার গ্রহণ করেছি।' }
    ]
  },
  {
    id: 'g40-2',
    title: 'ka dou ka (কিনা)',
    structure: 'Plain Form + かどうか',
    explanationBn: 'হ্যাঁ বা না—এমন প্রশ্ন যখন অন্য বাক্যের অংশ হয়।',
    lesson: 40,
    examples: [
      { japanese: '間違いがないかどうか、確かめてください।', romaji: 'Machigai ga nai ka dou ka, tashikamete kudasai.', meaningBn: 'ভুল আছে কি না তা নিশ্চিত করুন।' }
    ]
  },
  {
    id: 'g40-3',
    title: 'te mimasu (চেষ্টা করে দেখা)',
    structure: 'Verb (Te-form) + みます',
    explanationBn: 'কোনো কাজ পরীক্ষামূলকভাবে করে দেখা।',
    lesson: 40,
    examples: [
      { japanese: 'この靴を履いてみてもいいですか।', romaji: 'Kono kutsu o haite mite mo ii desu ka.', meaningBn: 'এই জুতোটা কি পরে দেখতে পারি?' }
    ]
  },
  {
    id: 'g37-1',
    title: 'Passive Form (করা হওয়া)',
    structure: 'Group 1: a-column + reru | Group 2: rareru',
    explanationBn: 'অন্যের দ্বারা কোনো কাজ হওয়া।',
    lesson: 37,
    examples: [
      { japanese: '先生に褒められました।', romaji: 'Sensei ni homeraremashita.', meaningBn: 'শিক্ষকের দ্বারা প্রশংসিত হয়েছি।' }
    ]
  },
  {
    id: 'g38-1',
    title: 'Nominalization (no wa/ga/o)',
    structure: 'Verb (Dict. form) + のは / のが / のを',
    explanationBn: 'ভার্বকে নাউন হিসেবে ব্যবহার করতে।',
    lesson: 38,
    examples: [
      { japanese: 'テニスをするのは面白いです।', romaji: 'Tenisu o suru no wa omoshiroi desu.', meaningBn: 'টেনিস খেলা মজাদার।' }
    ]
  },
  {
    id: 'g39-1',
    title: 'te / nakute (কারণ)',
    structure: 'Verb (Te/Nakute form) + Result',
    explanationBn: 'কোনো কারণ বা অনুভূতির উৎস প্রকাশ করতে।',
    lesson: 39,
    examples: [
      { japanese: 'ニュースを聞いて、びっくりしました।', romaji: 'Nyuusu o kiite, bikkuri shimashita.', meaningBn: 'খবরটি শুনে অবাক হয়েছি।' }
    ]
  },
  {
    id: 'g40-1',
    title: 'Embedded Questions (প্রশ্ন বাক্যের অংশ)',
    structure: 'Plain Form + か / ～かどうか',
    explanationBn: 'যখন একটি প্রশ্ন অন্য বাক্যের অংশ হয়।',
    lesson: 40,
    examples: [
      { japanese: 'どこへ行くか、教えてください।', romaji: 'Doko e iku ka, oshiete kudasai.', meaningBn: 'কোথায় যাচ্ছেন বলুন।' }
    ]
  },
  {
    id: 'g42-1',
    title: 'tame ni (উদ্দেশ্য)',
    structure: 'Verb (Dict. form) + ために',
    explanationBn: 'কোনো উদ্দেশ্য বা মঙ্গলের জন্য কিছু করা।',
    lesson: 42,
    examples: [
      { japanese: '家を買うために、貯金しています।', romaji: 'Ie o kau tame ni, chokin shite imasu.', meaningBn: 'বাড়ি কেনার জন্য টাকা জমাচ্ছি।' }
    ]
  },
  {
    id: 'g42-2',
    title: 'noni (উদ্দেশ্য/ব্যবহার)',
    structure: 'Verb (Dict. form) + のに',
    explanationBn: 'কোনো কিছু করার জন্য বা ব্যবহারের জন্য (উদ্দেশ্য)।',
    lesson: 42,
    examples: [
      { japanese: 'このはさみは花を切るのに使います।', romaji: 'Kono hasami wa hana o kiru no ni tsukaimasu.', meaningBn: 'এই কাঁচিটি ফুল কাটার জন্য ব্যবহার করা হয়।' }
    ]
  },
  {
    id: 'g43-1',
    title: 'sou desu (মনে হওয়া)',
    structure: 'Verb (Masu-stem) + そうです',
    explanationBn: 'চোখে দেখে মনে হচ্ছে এমন কিছু বলতে।',
    lesson: 43,
    examples: [
      { japanese: '雨が降りそうです।', romaji: 'Ame ga furisou desu.', meaningBn: 'বৃষ্টি পড়বে বলে মনে হচ্ছে।' }
    ]
  },
  {
    id: 'g43-2',
    title: 'te kimasu (গিয়ে আসা / শুরু হওয়া)',
    structure: 'Verb (Te-form) + きます',
    explanationBn: 'কোথাও গিয়ে ফিরে আসা অথবা কোনো অবস্থা শুরু হওয়া।',
    lesson: 43,
    examples: [
      { japanese: 'ちょっと飲み物を買ってきます।', romaji: 'Chotto nomimono o katte kimasu.', meaningBn: 'একটু পানীয় কিনে আসছি।' }
    ]
  },
  {
    id: 'g44-1',
    title: 'sugimasu (অতিরিক্ত)',
    structure: 'Verb (Masu-stem) + すぎます',
    explanationBn: 'কোনো কিছু অতিরিক্ত হয়ে যাওয়া।',
    lesson: 44,
    examples: [
      { japanese: 'お酒を飲みすぎました।', romaji: 'Osake o nomisugimashita.', meaningBn: 'অতিরিক্ত মদ খেয়ে ফেলেছি।' }
    ]
  },
  {
    id: 'g44-2',
    title: 'yasui / nikui (সহজ / কঠিন)',
    structure: 'Verb (Masu-stem) + やすい / にくい',
    explanationBn: 'কোনো কাজ করা সহজ বা কঠিন তা বোঝাতে।',
    lesson: 44,
    examples: [
      { japanese: 'このペンは書きやすいです।', romaji: 'Kono pen wa kakiyasui desu.', meaningBn: 'এই কলমটি দিয়ে লেখা সহজ।' }
    ]
  },
  {
    id: 'g45-1',
    title: 'baai wa (পরিস্থিতি)',
    structure: 'Plain Form + 場合は',
    explanationBn: 'যদি কোনো বিশেষ পরিস্থিতি তৈরি হয়।',
    lesson: 45,
    examples: [
      { japanese: '火事の場合は、119をかけます।', romaji: 'Kaji no baai wa, 119 o kakemasu.', meaningBn: 'আগুন লাগলে ১১৯-এ কল করবেন।' }
    ]
  },
  {
    id: 'g45-2',
    title: 'noni (তা সত্ত্বেও)',
    structure: 'Plain Form + のに',
    explanationBn: 'প্রত্যাশিত ফলাফলের বিপরীত কিছু ঘটলে (তা সত্ত্বেও)।',
    lesson: 45,
    examples: [
      { japanese: '一生懸命勉強したのに、不合格でした।', romaji: 'Isshoukenmei benkyou shita no ni, fugoukaku deshita.', meaningBn: 'প্রাণপণে পড়াশোনা করা সত্ত্বেও অকৃতকার্য হয়েছি।' }
    ]
  },
  {
    id: 'g46-1',
    title: 'tokoro desu (মুহূর্ত)',
    structure: 'Verb (Dict/Te-iru/Ta) + ところです',
    explanationBn: 'কাজের শুরু, চলা বা শেষের ঠিক পরের মুহূর্ত।',
    lesson: 46,
    examples: [
      { japanese: '今から食べるところです।', romaji: 'Ima kara taberu tokoro desu.', meaningBn: 'এখনই খেতে যাচ্ছি।' }
    ]
  },
  {
    id: 'g46-2',
    title: 'hazu desu (অবশ্যই / হওয়ার কথা)',
    structure: 'Plain Form + はずです',
    explanationBn: 'দৃঢ় বিশ্বাসের সাথে কোনো কিছু হওয়ার সম্ভাবনা প্রকাশ করতে।',
    lesson: 46,
    examples: [
      { japanese: '彼は今日来るはずです।', romaji: 'Kare wa kyou kuru hazu desu.', meaningBn: 'তার আজ আসার কথা (নিশ্চিতভাবে)।' }
    ]
  },
  {
    id: 'g47-1',
    title: 'sou desu (শোনা কথা)',
    structure: 'Plain Form + そうです',
    explanationBn: 'অন্যের কাছ থেকে শোনা তথ্য প্রকাশ করতে।',
    lesson: 47,
    examples: [
      { japanese: '明日は雨だそうです।', romaji: 'Ashita wa ame da sou desu.', meaningBn: 'শুনলাম আগামীকাল বৃষ্টি হবে।' }
    ]
  },
  {
    id: 'g47-2',
    title: 'you desu (মনে হওয়া - অনুমানের ভিত্তিতে)',
    structure: 'Plain Form + ようです',
    explanationBn: 'নিজের ইন্দ্রিয় বা তথ্যের ভিত্তিতে কোনো অনুমান করা।',
    lesson: 47,
    examples: [
      { japanese: '隣の部屋に誰かいるようです।', romaji: 'Tonari no heya ni dareka iru you desu.', meaningBn: 'মনে হচ্ছে পাশের রুমে কেউ আছে।' }
    ]
  },
  {
    id: 'g48-1',
    title: 'Causative Form (করানো)',
    structure: 'Group 1: a-column + seru | Group 2: saseru',
    explanationBn: 'কাউকে দিয়ে কোনো কাজ করানো।',
    lesson: 48,
    examples: [
      { japanese: '子供に本を読ませます।', romaji: 'Kodomo ni hon o yomasemasu.', meaningBn: 'বাচ্চাকে দিয়ে বই পড়াই।' }
    ]
  },
  {
    id: 'g49',
    title: 'Sonkeigo (সম্মানসূচক)',
    structure: 'Special Verbs / お + Masu-stem + になります',
    explanationBn: 'সম্মানিত ব্যক্তিদের কাজ সম্পর্কে বলতে।',
    lesson: 49,
    examples: [
      { japanese: '先生はお帰りになりました।', romaji: 'Sensei wa okaeri ni narimashita.', meaningBn: 'শিক্ষক ফিরে গেছেন।' }
    ]
  },
  {
    id: 'g50',
    title: 'Kenjougo (বিনীত)',
    structure: 'Special Verbs / お + Masu-stem + します',
    explanationBn: 'নিজের কাজ সম্পর্কে বিনীতভাবে বলতে।',
    lesson: 50,
    examples: [
      { japanese: 'お持ちします।', romaji: 'Omochi shimasu.', meaningBn: 'আমি (আপনার ব্যাগ) বহন করছি।' }
    ]
  }
];
