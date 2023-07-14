//import statements

function selectedDropdownOption() {
  let dropdown = document.getElementById("dropdown")
  let selectedIndex = dropdown.selectedIndex;
  let selectedValue = dropdown.options[dropdown.selectedIndex].text;
  console.log(selectedValue);
  let option = document.createElement("option");
  option.text = "Kiwi";
  dropdown.add(option);
}
function loadDropdownOptions() {
  let dropdown = document.getElementById("dropdown")
  var option = document.createElement("option");
  option.text = "Kiwi";
  dropdown.add(option);
  console.log("date added")
}
function changeTableColumns(){
  console.log("Changing Table Columns");
  const dropdown = document.getElementById('dropdown');
  const table = document.getElementById('tableid');
  const dropdownindex = dropdown.selectedIndex;
  const length = dropdown.length;
  console.log(dropdownindex);
  const indexes = [0,4*dropdownindex+1,4*dropdownindex+2,4*dropdownindex+3,4*dropdownindex+4,length*4+1,length*4+2,length*4+3,length*4+4];
  console.log(indexes);
  //clear visibility of all cells in the table
  const allCells = table.querySelectorAll('td , th');
  allCells.forEach(cell => {
    cell.style.display = 'none';
  });
  //reveal all pertinent cells in the column
  for (let i = 0; i < table.rows.length; i++) {
    for (let j=0;j<indexes.length;++j){
      //console.log(indexes[j]);
      table.rows[i].cells[indexes[j]].style.display = '';
    }
  }
}