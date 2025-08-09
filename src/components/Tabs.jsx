import { useState } from 'react'
import SimpleMode from './SimpleMode'
import AdvanceMode from './AdvanceMode'
import NSEmode from './NSEmode'

import '../styles/Tabs.css'

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('Simple')

  const tabs = [
    { id: 'Simple', label: 'Simple' },
    { id: 'Advance', label: 'Advance' },
    { id: 'NSE', label: 'Nmap Scripting Engine' }
  ]

  return (
    <div className="body">
      <div className="tab">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tablinks ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={`tabcontent ${activeTab === 'Simple' ? 'active' : ''}`}>
        <SimpleMode />
      </div>
      <div className={`tabcontent ${activeTab === 'Advance' ? 'active' : ''}`}>
        <AdvanceMode />
      </div>
      <div className={`tabcontent ${activeTab === 'NSE' ? 'active' : ''}`}>
        <NSEmode />
      </div>
    </div>
  )
}

export default Tabs