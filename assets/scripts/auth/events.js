const getFormFields = require('../../../lib/get-form-fields');
const api = require('./api');
const store = require('../store');
const ui = require('../ui/ui');
const project = require('../project/events')

let _typeAccount = null;

/**
 * Register the user.
 *
 * @param event submit event.
 */
const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(this);

  const bodydata = { credentials: {
    name: data.credentials.name,
    email: data.credentials.email,
    password: data.credentials.password,
    password_confirmation: data.credentials.password_confirmation,
    type: _typeAccount
  }}

  ui.showProgress();

  setTimeout(function() {

    api.signUp(bodydata)
    .then(() => {

      api.signIn({credentials:{
        email: data.credentials.email,
        password: data.credentials.password
      }})
      .then((result) => {

        store.user = result.user;
        //console.log(result.user)
        switch (_typeAccount) {
          case "Organization":
            api.createOrganization({organization: {
              name: data.credentials.organizationname,
              description: data.credentials.description,
              address: data.credentials.address,
              phone: data.credentials.phone
            }})
            .then((datos) => {
              $('#organization-name').text(datos.organization.name)
              clearFields(); ui.hideProgress();
              $('#modal-signup-orga,#modal-signup-volu').modal('hide');
              $('body').removeClass('modal-open');
              $('.modal-backdrop').remove();

              $('#user-name').text(result.user.name);
              $('#li-user,#dashboard').fadeIn();
              $('#li-sign-in,#div-description').hide();
            })
          case "Volunteer":

          return;
        }

      })
      .catch((error) => {
        ui.hideProgress(); ui.showModalMessage('error', error);
      });


    })
    .catch((error) => {
      ui.hideProgress(); ui.showModalMessage('error', error);
    });

  }, 2000);

}
/* Log in */
const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(this);

  ui.showProgress();
  setTimeout(function() {

    api.signIn(data)
    .then((result) => {

      store.user = result.user;

      api.getOrganization()
      .then((datos) => {

        $('#organization-name').text(datos.organizations[0].name)
        $('#modal-sign-in').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();

        $('#user-name').text(result.user.name);
        $('#li-user,#dashboard').fadeIn();
        $('#li-sign-in,#div-description').hide();

        ui.hideProgress();

      })
      .catch((error) => {
        ui.hideProgress(); ui.showModalMessage('error', error);
      });
      ui.hideProgress();

    })
    .catch((error) => {
      ui.hideProgress(); ui.showModalMessage('error', error);
    });

  }, 2000);

}
/* Change password */
const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(this);

  ui.showProgress();

  api.changePassword(data)
    .then(() => {
      $('#view-change-password').hide(); $('#card-user').fadeIn();
      ui.hideProgress(); ui.showModalMessage('success');
      //console.log('changing password in ran!')
    })
    .catch((error) => {
      ui.hideProgress(); ui.showModalMessage('error', error);
    });


}
/* sing out */
const onSignOut = function () {

  api.signOut()
    .then(() => {
      $('#li-user,#dashboard').hide();
      $('#li-sign-in,#div-description').fadeIn();
      clearFields();
      // $('#show-dashboard').addClass('active');
      // $('#show-user-profile').removeClass('active');
      // clearFields(); ui.hideProgress();
      // $('.wrapper,#div-show-perfil,#div-details-project,#show-div-projects').hide();
      // $('#manage-section,#div-main').fadeIn();
      store.user = null;
      //console.log('sign out ran!')
    })
    .catch((error) => {
      ui.showModalMessage('error', error);clearFields();
    });
}

const showModalSignOrga = () => {
  _typeAccount = "Organization";
  $('#modal-signup-orga').modal({
    keyboard: false
  });

  setTimeout(() => {
    $('#txt-org-name').focus();
  }, 800);
}
const showModalSignVolunteer = () => {
  _typeAccount = "Volunteer";
  $('#modal-signup-volu').modal({
    keyboard: false
  });
}
const showModalSignIn = () => {
  $('#modal-sign-in').modal({
    keyboard: false
  });
  setTimeout(() => {
    $('#txt-sign-in-email').focus();
  }, 800);
}
/* clear fields */
const clearFields = () => {
  $('.form-control').val('');
}
const showOrgInfo = () => {
  $('#div-organization-info,#btn-save').fadeIn(); $('#div-personal-info-org,#btn-next-org').hide();
}
// manage the events
const addHandlers = () => {
  $('#sign-up-organization').on('submit', onSignUp);
  $('#sign-up-volunteer').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#change-password').on('submit', onChangePassword);
  $('#li-user').on('click', onSignOut);
  $('#btn-show-sign-up-organization').on('click', showModalSignOrga);
  $('#btn-show-sign-up-volunteer').on('click', showModalSignVolunteer);
  $('#li-sign-in').on('click', showModalSignIn);
  $('#btn-next-org').on('click', showOrgInfo);
}

module.exports = {
  addHandlers
}
