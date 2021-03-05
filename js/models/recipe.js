// Recipe model

app.recipeModel = Backbone.Model.extend({
    defaults: {
        'title': 'Untitled Recipe'
    },
    
    initialize: function() {
        // console.log('Model is initialized');
    }
});