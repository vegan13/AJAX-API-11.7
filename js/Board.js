var board = {
	name: 'Tablica Kanban',
	createColumn: function(column) {
	  this.element.append(column.element);
	  initSortable();
	},
	element: $('#board .column-container')
};

$('.create-column')
    .click(function(){
        var columnName = prompt('Wpisz nazwę kolumny');
        $.ajax({
            url: baseUrl + '/column',
            method: 'POST',
            data: {
                name: columnName
            },
            success: function(response){
                var column = new Column(response.id, columnName);
                board.createColumn(column);
            }
        });
    });
	
function initSortable() {
    $('.card-list').sortable({
    connectWith: '.card-list',
    placeholder: 'card-placeholder',
    receive: function(event, ui) {
        var newColumnId = $(event.target).parent().attr('data-id'),
        currentCardId = $(ui.item[0]).attr('data-id'),
        currentCardName = $(ui.item[0]).find('.card-description').text();

        $.ajax({
            url: baseUrl + '/card/' + currentCardId,
            method: 'PUT',
            data: {
                name: currentCardName,
                bootcamp_kanban_column_id: newColumnId
            },
            success: function(response) {
                
            }
        });
    }
    }).disableSelection();
}