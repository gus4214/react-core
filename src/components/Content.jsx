import { createElement } from "../createElement.js";
const Content = () => {
  return (
    <main id="main-content">
      <section id="first-section">
        <h3>first</h3>
        <ul>
          <li>Vite</li>
          <li>Babel</li>
        </ul>
      </section>
      <section id="second-section">
        <ul>
          {["jsx", "dom"].map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </section>
      <div>{["Hello", [<span>World</span>, "!!!"]]}</div>
    </main>
  );
};

export default Content;
