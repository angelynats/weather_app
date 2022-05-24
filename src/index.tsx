import React from "react";
import {HashRouter} from "react-router-dom";

// redux
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {store} from "./redux/store/store";

// components
import AppContainer from "./AppContainer";

// helpers
import {ModalProvider} from "./utils/contexts";
import "normalize.css";

// styles
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        background: {
            paper: "#e6e9e9"
        }
    }
});

const root = createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <ThemeProvider theme={theme}>
                    <ModalProvider>
                        <AppContainer />
                    </ModalProvider>
                </ThemeProvider>
            </HashRouter>
        </Provider>
    </React.StrictMode>
);
