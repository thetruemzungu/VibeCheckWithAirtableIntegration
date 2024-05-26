var Airtable = require('airtable');

const apiToken = ""
var base = new Airtable({apiKey: apiToken}).base('appaY3XM6gd9twu7b');

async function getListOfVibes() {
    var listOfRecords = []
    someshit = await base('VibeCheck').select({
        maxRecords: 100,
        view: "List",
        cellFormat: "json"
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            var id = record.id;
            var name = record.get("Name");
            var link = record.get("Link");
            var used = record.get("Used");

            listOfRecords.push({"id": id.toString(), "name": name.toString(), "link": link.toString(), "used": used });
        });
        fetchNextPage();
    }, function done(err) {
        if (err) { console.error(err); return; }
        return listOfRecords;
    });

    // because I'm bad at javascript and got tired of arguing with promises I just made it wait half a second
    await new Promise(resolve => setTimeout(resolve, 500));
    return listOfRecords;
}

function updateVibe(id, status) {
    base('VibeCheck').update([
        {
            "id": id,
            "fields": {
              "Used": status
            }
          }]
      , function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function(record) {
          console.log(record.get('Name'));
        });
      });
}

function resetVibes() {
    getListOfVibes().then((vibes) => {
        updatedVibes = []
        vibes.forEach((vibe)=> { 
            updatedVibe =  {"id": vibe.id, "fields": {"Used": 0}};
            updatedVibes.push(updatedVibe);
        });
        base('VibeCheck').update(
            updatedVibes
      , function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Updated following vibes to be unused:")
        records.forEach(function(record) {
          console.log(" - ", record.get('Name'));
        });
      });
    })
}

//  --- Example of how to Get the JSON array of all of the vibes
// getListOfVibes().then((vibes) => {
//     console.log(vibes);
// })


//  --- Example of how to update a vibe
// updateVibe("recMFjk2n9Y3CD5dP", 1);



// --- Example of how to reset all vibes
// resetVibes();