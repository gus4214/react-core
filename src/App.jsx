import Content from "./components/Content.jsx";
import Header from "./components/Header.jsx";

export default function App() {
  return (
    <div id="app">
      <Header title={"Hello, React Core ~!"} />
      <Content />
      <p className="paragraph">This is a paragraph</p>
      footer
    </div>
  );
}
