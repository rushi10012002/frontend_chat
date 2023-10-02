import React from 'react'
import Modal from 'react-awesome-modal'
function ModalCom({ width, height, mode, Component, close }) {
    return (
        <Modal visible={mode} width={width} height={height} effect="fadeInUp" onClickAway={close}  >
            <div className="main-model">

                {Component}
            </div>
        </Modal>
    )
}

export default ModalCom