//var csv is the CSV file with headers
function csvJSON(csv){

    var lines=csv.split("\n");
  
    var result = [];
  
    var headers=lines[0].split("\t");
  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split("\t");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    
    //return result; //JavaScript object
    return result; //JSON
}

$("#fileinput").on('change',function(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0]; 

    if (f) {
        var r = new FileReader();
        r.onload = function(e) { 
            var contents = e.target.result;
            vm.raw_content = contents;
            vm.csv_contents = csvJSON(contents);
        }
        r.readAsText(f)
    } else {
        alert("Failed to load file");
    }
});

$("#jsoninput").on('change', function(evt) {
    var f = evt.target.files[0]; 
    if (f) {
        var r = new FileReader();
        r.onload = function(e) { 
            var contents = e.target.result;
            vm.weight_data = JSON.parse(contents);

            if(vm.csv_contents.length != 0)
            {
                merge(vm.csv_contents, vm.weight_data);
            }
        }
        r.readAsText(f)
    } else {
        alert("Failed to load file");
    }
});

function merge(csv_data, json_data) {
    // filter csv_contents
    filtered = vm.weight_data.map(x => x.漢字)
    vm.csv_contents = vm.csv_contents.filter(x => !filtered.includes(x.漢字))
    // add to weight_data
    if(vm.csv_contents.length != 0)
        vm.csv_contents.forEach(element => {
            vm.weight_data.push(element);
        });
    
    vm.weight_data.sort(function(a, b){
        if(a.point > b.point)
            return 1;
        if(a.point < b.point)
            return -1;
        return 0;
    });

    vm.csv_contents = vm.weight_data;
}