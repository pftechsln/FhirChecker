var rocket;
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

function loadFhirData() {
    var accessToken = $('#access-token').html();
    var patientID = $('#patient-id').html();
    var metadataUrl = $('#metadata-url').html();

    if (accessToken) { }
    else { return; }

    $('#step4').removeClass('hidden');

    //  Pull the endpoint URL from metadata since open.epic base URL is broken right now...
    if (metadataUrl) {
        var endpointUrl = metadataUrl.replace("metadata", "");
    }

    resources.forEach(function (resource) {
        if (resource.name === "Conformance") {
            getResource(resource, metadataUrl);
        }
        else if (resource.name === "Patient") {
            getResource(resource, endpointUrl + resource.name + '/' + patientID, accessToken);
        }
        else if (resource.queryFilter) {
            getResource(resource, endpointUrl + resource.name + '?patient=' + patientID + '&' + resource.queryFilter, accessToken);
        }
        else {
            getResource(resource, endpointUrl + resource.name + '?patient=' + patientID, accessToken);
        }
    })

    $('#Patient-tab').tab('show');
}

function getResource(resource, url, accessToken, category) {
    console.log("Loading data from " + url)
    $.ajax({
        url: url,
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + accessToken
        },
        success: function (response) {
            renderFHIR(resource, response, category)
        },
        error: function (response) {
            console.log(response);
        }
    });
}

function renderFHIR(resource, response, category) {
    var entityCount = 0;

    var resourceName = resource.name;
    if (resource.displayOverride) {
        resourceName = resource.displayOverride;
    }

    if (response["resourceType"] === "Bundle") {
        entityCount = response.total;
    }
    else {
        entityCount = 1;
    }
    console.log("rendering response for " + resourceName);

    $('#fhir-tabcontent #' + resourceName + ' .json').html(JSON.stringify(response, undefined, 2));
    $('#' + resourceName + '-tab .badge').html(entityCount);
    if (entityCount === 0) {
        $('#' + resourceName + '-tab .badge').addClass();
    }
}

// Pull down the FHIR data from the server when the page loads
$(function () {
    var navTemplate = Handlebars.compile($("#resource-nav-template").html());
    var contentTemplate = Handlebars.compile($("#resource-content-template").html());

    // reverse and pre-pend to keep the static reload button at the bottom
    resources.reverse().forEach(function (resource) {
        var resourceName = resource.name;
        if (resource.displayOverride) {
            resourceName = resource.displayOverride;
        }

        $('#fhir-resources').prepend(navTemplate({ resource: resourceName }));
        $('#fhir-tabcontent').prepend(contentTemplate({ resource: resourceName }));
    })

    loadFhirData();
    $('#reload-fhir-data').click(function () {
        console.log("reloading FHIR data");
        loadFhirData();
    });
});
