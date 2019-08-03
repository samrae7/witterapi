import {MigrationInterface, QueryRunner} from "typeorm";

export class MakeFilmNameUnique1564825136656 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "film" ADD CONSTRAINT "UQ_70c253d5411a4abf1c752a46998" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "film" DROP CONSTRAINT "UQ_70c253d5411a4abf1c752a46998"`);
    }

}
