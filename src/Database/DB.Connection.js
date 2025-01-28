import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.DB_NAME ,process.env.DB_USER,process.env.DB_PASSWORD,{
    host:process.env.DB_HOST  ,
    dialect:"mysql"
})


export const DBConnection = async()=>{
    await  sequelize.authenticate().then(()=>{
     console.log("Database Connected Successfully");
    }).catch((err)=>{
     console.error("Connection is Failed" , err)
    })
 }
 
 
 export const syncDBConnection = async()=>{
     await  sequelize.sync({alter:false,force:false}).then(()=>{
      console.log("Database Connected Sync Successfully");
     }).catch((err)=>{
      console.error("Connection Sync is Failed" , err)
     })
  }