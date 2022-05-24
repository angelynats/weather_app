import React from "react";
import {HashRouter} from "react-router-dom";
import {ReactNotifications} from "react-notifications-component";

// redux
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {store} from "./redux/store/store";

// components
import AppContainer from "./AppContainer";

// helpers
import {ModalProvider} from "./utils/contexts";

// styles
import "./styles/globals.scss";
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
                <ReactNotifications />
                <ThemeProvider theme={theme}>
                    <ModalProvider>
                        <AppContainer />
                    </ModalProvider>
                </ThemeProvider>
            </HashRouter>
        </Provider>
    </React.StrictMode>
);
