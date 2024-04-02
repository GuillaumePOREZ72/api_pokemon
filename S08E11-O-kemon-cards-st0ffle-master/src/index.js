import { createRoot } from "react-dom/client";
import App from "./components/App";

import './assets/css/reset.css';

const container = document.getElementById("app");

const root = createRoot(container);

root.render(<App />);