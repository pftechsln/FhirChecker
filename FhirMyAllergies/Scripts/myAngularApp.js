
// Constants : Resources Names
var resources = [
    { name: 'Conformance' },
    { name: 'Patient' },
    { name: 'AllergyIntolerance' },
    { name: 'Condition' },
    { name: 'MedicationOrder' },
    { name: 'MedicationStatement' },
    { name: 'DiagnosticReport' },
    { name: 'Observation', queryFilter: "category=laboratory", displayOverride: "Observation-laboratory", },
    { name: 'Observation', queryFilter: "category=social-history", displayOverride: "Observation-social-history", },
    { name: 'Observation', queryFilter: "category=vital-signs", displayOverride: "Observation-vital-signs", },
    { name: 'Procedure' },
    { name: 'Immunization' },
    { name: 'CarePlan' },
    { name: 'Goal' },
    { name: 'DocumentReference' },
];

// Constants: Testing Client
var defaultClient = {
    name: 'PatientFHIR',
    clientId: "c45f46c7-66cb-4ac5-b8d0-d66f5260e419",
    redirectUri: "https://localhost:44300/",
}

// Constants: Epic Client
var epicClient = {
    name: 'Epic Client',
    clientId: "6c12dff4-24e7-4475-a742-b08972c4ea27",
    redirectUri: "https://localhost:44300/",
}

// Constants : FHIR Organization URLs (will read from a file or
var strUrl = '{ "Entries": [{ "OrganizationName": "Overlake Medical Center (Internal)", "FHIRPatientFacingURI": "https://epicic.ohmc.org/Interconnect-FHIR/api/FHIR/DSTU2/"}, { "OrganizationName": "Overlake Medical Center (External)", "FHIRPatientFacingURI": "https://sfd.overlakehospital.org/FHIRproxy/api/FHIR/DSTU2/"}, { "OrganizationName": "Epic Sandbox", "FHIRPatientFacingURI": "https://open-ic.epic.com/FHIR/api/FHIR/DSTU2/"}, { "OrganizationName": "Altru Health System", "FHIRPatientFacingURI": "https://epicsoap.altru.org/fhir/api/FHIR/DSTU2/" }, { "OrganizationName": "Bellin Health", "FHIRPatientFacingURI": "https://arr.thedacare.org/BLN/FHIR/api/FHIR/DSTU2/" }, { "OrganizationName": "Carle Foundation Hospital \u0026 Physician Group", "FHIRPatientFacingURI": "https://epicsoap.carle.com/FHIR/api/FHIR/DSTU2/" }, { "OrganizationName": "Cedars-Sinai Health System", "FHIRPatientFacingURI": "https://cslinkmobile.csmc.edu/fhirproxy/api/FHIR/DSTU2/" }, { "OrganizationName": "Hattiesburg Clinic and Forrest General Hospital", "FHIRPatientFacingURI": "https://soapprod.hattiesburgclinic.com/FHIR/api/FHIR/DSTU2/" }, { "OrganizationName": "Hospital for Special Surgery", "FHIRPatientFacingURI": "https://epicproxy.et0927.epichosted.com/FHIRProxy/api/FHIR/DSTU2/" }, { "OrganizationName": "Martin Health System", "FHIRPatientFacingURI": "https://prodrx919.martinhealth.org/FHIR-PRD/api/FHIR/DSTU2/" }, { "OrganizationName": "Nebraska Medicine", "FHIRPatientFacingURI": "https://ocsoapprd.nebraskamed.com/FHIR-PRD/api/FHIR/DSTU2/" }, { "OrganizationName": "Norton Healthcare", "FHIRPatientFacingURI": "https://epicsoap.nortonhealthcare.org/FHIRPRD/api/FHIR/DSTU2/" }, { "OrganizationName": "Ochsner Health System", "FHIRPatientFacingURI": "https://myc.ochsner.org/FHIR/api/FHIR/DSTU2/" }, { "OrganizationName": "Sansum Clinic", "FHIRPatientFacingURI": "https://wavesurescripts.sansumclinic.org/FHIR/api/FHIR/DSTU2/" }, { "OrganizationName": "SSM Health", "FHIRPatientFacingURI": "https://fhir.ssmhc.com/fhir/api/FHIR/DSTU2/" }, { "OrganizationName": "SSM Health WI Dean Medical Group and Affiliates", "FHIRPatientFacingURI": "https://deanrx.deancare.com/fhir/api/FHIR/DSTU2/" }, { "OrganizationName": "Texas Children\u0027s Hospital", "FHIRPatientFacingURI": "https://mobileapps.texaschildrens.org/FHIR/api/FHIR/DSTU2/" }, { "OrganizationName": "ThedaCare", "FHIRPatientFacingURI": "https://arr.thedacare.org/TC/FHIR/api/FHIR/DSTU2/" }, { "OrganizationName": "UF Health", "FHIRPatientFacingURI": "https://epicsoap.shands.ufl.edu/FHIR/api/FHIR/DSTU2/" }, { "OrganizationName": "UW Health And Affiliates - Wisconsin", "FHIRPatientFacingURI": "https://epicproxy.hosp.wisc.edu/FhirProxy/api/FHIR/DSTU2/" }, { "OrganizationName": "Weill Cornell Medicine", "FHIRPatientFacingURI": "https://epicmobile.med.cornell.edu/FHIR/api/FHIR/DSTU2/" }] }';
var listOrgs = JSON.parse(strUrl);


function getOrgList($scope, $http) {

    //$.getJSON("https://api.github.com/users/jeresig?callback=?", function (json) {
    //    console.log(json);
    //});

    //$.getJSON("https://open.epic.com/MyApps/EndpointsJson?jsoncallback=?", function (json) {
    //    $scope.fhirOrgs = json.Entries;
    //}
        
    //);

}


function launch($scope, $http) {


    loadFhirOrg($scope, $http);
    //getOrgList($scope, $http);

    if (window.location.search.length > 3) {
        var code = window.location.search.substring(1).split('=');

        // Redirected from OAuth login with authorization code
        if (code[0] == "code") {
            oauthCode = code[1];
            $scope.oauthCode = oauthCode;

            // Retrieve the session state/settings of FHIR
            //testCase(sessionStorage.getItem('testCase'), $scope);
            loadFhirSettings($scope);

            // Exchange authorization code for access token
            getAccessToken($scope, $http);

        }

    }


}

function loadFhirOrg($scope, $http) {    
    $scope.fhirOrgs = listOrgs.Entries;
}

function loadFhirSettings($scope) {
       
    $scope.clientId = sessionStorage.getItem('client');
    $scope.redirectUri = sessionStorage.getItem('redirectUri');

    $scope.fhirEndpointUrl = sessionStorage.getItem('fhirEndpointUrl');
    $scope.fhirBaseUrl = $scope.fhirEndpointUrl.replace("api/FHIR/DSTU2/", "");
    $scope.fhirAuthUrl = $scope.fhirBaseUrl + "oauth2/authorize?response_type=code&client_id=" + $scope.clientId + "&redirect_uri=" + $scope.redirectUri;
    $scope.fhirTokenUrl = $scope.fhirBaseUrl + "oauth2/token";
}

function setFhirSettings($scope, endpointUrl, testClient) {

    if (testClient == null) {
        testClient = defaultClient;
    }
    
    if (endpointUrl == null) {
        endpointUrl = $scope.fhirEndpointUrl;
    }
    else {
        $scope.fhirEndpointUrl = endpointUrl;
    }

    $scope.clientId = testClient.clientId;
    $scope.redirectUri = testClient.redirectUri;
    
    $scope.fhirBaseUrl = endpointUrl.replace("api/FHIR/DSTU2/", "");
    $scope.fhirAuthUrl = $scope.fhirBaseUrl + "oauth2/authorize?response_type=code&client_id=" + $scope.clientId + "&redirect_uri=" + $scope.redirectUri;
    $scope.fhirTokenUrl = $scope.fhirBaseUrl + "oauth2/token";

    sessionStorage.setItem('fhirEndpointUrl', endpointUrl);
    sessionStorage.setItem('client', testClient.clientId);
    sessionStorage.setItem('redirectUri', testClient.redirectUri);
}

function testCase(caseName, $scope) {
    switch (caseName) {
        case 'epic':
            //$scope.fhirBaseUrl = "https://open-ic.epic.com/FHIR";
            //$scope.clientId = epicClientId;
            //$scope.redirectUri = redirectUri;
            setFhirSettings($scope, "https://open-ic.epic.com/FHIR/api/FHIR/DSTU2/", epicClient);
            break;

        case 'ohmcExt':
            //$scope.fhirBaseUrl = "https://sfd.overlakehospital.org/FHIRproxy";
            //$scope.clientId = orchardClientIdPrd;
            //$scope.redirectUri = redirectUri;
            setFhirSettings($scope, "https://sfd.overlakehospital.org/FHIRproxy/api/FHIR/DSTU2/");
            break;

        case 'ohmcInt':
        default:
            //$scope.fhirBaseUrl = "https://epicic.ohmc.org/Interconnect-FHIR";
            //$scope.clientId = orchardClientIdPrd;
            //$scope.redirectUri = redirectUri;
            setFhirSettings($scope, "https://epicic.ohmc.org/Interconnect-FHIR/api/FHIR/DSTU2/")
            
    }
    //$scope.fhirAuthUrl = $scope.fhirBaseUrl + "/oauth2/authorize?response_type=code&client_id=" + $scope.clientId + "&redirect_uri=" + $scope.redirectUri;
    //$scope.fhirTokenUrl = $scope.fhirBaseUrl + "/oauth2/token";
    //$scope.fhirEndpointUrl = $scope.fhirBaseUrl + "/api/FHIR/DSTU2";

    //sessionStorage.setItem('testCase', caseName);
}

function getAccessToken($scope, $http) {

    var oauthCode = $scope.oauthCode;
    
    var data = $.param({
        grant_type: 'authorization_code',
        code: oauthCode,
        redirect_uri: $scope.redirectUri,
        client_id: $scope.clientId
    });

    data = unescape(data);
    
    $scope.statusText = "In progress: exchanging authorization code for access token...";

    $http({
        method: 'POST',
        url: $scope.fhirTokenUrl,
        data: data,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept': '*/*'
        }
    }
    ).then(
        function(response) {
            //alert(status + data);
            var data = response.data;
                
            $scope.accessToken = data.access_token;
            $scope.patient = data.patient;
            $scope.accessTokenJson = JSON.stringify(data, undefined, 2);

            loadFhirData($scope, $http);
        },
        function (error) {
            $scope.statusText = "Error : " + error.statusText;
        }
    );
}

function loadFhirData($scope, $http) {

    $scope.statusText = "In progress: loading patient data from EMR server...";
    getPatData({ name: 'Patient' }, $scope, $http);
    getPatData({ name: 'AllergyIntolerance' }, $scope, $http);
    getPatData({ name: 'Immunization' }, $scope, $http);
    getPatData({ name: 'MedicationOrder' }, $scope, $http);
    getPatData({ name: 'Observation', queryFilter: 'category=laboratory', displayOverride: 'Observation-laboratory', }, $scope, $http);


    $('#emrLogin').addClass('collapse');
    $('#emrData').removeClass('collapse');
    $('#btnLogin').removeClass('hidden');
    $scope.statusText = "";

}

// Retrive patient data
function getPatData(resource, $scope, $http) {

    var url = $scope.fhirEndpointUrl;
    if (resource.name === "Conformance") {
        //getResource(resource, metadataUrl);
    }
    else if (resource.name === "Patient") {
        //getResource(resource, endpointUrl + resource.name + '/' + patientID, accessToken);
        url = url + "/" + resource.name + "/" + $scope.patient;
    }
    else if (resource.queryFilter) {
        //getResource(resource, endpointUrl + resource.name + '?patient=' + patientID + '&' + resource.queryFilter, accessToken);
        url = url + "/" + resource.name + "?patient=" + $scope.patient + '&' + resource.queryFilter;
    }
    else {
        //getResource(resource, endpointUrl + resource.name + '?patient=' + patientID, accessToken);
        url = url + "/" + resource.name + "?patient=" + $scope.patient;
    }


    $http.defaults.headers.common['Authorization'] = 'Bearer ' + $scope.accessToken;
    $http({
        method: 'GET',
        url: url,
    })
        .then(
        function (response) {
            var substance = response.data //.entry[0];
            $('#data'+resource.name).html(JSON.stringify(substance, undefined, 2));

            if (substance["resourceType"] === "Bundle") {
                entityCount = substance.total;
            }
            else {
                entityCount = 1;
            }
            $('#cnt' + resource.name).html(entityCount);

            displayData(resource, substance, $scope);
        },
        function (error) {
            $('#data' + resource.name).html("Error : " + errorStatus + " - " + error.statusText);
        }
        );
}

function displayData(resource, data, $scope) {
    if (resource.name === "Patient") {
        displayPatient(data, $scope)
    }
    else if (resource.name === "AllergyIntolerance") {
        displayAllergy(data, $scope)
    }
    else{}
        

}

function displayPatient(data, $scope) {
    var patient;

    //patient.birthDate = data.birthDate;
    //patient.gender = data.gender;
    //patient.id = data.id;
    //patient.familyName = data.name[0].family;
    //patient.givenName = data.name[0].given;
    
    //for (ln=0; ln < data.address.length; ln++) {
    //    if (data.address[ln].use === 'home'){
    //        patient.address.line[0] = data.address[ln].line.join(' ');
    //        patient.address.line[1] = data.address[ln].city + ", " + data.address[ln].state + " " + data.address[ln].postalCode + ", " + data.address[ln].country;
    //    }
    //}

    var jsonHtmlTable = ConvertJsonToTable(eval(data), 'jsonTable', null, 'Download')
    
    $('#tablePatient').html(jsonHtmlTable);
   


}

function displayAllergy(data, $scope) {

}

var app = angular.module('myApp', []);
app.controller('myCtrl', ['$scope', '$http', function ($scope, $http) {

    //$scope.accessToken = "none";
    //$scope.oauthCode = "none";

    launch($scope, $http);

    

    // Redirect browser to Fhir Authorize URL
    $scope.oauthLogin = function () {
        window.location.replace($scope.fhirAuthUrl);
    };

    // Quick fill in for test cases
    $scope.testCase = function (caseName) {
        testCase(caseName, $scope);
    };

    // Udate settings from the Data URL
    $scope.updateSettings = function () {
        setFhirSettings($scope);
    }

    $scope.reLogin = function () {
        $('#emrLogin').removeClass('collapse');
        $('#emrData').addClass('collapse');
        $('#btnLogin').addClass('hidden');
    }

    $scope.loadFhirData = function () {
        loadFhirData($scope, $http);
    }
}]);