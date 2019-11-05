const server = require('./server.js');

server.listen(5555, () => {
  console.log('\n*** Server Running on http://localhost:5555 ***\n');
});
