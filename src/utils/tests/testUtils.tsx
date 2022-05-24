import React, {ReactElement} from "react";
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";

import {render as rtlRender, screen} from "@testing-library/react";
import {configureStore} from "@reduxjs/toolkit";

// redux
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
    return expect(screen.getByTestId(testId)).toBeInTheDocument();
};

export const toBeExpectByText = (text: string) => {
    return expect(screen.getByText(text)).toBeInTheDocument();
};
