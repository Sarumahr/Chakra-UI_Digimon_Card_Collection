import React, { useState } from "react";
import {
  Alert,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Button,
  IconButton,
  Checkbox,
  Grid,
  Text,
  Input,
  Image,
  Stack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

function Cards({
  cards,
  cardRemove,
  onValUpdate,
  handleAmount,
  triggerSearch
}) {
  return cards.map((cardData, index) => {
    const { amount, tradable, image } = cardData;
    return (
      <Card key={index} minW="3xs" maxW="3xs" marginTop="10">
        <CardHeader>
          <Image src={image} />
        </CardHeader>
        <CardBody>
          <Stack spacing="3">
            <Input
              name="cardnumber"
              textAlign="center"
              placeholder="cardnumber"
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  triggerSearch(index, event);
                }
              }}
            ></Input>
            <InputGroup>
              <InputLeftElement>
                <IconButton
                  name="subtract"
                  colorScheme="teal"
                  icon={<MinusIcon />}
                  onClick={(event) => handleAmount(index, event)}
                />
              </InputLeftElement>
              <Input
                name="amount"
                textAlign="center"
                placeholder={Number(amount)}
                onChange={(event) => onValUpdate(index, event)}
                isDisabled
              />
              <InputRightElement>
                <IconButton
                  name="add"
                  colorScheme="teal"
                  icon={<AddIcon />}
                  onClick={(event) => handleAmount(index, event)}
                />
              </InputRightElement>
            </InputGroup>
          </Stack>
          <Text>Tradable: </Text>
          <Checkbox isDisabled isChecked={tradable} name="tradable" />
        </CardBody>
        <CardFooter>
          <Button
            colorScheme="red"
            justifySelf="flex-end"
            onClick={() => cardRemove(index)}
          >
            Remove
          </Button>
        </CardFooter>
      </Card>
    );
  });
}

export function CardComponent() {
  const [cards, initCard] = useState([]);

  const addCard = () => {
    const data = {
      amount: 0,
      tradable: false,
      cardnumber: "",
      image: ""
    };
    initCard([...cards, data]);
  };
  const cardRemove = (index) => {
    const dataCard = [...cards];
    dataCard.splice(index, 1);
    initCard(dataCard);
  };
  const onValUpdate = (i, event) => {
    const { name, value } = event.target;
    const data = [...cards];
    data[i][name] = value;
    initCard(data);
  };
  const handleAmount = (i, event) => {
    const { name } = event.target;
    const data = [...cards];

    if (name === "subtract" && Number(data[i]["amount"]) > 0) {
      data[i]["amount"] = Number(data[i]["amount"]) - 1;
    }
    if (name === "add") {
      data[i]["amount"] = Number(data[i]["amount"]) + 1;
    }
    if (Number(data[i]["amount"]) > 4) {
      data[i]["tradable"] = true;
    } else {
      data[i]["tradable"] = false;
    }
    initCard(data);
  };
  const getData = (id) => {
    return fetch(
      `https://digimoncard.io/api-public/search.php?card=${id}&sort=name&sortdirection=desc&series=Digimon%20Card%20Game`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson[0].image_url;
      })
      .catch((error) => {
        console.error(error);
        return (
          <>
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Image source not found</AlertTitle>
              <AlertDescription>
                The given cardnumber may not be defined
              </AlertDescription>
            </Alert>
          </>
        );
      });
  };
  const triggerSearch = async (i, event) => {
    const { value } = event.target;
    const data = [...cards];
    data[i]["image"] = await getData(value);
    initCard(data);
  };
  return (
    <>
      <div style={{ marginTop: "10px" }}>
        <IconButton colorScheme="teal" icon={<AddIcon />} onClick={addCard} />
        <Grid templateColumns="repeat(7, 1fr)" gap={1}>
          <Cards
            cards={cards}
            cardRemove={cardRemove}
            onValUpdate={onValUpdate}
            handleAmount={handleAmount}
            triggerSearch={triggerSearch}
          />
        </Grid>
      </div>
    </>
  );
}
