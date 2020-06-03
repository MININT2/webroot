"use strict";

const decompile = (source) => {
    let output = '';
    source.split('\n')
          .forEach((bruh) => 
                output += String.fromCharCode(bruh.split("bruh").length - 1));
    return output;
}

const run = (source) => eval(decompile(source));

const getSource = async (script) => {
    if (!script.src) return script.innerHTML;
    const res = await fetch(script.src);
    if (res.ok) return res.text();
    throw Error(`File at path: ${script.src} does not exist!`);
}

(() => {
    const scripts = Array.from(document.querySelectorAll('script[type="text/bruh"]'));
    scripts.forEach(async (script) => {
        const source = await getSource(script);
        run(source);
    });
})();