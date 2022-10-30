const express = require('express');
var cors = require('cors')
const app = express();
app.use(express.json())

const PORT = process.env.PORT || 5000;
const NUMDAYS = process.env.NUMDAYS || 5;
// app.use(cors())
let data = null;

(async function() {
    data = await cleanUpData(NUMDAYS);
})();


const server = app.listen(PORT, () => {
  console.log("server is running on port", server.address().port);
});

app.get('/getData', cors(), async function(req, res) {
	console.log('GOTTEN REQUEST')
	data.teamsData = await getSortedData(data.teamsData);
	data.matchData[0].comments = [
		{
			author: 'User1',
			text: 'Test',
			date: 'date1232'
		},
		{	
			author: 'User2',
			text: 'ZASTGD',
			date: 'date1232324234'
		},
	]
	if (data){
		res.send({error: false, data: data.matchData, teams: data.teamsData})
	}
})


app.post('/changematch', cors(), async function(req, res) {
	console.log('Changing match')
	const changedGame = req.body

	data.matchData[changedGame.idx] = changedGame  
	data = await recalculateData(data);
		
	if (data){
		res.send({error: false, data: data.matchData, teams: data.teamsData})
	}
})

async function recalculateData(data)
{
	let teamsData = {};
	for(const match of data.matchData)
	{
		if(!teamsData[match.teamOne])
		{
			teamsData[match.teamOne] = {
				name: match.teamOne,
				scoreDiff: 0,
				points: 0,
			}
		}
		if(!teamsData[match.teamTwo])
		{
			teamsData[match.teamTwo] = {
				name: match.teamTwo,
				scoreDiff: 0,
				points: 0,
			}
		}
		let score = match.score.split(' - ')
		score[0] = parseInt(score[0])
		score[1] = parseInt(score[1])

		if ( score[0] != score[1] )
		{
			teamsData[match.teamOne].points += (score[0] < score[1]) ? 0 : 3
			teamsData[match.teamTwo].points += (score[0] < score[1]) ? 0 : 3

			teamsData[match.teamOne].scoreDiff += (score[0] - score[1])
			teamsData[match.teamTwo].scoreDiff += (score[1] - score[0])
		}
		else{
			teamsData[match.teamOne].points += 1
			teamsData[match.teamTwo].points += 1
		}

	}
	let arr = []
	for (const key in teamsData)
	{
		arr.push(teamsData[key])
	}
	teamsData = await getSortedData(arr);
	data.teamsData = teamsData
	return data;
}


async function reverseMatches(matches)
{
	function compare(b, a) {
		if (a.idx < b.idx)
			return -1;
		if (a.idx > b.idx)
			return 1;
		return 0;
		}
	
		return matches.sort(compare);
}


async function getSortedData(teams)
{
	function compare(b, a) {
	if (a.points < b.points)
		return -1;
	if (a.points > b.points)
		return 1;
	if (a.points == b.points)
	{
		if (a.scoreDiff < b.scoreDiff)
			return -1;
		if (a.scoreDiff >= b.scoreDiff)
			return 1;
	}
	return 0;
	}

	return teams.sort(compare);
}

async function cleanUpData(numDays) 
{

	const matchDataJson = require('./matchData15_16.json');

	let matchData = [];
	let teamsData = {};
	let counter = 0
	for (let i = 0; i< numDays; i++)
	{
		const matchday = matchDataJson.rounds[i];
		for (const match of matchday.matches)
		{
			const matchObj = {
				idx: counter,
				teamOne: match.team1,
				teamTwo: match.team2,
				date: match.date,
				score: `${match.score.ft[0]} - ${match.score.ft[1]}`,
				comments: [],
			}
			counter += 1

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
	let arr = []
	for (const key in teamsData)
	{
		arr.push(teamsData[key])
	}
	teamsData = await getSortedData(arr);

	matchData = await reverseMatches(matchData)

	return {matchData, teamsData};
}