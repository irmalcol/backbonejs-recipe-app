# Notes

Random notes about things I've learned or quirks I've discovered through working on this project.

### View `el` attribute acting strangely

According to the [Backbone.js docs](https://backbonejs.org/), in a Backbone view, the `el` attribute is supposed to reference the parent DOM element. Within the view object, `this.el` is supposed to be the actual DOM element and `this.$el` is shorthand for the cached jQuery object representing the actual DOM element. In my testing in this project, this has not been the case. `this.el` is simply a string, and `this.$el` is undefined. [This StackOverflow question](https://stackoverflow.com/questions/24050225/why-is-the-backbone-views-el-undefined) has a somewhat interesting discussion regarding this problem. It seems I am not alone.