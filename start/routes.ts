import Route from '@ioc:Adonis/Core/Route'

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
    Route.group(() => {
      Route.group(() => {
        Route.get('/', 'UserBookmarksController.index')
        Route.post('/create', 'UserBookmarksController.store')
        Route.delete('/:bookmarkApiId', 'UserBookmarksController.destroy')
      }).prefix('bookmarks')
    }).prefix('/users')
  }).middleware('auth:api')
}).prefix('/api')
