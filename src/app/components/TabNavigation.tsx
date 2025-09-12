"use client";

export type TabType = 'desired' | 'existing';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex border-b border-neutral-700 mb-4">
      <button
        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
          activeTab === 'desired'
            ? 'border-accent-400 text-accent-300'
            : 'border-transparent text-neutral-400 hover:text-neutral-300 hover:border-neutral-600'
        }`}
        onClick={() => onTabChange('desired')}
      >
        Desired items
      </button>
      <button
        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
          activeTab === 'existing'
            ? 'border-accent-400 text-accent-300'
            : 'border-transparent text-neutral-400 hover:text-neutral-300 hover:border-neutral-600'
        }`}
        onClick={() => onTabChange('existing')}
      >
        Existing items
      </button>
    </div>
  );
}
