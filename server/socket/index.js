'use strict'
// relative paths
const SocketsIo = require('socket.io')

class Socket {
  constructor (server) {
    // dock it
    this.io = new SocketsIo(server)
  }
  // public emit middleware
  emit (event, params) {
    this.io.emit(event, params)
  }
}

module.exports = Socket
