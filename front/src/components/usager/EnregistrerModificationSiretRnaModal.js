import React, {Component} from "react";
import {Button, Col, Row} from "react-bootstrap";
import {Modal} from "react-responsive-modal";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import {Loader} from "react-overlay-loader";
import {LoginContext} from "../util/LoginContext";

export class EnregistrerModificationSiretRnaModal extends Component {
  static contextType = LoginContext;
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loading: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.open !== nextProps.showModalEnregistrerModificationSiretRnaModal
    ) {
      return { open: nextProps.showModalEnregistrerModificationSiretRnaModal };
    }
    return null;
  }

  handleSubmitSave = () => {
    this.setState({ loading: true });
    axios
      .post(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_POST_SAVE_NEW_NUMERO_SIRET_RNA_URL}`,
        this.props.data
      )
      .then((response) => {
        this.setState({
          loading: false,
        });
        this.props.trace.demandeId = response.data[0];
        this.props.trace.identifiantUsagerId = response.data[1];

        axios.post(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_SAVE_TRACE_URL}`,
          this.props.trace
        );
        this.alertSuccess("Modifications enregistrées");
        setTimeout(() => {
          this.props.handleCloseModalEnregistrerModificationSiretRnaModal();
        }, 1500);
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
    return (
      <Modal
        closeOnOverlayClick={false}
        showCloseIcon={false}
        open={this.state.open}
        center
      >
        <Loader fullPage loading={this.state.loading} />
        <NotificationAlert ref="notify" />

        <Row>
          <Col
            xs={12}
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <b>
              Une modification du numéro SIRET / RNA associé à la fiche usager
              de la personne morale ci-dessous va avoir lieu. Êtes-vous sûr de
              vouloir continuer ? Si vous cliquez sur « Annuler », aucune
              modification ne sera prise en compte. Si vous cliquez sur « Ok »,
              une modification du numéro SIRET / RNA sera enregistrée.
            </b>
          </Col>
          <Col
            xs={12}
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Row>
              <Col xs={12}>
                <Button
                  className="buttonValider"
                  onClick={this.handleSubmitSave}
                >
                  ok
                </Button>
                <Button
                  className="buttonAnnuler"
                  onClick={
                    this.props
                      .handleCloseModalEnregistrerModificationSiretRnaModal
                  }
                >
                  Annuler
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    );
  }
}
export default EnregistrerModificationSiretRnaModal;
