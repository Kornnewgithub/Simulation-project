import { useState } from 'react';
import SimulationPage from './components/SimulationPage';
import ResultPage from './components/ResultPage';

function App() {
  const [selectedTab, setSelectedTab] = useState('simulation');
  const [resultData, setResultData] = useState(null); // ← เก็บข้อมูล simulation

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="flex justify-center items-center px-8 py-4 bg-gray-800 text-white shadow space-x-4">
        <button onClick={() => setSelectedTab('welcome')}>Welcome</button>
        <button onClick={() => setSelectedTab('simulation')}>Simulation</button>
        <button onClick={() => setSelectedTab('result')}>Result</button>
      </div>

      {selectedTab === 'welcome' && <div className="p-8 text-center">ยินดีต้อนรับ</div>}
      {selectedTab === 'simulation' && (
        <SimulationPage setResultData={setResultData} />
      )}
      {selectedTab === 'result' && (
        <ResultPage result={resultData} />
      )}
    </div>
  );
}

export default App;