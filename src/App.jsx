import Content from "./components/Content.jsx";
import Header from "./components/Header.jsx";
import { createElement } from "./createElement.js";

export default function App() {
  return (
    <div id="app">
      <Header title={"Hello, React Core ~!"} />
      <Content />
      <p>This is a paragraph</p>
      footer
    </div>
  );
}
