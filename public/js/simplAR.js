(function () {

    function addPathToFileneme(filename) {
        if(window.location.href.indexOf("localhost:3000") > -1) {
            return "code/" + filename;
        }
        else {
            return "../public/code/" + filename;
        }
    }

    function addPages() {
        window._pages.forEach(function(page) {
            const path = addPathToFileneme(page.name);
            console.log("add page: " + path);
            window.simplAR.addHtmlPageWithId(page.id, path);
        })
        console.log("----> pages added");
        console.log(window._pages);
        window._pages_ready = true;
    }

    function _addPages() {
        if(typeof window.simplAR === 'undefined' || typeof window._pages === 'undefined') {
            setTimeout(function () {
                _addPages();
            }, 100);
        }
        else {
            addPages();
        }
    }

    if(!window._pages_ready && window.location.href.indexOf("simplAR") > -1) {
        _addPages();
    }
})()

