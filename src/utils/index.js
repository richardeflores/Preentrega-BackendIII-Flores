import bcrypt from "bcrypt";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { fakerES } from "@faker-js/faker";

export const createHash = async (password) => {
	const salts = await bcrypt.genSalt(10);
	return bcrypt.hash(password, salts);
};

export const passwordValidation = async (user, password) =>
	bcrypt.compare(password, user.password);

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const generateMockPets = (numPets) => {
	let pets = [];

	for (let i = 0; i < numPets; i++) {
		pets.push({
			name: fakerES.person.firstName(),
			specie: fakerES.animal.type(),
			birthDate: fakerES.date.past(5),
			adopted: false,
			owner: null,
			image: fakerES.image.url(),
		});
	}

	return pets;
};
export const generateMockUsers = async (numUsers) => {
	const users = [];
	for (let i = 0; i < numUsers; i++) {
		users.push({
			first_name: fakerES.person.firstName(),
			last_name: fakerES.person.lastName(),
			email: fakerES.internet.email(),
			password: await createHash("coder123"),
			role: Math.random() < 0.5 ? "user" : "admin",
			pets: [],
		});
	}
	return users;
};
