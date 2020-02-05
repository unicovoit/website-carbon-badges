const $q = (selector) => document.querySelector(selector);
const url = encodeURIComponent(window.location.href)

const newRequest = function (render = true) {
    // Run the API request because there is no cached result available
    fetch('https://api.websitecarbon.com/b?url=' + url)
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
            localStorage.setItem('wcb_'+url, JSON.stringify(r))
        })

        // Handle error responses
        .catch(function (e) {
            $q('#cbg').innerHTML = 'No Result';
            console.log(e);
            localStorage.removeItem('wcb_'+url)
        })
}

// Get the CSS and add it to the DOM. The placeholder will be filled by gulp build
const s = '{{css}}';
$q('#cb').insertAdjacentHTML('beforeEnd',s)

// Add the badge markup
$q('#cb').insertAdjacentHTML('beforeEnd', '<div id="cbp"><p id="cbg">Measuring CO<sub>2</sub>&hellip;</p><a target="_blank" rel="noopener" href="https://websitecarbon.com">Website Carbon</a></div>');

const renderResult = function(r) {
    $q('#cbg').innerHTML = r.c + 'g of CO<sub>2</sub>/view'
    $q('#cb').insertAdjacentHTML('beforeEnd', '<p id="cb2">Cleaner than ' + r.p + '% of pages tested</p>')
}

// Get result if it's saved
let cr = localStorage.getItem('wcb_'+url)
const t = new Date().getTime()

// If there is a cached response, use it
if (cr) {
    const r = JSON.parse(cr)

    // If time since response was cached is over a week, then don't use cached response and make a call to the API instead
    if ((t - r.t) > (604800000)) {
        newRequest()
    } else {
        renderResult(r)

        // If time since response was cached is over a day, then make a new request and update the cached result in the background
        if ((t - r.t) > (86400000)) {
            newRequest(false)
        }
    }

// If no cached response, then fetch from API
} else {
    newRequest()
}
