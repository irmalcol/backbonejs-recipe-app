

app.categoryButtonsView = Backbone.View.extend({
    
    el: '#app-container',

    collection: app.configCollection,

    events: {
        'click button': 'handleClick'
    },

    initialize: function() {
        this.render();
        
        this.listenTo(this.collection, 'update', this.render);
        this.listenTo(this.collection, 'change', this.render);
    },

    render: function() {
        const buttonWrapper = document.createElement('div');
        buttonWrapper.className = 'filter-buttons';

        this.collection.each(function(model) {
            const category = new CategoryButtonSubview({
                model: model
            });


            buttonWrapper.appendChild(category.render().el);
        }.bind(this));
        
        this.$el.append(buttonWrapper);

        return this;
    }
});