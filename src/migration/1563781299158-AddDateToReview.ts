import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDateToReview1563781299158 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "review" ADD "date" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "date"`);
    }

}