import React from 'react';

import Modal from '@app-components/modal/Modal';
import ModalHeader from '@app-components/modal/ModalHeader';
import ModalFooter from '@app-components/modal/ModalFooter';
import ModalControls from '@app-components/modal/ModalControls';
import ModalContent from '@app-components/modal/ModalContent';

export default class ConfirmRemoveModal extends React.Component {
  constructor(props) {
    super(props);

    this.confirm = this.confirm.bind(this);
  }

  confirm() {
    this.props.onConfirm();
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} onClose={this.props.onClose}>
        <ModalHeader title="Confirm your action" />
        <ModalContent>
          <div className="default-text">
            <p>This action remove all data about your photograph without a posiibility to restore it.</p>
          </div>
        </ModalContent>
        <ModalFooter>
          <ModalControls>
            <button className={`button button--default button--flat button--flat_black button--flat_indent`} type="button" onClick={this.props.close}>
              Cancel
            </button>
            <button className={`button button--default button--raised button--raised_red`} type="button" onClick={this.confirm}>
              Remove
            </button>
          </ModalControls>
        </ModalFooter>
      </Modal>
    );
  }
}
