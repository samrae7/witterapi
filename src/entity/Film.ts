import "reflect-metadata";
import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";
import { Review } from './Review';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    unique: true
  })
  name: string;

  @Column({nullable: true})
  poster_id: string;

  @OneToOne(type => Review, review => review.film, {nullable: true})
  review?: Review;
}