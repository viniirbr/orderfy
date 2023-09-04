# Orderfy: simplify order, simplify delivery

## Motivation
This is a studying MVP developed having in mind the situation in a Deli Shop I worked where the orders would be sent through email and different sections (sandwiches, groceries and beverage) would receive the same text and have to mark what was their responsability. Since this was a time consuming activity and the lack of standardization usually made the orders ambiguous, I came up with this application that intends to make the product selection easier for the customer and different parts of the order could be sent to the different sectors involved.

## Technologies
- **Next.js:** The 13 version of the most famous fullstack React framework introduces a whole new paradigm with the server components. The main reason I engaged in this project with Next 13 was to get a grasp of what possibilities it has to offer, regarding features like the interaction between server and client components, cache mechanisms and routes definition.
- **TailwindCSS:** I've been using this for a while now, since it boosts my productivity. I like the ideia of keeping my styles in the same place as the HTML and it helps me think better about the way I structure my components and reuse styles.
- **[PDF-LIB](https://pdf-lib.js.org/):** This was my first application with PDF generation and I've chosen this lib because it's is very straightforward in the way it creates the PDF and I was just looking for a demonstration. In the future, if necessary, I'm open to consider other options.

## Pages

### Login
<img src="https://github.com/viniirbr/orderfy/assets/35473934/a6836083-280c-480c-a17c-3fc1fcb1aa60" width=800/>

### Home (orders list)
<img src="https://github.com/viniirbr/orderfy/assets/35473934/64065766-bd7d-4440-995a-15bd2af497e8" width=800/>

### Cart
The customer can split the order between different people. This is useful in this context because we received a lot of orders from offices, so they listed the orders by people.
<img src="https://github.com/viniirbr/orderfy/assets/35473934/e80aa86e-e6de-4903-8b13-b54cdb4abe56" width=800/>

### Order details
By clicking in the icon, the user can generate a PDF with the orders.
<img src="https://github.com/viniirbr/orderfy/assets/35473934/b9db527d-fbb7-4a22-9815-099a24400ec7" width=800/>

