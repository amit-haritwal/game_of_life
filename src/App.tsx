import './styles.css';
import CanvasComponent from './components/canvas/Canvas';
import { Provider } from 'react-redux';
import { store } from './redux/store';
export default function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <CanvasComponent />
      </Provider>
    </div>
  );
}
