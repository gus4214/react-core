import Content from "src/components/Content";
import Header from "src/components/Header";

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
