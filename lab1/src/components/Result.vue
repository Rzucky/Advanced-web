<template>
    <div class="container-md">
      <div class="border border-primary row">
        <div class="col-md-2">
          <h5>{{this.result.date}}</h5>
        </div>
        <div class="col-md-6">
          <h4> {{this.result.teamOne}} - {{this.result.teamTwo}}</h4>
        </div>
        <div class="col-md-4">
          <h4> {{this.result.score}}</h4>
        </div>
        <div class="coment-bottom p-2 px-4">
          <div class="d-flex flex-row add-comment-section mt-4 mb-4">
            <div class="profile-image">
              <img class="rounded-circle" src="https://i.imgur.com/CFpa3nK.jpg" width="50">
            </div>
            <input v-model="message" type="text" class="form-control mr-3" placeholder="Add comment">
            <button @click="$emit('addComment', this.result, message)" class="btn btn-primary" type="button">Comment</button>
          </div>
          <div v-for="comment in this.result.comments" :key="comment">
            <div class="commented-section mt-2">
              <div class="d-flex flex-row align-items-center commented-user">
                <div class="profile-image">
                  <img class="rounded-circle" src="https://i.imgur.com/CFpa3nK.jpg" width="50">
                </div>
                <h4 class="mr-2">{{comment.author}}&nbsp;</h4>
                <span class="dot mb-1"></span>
                <span class="mb-1 ml-2">&nbsp;{{comment.date}}&nbsp;&nbsp;</span>
                <button v-show="hasAccess(comment.author)" class="btn btn-danger" @click="$emit('deleteC', this.result, comment)"> DELETE COMMENT</button>
              </div>
              <div class="comment-text-sm">
                <span>{{comment.text}}</span>
              </div>
            </div>
          </div>
          <button v-show="checkIsAdmin()" class="btn btn-danger" @click="$emit('deleteM', this.result)"> DELETE </button>
          <div class="collapse py-2" id="collapseEdit">
            <input v-model="team1" type="text" class="form-control mr-3" :placeholder=this.result.teamOne>
            <input v-model="team2" type="text" class="form-control mr-3" :placeholder=this.result.teamTwo>
            <input v-model="newScore" type="text" class="form-control mr-3" :placeholder=this.result.score>
            <button class="btn btn-success" @click="$emit('editM', this.result, team1, team2, newScore)" > SAVE EDITS </button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    name: 'ResultWin',
    data()
    {
        return{
            isAdmin: false,
            user: this.$auth0.user,
        }
    },
    props: {
    result: {
        default () {
        return {
            result: {
            teamOne: 'aa',
            idx: 0,
            teamTwo: 'bb',
            score: 'cc',
            date: '',
            comments: []
            }
        }
        }
    },
    },
    methods:
    {
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
    mounted()
    {
       this.isAdmin = this.checkIsAdmin();
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
    background-color: #eee;
}

.bdge {
    height: 21px;
    background-color: orange;
    color: #fff;
    font-size: 11px;
    padding: 8px;
    border-radius: 4px;
    line-height: 3px;
}

.comments {
    text-decoration: underline;
    text-underline-position: under;
    cursor: pointer;
}

.dot {
    height: 7px;
    width: 7px;
    margin-top: 3px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
}
</style>