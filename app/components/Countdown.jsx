var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');


var Countdown = React.createClass({
  getInitialState() {
      return {
          count: 0  
      };
  },
  handleSetCountdown: function (seconds) {
    this.setState({
      count: seconds
    })
  },
    displayName: 'Countdown',
    render() {
      var {count} = this.state;
        return (
            <div>
              <Clock totalSeconds={count}/>
              <CountdownForm  onSetCountdown={this.handleSetCountdown}/>
            </div>
        );
    }
});

module.exports = Countdown;