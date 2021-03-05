// This is a Backbone.js app.

const app = {};

/////////////////////
// Recipes Section //
/////////////////////

// const RecipeModel = Backbone.Model.extend({
//     defaults: {
//         'title': 'Untitled Recipe'
//     },
    
//     initialize: function() {
//         // console.log('Model is initialized');
//     }
// });

// const RecipeCollection = Backbone.Collection.extend({
//     model: RecipeModel,
    
//     url: 'https://api.github.com/gists/66755d6e09ef7d1b2e253e116575ce84',
    
//     initialize: function() {
//         this.fetch();
//         // console.log('RecipeCollection is initialized');
//     },
    
//     parse: function(response) {
//         // Data must be taken out of response from GitHub API
//         const dataFile = response.files;
//         const data = JSON.parse(dataFile[Object.keys(dataFile)[0]].content); // Have to use Object.keys since 'recipe_data.json' gets confused with dot operator
        
//         return data;
//     }
// });

// const RecipeListView = Backbone.View.extend({
    
//     el: '#app-container',
    
//     initialize: function() {
//         // console.log('RecipeListView initializing');
        
//         this.listenTo(this.collection, 'update', this.render);
//     },
    
//     render: function() {
//         this.collection.each(function(model) {
//             const recipe = new RecipeView({
//                 model: model
//             });
            
//             this.$el.append(recipe.render().el);
//         }.bind(this));
        
//         return this;
//     },

//     renderFromConfigEvent: function(e) {
//         const enabledModels = e.collection.where({enabled: true});
//         const enabledModelNames = enabledModels.map( element => { 
//             return element.get('name');
//         });
        
//         this.collection.each(function(recipeModel) {
//             const category = recipeModel.get('category');
            
//             if (enabledModelNames.includes(category)) { // Array.prototype.includes() not supported in IE
//                 const recipe = new RecipeView({
//                     model: recipeModel
//                 });
    
//                 this.$el.append(recipe.render().el);
//             }
//         }.bind(this));
        
//         return this;
//     }
// });

// const RecipeView = Backbone.View.extend({
//     tagName: 'li',
    
//     className: 'recipe-wrapper',
    
//     template: _.template($('#recipe-template').html()),
    
//     initialize: function() {
//         // console.log('RecipeView is initialized');
//     },
    
//     render: function() {
//         const compiledTemplate = this.template(this.model.attributes);
//         this.$el.html(compiledTemplate);
        
//         return this;
//     },
// });

////////////////////
// Config Section //
////////////////////

// const RecipeConfig = Backbone.Model.extend({
//     defaults: {
//         'name': 'Recipe Config',
//         'enabled': true
//     }
// });

// const RecipeConfigCollection = Backbone.Collection.extend({
//     model: RecipeConfig,

//     initialize: function() {
//         this.add([
//             {'name': 'appetizer'},
//             {'name': 'entree'},
//             {'name': 'dessert'}
//         ]);
//     }
// });

// const CategoryButtonsView = Backbone.View.extend({
    
//     el: '#app-container',

//     events: {
//         'click button': 'handleClick'
//     },

//     initialize: function() {
//         this.render();
        
//         this.listenTo(this.collection, 'update', this.render);
//     },

//     render: function() {
//         const buttonWrapper = document.createElement('div');
//         buttonWrapper.className = 'filter-buttons';

//         this.collection.each(function(model) {
//             const category = new CategoryButtonSubview({
//                 model: model
//             });


//             buttonWrapper.appendChild(category.render().el);
//         }.bind(this));
        
//         this.$el.append(buttonWrapper);

//         return this;
//     }
// });

// const CategoryButtonSubview = Backbone.View.extend({
//     tagName: 'span',

//     events: {
//         'click': 'handleClick'
//     },

//     template: _.template($('#single-category-template').html()),

//     initialize: function() {
//         'init function here'
//     },

//     render: function() {
//         const compiledTemplate = this.template(this.model.attributes);
//         this.$el.html(compiledTemplate);
        
//         return this;
//     },

//     handleClick: function(e) {
//         const clickedButton = e.target;
//         const toDisabled = ('true' === clickedButton.getAttribute('data-enabled'));

//         this.toggleFilterButton(clickedButton, toDisabled);
//         this.toggleCategory(toDisabled);
//     },

//     toggleCategory: function(toDisabled) {
//         const enabled = toDisabled ? false : true;
//         this.model.set('enabled', enabled);
//     },

//     toggleFilterButton: function(button, toDisabled) {
//         button.classList.toggle('enabled');
//         button.classList.toggle('disabled');
//         if (toDisabled) {
//             button.setAttribute('data-enabled', 'false');
//         } else {
//             button.setAttribute('data-enabled', 'true');
//         }
//     } 
// });

// const ResetView = Backbone.View.extend({
//     el: '#app-container',

//     resetView: function() {
//         this.$el.html('');
//     }
// });

// const configCollection = new RecipeConfigCollection
// const categoriesView = new CategoryButtonsView({collection: configCollection});
// const recipes = new RecipeCollection;
// const listView = new RecipeListView({collection: recipes});
// const resetView = new ResetView;
// resetView.listenTo(configCollection, 'change', resetView.resetView);
// categoriesView.listenTo(configCollection, 'change', categoriesView.render);
// listView.listenTo(configCollection, 'change', listView.renderFromConfigEvent);
