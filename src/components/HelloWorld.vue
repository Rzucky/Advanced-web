<template>
    <h1> PREMIER LEAGUE LEADERBOARDS AND MATCH RESULTS</h1>
    <button class="btn btn-primary" data-bs-target="#collapseTarget" data-bs-toggle="collapse"> Show match results </button>
    <div class = "mx-auto col-md-10">
    <div class="pt-10">
      <div class="px-4">
        <table class="table table-striped table-bordered">
          <thead class="table-primary">
            <tr class="row">
              <td class="col-md-6"> TEAM NAME </td>
              <td class="col-md-3"> GOAL DIFFERENCE </td>
              <td class="col-md-3"> POINTS </td>
            </tr>
          </thead>
          <tbody class="table table-striped table-bordered">
            <div v-for="team in this.teams" :key="team.name">
              <tr class="row">
                <td class="table-info col-md-6">
                  <p> {{team.name}}</p>
                </td>
                <td class="table-info col-md-3">
                  <p> {{team.scoreDiff}}</p>
                </td>
                <td class="table-info col-md-3">
                  <p> {{team.points}}</p>
                </td>
              </tr>
            </div>
          </tbody>
        </table>
      </div>
    </div>
    </div>
    <div class="collapse py-2" id="collapseTarget">
      <div v-for="eachResult in this.results" :key="eachResult">
        <Result :result=eachResult></Result>
      </div>
    </div>
    
</template>

<script>
import Result from './Result.vue';
import axios from 'axios'
export default {
    name: "HelloWorld",
    data()
    {
        return{
            results: [
                {
                    teamOne: "Man Utd",
                    teamTwo: "Man City",
                    score: "1-0",
                    date: '',
                },
                {
                    teamOne: "Barcelona",
                    teamTwo: "Real Madrid",
                    score: "2-3",
                    date: '',
                },
                {
                    teamOne: "PSG",
                    teamTwo: "Lyon",
                    score: "3-0",
                    date: '',
                },
            ],
            teams: [
                {
                    name: "Man Utd",
                    scoreDiff: 20,
                    points: 7,
                },
                {
                    name: "Barcelona",
                    scoreDiff: 10,
                    points: 5,
                },
                {
                    name: "PSG",
                    scoreDiff: -5,
                    points: 3,
                },
            ]
        }
    },
    methods: {
    },
    computed: {
        sortedArray: function() {
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
            console.log(typeof this.teams)
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            return this.teams.sort(compare);
        }
    },
    props: {
        msg: String
    },
    components: { Result },
    async mounted()
    {
        axios
        .get('http://localhost:5000/getData')
        .then(response => {
            this.results = response.data.data;
            this.teams = response.data.teams;
        })
        .catch(error => console.log(error));
    }
}
</script>

<style scoped>
</style>
