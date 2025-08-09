import { IpProvider } from './contexts/IpContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Tabs from './components/Tabs';
import IpInput from './components/IpInput';

import './App.css';
import '../src/styles/SimpleMode.css';
import '../src/styles/ip-input.css';
import '../src/styles/AdvanceMode.css';
import '../src/styles/NSEmode.css';
import '../src/styles/footer.css';

function App() {
  return (
    <IpProvider>
      <div className="App">
        <div className="circle-container"></div>
        <Header />
        <div className="center">
          <IpInput />
        </div>
        <Tabs />
        <Footer />
      </div>
    </IpProvider>
  );
}

export default App;