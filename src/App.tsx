import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getLazyComponentWithPreload } from "./hooks/useLazyComponent";
import reportWebVitals from "./reportWebVitals";
import { Suspense, useEffect } from "react";

const [IndexPage, preloadIndexPage] = getLazyComponentWithPreload(
  () => import("./pages/index")
);
const [ListPage] = getLazyComponentWithPreload(() => import("./pages/list"));
const [DetailPage] = getLazyComponentWithPreload(
  () => import("./pages/detail")
);

const App = () => {
  useEffect(() => {
    preloadIndexPage();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={null}>
                <IndexPage />
              </Suspense>
            }
          />
          <Route
            path="/list"
            element={
              <Suspense fallback={null}>
                <ListPage />
              </Suspense>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <Suspense fallback={null}>
                <DetailPage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

reportWebVitals(console.log);
