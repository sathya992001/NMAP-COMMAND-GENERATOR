import { useState, useEffect } from 'react';
import React from 'react';
import { FaCopy, FaInfoCircle, FaChevronDown, FaChevronUp, FaRedo } from 'react-icons/fa';

import '../styles/NSEmode.css';

// NSE Categories and Scripts Data
const nseCategories = [
  {
    id: 'auth',
    name: 'Authentication',
    scripts: [
      { 
        id: 'http-auth', 
        name: 'http-auth', 
        summary: 'Attempts to determine the authentication scheme and credentials for HTTP services.', 
        link: 'https://nmap.org/nsedoc/scripts/http-auth.html',
        example: 'nmap --script http-auth -p 80,443 192.168.1.1'
      },
      { 
        id: 'ftp-anon', 
        name: 'ftp-anon', 
        summary: 'Checks if an FTP server allows anonymous logins.', 
        link: 'https://nmap.org/nsedoc/scripts/ftp-anon.html',
        example: 'nmap --script ftp-anon -p 21 192.168.1.1'
      },
      { 
        id: 'ssh-auth-methods', 
        name: 'ssh-auth-methods', 
        summary: 'Reports authentication methods supported by SSH servers.', 
        link: 'https://nmap.org/nsedoc/scripts/ssh-auth-methods.html',
        example: 'nmap --script ssh-auth-methods -p 22 192.168.1.1'
      },
      { 
        id: 'smb-security-mode', 
        name: 'smb-security-mode', 
        summary: 'Determines SMB security level and authentication.', 
        link: 'https://nmap.org/nsedoc/scripts/smb-security-mode.html',
        example: 'nmap --script smb-security-mode -p 445 192.168.1.1'
      }
    ]
  },
  {
    id: 'discovery',
    name: 'Discovery',
    scripts: [
      { 
        id: 'http-title', 
        name: 'http-title', 
        summary: 'Retrieves the title of web pages.', 
        link: 'https://nmap.org/nsedoc/scripts/http-title.html',
        example: 'nmap --script http-title -p 80,443 192.168.1.1'
      },
      { 
        id: 'dns-brute', 
        name: 'dns-brute', 
        summary: 'Performs DNS brute force hostname discovery.', 
        link: 'https://nmap.org/nsedoc/scripts/dns-brute.html',
        example: 'nmap --script dns-brute 192.168.1.1'
      },
      { 
        id: 'smb-os-discovery', 
        name: 'smb-os-discovery', 
        summary: 'Attempts to determine OS, computer name, domain, etc. via SMB.', 
        link: 'https://nmap.org/nsedoc/scripts/smb-os-discovery.html',
        example: 'nmap --script smb-os-discovery -p 445 192.168.1.1'
      },
      { 
        id: 'snmp-info', 
        name: 'snmp-info', 
        summary: 'Extracts information from SNMP devices.', 
        link: 'https://nmap.org/nsedoc/scripts/snmp-info.html',
        example: 'nmap --script snmp-info -p 161 192.168.1.1'
      }
    ]
  },
  {
    id: 'exploit',
    name: 'Exploit',
    scripts: [
      { 
        id: 'http-vuln-cve2017-5638', 
        name: 'http-vuln-cve2017-5638', 
        summary: 'Detects Apache Struts vulnerability (CVE-2017-5638).', 
        link: 'https://nmap.org/nsedoc/scripts/http-vuln-cve2017-5638.html',
        example: 'nmap --script http-vuln-cve2017-5638 -p 80,443 192.168.1.1'
      },
      { 
        id: 'smb-vuln-ms17-010', 
        name: 'smb-vuln-ms17-010', 
        summary: 'Detects MS17-010 vulnerability (EternalBlue).', 
        link: 'https://nmap.org/nsedoc/scripts/smb-vuln-ms17-010.html',
        example: 'nmap --script smb-vuln-ms17-010 -p 445 192.168.1.1'
      },
      { 
        id: 'http-vuln-cve2014-3704', 
        name: 'http-vuln-cve2014-3704', 
        summary: 'Detects Drupal SQL injection vulnerability (CVE-2014-3704).', 
        link: 'https://nmap.org/nsedoc/scripts/http-vuln-cve2014-3704.html',
        example: 'nmap --script http-vuln-cve2014-3704 -p 80,443 192.168.1.1'
      }
    ]
  },
  {
    id: 'vuln',
    name: 'Vulnerability',
    scripts: [
      { 
        id: 'ssl-heartbleed', 
        name: 'ssl-heartbleed', 
        summary: 'Detects the OpenSSL Heartbleed vulnerability (CVE-2014-0160).', 
        link: 'https://nmap.org/nsedoc/scripts/ssl-heartbleed.html',
        example: 'nmap --script ssl-heartbleed -p 443 192.168.1.1'
      },
      { 
        id: 'http-slowloris', 
        name: 'http-slowloris', 
        summary: 'Tests a web server for vulnerability to the Slowloris DoS attack.', 
        link: 'https://nmap.org/nsedoc/scripts/http-slowloris.html',
        example: 'nmap --script http-slowloris -p 80,443 192.168.1.1'
      },
      { 
        id: 'http-vuln-cve2011-3192', 
        name: 'http-vuln-cve2011-3192', 
        summary: 'Detects Apache Range header DoS vulnerability (CVE-2011-3192).', 
        link: 'https://nmap.org/nsedoc/scripts/http-vuln-cve2011-3192.html',
        example: 'nmap --script http-vuln-cve2011-3192 -p 80,443 192.168.1.1'
      },
      { 
        id: 'smb-vuln-cve2009-3103', 
        name: 'smb-vuln-cve2009-3103', 
        summary: 'Detects SMB vulnerability (CVE-2009-3103).', 
        link: 'https://nmap.org/nsedoc/scripts/smb-vuln-cve2009-3103.html',
        example: 'nmap --script smb-vuln-cve2009-3103 -p 445 192.168.1.1'
      }
    ]
  },
  {
    id: 'safe',
    name: 'Safe',
    scripts: [
      { 
        id: 'http-robots.txt', 
        name: 'http-robots.txt', 
        summary: 'Checks for robots.txt files on web servers.', 
        link: 'https://nmap.org/nsedoc/scripts/http-robots.txt.html',
        example: 'nmap --script http-robots.txt -p 80,443 192.168.1.1'
      },
      { 
        id: 'whois-ip', 
        name: 'whois-ip', 
        summary: 'Performs WHOIS queries for IP addresses.', 
        link: 'https://nmap.org/nsedoc/scripts/whois-ip.html',
        example: 'nmap --script whois-ip 192.168.1.1'
      }
    ]
  },
  {
    id: 'intrusive',
    name: 'Intrusive',
    scripts: [
      { 
        id: 'http-sql-injection', 
        name: 'http-sql-injection', 
        summary: 'Checks for SQL injection vulnerabilities in web applications.', 
        link: 'https://nmap.org/nsedoc/scripts/http-sql-injection.html',
        example: 'nmap --script http-sql-injection -p 80,443 192.168.1.1'
      },
      { 
        id: 'http-wordpress-brute', 
        name: 'http-wordpress-brute', 
        summary: 'Performs brute force password auditing against WordPress installations.', 
        link: 'https://nmap.org/nsedoc/scripts/http-wordpress-brute.html',
        example: 'nmap --script http-wordpress-brute --script-args http-wordpress-brute.uri="/wp-login.php" -p 80,443 192.168.1.1'
      }
    ]
  },
  {
    id: 'malware',
    name: 'Malware',
    scripts: [
      { 
        id: 'smb-vuln-conficker', 
        name: 'smb-vuln-conficker', 
        summary: 'Detects Conficker worm infection.', 
        link: 'https://nmap.org/nsedoc/scripts/smb-vuln-conficker.html',
        example: 'nmap --script smb-vuln-conficker -p 445 192.168.1.1'
      },
      { 
        id: 'http-malware-host', 
        name: 'http-malware-host', 
        summary: 'Checks if a web server is hosting malware.', 
        link: 'https://nmap.org/nsedoc/scripts/http-malware-host.html',
        example: 'nmap --script http-malware-host -p 80,443 192.168.1.1'
      }
    ]
  },
  {
    id: 'version',
    name: 'Version Detection',
    scripts: [
      { 
        id: 'ssl-cert', 
        name: 'ssl-cert', 
        summary: 'Retrieves SSL certificates.', 
        link: 'https://nmap.org/nsedoc/scripts/ssl-cert.html',
        example: 'nmap --script ssl-cert -p 443 192.168.1.1'
      },
      { 
        id: 'http-server-header', 
        name: 'http-server-header', 
        summary: 'Retrieves web server headers.', 
        link: 'https://nmap.org/nsedoc/scripts/http-server-header.html',
        example: 'nmap --script http-server-header -p 80,443 192.168.1.1'
      }
    ]
  },
  {
    id: 'brute',
    name: 'Brute Force',
    scripts: [
      { 
        id: 'ftp-brute', 
        name: 'ftp-brute', 
        summary: 'Performs brute force password auditing against FTP servers.', 
        link: 'https://nmap.org/nsedoc/scripts/ftp-brute.html',
        example: 'nmap --script ftp-brute --script-args userdb=users.txt,passdb=passwords.txt -p 21 192.168.1.1'
      },
      { 
        id: 'ssh-brute', 
        name: 'ssh-brute', 
        summary: 'Performs brute force password auditing against SSH servers.', 
        link: 'https://nmap.org/nsedoc/scripts/ssh-brute.html',
        example: 'nmap --script ssh-brute --script-args userdb=users.txt,passdb=passwords.txt -p 22 192.168.1.1'
      }
    ]
  }
];

// NSE Context for state management
const NSEContext = React.createContext();

const NSEProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedScript, setSelectedScript] = useState('');
  const [specificPortEnabled, setSpecificPortEnabled] = useState(false);
  const [specificPorts, setSpecificPorts] = useState('');
  const [scriptArguments, setScriptArguments] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [targetIP, setTargetIP] = useState('');

  const resetForm = () => {
    setSelectedCategory('');
    setSelectedScript('');
    setSpecificPortEnabled(false);
    setSpecificPorts('');
    setScriptArguments('');
    setTargetIP('');
  };

  const value = {
    selectedCategory,
    setSelectedCategory,
    selectedScript,
    setSelectedScript,
    specificPortEnabled,
    setSpecificPortEnabled,
    specificPorts,
    setSpecificPorts,
    scriptArguments,
    setScriptArguments,
    showAdvanced,
    setShowAdvanced,
    targetIP,
    setTargetIP,
    resetForm
  };

  return <NSEContext.Provider value={value}>{children}</NSEContext.Provider>;
};

const useNSE = () => {
  const context = React.useContext(NSEContext);
  if (!context) {
    throw new Error('useNSE must be used within a NSEProvider');
  }
  return context;
};

// Helper functions
const getCurrentScript = (selectedCategory, selectedScript) => {
  if (!selectedCategory || !selectedScript) return null;
  const category = nseCategories.find(cat => cat.id === selectedCategory);
  return category?.scripts.find(scr => scr.id === selectedScript) || null;
};

const generateCommand = ({
  selectedScript,
  specificPortEnabled,
  specificPorts,
  scriptArguments,
  targetIP
}) => {
  if (!selectedScript) return '';

  let cmd = 'nmap --script ' + selectedScript;

  if (scriptArguments) {
    cmd += ` --script-args ${scriptArguments}`;
  }

  if (specificPortEnabled && specificPorts) {
    cmd += ` -p ${specificPorts}`;
  }

  cmd += ` ${targetIP || '<IP>'}`;

  return cmd;
};

// Main Components
const NSEmode = () => {
  return (
    <NSEProvider>
      <div className="container mt-4">
        <h3 className="mb-4">Nmap Scripting Engine (NSE) Mode</h3>
        <div className="row">
          <div className="col-md-6">
            <NSEForm />
          </div>
          <div className="col-md-6">
            <NSEDocumentation />
            <NSECommand />
          </div>
        </div>
      </div>
    </NSEProvider>
  );
};

const NSEForm = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedScript,
    setSelectedScript,
    specificPortEnabled,
    setSpecificPortEnabled,
    specificPorts,
    setSpecificPorts,
    scriptArguments,
    setScriptArguments,
    showAdvanced,
    setShowAdvanced,
    targetIP,
    setTargetIP,
    resetForm
  } = useNSE();

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h5>Script Configuration</h5>
      </div>
      <div className="card-body">
        <CategorySelect 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory}
          setSelectedScript={setSelectedScript}
        />
        
        <ScriptSelect 
          selectedCategory={selectedCategory} 
          selectedScript={selectedScript}
          setSelectedScript={setSelectedScript}
        />
        
        <TargetInput 
          targetIP={targetIP}
          setTargetIP={setTargetIP}
        />
        
        <AdvancedOptionsToggle 
          showAdvanced={showAdvanced}
          setShowAdvanced={setShowAdvanced}
        />
        
        {showAdvanced && (
          <AdvancedOptions
            specificPortEnabled={specificPortEnabled}
            setSpecificPortEnabled={setSpecificPortEnabled}
            specificPorts={specificPorts}
            setSpecificPorts={setSpecificPorts}
            scriptArguments={scriptArguments}
            setScriptArguments={setScriptArguments}
          />
        )}
        
        <FormActions 
          resetForm={resetForm}
        />
      </div>
    </div>
  );
};

const CategorySelect = ({ selectedCategory, setSelectedCategory, setSelectedScript }) => {
  return (
    <div className="mb-3">
      <label htmlFor="NSE-Category" className="form-label">NSE Category</label>
      <select
        className="form-select"
        id="NSE-Category"
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          setSelectedScript('');
        }}
      >
        <option value="">Select a category</option>
        {nseCategories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
    </div>
  );
};

const ScriptSelect = ({ selectedCategory, selectedScript, setSelectedScript }) => {
  const category = nseCategories.find(cat => cat.id === selectedCategory);
  
  return (
    <div className="mb-3">
      <label htmlFor="NSE-Specific" className="form-label">NSE Script</label>
      <select
        className="form-select"
        id="NSE-Specific"
        value={selectedScript}
        onChange={(e) => setSelectedScript(e.target.value)}
        disabled={!selectedCategory}
      >
        <option value="">Select a script</option>
        {category?.scripts.map(script => (
          <option key={script.id} value={script.id}>{script.name}</option>
        ))}
      </select>
      {selectedCategory && !category?.scripts.length && (
        <div className="text-danger mt-1">No scripts available for this category</div>
      )}
    </div>
  );
};

const TargetInput = ({ targetIP, setTargetIP }) => {
  return (
    <div className="mb-3">
      <label htmlFor="target-ip" className="form-label">Target IP/Hostname</label>
      <input
        type="text"
        className="form-control"
        id="target-ip"
        placeholder="192.168.1.1 or scanme.nmap.org"
        value={targetIP}
        onChange={(e) => setTargetIP(e.target.value)}
      />
      <div className="form-text">
        You can specify multiple targets: 192.168.1.1-100 or 192.168.1.0/24
      </div>
    </div>
  );
};

const AdvancedOptionsToggle = ({ showAdvanced, setShowAdvanced }) => {
  return (
    <div className="mb-3">
      <button 
        className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
        onClick={() => setShowAdvanced(!showAdvanced)}
      >
        {showAdvanced ? (
          <>
            <FaChevronUp size={12} /> Hide Advanced Options
          </>
        ) : (
          <>
            <FaChevronDown size={12} /> Show Advanced Options
          </>
        )}
      </button>
    </div>
  );
};

const AdvancedOptions = ({
  specificPortEnabled,
  setSpecificPortEnabled,
  specificPorts,
  setSpecificPorts,
  scriptArguments,
  setScriptArguments
}) => {
  return (
    <div className="advanced-options p-3 bg-light rounded mb-3">
      <div className="mb-3">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="specific-port-toggle"
            checked={specificPortEnabled}
            onChange={() => setSpecificPortEnabled(!specificPortEnabled)}
          />
          <label className="form-check-label" htmlFor="specific-port-toggle">
            Scan Specific Port(s)
          </label>
        </div>
        <input
          className="form-control mt-2"
          id="NSE-Port-Number"
          type="text"
          placeholder="e.g. 80,443 or 1-1000"
          value={specificPorts}
          onChange={(e) => setSpecificPorts(e.target.value)}
          disabled={!specificPortEnabled}
        />
        <div className="form-text">
          Multiple ports: 22,80,443 | Range: 1-1000 | Top ports: --top-ports 100
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="script-args" className="form-label">Script Arguments</label>
        <input
          type="text"
          className="form-control"
          id="script-args"
          placeholder="e.g. http.useragent='Custom Agent', brute.credfile=credentials.txt"
          value={scriptArguments}
          onChange={(e) => setScriptArguments(e.target.value)}
        />
        <div className="form-text">
          Separate multiple arguments with commas. See script documentation for available arguments.
        </div>
      </div>
    </div>
  );
};

const FormActions = ({ resetForm }) => {
  return (
    <div className="d-flex justify-content-between mt-3">
      <button className="btn btn-secondary d-flex align-items-center gap-1" onClick={resetForm}>
        <FaRedo size={14} /> Reset
      </button>
      <button className="btn btn-primary">
        Generate Command
      </button>
    </div>
  );
};

const NSEDocumentation = () => {
  const { selectedCategory, selectedScript } = useNSE();
  const currentScript = getCurrentScript(selectedCategory, selectedScript);

  if (!currentScript) {
    return (
      <div className="card mb-4">
        <div className="card-body text-center text-muted">
          <h5>No script selected</h5>
          <p>Select a category and script to view documentation</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card mb-4">
      <div className="card-header bg-info text-white">
        <h5>Script Documentation: {currentScript.name}</h5>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <h6>Description</h6>
          <p>{currentScript.summary}</p>
        </div>
        
        <div className="mb-3">
          <h6>Documentation</h6>
          <a 
            href={currentScript.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1"
          >
            <FaInfoCircle /> View Official Documentation
          </a>
        </div>
        
        <ScriptWarnings script={currentScript} category={selectedCategory} />
        
        {currentScript.example && (
          <div className="mb-3">
            <h6>Example Usage</h6>
            <code className="d-block p-2 bg-dark text-white rounded">
              {currentScript.example}
            </code>
          </div>
        )}
      </div>
    </div>
  );
};

const ScriptWarnings = ({ script, category }) => {
  if (script.id === 'http-vuln-cve2017-5638') {
    return (
      <div className="alert alert-warning">
        <strong>Warning:</strong> This script may disrupt services. Use with caution in production environments.
      </div>
    );
  }
  
  if (category === 'brute') {
    return (
      <div className="alert alert-warning">
        <strong>Note:</strong> Brute force scripts may trigger account lockouts or security alerts.
        Consider using <code>unpwdb.timelimit</code> to limit attempts.
      </div>
    );
  }
  
  if (category === 'intrusive') {
    return (
      <div className="alert alert-danger">
        <strong>Warning:</strong> Intrusive scripts may be detected by security systems and could
        potentially disrupt services.
      </div>
    );
  }
  
  if (category === 'exploit') {
    return (
      <div className="alert alert-danger">
        <strong>Warning:</strong> Exploit scripts may attempt to exploit vulnerabilities and could
        cause service disruption or system crashes. Use only on systems you have permission to test.
      </div>
    );
  }
  
  return null;
};

const NSECommand = () => {
  const { 
    selectedScript, 
    specificPortEnabled, 
    specificPorts, 
    scriptArguments, 
    targetIP 
  } = useNSE();
  
  const command = generateCommand({
    selectedScript,
    specificPortEnabled,
    specificPorts,
    scriptArguments,
    targetIP
  });

  const copyToClipboard = () => {
    if (command) {
      navigator.clipboard.writeText(command);
    }
  };

  return (
    <div className="card">
      <div className="card-header bg-success text-white">
        <h5>Generated Nmap Command</h5>
      </div>
      <div className="card-body">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control font-monospace"
            value={command}
            readOnly
            aria-label="Generated nmap command"
          />
          <button 
            className="btn btn-outline-secondary d-flex align-items-center gap-1" 
            onClick={copyToClipboard}
            disabled={!command}
          >
            <FaCopy /> Copy
          </button>
        </div>
        
        {command && (
          <div className="alert alert-info">
            <small>
              <strong>Tips:</strong> 
              <ul className="mb-0 mt-1">
                <li>Add <code>-sV</code> for version detection</li>
                <li>Add <code>-A</code> for aggressive scan (OS detection, version detection, script scanning, and traceroute)</li>
                <li>Add <code>-T4</code> for faster execution (adjust timing template as needed)</li>
                <li>Add <code>-v</code> for verbose output or <code>-vv</code> for more verbose</li>
              </ul>
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default NSEmode;