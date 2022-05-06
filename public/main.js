const optCont = document.querySelector(".options-cont");
const opt = document.querySelector(".fa-bars");
const menu = document.querySelector(".menu-cont");
const pencil = document.querySelector(".pencil");
const eraser = document.querySelector(".eraser");

const upload = document.querySelector(".upload");
const sticky = document.querySelector(".sticky");

let pencilFlag = false;
let eraserFlag = false;

const eraserCont = document.querySelector(".eraser-cont");
const pencilCont = document.querySelector(".pencil-cont");
let on = false;
optCont.addEventListener("click", () => {
    if (on) {
        hideMenu();
        hidePencilCont();
        hideEraserCont();
        opt.removeAttribute("class", "fa-solid fa-xmark");
        opt.setAttribute("class", "fas fa-bars");
        on = false;
    } else {
        showMenu();
        opt.removeAttribute("class", "fas fa-bars");
        opt.setAttribute("class", "fa-solid fa-xmark");
        on = true;
    }

})
function hideMenu() {
    menu.style.display = "none";
}
function showMenu() {
    menu.style.display = "flex";
}
pencil.addEventListener("click", () => {
    console.log("pen");
    pencilFlag = !pencilFlag;
    if (!pencilFlag) {
        hidePencilCont();
    } else {
        showPencilCont();
    }
})
eraser.addEventListener("click", () => {
    console.log("eras");
    eraserFlag = !eraserFlag;
    if (!eraserFlag) {
        hideEraserCont();
    } else {
        showEraserCont();
    }
})
upload.addEventListener("click", (e) => {
    // Open file explorer
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let stickyTemplateHTML = `
        <div class="header-cont">
            <div class="minimize"></div>
            <div class="remove"></div>
        </div>
        <div class="note-cont">
            <img class="uploaded-img"src="${url}"/>
        </div>
        `;
        createSticky(stickyTemplateHTML);
    })
})

sticky.addEventListener("click", (e) => {
    let stickyTemplateHTML = `
    <div class="header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
    </div>
    <div class="note-cont">
        <textarea spellcheck="false"></textarea>
    </div>
    `;

    createSticky(stickyTemplateHTML);
})

function createSticky(stickyTemplateHTML) {
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");
    stickyCont.innerHTML = stickyTemplateHTML;
    document.body.appendChild(stickyCont);

    let minimize = stickyCont.querySelector(".minimize");
    let remove = stickyCont.querySelector(".remove");
    noteActions(minimize, remove, stickyCont);

    stickyCont.onmousedown = function (event) {
        dragAndDrop(stickyCont, event);
    };

    stickyCont.ondragstart = function () {
        return false;
    };
}
function noteActions(minimize, remove, stickyCont) {

    remove.addEventListener("click", (e) => {
        stickyCont.remove();
    })
    minimize.addEventListener("click", (e) => {
        let noteCont = stickyCont.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).getPropertyValue("display");
        if (display === "none") noteCont.style.display = "block";
        else noteCont.style.display = "none";
    })
}
function dragAndDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the ball, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
}
function hidePencilCont() {
    //pencilFlag=false;
    console.log("hide");
    pencilCont.style.display = "none";

}
function showPencilCont() {
    //pencilFlag=true;
    console.log("show");
    pencilCont.style.display = "block";
}
function hideEraserCont() {
    //pencilFlag=false;
    console.log("hide");
    eraserCont.style.display = "none";

}
function showEraserCont() {
    //pencilFlag=true;
    console.log("show");
    eraserCont.style.display = "block";
}