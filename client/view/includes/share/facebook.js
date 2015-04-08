/**
 * Created by jesseeikema on 4/8/15.
 */
Template.shareit_facebook.rendered = function() {
    if (!this.data) {
        return;
    }
    this.autorun(function() {
        var base, data, description, href, img, summary, template, title, url, _ref;
        template = Template.instance();
        data = Template.currentData();
        $('meta[property^="og:"]').remove();
        description = ((_ref = data.facebook) != null ? _ref.description : void 0) || data.excerpt || data.description || data.summary;
        url = data.url || location.origin + location.pathname;
        title = data.title;
        $('<meta>', {
            property: 'og:type',
            content: 'article'
        }).appendTo('head');
        $('<meta>', {
            property: 'og:site_name',
            content: location.hostname
        }).appendTo('head');
        $('<meta>', {
            property: 'og:url',
            content: url
        }).appendTo('head');
        $('<meta>', {
            property: 'og:title',
            content: title
        }).appendTo('head');
        $('<meta>', {
            property: 'og:description',
            content: description
        }).appendTo('head');
        if (data.thumbnail) {
            if (typeof data.thumbnail === "function") {
                img = data.thumbnail();
            } else {
                img = data.thumbnail;
            }
        }
        if (img) {
            if (!/^http(s?):\/\/+/.test(img)) {
                img = location.origin + img;
            }
        }
        $('<meta>', {
            property: 'og:image',
            content: img
        }).appendTo('head');

        if (ShareIt.settings.sites.facebook.appId != null) {
            return template.$('.fb-share').click(function(e) {
                e.preventDefault();
                return FB.ui({
                    method: 'share',
                    display: 'popup',
                    href: url
                }, function(response) {});
            });
        } else {
            url = encodeURIComponent(url);
            base = "https://www.facebook.com/sharer/sharer.php";
            title = encodeURIComponent(title);
            summary = encodeURIComponent(description);
            href = base + "?s=100&p[url]=" + url + "&p[title]=" + title + "&p[summary]=" + summary;
            if (img) {
                href += "&p[images][0]=" + encodeURIComponent(img);
            }
            return template.$(".fb-share").attr("href", href);
        }
    });
};

Template.shareit_facebook.helpers(ShareIt.helpers);