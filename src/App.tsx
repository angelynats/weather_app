import React, {FC, lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";

// components
import Loader from "components/Loader/Loader";
import Header from "components/Header/Header";

const Home = lazy(() => import("./pages/HomePage/HomePage" /* webpackChunkName: 'home'*/));

const LocationPage = lazy(
    () =>
        import(
            "./pages/LocationPage/LocationPage" /* webpackChunkName: 'location details forecast'*/
        )
);

const Error404 = lazy(
    () => import("./pages/ErrorPage/Error404" /* webpackChunkName: 'error 404'*/)
);

const App: FC = () => (
    <div data-testid="app-component-test-id">
        <Header />
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/location/:id" element={<LocationPage />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </Suspense>
    </div>
);

export default App;
