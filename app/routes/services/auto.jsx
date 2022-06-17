import { json } from "@remix-run/node";
import champData from "~/json/champion-data.json";

const randomNumber = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const GenerateTeam = () => {
  const top = [];
  const jungle = [];
  const mid = [];
  const adc = [];
  const support = [];
  const finalTeam = [];

  champData.map((cd) =>
    cd.positions.map((p) => (p === "Top" ? top.push(cd.name) : null))
  );
  champData.map((cd) =>
    cd.positions.map((p) => (p === "Jungle" ? jungle.push(cd.name) : null))
  );
  champData.map((cd) =>
    cd.positions.map((p) => (p === "Middle" ? mid.push(cd.name) : null))
  );
  champData.map((cd) =>
    cd.positions.map((p) => (p === "ADC" ? adc.push(cd.name) : null))
  );
  champData.map((cd) =>
    cd.positions.map((p) => (p === "Support" ? support.push(cd.name) : null))
  );

  finalTeam.push(randomNumber(top));
  finalTeam.push(randomNumber(jungle));
  finalTeam.push(randomNumber(mid));
  finalTeam.push(randomNumber(adc));
  finalTeam.push(randomNumber(support));
  return finalTeam;
};

export const GenerateRandomTeam = () => {
  const finalTeam = [];

  for (let i = 0; i < 5; i++) {
    finalTeam.push(randomNumber(champData).name);
  }
  return finalTeam;
};


