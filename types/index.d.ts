export declare global {
    interface APPType {
        scene: AFRAME.Scene
    }

    interface Window {
        // add you custom properties and methods
        ethSystem: EtherealLayoutSystem;
        APP: APPType;
    }
}