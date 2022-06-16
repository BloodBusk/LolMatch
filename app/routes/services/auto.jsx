import champData from "~/json/champion-data.json";

const randomNumber = (arr, pos) => {
    return arr[Math.floor(Math.random() * pos.length)];
}

export const GenerateTeam = (request) => {
    const top = [];
    const jungle = [];
    const mid = [];
    const adc = [];
    const support = [];
    const finalTeam = [];

    champData.map(cd => cd.positions.map(p => p === "Top" ? top.push(cd.name) : null));
    champData.map(cd => cd.positions.map(p => p === "Jungle" ? jungle.push(cd.name) : null));
    champData.map(cd => cd.positions.map(p => p === "Middle" ? mid.push(cd.name) : null));
    champData.map(cd => cd.positions.map(p => p === "ADC" ? adc.push(cd.name) : null));
    champData.map(cd => cd.positions.map(p => p === "Support" ? support.push(cd.name) : null));

    console.log(top);
    console.log(jungle);
    console.log(mid);
    console.log(adc);
    console.log(support);

    finalTeam.push(randomNumber(top, top));
    finalTeam.push(randomNumber(jungle, jungle));
    finalTeam.push(randomNumber(mid, mid));
    finalTeam.push(randomNumber(adc, adc));
    finalTeam.push(randomNumber(support, support));

    console.log(finalTeam);
    return finalTeam;
}