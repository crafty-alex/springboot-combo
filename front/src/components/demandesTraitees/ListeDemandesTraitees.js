import React, { Component } from "react";
import "react-table/react-table.css";
import "../../static/css/table-styles.css";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import SearchDemandesTraitees from "../search/SearchDemandesTraitees";
import TabDemandeTraitee from "./TabDemandeTraitee";

class ListeDemandesTraitees extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sort: true,
      loading: false,
      totalElements: 0,
      page: 0,
      totalPages: 0,
      disabledButtonPrevious: true,
      disabledButtonNext: true,
      search: false,
      searchedInput: {},
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({ loading: true });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_ALL_DEMANDES_TRAITEES_URL}?page=${this.state.page}&size=20&sort=dateTraitement,DESC&sort=heureTraitement,DESC`
      )
      .then((res) => {
        if (this._isMounted) {
          this.setState(
            {
              data: res.data.content,
              loading: false,
              totalElements: res.data.totalElements,
              page: res.data.number,
              totalPages: res.data.totalPages,
            },
            () => {
              if (this.state.page + 1 < this.state.totalPages) {
                this.setState({
                  disabledButtonNext: false,
                });
              }
            }
          );
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  showCustomDemandesList = (page, data) => {
    this.setState(
      {
        search: true,
        searchedInput: data,
        data: page.content,
        loading: false,
        sort: true,
        page: page.number,
        totalPages: page.totalPages,
        totalElements: page.totalElements,
      },
      () => {
        if (this.state.page === 0) {
          this.setState({
            disabledButtonPrevious: true,
          });
        } else {
          if (this.state.page + 1 === this.state.totalPages) {
            this.setState({
              disabledButtonNext: true,
              disabledButtonPrevious: false,
            });
          }
        }
        if (this.state.page + 1 < this.state.totalPages) {
          this.setState({ disabledButtonNext: false });
        } else {
          this.setState({ disabledButtonNext: true });
        }
      }
    );
  };

  showLoading = () => {
    this.setState({ loading: true, sort: false });
  };

  showError = () => {
    this.setState({ loading: false });
  };

  fetchData = (direction) => {
    let page = 0;

    if (direction) {
      page = this.state.page + 1;
    } else {
      page = this.state.page - 1;
    }

    this.setState({ loading: true, sort: false });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_ALL_DEMANDES_TRAITEES_URL}?page=${page}&size=20&sort=dateTraitement,DESC&sort=heureTraitement,DESC`
      )
      .then((res) => {
        this.setState(
          {
            data: res.data.content,
            loading: false,
            totalElements: res.data.totalElements,
            page: res.data.number,
            totalPages: res.data.totalPages,
            disabledButtonPrevious: false,
            sort: true,
          },
          () => {
            if (this.state.page === 0) {
              this.setState({
                disabledButtonPrevious: true,
              });
            }
            if (this.state.page + 1 === this.state.totalPages) {
              this.setState({ disabledButtonNext: true });
            }
            if (this.state.page + 1 < this.state.totalPages) {
              this.setState({ disabledButtonNext: false });
            }
          }
        );
      });
  };

  fetchDataCustom = (direction) => {
    let page = 0;

    if (direction) {
      page = this.state.page + 1;
    } else {
      page = this.state.page - 1;
    }

    this.setState({ loading: true, sort: false });

    let searchedInput = this.state.searchedInput;
    searchedInput.page = page;

    axios
      .post(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_CUSTOM_DEMANDES_TRAITEES_URL}`,
        searchedInput
      )
      .then((response) => {
        this.showCustomDemandesList(response.data, searchedInput);
      })
      .catch(() => {
        this.alertFail("Échec : Saisie invalide");
        this.showError();
      });
  };

  alertFail = (message) => {
    let options = {
      place: "tc",
      message: (
        <div>
          <div>
            <strong> {message} </strong>
          </div>
        </div>
      ),
      type: "danger",
      autoDismiss: 3,
    };
    this.refs.notify.notificationAlert(options);
  };

  render() {
    return (
      <>
        <div>
          <NotificationAlert ref="notify" />
        </div>

        <h1 className="main-title">Demandes traitées</h1>

        <SearchDemandesTraitees
          showLoading={this.showLoading}
          showCustomDemandesList={this.showCustomDemandesList}
          showError={this.showError}
        />

        <TabDemandeTraitee
          search={this.state.search}
          totalElementsDemande={this.state.totalElements}
          fetchDataDemandeCustom={this.fetchDataCustom}
          fetchDataDemande={this.fetchData}
          pageDemande={this.state.page}
          totalPagesDemande={this.state.totalPages}
          disabledButtonPreviousDemande={this.state.disabledButtonPrevious}
          disabledButtonNextDemande={this.state.disabledButtonNext}
          dataDemande={this.state.data}
          sort={this.state.sort}
          loadingDemande={this.state.loading}
          complet={false}
        />
      </>
    );
  }
}

export default ListeDemandesTraitees;
