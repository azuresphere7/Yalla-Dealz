<template>
  <v-container class="">
    <v-card class="pa-4 my-4">
      <v-card-title>
        Sommary
      </v-card-title>
      <v-card-text class="pa-0 px-3">
        <v-row>
          <v-col v-for="card in cardsData" :key='card.class' cols='12' md='3'>
            <v-card :class="card.class" min-height="130" dark>
              <div class='text-body-2'>
                {{card.text}}
              </div>
              <div class='text-h4'>
                {{card.value}}
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="pa-4 my-4">
      <v-row>
      <v-col v-for="card in progressData" :key='card.class' cols='12' md='6'>
        <v-card outlined>
          <v-card-title>{{card.text}}</v-card-title>
          <v-row justify="center">
            <v-col cols='5'>
              <v-progress-circular
                :size="180"
                :width="30"
                :value="card.value"
                :color='card.color'
              >
               <div class='text-h6'>
                 {{ card.value }}
               </div>
              </v-progress-circular>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="pa-6" cols='8'>
              <div>
                <v-icon small color='grey'>mdi-checkbox-blank-circle</v-icon>
                <span class='text-caption'> {{'Online Payment'}} </span>
              </div>
              <div>
                <v-icon small :color='card.color'>mdi-checkbox-blank-circle</v-icon>
                <span class='text-caption'> {{'Card Payment'}} </span>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    </v-card>
    <v-card>
      <v-row justify='center'>
      <v-col>
        <OrdersList title="Recent Transactions"></OrdersList>
      </v-col>
    </v-row>
    </v-card>
  </v-container>
</template>

<script>
import OrdersList from '~/components/en/Dashboard/orders'

export default {
  components: {
    OrdersList,
  },
  mounted() {
    
  },
  data() {
    return {
      cardsData: [
        { text: 'Volume', class: 'card1', value: 4.09},
        { text: 'Transactions', class: 'card2', value: 5.00},
        { text: 'Successful Transactions', class: 'card3', value: 6.00},
        { text: 'Total', class: 'card4', value: 200.0},
      ],
      progressData: [
        { text: 'Revenue Channels', color:'teal', value: 14.4999},
        { text: 'Payment Channels', color:'indigo darken-2', value: 8},
      ]
    }
  },  

  methods: {
    
  },
}
</script>

<style scoped>
.card1{
  padding: 25px;
  background: #67B26F;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #4ca2cd, #67B26F);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #4ca2cd, #67B26F); 
}
.card2{
  padding: 25px;
  background: #4ECDC4;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #556270, #4ECDC4);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #556270, #4ECDC4); 
}
.card3{
  padding: 25px;
  background: rgb(13,0,55);
  background: linear-gradient(86deg, rgba(13,0,55,1) 0%, rgba(69,26,161,1) 33%);

}
.card4{
  padding: 25px;
  background: rgb(79,1,1);
  background: linear-gradient(86deg, rgba(79,1,1,1) 0%, rgba(145,12,55,1) 32%);
}
</style>