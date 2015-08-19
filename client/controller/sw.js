/////**
//// * Created by jesseeikema on 7/13/15.
//// */
////
////if (!Cache.prototype.add) {
////    Cache.prototype.add = function add(request) {
////        return this.addAll([request]);
////    };
////}
////
//if (!Cache.prototype.addAll) {
//    Cache.prototype.addAll = function addAll(requests) {
//        var cache = this;
//
//        // Since DOMExceptions are not constructable:
//        function NetworkError(message) {
//            this.name = 'NetworkError';
//            this.code = 19;
//            this.message = message;
//        }
//        NetworkError.prototype = Object.create(Error.prototype);
//
//        return Promise.resolve().then(function() {
//            if (arguments.length < 1) throw new TypeError();
//
//            // Simulate sequence<(Request or USVString)> binding:
//            var sequence = [];
//
//            requests = requests.map(function(request) {
//                if (request instanceof Request) {
//                    return request;
//                }
//                else {
//                    return String(request); // may throw TypeError
//                }
//            });
//
//            return Promise.all(
//                requests.map(function(request) {
//                    if (typeof request === 'string') {
//                        request = new Request(request);
//                    }
//
//                    var scheme = new URL(request.url).protocol;
//
//                    if (scheme !== 'http:' && scheme !== 'https:') {
//                        throw new NetworkError("Invalid scheme");
//                    }
//
//                    return fetch(request.clone());
//                })
//            );
//        }).then(function(responses) {
//            // TODO: check that requests don't overwrite one another
//            // (don't think this is possible to polyfill due to opaque responses)
//            return Promise.all(
//                responses.map(function(response, i) {
//                    return cache.put(requests[i], response);
//                })
//            );
//        }).then(function() {
//            return undefined;
//        });
//    };
//}
//self.addEventListener('fetch', function(event) {
//    event.respondWith(
//        caches.match(event.request).then(function(response) {
//            return response || new Response("Nothing in the cache for this request");
//        })
//    );
//});
//Template.collectionRoute.events({
//    'click .map-save-offline': function(e){
//        e.preventDefault();
//        var currentUserID = Meteor.userId();
//        console.log(currentUserID);
//        caches.open('/').then(function(cache) {
//            fetch('/profile/collection/'+currentUserID+'/map').then(function(response) {
//                console.log(response);
//                cache.addAll(response);
//                return response;
//            });
//        });
//    }
//});