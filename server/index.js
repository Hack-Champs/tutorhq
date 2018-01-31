var app = require('./app');

var port = process.env.PORT || 3000;

if(!module.parent){
  app.listen(port, () => {
    console.log(`App listening on port ${ port }`);
  });
}
