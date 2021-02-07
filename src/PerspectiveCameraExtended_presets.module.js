import * as THREE from "../node_modules/three/build/three.module.js";
import Presetable from "./Presetable.module.js";

const PrespectiveCameraExtended = function( opts, presets ){

    THREE.PerspectiveCamera.call( this ); 

    const defaults = { };

    this.options = Object.assign( {}, defaults, opts );

    this.fov =  opts.fov;
    this.aspect = opts.aspect;
    this.near = opts.near;
    this.far = opts.far;


    // YOu can add objects as presets
    Presetable.initialize.call( this, presets );

};

PrespectiveCameraExtended.prototype = Object.assign( Object.create( THREE.PerspectiveCamera.prototype ),  Presetable, {
    constructor : PrespectiveCameraExtended,

});

export default PrespectiveCameraExtended;
