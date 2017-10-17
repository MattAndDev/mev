// Exampelget/post route
// built automatically via folder structure
// ============================================
module.exports = function (router, socket, route) {

  router.route(route).get((req, res) => {
    res.send('Get example')
  })

  router.route(`${route}`).post((req, res) => {
    res.send('Post example')
  })
}
