/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Filter, ArrowRight, X, Info, Languages, Book, Brain, Home, Zap, Box, Sparkles, FileText, Type } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { verbs, Verb, VerbGroup } from './data/verbs';
import { generalVocabulary, Vocabulary } from './data/vocabulary';
import { grammarPoints, GrammarPoint } from './data/grammar';
import { conjugate, ConjugatedForm } from './lib/conjugator';
import { PracticeMode } from './components/PracticeMode';

type TabType = 'Home' | 'Verbs' | 'Vocabulary' | 'Grammar' | 'Practice' | 'Nouns' | 'Adjectives' | 'Kanji';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('Home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<'All' | 'N5' | 'N4'>('All');
  const [selectedLesson, setSelectedLesson] = useState<number | 'All'>('All');
  const [selectedVerb, setSelectedVerb] = useState<Verb | null>(null);

  const filteredVerbs = useMemo(() => {
    if (!searchTerm.trim()) return verbs;
    const keywords = searchTerm.toLowerCase().split(/\s+/).filter(k => k.length > 0);
    
    return verbs.filter((verb) => {
      return keywords.every(keyword => 
        verb.kanji.includes(keyword) || 
        verb.hiragana.includes(keyword) || 
        verb.romaji.toLowerCase().includes(keyword) ||
        verb.meaningBn.toLowerCase().includes(keyword) ||
        verb.group.toLowerCase().includes(keyword)
      ) && (selectedLevel === 'All' || verb.level === selectedLevel);
    });
  }, [searchTerm, selectedLevel]);

  const filteredVocabulary = useMemo(() => {
    const keywords = searchTerm.toLowerCase().split(/\s+/).filter(k => k.length > 0);
    
    return generalVocabulary.filter((item) => {
      const matchesSearch = keywords.length === 0 || keywords.every(keyword =>
        item.kanji.includes(keyword) || 
        item.hiragana.includes(keyword) || 
        item.romaji.toLowerCase().includes(keyword) ||
        item.meaningBn.toLowerCase().includes(keyword) ||
        item.type.toLowerCase().includes(keyword)
      );
      
      const matchesLesson = selectedLesson === 'All' || item.lesson === selectedLesson;
      
      let matchesType = true;
      if (activeTab === 'Nouns') matchesType = item.type === 'Noun';
      if (activeTab === 'Adjectives') matchesType = item.type === 'Adjective';
      if (activeTab === 'Kanji') matchesType = item.kanji !== item.hiragana;
      
      return matchesSearch && matchesLesson && matchesType;
    });
  }, [searchTerm, selectedLesson, activeTab]);

  const filteredGrammar = useMemo(() => {
    const keywords = searchTerm.toLowerCase().split(/\s+/).filter(k => k.length > 0);
    
    return grammarPoints.filter((point) => {
      const matchesSearch = keywords.length === 0 || keywords.every(keyword =>
        point.title.toLowerCase().includes(keyword) || 
        point.explanationBn.toLowerCase().includes(keyword) ||
        point.structure.toLowerCase().includes(keyword)
      );
      
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
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="খুঁজুন (Kanji, Romaji, Bengali)..."
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-100 border-2 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all outline-none text-sm font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-200 rounded-full transition-all"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <div className="flex bg-slate-100 p-1 rounded-lg overflow-x-auto no-scrollbar max-w-[400px] sm:max-w-none">
                <button
                  onClick={() => setActiveTab('Home')}
                  className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    activeTab === 'Home'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Home size={14} />
                  Home
                </button>
                <button
                  onClick={() => setActiveTab('Verbs')}
                  className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
                    activeTab === 'Verbs'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Verbs
                </button>
                <button
                  onClick={() => setActiveTab('Vocabulary')}
                  className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
                    activeTab === 'Vocabulary'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Vocab
                </button>
                <button
                  onClick={() => setActiveTab('Grammar')}
                  className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
                    activeTab === 'Grammar'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Grammar
                </button>
                <button
                  onClick={() => setActiveTab('Practice')}
                  className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
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
        {searchTerm.trim() && activeTab !== 'Practice' ? (
          <div className="space-y-12">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-black text-slate-900">
                সার্চ রেজাল্ট: <span className="text-indigo-600">"{searchTerm}"</span>
              </h2>
              <button 
                onClick={() => setSearchTerm('')}
                className="text-sm font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors"
              >
                <X size={16} />
                সার্চ বন্ধ করুন
              </button>
            </div>

            {/* Verbs Results */}
            {filteredVerbs.length > 0 && (
              <section className="space-y-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Zap size={16} className="text-amber-500" />
                  Verbs ({filteredVerbs.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredVerbs.map((verb) => (
                    <motion.div
                      layout
                      key={verb.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ y: -4 }}
                      onClick={() => setSelectedVerb(verb)}
                      className="group cursor-pointer bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-xl transition-all"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${
                          verb.level === 'N5' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {verb.level}
                        </span>
                        <span className="text-[10px] font-medium text-slate-400 uppercase">
                          {verb.group}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {verb.kanji}
                      </h3>
                      <p className="text-slate-500 font-medium text-xs mb-3">
                        {verb.hiragana} • {verb.romaji}
                      </p>
                      <p className="text-indigo-600 font-bold border-t border-slate-50 pt-3">
                        {verb.meaningBn}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Vocabulary Results */}
            {filteredVocabulary.length > 0 && (
              <section className="space-y-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Book size={16} className="text-blue-500" />
                  Vocabulary ({filteredVocabulary.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredVocabulary.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white p-5 rounded-2xl border border-slate-200 hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-indigo-50 text-indigo-600">
                          Lesson {item.lesson}
                        </span>
                        <span className="text-[10px] font-medium text-slate-400 uppercase">
                          {item.type}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">
                        {item.kanji}
                      </h3>
                      <p className="text-slate-500 font-medium text-xs mb-3">
                        {item.hiragana} • {item.romaji}
                      </p>
                      <p className="text-indigo-600 font-bold border-t border-slate-50 pt-3">
                        {item.meaningBn}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Grammar Results */}
            {filteredGrammar.length > 0 && (
              <section className="space-y-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <FileText size={16} className="text-indigo-500" />
                  Grammar ({filteredGrammar.length})
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredGrammar.map((point) => (
                    <motion.div
                      layout
                      key={point.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"
                    >
                      <h3 className="text-xl font-black text-slate-900 mb-2">{point.title}</h3>
                      <p className="text-xs font-bold text-indigo-500 uppercase mb-2">Structure: {point.structure}</p>
                      <p className="text-slate-700 text-sm">{point.explanationBn}</p>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {filteredVerbs.length === 0 && filteredVocabulary.length === 0 && filteredGrammar.length === 0 && (
              <div className="text-center py-20">
                <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <Search size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">কোন তথ্য পাওয়া যায়নি</h3>
                <p className="text-slate-500">অন্য কিছু লিখে চেষ্টা করুন</p>
              </div>
            )}
          </div>
        ) : activeTab === 'Home' ? (
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">স্বাগতম, জাপানিজ ভাষা শিখুন</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">নিচের ক্যাটাগরিগুলো থেকে আপনার পড়ার বিষয় নির্বাচন করুন।</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { id: 'Vocabulary', title: 'Vocabulary', icon: <Book className="text-blue-500" />, desc: 'সব শব্দার্থ', color: 'bg-blue-50' },
                { id: 'Verbs', title: 'Verbs', icon: <Zap className="text-amber-500" />, desc: 'ক্রিয়াপদ ও রূপান্তর', color: 'bg-amber-50' },
                { id: 'Nouns', title: 'Nouns', icon: <Box className="text-emerald-500" />, desc: 'বিশেষ্য পদ', color: 'bg-emerald-50' },
                { id: 'Adjectives', title: 'Adjectives', icon: <Sparkles className="text-rose-500" />, desc: 'বিশেষণ পদ', color: 'bg-rose-50' },
                { id: 'Grammar', title: 'Grammar', icon: <FileText className="text-indigo-500" />, desc: 'ব্যাকরণ নিয়ম', color: 'bg-indigo-50' },
                { id: 'Kanji', title: 'Kanji', icon: <Type className="text-purple-500" />, desc: 'কাঞ্জি শিক্ষা', color: 'bg-purple-50' },
                { id: 'Practice', title: 'Practice', icon: <Brain className="text-orange-500" />, desc: 'অনুশীলন করুন', color: 'bg-orange-50' },
              ].map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(item.id as TabType)}
                  className="cursor-pointer bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all group"
                >
                  <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-indigo-600 rounded-[2rem] p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
              <div className="relative z-10 max-w-2xl">
                <h3 className="text-3xl font-bold mb-4">আপনার জাপানিজ যাত্রা শুরু হোক আজই!</h3>
                <p className="text-indigo-100 text-lg mb-8">N5 এবং N4 লেভেলের জন্য প্রয়োজনীয় সব রিসোর্স এখানে পাবেন। নিয়মিত প্র্যাকটিস করুন এবং নিজেকে দক্ষ করে তুলুন।</p>
                <button 
                  onClick={() => setActiveTab('Practice')}
                  className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors flex items-center gap-2"
                >
                  প্র্যাকটিস শুরু করুন
                  <ArrowRight size={20} />
                </button>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
                <Languages size={400} />
              </div>
            </div>
          </div>
        ) : activeTab === 'Practice' ? (
          <PracticeMode onClose={() => setActiveTab('Home')} />
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
                    : activeTab === 'Grammar' 
                    ? 'গ্রামার রুলস এবং উদাহরণগুলো পড়ুন'
                    : 'শব্দার্থগুলো ভালো করে মুখস্থ করুন'}
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
            ) : (activeTab === 'Vocabulary' || activeTab === 'Nouns' || activeTab === 'Adjectives' || activeTab === 'Kanji') ? (
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

                      <div className="pt-4 border-t border-slate-50 space-y-2">
                        <p className="text-indigo-600 font-bold text-lg">
                          {item.meaningBn}
                        </p>
                        {item.sentence && (
                          <div className="mt-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Example</p>
                            <p className="text-xs text-slate-700 leading-relaxed font-medium">{item.sentence}</p>
                          </div>
                        )}
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

        {(activeTab === 'Verbs' ? filteredVerbs : (activeTab === 'Vocabulary' || activeTab === 'Nouns' || activeTab === 'Adjectives' || activeTab === 'Kanji') ? filteredVocabulary : activeTab === 'Grammar' ? filteredGrammar : []).length === 0 && activeTab !== 'Practice' && activeTab !== 'Home' && (
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
