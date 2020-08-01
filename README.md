# Documentation

## Requirements

### TYPES OF USERS

 1. Buyers
 2. Admin
 3. Vendor

#### Buyers

- There will be login
  - login with Facebook/Gmail using there Api
  - login with Email with email authentication
  - login with Mobile number with mobile number verification.
  - Forget username/password for email and mobile number signin
- There will be categories and sub category lists(if any) depending upon the data inserted by admin.
  - For some category there will be sub category like 
    - Fast Food will have Indian, Chinese, Continental
    - Groceries will have Oil Masala Toothpaste etc
    - And many more which is customisable
- Only those item will be displayed to the user which is deliverable to that user (calculated user lives withon dilivery range of item ).  
- User can enter a custom location  
- If user has viewed any item then it will be saved as a searched history for that user.(to be stored in DB so that data persist across device)  
- User can save any item as buy it later option (to be stored in DB so that data persist across device)  
- For category page there will be option for filter and sort  
- For the Home Screen all Feature items will be displayed which was decided by admin.  
- User can add item to cart (to be stored in DB so that data persist across device)  
- At buy page enter address or use the saved one to proceed to payment process.  
- User can add address and save it for future use  
- Your can see all the ordered products  
- There will be my Account Section where user can see and Edit there profile  
- User can't change email or phone number if he/she has logged in with that.  
- Mobile number or Email ID if added have to be verified first before proceeding to buy any new product  
- User can browse items without login but he/she can buy any item iff the same is logged in  
- If some item is out of stock then user will get a option of Notify me to get the notification if item is available(to be stored in DB so that data persist across device).  
- User can save ir delete payment card details  
- user can vive tafing and write review on any products
- can see all the users have put there items in cart (with details)
- vendor page will be there to give a brief idea about the vendor to the user
- We can give best Seller options depending upon the ratings
- We can have New Releases 
- user can see Offered Products
- ***User can opt for self pick and decide range upto which he/she can pickup***
  
#### Admin

- Can add new categories or sub-categories(Notification will be send to vendors).
- Approve or deny any request of vendor for any item (send notification with approved or declined with proper message)
- Admin can delete or hide any item (Send proper reason for hiding/deleting product).
- Admin can see all the listed product by the vendor and his/her sales with statistics(Charts may be for better visualization)
- Admin can see purchase history and browing history of the User
- Admin can send  Notification to a particular users
- Admn can pause account of any user/vendor with proper notification to the same
- Admin can delete any rating and reviews of the customer
- Admin can approve or disapprove vendor's request of adding new category
- Admin can see all the pending items to deliver with some filters(vendor name,...) and sort(time, name...)

#### Vendor

- Vendor Login same as users(give role to decide buyer,admin,vendor)
- Vendor can add new product (product must have location and delivery Range and Quantity with all other important details).
- Vendor can edit or delete existing products
- Vendor can request admin to add new category or subcategory
- Vendor can see all his listed product and quantity remaning
- Vendor can increase or decrease quantity of existing product
- Vendor can disable any items listed by him/her
- ***Vendor can disable his account and if some user is current viewing his product it will give a proper message and should take him back to previous page***
- Vendor can see all the pending orders from the lists
- Vendor can give offers and promocode to the user
- Vender can send Notification of there new offers

### Questions

- is there any accept feature for dealers like in Zomato Swiggy
- if some user post item it should be validated by admin
- Chat Option between vendor and user(Chat bot)
- How is delivery managed if its from some thired party then we can give tracking feature

## Models

### User

```JSON
 {
    _id:String,
    firstName:String,
    middleName:String,
    lastName:String,
    email:String,
    dob:String,
    loginType:String, --Google/Facebook/Email/Mobile
    wishlist:[String],
    notifyMe:[String],
    password:String,
    recentlyViewItems:[String],
    isAuthenticated:Boolean,
    userToken:String,
    address:[{
        name:String,
        mobileNumber:String,
        pinCode:String,
        houseNo:String,
        area:String,
        landMark:String,
        state:String,
        addressType:String
    }],
    card:[{
        name:String,
        cardNumber:String
        expiryDate:Date
    }]
 }
 ```

### Category

 ```JSON
 {
    _id:String,
    title:String,
    image:String
 }
 ```

### Subcategory

 ```JSON
 {
    _id:String,
    categoryId:String
    title:String,
    image:String
 }
 ```

### Products

 ```JSON
 {
    _id:String,
    title:String,
    categoryId:String,
    location:String
    quantity:Number,
    tags:[String],
    deliveryRange:String, --default to 7
    returnable:Boolean
 }
 ```

### Orders

```JSON
 {
    _id:String,
    userId:String,
    products:[String]
 }
```

### Reviews

```JSON
 {
    _id:String,
    product_id:String,
    rating:number,
    body:String
 }
```

## Database Details

__DB_NAME__ : e-Commerce  
__USERNAME__ : mayank  
__PASSWORD__ : x0ZvcHFrSMeQFVrk  
__ROLE__ : Read and Write Access  


