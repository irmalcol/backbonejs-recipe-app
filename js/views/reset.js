// View to reset app, so category buttons and recipe list
// play nicely together.
//
// This file/method should be removed when markup/app structure improved.

app.resetView = Backbone.View.extend({
    el: '#app-container',

    initialize: function() {
        this.listenTo(app.configCollection, 'change', this.resetView);
    },

    resetView: function() {
        this.$el.html('');
    }
});