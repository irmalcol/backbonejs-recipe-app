// This is a Backbone.js app.

const RecipeModel = Backbone.Model.extend({
    defaults: {
        'title': 'Untitled Recipe'
    },
    
    initialize: function() {
        // console.log('Model is initialized');
    }
});

const RecipeCollection = Backbone.Collection.extend({
    model: RecipeModel,
    
    url: 'https://api.github.com/gists/66755d6e09ef7d1b2e253e116575ce84',
    
    initialize: function() {
        this.fetch();
        // console.log('RecipeCollection is initialized');
    },
    
    parse: function(response) {
        // Data must be taken out of response from GitHub API
        const dataFile = response.files;
        const data = JSON.parse(dataFile[Object.keys(dataFile)[0]].content); // Have to use Object.keys since 'recipe_data.json' gets confused with dot operator
        
        return data;
    }
});

const Recipes = new RecipeCollection;

const RecipeListView = Backbone.View.extend({

    el: '#app-container',

    initialize: function() {
        // console.log('RecipeListView initializing');
        this.render();

        this.listenTo(this.collection, 'update', this.render);
    },

    render: function() {
        Recipes.each(function(model) {
            // console.log('model in render: ', model);
            const recipe = new RecipeView({
                model: model
            });

            this.$el.append(recipe.render().el);
        }.bind(this));

        return this;
    }
});

const RecipeView = Backbone.View.extend({
    tagName: 'li',

    className: 'recipe-wrapper',
    
    events: {
        'click': 'handleClick'
    },

    template: _.template($('#recipe-template').html()),
    
    initialize: function() {
        // console.log('RecipeView is initialized');
    },
    
    render: function() {

        const compiledTemplate = this.template(this.model.attributes);
        this.$el.html(compiledTemplate);
        
        return this;
    },
    
    handleClick: function(e) {
        console.log('Clicked!');
    }
});

const app = new RecipeListView({collection: Recipes});
