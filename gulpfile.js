/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const gulp = require('gulp');


const build_vslAMD = require("./build/build_amd");
const build_interfaceAMD = require("./build/build_interface_amd");
const build_perspectiveCamAMD = require("./build/build_perspectivecam_amd");

var pkg = require('./package.json');


gulp.task('init', ( done ) => {
    
    done();
    
});

gulp.task("build", ( done ) => {
    "use strict";
    build_vslAMD( ()=>{
        
            done();
       
    });

    build_interfaceAMD( ()=>{
        
        done();
   
    });

    build_perspectiveCamAMD( ()=>{
        
        done();
   
    });
});

gulp.task("buildAMD", build_vslAMD );
gulp.task("buildAMD", build_interfaceAMD );
gulp.task("buildAMD", build_perspectiveCamAMD  );

gulp.task('default', gulp.series('init', 'buildAMD') );