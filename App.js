let tmpLocation = "";
let tmpStartTime = "";
let tmpEndTime = "";
/**
 * Define the type of the props field for a React component
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = 
    {
      location: '',
      start_time: '',
      end_time: ''
    };

    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleLocationChange(event) {
    tmpLocation = event.target.value
  }

  handleStartTimeChange(event) {
    tmpStartTime = event.target.value
  }

  handleEndTimeChange(event) {
    tmpEndTime = event.target.value
  }

  handleSubmit(event) {
    this.setState({
      location: tmpLocation,
      start_time: tmpStartTime,
      end_time: tmpEndTime,
    })
    const response = fetch(`/submit?location=${this.state.location}&start=${this.state.start_time}&end=${this.state.end_time}`)
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Location:
          <input type="text" onChange={this.handleLocationChange} />
        </label>
        <label>
          Start time:
          <input type="text" onChange={this.handleStartTimeChange} />
        </label>
        <label>
          End time:
          <input type="text" onChange={this.handleEndTimeChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('input'));
root.render(<App />);
