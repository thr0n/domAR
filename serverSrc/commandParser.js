function parse(command) {

    const parts = command.split(' ').filter(function (part) {
        return part !== ' ';
    });

    return {
        command: parts[0],
        slideId: parts[1]
    }
}

module.exports = {parse};
