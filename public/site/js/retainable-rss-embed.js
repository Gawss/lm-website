var container = document.getElementById("retainable-rss-embed");
if (container) {
    var css = document.createElement('link');
    css.href = "/css/retainable.css";
    css.rel = "stylesheet"
    document.getElementsByTagName('head')[0].appendChild(css);
    var script = document.createElement('script');
    script.src = "/js/retainable.js";    
    document.getElementsByTagName('body')[0].appendChild(script);
}