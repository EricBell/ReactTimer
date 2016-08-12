var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');

var Countdown = React.createClass({
  getInitialState() {
      return {
          count: 0,
          countdownStatus: 'stopped'  
      };
  },
  componentDidUpdate(prevProps, prevState) {
    if (this.state.countdownStatus !== prevState.countdownStatus) {
      switch (this.state.countdownStatus) {
        case 'started' :
          this.startTimer();
          break;
        case 'stopped':
          this.setState({count:0});
        case 'paused':
          clearInterval(this.timer);
          this.timer = undefined;
          break;
      }
    }  
  },
  startTimer: function() {
    this.timer = setInterval( () => {
      var newCount = this.state.count - 1;

      this.setState({
        count: newCount >= 0 ? newCount : 0        
      });

      if (this.state.count === 0 && this.state.countdownStatus === 'started') {
        this.setState({
          countdownStatus: 'stopped'
        });
      }
    }, 1000);
  },
  handleSetCountdown: function (seconds) {
    this.setState({
      count: seconds,
      countdownStatus: 'started'
    })
  },
  handleStatusChange: function (newStatus) {
    //console.log('handleStatusChange newStatus: ' + newStatus);
    this.setState({countdownStatus: newStatus});
  },
    displayName: 'Countdown',
    render() {
      var {count, countdownStatus} = this.state;
      var renderControlArea = () => {
        //console.log('renderCtrlArea count:' + count + ' countdownStatus:' + countdownStatus);
        if (countdownStatus !== 'stopped') {
          return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>
        } else {
           return <CountdownForm  onSetCountdown={this.handleSetCountdown}/>
        }
      };
      return (
        <div>
          <Clock totalSeconds={count}/>
          {renderControlArea()}
        </div>
      );
    }
});

module.exports = Countdown;