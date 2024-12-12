import { faker } from "@faker-js/faker";

const generateRandomID = () => {
  const randomLetters = faker.string.alpha({ length: 2, casing: "upper"});
  const randomNumbers = faker.string.numeric(4);
  return `${randomLetters}${randomNumbers}`;
}

export const mockInvoices = Array.from({ length: 7 }).map(() => ({
  id: generateRandomID(), // 替换为新版 Faker.js 方法
  paymentDue: faker.date.future().toISOString(),
  clientName: faker.person.fullName(),
  total: faker.number.float({ min: 100, max: 1000}), // 替换为新版方法
  status: faker.helpers.arrayElement(["paid", "pending", "draft"]),
}));

console.log("Generated Mock Invoices:", mockInvoices);
