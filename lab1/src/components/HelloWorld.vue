<template>
    <div class="container-xl p-2">
      <h1> PREMIER LEAGUE LEADERBOARDS AND MATCH RESULTS</h1>
      <button class="btn btn-primary" data-bs-target="#collapseTarget" data-bs-toggle="collapse"> Show match results </button>&nbsp;&nbsp;
      <button class="btn btn-secondary" @click="login">Log in</button>
      <button class="btn btn-secondary" @click="logout">Log out</button>
      <!-- <h4>Currently logged in as: {{ this.user.name }}</h4> -->
      <!-- {{this.user}} -->
    </div>
    <div class="mx-auto col-md-10">
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
    <div class="container-md">
      <div class="collapse py-2" id="collapseTarget">
        <div class="container-sm py-2">
          <button v-show="checkIsAdmin()" class="btn btn-warning" data-bs-target="#collapseEdit" data-bs-toggle="collapse"> EDIT MATCHES </button>
        </div>
        <br>
        <div v-show="checkIsAdmin()" class="border border-info container-md py-2">
          <button v-show="checkIsAdmin()" class="btn btn-info" data-bs-target="#collapseNew" data-bs-toggle="collapse"> ENTER MATCH </button>
          <div class="collapse py-2" id="collapseNew">
            <input v-model="team1" type="text" class="form-control mr-3" placeholder="Team One">
            <input v-model="team2" type="text" class="form-control mr-3" placeholder="Team Two">
            <input v-model="newScore" type="text" class="form-control mr-3" placeholder="Result">
            <button class="btn btn-success" @click="saveMatch(team1, team2, newScore)"> SAVE MATCH </button>
          </div>
        </div>
        <br>
        <div v-for="eachResult in this.results" :key="eachResult">
          <Result @addComment="addComment" @deleteM="deleteMatch" @deleteC="deleteComment" @editM="editMatch" :result=eachResult></Result>
        </div>
      </div>
    </div>
</template>

<script>
import Result from './Result.vue';
import axios from 'axios'
import moment from 'moment';

export default {
    name: "HelloWorld",
    data()
    {
        return{
            isAdmin: false,
            user: this.$auth0.user,
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
        login() {
            this.$auth0.loginWithRedirect();
        },
        logout() {
            this.$auth0.logout({ returnTo: window.location.origin });
        },
        async addComment(match, message){
            console.log(match, message)
            match.comments.push({
                author: this.user.name,
                text: message,
                date: moment().format('YYYY-MM-DD'),
            })
            await this.changeMatch(match)

        }, 
        async editMatch(match, team1, team2, newScore){
            if (team1 != null)
            {
                match.teamOne = team1;
            }
            if (team2 != null)
            {
                match.teamTwo = team2;
            }
            if (newScore != null)
            {
                match.score = newScore;
            }
            console.log(match)
            await this.changeMatch(match)
        },
        async deleteMatch(match){
            match = {
                message: 'DELETE',
                idx: match.idx}
            await this.changeMatch(match)
        },
        async deleteComment(match, comment){
            for(const comm of match.comments)
            {
                if (comm.text == comment.text)
                {
                    const index = match.comments.indexOf(comm);
                    match.comments.splice(index, 1);
                }
            }
            await this.changeMatch(match)
        },
        async saveMatch(team1, team2, newScore){
            let high = 0
            for (let temp of this.results)
            {
                if(temp.idx > high)
                {
                    high = temp.idx 
                }
            }
            const newM = {
                idx: high + 1,
                teamOne: team1,
                teamTwo: team2,
                date: moment().format('YYYY-MM-DD'),
                score: newScore,
                comments: []
            },
            match = {
                message: 'NEW',
                match: newM
            }
            await this.changeMatch(match)

        },
        async changeMatch(match){
            axios
            .post('https://league.onrender.com:10000/changematch', match)
            .then(response => {
                this.results = response.data.data.reverse();
                this.teams = response.data.teams;
            })
            .catch(error => console.log(error));
        },
        checkIsAdmin(){
            if (this.user && this.user.sub === process.env.VUE_APP_ADMIN_ID)
            {
                this.isAdmin = true;
                return true
            }
            return false
        },
        hasAccess(author) {
            if (this.user && (this.user.name === author || this.isAdmin))
            {
                return true
            }
            return false
        }
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
    components: { Result },
    async mounted()
    {

        this.isAdmin = this.checkIsAdmin();

        axios
        .get('https://league.onrender.com:10000/getData')
        .then(response => {
            this.results = response.data.data.reverse();
            this.teams = response.data.teams;
        })
        .catch(error => console.log(error));
    }
}
</script>

<style scoped>
</style>
