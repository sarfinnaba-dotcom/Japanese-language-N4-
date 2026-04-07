/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Filter, ArrowRight, X, Info, Languages, Book, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { verbs, Verb, VerbGroup } from './data/verbs';
import { generalVocabulary, Vocabulary } from './data/vocabulary';
import { grammarPoints, GrammarPoint } from './data/grammar';
import { conjugate, ConjugatedForm } from './lib/conjugator';
import { PracticeMode } from './components/PracticeMode';

export default function App() {
  const [activeTab, setActiveTab] = useState<'Verbs' | 'Vocabulary' | 'Grammar' | 'Practice'>('Verbs');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<'All' | 'N5' | 'N4'>('All');
  const [selectedLesson, setSelectedLesson] = useState<number | 'All'>('All');
  const [selectedVerb, setSelectedVerb] = useState<Verb | null>(null);

  const filteredVerbs = useMemo(() => {
    return verbs.filter((verb) => {
      const matchesSearch = 
        verb.kanji.includes(searchTerm) || 
        verb.hiragana.includes(searchTerm) || 
        verb.romaji.toLowerCase().includes(searchTerm.toLowerCase()) ||
        verb.meaningBn.includes(searchTerm);
      
      const matchesLevel = selectedLevel === 'All' || verb.level === selectedLevel;
      
      return matchesSearch && matchesLevel;
    });
  }, [searchTerm, selectedLevel]);

  const filteredVocabulary = useMemo(() => {
    return generalVocabulary.filter((item) => {
      const matchesSearch = 
        item.kanji.includes(searchTerm) || 
        item.hiragana.includes(searchTerm) || 
        item.romaji.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.meaningBn.includes(searchTerm);
      
      const matchesLesson = selectedLesson === 'All' || item.lesson === selectedLesson;
      
      return matchesSearch && matchesLesson;
    });
  }, [searchTerm, selectedLesson]);

  const filteredGrammar = useMemo(() => {
    return grammarPoints.filter((point) => {
      const matchesSearch = 
        point.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        point.explanationBn.includes(searchTerm) ||
        point.structure.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLesson = selectedLesson === 'All' || point.lesson === selectedLesson;
      
      return matchesSearch && matchesLesson;
    });
  }, [searchTerm, selectedLesson]);

  const lessons = useMemo(() => {
    const vocabLessons = generalVocabulary.map(v => v.lesson);
    const grammarLessons = grammarPoints.map(g => g.lesson);
    const uniqueLessons = Array.from(new Set([...vocabLessons, ...grammarLessons])).sort((a, b) => a - b);
    return uniqueLessons;
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
                <Languages size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Nihongo Master</h1>
                <p className="text-sm text-slate-500 font-medium">জাপানিজ ভাষা শিখুন (N5 & N4)</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="খুঁজুন (Kanji, Romaji, Bengali)..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-lg transition-all outline-none text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('Verbs')}
                  className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                    activeTab === 'Verbs'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Verbs
                </button>
                <button
                  onClick={() => setActiveTab('Vocabulary')}
                  className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                    activeTab === 'Vocabulary'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Vocabulary
                </button>
                <button
                  onClick={() => setActiveTab('Grammar')}
                  className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                    activeTab === 'Grammar'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Grammar
                </button>
                <button
                  onClick={() => setActiveTab('Practice')}
                  className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                    activeTab === 'Practice'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Brain size={14} />
                    Practice
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'Practice' ? (
          <PracticeMode onClose={() => setActiveTab('Verbs')} />
        ) : (
          <>
            {/* Filters */}
            <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {activeTab === 'Verbs' ? (
                  <div className="flex bg-slate-100 p-1 rounded-lg">
                    {(['All', 'N5', 'N4'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`px-4 py-1 rounded-md text-xs font-semibold transition-all ${
                          selectedLevel === level
                            ? 'bg-white text-indigo-600 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase">Lesson:</span>
                    <select 
                      className="bg-slate-100 border-none rounded-lg text-xs font-semibold py-1 px-3 outline-none focus:ring-2 focus:ring-indigo-500"
                      value={selectedLesson}
                      onChange={(e) => setSelectedLesson(e.target.value === 'All' ? 'All' : Number(e.target.value))}
                    >
                      <option value="All">All Lessons</option>
                      {lessons.map(l => (
                        <option key={l} value={l}>Lesson {l}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Info size={14} />
                <span>
                  {activeTab === 'Verbs' 
                    ? 'ভার্ব এর উপর ক্লিক করে বিস্তারিত দেখুন' 
                    : activeTab === 'Vocabulary' 
                    ? 'শব্দার্থগুলো ভালো করে মুখস্থ করুন' 
                    : 'গ্রামার রুলস এবং উদাহরণগুলো পড়ুন'}
                </span>
              </div>
            </div>

            {/* Content Grid */}
            {activeTab === 'Verbs' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredVerbs.map((verb) => (
                    <motion.div
                      layout
                      key={verb.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ y: -4 }}
                      onClick={() => setSelectedVerb(verb)}
                      className="group cursor-pointer bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${
                          verb.level === 'N5' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {verb.level}
                        </span>
                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">
                          {verb.group}
                        </span>
                      </div>
                      
                      <div className="space-y-1 mb-4">
                        <h3 className="text-3xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {verb.kanji}
                        </h3>
                        <p className="text-slate-500 font-medium text-sm">
                          {verb.hiragana} • <span className="italic">{verb.romaji}</span>
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                        <p className="text-indigo-600 font-bold text-lg">
                          {verb.meaningBn}
                        </p>
                        <ArrowRight size={18} className="text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : activeTab === 'Vocabulary' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredVocabulary.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white p-5 rounded-2xl border border-slate-200 hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-indigo-50 text-indigo-600">
                          Lesson {item.lesson}
                        </span>
                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">
                          {item.type}
                        </span>
                      </div>
                      
                      <div className="space-y-1 mb-4">
                        <h3 className="text-2xl font-bold text-slate-900">
                          {item.kanji}
                        </h3>
                        <p className="text-slate-500 font-medium text-sm">
                          {item.hiragana} • <span className="italic">{item.romaji}</span>
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-50">
                        <p className="text-indigo-600 font-bold text-lg">
                          {item.meaningBn}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredGrammar.map((point) => (
                    <motion.div
                      layout
                      key={point.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-indigo-600 text-white">
                          Lesson {point.lesson}
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-2xl font-black text-slate-900 border-b border-slate-100 pb-2">
                          {point.title}
                        </h3>
                        
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1">Structure</p>
                          <p className="font-mono text-sm text-slate-700">{point.structure}</p>
                        </div>

                        <div className="space-y-2">
                          <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Explanation</p>
                          <p className="text-slate-700 font-medium leading-relaxed">
                            {point.explanationBn}
                          </p>
                        </div>

                        <div className="space-y-3 pt-2">
                          <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Examples</p>
                          <div className="space-y-3">
                            {point.examples.map((ex, i) => (
                              <div key={i} className="pl-4 border-l-2 border-indigo-100 space-y-1">
                                <p className="text-lg font-bold text-slate-900">{ex.japanese}</p>
                                <p className="text-xs text-slate-400 italic">{ex.romaji}</p>
                                <p className="text-sm font-bold text-indigo-600">{ex.meaningBn}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </>
        )}

        {(activeTab === 'Verbs' ? filteredVerbs : activeTab === 'Vocabulary' ? filteredVocabulary : activeTab === 'Grammar' ? filteredGrammar : []).length === 0 && activeTab !== 'Practice' && (
          <div className="text-center py-20">
            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Search size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">কোন তথ্য পাওয়া যায়নি</h3>
            <p className="text-slate-500">অন্য কিছু লিখে চেষ্টা করুন</p>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedVerb && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVerb(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-6 sm:p-8 border-b border-slate-100 flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${
                      selectedVerb.level === 'N5' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {selectedVerb.level}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      {selectedVerb.group}
                    </span>
                  </div>
                  <h2 className="text-5xl font-black text-slate-900">{selectedVerb.kanji}</h2>
                  <p className="text-xl text-slate-500 font-medium">
                    {selectedVerb.hiragana} ({selectedVerb.romaji})
                  </p>
                  <p className="text-2xl font-bold text-indigo-600 pt-2">
                    অর্থ: {selectedVerb.meaningBn}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedVerb(null)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <BookOpen size={16} />
                  ভার্ব এর রূপ পরিবর্তন (Conjugations)
                </h3>

                <div className="space-y-4">
                  {conjugate(selectedVerb).map((form, idx) => (
                    <div 
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors gap-3"
                    >
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">
                          {form.formName}
                        </p>
                        <p className="text-2xl font-bold text-slate-900 leading-none">
                          {form.japanese}
                        </p>
                        {form.romaji !== '...' && (
                          <p className="text-xs text-slate-400 italic">{form.romaji}</p>
                        )}
                      </div>
                      <div className="sm:text-right">
                        <p className="text-lg font-bold text-slate-700">
                          {form.meaningBn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-indigo-600 text-white text-center">
                <p className="text-sm font-medium opacity-90">
                  জাপানিজ ভাষা শেখার এই অ্যাপটি আপনার এন৫ এবং এন৪ প্রস্তুতির জন্য সহায়ক হবে।
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200 mt-12">
        <div className="text-center space-y-4">
          <p className="text-slate-400 text-sm font-medium">
            © {new Date().getFullYear()} Nihongo Verb Master - Bengali Edition
          </p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors text-xs font-bold uppercase tracking-widest">N5 Verbs</a>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors text-xs font-bold uppercase tracking-widest">N4 Verbs</a>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors text-xs font-bold uppercase tracking-widest">Grammar Rules</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
