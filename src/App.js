import { Routes, Route, Outlet, Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import CharacterList from "./CharacterList";

export default function App() {
  return (
    <div>

      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginForm />} />
          <Route path="/characters"  element={<CharacterList />} />

        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
      <Outlet />
  );
}

