# Food Delivery App Backend

## *User End Point*;

1. `POST`: `/register`
   This endpoint should allow users to register. The password should be hashed and stored.

2. `POST`: `/login`
   This endpoint should allow users to login. It should return a JWT token on successful login.
   
3. `PATCH`: `/user/:id/reset`
   This endpoint should allow users to reset their password identified by their user ID, by providing the current password and the new password in the request body.

- User Model
```
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
  }
}
```

## *Restaurant End Point*;

1. `GET`: `/restaurants`
   This endpoint should return a list of all available restaurants.

2. `GET`: `/restaurants/:id`
   This endpoint should return the details of a specific restaurant identified by its ID.

3. `GET`: `/restaurants/:id/menu`
   This endpoint should return the menu of a specific restaurant identified by its ID.

4. `POST`: `/restaurants/restaurant`
   This endpoint should allow the user to add a new restaurant
   
5. `POST`: `/restaurants/restaurant/:id/menu` 
   This endpoint should allow the user to add a new item to a specific restaurants menu identified by it id.
   
6. `DELETE`: `/restaurants/restaurant/:resID/menu/:menuID`
   This endpoint should allow the user to delete a particular menu item identified by its id from a specific restaurant.
   
  - Restaurant Model
```
{
  _id: ObjectId,
  name: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
  },
  menu: [{
    _id: ObjectId,
    name: String,
    description: String,
    price: Number,
    image: String
  }]
}
```

## *Order End Point*

1. `POST`: `/orders/order`
   This endpoint should allow the user to place an order.
   
2. `GET`: `/orders/order/:id` 
   This endpoint should return the details of a specific order identified by its ID.
   
3. `PATCH`: `/orders/order/:id`
   This endpoint should allow users to update the status of a specific order identified by its ID.

- Order Model
```
{
	 _id: ObjectId,
	 user : { type: ObjectId, ref: 'User' },
	 restaurant : { type: ObjectId, ref: 'Restaurant' },
   items: [{
     name: String,
     price: Number,
     quantity: Number
   }],
   totalPrice: Number,
   deliveryAddress: {
     street: String,
     city: String,
     state: String,
     country: String,
     zip: String
   },
   status: String
}
```

## *BackEnd Deployed link*
```
 https://mock8backend-production.up.railway.app/
```
