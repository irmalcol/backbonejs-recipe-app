// This is a Backbone.js app.

const RecipeModel = Backbone.Model.extend({
    defaults: {
        'title': 'Untitled Recipe'
    },

    initialize: function() {
        console.log('Model is initialized');
    }
});

const RecipeView = Backbone.View.extend({
    tagName: 'li',

    el: '#app-container',
    
    events: {
        'click': 'handleClick'
    },
    
    initialize: function() {
        console.log('View is initialized');

        this.render();
    },
    
    render: function() {
        // Create DOM element
        const element = document.createElement('p');
        
        // Populate DOM element
        element.innerText = this.model.get('title');
        element.className = 'title';

        // Attach DOM element to DOM
        // Remove this if want to render at the collection level
        parent = document.querySelector(this.el);
        parent.appendChild(element);

        // Return constructed element (not attached to DOM yet)
        return element;
    },

    handleClick: function(e) {
        console.log('Clicked!');
    }
});

const recipe = new RecipeModel;
const recipeView = new RecipeView({model: recipe});
console.log('Recipe object: ', recipe);
