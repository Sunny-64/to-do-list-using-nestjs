import { Field, GraphQLISODateTime, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Task } from "../task/task.model";

@ObjectType()
export class User {
    @Field(type => Int)
    id : number

    @Field()
    email : string

    @Field()
    password : string

    @Field((type) => GraphQLISODateTime)
    createdAt : Date

    @Field((type) => GraphQLISODateTime)
    updatedAt : Date

    @Field((type) => [Task], {nullable : true})
    tasks ?: Task[]

    @Field()
    status : boolean
}


@InputType()
export class createUserInput {
    @Field({nullable : false})
    email : string

    @Field({nullable : false})
    password : string
}