from flask import Flask, jsonify
from nba_api.stats.endpoints import leaguestandings
from nba_api.stats.static import players

app = Flask(__name__)

headers = {
"Host": "stats.nba.com",
"Connection": "keep-alive",
"Accept": "application/json, text/plain, /",
"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
"Referer": "https://www.nba.com/",
"Origin": "https://www.nba.com",
"x-nba-stats-origin": "stats",
"x-nba-stats-token": "true",
"Accept-Language": "en-US,en;q=0.9"
}

@app.route("/nba-standings")
def nba_standings():
    try:
        print("Starting NBA request")

        standings = leaguestandings.LeagueStandings(
            league_id="00",
            season="2025-26",
            season_type="Regular Season",
            headers=headers,
            timeout=30
        )

        print("NBA request finished")

        data = standings.get_dict()

        result_set = data["resultSets"][0]
        headers_received = result_set["headers"]
        rows = result_set["rowSet"]

        teams = []

        for row in rows:
            team = dict(zip(headers_received, row))

            teams.append({
                "team_id": team["TeamID"],
                "team_name": team["TeamName"],
                "team_city": team["TeamCity"],
                "conference": team["Conference"],
                "rank": team["PlayoffRank"],
                "wins": team["WINS"],
                "losses": team["LOSSES"],
                "record": team["Record"],
                "win_percentage": team["WinPCT"]
            })

        return jsonify(teams)

    except Exception as error:
        print("ERROR:", repr(error))

        return jsonify({
            "error": str(error)
        }), 500

@app.route("/nba-player-search/<name>")
def nba_player_search(name):
    try:
        matches = players.find_players_by_full_name(name)
        return jsonify(matches)
    except Exception as error:
        print("PLAYER SEARCH ERROR:", repr(error))
        return jsonify({
            "error": "Could not search NBA players"
        }), 500
if __name__ == "__main__":
    app.run(port=5001)