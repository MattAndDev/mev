'use strict'
// core
const path = require('path')
// libs
const _ = require('lodash')
const glob = require('glob')

class Api {

  // addRoutes
  // ============================================
  // traverses the routes folder and requires all files
  addRoutes (router, socket) {
    // get all routes
    // NOTE: make relative
    glob('./server/api/routes/**/*.js', (err, routes) => {
      if (err) console.log(err)
      // dynamically require all files
      _.each(routes, (routePath) => {
        var route = routePath
        route = route.replace('./server/api/routes', '').replace('.js', '/')
        require(path.resolve(routePath))(router, socket, route)
      })
    })
  }
}

module.exports = new Api()
