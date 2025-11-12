import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Logo() {
  const { theme } = useContext(ThemeContext);
  return (
    <footer
      className={`bg-${theme} text-${
        theme == "dark" ? "white" : "dark"
      } text-center py-3 mt-4`}
    >
      <div className="container">
        <p className="mb-0">&copy; 2024 Movie App. All rights reserved.</p>
      </div>
    </footer>
  );
}
