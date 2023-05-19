const operations = ["searched 🔍", "bought ✅"];
const customers = ["Judy Hopps 🐰", "Nick Wilde 🦊", "Chief Bogo 🐃", "Officer Clawhauser ", "Mayor Lionheart 😼", "Mr. Big 🪑", "Fru Fru 💐"];
const products = ["Donut 🍩", "Carrot 🥕", "Tie 👔", "Glasses 🕶️", "Phone ☎️", "Ice cream 🍨", "Dress 👗", "Pineapple pizza 🍕"];

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export const generateActivity = () =>  ({
    operation: operations[getRandomInt(2)],
    customer: customers[getRandomInt(7)],
    product: products[getRandomInt(8)]
});


