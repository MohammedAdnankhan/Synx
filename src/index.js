import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import { configureStore } from "./redux/Store";
// import "./data";
import * as serviceWorker from "./serviceWorker";
import reportWebVitals from "./reportWebVitals";
import Spinner from "./views/spinner/Spinner";

ReactDOM.render(
  <Provider store={configureStore()}>
    <Suspense fallback={<Spinner />}>
      <HashRouter>
        <App />
      </HashRouter>
    </Suspense>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();

reportWebVitals();
