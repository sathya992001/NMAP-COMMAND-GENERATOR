import { useState } from 'react';
import { FaCopy, FaInfoCircle } from 'react-icons/fa';
import { createPortal } from 'react-dom';
import { useIp } from '../contexts/IpContext';
import '../styles/SimpleMode.css';

// Tooltip component rendered via portal
const Tooltip = ({ text, position }) => {
  if (!position) return null;

  return createPortal(
    <div
      className="tooltip-portal"
      style={{
        top: position.top,
        left: position.left
      }}
    >
      {text}
    </div>,
    document.body
  );
};

const CommandCard = ({ command, onCopy }) => {
  const [tooltipPos, setTooltipPos] = useState(null);

  const showTooltip = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const tooltipHeight = 50; // estimated height in px
    const verticalOffset = 10; // distance from icon

    let top, left;

    // Check if enough space above, else show below
    if (rect.top > tooltipHeight + verticalOffset) {
      top = rect.top - tooltipHeight - verticalOffset + window.scrollY;
    } else {
      top = rect.bottom + verticalOffset + window.scrollY;
    }

    // Horizontal center
    left = rect.left + rect.width / 2;

    // Clamp left/right to viewport width
    const viewportWidth = window.innerWidth;
    const maxLeft = viewportWidth - 100; // leave padding
    const minLeft = 100;
    if (left > maxLeft) left = maxLeft;
    if (left < minLeft) left = minLeft;

    setTooltipPos({ top, left });
  };

  const hideTooltip = () => setTooltipPos(null);

  return (
    <>
      <div className="command-card">
        <div className="command-header">
          <h4>{command.label}</h4>
          <span
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            style={{ position: 'relative' }}
          >
            <FaInfoCircle className="info-icon" />
          </span>
        </div>
        <div className="command-body">
          <code>{command.getCommand()}</code>
          <button
            className="copy-button"
            onClick={() => onCopy(command.getCommand())}
            aria-label="Copy command"
          >
            <FaCopy />
          </button>
        </div>
      </div>

      {/* Render tooltip outside the card */}
      <Tooltip text={command.explanation} position={tooltipPos} />
    </>
  );
};

const SimpleMode = () => {
  const { ip } = useIp();
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [notification, setNotification] = useState("");

  const commands = [
    {
      id: 'Basic-Scan',
      label: 'Basic Scan',
      getCommand: () => `nmap -T4 ${ip}`,
      explanation: 'Quick scan of the top 1000 most common ports (TCP SYN scan)'
    },
    {
      id: 'Full-Port-Scan',
      label: 'Full Port Scan',
      getCommand: () => `nmap -T4 -p- ${ip}`,
      explanation: 'Scan all 65,535 ports (takes longer but more thorough)'
    },
    {
      id: 'Default-Script-Scan',
      label: 'Script Scan',
      getCommand: () => `nmap -T4 -sC ${ip}`,
      explanation: 'Scan with default NSE scripts for vulnerability detection'
    },
    {
      id: 'Full-Scan',
      label: 'Comprehensive Scan',
      getCommand: () => `nmap -T4 -A ${ip}`,
      explanation: 'Aggressive scan with OS detection, version detection, script scanning, and traceroute'
    },
    {
      id: 'Scan-Save-Output',
      label: 'Scan with Output',
      getCommand: () => `nmap -T4 -oN scan_results.nmap ${ip}`,
      explanation: 'Save results to a file in normal format'
    },
    {
      id: 'UDP-Scan',
      label: 'UDP Scan',
      getCommand: () => `nmap -T4 -sU ${ip}`,
      explanation: 'Scan for open UDP ports (slower than TCP scans)'
    },
    {
      id: 'Quick-Scan',
      label: 'Quick Scan',
      getCommand: () => `nmap -T4 -F ${ip}`,
      explanation: 'Fast scan of only the top 100 ports'
    },
    {
      id: 'Service-Scan',
      label: 'Service Detection',
      getCommand: () => `nmap -T4 -sV ${ip}`,
      explanation: 'Detect service/version information on open ports'
    }
  ];

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setNotification("Copied to clipboard!");

      setTimeout(() => {
        setCopiedIndex(null);
        setNotification("");
      }, 2000);
    });
  };

  return (
    <div className="simple-mode-container">
      <div className="background-circles">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
      
      <div className="simple-mode-content">
        <h2 className="mode-title">Simple Scan Commands</h2>
        <p className="mode-description">
          Pre-configured Nmap commands for common scanning scenarios. 
          Click any command to copy it to your clipboard.
        </p>
        
        <div className="commands-grid">
          {commands.map((cmd, index) => (
            <CommandCard 
              key={cmd.id}
              command={cmd}
              onCopy={(text) => copyToClipboard(text, index)}
            />
          ))}
        </div>
        
        <div className="tips-section">
          <h3>Scanning Tips:</h3>
          <ul>
            <li>Start with a Basic Scan and escalate based on findings</li>
            <li>Use -T4 for faster scans on good connections (use -T3 if unstable)</li>
            <li>Add <code>-v</code> for verbose output or <code>-vv</code> for more details</li>
            <li>Consider <code>--script=safe</code> for safer script scanning</li>
          </ul>
        </div>
      </div>

      {notification && (
        <div style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          background: "#30d680ff",
          color: "#ffffffff",
          padding: "10px 15px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(83, 255, 112, 0.67)",
          fontWeight: "bold",
          zIndex: 9999,
          transition: "opacity 0.3s ease"
        }}>
          {notification}
        </div>
      )}
    </div>
  );
};

export default SimpleMode;
