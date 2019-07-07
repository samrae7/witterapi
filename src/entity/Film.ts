import "reflect-metadata";
import {Entity, Column, PrimaryGeneratedColumn, OneToOne} from "typeorm";
import { Review } from './Review';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100
  })
  name: string;

  @OneToOne(type => Review, review => review.film)
  review?: Review;
}