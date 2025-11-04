const obj = {
  name: "John",
  address: { city: "NY", pin: 12345 }
};

const flat = Object.assign({}, obj.address, { name: obj.name });
console.log(flat);
