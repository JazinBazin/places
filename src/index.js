import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.css";
import App from './components/App';

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

document.addEventListener('keydown', function (event) {
    if (event.code == 'KeyP' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        html2canvas(document.body)
            .then(canvas => {
                let pdf = new jsPDF('landscape', 'mm', 'a4');
                pdf.addImage(canvas.toDataURL("image/jpeg"), "JPEG", 0, 0, 297, 210);
                pdf.save("Места.pdf");
            });
    }
});

document.addEventListener('keydown', function (event) {
    if (event.code == 'KeyI' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        html2canvas(document.body)
            .then(canvas => {
                let a = document.createElement('a');
                a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
                a.download = 'Места.jpg';
                a.click();
            });
    }
});

ReactDOM.render(
    <App />,
    document.getElementById("app")
);
