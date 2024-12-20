import { render } from "libs/render/render.ts";
import App from "./App.tsx";

const appElement = App();

const rootContainer = document.getElementById("root") as HTMLElement;
render(appElement, rootContainer);

console.log(JSON.stringify(appElement, null, 2));
