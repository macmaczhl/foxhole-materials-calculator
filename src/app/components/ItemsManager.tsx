"use client";

import { useState } from 'react';
import { TabNavigation, TabType } from './TabNavigation';
import { DesiredOutput } from './DesiredOutput';
import { ExistingItems } from './ExistingItems';

export function ItemsManager() {
  const [activeTab, setActiveTab] = useState<TabType>('desired');

  return (
    <div className="panel m-6">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'desired' ? (
        <div className="-m-6">
          <DesiredOutput />
        </div>
      ) : (
        <div className="-m-6">
          <ExistingItems />
        </div>
      )}
    </div>
  );
}
