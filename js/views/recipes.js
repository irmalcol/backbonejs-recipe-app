// Recipe list view

app.recipeListView = Backbone.View.extend({
    
    el: '#app-container',

    collection: app.recipeCollection,
    
    initialize: function() {
        // console.log('RecipeListView initializing');
        
        this.listenTo(this.collection, 'update', this.render);
        this.listenTo(app.configCollection, 'change', this.renderFromConfigEvent);
    },
    
    render: function() {
        this.collection.each(function(model) {
            const recipe = new RecipeView({
                model: model
            });
            
            this.$el.append(recipe.render().el);
        }.bind(this));
        
        return this;
    },

    renderFromConfigEvent: function(e) {
        const enabledModels = e.collection.where({enabled: true});
        const enabledModelNames = enabledModels.map( element => { 
            return element.get('name');
        });
        
        this.collection.each(function(recipeModel) {
            const category = recipeModel.get('category');
            
            if (enabledModelNames.includes(category)) { // Array.prototype.includes() not supported in IE
                const recipe = new RecipeView({
                    model: recipeModel
                });
    
                this.$el.append(recipe.render().el);
            }
        }.bind(this));
        
        return this;
    }
});