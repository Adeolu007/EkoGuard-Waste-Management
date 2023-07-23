import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { store } from "./redux/store";
import RouterConfig from "./routes/RouterConfig";

import "react-toastify/dist/ReactToastify.css";

import "./styles/tailwind.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RouterConfig />
      </BrowserRouter>
      <ToastContainer />
    </Provider>
  );
}

export default App;
