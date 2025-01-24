const takaraCrane = `
 #                                                
   #                                              
    ##                               # #          
      ##                          ## ##           
       ###                    ########            
        ####               ###########            
          ####         # ###### #####             
           ######    ### ## # ######              
             ###### ##### #########     ## ##     
              ##   #### ## #####      #### ###    
              ########  #########  #####     ##   
            ################  #########        #  
           ################# # ######             
           ####### ########### ####               
          ###### ########## ## ##                 
         ##### #########                          
        #### #######                              
        ########                                  
       ######                                     
      # #                                         
`;

export function displayTakaraCrane() {
  console.info(
    "%c" + takaraCrane,
    "color: #B91C1C; font-family: monospace;",
    "We're hiring! https://www.linkedin.com/company/takara-ai/jobs/"
  );
}
