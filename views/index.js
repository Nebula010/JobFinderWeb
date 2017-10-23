const React = require('react');

class HelloWorld extends React.Component {
	render() {
		return <div> Hello {this.props.name} </div>;
	}
}

module.exports = HelloWorld;