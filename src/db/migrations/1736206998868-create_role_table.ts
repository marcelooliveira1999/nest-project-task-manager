import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRoleTable1736206998868 implements MigrationInterface {
    name = 'CreateRoleTable1736206998868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."role_tag_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "tag" "public"."role_tag_enum" NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO public."role" (id, tag) VALUES (nextval('role_id_seq'::regclass), 'admin'), (nextval('role_id_seq'::regclass), 'user');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role_id"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TYPE "public"."role_tag_enum"`);
    }

}
