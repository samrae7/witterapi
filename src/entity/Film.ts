import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;
}