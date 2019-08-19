import {MigrationInterface, QueryRunner} from "typeorm";

export class RenamePosterIdToPoster1566118629696 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "film" RENAME COLUMN "poster_id" TO "poster"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "film" RENAME COLUMN "poster" TO "poster_id"`);
    }

}
