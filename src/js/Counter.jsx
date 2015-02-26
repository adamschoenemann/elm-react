var React = require('react');
var Elm = require('react-elm');

var View = React.createClass({
	render: function () {
		var {actionChannel, model} = this.props;
		return (
			<div>
				<button onClick={() => actionChannel.push(Actions.Decrement)}>-</button>
				<div>{model}</div>
				<button onClick={() => actionChannel.push(Actions.Increment)}>+</button>
			</div>
		);
	}
});

function update(action, model) {
	switch (action.match()) {
		case Actions.Decrement.match():
			return model - 1;
		case Actions.Increment.match():
			return model + 1;
	}
}

var Model = 0;

var Actions = Elm.createActions(['Decrement', 'Increment']);

module.exports = {
	View: View,
	update: update,
	Model: Model,
	Actions: Actions
};