// TODO: Save feature
function addTable(list, name) {
    const body = document.getElementById("workspace");
    const table = document.createElement("table");
    table.id = name;
    table.setAttribute("border", "1");
    table.style.cssText = "position:absolute; z-index = 0;"

    // Create table head
    let frow = document.createElement("tr");
    frow.style.cssText = "-webkit-user-select: none; -ms-user-select: none; user-select: none; cursor:move;";
    frow.id = table.id + "header";
    for (let head in list[0]) {
        let th = document.createElement("th");
        th.style.border = "1px solid black";   
        let text = document.createTextNode(head);
        th.appendChild(text);
        frow.appendChild(th);
    }
    table.appendChild(frow);

    // Display table datas
    for (let data_index in list) {
        let tr = document.createElement("tr");
        for (let head in list[data_index]) {
            let td = document.createElement("td");
            td.style.cssText = "-webkit-user-select: none;  -ms-user-select: none; user-select: none;"
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
    dragElement(document.getElementById(table.id))
}

// Source: https://www.w3schools.com/howto/howto_js_draggable.asp
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}