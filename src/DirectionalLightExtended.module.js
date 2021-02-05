import * as THREE from "../node_modules/three/build/three.module.js";

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
    let color    = typeof opts.color === "string" ? new THREE.Color( opts.color ) : opts.color;

    this.color		= color;
    this.intensity	= opts.intensity;

    // States and helpers
    this.state = {
        intensity: this.intensity
    };

    this.shadowCameraHelper = null;

};

DirectionalLightExtended.prototype = Object.assign( Object.create( THREE.DirectionalLight.prototype ), {
    constructor : DirectionalLightExtended,

    enableShadow : function( ){

        this.castShadow	= this.options.castShadow;
        this.shadow.camera.near	= this.options.shadow.camera.near;
        this.shadow.camera.far	= this.options.shadow.camera.far;
        this.shadow.camera.fov	= this.options.shadow.camera.fov;

        this.shadow.mapSize.width	= this.options.shadow.mapSize.width;
        this.shadow.mapSize.height	= this.options.shadow.mapSize.height;

        this.shadow.bias = this.options.shadow.bias;
    },

    toggle: function(){
        this.visible = !this.visible;
    },

    turnOff: function(){
        this.state.intensity = this.intensity;
        this.intensity = 0;
        this.visible = false;

        if ( this.shadowCameraHelper ){
            this.shadowCameraHelper.visible = false;
        }
    },

    turnOn: function(){
       this.intensity =  this.state.intensity;
       this.visible = true;

       if ( this.shadowCameraHelper ){
        this.shadowCameraHelper.visible = true;
       }
    },

    addHelpersToScene: function( scene ){

        this.shadowCameraHelper = new THREE.CameraHelper( this.shadow.camera );

        scene.add( this.target );
        scene.add( this.shadowCameraHelper );

    }

});

export default DirectionalLightExtended;
