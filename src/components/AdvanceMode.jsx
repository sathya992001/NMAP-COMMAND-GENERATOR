import { useState, useEffect } from 'react'
import { FaCopy } from 'react-icons/fa'

const AdvanceMode = () => {
  const [ip, setIp] = useState('')
  const [scanType, setScanType] = useState('sS')
  const [hostDiscovery, setHostDiscovery] = useState({
    sL: false,
    sn: false,
    Pn: false,
    traceroute: false
  })
  const [miscOptions, setMiscOptions] = useState({
    sV: false,
    sC: false,
    O: false,
    A: false,
    v: false,
    ipv6: false
  })
  const [portOption, setPortOption] = useState('1000')
  const [customPorts, setCustomPorts] = useState('')
  const [excludePorts, setExcludePorts] = useState('')
  const [excludePortsEnabled, setExcludePortsEnabled] = useState(false)
  const [sequentialScan, setSequentialScan] = useState(false)
  const [timing, setTiming] = useState('T4')
  const [outputFormat, setOutputFormat] = useState('DOutput')
  const [outputName, setOutputName] = useState('')
  const [command, setCommand] = useState('')

  

  useEffect(() => {
    // Get IP from input field
    const ipInput = document.getElementById('IP')
    if (ipInput) {
      setIp(ipInput.value)
      // Watch for changes in IP input
      const observer = new MutationObserver(() => {
        setIp(ipInput.value)
      })
      observer.observe(ipInput, { attributes: true, childList: true, subtree: true })
      return () => observer.disconnect()
    }
  }, [])

  useEffect(() => {
    generateCommand()
  }, [
    ip, scanType, hostDiscovery, miscOptions, portOption, customPorts, 
    excludePorts, excludePortsEnabled, sequentialScan, timing, 
    outputFormat, outputName
  ])

  const generateCommand = () => {
    let cmd = 'nmap'

    // Timing
    if (timing !== 'T0') cmd += ` -${timing}`

    // Host Discovery
    if (hostDiscovery.sL) cmd += ' -sL'
    if (hostDiscovery.sn) cmd += ' -sn'
    if (hostDiscovery.Pn) cmd += ' -Pn'
    if (hostDiscovery.traceroute) cmd += ' --traceroute'

    // Scan Type
    cmd += ` -${scanType}`

    // Misc Options
    if (miscOptions.sV) cmd += ' -sV'
    if (miscOptions.sC) cmd += ' -sC'
    if (miscOptions.O) cmd += ' -O'
    if (miscOptions.A) cmd += ' -A'
    if (miscOptions.v) cmd += ' -v'
    if (miscOptions.ipv6) cmd += ' -6'

    // Port Options
    if (portOption === 'Full'){
      cmd += ' -p-'
    }
    else if (portOption === 'Custom' && customPorts){
      cmd += ` -p ${customPorts}`
    }

    // Exclude Ports
    if (excludePortsEnabled && excludePorts){
      cmd += ` --exclude-ports ${excludePorts}`
    }

    // Sequential Scan
    if (sequentialScan){
      cmd += ' -r'
    }

    // Output Format
    if (outputFormat === 'oN'){
      cmd += ` -oN ${outputName || 'output.nmap'}`
    }
    else if (outputFormat === 'oX') {
      cmd += ` -oX ${outputName || 'output.xml'}`
    }

    else if (outputFormat === 'oS'){
      cmd += ` -oS ${outputName || 'output.script'}`
    }
    else if (outputFormat === 'oG') {
      cmd += ` -oG ${outputName || 'output.grep'}`
    }
    else if (outputFormat === 'oA') {
      cmd += ` -oA ${outputName || 'output'}`
    }

    // Target IP
    cmd += ` ${ip || '<IP>'}`

    setCommand(cmd)
  }

  const handleHostDiscoveryChange = (option) => {
    setHostDiscovery(prev => ({
      ...prev,
      [option]: !prev[option]
    }))
  }

  const handleMiscOptionChange = (option) => {
    setMiscOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }))
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command);
    
    const feedback = document.createElement('div');
    feedback.className = 'copy-feedback';
    feedback.textContent = 'Command copied!';
    document.body.appendChild(feedback);
    
    feedback.style.display = 'block';
    
    setTimeout(() => {
      feedback.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(feedback);
      }, 300);
    }, 2000);
  }

  return (
    <>
      <h3>Advance Scan Commands</h3>
      <div className="center">
        <div className="container text-start">
          <div className="row">
            {/* Host Discovery */}
            <div className="col">
              <h4>Host Discovery</h4>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={hostDiscovery.sL}
                  onChange={() => handleHostDiscoveryChange('sL')}
                />
                <label className="form-check-label">List Scan</label>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={hostDiscovery.sn}
                  onChange={() => handleHostDiscoveryChange('sn')}
                />
                <label className="form-check-label">Disable Port Scan</label>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={hostDiscovery.Pn}
                  onChange={() => handleHostDiscoveryChange('Pn')}
                />
                <label className="form-check-label">Treat hosts as online</label>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={hostDiscovery.traceroute}
                  onChange={() => handleHostDiscoveryChange('traceroute')}
                />
                <label className="form-check-label">Traceroute</label>
              </div>
            </div>

            {/* Scan Technique */}
            <div className="col">
              <h4>Scan Technique</h4>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="scanType"
                  id="sS"
                  checked={scanType === 'sS'}
                  onChange={() => setScanType('sS')}
                />
                <label className="form-check-label" htmlFor="sS">Stealth Scan (Default)</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="scanType"
                  id="sT"
                  checked={scanType === 'sT'}
                  onChange={() => setScanType('sT')}
                />
                <label className="form-check-label" htmlFor="sT">Full TCP Scan</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="scanType"
                  id="sW"
                  checked={scanType === 'sW'}
                  onChange={() => setScanType('sW')}
                />
                <label className="form-check-label" htmlFor="sW">Windows Scan</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="scanType"
                  id="sN"
                  checked={scanType === 'sN'}
                  onChange={() => setScanType('sN')}
                />
                <label className="form-check-label" htmlFor="sN">TCP Null Scan</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="scanType"
                  id="sF"
                  checked={scanType === 'sF'}
                  onChange={() => setScanType('sF')}
                />
                <label className="form-check-label" htmlFor="sF">FIN Scan</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="scanType"
                  id="sX"
                  checked={scanType === 'sX'}
                  onChange={() => setScanType('sX')}
                />
                <label className="form-check-label" htmlFor="sX">Xmas Scan</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="scanType"
                  id="sO"
                  checked={scanType === 'sO'}
                  onChange={() => setScanType('sO')}
                />
                <label className="form-check-label" htmlFor="sO">IP protocol Scan</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="scanType"
                  id="sU"
                  checked={scanType === 'sU'}
                  onChange={() => setScanType('sU')}
                />
                <label className="form-check-label" htmlFor="sU">UDP Scan</label>
              </div>
            </div>

            {/* Misc */}
            <div className="col">
              <h4>Misc</h4>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={miscOptions.sV}
                  onChange={() => handleMiscOptionChange('sV')}
                />
                <label className="form-check-label">Service detection</label>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={miscOptions.sC}
                  onChange={() => handleMiscOptionChange('sC')}
                />
                <label className="form-check-label">Default Script Scan</label>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={miscOptions.O}
                  onChange={() => handleMiscOptionChange('O')}
                />
                <label className="form-check-label">OS detection</label>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={miscOptions.A}
                  onChange={() => handleMiscOptionChange('A')}
                />
                <label className="form-check-label">All (OS detection, version detection, script scan and traceroute)</label>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={miscOptions.ipv6}
                  onChange={() => handleMiscOptionChange('ipv6')}
                />
                <label className="form-check-label">IPv6 Scan</label>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={miscOptions.v}
                  onChange={() => handleMiscOptionChange('v')}
                />
                <label className="form-check-label">Verbosity</label>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Port Specification */}
            <div className="col">
              <h4>Port Specification</h4>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="portOption"
                  id="Full-Port"
                  checked={portOption === 'Full'}
                  onChange={() => setPortOption('Full')}
                />
                <label className="form-check-label" htmlFor="Full-Port">Full Port</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="portOption"
                  id="1000-Port"
                  checked={portOption === '1000'}
                  onChange={() => setPortOption('1000')}
                />
                <label className="form-check-label" htmlFor="1000-Port">Top 1000 Common Port</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="portOption"
                  id="Custom-Port"
                  checked={portOption === 'Custom'}
                  onChange={() => setPortOption('Custom')}
                />
                <label className="form-check-label" htmlFor="Custom-Port">Custom Port</label>
              </div>
              <input
                className="form-control"
                id="Port-Number"
                type="text"
                value={customPorts}
                onChange={(e) => setCustomPorts(e.target.value)}
                disabled={portOption !== 'Custom'}
              />
              <div className="explanation">
                * Multiple port example: 22,80<br />
                * Range example: 1-1000
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={excludePortsEnabled}
                  onChange={() => setExcludePortsEnabled(!excludePortsEnabled)}
                />
                <label className="form-check-label">Exclude Port</label>
              </div>
              <input
                className="form-control"
                id="Exclude-Port-Number"
                type="text"
                value={excludePorts}
                onChange={(e) => setExcludePorts(e.target.value)}
                disabled={!excludePortsEnabled}
              />
              <div className="explanation">
                * Multiple port example: 22,80<br />
                * Range example: 1-1000
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={sequentialScan}
                  onChange={() => setSequentialScan(!sequentialScan)}
                />
                <label className="form-check-label">Scan port sequentially</label>
              </div>
            </div>

            {/* Timing and Performance */}
            <div className="col">
              <h4>Timing and Performance</h4>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="timing"
                  id="T0"
                  checked={timing === 'T0'}
                  onChange={() => setTiming('T0')}
                />
                <label className="form-check-label" htmlFor="T0">Disable Timing Template</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="timing"
                  id="T1"
                  checked={timing === 'T1'}
                  onChange={() => setTiming('T1')}
                />
                <label className="form-check-label" htmlFor="T1">1</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="timing"
                  id="T2"
                  checked={timing === 'T2'}
                  onChange={() => setTiming('T2')}
                />
                <label className="form-check-label" htmlFor="T2">2</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="timing"
                  id="T3"
                  checked={timing === 'T3'}
                  onChange={() => setTiming('T3')}
                />
                <label className="form-check-label" htmlFor="T3">3</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="timing"
                  id="T4"
                  checked={timing === 'T4'}
                  onChange={() => setTiming('T4')}
                />
                <label className="form-check-label" htmlFor="T4">4 (Recommended)</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="timing"
                  id="T5"
                  checked={timing === 'T5'}
                  onChange={() => setTiming('T5')}
                />
                <label className="form-check-label" htmlFor="T5">5</label>
              </div>
              <div className="explanation">* Higher number scan faster</div>
            </div>

            {/* File Output */}
            <div className="col">
              <h4>File Output</h4>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="outputFormat"
                  id="DOutput"
                  checked={outputFormat === 'DOutput'}
                  onChange={() => setOutputFormat('DOutput')}
                />
                <label className="form-check-label" htmlFor="DOutput">Disable File Output</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="outputFormat"
                  id="oN"
                  checked={outputFormat === 'oN'}
                  onChange={() => setOutputFormat('oN')}
                />
                <label className="form-check-label" htmlFor="oN">Normal Output</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="outputFormat"
                  id="oX"
                  checked={outputFormat === 'oX'}
                  onChange={() => setOutputFormat('oX')}
                />
                <label className="form-check-label" htmlFor="oX">XML Output</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="outputFormat"
                  id="oS"
                  checked={outputFormat === 'oS'}
                  onChange={() => setOutputFormat('oS')}
                />
                <label className="form-check-label" htmlFor="oS">Script Output</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="outputFormat"
                  id="oG"
                  checked={outputFormat === 'oG'}
                  onChange={() => setOutputFormat('oG')}
                />
                <label className="form-check-label" htmlFor="oG">Grepable Output</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="outputFormat"
                  id="oA"
                  checked={outputFormat === 'oA'}
                  onChange={() => setOutputFormat('oA')}
                />
                <label className="form-check-label" htmlFor="oA">
                  3 different output in Normal, XML and Grepable format
                </label>
              </div>
              <input
                className="form-control"
                id="Output-Name"
                type="text"
                value={outputName}
                onChange={(e) => setOutputName(e.target.value)}
                disabled={outputFormat === 'DOutput'}
                placeholder={outputFormat === 'DOutput' ? '' : 'output'}
              />
              <div className="explanation">* Output File Name</div>
            </div>
          </div>
        </div>

        {/* Advance Nmap Command */}
        <div className="input-group">
          <span className="input-group-text">Result:</span>
          <input
            type="text"
            className="form-control-plaintext"
            id="Advance-Nmap"
            value={command}
            readOnly
          />
          <button className="btn" onClick={copyToClipboard}>
            <FaCopy /> Copy
          </button>
        </div>
      </div>
    </>
  )
}

export default AdvanceMode