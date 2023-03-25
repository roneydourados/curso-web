import Route from '@ioc:Adonis/Core/Route'

Route.post('/files', 'File/Main.store')
Route.get('/files', 'File/Main.index')
Route.delete('/files/:id', 'File/Main.destroy')
