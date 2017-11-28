document.write('<base href="' + document.location + '" />');

var app = angular.module('picturepark-share', []);
app.config(function ($compileProvider) {
    $compileProvider.preAssignBindingsEnabled(true);
});

app.component('pictureparkShare', {
    bindings: {
        token: '@',
        baseUrl: '@'
    },
    template: `
        <div ng-include src="'message.html'"></div>
        <div ng-repeat="record in $ctrl.records"><div ng-include src="'card.html'"></div></div>
    `,
    controller: ['$scope', TestController]
});

function TestController($scope) {
    var authClient = new picturepark.AuthClient('https://devnext-api.preview-picturepark.com', 'dev');
    var client = new picturepark.PublicAccessClient(authClient);
    client.getShare(this.token).then(result => {
        $scope.$apply(() => {
            this.share = result;
            this.records = result.contentSelections;
            this.token = result.mailRecipients[0].token;
        });
    });

    this.getThumbnail = function (record, size) {
        return this.baseUrl + "/Go/" + this.token + "/V/" + record.id + "/" + size;
    }
}
