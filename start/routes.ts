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
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'


Route.group(()=>{
  Route.group(()=>{
    Route.post("sign-up","UsersController.store")
    Route.post("add-users","UsersController.store")
    Route.get("list","UsersController.get")
    Route.put('/update-user/:id', 'UsersController.setEditUsers')
    Route.delete('/delete-user/:id', 'UsersController.destroy')
    Route.post('upload-users', 'UsersController.uploadUsersFile')
  

  }).prefix('users')
}).prefix('api/v1')