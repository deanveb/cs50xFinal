// TODO: Save feature
function addTable(list) {
    const body = document.getElementById("workspace");
    const table = document.createElement("table");
    table.setAttribute("border", "1")
    let frow = document.createElement("tr");
    for (let head in list[0]) {
        let th = document.createElement("th");
        th.style.border = "1px solid black";   
        let text = document.createTextNode(head);
        th.appendChild(text);
        frow.appendChild(th);
    }
    table.appendChild(frow);

    for (let data_index in list) {
        let tr = document.createElement("tr");
        for (let head in list[data_index]) {
            let td = document.createElement("td");
            td.style.border = "1px solid black";   
            // To set max characters
            let content = list[data_index][head]
            let text = document.createTextNode(content);
            
            td.appendChild(text);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    body.appendChild(table);
}