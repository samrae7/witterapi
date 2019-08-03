import {MigrationInterface, QueryRunner} from "typeorm";

export class AddOnDeleteCascadeToReview1564821244563 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_f1a2e33731808a7c6fcd644ca7c"`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_f1a2e33731808a7c6fcd644ca7c" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_f1a2e33731808a7c6fcd644ca7c"`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_f1a2e33731808a7c6fcd644ca7c" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
