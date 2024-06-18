import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { User } from '../user/user.model'; 


@ObjectType()
export class Task {
  @Field((type) => Int)
  id: number;


  @Field((type) => User)
  user?: User;

  @Field((type) => Int)
  userId: number;

  @Field()
  task: string;

  @Field()
  isCompleted: boolean;

  @Field((type) => GraphQLISODateTime)
  createdAt: Date;

  @Field((type) => GraphQLISODateTime)
  updatedAt: Date;

  @Field()
  status: boolean;
}
