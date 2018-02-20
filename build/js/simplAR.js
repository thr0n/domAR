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

    function _wait(resolve) {
        if(typeof window.simplAR === 'undefined' || typeof window._pages === 'undefined') {
            setTimeout(function () {
                _wait(resolve);
            }, 100);
        }
        else {
            resolve();
        }
    }

    function wait() {
        return new Promise((resolve) => {
            _wait(resolve);
        })
    }

    if(!window._pages_ready && window.location.href.indexOf("simplAR") > -1) {
        wait().then(function () {
            addPages();
            window._start();
        })
    }
})()

