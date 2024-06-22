
rate_api_key = "685a771ad3dfff4aed89cd28"

let amount1 = document.getElementById('amount1')
const fromDropdown = document.getElementById('from');
const toDropdown = document.getElementById('to');
let base_cur = document.getElementById('base-cur')
let rate_exg = document.getElementById('rate-exg')
let exchBtn = document.getElementById('excBtn')
let rate_result = document.getElementById('rate-result')
let notice = document.querySelector('.notice')



try{
// rate options
async function rate_currenciesFuc() {

    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    const currencies = Object.keys(data.rates)
    console.log(currencies)

    currencies.forEach(currency => {
        const option = document.createElement('option');
        option.value = currency;
        option.textContent = currency;
        fromDropdown.appendChild(option.cloneNode(true));
        toDropdown.appendChild(option);
    })
}

rate_currenciesFuc()

//currency converter
async function rate_exchangeFuc() {
    let rateUrl = await fetch("https://v6.exchangerate-api.com/v6/" + `${rate_api_key}` + "/pair/" + `${fromDropdown.value + '/' + toDropdown.value + '/' + amount1.value}`)
    let rate_data = await rateUrl.json()
    console.log(rate_data),
        rate_result.innerText = rate_data.conversion_result.toLocaleString("en-US" ) + " " + toDropdown.value
}


// input validation

exchBtn.addEventListener('click', function () {
    if (amount1.value === "") {
        notice.innerHTML = 'please enter a number'
    } else if (amount1.value == 0) {
        rate_result.innerText = 0
        notice.innerHTML = ''
    }else {
        notice.innerHTML = ''
        rate_exchangeFuc()
    }
})
}catch(err){
console.log('try again')
rate_result.innerText = 'try again'
}

let num = 10000

num = num.toLocaleString('en-UK' , {style:"currency", currency: "EUR"})

console.log(num)

