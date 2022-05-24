import React from "react";
import {act, waitFor} from "@testing-library/react";

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
        await waitFor(() => {
            toBeExpectByTestId("app-component-test-id");
        });
    });

    test('should render HomePage component with path "/"', async () => {
        await act(async () => {
            componentRenderByMemoryRouter("/", <App />);
        });

        toBeExpectByText("Weather App");
    });

    test('should render LocationPage component with path "/location/:id"', async () => {
        componentRenderByMemoryRouter("/location/3081368", <App />);
        await waitFor(() => {
            toBeExpectByText("Location Details");
        });
    });

    test("should render Error404 page", async () => {
        await act(async () => {
            componentRenderByMemoryRouter("/hjgsdfjghsdjfg", <App />);
        });
        toBeExpectByText("Error 404");
    });
});
