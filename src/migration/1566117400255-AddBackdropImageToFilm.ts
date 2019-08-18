import {MigrationInterface, QueryRunner} from "typeorm";

export class AddBackdropImageToFilm1566117400255 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "film" ADD "backdrop_image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "film" DROP COLUMN "backdrop_image"`);
    }

}
