db.collection("users").insertOne({
    name: "Test User",
    email: "testuser@email.com",
    password: "pass1234",
    cartData: (function() {
      let cart = {};
      for (let i = 0; i < 300; i++) {
        cart[i] = 0;
      }
      return cart;
    })()
  })