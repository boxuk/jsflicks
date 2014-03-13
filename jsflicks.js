/**
The MIT License (MIT)
 
Copyright (c) 2013-2014 Box UK
 
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
 
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

 * Searches Flickr for Images
 * @see http://www.flickr.com/services/api/flickr.photos.search.html
 * Get an API Key here: http://www.flickr.com/services/api/keys/apply/
 */
var JsFlicks = function(apiKey){
 
	// Holds instance of self
    var o = this;
 
	// integer of the license type, see
    var licenseType = null;
 
	// Base URL for the searching.
    var url = "http://api.flickr.com/services/rest/?api_key=" + apiKey;
 
	// Total number of pages returned from a search
    var pages = 0;
 
	// Current page of a search
    var page = 0;
 
	// Total number of photos across all pages
    var total = 0;
 
	// element which listens for a click to get the next page
    var listener = null;
 
	// string of keywords, like: php elephant
    var keywords = null;
 
	// callback method for error. won't always be called for XDomain requests
    var error = function(){};
 
    // Success callback function (what to do with the results)
    var success = function(d){};
 
    // Set a success function
    this.onSuccess = function(cb) {
        success = cb;
    };
 
    // Set an error function
    this.onError = function(cb) {
        error = cb;
    };
 
    // Get the total number of pages
    this.getNumberPages = function() {
        return pages;
    };
 
    // Get the current page number
    this.getPageNumber = function() {
        return page;
    };
 
    // Get the total number of
    this.getTotal = function() {
        return total;
    };
 
    // Set an element to listen on for clicks for next page retrieval.
    this.nextPageListener = function(e) {
        listener = e;
        if (listener.is(':visible')) {
            e.hide();
        }
        listener.on('click', function(a){
            a.preventDefault();
            if (pages > page) {
                o.search(keywords, licenseType, (page + 1));
            }
        });
    };
 
    // execute a search, giving 'query', 'license type' and 'page' number.
    // dont specify page number for page 1
    this.search = function(q, license, page) {
        licenseType = license;
        keywords = q;
        var q = url + "&method=flickr.photos.search";
        q += "&format=json";
        q += "&tags=" + encodeURI(keywords) ;
        q += "&per_page=100";
        if (page && page != 1) {
            q += "&page=" + page
        }
        q += "&license=" + licenseType;
        q += "&jsoncallback=?";
        execute(q);
    };
 
    // Execute the search
    var execute = function(url) {
        var jqxhr = $.getJSON(url, function(data){
            if (data.photos && data.stat == "ok") {
                if (data.photos.photo.length) {
                    page = data.photos.page;
                    pages = data.photos.pages;
                    if (pages > page) {
                        listener.show();
                    } else {
                        listener.hide();
                    }
                    total = data.photos.total;
                    var photos = new Array();
                    for(var i=0;i<data.photos.photo.length;i++){
                        var photo = data.photos.photo[i];
                        var photoUrl = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret;
                        var obj = photo;
                        obj.image_thumb = photoUrl + '_t.jpg';
                        obj.image_small = photoUrl + '_s.jpg';
                        obj.image_medium = photoUrl + '_m.jpg';
                        obj.image_regular = photoUrl + '.jpg';
                        photos.push(obj);
                    }
                    success(photos);
                } else {
                    error();
                }
            } else {
                error();
            }
        }).fail(function(){
            error();
        });
    }
 
    return this;
};
