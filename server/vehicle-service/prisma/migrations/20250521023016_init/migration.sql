-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('active', 'completed');

-- CreateTable
CREATE TABLE "vehicle_entries" (
    "id" SERIAL NOT NULL,
    "plate_number" TEXT NOT NULL,
    "parking_code" TEXT NOT NULL,
    "entry_datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exit_datetime" TIMESTAMP(3),
    "charged_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "user_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicle_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" SERIAL NOT NULL,
    "entry_id" INTEGER NOT NULL,
    "ticket_number" TEXT NOT NULL,
    "status" "TicketStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "vehicle_entries_plate_number_idx" ON "vehicle_entries"("plate_number");

-- CreateIndex
CREATE INDEX "vehicle_entries_parking_code_idx" ON "vehicle_entries"("parking_code");

-- CreateIndex
CREATE INDEX "vehicle_entries_entry_datetime_idx" ON "vehicle_entries"("entry_datetime");

-- CreateIndex
CREATE INDEX "vehicle_entries_exit_datetime_idx" ON "vehicle_entries"("exit_datetime");

-- CreateIndex
CREATE UNIQUE INDEX "tickets_ticket_number_key" ON "tickets"("ticket_number");

-- CreateIndex
CREATE INDEX "tickets_entry_id_idx" ON "tickets"("entry_id");

-- CreateIndex
CREATE INDEX "tickets_ticket_number_idx" ON "tickets"("ticket_number");

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_entry_id_fkey" FOREIGN KEY ("entry_id") REFERENCES "vehicle_entries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
