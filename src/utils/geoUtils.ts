import { HeritageSite } from '../data/heritageSites';

/**
 * Calculates the Great-Circle distance between two coordinates in kilometers
 * using the Haversine formula.
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's mean radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export interface NearbyHeritageSite {
  site: HeritageSite;
  distanceKm: number;
}

/**
 * Finds all heritage sites sorted by proximity to the user's coordinates.
 */
export function findNearbyHeritageSites(
  userLat: number,
  userLon: number,
  sites: HeritageSite[],
  maxLimit: number = 10
): NearbyHeritageSite[] {
  return sites
    .map((site) => ({
      site,
      distanceKm: calculateDistanceKm(userLat, userLon, site.latitude, site.longitude),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, maxLimit);
}
