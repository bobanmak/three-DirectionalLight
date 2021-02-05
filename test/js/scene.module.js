import * as THREE from "../../node_modules/three/build/three.module.js";
import Viewport from "../../node_modules/three-viewport/dist/viewport.es.js"
import stage1 from "./stage1.module.js"
import DirectionalLightExtended from "../../src/DirectionalLightExtended.module.js"
// https://sbcode.net/threejs/directional-light-shadow/

const target = [ 1, -1, 0 ];


let VP = new Viewport();

VP.init();
VP.start();

//document.body.appendChild( VP.renderer.domElement );
VP.renderer.setClearColor('white', 0 );
VP.renderer.shadowMap.enabled	= true;
VP.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

VP.camera.position.set(0,2,5);
VP.camera.lookAt(VP.scene.position);
	
// add a ambient light
VP.scene.add( new THREE.AmbientLight( 0x666666, 0.1 ) );
stage1( VP );


let directionalLight 	= new DirectionalLightExtended(  0xff0000, 0.5  );
directionalLight.position.set(3, 2, 3 );
directionalLight.target.position.set(0, 0, 0);
VP.scene.add( directionalLight );

console.log( "dd", JSON.stringify( directionalLight ));

//directionalLight.turnOff();

// toggle Light
setTimeout( function(){
	directionalLight.turnOn();
	console.log( "dd", directionalLight);
}, 3000);
// enable shadow
directionalLight.enableShadow( );

// adds Target and CameraHelper to Scene
directionalLight.addHelpersToScene( VP.scene );

