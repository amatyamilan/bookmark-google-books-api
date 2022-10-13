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

  Route.group(() => {
    Route.get('/search', 'BooksController.index')
  }).prefix('/books')

  /**
   * Authenticated Routes
   */
  Route.group(() => {
    Route.get('/test', () => {
      return true
    })
  }).middleware('auth:api')
}).prefix('/api')
