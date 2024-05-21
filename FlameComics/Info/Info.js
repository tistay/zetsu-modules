function Info(request, extra, javascriptConfig, output) {
    this.request = request; 
    this.extra = extra;
    this.javascriptConfig = javascriptConfig;
    this.output = output;
}

function ModuleRequest(url, method, headers, httpBody) {
    this.url = url;
    console.log(' begin begin begin ' + url + ' small sep ' + typeof url);
    this.method = method;
    this.headers = headers;
    this.httpBody = httpBody;
}

function Extra(commands, extraInfo) {
    this.commands = commands;
    this.extraInfo = extraInfo;
}

function Commands(commandName, params) {
    this.commandName = commandName;
    this.params = params;
}

function JavascriptConfig(removeJavascript, loadInWebView, javaScript) {
    this.removeJavascript = removeJavascript;
    this.loadInWebView = loadInWebView;
    this.javaScript = javaScript;
}

function KeyValue(key, value) {
    this.key = key;
    this.value = value;
}

function Chapter(chapName, link, openInWebView) {
    this.chapName = chapName;
    this.link = link;
    this.openInWebView = openInWebView;
}

function Output(image, title, link, description, genres, field1, field2, field3, field4, chapters) {
    this.image = image;
    this.link = link;
    this.title = title;
    this.description = description;
    this.genres = genres;
    this.field1 = field1;
    this.field2 = field2;
    this.field3 = field3;
    this.field4 = field4;
    this.chapters = chapters;
}

function getStuff(array, match) {
    for (var x = 0; x < array.length; x++) {
        let data = array[x].innerText;
        if (data.includes(match)) {
            return data.replace(match, '').trim();
        }
    }
}

function getHtmlStuff(array, match) {
    for (var x = 0; x < array.length; x++) {
        let data = array[x].innerText;
        if (data.includes(match)) {
            return array[x];
        }
    }
}

var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
let emptyKeyValue = [new KeyValue('', '')];
var episodes = [];
var type = document.querySelector('div.tsinfo > div:nth-child(1) i').textContent;
var status = document.querySelector('div.tsinfo > div:nth-child(2) i').textContent;
var genres = [];
genres = Array.from(document.querySelectorAll('.wd-full a')).map(g => g.textContent);
var desc;
try {
    desc = document.querySelector('[itemprop=\"depion\"]').textContent.replaceAll('\\n', '').trim();
} catch {}
var title = document.querySelector('.entry-title').textContent.trim();
var image = document.querySelector('.thumb img').src;
image = new ModuleRequest(image, 'get', emptyKeyValue, null);
var chapters = document.querySelector('#chapterlist').querySelectorAll('li');
for (var i = chapters.length - 1; i >= 0; i--) {
    var element = chapters[i];
    var fixedLink = element.querySelector('a').href;
    let chapter = new Chapter(element.querySelector('.chapternum').textContent.trim(), new ModuleRequest(fixedLink, 'get', emptyKeyValue, null), false);
    episodes.push(chapter);
}

let infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, desc, genres, status, type, '', 'Chapters : ' + episodes.length, episodes));
var finalJson = JSON.stringify(infoPageObject);
savedData.innerHTML = finalJson;