export const calculateParkingFee = (
    entryTime: Date,
    exitTime: Date,
    feePerHour: number
  ): number => {
    // Calculate the duration in milliseconds
    const durationMs = exitTime.getTime() - entryTime.getTime();
    
    // Convert to hours (rounded up to the nearest hour)
    const durationHours = Math.ceil(durationMs / (1000 * 60 * 60));
    
    // Calculate the fee
    return durationHours * feePerHour;
  };