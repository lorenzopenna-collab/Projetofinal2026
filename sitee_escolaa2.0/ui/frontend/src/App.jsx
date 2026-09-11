
import Login from "./pages/Login/Login.jsx";
import Aluno from "./pages/Aluno/aluno.jsx";
import Professor from "./pages/Professor/prof.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/aluno" element={<Aluno />} />
        <Route path="/professor" element={<Professor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;