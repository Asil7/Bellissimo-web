import './App.css';
import Navbar from './component/navbar/Navbar';
import Main from './component/main/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './component/pages/cart/Cart';

function App() {
  return (
    <div className='bg-light'>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path='/cart' element={<Cart/>} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
