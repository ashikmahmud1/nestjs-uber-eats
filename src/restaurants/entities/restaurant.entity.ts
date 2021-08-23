// Entity is something like model

import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@InputType({isAbstract: true})
@ObjectType()
@Entity()
export class Restaurant {

  @PrimaryGeneratedColumn()
  id: number

  @Field(type => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field(type => Boolean, { defaultValue: true }) // for graphql
  @Column({default: true}) // for database
  @IsOptional()
  @IsBoolean()
  isVegan?: boolean;

  @Field(type => String)
  @Column()
  @IsString()
  address: string;

}
