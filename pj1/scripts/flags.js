function start() {
    let flags = document.querySelectorAll('.flag');
    let header = document.querySelector('h1');

    // Loop through each flag and add event listeners
    flags.forEach(function (flag) {
        let originalSrc = flag.src; 

        flag.addEventListener('mouseover', function () {
            updateHeaderAndImage(flag, header);
        });

        flag.addEventListener('mouseout', function () {
            resetHeaderAndImage(flag, header, originalSrc);
        });
    });
}

// Function to update header 
function updateHeaderAndImage(flag, header) {
    let country = flag.alt.replace('Flag ', '');
    if (country === 'Puerto') {
        country = 'Puerto Rico';
    }
    header.textContent = country;
    flag.src = flag.dataset.change; 
}

// Function to reset header and restore original flag
function resetHeaderAndImage(flag, header, originalSrc) {
    header.textContent = 'Countries and Flags';
    flag.src = originalSrc;
}

window.addEventListener("load", start);