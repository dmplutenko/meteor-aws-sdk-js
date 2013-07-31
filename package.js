Package.describe({
  summary: "Meteor smart package for AWS SDK node.js"
});

if((typeof Npm==="object")||(typeof Npm==="function")){
  if (typeof Npm.depends == "function"){
    Npm.depends({"aws-sdk": "1.4.1"});
  }
}

Package.on_use(function (api) {
  api.add_files('aws_server.js', 'server');
});

