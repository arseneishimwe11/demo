-- CreateTable
CREATE TABLE "parking_locations" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "total_spaces" INTEGER NOT NULL,
    "available_spaces" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "fee_per_hour" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parking_locations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "parking_locations_code_key" ON "parking_locations"("code");
