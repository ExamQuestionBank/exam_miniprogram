import { post } from '../http/http.js'

function getSingleTests (data,cb) {
  post('api/singleTests/getSingleTests', data, cb)
}

function userSingleTestsSaveOrUpdate (data,cb) {
  post('api/userSingleTests/saveOrUpdate', data, cb)
}

function getUserSingleTest (data, cb) {
  post('api/userSingleTests/getUserSingleTest', data, cb)
}

module.exports = {
  getSingleTests,
  userSingleTestsSaveOrUpdate,
  getUserSingleTest
}