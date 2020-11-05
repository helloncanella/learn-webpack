import component from "./component";
import "../mico.js";
import "./main.css";
import { bake } from "./shake";

bake();

document.body.appendChild(component());
