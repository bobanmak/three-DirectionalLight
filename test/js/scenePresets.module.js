import * as THREE from "../../node_modules/three/build/three.module.js";
import Viewport from "../../node_modules/three-viewport/dist/viewport.es.js"
import stage1 from "./stage1.module.js"
import DirectionalLightExtended from "../../src/DirectionalLightExtended_presets.module.js"


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

const presets = {
	daylight: {
		intensity: 1,
		position: [ 4, 4, 4 ],
		target: {
			position: [ 10, -10, 10]
		}
	}, 
	nighttime: {
		intensity: 0.5,
		position: [ 8, 9, 8 ]
	}
};

// add DirectionalLightExtended
let directionalLight 	= new DirectionalLightExtended( { color: "0xff0000", intensity: 0.5 }  );

// add presets on runtime
directionalLight.addPresets( presets );

// create Lights with presets
//let directionalLight 	= new DirectionalLightExtended( { color: "0xff0000", intensity: 0.5 } , presets  );

directionalLight.position.set(3, 6, 3 );
directionalLight.target.position.set(0, 0, 0);
VP.scene.add( directionalLight );


// enable shadow
directionalLight.enableShadow();

// adds Target and CameraHelper to Scene
directionalLight.addHelpersToScene( VP.scene );

// toggle Light
setTimeout( () => { 
	directionalLight.loadPreset( "daylight" );
 }, 2500);

setTimeout( () => { 
	directionalLight.loadPreset( "nighttime" );
}, 5000);