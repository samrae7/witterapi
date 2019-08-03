import "reflect-metadata";
import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";
import {Film} from "./Film";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  youTubeVideoId: string;

  @Column({nullable: true})
  date: Date;

  @OneToOne(type => Film, film => film.review, {
    cascade: true,
    onDelete: "CASCADE"
  })
  @JoinColumn()
  film: Film;
}