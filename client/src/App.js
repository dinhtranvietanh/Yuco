import { BrowserRouter as Router, Route } from 'react-router-dom'
import PageRender from './PageRender';

import {

  Routes

} from "react-router-dom";

function App() {
  return (
    <Router>
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">

          <Routes>
            <Route exact path="/:page" element={<PageRender />} />

            <Route exact path="/:page/:id" element={<PageRender />} />
          </Routes>

        </div>  </div>
    </Router>);
}

export default App;
