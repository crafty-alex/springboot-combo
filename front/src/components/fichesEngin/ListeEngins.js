import React, { Component } from "react";
import "react-table/react-table.css";
import "../../static/css/table-styles.css";
import axios from "axios";
import SearchEngin from "../search/SearchEngin";
import NotificationAlert from "react-notification-alert";
import moment from "moment";
import "moment/locale/fr";
import TabEngin from "./TabEngin";

class ListeEngins extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    moment.locale("fr");
    this.state = {
      autosearch: props.match.params.id,
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

    if (this.props.match.params.id === "false") {
      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_ALL_ENGINS_URL}?page=${this.state.page}&size=20&sort=datePremiereDeclaration,DESC&sort=heurePremiereDeclaration,DESC`
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
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.setState({ autosearch: nextProps.match.params.id });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  showCustomEnginsList = (page, data) => {
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
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_ALL_ENGINS_URL}?page=${page}&size=20&sort=datePremiereDeclaration,DESC&sort=heurePremiereDeclaration,DESC`
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
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_CUSTOM_ENGIN_URL}`,
        searchedInput
      )
      .then((response) => {
        this.showCustomEnginsList(response.data, searchedInput);
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

        <h1 className="main-title">Récapitulatif des fiches engin</h1>

        <SearchEngin
          showLoading={this.showLoading}
          showCustomEnginsList={this.showCustomEnginsList}
          showError={this.showError}
          autosearch={this.state.autosearch}
        />

        <TabEngin
          search={this.state.search}
          totalElementsEngin={this.state.totalElements}
          disabledButtonPreviousEngin={this.state.disabledButtonPrevious}
          fetchDataEnginCustom={this.fetchDataCustom}
          fetchDataEngin={this.fetchData}
          pageEngin={this.state.page}
          totalPagesEngin={this.state.totalPages}
          disabledButtonNextEngin={this.state.disabledButtonNext}
          dataEngin={this.state.data}
          sort={this.state.sort}
          loadingEngin={this.state.loading}
        />
      </>
    );
  }
}

export default ListeEngins;
