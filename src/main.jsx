import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";

import './index.css'
import App from './components/App/App'


createRoot(document.getElementById('root')).render(
  <StrictMode>
        <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <BrowserRouter>


    <App />
    </BrowserRouter>

    {/* </PersistGate> */}

    </Provider>

  </StrictMode>,
)
