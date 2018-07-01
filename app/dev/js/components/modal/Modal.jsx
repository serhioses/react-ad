import React from 'react';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: !!props.isOpen,
    };

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.isOpen !== 'undefined') {
      this.setState({
        isOpen: nextProps.isOpen,
      });
    }
  }

  open() {
    this.setState({
      isOpen: true,
    });
  }

  close() {
    this.setState({
      isOpen: false,
    }, () => {
      this.props.onClose && this.props.onClose();
    })
  }

  render() {
    const clonedChildren = React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        open: this.open,
        close: this.close,
      });
    });

    return (
      <div className={`modal ${this.state.isOpen ? "modal--active" : ""}`} onClick={this.close}>
        <div className={`modal__window ${this.state.isOpen ? "modal__window--active" : ""}`}>
          {clonedChildren}
        </div>
      </div>
    );
  }
}
