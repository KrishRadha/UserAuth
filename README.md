#User Authentication Module for my future apps

##How to use? Well You got to have a basic understanding of Nodejs, its not a WYSIWIG for sure!

###Following are the ideal steps to use this(Server_prime.js is the actual server module)

* FIRST STEP : CHANGE THE APP SECRET OF SESSIONS under app.use(sessions)
* Any app starts from a / get, so go to that and change the landing page of ur website
* Now, go to register get and change the values you want to get from the user, also focus on changing the view of register. Samples have been attached though (done using Angular)
* Validate each field using Validate JS
* Now, you have to focus on veryfying the client Email! I prefer sendgrid, you can use anything! If sendgrid, samples have been attached. Just enter your user name and password in require. Then customize your veryifying mail in verify get.
* Now enter login get. Change this, if you want and you're done.
* Now every one is redirected to dashboard once they're logged in and verified! Sessions are stored using session Library.Some internal cryptographic functions also involved, check if you're interested.
* Play with the session storage values, to tweak around their validity time.(present in app.use(sessions(active duration time function)
* Also you can use requirelogin parameter, to render views only if logged in. Check /dashboard get for example :)

That's about it guys. If you want some more details just get to me.
