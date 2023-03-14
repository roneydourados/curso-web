import Route from '@ioc:Adonis/Core/Route'

Route.post('/files', 'Files/Main.store')
Route.get('/files', 'Files/Main.index')
