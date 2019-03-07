// This is a Backbone.js app.

const RecipeModel = Backbone.Model.extend({
    defaults: {
        'title': 'Untitled Recipe'
    },
    
    initialize: function() {
        // console.log('Title: ', this.title);
        console.log('Model is initialized');
    }
});

const RecipeCollection = Backbone.Collection.extend({
    model: RecipeModel,
    
    url: 'https://api.github.com/gists/66755d6e09ef7d1b2e253e116575ce84',
    // url: 'https://gist.githubusercontent.com/irmalcol/66755d6e09ef7d1b2e253e116575ce84/raw/e8e2f218437a92777658745f31efef739b4da34a/recipe_data.json',
    
    initialize: function() {
        const test = this.fetch();// Remove test if not required.
        // console.log('testFetch: ', test);
        // console.log('Collection Data: ', this.models);
        console.log('RecipeCollection is initialized');
    },
    
    parse: function(response) {
        // console.log('response to parse: ', response);
        // Data must be taken out of response from GitHub API
        const dataFile = response.files;
        const data = JSON.parse(dataFile[Object.keys(dataFile)[0]].content); // Have to use Object.keys since 'recipe_data.json' gets confused with dot operator
        // console.log('data from response: ', testData);
        // console.log('typeof(testData) is: ', typeof(testData));
        // console.log('moreTestData: ', moreTestData);
        // console.log('typeof(moreTestData) is: ', typeof(moreTestData));
        
        // return response.results;
        return data;
    }
});

const Recipes = new RecipeCollection;

const RecipeListView = Backbone.View.extend({

    el: '#app-container',

    initialize: function() {
        console.log('RecipeListView initializing');
        // console.log('collection from list view: ', this.collection);
        // console.log('Collection length: ', this.collection.length)
        this.render();

        this.listenTo(this.collection, 'update', this.render);
        // this.test();
    },

    // test: function() {
    //     this.listenTo(this.collection, 'update', this.render);
    // },
    
    render: function() {
        console.log('RecipeListView render triggered!');
        console.log(this.collection);

        const ul = document.createElement('ul');

        Recipes.each(function(model) {
            console.log('model in render: ', model);
            const recipe = new RecipeView({
                model: model,
                el: ul
            });

            const fragment = recipe.render( ul );
            console.log('fragment from ListView', fragment);

            // THIS IS WRONG. NEED TO FIGURE OUT HOW TO PROPERLY HANDLE RENDERING. THINK FIRST. CODE SECOND.
            this.el.appendChild(fragment);

            // this.el.appendChild(recipe.render());//Why the .el at the end here?
        }, this);

        return this;
    }
});

const RecipeView = Backbone.View.extend({
    tagName: 'li',
    
    // el: '#app-container',
    
    events: {
        'click': 'handleClick'
    },
    
    initialize: function() {
        console.log('RecipeView is initialized');
        // this.listenTo(this.model, 'change', this.render);
    },
    
    render: function() {
        // Create DOM fragment
        const fragment = document.createElement('li');
        
        // Create title element
        const title = document.createElement('h2');
        // Populate title element
        title.innerText = this.model.get('title');
        title.className = 'title';
        // Attach title to DOM fragment
        fragment.appendChild(title);
        
        // Create ingredients list element
        const ingredientsWrapper = document.createElement('ul');
        // Populate ingredients list
        const ingredients = this.model.get('ingredients');
        console.log('ingredients: ', ingredients);
        ingredients.map( ingredient => {
            const ingredientLi = document.createElement('li');
            ingredientLi.innerText = ingredient;
            ingredientsWrapper.appendChild(ingredientLi)
        });
        // Attach title to DOM fragment
        fragment.appendChild(ingredientsWrapper);

        console.log(this.el);

        // this.el.appendChild(fragment);
        
        // Return constructed element (not attached to DOM yet)
        return fragment;
    },
    
    handleClick: function(e) {
        console.log('Clicked!');
    }
});

const app = new RecipeListView({collection: Recipes});

app.on('any', app.render());
    
    
// const app = _.clone(Backbone.Events);
// _.extend(app, {
    
//     initialize: function() {
//         console.log('App initializing');
//         this.recipe = new RecipeModel,
//         this.recipeCollection = new RecipeCollection,
//         this.recipeView = new RecipeView({model: this.recipe}),
//         this.recipeListView = new RecipeListView({collection: this.recipeCollection})

//         this.listenTo(this.recipeCollection, 'update', this.recipeListView.render);
//     }
    
//     // recipeListView.listenTo(app.)
// }); 
// // console.log('Recipe object: ', recipe);

// app.initialize();