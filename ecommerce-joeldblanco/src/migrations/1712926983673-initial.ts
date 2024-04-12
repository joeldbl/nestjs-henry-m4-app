import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1712926983673 implements MigrationInterface {
    name = 'Initial1712926983673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "stock" numeric NOT NULL, "imgUrl" character varying NOT NULL DEFAULT 'https://placehold.co/180x180', "categoryId" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, "order_id" uuid, CONSTRAINT "REL_3ff3367344edec5de2355a562e" UNIQUE ("order_id"), CONSTRAINT "PK_278a6e0f21c9db1653e6f406801" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "user_id" uuid, "orderDetailId" uuid, CONSTRAINT "REL_1976b8d15ab024d096a042bcb5" UNIQUE ("orderDetailId"), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(60) NOT NULL, "phone" integer NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "country" character varying(20), "address" text NOT NULL, "city" character varying(50), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_details_products_product" ("orderDetailsId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_fc01c792a7b5f3e20b8f266c571" PRIMARY KEY ("orderDetailsId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d53dd34400eec23fcd8fa83f07" ON "order_details_products_product" ("orderDetailsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_189e35890372ef9f71b6ef6f7e" ON "order_details_products_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_details" ADD CONSTRAINT "FK_3ff3367344edec5de2355a562ee" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_1976b8d15ab024d096a042bcb5a" FOREIGN KEY ("orderDetailId") REFERENCES "order_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_details_products_product" ADD CONSTRAINT "FK_d53dd34400eec23fcd8fa83f071" FOREIGN KEY ("orderDetailsId") REFERENCES "order_details"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_details_products_product" ADD CONSTRAINT "FK_189e35890372ef9f71b6ef6f7e7" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_details_products_product" DROP CONSTRAINT "FK_189e35890372ef9f71b6ef6f7e7"`);
        await queryRunner.query(`ALTER TABLE "order_details_products_product" DROP CONSTRAINT "FK_d53dd34400eec23fcd8fa83f071"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_1976b8d15ab024d096a042bcb5a"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd"`);
        await queryRunner.query(`ALTER TABLE "order_details" DROP CONSTRAINT "FK_3ff3367344edec5de2355a562ee"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_189e35890372ef9f71b6ef6f7e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d53dd34400eec23fcd8fa83f07"`);
        await queryRunner.query(`DROP TABLE "order_details_products_product"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "order_details"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
