/**
 * Utility functions for Google Maps Platform and Cartographic coordinates.
 */

/**
 * Validates whether a provided string matches the structure of a valid Google Maps Platform API key.
 * 
 * Google Cloud / Google Maps Platform API keys:
 * - Start with 'AIza' (typically 'AIzaSy...')
 * - Are approximately 39 characters in length
 * - Contain base64url characters [A-Za-z0-9_-]
 * 
 * Notice: Gemini AI Studio / Antigravity keys start with 'AQ.' and will fail authentication
 * on the Google Maps JavaScript API with an InvalidKeyMapError.
 */
export function isValidGoogleMapsKey(key: string | undefined | null): boolean {
  if (!key) return false;
  const trimmed = key.trim();
  // Reject keys starting with AQ. (Gemini / AI Studio developer tokens)
  if (trimmed.startsWith('AQ.')) return false;
  // Google Maps Platform API keys start with 'AIza' and are at least 30 characters
  return trimmed.startsWith('AIza') && trimmed.length >= 30;
}

