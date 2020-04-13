$(document).ready(function() {


    $("#submit").on("click", function(event) {
        event.preventDefault();
        console.log("submitted!");
        var userZipCode = $("#userZipCode").val();
        var queryURL = "https://www.googleapis.com/civicinfo/v2/representatives?address=" + userZipCode + "&key=AIzaSyDy5Uk_Z46JD4kv3zrgJmTnr3qFjSQGs74"

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function(response) {
                console.log(response);
                console.log(response.offices[4].officialIndices[0]);

                var placeholderImage = "https://miro.medium.com/max/2470/0*o0-6o1W1DKmI5LbX.png";

                // Define variables for senator index numbers and senator names and senator party (junior and senior doesn't really work)
                var senatorSeniorNumber = response.offices[2].officialIndices[1];
                var senatorJuniorNumber = response.offices[2].officialIndices[0];
                var senatorSeniorName = response.officials[senatorSeniorNumber].name;
                var senatorJuniorName = response.officials[senatorJuniorNumber].name;
                var senatorSeniorParty = response.officials[senatorSeniorNumber].party;
                var senatorJuniorParty = response.officials[senatorJuniorNumber].party;
                var senatorSeniorImageURL = response.officials[senatorSeniorNumber].photoUrl;
                var senatorJuniorImageURL = response.officials[senatorJuniorNumber].photoUrl;

                console.log(senatorSeniorNumber);
                console.log(response.officials[senatorSeniorNumber].photoUrl);


                // Define variables for representative index numbers and representative names and senator party
                var representativeNumber = response.offices[3].officialIndices[0];
                var representativeName = response.officials[representativeNumber].name;
                var representativeParty = response.officials[representativeNumber].party;
                var representativeImageURL = response.officials[representativeNumber].photoUrl;

                // Define variables for governor index numbers and governor names and senator party
                var governorNumber = response.offices[4].officialIndices[0];
                var governorName = response.officials[governorNumber].name;
                var governorParty = response.officials[governorNumber].party;
                var governorImageURL = response.officials[governorNumber].photoUrl;
                console.log(governorImageURL);

                // Create array to hold party affiliations
                var partyAffiliation = [senatorSeniorParty, senatorJuniorParty, representativeParty, governorParty];

                // Console log checks

                $("#senatorSenior").text("Senator: " + senatorSeniorName);
                $("#senatorJunior").text("Senator: " + senatorJuniorName);
                $("#representative").text("Representative: " + representativeName);
                $("#governor").text("Governor: " + governorName);

                if (senatorSeniorParty === "Republican Party") {
                    $("#senatorSenior").removeClass("democrat");
                    $("#senatorSenior").removeClass("independent");
                    $("#senatorSenior").addClass("republican");
                } else if (senatorSeniorParty === "Democratic Party") {
                    $("#senatorSenior").removeClass("independent");
                    $("#senatorSenior").removeClass("republican");
                    $("#senatorSenior").addClass("democrat");

                } else {
                    $("#senatorSenior").removeClass("republican");
                    $("#senatorSenior").removeClass("democrat");
                    $("#senatorSenior").addClass("independent");

                }

                if (senatorJuniorParty === "Republican Party") {
                    $("#senatorJunior").removeClass("democrat");
                    $("#senatorJunior").removeClass("independent");
                    $("#senatorJunior").addClass("republican");
                } else if (senatorJuniorParty === "Democratic Party") {
                    $("#senatorJunior").removeClass("independent");
                    $("#senatorJunior").removeClass("republican");
                    $("#senatorJunior").addClass("democrat");

                } else {
                    $("#senatorJunior").removeClass("republican");
                    $("#senatorJunior").removeClass("democrat");
                    $("#senatorJunior").addClass("independent");
                }

                if (representativeParty === "Republican Party") {
                    $("#representative").removeClass("democrat");
                    $("#representative").removeClass("independent");
                    $("#representative").addClass("republican");
                } else if (representativeParty === "Democratic Party") {
                    $("#representative").removeClass("independent");
                    $("#representative").removeClass("republican");
                    $("#representative").addClass("democrat");

                } else {
                    $("#representative").removeClass("republican");
                    $("#representative").removeClass("democrat");
                    $("#representative").addClass("independent");

                }

                if (governorParty === "Republican Party") {
                    $("#governor").removeClass("democrat");
                    $("#governor").removeClass("independent");
                    $("#governor").addClass("republican");
                } else if (governorParty === "Democratic Party") {
                    $("#governor").removeClass("independent");
                    $("#governor").removeClass("republican");
                    $("#governor").addClass("democrat");

                } else {
                    $("#governor").removeClass("republican");
                    $("#governor").removeClass("democrat");
                    $("#governor").addClass("independent");

                }

                // Change this thing to create and remove entire <img> element because we cannot figure out how to remove src without having the stupid thing appear
                $("#senatorSenior").hover(function() {
                        $("#imageHolder").attr("src", senatorSeniorImageURL);

                    },

                    function() {
                        $("#imageHolder").attr("src", placeholderImage);
                    }
                )

                $("#senatorJunior").hover(function() {
                        $("#imageHolder").attr("src", senatorJuniorImageURL);

                    },

                    function() {
                        $("#imageHolder").attr("src", placeholderImage);
                    }
                )

                $("#representative").hover(function() {
                        $("#imageHolder").attr("src", representativeImageURL);

                    },

                    function() {
                        $("#imageHolder").attr("src", placeholderImage);
                    }
                )


                $("#governor").hover(function() {
                        $("#imageHolder").attr("src", governorImageURL);

                    },

                    function() {
                        $("#imageHolder").attr("src", placeholderImage);
                    }
                )

                // Define counter variables for party affiliations

                var numberOfRepublicans = 0;
                var numberOfDemocrats = 0;
                var numberOfIndependents = 0;

                // Create for loop to cycle through party affiliation array and count number of republicans / democrats / independents
                var i;
                for (i = 0; i < partyAffiliation.length; i++) {
                    if (partyAffiliation[i] === "Republican Party") {
                        numberOfRepublicans++;
                    }
                    if (partyAffiliation[i] === "Democratic Party") {
                        numberOfDemocrats++;
                    }
                    if (partyAffiliation[i] === "Nonpartisan") {
                        numberOfIndependents++;
                    }

                }

                console.log("Number of Republicans: " + numberOfRepublicans);
                console.log("Number of Democrats: " + numberOfDemocrats);
                console.log("Number of Independents: " + numberOfIndependents);

                if (numberOfDemocrats > numberOfRepublicans) {
                    $("#representative-outputs").removeClass("republican-background");
                    $("#representative-outputs").removeClass("neutral-background");
                    $("#representative-outputs").addClass("democratic-background");
                } else if (numberOfDemocrats < numberOfRepublicans) {
                    $("#representative-outputs").removeClass("neutral-background");
                    $("#representative-outputs").removeClass("democratic-background");
                    $("#representative-outputs").addClass("republican-background");

                } else {
                    $("#representative-outputs").removeClass("democratic-background");
                    $("#representative-outputs").removeClass("republican-background");
                    $("#representative-outputs").addClass("neutral-background");
                }


            })
    })

    // End of listener
})