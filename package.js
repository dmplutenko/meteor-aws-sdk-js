Package.describe({
  summary: "Meteor smart package for AWS SDK node.js"
});

Package.on_use(function (api) {
  api.add_files('aws_server.js', 'server');
});

