const padding = 15;
// const heading = 60; // top header
// const barBot = 60; // mobile footer / landscape menu
const minW = 540;
const minH = 400;
const borderW = 2;
const buffer = 40;

export function getCenterModalDim(ui, isRelative) {
    

    if (getWidthTooSmall(ui) || getHeightTooSmall(ui)) {
        if (ui.orientation === "portrait")
            return getPortraitSmall(ui, isRelative);
        return getLandscapeSmall(ui, isRelative);
    }

    else {
        const { contentW, contentH, toolbarH, headerH} = ui;

        let w = minW;
        let h = minH;
        let y = (contentH - h - toolbarH) / 2;
        if (!isRelative)
            y += headerH;

        // if (width < 600) {
        //     w = width - padding * 2;
        //     h = height - padding * 2 - headerH - barBot - heading;
        //     let y = padding; // + heading;
        //     if (!isRelative)
        //         y += heading;
        // }
        // else if (height < 400) {
        //     w = 540;
        //     h = height - padding * 2 - headerH - barBot;
        //     let y = padding; // + heading;
        //     if (!isRelative)
        //         y += heading;
        // }

        let x = (contentW - w) / 2 - borderW;
        return { w, h, x, y };
        // console.log(w, h, x, y);
    }
    

// return {w: 100, h: 100, x: 100, y: 100}
}


function getWidthTooSmall(ui) {
    const {contentW} = ui;
    return contentW < minW + padding * 2+buffer;
}

function getHeightTooSmall(ui) {
    const {toolbarH, contentH} = ui;
    return contentH < minH + padding * 2 + toolbarH + buffer;
}


function getLandscapeSmall(ui, isRelative) {
    const {toolbarH, contentW, contentH, headerH} = ui;
    const w = contentW - padding * 2; // 60 = width of menu on left
    const h = contentH - padding - toolbarH;
    // const x = barBot + padding;
    const x = padding;
    let y = padding/2;
    if (!isRelative)
        y += headerH;
    return { w, h, x, y };
    // console.log(x, y, x, h);
    // return {w: 200, h: 100, x: 300, y: 300};
}

function getPortraitSmall(ui, isRelative) {
    const {toolbarH, contentW, contentH, headerH} = ui;
    const w = contentW - padding * 2 ; // 60 = width of menu on left
    const h = contentH - padding * 2 - toolbarH;
    const x = padding - borderW;
    let y = padding; // + heading;
    if (!isRelative)
        y += headerH;
    return { w, h, x, y };
    // return {w: 200, h: 100, x: 300, y: 300};
}