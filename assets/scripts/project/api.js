const config = require('../config')
const store = require('../store')

/**
 * Show the user's profile.
 *
 */
const showUserProfile = function () {

  return $.ajax({
    url: config.apiUrl + '/users/' + store.user.id,
    method: 'GET',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  });

}
/**
 * Set the value to the cell in the array of cells in the game array with the cell marked in the board.
 *
 * @param data  Type => Object. User's profile.
 *
 * Return a promise
 */
const updateUser = function (data) {

  return $.ajax({
    url: config.apiUrl + '/users/' + store.user.id,
    method: 'PUT',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: JSON.stringify(data)
  });

}
/**
 * Show the user's surveys.
 *
 */
const getUserSurveys = function () {
  return $.ajax({
    url: config.apiUrl + '/surveys',
    method: 'GET',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  });

}

const getSurveyQuestions = function (id) {
  return $.ajax({
    url: config.apiUrl + '/questions/' + id,
    method: 'GET',
    contentType: "application/json; charset=utf-8",
    dataType: "json"
  });
}

/**
 * Request to the api to update a project.
 *
 * @param data  {Object} Object project with all its properties.
 *
 * Return a promise.
 */
const updateProject = function (data) {

  return $.ajax({
    url: config.apiUrl + '/projects/' + data.project.id,
    method: 'PUT',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: JSON.stringify(data)
  });

}
/**
 * Request to the api to delete a project.
 *
 * @param project_id  {Integer} Project id.
 *
 * Return a promise.
 */
const deleteProject = function (project_id) {

  return $.ajax({
    url: config.apiUrl + '/projects/' + project_id,
    method: 'DELETE',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  });

}

const createQuestions = function (data) {

  return $.ajax({
    url: config.apiUrl + '/questions',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: JSON.stringify(data)
  });

}
const createResponses = function (data) {

  return $.ajax({
    url: config.apiUrl + '/responses',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(data)
  });

}
const getSurveyResponses = function (id) {
  return $.ajax({
    url: config.apiUrl + '/responses/' + id,
    method: 'GET',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  });
}

module.exports = {
  showUserProfile,
  updateUser,
  getUserSurveys,
  getSurveyQuestions,
  updateProject,
  deleteProject,
  createQuestions,
  createResponses,
  getSurveyResponses
}
