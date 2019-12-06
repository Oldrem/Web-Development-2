function doAjax(x, y, r, writable) {
    let req = new XMLHttpRequest();
    req.open("POST", document.documentURI, true);
    req.onload = ()=>changePage(JSON.parse(req.responseText), writable);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.send(`X=${x}&Y=${y}&R=${r}&type=${writable ? "ajax" : "ajax-no-cache"}&offset=${offsetField.value}`)
}
function changePage(point, writable) {
    drawPoint(point.x, point.y, (point.inArea==="Да" ? "lime":"red"));
    console.log("I drew this :)");
    if(writable) {
        console.log("I passed the writable check");
        if (!document.getElementById("result-table")) {
            console.log("I passed the table existence check");
            let block = document.createElement("div");
            block.id="history-block";
            let table = document.createElement("table");
            table.id = "result-table";
            let headers = document.createElement("tr");
            headers.id = "table-headers";
            headers.innerHTML = "<th>Координата X</th><th>Координата Y</th><th>Радиус R</th><th>Попадание</th><th>Дата и время запроса</th>";
            let header = document.createElement("span");
            header.setAttribute("class", "table-text");
            header.innerText = "Результаты";
            let button = document.createElement("div");
            button.innerHTML = "<button type=\"button\" onclick=\"clearHistory()\" class=\"history-button\">Очистить историю</button><br>";
            document.getElementById("main").appendChild(block);
            block.appendChild(header);
            block.appendChild(button);
            block.appendChild(table);
            table.appendChild(headers);
        }
        let row = document.getElementById("result-table").insertRow(1);
        row.innerHTML = `<td>${point.x}</td><td>${point.y}</td><td>${point.r}</td><td>${point.inArea}</td><td>${point.time}</td>`;
    }
}
function clearHistory() {
    let req = new XMLHttpRequest();
    req.open("POST", document.documentURI, true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.send("type=clear");
    setTimeout('location.reload()', 500);
}