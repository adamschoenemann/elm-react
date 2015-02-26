
function Action(uid, ...args) {

	var action = function(...newArgs) {
		return Action(uid, ...args.concat(newArgs));
	};
	action.match = function() {return uid;};
	action.chain = function() {
		return action;
	};
	action.getArgs = function() {
		return args;
	};
	return action;
}

module.exports = {
	createActions (defs) {
		var base = {};
		defs.forEach(def => {
			base[def] = Action(def);
		});
		return base;
	}
};