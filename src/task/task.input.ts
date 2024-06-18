import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field()
  task: string;
}

@InputType()
export class UpdateTaskInput {
  @Field({ nullable: true })
  task?: string;

  @Field({ nullable: true })
  isCompleted?: boolean;
}
