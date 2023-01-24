import React, {Component} from "react";
import {Button, Col, Row} from "react-bootstrap";
import {Modal} from "react-responsive-modal";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import {Loader} from "react-overlay-loader";
import {LoginContext} from "../util/LoginContext";
import PersonnePhysiquePourContact from "./PersonnePhysiquePourContact";

export class ListePersonnePhysiquePourContactModal extends Component {
  static contextType = LoginContext;

  state = {
    loading: false,
    autre: false,
    open: false,
    numeroSerieVin: "",
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.open !==
      nextProps.showModalListePersonnePhysiquePourContactModal
    ) {
      return { open: nextProps.showModalListePersonnePhysiquePourContactModal };
    }
    return null;
  }

  handleChangePersonnePhysique = (personnePhysique) => {
    this.setState({ personnePhysique: personnePhysique });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let data = {
      personneMorale: this.props.objPersonne,
      personnePhysique: this.state.personnePhysique,
      representant: this.props.representant,
    };

    const jsonData = JSON.stringify(data);
    const blobData = new Blob([jsonData], {
      type: "application/json",
    });

    this.setState({ loading: true });

    var formData = new FormData();
    if (this.props.fileKbis != null) {
      formData.append("fileKbis", this.props.fileKbis);
    }
    if (this.props.fileCni != null) {
      formData.append("fileCni", this.props.fileCni);
    }
    formData.append("data", blobData);

    axios
      .post(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_POST_SAVE_NEW_CONTACT_POUR_PERSONNE_MORALE}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      .then((response) => {
        this.setState({
          loading: false,
        });
        this.props.trace.demandeId = response.data[0];
        this.props.trace.identifiantUsagerId = response.data[1];
        this.props.trace.personnePhysiqueId = response.data[2];

        axios.post(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_SAVE_TRACE_URL}`,
          this.props.trace
        );
        this.alertSuccess("Modifications enregistrées");
        setTimeout(
          () =>
            this.props.handleCloseModalListePersonnePhysiquePourContactModal(),
          1500
        );
        this.props.handleCloseModalDeclarationContactPersonneMorale();
        this.props.fetchInfoUsager();
      })
      .catch(() => {
        this.setState({ loading: false });
        this.alertFail("Merci de vérifier les informations saisies");
      });
  };

    alertSuccess = (message) => {
    const options = {
      place: "tc",
      message: (
        <div>
          <div>
            <strong>{message} </strong>
          </div>
        </div>
      ),
      type: "success",
      autoDismiss: 3,
    };

    this.refs.notify.notificationAlert(options);
  }

    alertFail = (message) => {
    const options = {
      place: "tc",
      message: (
        <div>
          <div>
            <strong>{message} </strong>
          </div>
        </div>
      ),
      type: "danger",
      autoDismiss: 3,
    };

    this.refs.notify.notificationAlert(options);
  }

  render() {
    const listeUsagers = this.props.listePersonnePhysiques?.map(
      (personnePhysique, index) => {
        return (
          <PersonnePhysiquePourContact
            key={index}
            personnePhysique={personnePhysique}
            handleChangePersonnePhysique={this.handleChangePersonnePhysique}
          />
        );
      }
    );

    return (
      <>
        <Modal
          closeOnOverlayClick={false}
          showCloseIcon={false}
          open={this.state.open}
          center
        >
          <Loader fullPage loading={this.state.loading} />
          <NotificationAlert ref="notify" />
          <form onSubmit={this.handleSubmit}>
            <Row>
              <Col>{listeUsagers}</Col>
            </Row>
            <Row style={{ marginTop: "40px" }}>
              <Col xs={12}>
                <Button type="submit" className="buttonValider">
                  Valider
                </Button>
                <Button
                  className="buttonAnnuler"
                  onClick={
                    this.props
                      .handleCloseModalListePersonnePhysiquePourContactModal
                  }
                >
                  Annuler
                </Button>
              </Col>
            </Row>
          </form>
        </Modal>
      </>
    );
  }
}

export default ListePersonnePhysiquePourContactModal;
