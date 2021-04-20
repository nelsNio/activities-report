import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
// const zlib = require('zlib');
import * as AdmZip from 'adm-zip';
import Application from '@ioc:Adonis/Core/Application';

var Zip = require("adm-zip");

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





    

    /**
     * uploadFileZip
     */
    public async uploadFileZipBase64({request}:HttpContextContract) {
        const usersBase64=request.only(['attacheds']).attacheds
        // .replace('data:', '')
        // .replace(/^.+,/, '');

        console.log(usersBase64);
        let buffer = Buffer.from(usersBase64, 'binary');
        console.log(buffer, typeof(buffer));
        let admzip = new AdmZip(buffer);
        let zipEntries = admzip.getEntries();
        zipEntries.forEach(element => {
            console.log(element.entryName);
        })

        return{'msg':'Files saved'}
        
    }



    /**
     * uploadFileZip
     */
    public async uploadFileZip({request,response}:HttpContextContract) {
        const attacheds=request.file('attacheds');

        if(!attacheds){
            return response.status(400).json({'err':'File is required'})

        }
        await attacheds?.move(Application.tmpPath('uploads'))

        // loads and parses exist  ing zip file local_file.zip
        const path =`./tmp/uploads/${attacheds?.clientName}`;
        const files = await this.zipProcess(path)
        return{'msg':'Zip readed', files}

        
    }

    /**
     * Read base64 content and extract conntent lines
     * @param base64 
     * @returns content in file
     */
    fileProcess = async ( base64)=> {

        const base64Data =  Buffer.from(base64.replace(/^data:text\/\w+;base64,/, ""), 'base64');
        const type = base64.split(';')[0].split('/')[1];

        const usersDb= base64Data.toString().trim().split(";\n");
        usersDb.forEach(user => {
            console.log(user)
        });

        return usersDb
       
    }





    /**
     * 
     * @param path 
     * @returns 
     */
    zipProcess = async ( path)=> {

        var zip = new Zip(path);
        let nameFiles=[];
        let resume:string="";

        zip.getEntries().forEach(function(entry) {
            console.log("=====          Iniciando archivo         --------");
            let entryName:string = entry.entryName;
            //var decompressedData = zip.readFile(entry); // decompressed buffer of the entry
            let content = zip.readAsText(entry);
            resume= resume+content;
            // console.log(resume); // outputs the decompressed content of the entry  
            console.log(entryName,"    " )
            nameFiles.push(entryName);
            console.log("=====          Finalizando archivo         --------");
            console.log('=============___________============_______==========');


        });
        console.log(resume);
        require('child_process').execSync('rm -rf ./tmp/uploads/*')
        return {nameFiles,resume}
       
    }

}
