# Issues resolved

## 1. Got rid of the repeated code 

I have pretty much the same code for displaying the weather in degree celsius and in degree fahrenheit, but I had two different if/else statements, one for displaying the weather in celsius and the other for displaying the weather in fahrenheit. I also had 2 different states/hooks for tracking the same toggle button event. Now, I am following the DRY approach and got rid of the repeated code and the extra useState hook which was tracking the change in state of the toggle button. There is only 1 hook that is tracking whether the toggle button is checker or not. 

## 2. Created an error card for invalid user input 

In the earlier version, when there was an invalid user input, an error notification was shown to the user for 4 seconds, which meant that there was nothing to be shown to the user after the error message disappeared and the website felt very empty. To enhance user experience, I created an error card to display a message to the user, asking them to input some other city name to find out the weather. 

## 3. Changed browser warning in case of no user input

In the earlier version, when the user tried to check the weather without entering any input, a browser warning was popping up, with the message - "Please fill out this field". I felt this message wasn't telling the user about the exact problem, so I changed it to "Please enter a city name". 
