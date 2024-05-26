const correct = "APPLE";

let index = 0;
let attempts = 0;
let timer;

function appStart() {
    const displayGameover = () => {
        const div = document.createElement("div");
        div.innerText = "Game Over"
        div.style = "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:38%; background-color:white; width:200px; height:100px; border:1px solid black;" ;
        document.body.appendChild(div);
    };

    const nextLine = () => {
        if (attempts === 6) return gameover();
        attempts += 1;
        index = 0;
    };

    const gameover = () => {
        window.removeEventListener("keydown", handleKeydown);
        displayGameover();
        clearInterval(timer);
    };

    const handleEnterKey = () => {
        let correct_counts = 0;

        for(let i=0; i<5; i++) {
            const block = document.querySelector(
                `.board-block[data-index='${attempts}${i}']`
            );
            const input_word = block.innerText;
            const correct_word = correct[i];
            if (input_word === correct_word) {
                correct_counts += 1;
                block.style.background = "#6AAA64";
            }
            else if (correct.includes(input_word)) block.style.background = "#C9B458";
            else block.style.background = "#787C7E";
            block.style.color = "white";
        }
        if (correct_counts === 5) gameover();

        nextLine();
    };

    const handleBackspace = () => {
        if (index > 0) {
            const preBlock = document.querySelector(
                `.board-block[data-index='${attempts}${index - 1}']`
            );
            preBlock.innerText = "";
            index -= 1;
        }
    };

    const handleKeydown = (event) => {
        const key = event.key.toUpperCase();
        const keyCode = event.keyCode;
        const thisBlock = document.querySelector(
            `.board-block[data-index='${attempts}${index}']`
        );

        if (event.key === "Backspace") handleBackspace();
        if (index === 5) {
            if (event.key === "Enter") handleEnterKey();
            else return;
        }
        else if (65 <= keyCode && keyCode <= 90) {
            thisBlock.innerText = key;
            index += 1;
        }
    };

    const startTimer = () => {
        const start_time = new Date();

        function setTime() {
            const cur_time = new Date();
            const spent_time = new Date(cur_time - start_time);
            const min = spent_time.getMinutes().toString().padStart(2, "0");
            const sec = spent_time.getSeconds().toString().padStart(2, "0");
            const timeDiv = document.querySelector(".timer");
            timeDiv.innerText = `${min}:${sec}`;
        }

        timer = setInterval(setTime, 1000);
    };
    
    startTimer();
    window.addEventListener("keydown", handleKeydown);
}

appStart();