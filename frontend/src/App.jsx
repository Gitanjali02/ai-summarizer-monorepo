import { useState } from 'react'
import FileUpload from './components/FileUpload'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <FileUpload />
      </div>
    </>
  )
}

export default App
