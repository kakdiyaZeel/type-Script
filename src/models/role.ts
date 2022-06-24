
import {BuildOptions,DataTypes,Model,Sequelize,} from 'sequelize'

export interface RoleAttributes{
    id:number,
    name:string
}

export interface RoleModel extends Model<RoleAttributes>,RoleAttributes{}
export class Role extends Model<RoleModel,RoleAttributes> {}

export type RoleStatic = typeof Model &{
    new(values?:object,options?:BuildOptions):RoleModel

}

export function Roles(sequelize:Sequelize){
    return <RoleStatic>sequelize.define("role",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })
}