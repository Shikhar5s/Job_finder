
import {Webhook} from "svix"


import User from "../model/User.js"
// Api controller function to manage clerk use with the database
const clerkWebhooks=async(req,res)=>{

    try{

        const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET)

         // Verfying headers

         await whook.verify(JSON.stringify(req.body),{
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"]
         })
         const {data,type}=req.body

         // switch cases for differentn events

         switch(type){
            case 'user.created':{

                const userData={
                    _id:data.id,
                    email:data.email_addresses[0].email_address,
                    name:data.first_name + ""+data.last_name,

                   image:data.image_url,
                   resume:''

                }
                await User.create(userData);
                res.json({})
                break;

            }

            case 'user.deleted':{

                await User.findByIdAndDelete(data.id)

                res.json({})
                break;

            }
            case 'user.updated':{

                
                const userData={
                
                    email:data.email_addresses[0].email_address,
                    name:data.first_name + ""+data.last_name,

                   image:data.image_url,
                   

                }
            await User.findByIdAndUpdate(data.id,userData)
          res.json({});
          break;


            }
            default:
                break ; 
         }
    }

 


    catch(err){

        console.log(err.message)

        res.json({success:false, message:"Webhooks Error"})



    }


}