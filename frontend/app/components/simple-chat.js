import Ember from 'ember';

export default Ember.Component.extend({
  cableService: Ember.inject.service('cable'),
  
  messages: [],
  username: 'guest',
  body: 'message body',
  
  setupSubscription: Ember.on('init', function() {
    var consumer = this.get('cableService').createConsumer('ws://localhost:3000/websocket');

		this.set('consumer', consumer);

    var subscription = consumer.subscriptions.create("MessagesChannel", {      
      received: (data) => {
        this.get('messages').pushObject({username: data.username, body: data.body});
      }    
    });
    
    this.set('subscription', subscription);
            
  }),

 	willDestroy(){
		this.get('consumer').subscriptions
			.remove(this.get('subscription'));
	},
  actions: {
    sendMessage() {
      this.get('subscription').send({ username: this.get('username'), body: this.get('body') });
    }
  }
});
