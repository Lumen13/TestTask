$(document).ready(function () {
    $(".inputHider").click(function () {
        $(".invisibleName").slideToggle("slow");
    });
});

function submitName() {
    var name = document.getElementById('userName').value;
    var formData = new FormData();
    var key = 'user.Name';
    formData.append(key, name);
    axios.post("Home/Index", formData);
}

$(document).keypress(function (e) {
    if (e.which == 13 && e.target.tagName != 'TEXTAREA') {
        return false;
    }
});

var canvas = document.getElementById("myCanvas");
if (canvas.getContext) {
    context = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;
    var inputCounter = -1;

    var figure = new Path2D();
    figure = { x: 0, y: 0 };

    let startX;
    let startY;
    let currentPositionX;
    let currentPositionY;

    const pointsArray = new Array();

    canvas.addEventListener("mousedown", function (e) {

        inputCounter++;
        
        for (var i = 0; i < pointsArray.length; i++) {
            console.log(pointsArray[i]);
        }

        figure.x = e.pageX - this.offsetLeft;
        figure.y = e.pageY - this.offsetTop;                                    // click-catcher

        let targetX = figure.x + 140;
        let targetY = figure.y + 180;

        if (inputCounter === 0) {

            context.beginPath();
            context.moveTo(figure.x, figure.y);
            context.arc(figure.x, figure.y, 7, 0, 2 * Math.PI);
            context.strokeStyle = "black";
            context.fillStyle = "red";
            context.fill();
            context.stroke();

            startX = Object.freeze(figure.x) + 140;
            startY = Object.freeze(figure.y) + 180;

            currentPositionX = startX;
            currentPositionY = startY;

            ghost.style.left = startX + 'px';
            ghost.style.top = startY + 'px';
        }

        if (inputCounter > 0) {

            context.lineTo(figure.x, figure.y);
            context.lineWidth = 1.0;
            context.strokeStyle = "black";
            context.stroke();                                                   // line from the last place to the click position

            context.arc(figure.x, figure.y, 5, 0, 2 * Math.PI);
            context.strokeStyle = "black";
            context.stroke();
            context.moveTo(figure.x, figure.y);                                 // circle and moving to the click position

            function slowMo(i) {
                setTimeout(function () {
                }, 1000 * i);
            }

            if (Math.abs(targetX - currentPositionX) >= Math.abs(targetY - currentPositionY)) {  //positions set if lineX > lineY

                if (currentPositionX < targetX && currentPositionY < targetY) {     //bottom-right movement

                    function slowMo(currentPositionX) {

                        if (currentPositionX < targetX) {

                            setTimeout(function () {

                                slowMo(++currentPositionX);
                            }, 30);

                            ghost.style.left = currentPositionX + 'px';

                            if (currentPositionY < targetY) {

                                ghost.style.top = (parseInt(ghost.style.top) + 1) + 'px';
                                currentPositionY = parseInt(ghost.style.top);
                            }                            
                        }                        
                    }

                    currentPositionX = parseInt(ghost.style.left);
                    currentPositionY = parseInt(ghost.style.top);

                    pointsArray.push(currentPositionX);
                    pointsArray.push(currentPositionY);
                    for (var i = 0; i < pointsArray.length; i++) {
                        console.log(i);
                        console.log(pointsArray[i]);
                    }

                    if (currentPositionX < targetX) {
                        slowMo(currentPositionX);  
                    }                                      
                }                
                else if (currentPositionX > targetX && currentPositionY < targetY) { //bottom-left

                    function slowMo(currentPositionX) {

                        if (currentPositionX > targetX) {

                            setTimeout(function () {

                                slowMo(--currentPositionX);
                            }, 30);

                            ghost.style.left = currentPositionX + 'px';

                            if (currentPositionY < targetY) {

                                ghost.style.top = (parseInt(ghost.style.top) + 1) + 'px';
                                currentPositionY = parseInt(ghost.style.top);
                            }
                        }
                    }

                    currentPositionX = parseInt(ghost.style.left);
                    currentPositionY = parseInt(ghost.style.top);

                    if (currentPositionX > targetX) {
                        slowMo(currentPositionX);
                    }   
                }
                else if (currentPositionX > targetX && currentPositionY > targetY) { //top-left

                    function slowMo(currentPositionX) {

                        if (currentPositionX > targetX) {

                            setTimeout(function () {

                                slowMo(--currentPositionX);
                            }, 30);

                            ghost.style.left = currentPositionX + 'px';

                            if (currentPositionY > targetY) {

                                ghost.style.top = (parseInt(ghost.style.top) - 1) + 'px';
                                currentPositionY = parseInt(ghost.style.top);
                            }
                        }
                    }

                    currentPositionX = parseInt(ghost.style.left);
                    currentPositionY = parseInt(ghost.style.top);

                    if (currentPositionX > targetX) {
                        slowMo(currentPositionX);
                    }   
                }
                else if (currentPositionX < targetX && currentPositionY > targetY) { //top-right

                    function slowMo(currentPositionX) {

                        if (currentPositionX < targetX) {

                            setTimeout(function () {

                                slowMo(++currentPositionX);
                            }, 30);

                            ghost.style.left = currentPositionX + 'px';

                            if (currentPositionY > targetY) {

                                ghost.style.top = (parseInt(ghost.style.top) - 1) + 'px';
                                currentPositionY = parseInt(ghost.style.top);
                            }
                        }
                    }

                    currentPositionX = parseInt(ghost.style.left);
                    currentPositionY = parseInt(ghost.style.top);

                    if (currentPositionX < targetX) {
                        slowMo(currentPositionX);
                    }   
                }
            }

            if (Math.abs(targetX - currentPositionX) <= Math.abs(targetY - currentPositionY)) { //positions set if X < Y

                if (currentPositionX < targetX && currentPositionY < targetY) { //bottom-right movement

                    function slowMo(currentPositionY) {

                        if (currentPositionY < targetY) {

                            setTimeout(function () {

                                slowMo(++currentPositionY);
                            }, 30);

                            ghost.style.top = currentPositionY + 'px';

                            if (currentPositionX < targetX) {

                                ghost.style.left = (parseInt(ghost.style.left) + 1) + 'px';
                                currentPositionX = parseInt(ghost.style.left);
                            }
                        }
                    }

                    currentPositionX = parseInt(ghost.style.left);
                    currentPositionY = parseInt(ghost.style.top);

                    pointsArray.push(currentPositionX);
                    pointsArray.push(currentPositionY);
                    for (var i = 0; i < pointsArray.length; i++) {
                        console.log(i);
                        console.log(pointsArray[i]);
                    }

                    if (currentPositionY < targetY) {
                        slowMo(currentPositionY);
                    } 
                }
                else if (currentPositionX > targetX && currentPositionY < targetY) { //bottom-left

                    function slowMo(currentPositionY) {

                        if (currentPositionY < targetY) {

                            setTimeout(function () {

                                slowMo(++currentPositionY);
                            }, 30);

                            ghost.style.top = currentPositionY + 'px';

                            if (currentPositionX > targetX) {

                                ghost.style.left = (parseInt(ghost.style.left) - 1) + 'px';
                                currentPositionX = parseInt(ghost.style.left);
                            }
                        }
                    }

                    currentPositionX = parseInt(ghost.style.left);
                    currentPositionY = parseInt(ghost.style.top);

                    if (currentPositionY < targetY) {
                        slowMo(currentPositionY);
                    } 
                }
                else if (currentPositionX > targetX && currentPositionY > targetY) { //top-left

                    function slowMo(currentPositionY) {

                        if (currentPositionY > targetY) {

                            setTimeout(function () {

                                slowMo(--currentPositionY);
                            }, 30);

                            ghost.style.top = currentPositionY + 'px';

                            if (currentPositionX > targetX) {

                                ghost.style.left = (parseInt(ghost.style.left) - 1) + 'px';
                                currentPositionX = parseInt(ghost.style.left);
                            }
                        }
                    }

                    currentPositionX = parseInt(ghost.style.left);
                    currentPositionY = parseInt(ghost.style.top);

                    if (currentPositionY > targetY) {
                        slowMo(currentPositionY);
                    } 
                }
                else if (currentPositionX < targetX && currentPositionY > targetY) { //top-right

                    function slowMo(currentPositionY) {

                        if (currentPositionY > targetY) {

                            setTimeout(function () {

                                slowMo(--currentPositionY);
                            }, 30);

                            ghost.style.top = currentPositionY + 'px';

                            if (currentPositionX < targetX) {

                                ghost.style.left = (parseInt(ghost.style.left) + 1) + 'px';
                                currentPositionX = parseInt(ghost.style.left);
                            }
                        }
                    }

                    currentPositionX = parseInt(ghost.style.left);
                    currentPositionY = parseInt(ghost.style.top);

                    if (currentPositionY > targetY) {
                        slowMo(currentPositionY);
                    } 
                }
            }
        }
    });
}    