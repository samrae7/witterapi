import {MigrationInterface, QueryRunner} from "typeorm";

export class AddJoinColumnToFilm1564089567916 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "film" ADD "reviewId" integer`);
        await queryRunner.query(`ALTER TABLE "film" ADD CONSTRAINT "UQ_cccad7a034fde9a28044222bb80" UNIQUE ("reviewId")`);
        await queryRunner.query(`ALTER TABLE "film" ADD CONSTRAINT "FK_cccad7a034fde9a28044222bb80" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "film" DROP CONSTRAINT "FK_cccad7a034fde9a28044222bb80"`);
        await queryRunner.query(`ALTER TABLE "film" DROP CONSTRAINT "UQ_cccad7a034fde9a28044222bb80"`);
        await queryRunner.query(`ALTER TABLE "film" DROP COLUMN "reviewId"`);
    }

}
