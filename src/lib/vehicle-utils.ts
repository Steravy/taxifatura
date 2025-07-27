/**
 * Generates a unique slug for a vehicle based on its license plate and creation timestamp
 * Format: {licensePlate}-{timestamp}
 * Example: "st-71-eu-1735123456789"
 */
export function generateVehicleSlug(licensePlate: string): string {
  // Convert license plate to lowercase and keep dashes
  const normalizedPlate = licensePlate.toLowerCase().trim()
  
  // Add timestamp for uniqueness
  const timestamp = Date.now()
  
  return `${normalizedPlate}-${timestamp}`
}

/**
 * Validates if a slug has the correct format
 */
export function isValidVehicleSlug(slug: string): boolean {
  // Pattern: license-plate-format + dash + timestamp
  // License plate: 2 letters + dash + 2 digits + dash + 2 letters
  // Example: st-71-eu-1735123456789
  const slugPattern = /^[a-z]{2}-\d{2}-[a-z]{2}-\d{13}$/
  return slugPattern.test(slug)
}

/**
 * Extracts license plate from slug
 */
export function getLicensePlateFromSlug(slug: string): string | null {
  if (!isValidVehicleSlug(slug)) return null
  
  // Extract everything except the last timestamp part
  const parts = slug.split('-')
  if (parts.length !== 4) return null
  
  // Reconstruct license plate: first 3 parts, uppercase
  return `${parts[0]}-${parts[1]}-${parts[2]}`.toUpperCase()
}