import Content from "src/components/Content";
import Header from "src/components/Header";

export default function App() {
  return (
    <>
      <Header title={"Hello, React Core ~!"} />
      <Content />
      <span id="hello" class="hello-css">
        hello
      </span>
      world
      {null}
      {1}
    </>
  );
}
