# Picturepark Content Platform Fetch Clients

## picturepark-sdk-v1-ng2-fetch

- [API Documentation](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/docs/picturepark-sdk-v1-fetch/api/index.html)

### Downloads

Latest version from master branch (use for development only): 

- [picturepark.js](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/src/picturepark-sdk-v1-fetch/dist/picturepark.js)
- [picturepark.d.ts](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/src/picturepark-sdk-v1-fetch/dist/picturepark.d.ts)

### Usage

Load the script in your website: 

    <script src="picturepark.js"></script>

The available classes are now available in the global namespace `picturepark`: 

		var client = new picturepark.PublicAccessClient('https://my-picturepark-server.com');
		client.getShare('4rgTsG52').then(function(result) {
		    // TODO: Process result
		}).catch(function(error) {
			  // TODO: Handle exception
    });
