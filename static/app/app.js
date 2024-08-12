// TODO: Unsaved content warning
function save(element) {
    localStorage.setItem("Saved" + element.id, element.outerHTML);
}

function saving() {
    const workspace = document.getElementById("workspace");
    for (let i = 0; i < workspace.children.length; i++) {
        save(workspace.children.item(i));
    }
}

// Load element on refresh
document.addEventListener("DOMContentLoaded", e => {
    saved_data = Object.keys(localStorage);
    
    for (i of saved_data){
        if (i.includes("Saved")) {
            let div = document.createElement("div");
            div.innerHTML = localStorage.getItem(i);
            div.style.position = "absolute";
            const table = div.childNodes[0];
            dragElement(table);
            Selectable(table)
            document.getElementById("workspace").appendChild(table);
        }
    }
})

function ClearTable() {
	localStorage.clear();	
	location.reload();
}

function addTable(data, name) {
    if (localStorage.getItem("Saved" + name)) {
        window.alert("Cannot have more than 1 table");
        return;
    }
    const body = document.getElementById("workspace");
    const table = document.createElement("table");
    // Singleton
    table.id = name;
    table.style.cssText = "position:absolute;"
    // Create table head
    let frow = document.createElement("tr");
    frow.style.cssText = "-webkit-user-select: none; -ms-user-select: none; user-select: none; cursor:move;";
    frow.id = table.id + "header";
    for (let head in data[0]) {
        let th = document.createElement("th");
        th.style.border = "1px solid black";   
        let text = document.createTextNode(head);
        th.appendChild(text);
        frow.appendChild(th);
    }
    table.appendChild(frow);

    // Display table datas
    for (let data_index in data) {
        let tr = document.createElement("tr");
        for (let head in data[data_index]) {
            let td = document.createElement("td");
            td.style.cssText = "-webkit-user-select: none;  -ms-user-select: none; user-select: none;"
            td.style.border = "1px solid black";   
            // To set max characters
            let content = data[data_index][head]
            let text = document.createTextNode(content);
            
            td.appendChild(text);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    body.appendChild(table);
	// Open inspector menu
    dragElement(document.getElementById(table.id));
    // Make table selectable
    Selectable(table);
}

function Selectable(elem) {
    elem.oncontextmenu = e => {
        e.preventDefault();
        
    }
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