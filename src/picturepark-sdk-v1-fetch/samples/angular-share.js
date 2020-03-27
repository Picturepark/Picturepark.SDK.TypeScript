document.write('<base href="' + document.location + '" />');

const app = angular.module('picturepark-share', []);
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
    debugger;
    const authClient = new picturepark.AuthClient('https://api.01.qa-picturepark.com', 'santest');
    const shareClient = new picturepark.ShareClient(authClient);
    shareClient.getShareJson(this.token).then(result => {
        $scope.$apply(() => {
            this.share = result;
            this.records = result.contentSelections;
            this.token = result.data.mailRecipients[0].token;
        });
    });

    this.getThumbnail = function (record, size) {
        const output = record.outputs.find(i => i.outputFormatId === size);
        if (output) {
            return output.viewUrl;
        } else {
            return output.iconUrl;
        }
    }
}
