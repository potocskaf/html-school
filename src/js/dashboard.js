(function () {
    var personsData = [];
    var personsGrid = eeGrid.init('table-persons',
        [
            function (d){
                return d.name + (d.job ? '<br>' + d.job : '');
            },
            'age',
            'nick',
            function(d){
                var checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.checked = d.employee;
                checkbox.disabled = true;
                return checkbox;
            },
            function (d) {
                var deleteBtn = document.createElement('A');
                deleteBtn.innerHTML = 'delete';
                deleteBtn.addEventListener('click', function(){
                    console.log(d);
                });
                return deleteBtn;
            }
        ]
    );
    eeUtil.getJson('asset/persons.json', function (response) {
        personsData = response;
        personsGrid.update(personsData);
        updateDataDump(personsData);
    }, function (e) {
        console.error(e);
    });

    var dataDumpElement = document.getElementById('ta-data-dump');
    function updateDataDump(d) {
        dataDumpElement.value = JSON.stringify(d, null, 4);
    }
}());