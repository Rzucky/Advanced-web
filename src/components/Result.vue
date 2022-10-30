<template>
    <div class="container-md">
      <div class="border border-primary row">
        <div class="col-md-2">
          <h5>{{this.result.idx}} {{this.result.date}}</h5>
        </div>
        <div class="col-md-6">
          <h4> {{this.result.teamOne}} - {{this.result.teamTwo}}</h4>
        </div>
        <div class="col-md-4">
          <h4> {{this.result.score}}</h4>
          <!-- <button class="btn btn-secondary" data-bs-target="#collapseComment" data-bs-toggle="collapse"> Comment </button> -->
        </div>


              <div class="coment-bottom p-2 px-4"> 
                <!-- <div class="collapse py-2" id="collapseComment"> -->
                <div class="d-flex flex-row add-comment-section mt-4 mb-4">
                    <div class="profile-image"><img class="rounded-circle" src="https://i.imgur.com/CFpa3nK.jpg" width="50"></div>
                  <input  v-model="message" type="text" class="form-control mr-3" placeholder="Add comment">
                  <button v-on:click="addComment" class="btn btn-primary" type="button">Comment</button>
                </div>
            <!-- </div> -->
                <div v-for="comment in this.result.comments" :key="comment">


                <div class="commented-section mt-2">
                  <div class="d-flex flex-row align-items-center commented-user">
                    <div class="profile-image"><img class="rounded-circle" src="https://i.imgur.com/CFpa3nK.jpg" width="50"></div>
                    <h4 class="mr-2">{{comment.author}}&nbsp;</h4>
                    <span class="dot mb-1"></span>
                    <span class="mb-1 ml-2">&nbsp;{{comment.date}}</span>
                  </div>
                  <div class="comment-text-sm">
                    <span>{{comment.text}}</span>
                  </div>
                </div>

        </div> 

        </div>
      </div>
    </div>
</template>
<script>
export default {
    name: 'ResultWin',
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
    methods:
    {
        addComment(message){
            // TODO
        }, 
    },
    
}
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

.hit-voting:hover {
    color: blue;
}

.hit-voting {
    cursor: pointer;
}

.comment {
    width: 40%;
    height: 100px;
    padding: 10px;
    background-color: #d0e2bc;
}

.tip {
    width: 0px;
    height: 0px;
    position: absolute;
    background: transparent;
    border: 10px solid #ccc;
}

.tip-up {
    top: -25px;
    /* Same as body margin top + border */
    left: 10px;
    border-right-color: transparent;
    border-left-color: transparent;
    border-top-color: transparent;
}

dialogbox .body {
    position: relative;
    max-width: 300px;
    height: auto;
    margin: 20px 10px;
    padding: 5px;
    background-color: #DADADA;
    border-radius: 3px;
    border: 5px solid #ccc;
}

.body .message {
    min-height: 30px;
    border-radius: 3px;
    font-family: Arial;
    font-size: 14px;
    line-height: 1.5;
    color: #797979;
}
</style>