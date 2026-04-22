// 1. Libraries
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// 2. Redux
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { createRoot } from "react-dom/client";

// 3. Components & UI
import { App } from "./components/App";
import { ThemeWrapper } from "./components/ThemeContext/ThemeContext";

// 5. Styled Components
import { GlobalStyle } from "./commonStyles/GlobalStyle";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <ThemeWrapper>
            <GlobalStyle />
            <App />
          </ThemeWrapper>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
