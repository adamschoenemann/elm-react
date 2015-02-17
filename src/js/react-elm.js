
module.exports = {
	createActions (actions) {
		var base = {};
		actions.forEach(action => {
			base[action] = action;
		});
		return base;
	}
};