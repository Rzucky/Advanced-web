<template>
	<div class="container-md">
		<div class="row">
			<div class="col-md-8">
				<p> {{this.result.teamOne}} - {{this.result.teamTwo}}</p>

			</div>
			<div class="col-md-4">
				<p> {{this.result.score}}</p>		
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'ResultWin',
  props: {
	result: {
		default() {
        return { result: {
			teamOne: 'aa',
			teamTwo: 'bb',
			score: 'cc',
			date: ''
		} }
      }
	},
    // msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
