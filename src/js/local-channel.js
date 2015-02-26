
var Bacon = require('baconjs');
var _ = require('lodash');

function localChannel(action, channel) {
	var local = new Bacon.Bus();
	local.onValue(val => {
		channel.push(action(val));
	});
	return local;
}

module.exports = {
	create: localChannel
};