import { post } from '../http/http.js'

function getSingleTests (data,cb) {
  post('api/singleTests/getSingleTests', data, cb)
}

module.exports = {
  getSingleTests
}