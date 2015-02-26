
var React = require('react');
var Counter = require('./Counter.jsx');
var Bacon = require('baconjs');
var LC = require('local-channel');
var Elm = require('react-elm');
var Immutable = require('immutable');

var Actions = Elm.createActions(['Insert', 'Remove', 'Modify']);

var App = React.createClass({
	clickChannel: new Bacon.Bus(),
	getInitialState() {
		return {
			counters: Immutable.List([0,1,2])
		};
	},
	componentWillMount() {
		this.clickChannel.onValue((action => {
			switch (action.match()) {
				case Actions.Modify.match():
					var [index, next] = action.getArgs();
					return this.replaceState({
						counters: this.state.counters.set(
							index,
							Counter.update(next, this.state.counters.get(index))
						)
					});
				case Actions.Insert.match():
					return this.replaceState({
						counters: this.state.counters.push(Counter.Model)
					});
				case Actions.Remove.match():
					return this.replaceState({
						counters: this.state.counters.pop()
					});
			}
		}).bind(this));
	},
	render () {
		var counters = this.state.counters.toArray().map((c, i) => {
			return <Counter.View
						model={c}
						actionChannel={LC.create(Actions.Modify(i), this.clickChannel)} />;
		}, this);
		return (
			<div>
				{counters}
				<button onClick={() => LC.create(Actions.Insert, this.clickChannel).push()}>Insert</button>
				<button onClick={() => LC.create(Actions.Remove, this.clickChannel).push()}>Remove</button>
			</div>
		);
	}
});

React.render(
	<App/>,
	document.getElementById('app')
);
