import {Routes , Route} from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import History from './pages/History'
import Debug from './pages/Debug'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 overflow-x-hidden">
      <ToastContainer 
        position='bottom-right'
        toastClassName="backdrop-blur-sm bg-white/90 border border-purple-200/50"
        progressClassName="bg-gradient-to-r from-purple-600 to-pink-600"
      />
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/result' element={<Result />} />
          <Route path='/history' element={<History />} />
          <Route path='/debug' element={<Debug />} />
        </Routes>
      <Footer />
    </div>
  )
}

export default App