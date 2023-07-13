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
  const selectedValue = dropdown.value;
  const dropdownindex = dropdown.selectedIndex;
  console.log(selectedValue,dropdownindex);
  const length = dropdown.length;
  const indexes = [dropdownindex+1,dropdownindex+1+length,dropdownindex+1+2*length,dropdownindex+1+3*length];
  console.log(indexes);

  // Hide all cells in the column
  for (let i = 0; i < table.rows.length; i++) {
    for (let j=0;j<indexes.length;++j){
      table.rows[i].cells[indexes[j]].style.display = 'none';
    }
  }
}