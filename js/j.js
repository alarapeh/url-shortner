import '/scss/main.scss';

const mainNavigation = document.querySelector('.main-navigation');
const hamburger = document.querySelector('.hamburger');

const form = document.querySelector('#form-link-submission');
const input = document.querySelector('#form-link');
const linkResults = document.querySelector('.links-shortened-results');

function expandMenu() {
    mainNavigation.classList.toggle('open');
}

function ipGenerator(event) {
    event.preventDefault();
    const formIP = input.value;
    const shrtcodeAPI = `https://api.shrtco.de/v2/shorten?url=${formIP}`;

    const errorText = document.querySelector('.error-text');

    if (!formIP) {
        input.classList.add('error-message');
        errorText.style.display = 'block';
    } else {
        input.classList.remove('error-message');
        errorText.style.display = 'none';

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
}

hamburger.addEventListener('click', expandMenu);
form.addEventListener('submit', ipGenerator);
