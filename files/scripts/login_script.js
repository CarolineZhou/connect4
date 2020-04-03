function loadLoginPage(){
    $('#bodyTag').load('http://localhost:8000/login', (res, stat, req) =>{
        if(stat === 'success'){
            console.log('login page load successful.');
            generateName(); 
        }
        else if(stat === 'error'){
            console.log('login page load failed.')
        }
    });    
}

function joinGame(){
    let joinCode = document.getElementById('joinCode').value;
    console.log("join code: " + joinCode);
    socket.emit("join game", joinCode); 
}

function startRandomGame(){
    loadGamePage();
}

function generateName(){
    socket.emit("get new name");
    socket.emit("get new game code");
    
    socket.on("new name", (name) => {
        this.name = name;
        updateName();
    });

    socket.on("new game code", (code) => {
        game_code = code;
        displayCode(game_code);
    });

    socket.on("game start", () => {
        loadGamePage();
    });
}

function changeName(){
    document.getElementById('changeNameOpt').innerHTML = '<form id="nameForm">\
                                                    <input type="text" id="newUserName">\
                                                    <button>change</button>\
                                                    </form>';
    document.getElementById('newUserName').value = document.getElementById('currentName').innerHTML;
    $('#nameForm').on('submit', function(e) {
        // Prevent form submission by the browser
        e.preventDefault();
        socket.emit("update name", $('#newUserName').val());    
    });
}

function updateName(){
    document.getElementById("currentName").innerHTML = this.name;
    document.getElementById('changeNameOpt').innerHTML = '<button onclick="changeName()">change name</button>';
}

function displayCode(c){
    document.getElementById('codeToJoin').innerHTML = c;
}

