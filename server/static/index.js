'use strict'
// core
const path = require('path')
// libs
const _ = require('lodash')
const glob = require('glob')
const express = require('express')

class Static {
  constructor (app) {
    this._buildStaticServer(app)
  }

  _buildStaticServer (app) {
    app.use(express.static('static'))
  }
}

module.exports = Static
