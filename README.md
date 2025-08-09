# NMAP Command Generator

## Overview
The NMAP Command Generator is a web application designed to simplify the creation of NMAP commands for network scanning. Built with React, it offers an intuitive interface with three distinct modes—Basic, Advanced, and NSE—to cater to users of varying expertise. The application features a modern glassmorphism design with a sticky header and footer, and a dynamic background with animated pastel circles.

- **Repository**: [https://github.com/AbdulAHAD968/NMAP-COMMAND-GENERATOR](https://github.com/AbdulAHAD968/NMAP-COMMAND-GENERATOR)
- **Live Site**: [https://nmap-delta.vercel.app/](https://nmap-delta.vercel.app/)

## Features
The application provides three modes for generating NMAP commands:
1. **Basic Mode**: Offers a selection of commonly used NMAP commands for quick and straightforward network scanning, suitable for beginners.
2. **Advanced Mode**: Allows customization of NMAP flags, including options for OS detection, verbosity levels, and scan speed, catering to experienced users who need fine-grained control.
3. **NSE Mode**: Enables the use of NMAP Scripting Engine (NSE) scripts for advanced scanning tasks, such as vulnerability detection and service enumeration.

Additional features include:
- A responsive, glassmorphism-inspired UI with a sticky header and footer for seamless navigation.
- An IP input field for specifying target addresses.
- A visually appealing background with animated pastel circles in all four corners, enhancing the user experience.
- Customizable text selection colors that match the pastel theme.

## Installation
To run the NMAP Command Generator locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AbdulAHAD968/NMAP-COMMAND-GENERATOR.git
   cd NMAP-COMMAND-GENERATOR
   ```

2. **Install Dependencies**:
   Ensure you have [Node.js](https://nodejs.org/) installed, then run:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`.

## Usage
1. **Access the Application**: Open the live site at [https://nmap-delta.vercel.app/](https://nmap-delta.vercel.app/) or run it locally.
2. **Enter an IP Address**: Use the IP input field to specify the target for scanning.
3. **Select a Mode**:
   - **Basic**: Choose from pre-configured common NMAP commands.
   - **Advanced**: Customize flags for OS detection, verbosity, or scan speed.
   - **NSE**: Select and configure NSE scripts for advanced scanning.
4. **Generate and Copy**: The application generates the corresponding NMAP command, which can be copied and used in a terminal.

## Technologies
- **Frontend**: React, JavaScript, HTML, CSS
- **Styling**: Custom CSS with glassmorphism design, sticky header/footer, and animated background elements
- **Deployment**: Vercel
- **Context Management**: React Context API for IP input state management

## Project Structure
```
NMAP-COMMAND-GENERATOR/
├── src/
│   ├── components/
│   │   ├── Footer.js        # Sticky footer with glassmorphism styling
│   │   ├── Header.js        # Sticky header with glassmorphism styling
│   │   ├── IpInput.js       # Input field for target IP address
│   │   ├── Tabs.js          # Tabbed interface for Basic, Advanced, NSE modes
│   ├── contexts/
│   │   ├── IpContext.js     # Context for managing IP input state
│   ├── styles/
│   │   ├── App.css          # Main styles including header, footer, and background circles
│   │   ├── SimpleMode.css   # Styles for Basic mode
│   │   ├── AdvanceMode.css  # Styles for Advanced mode
│   │   ├── NSEmode.css      # Styles for NSE mode
│   │   ├── ip-input.css     # Styles for IP input component
│   ├── App.js               # Main application component
├── public/
│   ├── index.html           # HTML entry point
├── package.json             # Project dependencies and scripts
├── README.md                # This file
```

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request with a detailed description of your changes.

Please ensure your code adheres to the existing coding style and includes relevant tests.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author
Created by Abdul Ahad, 2025.
