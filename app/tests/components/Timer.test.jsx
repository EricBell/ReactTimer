var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Timer = require('AndrewsTimer');

describe('Timer', () => {
  it('should exist', () => {
    expect(Timer).toExist();
  });

  it('should start and count up', (done) => {
    var timer = TestUtils.renderIntoDocument(<Timer/>);
    expect(timer.state.count).toBe(0);
    timer.handleStatusChange('started');
    setTimeout( () => {
      expect(timer.state.count).toBe(3);
      done();
    }, 3001);
    
  });

  it('should stop and reset the count', (done) => {
    var timer = TestUtils.renderIntoDocument(<Timer/>);
    timer.handleStatusChange('started');
    setTimeout( () => {
      expect(timer.state.count).toBe(3);
      timer.handleStatusChange('stopped');
      expect(timer.state.count).toBe(0);
      done()
    },3001);
  });

  it ('should pause and start again where it left off', () => {
    var timer = TestUtils.renderIntoDocument(<Timer />);
    expect(timer.state.count).toBe(0);
    expect(timer.state.timerStatus).toBe('stopped');

    timer.setState({ count: 10});
    timer.handleStatusChange('started');
    timer.handleStatusChange('paused');

    setTimeout( () => {
      expect(timer.state.count).toBe(10);
      expect(timer.state.timerStatus).toBe('paused');
    }, 1001);


  });

  // My version before seeing his.
  it('should pause and start again where it left off', (done) => {
    var timer = TestUtils.renderIntoDocument(<Timer/>);
    expect(timer.state.count).toBe(0);
    timer.handleStatusChange('started');
    setTimeout( () => {
      expect(timer.state.count).toBe(1);
      timer.handleStatusChange('paused');
      done();
      setTimeout( () => {
        expect(timer.state.count).toBe(1);
        timer.handleStatusChange('started');
        done();
        setTimeout( () => {
          expect(timer.state.count).toBe(2);
          done();
        }, 1001);
      }, 1001);
    }, 1001);
  });
});
