// KLASA KANBAN CARD
function Card(id, description) {
	var self = this;
	
	this.id = id;
	this.description = description;
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card" data-id="'+self.id+'"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardDescription = $('<p class="card-description"></p>');
		
		cardDeleteBtn.click(function(){
			self.removeCard();
		});
		
		card.append(cardDeleteBtn);
		cardDescription.text(self.description);
		card.append(cardDescription);

		return card;
	}
}
Card.prototype = {
	removeCard: function() {
	  	var self = this;
	    
	    $.ajax({
	      url: baseUrl + '/card/' + self.id,
	      method: 'DELETE',
	      success: function(){
	        self.element.remove();
	      }
	    });
	}
}