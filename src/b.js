const wcID = (selector) => document.getElementById(selector);
const wcU = encodeURIComponent(window.location.href)

const newRequest = function (render = true) {
    // Run the API request because there is no cached result available
    fetch('https://api.websitecarbon.com/b?url=' + wcU)
        .then(function (r) {
            if (!r.ok) {
                throw Error(r);
            }
            return r.json();
        })

        .then(function (r) {
            if (render) {
                renderResult(r)
            }

            // Save the result into localStorage with a timestamp
            r.t = new Date().getTime()
            localStorage.setItem('wcb_'+wcU, JSON.stringify(r))
        })

        // Handle error responses
        .catch(function (e) {
            wcID('wcb_g').innerHTML = 'Aucun résultat';
            console.log(e);
            localStorage.removeItem('wcb_'+wcU)
        })
}

const renderResult = function (r) {
    wcID('wcb_g').innerHTML = r.c + 'g de CO<sub>2</sub>/vue'
    wcID('wcb_2').insertAdjacentHTML('beforeEnd', 'Plus propre que ' + r.p + '% des pages testées !')i
}

// Get the CSS and add it to the DOM. The placeholder will be filled by gulp build
const wcC = '{{css}}';
const wcB = wcID('wcb');

if (('fetch' in window)) { // If the fetch API is not available, don't do anything.
    wcB.insertAdjacentHTML('beforeEnd',wcC)

    // Add the badge markup
    wcB.insertAdjacentHTML('beforeEnd', '<div id="wcb_p"><span id="wcb_g">Mesure de CO<sub>2</sub> en cours&hellip;</span><a id="wcb_a" target="_blank" rel="noopener" href="https://websitecarbon.com">Website Carbon</a></div><span id="wcb_2">&nbsp;</span>');

    // Get result if it's saved
    let cachedResponse = localStorage.getItem('wcb_' + wcU)
    const t = new Date().getTime()

    // If there is a cached response, use it
    if (cachedResponse) {
        const r = JSON.parse(cachedResponse)
        renderResult(r)

        // If time since response was cached is over a day, then make a new request and update the cached result in the background
        if ((t - r.t) > (86400000)) {
            newRequest(false)
        }

    // If no cached response, then fetch from API
    } else {
        newRequest()
    }
}
