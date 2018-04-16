angular.module('app', ['ngSanitize'])

    .controller('tableController', function ($scope,$sce, $http) {
        $scope.getTable = function () {

            /*
           var MongoClient = require('mongodb').MongoClient;
           var url = "mongodb://localhost:27017/hackathon_weaponDetector";

           MongoClient.connect(url, function(err, db) {
               if (err) throw err;
               db.collection("activity").find({}).sort( { _id: -1 } ).toArray(function(err, result) {
                   if (err) throw err;
                   console.log(result);
                   console.log($scope.DataList);
                   $scope.DataList = new Array();
                   $scope.DataList = result;

                   db.close();
               });
           });
            */

           var handler = $http.get(
               'https://api.mlab.com/api/1/databases/avniwebdemo/collections/activitydbase?apiKey=P23OYNzyGb23939bvLRZulfllHxryoV2'
           );
           handler.success(function (data) {
               console.log(data);
               $scope.DataList = new Array();
               $scope.DataList = data;
               console.log($scope.DataList);

           });
           handler.error(function () {
               alert("There was some error processing your request. Please try after some time.");
           });

        }
    });

//Update table every 5 seconds
window.setInterval(function(){
    /// call your function here
    getTable()
}, 10000);

// Activity tab - Export function
// Get photo id, activity, camera and time from database
// Yes, we need to make a column for photo id, which will not be displayed in the table
// Fetch above mentioned data and save it as a csv
// on click, when we save word document, an explorer opens to ask where do we want to save
// similar kind of functionality would be good so that user can choose the location
exportToCSV = function () {
    //Paul added this codde

   /* var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/hackathon_weaponDetector";

    var data = [];

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("activity").find({camera:0, activity: 1, time: 1}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            console.log($scope.DataList);
            data = result;
            db.close();
        });
    });

    */


    //Code for export
    var csv = 'Camera,Activity,Time\n';
    data.forEach(function(row) {
        csv += row.join(',');
        csv += "\n";
    });

    console.log(csv);
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'general.csv';
    hiddenElement.click();

}

showImg = function(){
    alert("show picture.");

}