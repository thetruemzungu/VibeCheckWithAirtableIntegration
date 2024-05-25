var Airtable = require('airtable');
const apiToken = ""
var base = new Airtable({apiKey: apiToken}).base('appaY3XM6gd9twu7b');

console.log('Hello World');

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


getListOfVibes().then((vibes) => {
    console.log("vibing", vibes)
})


