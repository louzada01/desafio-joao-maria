function formatNullValue(value) {
  if (value === 0) {
    return value;
  } else if (!value) {
    return "- - -";
  } else {
    return value;
  }
}
function getRandomBestStudent() {
  const num = Math.floor(Math.random() * 10);
  return num % 2 === 0 ? "Joao" : "Maria";
}

function getRandomFruitAmountNumber() {
  const fruitsNum = Math.floor(Math.random() * 5);
  return fruitsNum;
}

function generateFruitsDelivery(bestStudent, pearsAmount, applesAmount) {
  const fruits = [];
  while (fruits.length < 3) {
    if (bestStudent === "Joao" && pearsAmount > 0) {
      fruits.push("Pera");
      pearsAmount--;
    } else if (bestStudent === "Joao" && applesAmount > 0) {
      fruits.push("Maçã");
      applesAmount--;
    } else if (bestStudent === "Maria" && pearsAmount > 0) {
      fruits.push("Pera");
      pearsAmount--;
    } else if (bestStudent === "Maria" && applesAmount > 0) {
      fruits.push("Maçã");
      applesAmount--;
    } else {
      break;
    }
  }
  return fruits;
}

function getDataByDay(day) {
  const dayData = {
    day,
    pearsAmount: getRandomFruitAmountNumber(),
    applesAmount: getRandomFruitAmountNumber(),
    bestStudent: getRandomBestStudent(),
  };
  const [fruit0, fruit1, fruit2] = generateFruitsDelivery(
    dayData.bestStudent,
    dayData.pearsAmount,
    dayData.applesAmount
  );

  return {
    ...dayData,
    fruit0,
    fruit1,
    fruit2,
  };
}

function sumFruitsAmountTotalDelivery({ fruits }) {
  let apples = 0;
  let pears = 0;
  for (let fruit of fruits) {
    if (fruit === "Maçã") {
      apples++;
    } else if (fruit === "Pera") {
      pears++;
    }
  }
  return { apples, pears };
}

function main() {
  const table = document.getElementById("table-month-result");
  table.innerHTML = `
    <thead>
      <th>Dia</th>
      <th>Numero de Peras</th>
      <th>Numero de Maçãs</th>
      <th>Melhor Aluno</th>
      <th>Fruta1:</th>
      <th>Fruta2:</th>
      <th>Fruta3:</th>
    </thead>
  `;

  let pearsAmountTotalDelivery = 0;
  let appleAmountTotalDelivery = 0;
  for (let day = 1; day <= 30; day++) {
    const data = getDataByDay(day);
    const { apples, pears } = sumFruitsAmountTotalDelivery({
      fruits: [data.fruit0, data.fruit1, data.fruit2],
    });
    pearsAmountTotalDelivery = pearsAmountTotalDelivery + pears;
    appleAmountTotalDelivery = appleAmountTotalDelivery + apples;
    const row = table.insertRow();

    for (const [, value] of Object.entries(data)) {
      row.insertCell().innerHTML = formatNullValue(value);
    }
  }
  const total = document.getElementById("total-result");
  total.innerHTML = `Este mês a professora levou ${appleAmountTotalDelivery} maçãs e ${pearsAmountTotalDelivery} peras.`;
}
