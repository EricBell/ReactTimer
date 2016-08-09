var React = require('react');

var Clock = React.createClass({
  formatSeconds: function(totalSeconds) {
    var seconds;
    var minutes;
    seconds = totalSeconds % 60;
    minutes = Math.floor(totalSeconds / 60);
    if (seconds < 10) {
      seconds = '0'+ seconds;
    }
    if (minutes < 10) {
      minutes = '0'+ minutes;
    }
    return minutes + ':' + seconds;
  },
    displayName: 'Clock',
    render: function() {
        return (
            <div>Clock</div>
        );
    }
});

module.exports = Clock;