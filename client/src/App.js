import { BrowserRouter as Router, Route } from "react-router-dom";
import PageRender from "./PageRender";
import Home from "./pages/home";
import Login from "./pages/login";
import { Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { refreshToken } from "./redux/actions/authAction";
import { Post } from "./pages/post";
import { SideBar } from "./components/sideBar";
import { Col, Row } from "antd";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);
  return (
    <Router>
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          <Row gutter={[3, 0]}>
            <Col span={4}>
              <SideBar />
            </Col>
            <Col span={20}>
              <Routes>
                <Route
                  exact
                  path="/"
                  element={auth.token ? <Home /> : <Login />}
                />
                <Route
                  exact
                  path="/posts"
                  element={auth.token ? <Post /> : <Login />}
                />
                <Route
                  exact
                  path="/"
                  element={auth.token ? <Home /> : <Login />}
                />

                <Route exact path="/:page" element={<PageRender />} />

                <Route exact path="/:page/:id" element={<PageRender />} />
              </Routes>
            </Col>
          </Row>
        </div>{" "}
      </div>
    </Router>
  );
}

export default App;
