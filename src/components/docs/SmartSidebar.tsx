import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, FileText, Folder, FolderOpen, PlayCircle, ClipboardList, BookOpen, Circle } from 'lucide-react';

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
    pathPrefix?: string;
}

const SidebarItem = ({ item, currentSlug, level = 0, baseUrl, pathPrefix = "docs/" }: { item: NavNode, currentSlug: string, level?: number, baseUrl: string, pathPrefix?: string }) => {
    // Determine strict active state
    const isActive = currentSlug === item.path ||
        (currentSlug === "" && item.path === "index") ||
        currentSlug === item.path + "/index";

    const isInActivePath = currentSlug.startsWith(item.path + '/') || isActive;
    const [isOpen, setIsOpen] = useState(isInActivePath);

    useEffect(() => {
        if (isInActivePath) setIsOpen(true);
    }, [currentSlug, item.path]);

    const hasChildren = item.children && item.children.length > 0;
    const isLeaf = !hasChildren;

    const toggleOpen = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    // Icon selection logic based on title/metadata
    const getIcon = () => {
        if (!isLeaf) {
            return isOpen ? <FolderOpen size={16} className="text-blue-500" /> : <Folder size={16} className="text-slate-400 dark:text-neutral-500" />;
        }

        const type = item.doc?.data?.type?.toLowerCase() || '';
        const title = item.title?.toLowerCase() || '';

        if (type === 'video' || title.startsWith('l')) {
            return <PlayCircle size={16} className={isActive ? 'text-blue-500' : 'text-slate-400 dark:text-neutral-500'} />;
        }
        if (type === 'assignment' || title.startsWith('aq') || title.includes('activity')) {
            return <ClipboardList size={16} className={isActive ? 'text-amber-500' : 'text-slate-400 dark:text-neutral-500'} />;
        }
        if (title.includes('introduction') || title.includes('conduct') || title.includes('rules')) {
            return <Circle size={10} className={isActive ? 'text-blue-500 fill-blue-500' : 'text-slate-300 dark:text-neutral-700'} />;
        }

        return <FileText size={16} className={isActive ? 'text-blue-500' : 'text-slate-400 dark:text-neutral-500'} />;
    };

    return (
        <li className="select-none list-none">
            <div
                className={`group flex items-center justify-between px-3 py-2 my-0.5 rounded-lg text-sm transition-all duration-200 cursor-pointer ${isActive
                    ? 'bg-blue-500/15 text-blue-400 font-semibold dark:text-neutral-100'
                    : 'text-slate-600 dark:text-neutral-300 hover:bg-slate-200/50 dark:hover:bg-neutral-800/80 dark:hover:text-neutral-100'
                    }`}
                onClick={(e) => !item.doc && toggleOpen(e)}
            >
                {/* Content Link */}
                {item.doc ? (
                    <a
                        href={`${baseUrl}${pathPrefix}${item.path === "index" ? "" : item.path.replace(/\/index$/, '')}`}
                        className="flex-1 flex items-center gap-3 truncate"
                    >
                        <span className="flex-shrink-0 flex items-center justify-center w-5">
                            {getIcon()}
                        </span>
                        <span className={`truncate ${isActive ? 'text-blue-600 dark:text-neutral-50' : ''}`}>{item.title}</span>
                    </a>
                ) : (
                    <div className="flex-1 flex items-center gap-3 truncate" onClick={toggleOpen}>
                        <span className="flex-shrink-0 flex items-center justify-center w-5">
                            {getIcon()}
                        </span>
                        <span className={`font-semibold truncate ${isActive ? 'text-blue-600 dark:text-neutral-50' : ''}`}>{item.title}</span>
                    </div>
                )}

                {/* Chevron */}
                {hasChildren && (
                    <button
                        onClick={toggleOpen}
                        className={`p-1 rounded-md hover:bg-slate-300/50 dark:hover:bg-neutral-700/50 transition-colors ${isOpen ? 'text-slate-700 dark:text-neutral-200' : 'text-slate-400'}`}
                    >
                        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                )}
            </div>

            {/* Nested Items */}
            {hasChildren && isOpen && (
                <ul className="ml-4 space-y-0.5 mt-0.5 mb-1">
                    {item.children.map(child => (
                        <SidebarItem
                            key={child.path}
                            item={child}
                            currentSlug={currentSlug}
                            level={level + 1}
                            baseUrl={baseUrl}
                            pathPrefix={pathPrefix}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default function SmartSidebar({ menu, currentSlug, baseUrl, pathPrefix = "docs/" }: SmartSidebarProps) {
    return (
        <nav className="pb-4">
            <ul className="space-y-0 p-0 m-0">
                {menu.map(item => (
                    <SidebarItem
                        key={item.path}
                        item={item}
                        currentSlug={currentSlug}
                        baseUrl={baseUrl}
                        pathPrefix={pathPrefix}
                    />
                ))}
            </ul>
        </nav>
    );
}
