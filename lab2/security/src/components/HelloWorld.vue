<template>
    <h3> This is the main screen of the app</h3>
    (Please copy and paste given danger code on Edgar to test if this system is in danger)


    <input type="text" v-model="input" />&nbsp;&nbsp;&nbsp;
    <input type="checkbox" v-model="userProvidedHtml"> 
    
    <p v-if="isInDanger"  v-html="this.input"></p>
    <p v-else>{{ this.input }}</p>
      
    
</template>

<script>
export default {
  name: 'HelloWorld',
  data()
    {
        return {
            userProvidedHtml: '',
            secret: 'YOU FOUND ME! Congrats'
        };
    },
    props: {
        isInDanger: Boolean
    },
    methods:{
        search(){
            return Error;
        }
    }
}
</script>

