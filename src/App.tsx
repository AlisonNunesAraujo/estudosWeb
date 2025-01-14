import './App.css'

import { BrowserRouter } from 'react-router-dom'
import { Auth } from './routs/auth'
import { AuthProvider } from './contextApi'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
      <Auth/>
      </AuthProvider>
    </BrowserRouter>
    
  )
}

export default App
