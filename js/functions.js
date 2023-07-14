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
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("tableid");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "desc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
      console.log(switchcount);
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}