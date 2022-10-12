const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;
const NUMDAYS = process.env.NUMDAYS || 5;
var cors = require('cors')
// app.use(cors())

const server = app.listen(PORT, () => {
  console.log("server is running on port", server.address().port);
});

app.get('/getData', cors(), async function(req, res) {
	console.log('GOTTEN REQUEST')
	const data = await cleanUpData(NUMDAYS);
	console.log(data);
	if (data){
		res.send({error: false, data: data.matchData, teams: data.teamsData})
	}
	// return {error: true, data: []}
	// next()
})

async function cleanUpData(numDays) {

	const matchDataJson = require('./matchData15_16.json');
	// const json = matchDataJson;
	const matchData = [];
	const teamsData = {};
	for (let i = 0; i< numDays; i++)
	{
		const matchday = matchDataJson.rounds[i];
		for (const match of matchday.matches)
		{
			const matchObj = {
				teamOne: match.team1,
				teamTwo: match.team2,
				date: match.date,
				score: `${match.score.ft[0]} - ${match.score.ft[1]}`
			}

			matchData.push(matchObj);

			if(!teamsData[match.team1])
			{
				teamsData[match.team1] = {
					name: match.team1,
					scoreDiff: 0,
					points: 0,
				}
			}
			if(!teamsData[match.team2])
			{
				teamsData[match.team2] = {
					name: match.team2,
					scoreDiff: 0,
					points: 0,
				}
			}

			if ( match.score.ft[0] != match.score.ft[1] )
			{
				teamsData[match.team1].points += (match.score.ft[0] < match.score.ft[1]) ? 0 : 3
				teamsData[match.team2].points += (match.score.ft[0] < match.score.ft[1]) ? 0 : 3

				teamsData[match.team1].scoreDiff += (match.score.ft[0] - match.score.ft[1])
				teamsData[match.team2].scoreDiff += (match.score.ft[1] - match.score.ft[0])
			}
			else{
				teamsData[match.team1].points += 1
				teamsData[match.team2].points += 1
			}

		}
	}
	return {matchData, teamsData};
}