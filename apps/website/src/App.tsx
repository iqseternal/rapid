import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import RouterContext from './router';
import store from '@/features';

export default function App() {


  return (
    <Provider store={store}>
      <BrowserRouter>
        <RouterContext />
      </BrowserRouter>
    </Provider>
  )
}

