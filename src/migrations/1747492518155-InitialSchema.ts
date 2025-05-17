import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1747492518155 implements MigrationInterface {
    name = 'InitialSchema1747492518155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cars" ("id" SERIAL NOT NULL, "user_id" character varying(255) NOT NULL, "make" character varying(100) NOT NULL, "model" character varying(100) NOT NULL, "year" integer, "vin" character varying(17), "license_plate" character varying(20), "nickname" character varying(100), "color" character varying(50), "purchase_date" date, "initial_mileage" integer, "car_image_url" character varying(2048), "notes" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1a56deecb54b4ed4917445f49e9" UNIQUE ("vin"), CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_673bd295e52580c0fb09d0fbbb" ON "cars" ("user_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_673bd295e52580c0fb09d0fbbb"`);
        await queryRunner.query(`DROP TABLE "cars"`);
    }

}
