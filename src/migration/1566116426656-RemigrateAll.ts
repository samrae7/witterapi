import {MigrationInterface, QueryRunner} from "typeorm";

export class RemigrateAll1566116426656 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "review" ("id" SERIAL NOT NULL, "youTubeVideoId" character varying, "date" TIMESTAMP, "filmId" integer, CONSTRAINT "REL_f1a2e33731808a7c6fcd644ca7" UNIQUE ("filmId"), CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "film" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "poster_id" character varying, CONSTRAINT "UQ_70c253d5411a4abf1c752a46998" UNIQUE ("name"), CONSTRAINT "PK_37ec0ffe0011ccbe438a65e3c6e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "age" integer NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_f1a2e33731808a7c6fcd644ca7c" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_f1a2e33731808a7c6fcd644ca7c"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "film"`);
        await queryRunner.query(`DROP TABLE "review"`);
    }

}
