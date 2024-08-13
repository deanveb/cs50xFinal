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
            const table = div.childNodes[0];
            dragElement(table);
            Selectable(table);
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
    const workspace = document.getElementById("workspace");
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    table.appendChild(tbody);
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
    tbody.appendChild(frow);

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
        tbody.appendChild(tr);
    }
    
    // Make table selectable
    Selectable(table);
    dragElement(table);
    workspace.appendChild(table);
}

var current_inspector_id = "";

function Selectable(elem) {
    elem.oncontextmenu = e => {
        e.preventDefault();
        console.log(current_inspector_id);
        if (current_inspector_id != elem.id) {
            const properties = document.getElementById("properties");
            // Delete all properties' children
            properties.innerHTML = "";
            const div = document.createElement("div");
            div.style.cssText = "display: flex; flex-direction: column;";
            
            const head = elem.firstChild.firstChild.children;
            
            for (let i = 0; i < head.length; i++) {
                
                let section = document.createElement("section");
                section.innerHTML = head.item(i).innerHTML;
                section.style.cssText = "width: fit-content; margin: 5px;"

                let button = document.createElement("button");
                button.innerHTML = "Delete";
                button.style.cssText = "width: fit-content; margin: 5px;"

                section.appendChild(button);
                div.appendChild(section);
            }
            
            current_inspector_id = elem.id;
            console.log(current_inspector_id, elem.id);
            properties.appendChild(div);
        }
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