export interface UI {
    width: number;
    height: number;
    isMobile: boolean;
    orientation: string;
    size: string;
    hasFooter: boolean;
    headerH: number;
    toolbarH: number;
    contentW: number;
    contentH: number;
    edgeSpacing: number;
}

export interface SketchP {
    ui: UI;
    hasLoadedRoom: boolean;
    audioOn: boolean;
    currentPage: string;
}