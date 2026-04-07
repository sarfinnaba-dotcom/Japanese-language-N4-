import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Settings, CheckCircle2, XCircle, RotateCcw, Brain, ChevronRight, Filter, BookOpen, Layers } from 'lucide-react';
import { verbs, Verb, VerbGroup } from '../data/verbs';
import { grammarPoints, GrammarPoint } from '../data/grammar';
import { getSRSData, updateSRSItem, getItemsForReview } from '../lib/srs';
import { PracticeSessionSettings, SRSData } from '../types/srs';

interface QuizItem {
  id: string;
  type: 'verb' | 'grammar';
  question: string;
  answer: string;
  reading?: string;
  romaji?: string;
  level: string;
  category: string;
  data: Verb | GrammarPoint;
}

interface PracticeModeProps {
  onClose: () => void;
}

export const PracticeMode: React.FC<PracticeModeProps> = ({ onClose }) => {
  const [mode, setMode] = useState<'setup' | 'quiz' | 'summary'>('setup');
  const [settings, setSettings] = useState<PracticeSessionSettings>({
    levels: ['N5'],
    verbGroups: Object.values(VerbGroup),
    includeGrammar: true,
    maxItems: 10,
  });

  const [quizItems, setQuizItems] = useState<QuizItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [results, setResults] = useState<{ id: string; correct: boolean }[]>([]);
  const [srsData, setSrsData] = useState<SRSData>({});

  useEffect(() => {
    setSrsData(getSRSData());
  }, []);

  const startQuiz = () => {
    const availableVerbs = verbs.filter(v => 
      settings.levels.includes(v.level) && 
      settings.verbGroups.includes(v.group)
    );

    const availableGrammar = settings.includeGrammar 
      ? grammarPoints.filter(g => settings.levels.includes(g.lesson <= 25 ? 'N5' : 'N4'))
      : [];

    const allIds = [...availableVerbs.map(v => v.id), ...availableGrammar.map(g => g.id)];
    const reviewIds = getItemsForReview(allIds);

    let selectedItems: QuizItem[] = [];

    // Prioritize review items, then add new ones
    const prioritizedIds = [...reviewIds, ...allIds.filter(id => !reviewIds.includes(id))];
    const finalIds = prioritizedIds.slice(0, settings.maxItems);

    selectedItems = finalIds.map(id => {
      const verb = verbs.find(v => v.id === id);
      if (verb) {
        return {
          id: verb.id,
          type: 'verb',
          question: verb.kanji,
          answer: verb.meaningBn,
          reading: verb.hiragana,
          romaji: verb.romaji,
          level: verb.level,
          category: verb.group,
          data: verb,
        };
      }
      const grammar = grammarPoints.find(g => g.id === id);
      if (grammar) {
        return {
          id: grammar.id,
          type: 'grammar',
          question: grammar.title,
          answer: grammar.explanationBn,
          level: grammar.lesson <= 25 ? 'N5' : 'N4',
          category: `Lesson ${grammar.lesson}`,
          data: grammar,
        };
      }
      return null;
    }).filter(Boolean) as QuizItem[];

    // Shuffle
    selectedItems.sort(() => Math.random() - 0.5);

    setQuizItems(selectedItems);
    setCurrentIndex(0);
    setShowAnswer(false);
    setResults([]);
    setMode('quiz');
  };

  const handleAnswer = (correct: boolean) => {
    const currentItem = quizItems[currentIndex];
    updateSRSItem(currentItem.id, correct);
    setResults([...results, { id: currentItem.id, correct }]);
    
    if (currentIndex < quizItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      setMode('summary');
    }
  };

  const stats = useMemo(() => {
    const correctCount = results.filter(r => r.correct).length;
    return {
      correct: correctCount,
      total: results.length,
      percentage: results.length > 0 ? Math.round((correctCount / results.length) * 100) : 0
    };
  }, [results]);

  if (mode === 'setup') {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-indigo-100 text-indigo-600 rounded-2xl mb-2">
            <Brain size={32} />
          </div>
          <h2 className="text-3xl font-black text-slate-900">প্র্যাকটিস মোড</h2>
          <p className="text-slate-500">আপনার শেখা শব্দগুলো ঝালাই করে নিন স্পেসড রিপিটেশন (SRS) এর মাধ্যমে</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Filter size={16} />
              ফিল্টার সেট করুন
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="text-sm font-bold text-slate-700">JLPT Level</p>
                <div className="flex gap-2">
                  {(['N5', 'N4'] as const).map(level => (
                    <button
                      key={level}
                      onClick={() => setSettings({
                        ...settings,
                        levels: settings.levels.includes(level) 
                          ? settings.levels.filter(l => l !== level)
                          : [...settings.levels, level]
                      })}
                      className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all border-2 ${
                        settings.levels.includes(level)
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-600'
                          : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-bold text-slate-700">Grammar</p>
                <button
                  onClick={() => setSettings({ ...settings, includeGrammar: !settings.includeGrammar })}
                  className={`w-full py-2 rounded-xl text-sm font-bold transition-all border-2 ${
                    settings.includeGrammar
                      ? 'bg-indigo-50 border-indigo-600 text-indigo-600'
                      : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                  }`}
                >
                  {settings.includeGrammar ? 'Included' : 'Excluded'}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-bold text-slate-700">Verb Groups</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {Object.values(VerbGroup).map(group => (
                  <button
                    key={group}
                    onClick={() => setSettings({
                      ...settings,
                      verbGroups: settings.verbGroups.includes(group)
                        ? settings.verbGroups.filter(g => g !== group)
                        : [...settings.verbGroups, group]
                    })}
                    className={`py-2 px-3 rounded-xl text-[10px] font-bold transition-all border-2 text-left ${
                      settings.verbGroups.includes(group)
                        ? 'bg-indigo-50 border-indigo-600 text-indigo-600'
                        : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                    }`}
                  >
                    {group}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-bold text-slate-700">Session Size: {settings.maxItems} items</p>
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={settings.maxItems}
                onChange={(e) => setSettings({ ...settings, maxItems: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>

          <button
            onClick={startQuiz}
            disabled={settings.levels.length === 0 || (settings.verbGroups.length === 0 && !settings.includeGrammar)}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play size={20} fill="currentColor" />
            শুরু করুন
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'quiz') {
    const currentItem = quizItems[currentIndex];
    const progress = ((currentIndex + 1) / quizItems.length) * 100;

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between px-2">
          <button 
            onClick={() => setMode('setup')}
            className="text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1 text-sm font-bold"
          >
            <XCircle size={18} />
            শেষ করুন
          </button>
          <div className="text-sm font-black text-slate-900">
            {currentIndex + 1} / {quizItems.length}
          </div>
        </div>

        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-indigo-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 min-h-[400px] flex flex-col items-center justify-center text-center space-y-8"
        >
          <div className="space-y-2">
            <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-bold uppercase tracking-widest">
              {currentItem.type} • {currentItem.category}
            </span>
            <h3 className="text-6xl font-black text-slate-900">{currentItem.question}</h3>
          </div>

          <AnimatePresence mode="wait">
            {showAnswer ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 w-full"
              >
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-indigo-600">{currentItem.answer}</p>
                  {currentItem.reading && (
                    <p className="text-slate-500 font-medium">
                      {currentItem.reading} ({currentItem.romaji})
                    </p>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => handleAnswer(false)}
                    className="flex-1 py-4 bg-rose-50 text-rose-600 rounded-2xl font-bold hover:bg-rose-100 transition-all flex items-center justify-center gap-2"
                  >
                    <XCircle size={20} />
                    ভুল হয়েছে
                  </button>
                  <button
                    onClick={() => handleAnswer(true)}
                    className="flex-1 py-4 bg-emerald-50 text-emerald-600 rounded-2xl font-bold hover:bg-emerald-100 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={20} />
                    সঠিক
                  </button>
                </div>
              </motion.div>
            ) : (
              <button
                onClick={() => setShowAnswer(true)}
                className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                উত্তর দেখুন
                <ChevronRight size={20} />
              </button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 bg-emerald-100 text-emerald-600 rounded-full">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-4xl font-black text-slate-900">চমৎকার!</h2>
        <p className="text-slate-500">আপনি আজকের সেশনটি সফলভাবে সম্পন্ন করেছেন</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center space-y-1">
          <p className="text-xs font-bold text-slate-400 uppercase">সঠিক</p>
          <p className="text-3xl font-black text-emerald-600">{stats.correct}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center space-y-1">
          <p className="text-xs font-bold text-slate-400 uppercase">মোট</p>
          <p className="text-3xl font-black text-slate-900">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center space-y-1">
          <p className="text-xs font-bold text-slate-400 uppercase">স্কোর</p>
          <p className="text-3xl font-black text-indigo-600">{stats.percentage}%</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <Layers size={20} className="text-indigo-600" />
          SRS আপডেট
        </h3>
        <div className="space-y-3">
          {results.slice(0, 5).map((res, i) => {
            const item = quizItems.find(q => q.id === res.id);
            return (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  {res.correct ? <CheckCircle2 size={16} className="text-emerald-500" /> : <XCircle size={16} className="text-rose-500" />}
                  <span className="font-bold text-slate-700">{item?.question}</span>
                </div>
                <span className="text-[10px] font-black text-indigo-500 uppercase">
                  Level Up!
                </span>
              </div>
            );
          })}
          {results.length > 5 && (
            <p className="text-center text-xs text-slate-400 font-medium pt-2">
              এবং আরও {results.length - 5} টি শব্দ আপডেট করা হয়েছে
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setMode('setup')}
          className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw size={20} />
          আবার শুরু করুন
        </button>
        <button
          onClick={onClose}
          className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
        >
          <BookOpen size={20} />
          হোম পেজে যান
        </button>
      </div>
    </div>
  );
};
