import * as THREE from "../node_modules/three/build/three.module.js";
import Switchable from "./Switchable.module.js";

const DirectionalLightExtended = function( opts ){
   
    THREE.DirectionalLight.call( this ); 
   
    const defaults = {
        castShadow: true,
        shadow: {
            camera:{
                near: 0.01,
                far: 15,
                fov: 45,
            },
            mapSize:{
                width: 1024,
                height: 1024
            },
            bias: 0
        }
    };
    this.options = Object.assign( {}, defaults, opts );

    Switchable.initialize.call( this, this.options);
};

DirectionalLightExtended.prototype = Object.assign( Object.create( THREE.DirectionalLight.prototype ), Switchable, {
    constructor : DirectionalLightExtended
});

export default DirectionalLightExtended;
