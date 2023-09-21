-- CreateTable
CREATE TABLE "bee" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "species" VARCHAR(255) NOT NULL,
    "hive_id" UUID NOT NULL,
    "birth_date" TIMESTAMP(6),
    "death_date" TIMESTAMP(6),
    "queen_bee" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "harvest" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "harvest_date" TIMESTAMP(6),
    "quantity" INTEGER NOT NULL,
    "hive_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "harvest_type" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "harvest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "health_check" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "check_date" TIMESTAMP(6),
    "hive_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "check_result" VARCHAR(255) NOT NULL,
    "notes" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "health_check_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hive" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "location" VARCHAR(255) NOT NULL,
    "creation_date" TIMESTAMP(6),
    "destruction_date" TIMESTAMP(6),
    "user_id" UUID NOT NULL,
    "hive_status" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "description" VARCHAR(255),
    "team_leader" VARCHAR(255),
    "team_size" INTEGER,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "roq_user_id" VARCHAR(255) NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "bee" ADD CONSTRAINT "bee_hive_id_fkey" FOREIGN KEY ("hive_id") REFERENCES "hive"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "harvest" ADD CONSTRAINT "harvest_hive_id_fkey" FOREIGN KEY ("hive_id") REFERENCES "hive"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "harvest" ADD CONSTRAINT "harvest_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "health_check" ADD CONSTRAINT "health_check_hive_id_fkey" FOREIGN KEY ("hive_id") REFERENCES "hive"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "health_check" ADD CONSTRAINT "health_check_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hive" ADD CONSTRAINT "hive_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

