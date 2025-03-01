
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext.jsx'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <App />
    </AuthProvider>

 
  

)
