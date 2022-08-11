import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './views/dashboard';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route index path="/" element={<Dashboard />} />
      {/* <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/form" element={<Form />} /> */}
    </Routes>
  </BrowserRouter>
  )
}

export default App;
