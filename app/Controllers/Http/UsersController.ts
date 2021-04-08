import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class UsersController {


    /**
     * POST
     * @param param0 
     * @returns 
     */
    public async store({  request}: HttpContextContract){

            const data = request.all();
            delete data['repeatPassword']    
            return await User.create(data)

        }
    
    /**
     * GET 
     * @returns User[]
     */
    public async get (): Promise<User[]> {
        return await User.all()
        }
    

    /**
     * PUT
     * @param param0 
     * @returns 
     */
    public async setEditUsers ({request,params}: HttpContextContract) {
        console.log(params.id);
        const data = request.all()
        await User.query().where('identification_number',params.id).update(data);
        
        return {
            "msg": "Actualización Completada con exito!"
        };
        }
        
    

    /**
     * DELETE
     * @param param0 
     * @returns 
     */
    public async destroy({  params}: HttpContextContract){
    const user = await User.query().where('identification_number', params.id).delete();
    return {
            "msg": "Destrucción Completada con exito!",
            user
            };
        }

    /**
     * uploadUsersFile
     */
    public async uploadUsersFile({request,response}:HttpContextContract) {
        const usersBase64=request.only(['users']);

        if(!usersBase64.users){
            return response.status(400).json({'err':'File is required'})
        }
        const users =await this.fileProcess(usersBase64.users)
        return{'msg':'Users crearted', users}
        
    }


    fileProcess = async ( base64)=> {

        const base64Data =  Buffer.from(base64.replace(/^data:text\/\w+;base64,/, ""), 'base64');
        const type = base64.split(';')[0].split('/')[1];

        const usersDb= base64Data.toString().trim().split(";\n");
        usersDb.forEach(user => {
            console.log(user)
        });

        return usersDb
       
    }

}
