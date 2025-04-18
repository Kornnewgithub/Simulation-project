import { useState } from 'react';
import SimulationPage from './components/SimulationPage';

function App() {
  const [tab, setTab] = useState('welcome');

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Header Tabs */}
      <div className="flex justify-center space-x-4 p-4 bg-gray-800 shadow-sm">
        <button
          className={`px-5 py-2 rounded-md text-sm font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            tab === 'welcome'
              ? 'bg-gray-700 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setTab('welcome')}
        >
          Welcome
        </button>
        <button
          className={`px-5 py-2 rounded-md text-sm font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            tab === 'simulation'
              ? 'bg-gray-700 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setTab('simulation')}
        >
          Simulation
        </button>
      </div>

      {/* Pages */}
      {tab === 'welcome' && (
        <div className="text-center py-20 px-4">
          <h1 className="text-3xl font-bold mb-4">เครื่องตีลูกสควอช - Simulation</h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            กดปุ่ม <strong>Simulation</strong> ด้านบนเพื่อเริ่มกรอกข้อมูลและดูผลลัพธ์การจำลองการยิงลูกแบบโค้งด้วยเครื่องกล
          </p>
        </div>
      )}

      {tab === 'simulation' && <SimulationPage />}
    </div>
  );
}

export default App;
