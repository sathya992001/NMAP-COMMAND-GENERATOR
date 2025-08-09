import { FaCopy, FaCheck, FaTimes } from 'react-icons/fa';
import { useIp } from '../contexts/IpContext';
import { useState, useEffect } from 'react';
import '../styles/ip-input.css';

const IPInputComponent = () => {
  const { ip, setIp } = useIp();
  const [copied, setCopied] = useState(false);
  const [ipVersion, setIpVersion] = useState('v4'); // 'v4' or 'v6'
  const [isValid, setIsValid] = useState(true);

  // IP validation patterns
  const ipPatterns = {
    v4: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    v6: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
    hostname: /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/
  };

  const validateIp = (address) => {
    if (!address) return true; // Empty is considered valid until submission
    return ipPatterns[ipVersion].test(address) || ipPatterns.hostname.test(address);
  };

  const handleIpChange = (e) => {
    const value = e.target.value;
    setIp(value);
    setIsValid(validateIp(value));
  };

  const copyToClipboard = () => {
    if (ip && isValid) {
      navigator.clipboard.writeText(ip);
      setCopied(true);
    }
  };

  const handleVersionChange = (version) => {
    setIpVersion(version);
    // Revalidate when version changes
    setIsValid(validateIp(ip));
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div className="ip-input-component">
      <div className="ip-input-group">
        <span className="ip-input-label">Target IP</span>
        <input
          type="text"
          className={`ip-input-field ${!isValid && ip ? 'ip-input-invalid' : ''} ${isValid && ip ? 'ip-input-valid' : ''}`}
          id="IP"
          placeholder={`Enter ${ipVersion === 'v4' ? 'IPv4' : 'IPv6'} address or hostname`}
          value={ip}
          onChange={handleIpChange}
          aria-label="IP address input"
        />
        <div className="ip-version-toggle">
          <button
            type="button"
            className={`ip-version-btn ${ipVersion === 'v4' ? 'ip-version-active' : 'ip-version-inactive'}`}
            onClick={() => handleVersionChange('v4')}
          >
            IPv4
          </button>
          <button
            type="button"
            className={`ip-version-btn ${ipVersion === 'v6' ? 'ip-version-active' : 'ip-version-inactive'}`}
            onClick={() => handleVersionChange('v6')}
          >
            IPv6
          </button>
        </div>
        <div className="ip-copy-tooltip">
          <button 
            className="ip-copy-btn" 
            onClick={copyToClipboard}
            disabled={!ip || !isValid}
            aria-label="Copy IP address"
          >
            <FaCopy className="ip-copy-icon" /> 
            <span className="ip-copy-text">{copied ? 'Copied!' : 'Copy'}</span>
          </button>
          <span className="ip-tooltip-text">Copy to clipboard</span>
        </div>
        
      </div>
      {!isValid && ip && (
        <div className="ip-feedback ip-feedback-invalid">
          <FaTimes className="ip-feedback-icon" /> 
          <span>Please enter a valid {ipVersion === 'v4' ? 'IPv4' : 'IPv6'} address or hostname</span>
        </div>
      )}
      {isValid && ip && (
        <div className="ip-feedback ip-feedback-valid">
          <FaCheck className="ip-feedback-icon" /> 
          <span>Valid {ipVersion === 'v4' ? 'IPv4' : 'IPv6'} address or hostname</span>
        </div>
      )}
    </div>
  );
};

export default IPInputComponent;