const qaItems = [
	{
		question: "How do I track my package?",
		answer:
			"You can easily track your package using our online tracking system. Simply enter your tracking number on our website to get real-time updates on your delivery's status.",
	},
	{
		question: "What should I do if my package is damaged or lost?",
		answer:
			"If your package arrives damaged or is lost in transit, please contact us immediately. We will investigate the matter and arrange for a replacement or refund as per our policy.",
	},
	{
		question: "Can I change my delivery address after placing an order?",
		answer:
			"Yes, you can change your delivery address as long as the package has not been dispatched. Please contact our customer service team as soon as possible to make any changes.",
	},
	{
		question: "Are there any items that cannot be shipped?",
		answer:
			"Yes, there are certain restrictions on items that can be shipped due to safety and legal reasons. Please refer to our shipping policy or contact us for more information on prohibited items.",
	},
];

const accordionDiv = document.getElementById("accordion");

qaItems.forEach((qaItem) => {
	const questionText = qaItem.question;
	const answerText = qaItem.answer;

	//const { questionText: question, answerText: answer } = qaItem;

	const questionDiv = document.createElement("div");
	questionDiv.classList.add("accordion-question");
	questionDiv.textContent = questionText;

	const answerDiv = document.createElement("div");
	answerDiv.classList.add("accordion-answer");
	answerDiv.textContent = answerText;

	questionDiv.appendChild(answerDiv);

	questionDiv.addEventListener("click", () => {
		questionDiv.classList.toggle("active");
		answerDiv.classList.toggle("active");
	});

	accordionDiv.appendChild(questionDiv);
});

//Session Storage / Cookies section

class DatabaseObject {
	toString() {
		throw new Error("Not implemented");
	}
}

class Product {
	constructor(name, inventory) {}

	toString() {
		return `${this.name}: ${inventory} left in stock`;
	}
}

class Delivery {
	constructor(params) {
		const { address, scheduledTime, product, quantity } = params;
		this.address = address;
		this.scheduledTime = scheduledTime;
		this.product = product;
		this.quantity = quantity;
	}

	toString() {
		return `Delivering ${quantity} of ${product} to ${address} at ${scheduledTime}`;
	}

	static create(params) {
		//const { address, scheduledTime, product, quantity } = params;
		//return new Delivery(address, scheduledTime, product, quantity);
		return new Delivery(params);
	}
}

class ProductDao {
	static seeds = [
		{
			name: "Apples",
			inventory: 100,
		},
		{
			name: "Bananas",
			inventory: 90,
		},
		{
			name: "Peaches",
			inventory: 70,
		},
	];
	getAll() {
		throw new Error("Not implemented");
	}

	getProductByName(name) {
		throw new Error("Not implemented");
	}

	update() {
		throw new Error("Not implemented");
	}
}

class SessionStorageProductDao extends ProductDao {
	constructor() {
		this.database = sessionStorage;
	}

	getAll() {
		const productsAsJSON = this.database.getItem("products");
		// Returns products if the value is not empty, otherwise returns empty array CA#1 (11:43)
		const productsData = productsAsJSON ? JSON.parse(productsAsJSON) : ProductDao.seeds;
		return productsData.map((productData) => {
			const { name, inventory } = productData;
			new Product(name, inventory);
		});
	}

	getProductByName(name) {
		const products = getAll();
		return products.find((product) => product.name == name);
	}

	update(product) {
		const existingProducts = this.getAll();
		const indexToDelete = existingProducts.findIndex(
			(productInList) => productInList.name == product.name,
		);
		existingProducts.splice(indexToDelete, 1, product);
	}
}

class DeliveryDao {
	getAll() {
		throw new Error("Not implemented");
	}
	create() {
		throw new Error("Not implemented");
	}
}

class SessionStorageDeliveryDao extends DeliveryDao {
	constructor() {
		this.database = sessionStorage;
	}

	getAll() {
		const deliveriesAsJSON = this.database.getItem("deliveries");
		const deliveriesData = JSON.parse(deliveriesAsJSON);
		return deliveriesData.map((deliveryData) => {
			return Delivery.create(deliveryData);
		});
	}
	create(delivery) {
		const deliveries = this.getAll();
		deliveries.push(delivery);
		this.database.setItem("deliveries", JSON.stringify(deliveries));
	}
}

class CreateDeliveryService {
	constructor(productDao, deliveryDao) {}

	createDelivery(productName, quantity, address, scheduledTime) {
		const product = productDao.getProductByName(productName);
		const newInventory = product.inventory - quantity;
		product.inventory = newInventory;
		const deliveryData = {
			quantity,
			address,
			scheduledTime,
		};
		deliveryDao.create(deliveryData);
		productDao.update(product);
	}
}

const productDao = new SessionStorageProductDao();
const deliveryDao = new SessionStorageDeliveryDao();
const createDeliveryService = new CreateDeliveryService(productDao, deliveryDao);

const deliveryList = document.getElementById("deliveries-list");
deliveries = deliveryDao.getAll();

for (let i = 0; i < deliveries.length; i++) {
	const delivery = deliveries[i];
	const deliveryLi = document.createElement("li");
	deliveryLi.textContent = delivery.toString();
	deliveryList.appendChild(deliveryLi);
}

//VIDEO AT 5:45 second vid

/* class CookieStorageProductDao extends ProductDao {
	constructor() {
		this.database = document.cookie;
	}
	getAll() {
		const productsAsJSON = this.database.getItem("products");
		// Returns products if the value is not empty, otherwise returns empty array CA#1 (11:43)
		return productsAsJSON ? JSON.parse(productsAsJSON) : {};
	}

	update(product) {
		const existingProducts = this.getAll();
		const indexToDelete = existingProducts.findIndex(
			(productInList) => productInList.name == product.name,
		);
		existingProducts.splice(indexToDelete, 1, product);
	}
} */
