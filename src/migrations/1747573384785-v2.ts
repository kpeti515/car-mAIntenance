import { MigrationInterface, QueryRunner } from "typeorm";

export class V21747573384785 implements MigrationInterface {
    name = 'V21747573384785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" ADD "lastAccessedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "isDefault" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "isDefault"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "lastAccessedAt"`);
    }

}
