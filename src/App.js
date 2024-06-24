import './App.css';
import Footer from './component/footer/Footer';
import Navbar from './component/navbar/Navbar';
import Main from './component/main/Main';

function App() {

  return (
    <div className='bg-light'>
      <Navbar />
      <main>
        <Main/>
      </main>
      <Footer />
    </div>
  )

}

export default App;
