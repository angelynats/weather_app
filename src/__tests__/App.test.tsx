import React from "react";
import {act} from "@testing-library/react";

// components
import App from "../App";

// helpers
import {
    componentRenderByMemoryRouter,
    toBeExpectByTestId,
    toBeExpectByText
} from "../utils/tests/testUtils";

describe("Test App Router", () => {
    test("should render App componet", async () => {
        await act(async () => {
            componentRenderByMemoryRouter("/", <App />);
        });
        toBeExpectByTestId("app-component-test-id");
    });

    test('should render HomePage component with path "/"', async () => {
        await act(async () => {
            componentRenderByMemoryRouter("/", <App />);
        });
        toBeExpectByText("Weather App");
    });

    test('should render LocationPage component with path "/location/:id"', async () => {
        await act(async () => {
            componentRenderByMemoryRouter("/location/3081368", <App />);
        });
        toBeExpectByText("Location Details");
    });

    test('should render LocationPage component with path "/location/:id" - wrong path', async () => {
        await act(async () => {
            componentRenderByMemoryRouter("/location/3001368151665888", <App />);
        });
        toBeExpectByText("No result");
    });

    test("should render Error404 page", async () => {
        await act(async () => {
            componentRenderByMemoryRouter("/hjgsdfjghsdjfg", <App />);
        });
        toBeExpectByText("Error 404");
    });
});
