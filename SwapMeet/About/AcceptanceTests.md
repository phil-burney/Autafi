

# Acceptance Tests for SwapMeet
## Preconditions
1.  User has navigated to http://104.131.120.33/

## User Signup
### Test 1: UserSignupValid
1.  At the top right corner of the webpage, click "Sign Up".
    * Expectation: The user is directed to /signup.
2.  The user enters their:
    * Email: test@ncsu.edu
    * Username: test
    * Password: testing
3.  The user clicks "Sign Up!"
    * Expectation:  The user is directed to the webpage /signup/success and is greeted with a message stating that the signup was successful.

### Test 2: UserSignupInValidDueToEmail
1.  At the top right corner of the webpage, click "Sign Up".
    * Expectation: The user is directed to /signup.
2.  The user enters their:
    * Email: test@ncsu.edu
    * Username: test2
    * Password: testing
3.  The user clicks "Sign Up!"
    * Expectation:  The user is NOT directed to the webpage /signup/success.  User remains on the signup page with a message stating the the email used is already associated with an existing account

### Test 3: UserSignupInValidDueToUserName
1.  At the top right corner of the webpage, click "Sign Up".
    * Expectation: The user is directed to /signup.
2.  The user enters their:
    * Email: test2@ncsu.edu
    * Username: test
    * Password: testing
3.  The user clicks "Sign Up!"
    * Expectation:  The user is NOT directed to the webpage /signup/success.  User remains on the signup page with a message stating the the username stated has been taken
## User Login
### Preconditions
1.  User has completed Tests 1, 2 and 3 in the User Signup portion of this test suite
### Test 1: ValidUserLogin
1.  At the top right corner of the webpage, click "Login".
    * Expectation: The user is directed to /login.
2.  The user enters their:
    * Username: test
    * Password: testing
3.  The user clicks "Login"
    * Expectation:  The user is directed back to the home page (/).  In the top of the webpage, there should be three new buttons, labeled "Post Bounty", "Post Sale", and "Logout" should appear.  A message stating "Welcome, test" should appear as well.

### Test 2: ValidUserLogout
Precondition: The user has already completed ValidUserLogin (Test 1) for the User Login Test Suite
1.  At the top right corner of the webpage, click "Logout".
    * Expectation: The user stays on the home page.  The three buttons, labeled "Post Bounty", "Post Sale", and "Logout" should disappear, with the "Login" and "Signup" buttons taking their place.  The message stating "Welcome, test" is no longer visible.

### Test 3: InalidUserLoginDueToPassword
1.  At the top right corner of the webpage, click "Login".
    * Expectation: The user is directed to /login.
2.  The user enters their:
    * Username: test
    * Password: testing2
3.  The user clicks "Login"
    * Expectation:  The user is NOT directed back to the home page (/).  An error message will display at the bottom of the login form stating that the login credentials are invalid.

### Test 4: InalidUserLoginDueToUsername
1.  At the top right corner of the webpage, click "Login".
    * Expectation: The user is directed to /login.
2.  The user enters their:
    * Username: test2
    * Password: testing
3.  The user clicks "Login"
    * Expectation:  The user is NOT directed back to the home page (/).  An error message will display at the bottom of the login form stating that the login credentials are invalid.

## Create Parts Sale Post
Precondition: User has completed Test 1 of the User SignUp test suite and Test 1 of the User Login Test Suite

1. At the top right corner of the web page, click the "Post Sale" button
* Expectation: The user will be directed to the /selectcarsorpartsale webpage
2. Click the "A Part" button, which also has an image of an engine.
* Expectation: The user will be directed to parts/createsale
3. Fill the following information in the form:
    * Put subject of post here: "Selling a 1960 Falcon Hood"
    * Year: 1960
    * Make: Ford
    * Model: Falcon
    * Part: Hood
    * Image: **Upload no images**
    * Describe part here...: "Selling Ford Falcon hood.  Is rust and dent free"
    * Sale price: 3000
4. Click "Place Sale"
    * Expectation: User is redirected to /listing/success.  User will see a confirmation message
5. Click "View Listings" at the top of the webpage.
    * Expectation: User is redirected to /listingSelect.
6. Click "View Parts For Sale"
    * Expectation: User is directed to /parts/sale/list.  User should see the part with the information that they specified earlier, with the email test@ncsu.edu.

## Create Parts Bounty Post
Precondition: User has completed Test 1 of the User SignUp test suite and Test 1 of the User Login Test Suite

1. At the top right corner of the web page, click the "Post Bounty" button
* Expectation: The user will be directed to the /selectcarsorpartsale webpage
2. Click the "A Part" button, which also has an image of an engine.
* Expectation: The user will be directed to parts/createbounty
3. Fill the following information in the form:
    * Put subject of post here: "Need Corvair Front Bumper"
    * Year: 1961
    * Make: Chevrolet
    * Model: Corvair
    * Part: Front Bumper
    * Image: **Upload no images**
    * Describe part here...: "Need Corvair front bumper.  Must be rust and dent free"
    * Bounty: 600
4. Click "Place Bounty"
    * Expectation: User is redirected to /listing/success.  User will see a confirmation message
5. Click "View Listings" at the top of the webpage.
    * Expectation: User is redirected to /listingSelect.
6. Click "View Parts Bounties"
    * Expectation: User is directed to /parts/bounty/list.  User should see the part with the information that they specified earlier, with the email test@ncsu.edu.
## Create Car Sales Post
Precondition: User has completed Test 1 of the User SignUp test suite and Test 1 of the User Login Test Suite

1. At the top right corner of the web page, click the "Post Sale" button
* Expectation: The user will be directed to the /selectcarsorpartsale webpage
2. Click the "A Car" button, which also has an image of an engine.
* Expectation: The user will be directed to cars/createsale
3. Fill the following information in the form:
    * Put subject of post here: "Selling a 1965 Mustang"
    * Year: 1965
    * Make: Ford
    * Model: Mustang
    * Image: **Upload no images**
    * Describe part here...: "Selling Ford Mustang.  Is rust and dent free.  Runs and drives"
    * Sale price: 10000
4. Click "Place Sale"
    * Expectation: User is redirected to /listing/success.  User will see a confirmation message
5. Click "View Listings" at the top of the webpage.
    * Expectation: User is redirected to /listingSelect.
6. Click "View Cars For Sale"
    * Expectation: User is directed to /cars/sale/list.  User should see the part with the information that they specified earlier, with the email test@ncsu.edu.
## Create Car Bounty Post
Precondition: User has completed Test 1 of the User SignUp test suite and Test 1 of the User Login Test Suite

1. At the top right corner of the web page, click the "Post Bounty" button
* Expectation: The user will be directed to the /selectcarsorpartsale webpage
2. Click the "A Car" button, which also has an image of an engine.
* Expectation: The user will be directed to parts/createbounty
3. Fill the following information in the form:
    * Put subject of post here: "Want Chevorlet Corvair"
    * Year: 1961
    * Make: Chevrolet
    * Model: Corvair
    * Image: **Upload no images**
    * Describe part here...: "Want 1961 Chevrolet Corvair.  Must be rust and dent free.  Must run and drive."
    * Bounty: 12000
4. Click "Place Bounty"
    * Expectation: User is redirected to /listing/success.  User will see a confirmation message
5. Click "View Listings" at the top of the webpage.
    * Expectation: User is redirected to /listingSelect.
6. Click "View Car Bounties"
    * Expectation: User is directed to /cars/bounty/list.  User should see the part with the information that they specified earlier, with the email test@ncsu.edu.


