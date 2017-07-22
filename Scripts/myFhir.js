
var redirectUri = "https://localhost:44300/index.html";
var orchardClientIdNp = "f4bc44b5-1010-45c7-8ed6-315cfecb14e4";
var orchardClientIdPrd = "c45f46c7-66cb-4ac5-b8d0-d66f5260e419";
//var ohmcTestClientId = "59191f6b-23d9-401e-aff6-2d0d90f7af48";
var ohmcSoF = "601ebde9-9e89-4e31-9dd3-18c19429a631";
var ohmcTestUri = "http://localhost:8000/index.html";
var epicClientId = "6c12dff4-24e7-4475-a742-b08972c4ea27";
var appName = "FhirPOC";
var oauthUrl = "https://open-ic.epic.com/argonaut/oauth2/authorize?response_type=code&client_id=" + epicClientId + "&redirect_uri=" + redirectUri;
//var tokenUrl = "https://open-ic.epic.com/argonaut/oauth2/token";


var tokenUrl = "https://sfd.overlakehospital.org/FHIRproxy/token";
var accessToken = null;
var oauthCode = "";
var baseUrl = "https://open-ic.epic.com/FHIR/api/FHIR/DSTU2/";
var allergyUrl = "https://open-ic.epic.com/FHIR/api/FHIR/DSTU2/AllergyIntolerance?patient=Tbt3KuCY0B5PSrJvCu2j-PlK.aiHsu2xUjUM8bWpetXoB";
var patId;


// Get Access Token using JQuery
function getAccessToken2() {

    var oauthCode = $scope.oauthCode;
    //var path = "grant_type=authorization_code" + "&code=" + oauthCode + "&redirect_uri=" + redirectUri + "&client_id=" + epicClientId;

    var data = $.param({
        grant_type: 'authorization_code',
        code: oauthCode,
        redirect_uri: ohmcTestUri,
        client_id: $scope.clientId
    });

    data = unescape(data);
    console.log("Token Request: " + data);


    $.post($scope.fhirTokenUrl, data, function (response) {

        //alert(status + data);
        accessToken = { "access_token": response.access_token, "token_type": response.token_type, "expires_in": response.expires_in, "scope": response.scope, "patient": response.patient };
        $scope.accessToken = response.access_token;
        $scope.patient = response.patient;
        $scope.accessTokenJson = JSON.stringify(data, undefined, 2);

    }).fail(
        function (response) {
            console.log(response.responseText);
        });



}

// TEST: try to use SMART
function smartGet(resource) {
    //FHIR.oauth2.launch();

    FHIR.oauth2.authorize({
        'client_id': $scope.clientId,
        'scope': 'patient/Patient.read patient/Observation.read launch online_access openid profile'
    });

    var smart = FHIR.client({
        serviceUrl: $scope.fhirEndpointUrl,
        patientId: $scope.patient
    });


    smart.patient.api.search({ 'type': 'MedicationOrder' });
}

function displayAllery() {
    alert("my allergy");
}

//function checkFbHashLogin($scope, $http) {

//    if (window.location.search.length > 3) {
//        var code = window.location.search.substring(1).split('=');
//        if (code[0] == "code") {
//            oauthCode = code[1];
//            $scope.oauthCode = oauthCode;

//            //getAccessToken($scope, $http);
//        }

//    }
//}

//// Exchange the authorization code with access token
//// example: 		
////   https://open-ic.epic.com/argonaut/oauth2/tokengrant_type=authorization_code&code=QY4IDRFBZOPtYenTOAZK34mSYX%2BCcVOJLj%2BKkTAmMRp4DHYtN6JOp%2FILMjRk1mkl%2Bnllz5yLwixKGs2wwEodUTvEegYMi%2FwKCD9ZiH2MsURO%2FW9yUfuQJW8fDbBrBUTF&redirect_uri=http://localhost:8000&client_id=6c12dff4-24e7-4475-a742-b08972c4ea27
////   Content-Type: x-www-form-urlencoded	

//function getAccessToken($scope, $http) {

//    var oauthCode = $scope.oauthCode;
//    var path = "grant_type=authorization_code" + "&code=" + oauthCode + "&redirect_uri=" + redirectUri + "&client_id=" + epicClientId;

//    var data = $.param({
//        grant_type: 'authorization_code',
//        code: oauthCode,
//        redirect_uri: ohmcTestUri,
//        client_id: ohmcSoF
//    });

//    data = unescape(data);

//    $.post($scope.tokenUrl, data, function (response) {
//            //alert(status + data);
//            accessToken = { "access_token": response.access_token, "token_type": response.token_type, "expires_in": response.expires_in, "scope": response.scope, "patient": response.patient };
//            $scope.accessToken = data.access_token;
//        }).fail(
//        function (response) {
//            alert(response.status + response.data);
//        });



//}