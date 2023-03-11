import React from "react";
import "./App.css";
import "./styles/layout/layout.scss";
import "./styles/demo/Demos.scss";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { LayoutProvider } from "./context/layoutcontext";
import { Provider } from "./context/pageContent";
import NavigationContainer from "./navigation/navigationContainer";
function App() {
  return (
    <Provider>
      <LayoutProvider>
        <NavigationContainer />
      </LayoutProvider>
    </Provider>
  );
}

export default App;
