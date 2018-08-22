const api = require('./api');
const ui = require('../ui/ui');

let _project_id = 0,
    _story_id = 0;

let _survey_id = null;

const showUserSurveys = () => {

  ui.showProgress();

  api.getUserSurveys()
     .then((data) => {

       ui.hideProgress();
       $('body').removeClass('modal-open');
       $('.modal-backdrop').remove();
       if(data.surveys.length > 0) {

        $('#table-surveys > tbody').empty();
        $('#show-div-surveys').fadeIn();

          $.each(data.surveys, (index, element) => {

            $('#table-surveys > tbody').append('<tr><td>' + element._id + '</td><td><span class="text-info">' + element.name + '</span></td><td><a href=' + element.link + ' target="_blank"' + '>Send link</a></td><td><span class="text-info">' + element.status + '</span></td><td><button id="btn-select-project' + index + '" type="button" class="btn btn-danger btn-fill btn-xs pull-right"><i class="fa fa-clone"></i>Show details</button></td></tr>');

              $('#btn-select-project' + index).click(function (e) {
                  e.preventDefault();
                  $('#div-main,#show-div-stories').hide(); $('#div-details-survey').fadeIn();
                  $('#span-survey-name').html('<i class="fa fa-file-powerpoint-o icon-project" aria-hidden="true"></i>&nbsp; ' + element.name);

                  _survey_id = element._id;

                  // $('#txt-name-project-update').val(element.name);
                  // $('#txt-description-project-update').val(element.description);
                  // $('#txt-status-project-update').val(element.status);
              });
         });

       } else {
        $('#show-div-surveys').hide();
       }

     })
     .catch((error) => {
       ui.hideProgress(); ui.showModalMessage('error', error);
     });
}
/* Organizations */
const createNewOrganization = (event) => {
  event.preventDefault()

  let data = {
    "organization": {
      "name": $('#txt-name-survey').val(),
      "link": "localhost:4741/survey.html",
      "status": "Active"
    }
  }

  // $('#modal-create-project').modal('hide');
  // $('body').removeClass('modal-open');
  // $('.modal-backdrop').remove();
  $('#create-survey-form').hide(); $('#create-survey-questions').fadeIn(); $('#txt-question-one').focus();
  ui.showProgress();

  api.createSurvey(data)
    .then((result) => {
      _survey_id = result.survey._id;
      ui.hideProgress();
    })
    .catch((error) => {
      ui.hideProgress(); ui.showModalMessage('error', error);
    });

}
const showUsserSurveys = () => {
  $('#div-main').fadeIn(); $('#div-details-survey,#div-detail').hide();
}
const updateProject = (event) => {
  event.preventDefault()

  let data = {
    "project": {
      "id": _project_id,
      "name": $('#txt-name-project-update').val(),
      "description": $('#txt-description-project-update').val(),
      "status": $('#txt-status-project-update').val()
    }
  }

  api.updateProject(data)
    .then((result) => {
      cancelEditProject();
      showUserProjects();
      ui.showModalMessage('success');
    })
    .catch((error) => {
      ui.hideProgress(); ui.showModalMessage('error', error);
    });

}

/* clear fields */
const clearFields = () => {
  $('.form-control').val('');
}

// manage the events
const addHandlers = () => {

}

module.exports = {
  addHandlers,
  showUserSurveys
}
