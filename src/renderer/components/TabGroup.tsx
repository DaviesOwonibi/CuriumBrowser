import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Tab from './Tab';

interface TabInfo {
  name: string;
  url: string;
}

interface Props {
  currentPage: string;
}

function TabGroup(props: Props) {
  // Initialize state with the default tabs and active tab index
  const [tabs, setTabs] = useState<TabInfo[]>([{ name: 'New Tab', url: '' }]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // Update the current page title when the currentPage prop changes
    if (tabs[activeTab]) {
      setTabs((prevTabs) => {
        const updatedTabs = [...prevTabs];
        updatedTabs[activeTab].url = props.currentPage;
        return updatedTabs;
      });
    }
  }, [props.currentPage, activeTab]);

  // Function to add a new tab
  const addTab = () => {
    // Update state to include the new tab
    setTabs([...tabs, { name: 'New Tab', url: '' }]);
  };

  // Function to set the active tab
  const setActive = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="tabGroup">
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          name={tab.name}
          place={index}
          onClick={() => setActive(index)}
          active={index === activeTab}
        />
      ))}
      <button type="button" onClick={addTab}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}

export default TabGroup;
