import * as THREE from "../../node_modules/three/build/three.module.js";
import Viewport from "../../node_modules/three-viewport/dist/viewport.es.js"
import stage1 from "./stage1.module.js"


const target = [ 1, -1, 0 ];


let VP = new Viewport();

VP.init();
VP.start();

//document.body.appendChild( VP.renderer.domElement );
VP.renderer.setClearColor('white', 0 );
VP.renderer.shadowMap.enabled	= true;

VP.camera.position.set(0,2,5);
VP.camera.lookAt(VP.scene.position);
	
// add a ambient light
VP.scene.add( new THREE.AmbientLight( 0x666666 ) );
stage1( VP );


let directionalLight 	= new THREE.DirectionalLight(  0xffffff, 0.5  );
directionalLight.position.set( 0, 50, 0 );
directionalLight.target.position.set( target );
VP.scene.add( directionalLight );


let shadowCameraHelper 	= new THREE.CameraHelper( directionalLight.shadow.camera );
VP.scene.add( shadowCameraHelper );

VP.loop.add(function( delta, now ){
	shadowCameraHelper.update();
});

