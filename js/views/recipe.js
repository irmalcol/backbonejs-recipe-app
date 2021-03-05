// Single recipe view

app.recipeView = Backbone.View.extend({
    tagName: 'li',
    
    className: 'recipe-wrapper',
    
    template: _.template($('#recipe-template').html()),
    
    initialize: function() {
        // console.log('RecipeView is initialized');
    },
    
    render: function() {
        const compiledTemplate = this.template(this.model.attributes);
        this.$el.html(compiledTemplate);
        
        return this;
    },
});