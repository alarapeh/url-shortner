const input = document.querySelector('#url')
const form = document.querySelector('form')
const linkResults = document.querySelector('.link');
const modal = document.querySelector(".modal")
const hamburger = document.querySelector(".hamburger")
const times = document.querySelector(".times")






function ipGenerator(event) {
    event.preventDefault()
    const formIP = input.value;
    const shrtcodeAPI = `https://api.shrtco.de/v2/shorten?url=${formIP}`;
    fetch(shrtcodeAPI)
        .then((response) => response.json())
        .then((data) => {
            let div = document.createElement('div');
            let shortenedDiv = document.createElement('div');
            let originalIP = document.createElement('p');
            let shortenedIP = document.createElement('p');
            let copyButton = document.createElement('button');

            div.classList.add('shortened-result');
            shortenedDiv.classList.add('shortened-right-copy');
            originalIP.classList.add('originalIP');
            shortenedIP.classList.add('shortenedIP');
            copyButton.classList.add('btn-copy')

            originalIP.textContent = data.result.original_link;
            shortenedIP.textContent = data.result.short_link;
            copyButton.textContent = 'Copy';

            linkResults.insertAdjacentElement('afterbegin', div);
            div.appendChild(originalIP);
            div.appendChild(shortenedDiv);
            shortenedDiv.appendChild(shortenedIP);
            shortenedDiv.appendChild(copyButton);

            function copyLink() {
                let copied = shortenedIP.textContent;

                navigator.clipboard.writeText(copied).then(() => {
                    copyButton.textContent = 'Copied!';
                    copyButton.style.background = 'hsl(257, 27%, 26%)';
                });
            }

            form.reset();

            copyButton.addEventListener('click', copyLink);
        });
}
form.addEventListener('submit', ipGenerator);
function displayModal(){
    modal.style.display =" block"
    modal.style.transiton = " ease"
    times.style.display = " block"
    hamburger.style.display = 'none'
    form.style.marginTop = "208px"

}
function closeModal(){
    modal.style.display = "none"
    times.style.display = "none"
    hamburger.style.display = 'block'
    form.style.marginTop = "-125px"

}
hamburger.addEventListener("click" , displayModal)
times.addEventListener('click', closeModal)