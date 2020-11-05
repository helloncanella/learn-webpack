import component from "./component";
import "../mico.js";
import "./main.css";
import _ from "lodash";
const a = { oi: 3 };

console.log(_.get(a, "oi"));

document.body.appendChild(component());
