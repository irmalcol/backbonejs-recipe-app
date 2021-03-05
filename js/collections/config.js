// Collection of config button models

app.recipeConfigCollection = Backbone.Collection.extend({
    model: app.recipeConfig,

    initialize: function() {
        this.add([
            {'name': 'appetizer'},
            {'name': 'entree'},
            {'name': 'dessert'}
        ]);
    }
});