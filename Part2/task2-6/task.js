window.onload = function () {
    
    var inputBox = document.querySelector("#input-box"),
        queueList = document.querySelector("#Queue-list"),     
        button = document.querySelector("fieldset");
        
    function render() {
        var value = inputBox.value.trim(),
            valuePatt = /^\d{1,}$/g;
            opt = undefined;
            target = event.target;
        
        
        if(valuePatt.test(value) && target.nodeName.toLowerCase() != "li") {
            
            var docfrag = document.createDocumentFragment(),
                listNode = document.createElement("li"),
                opt = target.getAttribute("name");
                
            listNode.textContent = value;
            docfrag.appendChild(listNode);
        } else if(target.nodeName.toLowerCase() == "li") {
            opt = "clickList";
        } else {
            opt = "inputError";
        }
        
        switch(opt) {
            case "inputError": alert(opt); break;
            case "clickList": removeList(); break;
            case "push" : push(); break;
            case "pop" : pop(); break;
            case "shift": shift(); break;
            case "unshift": unshift(); break;
        }
        
        function push () {
            queueList.appendChild(docfrag);
        }
        
        function pop () {
            queueList.removeChild(queueList.lastElementChild);
        }
        
        function shift () {
            queueList.insertBefore(docfrag, queueList.firstElementChild);
        }
        
        function unshift() {
            queueList.removeChild(queueList.firstElementChild);
        }
        
        function removeList() {
            queueList.removeChild(target);
        }
        
    } 

    button.addEventListener("click", render, false);
    queueList.addEventListener("click", render, false);
};