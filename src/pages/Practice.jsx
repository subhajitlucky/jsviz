import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { problems } from '../data/problems';
import { CheckSquare, Code, Filter, Search, Terminal } from 'lucide-react';
import useStore from '../store/useStore';

const Practice = () => {
    const { progress } = useStore();
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const difficulties = ['All', 'Easy', 'Intermediate', 'Advanced', 'Expert'];

    const filteredProblems = problems.filter(p => {
        const matchesDifficulty = filter === 'All' || p.difficulty === filter;
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesDifficulty && matchesSearch;
    });

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 border-b border-brand-border pb-8">
                    <h1 className="text-5xl font-bold text-white tracking-tighter mb-4">
                        PRACTICE_ARENA
                    </h1>
                    <p className="text-gray-400 font-mono">
                        Execute algorithmic challenges. Validate logic.
                    </p>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                    {/* Filter Pills */}
                    <div className="flex flex-wrap gap-2">
                        {difficulties.map((diff) => (
                            <button
                                key={diff}
                                onClick={() => setFilter(diff)}
                                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-all ${filter === diff
                                        ? 'bg-brand-lime text-brand-black border-brand-lime'
                                        : 'bg-transparent text-gray-400 border-brand-border hover:border-white hover:text-white'
                                    }`}
                            >
                                {diff}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-3 text-gray-500" size={16} />
                        <input
                            type="text"
                            placeholder="SEARCH_PROBLEMS..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-brand-zinc border border-brand-border text-white pl-10 pr-4 py-2 font-mono text-sm focus:outline-none focus:border-brand-lime placeholder-gray-600"
                        />
                    </div>
                </div>

                {/* Problem List */}
                <div className="border border-brand-border bg-brand-zinc">
                    <div className="grid grid-cols-12 border-b border-brand-border bg-brand-black p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                        <div className="col-span-1">Status</div>
                        <div className="col-span-6 md:col-span-7">Problem</div>
                        <div className="col-span-3 md:col-span-2">Difficulty</div>
                        <div className="col-span-2 text-right">Action</div>
                    </div>

                    <ul className="divide-y divide-brand-border">
                        {filteredProblems.map((problem) => {
                            const isSolved = progress.solvedProblems.includes(problem.id);
                            return (
                                <li key={problem.id} className="group hover:bg-brand-black transition-colors">
                                    <Link to={`/problem/${problem.id}`} className="grid grid-cols-12 p-4 items-center">
                                        <div className="col-span-1">
                                            {isSolved ? (
                                                <CheckSquare size={20} className="text-brand-lime" />
                                            ) : (
                                                <div className="w-5 h-5 border border-gray-600 rounded-sm"></div>
                                            )}
                                        </div>

                                        <div className="col-span-6 md:col-span-7 pr-4">
                                            <p className={`text-lg font-bold truncate ${isSolved ? 'text-brand-lime' : 'text-white group-hover:text-brand-lime transition-colors'}`}>
                                                {problem.title}
                                            </p>
                                            <p className="text-xs text-gray-500 font-mono truncate hidden md:block mt-1">
                                                {problem.description}
                                            </p>
                                        </div>

                                        <div className="col-span-3 md:col-span-2">
                                            <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 border ${problem.difficulty === 'Easy' ? 'text-green-400 border-green-400/30' :
                                                    problem.difficulty === 'Intermediate' ? 'text-blue-400 border-blue-400/30' :
                                                        problem.difficulty === 'Advanced' ? 'text-orange-400 border-orange-400/30' :
                                                            'text-red-400 border-red-400/30'}`}>
                                                {problem.difficulty}
                                            </span>
                                        </div>

                                        <div className="col-span-2 text-right">
                                            <span className="text-gray-500 group-hover:text-white transition-colors">
                                                <Terminal size={20} className="ml-auto" />
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {filteredProblems.length === 0 && (
                        <div className="p-12 text-center text-gray-500 font-mono">
                            NO_DATA_FOUND
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Practice;
