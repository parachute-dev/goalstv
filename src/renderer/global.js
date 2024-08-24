export const adsBase = "https://locker-room.goalsfootball.co.uk";
export const goalsApiBase = "https://api.goalsfootball.co.uk";
export const version = "2.0";

export const goalsHeaders = {
  "Content-Type" : "application/json",
  "Api-Key" : "Ta9ZuP2knA",
  "Accept" : "application/json",
  "Access-Control-Allow-Origin" : 'http://localhost:3000'
}

export function  shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

export const adsHeaders = {
  "Content-Type" : "application/json",
  "Accept" : "application/json",
  "Access-Control-Allow-Origin" : 'http://localhost:3000'
}
