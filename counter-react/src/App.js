import React, { useState } from 'react';
import './App.css';
function App() {
  const [count, setCount] = useState(0);
  const updateColor = () => count > 0 ? 'green' : count === 0 ? 'black' : 'red';
  return (
    <div>
      <h1 className='title'>Counter</h1>
      <h1 className='count' style={{ color: updateColor() }}>{count}</h1>
      <div className='container'>
        <button onClick={() => setCount(count - 1)} className="btn">Decrease</button>
        <button onClick={() => setCount(0)} className="btn">Reset</button>
        <button onClick={() => setCount(count + 1)} className="btn">Increase</button>
      </div>
    </div>
  );
}
export default App;
