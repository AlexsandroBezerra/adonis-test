/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Application from '@ioc:Adonis/Core/Application'

Route.group(() => {
  Route.post('/', 'ProfilesController.create')
  Route.post('/avatar', 'ProfilesController.uploadAvatar')
}).prefix('/profiles')

Route.group(() => {
  Route.get('/', 'ToDoListsController.index')
  Route.post('/', 'ToDoListsController.create')
}).prefix('/to-do-lists')

Route.get('/uploads/:filename', async ({ params, response }) => {
  return response.attachment(Application.tmpPath('uploads', params.filename))
})
