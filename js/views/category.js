// Single config button view

app.categoryButtonSubview = Backbone.View.extend({
    tagName: 'span',

    collection: app.recipeConfigCollection,

    events: {
        'click': 'handleClick'
    },

    template: _.template($('#single-category-template').html()),

    initialize: function() {
        'init function here'
    },

    render: function() {
        const compiledTemplate = this.template(this.model.attributes);
        this.$el.html(compiledTemplate);
        
        return this;
    },

    handleClick: function(e) {
        const clickedButton = e.target;
        const toDisabled = ('true' === clickedButton.getAttribute('data-enabled'));

        this.toggleFilterButton(clickedButton, toDisabled);
        this.toggleCategory(toDisabled);
    },

    toggleCategory: function(toDisabled) {
        const enabled = toDisabled ? false : true;
        this.model.set('enabled', enabled);
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