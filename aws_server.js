var installNodeJsPackage=function(meteorPackage,nodePackage){
  var require=__meteor_bootstrap__.require;
  var path = require('path');
  var child_process = require('child_process');
  var future = require ('fibers/future');
  var spawnSync = function(file, args, options) {
    var wrapped = future.wrap(function(cb) {
      var proc = child_process.spawn(file, args, options);
      proc.on('close', function(code, signal) {
        cb(code !== 0 ? "Command failed with exit code " + code : null);
      });
      proc.on('error', function(error) {
        cb(error);
      });
    });
    wrapped().wait();
  };
  console.log("process.env.PACKAGE_DIRS");
  console.log(process.env.PACKAGE_DIRS);
  console.log("process.env");
  console.log(process.env);
  var packagePath;
  if(process.env.PACKAGE_DIRS!=undefined){
    packagePath=path.join(process.env.PACKAGE_DIRS, meteorPackage);
  }else{
    console.log("ON HEROKU");
    packagePath=path.join(process.env.PWD,'.meteor','heroku_build/app/server/node_modules/npm/bin');
  }
  var pac;
  try{
    pac=require(nodePackage);
  }catch(e){
    spawnSync("npm",["install",nodePackage],{cwd:packagePath,stdio:'inherit'});
    pac=require(nodePackage); 
  }
  return pac;
}

var installNodeJsPackageInDir=function(meteorPackage,nodeDir){
  var require=__meteor_bootstrap__.require;
  var path = require('path');
  var child_process = require('child_process');
  var future = require ('fibers/future');
  var spawnSync = function(file, args, options) {
    var wrapped = future.wrap(function(cb) {
      var proc = child_process.spawn(file, args, options);
      proc.on('close', function(code, signal) {
        cb(code !== 0 ? "Command failed with exit code " + code : null);
      });
      proc.on('error', function(error) {
        cb(error);
      });
    });
    wrapped().wait();
  };
  packagePath=path.join(process.env.PACKAGE_DIRS, meteorPackage,nodeDir);
  var pac;
  try{
    pac=require(packagePath);
  }catch(e){
    spawnSync("npm",["install"],{cwd:packagePath,stdio:'inherit'});
    pac=require(packagePath); 
  }
  return pac;
}

AWS = installNodeJsPackage('aws-sdk-js', 'aws-sdk');
//AWS =installNodeJsPackageInDir('aws-sdk-js', 'aws-sdk-js');
