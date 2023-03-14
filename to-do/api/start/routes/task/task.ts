import Route from '@ioc:Adonis/Core/Route'

Route.get('/tasks', 'Tasks/Main.index')
Route.post('/tasks', 'Tasks/Main.store')
Route.get('/tasks/:id', 'Tasks/Main.show')
Route.put('/tasks/:id', 'Tasks/Main.update')
Route.delete('/tasks/:id', 'Tasks/Main.destroy')
