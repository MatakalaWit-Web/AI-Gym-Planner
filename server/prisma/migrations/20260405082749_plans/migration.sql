-- CreateTable
CREATE TABLE "training_plans" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "plan_jason" JSONB NOT NULL,
    "plan_text" TEXT NOT NULL,

    CONSTRAINT "training_plans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_training_plans_user_id" ON "training_plans"("user_id");
