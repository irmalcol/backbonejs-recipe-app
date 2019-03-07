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

const ButtonView = Backbone.View.extend({
    tagName: 'section',
    
    el: '#app-container',

    events: {
        'click button': 'handleClick'
    },

    buttonTemplate: _.template($('#filter-buttons-template').html()),

    initialize: function() {
        // this.categories = this.model.get('categories');
        this.render();
    },
    
    render: function() {
        // Render filter buttons
        // console.log(this.model.get('categories').attributes);
        // const categories = this.model.get('categories').attributes;
        // console.log(categories);
        const compiledTemplate = this.buttonTemplate(this.model.attributes);
        this.$el.html(compiledTemplate);

        // Render recipe list
    },

    handleClick: function(e) {
        console.log(e.target);
        const clickedButton = e.target;
        const category = clickedButton.getAttribute('data-category');
        const toDisabled = ('true' === clickedButton.getAttribute('data-enabled'));

        this.toggleFilterButton(clickedButton, toDisabled);
        this.toggleCategory(category, toDisabled);
        this.trigger('update_category', {category, });

        console.log(toDisabled);
        // console.log(this.model.attributes);
    },

    toggleCategory: function(category, toEnabled) {
        let enabled = false;
        if(toEnabled) {
            enabled = 'true';
            // this.model.get('categories').set(category, 'false');
        }
        this.trigger('update_config', {category, enabled});
        // console.log(this.model.attributes);
    },

    toggleFilterButton: function(button, toDisabled) {
        button.classList.toggle('enabled');
        button.classList.toggle('disabled');
        if (toDisabled) {
            button.setAttribute('data-enabled', 'false');
        } else {
            button.setAttribute('data-enabled', 'true');
        }
    }
});


const RecipeListView = Backbone.View.extend({
    
    el: '#app-container',
    
    initialize: function() {
        // console.log('RecipeListView initializing');
        this.render();
        
        this.listenTo(this.collection, 'update', this.render);
    },
    
    render: function() {
        this.collection.each(function(model) {
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


// Config Section
const Config = Backbone.Model.extend({
    defaults: {
        "categories": {
            "appetizer": true,
            "entree": true,
            "dessert": true
        }
    }
});

const config = new Config;
const recipes = new RecipeCollection;
const buttonView = new ButtonView({model: config});
// console.log(config.get('categories'));
const listView = new RecipeListView({collection: recipes});

// config.on('change', app.render());// fix this?