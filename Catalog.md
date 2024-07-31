Catalog Service
    Manager Product
        Create Product
            should be able to create product
        Edit Product
            should be able to edit product
        Delete Product
            should be able to delete product
        List Products
            should be able to list products
        Elastic Search

    Domain Driven Design
        Domain - Some Business/attribute (Commerce Aplication etc)
        Ecommerce - Products/catalogue
                    User Boundary - customer 
                                    -profile
                                    -cart
                                    -orders 
                                - payment
                                    -transaction
                                    -orders
                    Catalogue Boundary 
                                    -stock 
                                    -category
                                    -product
                    Order Boundary 
                                    -Orders
                                    -Order Items
                                    -product
                    Payments Boundary 
                                    -transaction
                                    
    
    
    
    Order Product 
        User -> Product -> (Product/Laptop) -> Cart(Cart Items) -> Collect Payment(Payment Service)-> Order(Order Items)
    
    Elastic Search
    ORM Integration