import * as THREE from "../../node_modules/three/build/three.module.js";
import Viewport from "../../node_modules/three-viewport/dist/viewport.es.js"
import stage1 from "./stage1.module.js"
import DirectionalLightExtended from "../../src/DirectionalLightExtended_switchable.module.js"


let VP = new Viewport();

VP.init();
VP.start();

//document.body.appendChild( VP.renderer.domElement );
VP.renderer.setClearColor('white', 0 );
VP.renderer.shadowMap.enabled	= true;
VP.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

VP.camera.position.set(4,4,11);
VP.camera.lookAt(VP.scene.position);
stage1( VP );


// add DirectionalLightExtended
let directionalLight 	= new DirectionalLightExtended( { color: "0xff0000", intensity: 0.9 }  );
directionalLight.position.set(3, 6, 3 );
directionalLight.target.position.set(0, 0, 0);
VP.scene.add( directionalLight );

// enable shadow
directionalLight.setShadow();
directionalLight.enableShadow();

// adds Target and CameraHelper to Scene
directionalLight.addHelpersToScene( VP.scene );

// toggle Light
setTimeout( () =>  directionalLight.turnOff() , 2500);
setTimeout( () =>  directionalLight.turnOn()  , 5000);
setTimeout( () =>  directionalLight.toggle()  , 8000);
setTimeout( () =>  directionalLight.toggle()  , 10000);

// animation
VP.loop.add(function( delta, now ){
	var angle	= 0.1 * Math.PI*2*now;
	directionalLight.target.position.set( 3*Math.cos(angle), 0, 3	*Math.sin(angle) );
});
