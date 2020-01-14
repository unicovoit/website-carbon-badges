let $q = (selector) => document.querySelector(selector);

let s = `{{css}}`;

$q('#cb').insertAdjacentHTML('beforeEnd',s)

let m = `<div><p id="cbg">Measuring CO<sub>2</sub>&hellip;</p><a href="https://websitecarbon.com">Website Carbon</a></div>
    <p id="cb2"></p>`

$q('#cb').insertAdjacentHTML('beforeEnd',m);

fetch('https://api.websitecarbon.com/b?url=' + encodeURIComponent(window.location.href))
    .then(function(r) {
        if (!r.ok) {
            throw Error(r);
        }
        return r.json();
    })
    .then(function (r) {
        $q('#cbg').innerHTML = r.c + 'g of CO<sub>2</sub>/view'
        $q('#cb2').innerHTML = 'Cleaner than ' + r.p + '% of websites tested'
    })
    .catch(function (e) {
        $q('#cbg').innerHTML = 'No Result';
        console.log(e);
    })
