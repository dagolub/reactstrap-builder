import React from "react";
import { transform } from "@babel/standalone";
import ReactDOM from "react-dom";
import * as Reactstrap from "reactstrap";
import {Container, Row, Col, Button} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
const style_textarea = {'width': '1000px', 'height': '500px'}

var json = require('./data.json');

const appendNode = (tag = "div") => {
  const node = document.createElement('div');
  document.getElementById('preview').appendChild(node);
  return node;
};

const transpile = (text) =>
  transform(`return (${text});`, {
    parserOpts: { allowReturnOutsideFunction: true },
    presets: ["react"]
  }).code;

// Potentially danger code.
// Run it only if you are absolutelly confident with
// `text` contains only safe code
const parseReactElement = (text, components) =>
  // eslint-disable-next-line no-new-func
  new Function("React", `with (this) { ${transpile(text)} }`).call(
    components,
    React
  );

const insertCode = key => () => {
    let html = json[key]
    const element = parseReactElement(html,  Reactstrap);
    document.getElementById('source_html').value += html + "\n"
    ReactDOM.render(element, appendNode());
}

function Render(element) {
    return (element)
}
function App() {
    return (
        <Container>
            <Row>
                <Col className="bg-light border" xs="2">
                    <Button color="primary" onClick={insertCode("button")}>Button</Button>
                    <br />
                    <Button color="primary" onClick={insertCode("alert")}>Alert</Button>
                </Col>
                <Col className="bg-light border" xs="8">
                    <textarea id="source_html" style={style_textarea}></textarea>
                </Col>
            </Row>
            <Row>
                <Col className="bg-light border" xs="12" id="preview">
                </Col>
            </Row>
        </Container>
    );
}

export default App;
