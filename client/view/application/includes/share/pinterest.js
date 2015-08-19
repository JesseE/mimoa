/**
 * Created by jesseeikema on 4/8/15.
 */
Template.shareit__pinterest.rendered = function() {
    if (!this.data) {
        return;
    }

    return this.autorun(function() {
        var data, description, href, preferred_url, template, url, _ref;
        template = Template.instance();
        data = Template.currentData();
        preferred_url = data.url || location.origin + location.pathname;
        url = encodeURIComponent(preferred_url);
        description = encodeURIComponent(data.title);
        href = "http://www.pinterest.com/pin/create/button/?url=" + url + "&media=" + data.image1 + "&description=" + description;
        return template.$('.pinterest-share').attr('href', href);
    });
};

Template.shareit__pinterest.events({
    'click a': function(event, template) {
        event.preventDefault();
        return window.open($(template.find('.pinterest-share')).attr('href'), 'pinterest_window', 'width=750, height=650');
    }
});

Template.shareit__pinterest.helpers();