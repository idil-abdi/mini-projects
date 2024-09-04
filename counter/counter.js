let displayEl = document.querySelector('.counter-display');
let increaseEl = document.querySelector('.increase');
let decreaseEl = document.querySelector('.decrease');
let resetEl = document.querySelector('.reset');

let count = 0;

update()

increaseEl.addEventListener('click', () => {
    count++
    update()
})

decreaseEl.addEventListener('click', () => {
    count--
    update()
})

function update() {
    displayEl.innerHTML = count;
}
decreaseEl.addEventListener('click', () => {
    count--
    update()
})
