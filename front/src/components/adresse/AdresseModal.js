import React, {Component} from "react";
import {Button, Col, Row} from "react-bootstrap";
import {Modal} from "react-responsive-modal";
import Adresse from "./Adresse";

export class AdresseModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.open !== nextProps.showModal) {
      return { open: nextProps.showModal };
    }
    return null;
  }

  handleChange = (adresse) => {
    this.props.selectedAdress(adresse);
  };

  render() {
    const listeAdresses = this.props.listeAdresses?.map((adresse, index) => {
      return (

          <>
            <Adresse
                key={index}
                adresse={adresse}
                handleChange={this.handleChange}
            />

            {this.props.listeAdresses.length > 1 && (<hr
                    className="borderDeclarationCession"
                    style={{marginTop: "20px", marginBottom: "20px"}}
                />
            )}
          </>

      );
    });

    return (
      <Modal
        closeOnOverlayClick={false}
        showCloseIcon={false}
        open={this.state.open}
        center
      >
        <Row>
          <Col>{listeAdresses}</Col>
        </Row>

        <Button
          className="buttonValider"
          onClick={() => {
            this.props.handleCloseModalValidate();
          }}
        >
          Valider la sélection
        </Button>
        <Button
          className="buttonAnnuler"
          onClick={() => {
            this.props.handleCloseModal();
          }}
        >
          Annuler
        </Button>
      </Modal>
    );
  }
}

export default AdresseModal;
