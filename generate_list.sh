#!/bin/bash
# Configuration
JELLYFIN_SERVER="http://IPADRESS:8096"
API_KEY="APIKEY"

# Calculate the cutoff date (60 days ago in UTC, formatted as ISO8601)
CUTOFF=$(date -u -d "30 days ago" +"%Y-%m-%dT%H:%M:%SZ")

# Output file
OUTPUT_FILE="/usr/share/jellyfin/web/avatars/list.txt"

# Create directory if it doesn't exist
mkdir -p "$(dirname "$OUTPUT_FILE")"

# Write header to file
echo "Releases in the past 30 days" > "$OUTPUT_FILE"

# Query for recent movies and TV episodes
curl -s "${JELLYFIN_SERVER}/Items?api_key=${API_KEY}&IncludeItemTypes=Movie,Episode&Recursive=true" \
  | jq -r --arg cutoff "$CUTOFF" '
    .Items[]
    | select(.PremiereDate != null and .PremiereDate >= $cutoff)
    | if .Type == "Movie" then .Id else .SeriesId end
  ' \
  | sort -u >> "$OUTPUT_FILE"

echo "Done! Movie and series IDs saved to $OUTPUT_FILE"
