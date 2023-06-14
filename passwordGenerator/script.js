const lengthSlider = document.querySelector('.pass-length input'),
options = document.querySelectorAll('.option input'),
copyAll = document.querySelector('.input-box span'),
passwordInput = document.querySelector('.input-box input'),
inputIndicator = document.querySelector('.pass-indicator'),
generateBtn = document.querySelector('.generate-btn');

const characters = { //object of password input
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: "./'|;>,!@#$%<^&*()_+{}:`~-'"
};

const generatePassword = () => {
    let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
     passLength = lengthSlider.value; //lengthSlider.value

    options.forEach(option => {   //Looping through each option's checkbox
       if(option.checked) {   // if checkbox is checked
        // if checkbox id isn't duplicate or spaces
         if(option.id !== "exc-duplicate" && option.id !== "spaces" ) {
             //adding particular key value from character object to staticPassword
             staticPassword += characters[option.id];
         } else if(option.id === 'spaces'){ //if checkbox is spaces
              staticPassword += `${staticPassword}` // adding spaces between the spaces and duplicates
         }else{ // else pass true value to excludeDuplicate
             excludeDuplicate = true;
         }
       }
    });

    for (let i = 0; i < passLength; i++) {
        // getting random character from the static password
         let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
         if(excludeDuplicate) {// if excludeDuplicate is true
            // if randomPassword doesnt contain the current random character or randomChar is equal
            // to space " " then add random character to the randomPassword else decrement i by 1
             if( !randomPassword.includes(randomChar) || randomChar == " ") {   //!randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
                randomPassword += randomChar;
             }else{
                i--;
             }
         }else{ // else add random character to randomPassword
            randomPassword += randomChar
         }
        
    }

    passwordInput.value = randomPassword; // passing randomPassword to passwordInput value
};

const updatePassIndicator = () => {
    // if length value is less than 8 then pass 'weak' as inputIndicator id else if lenghSlider
    // value is lesss than 16 then pass 'medium' as id else pass 'strong' as id
    inputIndicator.id = lengthSlider.value <= 8 ? 'weak' : lengthSlider.value <= 16 ? 'medium' : 'strong' ;
}

const updateSlider = () => {
    // Passing slider value as counter text
    document.querySelector('.pass-length span').innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
};
updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyAll.innerText = 'check';
    copyAll.style.color = '#4285F4'
    setTimeout(() => { // after 1500 ms, chnaging tick icon back to copy
        copyAll.innerText = "copy-all"
        copyAll.style.color = "#707070"
    }, 1500);
}

lengthSlider.addEventListener('input', updateSlider);
copyAll.addEventListener('click', copyPassword);
generateBtn.addEventListener('click', generatePassword);