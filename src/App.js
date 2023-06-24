import logo from './logo.svg';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import './App.css';
import AppRoutes from './appRoutes';
import counterSlice from './features/counterSlice';

const myStore = configureStore({
  reducer: {
    counterSlice
  }
})
function App() {
  return (
    <Provider store={myStore}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
