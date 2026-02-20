import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, Command, X, FileText, ArrowRight } from 'lucide-react';

interface SearchResult {
    title: string;
    description: string;
    slug: string;
    content: string;
}

export default function Search() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [index, setIndex] = useState<SearchResult[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    // Fetch index on mount
    useEffect(() => {
        fetch('/search-index.json')
            .then(res => res.json())
            .then(data => setIndex(data))
            .catch(err => console.error('Failed to load search index', err));
    }, []);

    // Handle shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Search logic
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const searchTerms = query.toLowerCase().split(' ');
        const filtered = index.filter(item => {
            const searchableText = `${item.title} ${item.description} ${item.content}`.toLowerCase();
            return searchTerms.every(term => searchableText.includes(term));
        }).slice(0, 8); // Limit results

        setResults(filtered);
        setSelectedIndex(0);
    }, [query, index]);

    // Handle navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev + 1) % results.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
        } else if (e.key === 'Enter' && results[selectedIndex]) {
            window.location.href = `/docs/${results[selectedIndex].slug === 'index' ? '' : results[selectedIndex].slug}`;
        }
    };

    const baseUrl = import.meta.env.BASE_URL.endsWith('/')
        ? import.meta.env.BASE_URL.slice(0, -1)
        : import.meta.env.BASE_URL;

    return (
        <>
            {/* Search Trigger */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 transition-all group w-full max-w-sm"
            >
                <SearchIcon size={16} className="group-hover:text-slate-900 dark:group-hover:text-slate-100" />
                <span className="text-sm flex-1 text-left hidden sm:inline">Search documentation...</span>
                <span className="text-sm flex-1 text-left sm:hidden">Search...</span>
                <div className="hidden md:flex items-center gap-1 px-1.5 py-0.5 bg-white dark:bg-neutral-800 border border-slate-200 dark:border-slate-700 rounded text-[10px] font-medium">
                    <Command size={10} /> K
                </div>
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px]" onClick={() => setIsOpen(false)} />

                    <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 p-4 border-b border-slate-200 dark:border-slate-800">
                            <SearchIcon size={20} className="text-slate-400" />
                            <input
                                ref={inputRef}
                                autoFocus
                                type="text"
                                placeholder="Search documentation..."
                                className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors">
                                <X size={20} className="text-slate-400" />
                            </button>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto p-2">
                            {results.length > 0 ? (
                                <div className="space-y-1">
                                    {results.map((result, i) => (
                                        <a
                                            key={result.slug}
                                            href={`${baseUrl}/docs/${result.slug === 'index' ? '' : result.slug}`}
                                            className={`flex items-start gap-3 p-3 rounded-xl transition-all ${i === selectedIndex ? 'bg-blue-50 dark:bg-blue-900/30 ring-1 ring-blue-500/20' : 'hover:bg-slate-50 dark:hover:bg-neutral-800'}`}
                                            onMouseEnter={() => setSelectedIndex(i)}
                                        >
                                            <div className={`p-2 rounded-lg ${i === selectedIndex ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300' : 'bg-slate-100 dark:bg-neutral-800 text-slate-500'}`}>
                                                <FileText size={18} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2">
                                                    <h4 className={`font-semibold truncate ${i === selectedIndex ? 'text-blue-700 dark:text-blue-200' : 'text-slate-900 dark:text-white'}`}>
                                                        {result.title}
                                                    </h4>
                                                    {i === selectedIndex && <ArrowRight size={14} className="text-blue-500 animate-in slide-in-from-left-2" />}
                                                </div>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                                    {result.description}
                                                </p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            ) : query.trim() ? (
                                <div className="py-12 text-center">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-neutral-800 mb-4">
                                        <SearchIcon size={24} className="text-slate-400" />
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400">No results found for "{query}"</p>
                                </div>
                            ) : (
                                <div className="p-4">
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Recent Searches</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 italic">No recent searches yet.</p>
                                </div>
                            )}
                        </div>

                        <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                            <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1 bg-slate-100 dark:bg-neutral-800 px-1 rounded border border-slate-200 dark:border-slate-700">↵ Proceed</span>
                                <span className="flex items-center gap-1 bg-slate-100 dark:bg-neutral-800 px-1 rounded border border-slate-200 dark:border-slate-700">↑↓ Navigate</span>
                            </div>
                            <span>Powered by Kinetix</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
