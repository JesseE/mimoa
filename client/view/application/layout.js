Template.layout.helpers({
    title: function() {
        return this.title;
    },
    summary: function() {
        return this.summary;
    },
    thumbimage: function() {
        console.log(this.image1);
        return this.image1[0];
    },
    url: function() {
        return this.url;
    }
});