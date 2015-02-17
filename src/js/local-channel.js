
var Bacon = require('baconjs');
var _ = require('lodash');

function localChannel(wrapper, channel) {
	var local = new Bacon.Bus();
	local.onValue(val => {
		channel.push([wrapper].concat(_.isArray(val) ? val : [val]));
	});
	return local;
}

module.exports = {
	create: localChannel
};