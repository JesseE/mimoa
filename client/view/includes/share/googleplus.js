Template.shareit_googleplus.rendered = function() {
    if (!this.data) {
        return;
    }
    return this.autorun(function() {
        var data, description, href, img, itemtype, template, title, url, _ref, _ref1;
        template = Template.instance();
        data = Template.currentData();
        $('meta[itemscope]').remove();
        description = ((_ref = data.googleplus) != null ? _ref.description : void 0) || data.excerpt || data.description || data.summary;
        url = data.url || location.origin + location.pathname;
        title = data.title;
        itemtype = ((_ref1 = data.googleplus) != null ? _ref1.itemtype : void 0) || 'Article';
        $('html').attr('itemscope', '').attr('itemtype', "http://schema.org/" + itemtype);
        $('<meta>', {
            itemprop: 'name',
            content: location.hostname
        }).appendTo('head');
        $('<meta>', {
            itemprop: 'url',
            content: url
        }).appendTo('head');
        $('<meta>', {
            itemprop: 'description',
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
            itemprop: 'image',
            content: img
        }).appendTo('head');
        href = "https://plus.google.com/share?url=" + url;
        return template.$(".googleplus-share").attr("href", href);
    });
};

Template.shareit_googleplus.helpers(ShareIt.helpers);
/**
 * Created by jesseeikema on 4/8/15.
 */
