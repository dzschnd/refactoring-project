-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('TEXT', 'SELECT', 'CHECKBOX');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "name" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_verification_otps" (
    "id" SERIAL NOT NULL,
    "otp" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "email_verification_otps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "templates" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "places" (
    "id" SERIAL NOT NULL,
    "address" TEXT,
    "place_image" TEXT,
    "link" TEXT,

    CONSTRAINT "places_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invitations" (
    "id" SERIAL NOT NULL,
    "partner_1_name" TEXT,
    "partner_2_name" TEXT,
    "couple_image" TEXT,
    "event_date" DATE,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author_id" INTEGER NOT NULL,
    "template_id" INTEGER NOT NULL,
    "place_id" INTEGER,

    CONSTRAINT "invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colors" (
    "id" SERIAL NOT NULL,
    "color_code" TEXT NOT NULL,

    CONSTRAINT "colors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invitation_colors" (
    "id" SERIAL NOT NULL,
    "invitation_id" INTEGER NOT NULL,
    "color_id" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "invitation_colors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_items" (
    "id" SERIAL NOT NULL,
    "event_time" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "invitation_id" INTEGER NOT NULL,

    CONSTRAINT "plan_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wishes" (
    "id" SERIAL NOT NULL,
    "wish" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "invitation_id" INTEGER NOT NULL,

    CONSTRAINT "wishes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form_questions" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "type" "QuestionType" NOT NULL,
    "position" INTEGER NOT NULL,
    "invitation_id" INTEGER NOT NULL,

    CONSTRAINT "form_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form_answers" (
    "id" SERIAL NOT NULL,
    "answer" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "invitation_id" INTEGER NOT NULL,

    CONSTRAINT "form_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guest_answers" (
    "id" SERIAL NOT NULL,
    "guest_id" TEXT NOT NULL,
    "guest_name" TEXT NOT NULL,
    "is_coming" BOOLEAN NOT NULL,
    "answer" TEXT NOT NULL,
    "invitation_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,

    CONSTRAINT "guest_answers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "refresh_tokens_user_id_idx" ON "refresh_tokens"("user_id");

-- CreateIndex
CREATE INDEX "email_verification_otps_user_id_idx" ON "email_verification_otps"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "templates_name_key" ON "templates"("name");

-- CreateIndex
CREATE INDEX "invitations_author_id_idx" ON "invitations"("author_id");

-- CreateIndex
CREATE INDEX "invitations_template_id_idx" ON "invitations"("template_id");

-- CreateIndex
CREATE INDEX "invitations_place_id_idx" ON "invitations"("place_id");

-- CreateIndex
CREATE UNIQUE INDEX "colors_color_code_key" ON "colors"("color_code");

-- CreateIndex
CREATE INDEX "invitation_colors_invitation_id_idx" ON "invitation_colors"("invitation_id");

-- CreateIndex
CREATE INDEX "invitation_colors_color_id_idx" ON "invitation_colors"("color_id");

-- CreateIndex
CREATE UNIQUE INDEX "invitation_colors_invitation_id_position_key" ON "invitation_colors"("invitation_id", "position");

-- CreateIndex
CREATE INDEX "plan_items_invitation_id_idx" ON "plan_items"("invitation_id");

-- CreateIndex
CREATE UNIQUE INDEX "plan_items_invitation_id_position_key" ON "plan_items"("invitation_id", "position");

-- CreateIndex
CREATE INDEX "wishes_invitation_id_idx" ON "wishes"("invitation_id");

-- CreateIndex
CREATE UNIQUE INDEX "wishes_invitation_id_position_key" ON "wishes"("invitation_id", "position");

-- CreateIndex
CREATE INDEX "form_questions_invitation_id_idx" ON "form_questions"("invitation_id");

-- CreateIndex
CREATE UNIQUE INDEX "form_questions_invitation_id_position_key" ON "form_questions"("invitation_id", "position");

-- CreateIndex
CREATE INDEX "form_answers_question_id_idx" ON "form_answers"("question_id");

-- CreateIndex
CREATE INDEX "form_answers_invitation_id_idx" ON "form_answers"("invitation_id");

-- CreateIndex
CREATE UNIQUE INDEX "form_answers_question_id_position_key" ON "form_answers"("question_id", "position");

-- CreateIndex
CREATE INDEX "guest_answers_invitation_id_idx" ON "guest_answers"("invitation_id");

-- CreateIndex
CREATE INDEX "guest_answers_question_id_idx" ON "guest_answers"("question_id");

-- CreateIndex
CREATE INDEX "guest_answers_guest_id_idx" ON "guest_answers"("guest_id");

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_verification_otps" ADD CONSTRAINT "email_verification_otps_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation_colors" ADD CONSTRAINT "invitation_colors_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation_colors" ADD CONSTRAINT "invitation_colors_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "colors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_items" ADD CONSTRAINT "plan_items_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishes" ADD CONSTRAINT "wishes_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_questions" ADD CONSTRAINT "form_questions_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_answers" ADD CONSTRAINT "form_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "form_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_answers" ADD CONSTRAINT "form_answers_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guest_answers" ADD CONSTRAINT "guest_answers_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guest_answers" ADD CONSTRAINT "guest_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "form_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
