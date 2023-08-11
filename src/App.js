import React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TableComponent } from "./components/Table";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";
import { HeaderMenu } from "./components/HeaderMenu";
import { Register } from "./components/Register";
import { CardComponent } from "./components/Card";
import { Home } from "./components/Home";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <HeaderMenu />
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Home numbers={[1, 2, 3, 4]} />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route
              path="/digimon-collection"
              exact
              element={<CardComponent />}
            />
            <Route path="/cards" exact element={<CardComponent />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ChakraProvider>
  );
}

export default App;
