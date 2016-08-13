var React = require('react');
var Clock = require('Clock');
var Controls = require('Controls');

// Added this to dump objects regardless if they've circular references or not.
var stringify = require('json-stringify-safe');

var Timer = React.createClass({
  getInitialState: function () {
    return {
      count: 0,
      timerStatus: 'paused'      
    };
  },
  componentDidUpdate(prevProps, prevState) {
    //console.log('prevProps: ' + stringify(prevProps) + ' prevState: ' + stringify(prevState));  
  },
  componentWillMount() {
    console.log('componentWillMount'); 
  },
  startTimer: function () {
    this.timer = setInterval( () => {
      var newCount = this.state.count + 1;
      this.setState({ count: newCount});
      console.log('timer count: ' + this.state.count);
    }, 1000);
  },
  pauseTimer: function () {
    clearInterval(this.timer);
    this.timer = undefined;
  },
  handleStatusChange: function(newStatus) {
    console.log('handleStatusChange newStatus: ' + newStatus);
    if (newStatus === 'stopped') {
      clearInterval(this.timer);
      this.timer = undefined;
      newStatus = 'paused';
      this.setState({count: 0});
    }
    if (newStatus === 'started') {
      this.startTimer();
    }
    if (newStatus === 'paused') {
      this.pauseTimer();
    }
    this.setState({
      timerStatus: newStatus
    });
  },
  displayName: 'Timer',
  render() {
    var {count,timerStatus} = this.state;
    console.log('count: '+ count + ' timerStatus: ' + timerStatus);
    return (
      <div>
        <h1 className="page-title">Timer</h1>
        <Clock totalSeconds={count}/>
        <Controls countdownStatus={timerStatus} onStatusChange={this.handleStatusChange}/>
      </div>
    );
  }
});

module.exports = Timer;