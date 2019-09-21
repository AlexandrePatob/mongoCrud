const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/teste_do_pato', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

module.exports = mongoose;
