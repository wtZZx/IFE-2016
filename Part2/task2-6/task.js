window.onload = function () {
    
    var inputBox = document.querySelector("#input-box"),
        queueList = document.querySelector("#Queue-list"),     
        button = document.querySelector("fieldset");
        
    function renderQueue() {
        var value = inputBox.value.trim(),
            opt = undefined;
            target = event.target;
     
        if(target.nodeName.toLowerCase() != "li") {
            
            var docfrag = document.createDocumentFragment(),
                listNode = document.createElement("li"),
                opt = target.getAttribute("name");
                
            listNode.textContent = value;
            listNode.style.backgroundColor = "rgb(" + randomRGB() + "," + randomRGB() + "," + randomRGB() + ")";
            docfrag.appendChild(listNode);
        } else {
            opt = "clickList";
        }
        
        switch(opt) {
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
    
    function randomRGB() {
        return Math.floor(Math.random() * 255);
    }
    
    
    function checkInput () {
        var inputPatt = /^\d{1,}$/g;
        if(inputPatt.test(inputBox.value.trim())) {
            renderQueue();
        } else {
            alert("只能输入数字");
        }
    }
    

    button.addEventListener("click", checkInput, false);
    queueList.addEventListener("click", renderQueue, false);
    
};