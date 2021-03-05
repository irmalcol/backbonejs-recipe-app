// Recipes collection

app.recipeCollection = Backbone.Collection.extend({
    model: app.recipeModel,
    
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