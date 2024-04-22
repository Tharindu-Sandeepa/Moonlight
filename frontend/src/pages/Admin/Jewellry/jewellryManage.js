import React, { useState } from "react";
import JewelleryTable from "./itemlist";
import AddItem from "./AddItem";
import Dashboard from "../Dashboard";
import { Button, Box } from "@mui/material";

function App() {
  // Define state variables to manage button visibility
  const [showJewelleryTableButton, setShowJewelleryTableButton] = useState(false);
  const [showAddItemButton, setShowAddItemButton] = useState(true);

  // Define a state variable to manage the current view
  const [currentView, setCurrentView] = useState("jewelleryTable");

  // Handler function to switch to JewelleryTable view and hide the button
  const showJewelleryTable = () => {
    setCurrentView("jewelleryTable");
    setShowAddItemButton(true); // Show AddItem button
    setShowJewelleryTableButton(false); // Hide JewelleryTable button
  };

  // Handler function to switch to AddItem view and hide the button
  const showAddItem = () => {
    setCurrentView("addItem");
    setShowJewelleryTableButton(true); // Show JewelleryTable button
    setShowAddItemButton(false); // Hide AddItem button
  };

  return (
    <>
      <Dashboard title="Jewellery">
        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
          {/* Conditionally render the JewelleryTable button if the state is true */}
          {showJewelleryTableButton && (
            <Button variant="contained" color="primary" onClick={showJewelleryTable}>
              Show Jewellery Table
            </Button>
          )}
          
          {/* Conditionally render the AddItem button if the state is true */}
          {showAddItemButton && (
            <Button variant="contained" color="secondary" onClick={showAddItem}>
              Add New Item
            </Button>
          )}
        </Box>
        
        {/* Conditionally render the appropriate component based on the current view */}
        {currentView === "jewelleryTable" && <JewelleryTable />}
        {currentView === "addItem" && <AddItem />}
      </Dashboard>
    </>
  );
}

export default App;
