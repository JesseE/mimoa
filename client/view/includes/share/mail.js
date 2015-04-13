/**
 * Created by jesseeikema on 4/9/15.
 */
Template.shareit__mail.rendered = function() {
    return this.autorun(function() {
        var data, description, href, preferred_url, template, url, _ref;
        template = Template.instance();
        data = Template.currentData();
        preferred_url = data.url || location.origin + location.pathname;
        url = encodeURIComponent(preferred_url);
        description = encodeURIComponent(data.title);
        href = "http://mailto:?subject=I wanted you to see this site&amp;body="+ url;
        return template.$('.mail-share').attr('href', href);
    });
}