import React from "react";
import ReactDom from "react-dom";

import App from "./app";

import "./style/main.sass";

const root = document.createElement("div");
root.setAttribute("id", "root");

document.body.prepend(root);
ReactDom.render(App, root);
