import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Blood from "./routes/blood/blood.component";
import Pharmacy from "./routes/pharmacy/pharmacy.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="blood" element={<Blood />} />
        <Route path="pharmacy" element={<Pharmacy />} />
      </Route>
    </Routes>
  );
};

export default App;
