(function () {
    var personsData = [];
    var personsGrid = eeGrid.init('table-persons',
        [
            {
                key: function (d) {
                    return d.name + (d.job ? '<br>' + d.job : '');
                }, style: 'text-left'
            },
            {
                key: 'age', style: 'text-right'
            },
            {
                key: 'nick', style: 'text-left'
            },
            {
                key: function (d) {
                    var checkbox = document.createElement('input');
                    checkbox.type = "checkbox";
                    checkbox.checked = d.employee;
                    checkbox.disabled = true;
                    return checkbox;
                },
                style: 'text-center'
            },
            {
                key: function (d) {
                    var deleteBtn = document.createElement('A');
                    deleteBtn.innerHTML = 'delete';
                    deleteBtn.addEventListener('click', function () {
                        deletePerson(d);
                    });
                    return deleteBtn;
                },
                style: 'text-center'
            }
        ]
    );

    eeUtil.getJson('asset/persons.json', function (response) {
        personsData = response;
        updateDashboard();
        document.getElementById('th-persons-sort').addEventListener('click', function (e) {
            personsGrid.sortCol(0, function(d){
                return d.name + ' ' + (d.job || '');
            });
        });
    }, function (e) {
        console.error(e);
    });

    function deletePerson(d){
        personsData = personsData.filter(function(item){
            return item !== d;
        });
        updateDashboard();
    }

    function updateDashboard(){
        personsGrid.update(personsData);
        updateDataDump(personsData);
    }


    var dataDumpElement = document.getElementById('ta-data-dump');

    function updateDataDump(d) {
        dataDumpElement.value = JSON.stringify(d, null, 4);
    }
}());