
var React = require('react');
var Counter = require('./Counter.jsx');
var Bacon = require('baconjs');
var LC = require('local-channel');
var Elm = require('react-elm');
var Immutable = require('immutable');

var Actions = Elm.createActions(['First', 'Second']);

var App = React.createClass({
	clickChannel: new Bacon.Bus(),
	getInitialState() {
		return Immutable.Map({first: Counter.Model, second: Counter.Model});
	},
	componentWillMount() {
		this.clickChannel.onValue(actions => {
			var [action, next] = actions;
			switch (action) {
				case Actions.First:
					return this.replaceState(this.state.set('first', Counter.update(next, this.state.get('first'))));
				case Actions.Second:
					return this.replaceState(this.state.set('second', Counter.update(next, this.state.get('second'))));
			}
		}.bind(this));
	},
	render () {
		return (
			<div>
				<Counter.View model={this.state.get('first')} actionChannel={LC.create(Actions.First, this.clickChannel)} />
				<Counter.View model={this.state.get('second')} actionChannel={LC.create(Actions.Second, this.clickChannel)} />
			</div>
		);
	}
});

React.render(
	<App/>,
	document.getElementById('app')
);
