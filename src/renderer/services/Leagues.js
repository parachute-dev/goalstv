import {format} from 'date-fns';
import {useContext} from 'react';
import {adsBase, dataHeaders, goalsHeaders, goalsApiBase, shuffleArray} from '../global';
import LeagueSlide from '../components/slides/leagues/LeagueSlide';

export const getLeagues = async(state, dispatch) => {

  try {
    const response = await fetch(`${goalsApiBase}/branches/${state.current_club}/leagues`, {
      headers: goalsHeaders,
      method: 'GET'
    });
    const responseJson = await response.json();

    if (responseJson.leagueDays != null) {
      dispatch({type: 'SET_LEAGUES', payload: responseJson.leagueDays});

      const tables = await getTables(responseJson.leagueDays);
      dispatch({type: 'SET_LEAGUE_TABLES', payload: tables});
    }
  } catch (error) {
    console.log(error);
  }
};

const getTables = async(leagues) => {

  var tables = [];

  if (leagues != null) {

    if (leagues !== undefined && leagues.length != 0) {

      for (let i = 0; i < leagues.length; i++) {
        var day = [];

        if (leagues[i].leagues !== undefined && leagues[i].leagues != 0) {

          for (let j = 0; j < leagues[i].leagues.length; j++) {
            var leagueId = leagues[i].leagues[j].leagueId;
            var leagueName = leagues[i].name;

            day[leagueName] = await getTable(leagueId);

          }
        }
        tables.push(day);
      }
    }
  }

  return tables;
}

const getTable = async(leagueId) => {
  try {
    const response = await fetch(`${goalsApiBase}/leagues/${leagueId}/table`, {
      headers: goalsHeaders,
      method: 'GET'
    });
    const responseJson = await response.json();
    if (responseJson != null) {
      return responseJson;
    }
  } catch (error) {
    console.log(error);
  }
};

export const renderLeagueTables = (league_tables) => {
  var leagueSlides = [];


  if (league_tables != null) {
  for (let i = 0; i < league_tables.length; i++) {
    var night = league_tables[i];
    Object
      .keys(night)
      .forEach((key) => {

        if (night[key].leagueTable != null) {

          if (night[key].leagueTable.divisionTables != null) {
            var divisions = night[key].leagueTable.divisionTables;

            if (divisions !== undefined && divisions.length != 0) {

              for (let j = 0; j < divisions.length; j++) {
                var obj = night[key].leagueTable.divisionTables[j];

                var noPlay = true;
                for (let k = 0; k < obj.rows.length; k++) {
                  if (obj.rows[k].played > 0) {
                    noPlay = false;
                  }

                }
                if (noPlay == false) {

                  leagueSlides.push(<LeagueSlide night={key} items={obj}/>)
                }
              }
            }
          }
        }
      });
  }
}
console.log("LEAGUES")
console.log(leagueSlides);

  return leagueSlides;

}
