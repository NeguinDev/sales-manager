async function OnLoad() {
	const response = await fetch('/db');
	const db = await response.json();

	/*
	const db = {
		sales: {
			"Bolo de Cenoura": {
				days: {
					"07/25": {
						day: "07/25",
						amount: 6,
					},
					"07/27": {
						day: "07/27",
						amount: 2,
					},
					"07/28": {
						day: "07/28",
						amount: 4,
					},
				},
				name: "Bolo de Cenoura",
				price: 10
			},
			"Bolo de Chocolate": {
				days: {
					"07/25": {
						day: "07/25",
						amount: 15,
					},
					"07/27": {
						day: "07/27",
						amount: 8,
					},
					"07/28": {
						day: "07/28",
						amount: 6,
					},
				},
				name: "Bolo de Cenoura",
				price: 10
			},
			"Bolo de Abacaxi": {
				days: {
					"07/25": {
						day: "07/25",
						amount: 10,
					},
					"07/27": {
						day: "07/27",
						amount: 5,
					},
					"07/28": {
						day: "07/28",
						amount: 7,
					},
				},
				name: "Bolo de Cenoura",
				price: 10
			}
		}
	};
	*/

	function genColor() {
		let r = Math.floor(Math.random() * 255);
		let g = Math.floor(Math.random() * 255);
		let b = Math.floor(Math.random() * 255);
		return `rgb(${r}, ${g}, ${b})`;
	}

	let sales = [];
	Object.values(db.sales).forEach(sale => {
		let color = genColor();
		let _data = Object.values(sale.days).map(value => {
			return { x: value.day, y: value.amount };
		});

		let total = Object.values(sale.days).reduce((acc, value) => {
			return acc + (value.amount * sale.price);
		}, 0);

		sales.push({
			label: sale.name + ' - R$ ' + total,
			backgroundColor: color,
			borderColor: color,
			data: _data,
		});
	});

	new Chart(graphic, {
		type: 'line',
		data: {
			datasets: sales
		},
		options: {}
	});
}