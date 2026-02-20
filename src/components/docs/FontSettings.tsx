import React, { useEffect, useState } from 'react';
import { Type, Settings, Check } from 'lucide-react';

const FONTS = [
    { name: 'Inter', value: "'Inter', sans-serif" },
    { name: 'Plus Jakarta', value: "'Plus Jakarta Sans', sans-serif" },
    { name: 'Cairo', value: "'Cairo', sans-serif" },
    { name: 'Outfit', value: "'Outfit', sans-serif" },
    { name: 'Merriweather', value: "'Merriweather', serif" },
];

const SIZES = [
    { label: 'Sm', value: '0.95rem' },
    { label: 'Md', value: '1.0625rem' }, // Default
    { label: 'Lg', value: '1.2rem' },
    { label: 'Xl', value: '1.4rem' },
];

interface FontSettingsProps {
    align?: 'bottom' | 'top';
}

export default function FontSettings({ align = 'bottom' }: FontSettingsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeFont, setActiveFont] = useState(FONTS[0].value);
    const [activeSize, setActiveSize] = useState(SIZES[1].value);

    // Initialize from localStorage or default
    useEffect(() => {
        const savedFont = localStorage.getItem('docs-font-family');
        const savedSize = localStorage.getItem('docs-font-size');

        if (savedFont) {
            setActiveFont(savedFont);
            document.documentElement.style.setProperty('--docs-font-family', savedFont);
        }
        if (savedSize) {
            setActiveSize(savedSize);
            document.documentElement.style.setProperty('--docs-font-size-base', savedSize);
        }
    }, []);

    const updateFont = (fontValue: string) => {
        setActiveFont(fontValue);
        document.documentElement.style.setProperty('--docs-font-family', fontValue);
        localStorage.setItem('docs-font-family', fontValue);
    };

    const updateSize = (sizeValue: string) => {
        setActiveSize(sizeValue);
        document.documentElement.style.setProperty('--docs-font-size-base', sizeValue);
        localStorage.setItem('docs-font-size', sizeValue);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
                title="Typography Settings"
            >
                <Type size={20} />
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className={`absolute right-0 ${align === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2'} w-64 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 p-4 animate-in fade-in slide-in-from-${align === 'bottom' ? 'top' : 'bottom'}-2 duration-200`}>
                        <div className="mb-4">
                            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Font Family</h3>
                            <div className="space-y-1">
                                {FONTS.map(font => (
                                    <button
                                        key={font.name}
                                        onClick={() => updateFont(font.value)}
                                        className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between transition-colors ${activeFont === font.value ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-medium' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                        style={{ fontFamily: font.value }}
                                    >
                                        {font.name}
                                        {activeFont === font.value && <Check size={14} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Font Size</h3>
                            <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                                {SIZES.map(size => (
                                    <button
                                        key={size.label}
                                        onClick={() => updateSize(size.value)}
                                        className={`flex-1 text-xs py-1.5 rounded-md transition-all ${activeSize === size.value ? 'bg-white dark:bg-neutral-700 shadow-sm text-slate-900 dark:text-slate-100 font-medium' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                                    >
                                        {size.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
