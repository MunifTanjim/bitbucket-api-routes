const sortRoutesArray = routes => {
  return routes.sort((routeA, routeB) => {
    return routeA.path === routeB.path
      ? routeA.method < routeB.method
        ? -1
        : 1
      : routeA.path < routeB.path
        ? -1
        : 1
  })
}

module.exports = sortRoutesArray
