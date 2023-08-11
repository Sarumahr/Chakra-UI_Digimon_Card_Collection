import React, { useState } from "react";
import {
  Table,
  Td,
  Tr,
  Th,
  Thead,
  Tbody,
  Button,
  Input,
  Checkbox,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";

function TableRows({ rows, tableRowRemove, onValUpdate }) {
  return rows.map((rowsData, index) => {
    const { name, cardNumber, pack, price, amount, tradable } = rowsData;
    return (
      <Tr key={index}>
        <Td>
          <Input
            type="text"
            value={name}
            onChange={(event) => onValUpdate(index, event)}
            name="name"
          />
        </Td>
        <Td>
          <Input
            type="text"
            value={cardNumber}
            onChange={(event) => onValUpdate(index, event)}
            name="cardNumber"
          />
        </Td>
        <Td>
          <Input
            type="text"
            value={pack}
            onChange={(event) => onValUpdate(index, event)}
            name="pack"
          />
        </Td>
        <Td>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="€"
            />
            <Input
              type="text"
              value={price}
              onChange={(event) => onValUpdate(index, event)}
              name="price"
            />
          </InputGroup>
        </Td>
        <Td>
          <Input
            value={amount}
            onChange={(event) => onValUpdate(index, event)}
            name="amount"
          />
        </Td>
        <Td>
          <Checkbox isDisabled isChecked={tradable} name="tradable" />
        </Td>
        <Td>
          <Button onClick={() => tableRowRemove(index)}>Delete Row</Button>
        </Td>
      </Tr>
    );
  });
}

export function TableComponent() {
  const [rows, initRow] = useState([]);
  const addRowTable = () => {
    const data = {
      name: "",
      cardNumber: "",
      pack: "",
      price: "",
      amount: "",
      tradable: false
    };
    initRow([...rows, data]);
  };
  const tableRowRemove = (index) => {
    const dataRow = [...rows];
    dataRow.splice(index, 1);
    initRow(dataRow);
  };
  const onValUpdate = (i, event) => {
    const { name, value } = event.target;
    const data = [...rows];
    data[i][name] = value;
    if (name === "amount") {
      if (value > 4) {
        data[i]["tradable"] = true;
      } else {
        data[i]["tradable"] = false;
      }
    }
    initRow(data);
  };
  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>CardNumber</Th>
            <Th>Pack</Th>
            <Th>Price</Th>
            <Th>Amount</Th>
            <Th>Tradable</Th>
            <Th>
              <Button onClick={addRowTable}>Insert Row</Button>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <TableRows
            rows={rows}
            tableRowRemove={tableRowRemove}
            onValUpdate={onValUpdate}
          />
        </Tbody>
      </Table>
    </>
  );
}
