import Route from '@ioc:Adonis/Core/Route'

Route.get('/projects', 'Project/Main.index')
Route.post('/projects', 'Project/Main.store')
Route.get('/projects/:id', 'Project/Main.show')
Route.put('/projects/:id', 'Project/Main.update')
Route.delete('/projects/:id', 'Project/Main.destroy')
