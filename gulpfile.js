/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const gulp = require('gulp');

const build_intefaces = require("./build/build_interfaces_amd");


gulp.task('init', ( done ) => {
    
    done();
    
});

gulp.task("build", ( done ) => {
    "use strict";
    build_intefaces( ()=>{
        
            done();
       
    });
});

gulp.task("buildAMD", build_intefaces );

gulp.task('default', gulp.series('init', 'buildAMD') );