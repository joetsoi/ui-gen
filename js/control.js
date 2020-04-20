let button = document.getElementById('button-preview');

function editStyle(element) {
    let rule = element.id; 
    let postfix = element.getAttribute("data-postfix") || "";
    button.style[rule] = element.value + postfix;
}

let modifiers = {
    value: element => {
        button.innerHTML = element.value;
    }
};

function updateBox() {
    let inputs = document.getElementsByClassName('read-value');
    for (let i = 0; i < inputs.length; i++) {
        let item = inputs[i];
        if (item.disabled === false) {
            let modifier = modifiers[item.id] || editStyle;
            modifier(item);
        }
    }
    let extraCss = document.getElementById('extracss');
    button.style.cssText += extraCss.value;

}

function setup() {
    let elements = document.getElementsByClassName('read-value');
    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        element.oninput = function() {
            updateBox();
        }
    }
    let extraCss = document.getElementById('extracss');
    extraCss.oninput = function () {
        updateBox();
    }
}

function setupToggle() {
    let toggles = document.getElementsByClassName('toggle');
    for (let i = 0; i < toggles.length; i++) {
        let t = toggles[i];
        t.oninput = function() {
            let elements = document.getElementsByClassName(t.getAttribute("data-val"));
            for (let j = 0; j < elements.length; j++) {
                let e = elements[j];
                e.disabled = !e.disabled;
            }
            updateBox();
        }
    }
}

setup();
setupToggle();
updateBox();
