import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, FileText, Folder, FolderOpen } from 'lucide-react';

type NavNode = {
    name: string;
    path: string;
    children: NavNode[];
    doc: any | null;
    order: number;
    title: string;
};

interface SmartSidebarProps {
    menu: NavNode[];
    currentSlug: string;
    baseUrl: string;
}

const SidebarItem = ({ item, currentSlug, level = 0, baseUrl }: { item: NavNode, currentSlug: string, level?: number, baseUrl: string }) => {
    // Determine strict active state (exact match or direct index match)
    const isActive = currentSlug === item.path ||
        (currentSlug === "" && item.path === "index") ||
        currentSlug === item.path + "/index";

    // Determine if this item is in the active path (for auto-expanding parents)
    const isInActivePath = currentSlug.startsWith(item.path + '/') || isActive;

    // Initial state: open if it's in the active path
    const [isOpen, setIsOpen] = useState(isInActivePath);

    // Effect to auto-expand if navigation changes from outside
    useEffect(() => {
        if (isInActivePath) {
            setIsOpen(true);
        }
    }, [currentSlug, item.path]);

    const hasChildren = item.children && item.children.length > 0;
    const isLeaf = !hasChildren;

    const toggleOpen = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    // Styling helpers
    const paddingLeft = level * 12 + 12; // Indentation

    return (
        <li className="select-none">
            <div
                className={`group flex items-center justify-between px-3 py-1.5 my-0.5 rounded-md text-sm transition-colors duration-200 cursor-pointer text-slate-600 dark:text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-200 ${isActive ? 'bg-blue-50 text-blue-600 font-medium dark:bg-blue-900/20 dark:text-blue-400' : ''}`}
                style={{ paddingLeft: `${paddingLeft}px` }}
            >
                {/* Link or Toggle */}
                {item.doc ? (
                    <a
                        href={`${baseUrl}docs/${item.path === "index" ? "" : item.path.replace(/\/index$/, '')}`}
                        className="flex-1 flex items-center gap-2 truncate"
                    >
                        {isLeaf ? (
                            <FileText size={14} className={`opacity-70 ${isActive ? 'text-blue-500' : ''}`} />
                        ) : (
                            isOpen ? <FolderOpen size={14} className="text-blue-400" /> : <Folder size={14} className="opacity-70" />
                        )}
                        <span>{item.title}</span>
                    </a>
                ) : (
                    <div
                        className="flex-1 flex items-center gap-2 truncate"
                        onClick={toggleOpen}
                    >
                        {isOpen ? <FolderOpen size={14} className="text-blue-400" /> : <Folder size={14} className="opacity-70" />}
                        <span className="font-medium">{item.title}</span>
                    </div>
                )}

                {/* Chevron for explicit toggling of folders */}
                {hasChildren && (
                    <button
                        onClick={toggleOpen}
                        className={`p-1 rounded-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${isInActivePath ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'}`}
                    >
                        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                )}
            </div>

            {/* Children Render */}
            {hasChildren && isOpen && (
                <ul className="border-l border-slate-200 dark:border-slate-800 ml-4 space-y-0.5 animate-in slide-in-from-top-2 fade-in duration-200">
                    {item.children.map(child => (
                        <SidebarItem
                            key={child.path}
                            item={child}
                            currentSlug={currentSlug}
                            level={0} // We use border nesting instead of deep padding for a cleaner look
                            baseUrl={baseUrl}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default function SmartSidebar({ menu, currentSlug, baseUrl }: SmartSidebarProps) {
    return (
        <nav className="pb-8">
            <ul className="space-y-0.5">
                {menu.map(item => (
                    <SidebarItem
                        key={item.path}
                        item={item}
                        currentSlug={currentSlug}
                        baseUrl={baseUrl}
                    />
                ))}
            </ul>
        </nav>
    );
}
