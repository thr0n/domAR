export const getContext = (parentSelector) => {
    return document.querySelector(parentSelector + " canvas").getContext('2d')
}

export const clearContext = (ctx, width, height) => {
    ctx.clearRect(0, 0, width, height);
}

export const canvas = {
    getContext,
    clearContext
}