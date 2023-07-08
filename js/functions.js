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
  console.log("this happened")
}