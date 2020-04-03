function loadGamePage(){
    $('#bodyTag').load('http://localhost:8000/game', (res, stat, req) =>{
        if(stat === 'success'){
            console.log('game page load successful.');
            bindColHover();
        }
        else if(stat === 'error'){
            console.log('game page load failed.');
        }
    });
}

var player = 1;
var theme = "classic";
var game_code = null;

// 1 = red 
// 2 = yellow
// 0 = background color
var grid = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
];

function selectColumn(col){
    if (player === 1){
        for(let i = 5; i > -1; i--){
            if(grid[i][col] === 0){
                grid[i][col] = player;
                break;
            }
        }
    }

    updateGrid();
}


function updateGrid() {
    for(let i = 0; i < 6; i++){
        for(let j = 0; j < 7; j++){
            if(grid[i][j] === 0){
                //console.log(i.toString()+j.toString());
                document.getElementById(i.toString()+j.toString()).style.backgroundColor="#f0f8ff";
            } else if(grid[i][j] === 1){
                //console.log(i.toString()+j.toString());
                document.getElementById(i.toString()+j.toString()).style.backgroundColor="#FFFF00";
            } else if(grid[i][j] === 2){
                //console.log(i.toString()+j.toString());
                document.getElementById(i.toString()+j.toString()).style.backgroundColor="#FF0000";
            }
        }
    }
}

function bindColHover() {
    $(".col").hover(function(){
        $(this).css("opacity", "0.6");
    }, function(){
    $(this).css("opacity", "1");
    });
}


function showThemeOptions(){
    console.log("here");
    document.getElementById('changeThemeOpt').innerHTML = 
    '<button id="classic_button" onclick="changeTheme(0)">Classic</button>\
    <button id="dark_button" onclick="changeTheme(1)">Dark</button>\
    <button id="bright_button" onclick="changeTheme(2)">Bright</button>';
}

function changeTheme(themeNum){
    if(themeNum === 0){
        $("#game_info").css({"background-color":"aliceblue"});
        $("#board").css({"background-color":"aliceblue"});
        $(".col").css({"background-color":"#0000E5"});
        $(".cell").css({"background-color":"aliceblue"});
        theme = "classic";
    }else if(themeNum === 1){
        $("#game_info").css({"background-color":"darkolivegreen"});
        $("#board").css({"background-color":"aliceblue"});
        $(".col").css({"background-color":"#0000E5"});
        $(".cell").css({"background-color":"aliceblue"});
        theme = "dark";
    }else if(themeNum === 2){
        $("#game_info").css({"background-color":"pink"});
        $("#board").css({"background-color":"aliceblue"});
        $(".col").css({"background-color":"#0000E5"});
        $(".cell").css({"background-color":"aliceblue"});
        theme = "bright";
    }

    document.getElementById('changeThemeOpt').innerHTML = '<button onclick="showThemeOptions()">change theme</button>';
}

