import { useState } from 'react'
import './index.css'
import { Input } from "@/components/ui/input"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <Input type="email" placeholder="Email" />
    </>
  )
}

export default App
