'use strict'
// core
const path = require('path')
// libs
const _ = require('lodash')
const glob = require('glob')
const express = require('express')
const history = require('connect-history-api-fallback')

class Static {
  constructor (app) {
    this._buildStaticServer(app)
  }

  // Builds a static server for single page apps with vue router
  _buildStaticServer (app) {
    // look for all folders
    // NOTE: this should be maybe placed in env
    glob('./public/*', (err, folders) => {
      if (err) console.log(err)
      _.each(folders, (folder) => {
        let pathName = folder.replace('./public/', '')
        // use hsitory middleware for single page app
        app.use(`/${pathName}`, history({
          verbose: true
        }))
        // pass in static folder
        app.use(`/${pathName}`, express.static(folder))
      })
    })
  }

}

module.exports = Static
