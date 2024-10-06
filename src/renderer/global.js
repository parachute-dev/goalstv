import {apiKey} from "./creds.js";
export const adsBase = "https://locker-room.goalsfootball.co.uk";
export const goalsApiBase = "https://api.goalsfootball.co.uk";
export const version = "2.0.7";

export const goalsHeaders = {
  "Content-Type" : "application/json",
  "Api-Key" : apiKey,
  "Accept" : "application/json",
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

export const adsHeaders = {
  "Content-Type" : "application/json",
  "Accept" : "application/json"
}


export const logUptime = (club) => {

  fetch("https://locker-room.goalsfootball.co.uk/log-uptime-tv", {
    method: "POST",
    headers: goalsHeaders,
    body: JSON.stringify({"Branch": club, "Version": version, "Status": "up"})
  }).then((response) => response.text()).then((result) => console.log(result)).catch((error) => console.error(error));

}

export const interleaveSlides = (tables, ads) => {
  const combinedSlides = [];
  const totalTables = tables.length;
  const totalAds = ads.length;

  if (totalTables === 0) {
    return ads.map((ad) => (ad)); // Return only ads if no tables
  }

  if (totalAds === 0) {
    return tables.map((table) => (table)); // Return only tables if no ads
  }

  const insertionInterval = Math.floor((totalTables + totalAds) / totalAds);
  let tableIndex = 0;
  let adIndex = 0;

  while (tableIndex < totalTables || adIndex < totalAds) {
    // Insert a table slide
    if (tableIndex < totalTables) {
      combinedSlides.push(tables[tableIndex]);
      tableIndex++;
    }

    // Insert ads based on the insertion interval
    if (adIndex < totalAds && (tableIndex % insertionInterval === 0 || tableIndex >= totalTables)) {
      combinedSlides.push(ads[adIndex]);
      adIndex++;
    }
  }

  return combinedSlides;
}
