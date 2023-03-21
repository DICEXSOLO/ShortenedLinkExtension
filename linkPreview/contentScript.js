function createPopup(url, element) {
    console.log(url);
    const popup = document.createElement('div');
    popup.style.position = 'absolute';
    popup.style.padding = '5px';
    popup.style.border = '1px solid #000';
    popup.style.backgroundColor = '#fff';
    popup.style.fontSize = '12px';
    popup.textContent = url;

    const rect = element.getBoundingClientRect();
    popup.style.top = (rect.top + window.scrollY - popup.offsetHeight - 10) + 'px';
    popup.style.left = (rect.left + window.scrollX) + 'px';

    document.body.appendChild(popup);

    element.addEventListener('mouseleave', () => {
        popup.remove();
    });
}

function expandShortUrl(shortUrl, element) {
    fetch('https://onesimpleapi.com/api/unshorten?token=qHpBcPSBT3hDrmEmcU5FrSe8ETGhVtSPGagDeTN6&output=text&url=' + encodeURIComponent(shortUrl))
        .then(response => response.text())
        .then(data => {
            console.log("Expanded URL:", data);
            createPopup(data, element);
        })
        .catch(error => console.error(error));
}

document.querySelectorAll('a[href]').forEach(link => {
    const url = link.href;

    // Modify the following regex to match more shortened URL services
    const isShortUrl = /^(https?:\/\/(?:bit\.ly|goo\.gl|t\.co|tinyurl\.com))\/.+$/i.test(url);

    if (isShortUrl) {
        link.addEventListener('mouseenter', () => {
            expandShortUrl(url, link);
        });
    }
});
