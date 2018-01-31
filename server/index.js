var app = require('./app');
var routes = require('./routes');

var port = process.env.PORT || 3000;

app.use('/', routes);

if(!module.parent){
  app.listen(port, () => {
    console.log(`App listening on port ${ port }`);
  });
}
