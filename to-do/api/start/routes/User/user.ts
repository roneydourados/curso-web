import Route from '@ioc:Adonis/Core/Route'

Route.get('/users', 'User/Main.index')
Route.post('/users', 'User/Main.store')
Route.get('/users/:id', 'User/Main.show')
Route.put('/users/:id', 'User/Main.update')
Route.delete('/users/:id', 'User/Main.destroy')
