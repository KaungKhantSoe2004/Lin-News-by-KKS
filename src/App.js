import { NavBar } from "./navBar";

import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./index.css";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { Favorites } from "./pages/favorites";
import { About } from "./pages/about";
import { Contact } from "./pages/contact";
import { EachCategoryPage } from "./pages/eachCategoryPage";
import { useEffect, useState } from "react";
import { AgencyPage } from "./pages/agencyPage";
import { getId, getName, getToken } from "./utilities/localStorage";
import { Provider, useSelector } from "react-redux";
import { store } from "./store";
// import { Provider } from "react-redux";

export const App = () => {
  const [marginLeft, setMarginLeft] = useState();
  const { theme } = useSelector((state) => state.theme);

  // const [newsObj, setNewsObj] = useState({});
  const [name, setName] = useState("");
  useEffect(() => {
    setName(getName());
  }, []);
  return (
    <div className={`app  ${!theme && "themeLight"}`}>
      {/* <Provider> */}

      <BrowserRouter>
        <Routes>
          <Route path="settings" element={<div>This is Settings</div>} />
          <Route path="login" element={<Login />} />
          <Route
            path="/"
            element={
              <NavBar setMarginLeft={setMarginLeft} marginLeft={marginLeft} />
            }
          >
            <Route
              index
              element={
                <Home
                  setMarginLeft={setMarginLeft}
                  marginLeft={marginLeft}
                  name={name}
                />
              }
            />
            <Route path="agencies/:agency" element={<AgencyPage />} />
            <Route path="categories/:category" element={<EachCategoryPage />} />
            <Route
              path="favorites"
              element={<Favorites name={name} setMarginLeft={setMarginLeft} />}
            />
            <Route
              path="about"
              element={<About setMarginLeft={setMarginLeft} />}
            />
            <Route
              path="contact"
              element={<Contact setMarginLeft={setMarginLeft} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* </Provider> */}
      <div className="footer">This is copy right to Kaung Khant Soe.</div>
    </div>
  );
};
export default App;
