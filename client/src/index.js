import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import RoutesConfig from "./routes/RoutesConfig";
import { persistor, store } from "./store/store";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RoutesConfig />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

//TODO: profile ka daalna h edit and show dono

//TODO: reducer ko theek karna h vo apis wala part

//TODO: community manage and discussions wala daalna h saara part

//TODO: count wala issue solve karna h

//TODO: images wala karna h

//TODO: create community and edit ki css wagrah karna h
