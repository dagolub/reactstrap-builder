import React from 'react';
import ReactDOM from 'react-dom'
import {Container, Row, Col, Button, Alert} from 'reactstrap';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import 'bootstrap/dist/css/bootstrap.min.css';
const style_textarea = {'width': '1000px', 'height': '500px'}

var json = require('./data.json');
const insertCode = key => () => {
    document.getElementById("source_html").value += json[key] + "\n"

    let html = document.getElementById("source_html").value
    let element = ReactHtmlParser(html);
    ReactDOM.render(element,
        document.getElementById("preview"));
}

function Render(element) {
    return (element)
}
function App() {
    return (
        <Container>
            <Row>
                <Col className="bg-light border" xs="2">
                    <Button color="primary" onClick={insertCode("alert")}>List</Button>
                    <br/>
                    <Button color="primary">List2</Button>
                </Col>
                <Col className="bg-light border" xs="8">
                    <textarea id="source_html" style={style_textarea}></textarea>
                </Col>
            </Row>
            <Row>
                <Col className="bg-light border" xs="12">
                    <div id="preview">

                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
