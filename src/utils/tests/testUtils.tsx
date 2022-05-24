import React, {ReactElement} from "react";
import {MemoryRouter} from "react-router-dom";
import {render as rtlRender, screen} from "@testing-library/react";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";

import reducer from "src/redux/reducer/reducer";

export const render = (
    ui: ReactElement,
    {store = configureStore({reducer}), ...renderOptions} = {}
) => {
    function Wrapper({children}) {
        return <Provider store={store}>{children}</Provider>;
    }
    return rtlRender(ui, {wrapper: Wrapper, ...renderOptions});
};

export const componentRenderByMemoryRouter = (
    routingPath: string | "",
    componentName: ReactElement
) => {
    render(<MemoryRouter initialEntries={[routingPath]}>{componentName}</MemoryRouter>);
};

export const toBeExpectByTestId = (testId: string) => {
    return expect(screen.getByTestId(`${testId}`)).toBeInTheDocument();
};

export const toBeExpectByText = (text: string) => {
    return expect(screen.getByText(`${text}`)).toBeInTheDocument();
};

// not write

export const elementGetByTestId = (testId: string) => {
    return screen.getByTestId(`${testId}`);
};

export const elementGetBytext = (text: string) => {
    return screen.getByText(`${text}`);
};

export const toBeExpect = (linkElement: HTMLElement) => {
    return expect(linkElement).toBeInTheDocument();
};
