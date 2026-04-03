-- CreateTable
CREATE TABLE "user_profiles" (
    "user_id" UUID NOT NULL,
    "goal" VARCHAR(20) NOT NULL,
    "experience" VARCHAR(20) NOT NULL,
    "daysPerWeek" INTEGER NOT NULL,
    "equipment" VARCHAR(20) NOT NULL,
    "sessionDuration" INTEGER NOT NULL,
    "split" VARCHAR(20) NOT NULL,
    "injuries" TEXT,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("user_id")
);
