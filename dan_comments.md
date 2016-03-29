John,

Great effort taking this dive into Angular Factories. This is a tough concept and I admire how much headway you are making in such a short time.

Your app.js file (which is really mostly your controller) isn't very dry. I see you instantiate an empty object of the sales quadrants 3x. Additionally you bind some functions to the controller's $scope, but not others. Why is that? Try and use a consistent declaration method. 

Also always be sure to keep your code beautified! Look up a Google styleguide and make sure to document what your functions do, it will make maintaining your projects SO much easier. 

I love how you organize the nwFactory. Your functions are neatly packaged off into an object returned by your factory. Wonderful. Your EmployeeFactory however could use a makeover. Instead of returning an object, it looks like you are returning some kind of constructor function and you bind multiple other functions to it's prototype. This isn't really best practices and makes your code that much more confusing. See if you can refactor this to look more like a typical Angular factory, it will help you learn a bit more about the relationship between factories and controllers!

No developer worth their salt will claim learning Angular is easy, but you are on your way. I think there are some errors here, mostly with coding practices but I must say they are "smart" errors. I can really tell you are thinking deeply about how this app should work, and you are diving deep into your JS knowledge to make things work. The problem is, your workarounds seem a little hacky. As you learn more about angular conventions, consider revisiting this project and reworking your code.

-Dan 