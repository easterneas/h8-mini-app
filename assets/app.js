const output = document.getElementById('resultOutput')
const calcHistory = document.getElementById('history')
const calcHistories = document.getElementById('history').children
const allowed = '1234567890-+=*./'.split('')

// menambahkan eventListener ketika key di keyboard ditekan
document.addEventListener('keyup', function (e) {
    input(e)
})

// me-reset layar menjadi 0
function clearScreen() {
    output.innerText = 0
}

// menghapus teks satu karakter ke kanan
// jika teks hanya ada satu karakter, maka clearScreen() akan dipanggil
function backspace() {
    //
    console.log(output.innerText)
    
    if(output.innerText !== 'Infinity' && output.innerText !== 'Invalid Input' && output.innerText.length > 1){
        output.innerText = output.innerText.substring(0, output.innerText.length - 1)
    }else clearScreen()
}

// menginput data
function input(e) {
    if(output.innerText === 'Infinity' || output.innerText === 'Invalid Input' || output.innerText === '0') output.innerText = e.value ? e.value : allowed.includes(e.key) ? e.key : output.innerText
    else if(e.keyCode === 8) backspace()
    else if(e.key === '=' || e.key === 'Enter') calculate()
    else if(allowed.includes(e.key)) output.innerText += e.key
    else if(e.value) output.innerText += e.value
}

function calculate() {
    let res = 0
    
    try {
        res = eval(
            output.innerText
                .replace(/&nbsp;/g, '')
                .replace(/\b0*((\d+\.\d+|\d+))\b/g,'$1')
        )
    } catch (error) {
        output.innerText = "Invalid Input"
    }
    
    addToHistory(output.innerText, res)

    output.innerText = res
}

function addToHistory(calculation, result){
    let div = document.createElement('div')

    div.innerHTML = `
    <span class="expressions">${calculation}</span><br>
    =<span class="result">${result}</span>
    `

    if(calcHistories.length > 9){
        calcHistory.removeChild(calcHistory.lastElementChild)
    }

    calcHistory.insertBefore(div, calcHistory.childNodes[0])
}