import "reflect-metadata";
import {Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";
import {Film} from "./Film";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  youTubeVideoId: string;

  @OneToOne(type => Film, film => film.review, {
    cascade: true
  })
  @JoinColumn()
  film: Film;
}