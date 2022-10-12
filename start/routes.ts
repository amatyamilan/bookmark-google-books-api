import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  /**
   * Unuthenticated Routes
   */
  Route.group(() => {
    Route.post('/signup', 'AuthController.signup')
    Route.post('/signin', 'AuthController.signin')
  }).prefix('/auth')

  /**
   * Authenticated Routes
   */
  Route.group(() => {
    Route.group(() => {
      Route.get('/search', 'BooksController.index')
    }).prefix('/books')
  }).middleware('auth:api')

}).prefix('/api')
