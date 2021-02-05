import * as THREE from "../node_modules/three/build/three.module.js";


const DirectionalLightExtended = function( ){

    console.log("ar: ", arguments );
    let color, intensity;

    if ( typeof arguments[0] === "object" ){
        color = arguments[0].color;
        intensity = arguments[0].intensity;
    } 
    if ( typeof arguments[0] === "number" ){
        color = arguments[0];
    }
    if ( typeof arguments[1] === "number" ){
        intensity = arguments[1];
    }

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

    const o = this.options = Object.assign({}, defaults, arguments[0]);
  

    this.color		= color;
    this.intensity	= intensity;

   
    THREE.DirectionalLight.call( this ); 
    this.state = {
        intensity: this.intensity
    };

};

DirectionalLightExtended.prototype = Object.assign( Object.create( THREE.DirectionalLight.prototype ), {
    constructor : DirectionalLightExtended,

    enableShadow : function( opt ){

        let opts = Object.assign( {}, this.options, opt );
        this.castShadow	= opts.castShadow;
        this.shadow.camera.near	= opts.shadow.camera.near;
        this.shadow.camera.far	= opts.shadow.camera.far;
        this.shadow.camera.fov	= opts.shadow.camera.fov;

        this.shadow.mapSize.width	= opts.shadow.mapSize.width;
        this.shadow.mapSize.height	= opts.shadow.mapSize.height;

        this.shadow.bias = opts.shadow.bias;
    },

    toggle: function(){
        this.visible = !this.visible;
    },

    turnOff: function(){
        this.state.intensity = this.intensity;
        this.intensity = 0;
    },

    turnOn: function(){
       this.intensity =  this.state.intensity;
    },

    addHelpersToScene: function( scene ){

        let shadowCameraHelper 	= new THREE.CameraHelper( this.shadow.camera );

        scene.add( this.target );
        scene.add( shadowCameraHelper );

    }

});

export default DirectionalLightExtended;
