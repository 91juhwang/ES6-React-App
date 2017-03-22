import React from 'react';

const HOC = (InnerComp) => class extends React.Component {
  componentWillMount() {
    console.log('will mount')
  }
  render() {
    return (
      <InnerComp {...this.props} />
    )
  }
}

export default class HigherOrder extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Button>buttooon</Button>
        <hr/>
        <LabelHOC>labeddddl</LabelHOC>
      </div>
    );
  }
}

const Button = HOC((props) => <button>{props.children}</button>)

class Label extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const LabelHOC = HOC(Label)
