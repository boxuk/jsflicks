JsFlicks
========

An easy to use JavaScript function to search the Flickr API.

## Usage

```javascript
// Assign your API Key
var apiKey = 'my-secret-flickr-apikey';

// Assign a license code (see http://www.flickr.com/services/api/flickr.photos.licenses.getInfo.html)
var licenseCode = '7';

// Create the object
var flickr = new JsFlicks(apiKey);

// Set an element to listen to for clicks to get a next page
flickr.nextPageListener($('#getmore'));

// Callback in case of error
flickr.onError(function(){
    alert('There was a problem retrieving the photos.');
});

// Callback for success retrieval.
flickr.onSuccess(function(photos){
    for(var i=0;i<photos.length;i++) {
        var photo = photos[i];
        $('.my-element').append(
            '<a href="' + photo.image_regular + '" target="_blank"><img src="' + photo.image_thumb + '" /></a>'
        );
    }
});
flickr.search("cat", licenseCode);
```

## License

```text
The MIT License (MIT)
 
Copyright (c) 2013 Box UK
 
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
```
