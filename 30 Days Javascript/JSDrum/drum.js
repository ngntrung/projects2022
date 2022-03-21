

const keys = document.querySelectorAll(".key");
keys.forEach(key => key.addEventListener("transitionend", (e) => {
    if (e.propertyName !== "transform") return;
    key.classList.remove('keyPressed');
}));


function keyPress(e) {
    // Play audio
    const audios = document.querySelectorAll("audio");
    if (!audios) return;
    for (let i = 0; i < audios.length; i++){
        if (e.keyCode == audios[i].dataset.key){
            audios[i].play()
            audios[i].currentTime = 0
        }
    } 
    // Key Animation
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (!key) {
        const message = document.querySelector('.warning');
        message.style.display = "block";
        setTimeout(() => {message.style.display = "none"}, 5000)
        return
    };
    key.classList.add("keyPressed");
}

window.addEventListener("keydown", keyPress);


