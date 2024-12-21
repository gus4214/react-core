import Content from "src/components/Content";
import Header from "src/components/Header";

export default function App() {
  const handleClick = () => {
    alert("hello world");
  };
  return (
    <>
      {/* <Header title={"Hello, React Core ~!"} /> */}
      {/* <Content /> */}
      <input
        id="hello"
        class="hello-css"
        style={{ backgroundColor: "red", borderRadius: "1px solid blue" }}
      />
      <button onClick={handleClick}>world</button>
    </>
  );
}
