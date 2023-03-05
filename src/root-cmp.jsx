
import './main.scss';

function App() {
  return (
    <div className="app main-layout">
      <h1>The Simon Game</h1>
      <div className='simon-container'>
        <div className='simon-square red'></div>
        <div className='simon-square green'></div>
        <div className='simon-square blue'></div>
        <div className='simon-square yellow'></div>
      </div>
    </div>
  );
}

export default App;
